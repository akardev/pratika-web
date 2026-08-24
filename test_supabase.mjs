import { createClient } from '@supabase/supabase-js'

async function testConnection() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error('❌ Hata: .env.local dosyasında URL veya Key bulunamadı.')
    process.exit(1)
  }

  try {
    const supabase = createClient(url, key)
    
    // Auth servisine basit bir ping atmak için getUser() çağırılabilir
    const { data, error } = await supabase.auth.getUser()
    
    if (error && error.message.includes('FetchError') || error?.message.includes('Failed to fetch')) {
       console.error("❌ Hata: Supabase URL'sine bağlanılamadı. URL'yi kontrol edin.", error.message)
       process.exit(1)
    }

    console.log('✅ Supabase bağlantısı BAŞARILI!')
    console.log(`🔗 URL: ${url}`)
    process.exit(0)
  } catch (err) {
    console.error('❌ Beklenmeyen hata:', err)
    process.exit(1)
  }
}

testConnection()
