import { redirect } from 'next/navigation'
import {
  getCurrentUserEntitlements,
  getQuota,
  hasFeature,
} from '@/lib/entitlements'

export default async function PanelPage() {
  const entitlements = await getCurrentUserEntitlements()

  if (!entitlements) {
    redirect('/login')
  }

  const canCreateQrBusiness = hasFeature(
    entitlements,
    'qr.business.create',
  )
  const qrBusinessLimit = getQuota(
    entitlements,
    'qr.business.limit',
  )
  const hasProToolsAccess = hasFeature(
    entitlements,
    'tools.pro.access',
  )

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">İşletme Paneli</h1>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Üyelik Durumu</h2>
        <p className="mb-4">
          Aktif ürün: <span className="font-bold">{entitlements.planCode}</span>
        </p>
        <p className="text-sm text-gray-600">
          Pro araç erişimi:{' '}
          <span className="font-semibold">
            {hasProToolsAccess ? 'Açık' : 'Kapalı'}
          </span>
        </p>
      </div>

      <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">QR Menü Entitlement</h2>

        {canCreateQrBusiness ? (
          <>
            <p className="text-green-600 font-medium">
              QR Menü oluşturma hakkınız aktif.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Business limiti: {qrBusinessLimit}
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Business/Menu CRUD ve QR Menü ekranları sonraki aşamada
              geliştirilecektir.
            </p>
          </>
        ) : (
          <p className="text-gray-600 text-sm">
            Bu hesapta QR Menü oluşturma entitlement&apos;ı bulunmuyor.
          </p>
        )}
      </div>
    </div>
  )
}
