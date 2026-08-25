import { createClient } from '@/lib/supabase/server'

export type EntitlementType = 'feature' | 'quota'

export type EntitlementValue =
  | { type: 'feature'; enabled: boolean }
  | { type: 'quota'; limit: number }

type PlanEntitlementRow = {
  feature_key: string
  entitlement_type: EntitlementType
  is_enabled: boolean
  limit_value: number | null
}

type EntitlementGrantRow = PlanEntitlementRow & {
  grant_mode: 'add' | 'override'
  status: string
  starts_at: string | null
  expires_at: string | null
  created_at: string
}

export type EntitlementSnapshot = {
  userId: string
  planCode: string
  subscriptionStatus: string
  values: Record<string, EntitlementValue>
}

function isGrantActive(grant: EntitlementGrantRow, now: Date): boolean {
  const startsAt = grant.starts_at ? new Date(grant.starts_at) : null
  const expiresAt = grant.expires_at ? new Date(grant.expires_at) : null

  return (
    grant.status === 'active' &&
    (!startsAt || startsAt <= now) &&
    (!expiresAt || expiresAt > now)
  )
}

function resolveEntitlements(
  baseRows: PlanEntitlementRow[],
  grants: EntitlementGrantRow[],
): Record<string, EntitlementValue> {
  const values: Record<string, EntitlementValue> = {}

  for (const row of baseRows) {
    if (row.entitlement_type === 'feature') {
      values[row.feature_key] = {
        type: 'feature',
        enabled: row.is_enabled,
      }
    } else {
      values[row.feature_key] = {
        type: 'quota',
        limit: row.limit_value ?? 0,
      }
    }
  }

  const activeGrants = grants
    .filter((grant) => isGrantActive(grant, new Date()))
    .sort((a, b) => a.created_at.localeCompare(b.created_at))

  for (const grant of activeGrants) {
    if (grant.entitlement_type === 'feature') {
      if (grant.grant_mode === 'override') {
        values[grant.feature_key] = {
          type: 'feature',
          enabled: grant.is_enabled,
        }
      } else if (grant.is_enabled) {
        values[grant.feature_key] = {
          type: 'feature',
          enabled: true,
        }
      }
      continue
    }

    const current = values[grant.feature_key]
    const currentLimit = current?.type === 'quota' ? current.limit : 0

    values[grant.feature_key] = {
      type: 'quota',
      limit:
        grant.grant_mode === 'override'
          ? grant.limit_value ?? 0
          : currentLimit + (grant.limit_value ?? 0),
    }
  }

  return values
}

export async function getCurrentUserEntitlements(): Promise<EntitlementSnapshot | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from('subscriptions')
    .select('plan_code, status')
    .eq('user_id', user.id)
    .maybeSingle()

  if (subscriptionError) {
    throw new Error('Subscription could not be loaded: ' + subscriptionError.message)
  }

  const requestedPlanCode =
    subscription?.status === 'active' ? subscription.plan_code : 'FREE'

  const { data: activePlan, error: planError } = await supabase
    .from('billing_plans')
    .select('code')
    .eq('code', requestedPlanCode)
    .eq('is_active', true)
    .maybeSingle()

  if (planError) {
    throw new Error('Billing plan could not be loaded: ' + planError.message)
  }

  const effectivePlanCode = activePlan?.code ?? 'FREE'

  const { data: baseRows, error: entitlementsError } = await supabase
    .from('plan_entitlements')
    .select('feature_key, entitlement_type, is_enabled, limit_value')
    .eq('plan_code', effectivePlanCode)

  if (entitlementsError) {
    throw new Error('Plan entitlements could not be loaded: ' + entitlementsError.message)
  }

  const { data: grants, error: grantsError } = await supabase
    .from('entitlement_grants')
    .select(
      'feature_key, entitlement_type, is_enabled, limit_value, grant_mode, status, starts_at, expires_at, created_at',
    )
    .eq('user_id', user.id)

  if (grantsError) {
    throw new Error('Entitlement grants could not be loaded: ' + grantsError.message)
  }

  return {
    userId: user.id,
    planCode: effectivePlanCode,
    subscriptionStatus: subscription?.status ?? 'active',
    values: resolveEntitlements(
      (baseRows ?? []) as PlanEntitlementRow[],
      (grants ?? []) as EntitlementGrantRow[],
    ),
  }
}

export function hasFeature(
  snapshot: EntitlementSnapshot,
  featureKey: string,
): boolean {
  const value = snapshot.values[featureKey]
  return value?.type === 'feature' && value.enabled
}

export function getQuota(
  snapshot: EntitlementSnapshot,
  featureKey: string,
): number {
  const value = snapshot.values[featureKey]
  return value?.type === 'quota' ? value.limit : 0
}
