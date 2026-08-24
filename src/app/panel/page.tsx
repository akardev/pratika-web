import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { upgradeToPro } from '@/app/panel/actions'

export default async function PanelPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  // Check subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  const isPro = subscription?.plan === 'PRO' && subscription?.status === 'active'

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">İşletme Paneli</h1>
      
      <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-2">Üyelik Durumu</h2>
        <p className="mb-4">
          Mevcut Planınız: <span className="font-bold">{isPro ? 'PRO' : 'FREE'}</span>
        </p>
        
        {!isPro ? (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              QR Menü özelliğini kullanabilmek için PRO plana geçmelisiniz. (Geliştirme ortamında ücretsiz simülasyon)
            </p>
            <form action={upgradeToPro}>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                PRO&apos;ya Yükselt (Simülasyon)
              </button>
            </form>
          </div>
        ) : (
          <p className="text-sm text-green-600 font-medium">
            Tebrikler! PRO özelliklere (QR Menü) tam erişiminiz var.
          </p>
        )}
      </div>

      {isPro && (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">İşletmelerim</h2>
          <p className="text-gray-600 text-sm mb-4">
            Henüz bir işletme oluşturmadınız.
          </p>
          <button className="border border-black px-4 py-2 rounded-md hover:bg-gray-50">
            Yeni İşletme Oluştur
          </button>
        </div>
      )}
    </div>
  )
}
