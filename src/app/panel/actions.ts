'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function upgradeToPro() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if subscription exists
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (subscription) {
    // Update existing to PRO
    await supabase
      .from('subscriptions')
      .update({ plan: 'PRO', status: 'active' })
      .eq('user_id', user.id)
  } else {
    // Create new PRO subscription
    await supabase
      .from('subscriptions')
      .insert({
        user_id: user.id,
        plan: 'PRO',
        status: 'active'
      })
  }

  revalidatePath('/panel')
}
