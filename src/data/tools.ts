import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'finans',
    slug: 'finans',
    title: 'Finans ve Para',
    description: 'Kredi, faiz, yatırım, KDV ve finansal getiri hesaplama araçları.',
  },
  {
    id: 'ticaret',
    slug: 'ticaret',
    title: 'İş ve Ticaret',
    description: 'Maliyet, kâr marjı, başabaş noktası, komisyon ve ticari analiz araçları.',
  },
  {
    id: 'matematik',
    slug: 'matematik',
    title: 'Matematik',
    description: 'Yüzde, ortalama, oran-orantı, karekök, üs ve matematiksel hesaplayıcılar.',
  },
  {
    id: 'zaman',
    slug: 'zaman',
    title: 'Tarih ve Zaman',
    description: 'Yaş, tarih farkı, iş günü ve takvim hesaplama araçları.',
  },
  {
    id: 'donusum',
    slug: 'donusum',
    title: 'Birim Dönüşümleri',
    description: 'Uzunluk, ağırlık, alan, sıcaklık ve veri birimleri dönüştürücüleri.',
  },
  {
    id: 'gunluk-hayat',
    slug: 'gunluk-hayat',
    title: 'Günlük Hayat ve Sağlık',
    description: 'BMI, su ihtiyacı, yakıt ve elektrik tüketim maliyeti hesaplayıcıları.',
  },
  {
    id: 'maas',
    slug: 'maas',
    title: 'Maaş ve Çalışma',
    description: 'Saatlik ücret, fazla mesai ve günlük yasal kazanç hesaplama araçları.',
  },
  {
    id: 'metin',
    slug: 'metin',
    title: 'Metin Araçları',
    description: 'Kelime sayacı, harf dönüştürücü, lorem ipsum ve metin biçimlendirme araçları.',
  },
  {
    id: 'yazilim',
    slug: 'yazilim',
    title: 'Developer ve Kodlama',
    description: 'JSON formatlayıcı, Base64, URL encode/decode ve geliştirici yardımcı araçları.',
  },
  {
    id: 'tasarim',
    slug: 'tasarim',
    title: 'Tasarım ve Renk',
    description: 'QR kod oluşturucu, HEX/RGB renk dönüştürücü ve tasarım yardımcıları.',
  },
  {
    id: 'gorsel',
    slug: 'gorsel',
    title: 'Görsel ve Medya',
    description: 'Sosyal medya görsel boyutları, piksel rehberleri ve görsel araçları.',
  },
  {
    id: 'guvenlik',
    slug: 'guvenlik',
    title: 'Güvenlik ve Utility',
    description: 'Kriptografik güvenli şifre oluşturucu ve dijital gizlilik araçları.',
  },
  {
    id: 'pdf',
    slug: 'pdf',
    title: 'PDF ve Dosya Araçları',
    description: 'Tarayıcınızda %100 güvenli ve gizli PDF birleştirme, bölme, sayfa silme, döndürme ve dönüştürme araçları.',
  }
];

export const tools: Tool[] = [
  // --- MEVCUT GERÇEK ARAÇLAR (9) ---
  {
    id: 'indirim-hesaplama',
    slug: 'indirim-hesaplama',
    title: 'İndirim Hesaplama',
    description: 'Bir ürünün indirimli fiyatını ve indirim tutarını hızlıca hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['indirim', 'fiyat', 'iskonto', 'tasarruf']
  },
  {
    id: 'yuzde-hesaplama',
    slug: 'yuzde-hesaplama',
    title: 'Yüzde Hesaplama',
    description: 'Yüzde hesaplama, yüzde artış ve azalış hesaplama işlemlerini hızlı ve kolayca yapın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['yüzde', 'oran', 'yüzde artış', 'yüzde azalış', 'yüzdesi']
  },
  {
    id: 'yas-hesaplama',
    slug: 'yas-hesaplama',
    title: 'Yaş Hesaplama',
    description: 'Doğum tarihinizi girerek yaşınızı yıl, ay ve gün olarak hesaplayın.',
    categoryId: 'zaman',
    status: 'active',
    keywords: ['yaş', 'yaş hesaplama', 'kaç yaşındayım', 'doğum günü', 'yaşım']
  },
  {
    id: 'kdv-hesaplama',
    slug: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    description: 'KDV dahil ve KDV hariç fiyatları, KDV tutarını kolayca hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kdv', 'kdv hesaplama', 'kdv dahil', 'kdv hariç', 'vergi', 'katma değer vergisi', 'kdv tutarı']
  },
  {
    id: 'kar-marji-hesaplama',
    slug: 'kar-marji-hesaplama',
    title: 'Kar Marjı Hesaplama',
    description: 'Maliyet ve satış fiyatına göre kâr marjını hesaplayın veya hedef kâr marjınıza göre satış fiyatını bulun.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['kâr marjı', 'kar marjı', 'kâr marjı hesaplama', 'kar marjı hesaplama', 'kâr oranı hesaplama', 'satış fiyatı hesaplama', 'hedef kâr marjı', 'maliyet ve satış', 'kâr hesaplama']
  },
  {
    id: 'zam-hesaplama',
    slug: 'zam-hesaplama',
    title: 'Zam Hesaplama',
    description: 'Bir fiyata uygulanacak zam tutarını ve zamlı yeni fiyatı hesaplayın veya zam öncesi fiyatı bulun.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['zam', 'zam hesaplama', 'zamlı fiyat', 'zam oranı', 'zam tutarı', 'zam öncesi fiyat', 'fiyat artışı', 'artış hesaplama']
  },
  {
    id: 'kar-zarar-hesaplama',
    slug: 'kar-zarar-hesaplama',
    title: 'Kâr / Zarar Hesaplama',
    description: 'Maliyet ve satış fiyatına göre kârınızı veya zararınızı ve kâr/zarar oranınızı hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['kar zarar', 'kâr zarar', 'kar zarar hesaplama', 'kâr zarar hesaplama', 'kar hesaplama', 'zarar hesaplama', 'kâr hesaplama', 'satış karı', 'maliyet karı', 'kazanç hesaplama']
  },
  {
    id: 'faiz-hesaplama',
    slug: 'faiz-hesaplama',
    title: 'Faiz Hesaplama',
    description: 'Anapara, faiz oranı ve süreye göre basit veya bileşik faiz tutarını ve toplam getiriyi hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['faiz', 'faiz hesaplama', 'basit faiz', 'basit faiz hesaplama', 'bileşik faiz', 'bileşik faiz hesaplama', 'faiz tutarı', 'faiz oranı', 'faiz hesaplama aracı', 'mevduat faizi']
  },
  {
    id: 'maliyet-hesaplama',
    slug: 'maliyet-hesaplama',
    title: 'Maliyet Hesaplama',
    description: 'Birim alış fiyatı ve ek giderleri kullanarak toplam ve birim maliyeti hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['maliyet', 'maliyet hesaplama', 'ürün maliyeti', 'birim maliyet', 'gerçek maliyet', 'toplam maliyet', 'alış maliyeti', 'ürün maliyeti hesaplama']
  },

  // --- FİNANS & YATIRIM (5) ---
  {
    id: 'kredi-taksit-hesaplama',
    slug: 'kredi-taksit-hesaplama',
    title: 'Kredi Taksit Hesaplama',
    description: 'Kredi tutarı, aylık faiz oranı ve vadeye göre aylık taksit tutarını ve toplam geri ödemeyi hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kredi taksit hesaplama', 'kredi hesaplama', 'aylık taksit bulma', 'kredi faiz tutarı', 'toplam geri ödeme']
  },
  {
    id: 'roi-hesaplama',
    slug: 'roi-hesaplama',
    title: 'Yatırım Getirisi (ROI) Hesaplama',
    description: 'Yapılan yatırım maliyeti ve elde edilen kazanca göre yatırımın getiri oranını (ROI) ve net kârı hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['roi hesaplama', 'yatırım getirisi', 'return on investment', 'yatırım kârlılığı', 'net getiri']
  },
  {
    id: 'kar-payi-hesaplama',
    slug: 'kar-payi-hesaplama',
    title: 'Kâr Payı (Temettü) Hesaplama',
    description: 'Hisse adedi ve hisse başına net kâr payı tutarına göre toplam temettü kazancınızı ve verimini hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kar payı hesaplama', 'temettü hesaplama', 'temettü geliri', 'hisse temettü', 'temettü verimi']
  },
  {
    id: 'enflasyon-hesaplama',
    slug: 'enflasyon-hesaplama',
    title: 'Enflasyon Hesaplama',
    description: 'Enflasyon oranı ve süreye göre paranın reel değer kaybını ve gelecekteki satın alma gücünü hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['enflasyon hesaplama', 'satın alma gücü', 'para değer kaybı', 'kümülatif enflasyon', 'reel getiri']
  },
  {
    id: 'vade-farki-hesaplama',
    slug: 'vade-farki-hesaplama',
    title: 'Vade Farkı Hesaplama',
    description: 'Peşin fiyat ile vadeli taksitli fiyat arasındaki toplam vade farkı tutarını ve yüzde oranını hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['vade farkı hesaplama', 'vade farkı bulma', 'taksitli fiyat farkı', 'vade oranı', 'fiyat farkı']
  },

  // --- İŞ & TİCARET (4) ---
  {
    id: 'basabas-noktasi-hesaplama',
    slug: 'basabas-noktasi-hesaplama',
    title: 'Başabaş Noktası Hesaplama',
    description: 'Sabit giderler, birim satış fiyatı ve birim değişken maliyete göre kâra geçmek için gereken başabaş satış adedini hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['başabaş noktası', 'başabaş hesaplama', 'break even point', 'kâra geçiş adedi', 'sabit gider başabaş']
  },
  {
    id: 'komisyon-hesaplama',
    slug: 'komisyon-hesaplama',
    title: 'Komisyon Hesaplama',
    description: 'İşlem tutarı ve komisyon oranına göre kesilen komisyon tutarını ve elinize geçecek net tutarı hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['komisyon hesaplama', 'komisyon tutarı', 'pazaryeri komisyonu', 'net kazanç', 'komisyon oranı']
  },
  {
    id: 'ciro-hesaplama',
    slug: 'ciro-hesaplama',
    title: 'Ciro Hesaplama',
    description: 'Satış adedi ve birim ürün fiyatına göre brüt hasılatı, hedeflenen dönemsel ciroyu ve ortalama sepet değerini hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['ciro hesaplama', 'hasılat hesaplama', 'brüt ciro', 'toplam satış geliri', 'aylık ciro']
  },
  {
    id: 'stok-devir-hizi-hesaplama',
    slug: 'stok-devir-hizi-hesaplama',
    title: 'Stok Devir Hızı Hesaplama',
    description: 'Satılan malın maliyeti ve ortalama stok değerine göre stok devir hızını ve ortalama stokta kalma gün süresini hesaplayın.',
    categoryId: 'ticaret',
    status: 'active',
    keywords: ['stok devir hızı', 'stok devir süresi', 'stok eritme süresi', 'stok maliyeti', 'stok performansı']
  },

  // --- MATEMATİK (6) ---
  {
    id: 'ortalama-hesaplama',
    slug: 'ortalama-hesaplama',
    title: 'Ortalama Hesaplama',
    description: 'Girilen sayıların aritmetik ortalamasını, medyanını, modunu ve toplamını anında hesaplayın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['ortalama hesaplama', 'aritmetik ortalama', 'medyan bulma', 'mod hesaplama', 'sayı ortalaması']
  },
  {
    id: 'agirlikli-ortalama-hesaplama',
    slug: 'agirlikli-ortalama-hesaplama',
    title: 'Ağırlıklı Ortalama Hesaplama',
    description: 'Ders notları, krediler veya katsayılara göre ağırlıklı genel ortalamayı (GANO/GNO) hesaplayın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['ağırlıklı ortalama', 'gano hesaplama', 'kredili not ortalaması', 'üniversite ortalama', 'katsayılı not']
  },
  {
    id: 'oran-oranti-hesaplama',
    slug: 'oran-oranti-hesaplama',
    title: 'Oran Orantı Hesaplama',
    description: 'Doğru orantı ve ters orantı formülleriyle bilinmeyen dördüncü değeri kolayca hesaplayın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['oran orantı hesaplama', 'doğru orantı', 'ters orantı', 'içler dışlar çarpımı', 'orantı bulma']
  },
  {
    id: 'karekok-hesaplama',
    slug: 'karekok-hesaplama',
    title: 'Karekök Hesaplama',
    description: 'Bir sayının karekökünü, küpkökünü ve istenen dereceden kök değerini anında bulun.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['karekök hesaplama', 'kök bulma', 'küpkök', 'kök alma', 'sayının karekökü']
  },
  {
    id: 'us-hesaplama',
    slug: 'us-hesaplama',
    title: 'Üs Hesaplama',
    description: 'Taban ve üs değerine göre üslü sayı sonucunu, karesini ve küpünü hızlıca hesaplayın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['üs hesaplama', 'üslü sayı', 'kuvvet alma', 'karesi', 'küpü']
  },
  {
    id: 'ebob-ekok-hesaplama',
    slug: 'ebob-ekok-hesaplama',
    title: 'EBOB / EKOK Hesaplama',
    description: 'İki veya daha fazla sayının En Büyük Ortak Bölen (EBOB) ve En Küçük Ortak Kat (EKOK) değerlerini hesaplayın.',
    categoryId: 'matematik',
    status: 'active',
    keywords: ['ebob hesaplama', 'ekok hesaplama', 'ortak bölen', 'ortak kat', 'asal çarpanlar']
  },

  // --- TARİH & ZAMAN (3) ---
  {
    id: 'tarih-farki-hesaplama',
    slug: 'tarih-farki-hesaplama',
    title: 'Tarih Farkı Hesaplama',
    description: 'İki tarih arasındaki gün, hafta, ay, yıl ve iş günü farkını kesin olarak hesaplayın.',
    categoryId: 'zaman',
    status: 'active',
    keywords: ['tarih farkı', 'iki tarih arası gün', 'gün hesaplama', 'kaç gün var', 'tarihler arası süre']
  },
  {
    id: 'tarihe-gun-ekleme',
    slug: 'tarihe-gun-ekleme',
    title: 'Tarihe Gün Ekleme / Çıkarma',
    description: 'Belirli bir tarihe gün, hafta veya ay ekleyerek veya çıkararak hedef tarihi hesaplayın.',
    categoryId: 'zaman',
    status: 'active',
    keywords: ['tarihe gün ekleme', 'tarihten gün çıkarma', 'gün ekle', 'hedef tarih bulma', 'süre ekleme']
  },
  {
    id: 'is-gunu-hesaplama',
    slug: 'is-gunu-hesaplama',
    title: 'İş Günü Hesaplama',
    description: 'İki tarih arasındaki hafta sonları hariç net çalışma ve iş günü sayısını hesaplayın.',
    categoryId: 'zaman',
    status: 'active',
    keywords: ['iş günü hesaplama', 'net çalışma günü', 'hafta sonu hariç gün', 'resmi tatil iş günü', 'mesai günü']
  },

  // --- DÖNÜŞÜMLER (5) ---
  {
    id: 'uzunluk-donusturucu',
    slug: 'uzunluk-donusturucu',
    title: 'Uzunluk Dönüştürücü',
    description: 'Metre, kilometre, santimetre, mil, inç, fit ve yarda birimleri arasında anında dönüşüm yapın.',
    categoryId: 'donusum',
    status: 'active',
    keywords: ['uzunluk dönüştürücü', 'metre km çevirici', 'inç cm çevirme', 'mil km dönüştürme', 'fit metre']
  },
  {
    id: 'agirlik-donusturucu',
    slug: 'agirlik-donusturucu',
    title: 'Ağırlık Dönüştürücü',
    description: 'Kilogram, gram, miligram, ton, libre (lbs) ve ons (oz) ağırlık birimlerini birbirine dönüştürün.',
    categoryId: 'donusum',
    status: 'active',
    keywords: ['ağırlık dönüştürücü', 'kg gram çevirici', 'libre kg dönüştürme', 'ons gram', 'ton kg']
  },
  {
    id: 'alan-donusturucu',
    slug: 'alan-donusturucu',
    title: 'Alan Dönüştürücü',
    description: 'Metrekare, dönüm (dekar), hektar, kilometrekare ve fitkare alan birimlerini çevirin.',
    categoryId: 'donusum',
    status: 'active',
    keywords: ['alan dönüştürücü', 'metrekare dönüm', 'dönüm hektar çevirme', 'm2 km2', 'arazi birimleri']
  },
  {
    id: 'sicaklik-donusturucu',
    slug: 'sicaklik-donusturucu',
    title: 'Sıcaklık Dönüştürücü',
    description: 'Santigrat (°C), Fahrenhayt (°F) ve Kelvin (K) sıcaklık dereceleri arasında hızlıca dönüşüm yapın.',
    categoryId: 'donusum',
    status: 'active',
    keywords: ['sıcaklık dönüştürücü', 'santigrat fahrenhayt', 'celsius fahrenheit', 'kelvin çevirme', 'derece dönüştürücü']
  },
  {
    id: 'veri-birimi-donusturucu',
    slug: 'veri-birimi-donusturucu',
    title: 'Veri Birimi Dönüştürücü',
    description: 'Byte, KB, MB, GB, TB ve PB dijital depolama birimleri arasında doğru ve kolay dönüşüm yapın.',
    categoryId: 'donusum',
    status: 'active',
    keywords: ['veri birimi dönüştürücü', 'mb gb çevirme', 'gb tb dönüştürme', 'byte kilobyte', 'depolama birimi']
  },

  // --- GÜNLÜK HAYAT & SAĞLIK (4) ---
  {
    id: 'bmi-hesaplama',
    slug: 'bmi-hesaplama',
    title: 'Beden Kitle İndeksi (BMI) Hesaplama',
    description: 'Boy ve kilonuza göre vücut kitle indeksinizi (BMI) ve ideal kilo aralığınızı hesaplayın.',
    categoryId: 'gunluk-hayat',
    status: 'active',
    keywords: ['bmi hesaplama', 'beden kitle indeksi', 'vki hesaplama', 'ideal kilo', 'kilo indeksi']
  },
  {
    id: 'su-ihtiyaci-hesaplama',
    slug: 'su-ihtiyaci-hesaplama',
    title: 'Su İhtiyacı Hesaplama',
    description: 'Vücut ağırlığınıza ve günlük hareket durumunuza göre günlük tüketmeniz gereken su miktarını hesaplayın.',
    categoryId: 'gunluk-hayat',
    status: 'active',
    keywords: ['su ihtiyacı hesaplama', 'günlük su tüketimi', 'kaç litre su içmeliyim', 'su miktarı', 'hidrasyon']
  },
  {
    id: 'yakit-maliyeti-hesaplama',
    slug: 'yakit-maliyeti-hesaplama',
    title: 'Yakıt Maliyeti Hesaplama',
    description: 'Gidilecek mesafe, ortalama yakıt tüketimi ve yakıt fiyatına göre seyahat yakıt masrafınızı hesaplayın.',
    categoryId: 'gunluk-hayat',
    status: 'active',
    keywords: ['yakıt maliyeti', 'yakıt hesaplama', 'yol masrafı', 'km başı yakıt', 'benzin mazot tutarı']
  },
  {
    id: 'elektrik-tuketim-maliyeti-hesaplama',
    slug: 'elektrik-tuketim-maliyeti-hesaplama',
    title: 'Elektrik Tüketim Maliyeti Hesaplama',
    description: 'Elektrikli aletlerin güç tüketimi (Watt) ve günlük kullanım süresine göre aylık elektrik faturası tutarını hesaplayın.',
    categoryId: 'gunluk-hayat',
    status: 'active',
    keywords: ['elektrik tüketim maliyeti', 'elektrik faturası hesaplama', 'kwh tutarı', 'cihaz elektrik tüketimi', 'aylık elektrik masrafı']
  },

  // --- MAAŞ & ÇALIŞMA (3) ---
  {
    id: 'saat-ucreti-hesaplama',
    slug: 'saat-ucreti-hesaplama',
    title: 'Maaş Saat Ücreti Hesaplama',
    description: 'Aylık maaş tutarınız ve haftalık çalışma saatinize göre yasal çıplak saatlik ücretinizi hesaplayın.',
    categoryId: 'maas',
    status: 'active',
    keywords: ['saat ücreti hesaplama', 'maaş saatlik karşılığı', 'saatlik kazanç', 'saat başı maaş', 'net saat ücreti']
  },
  {
    id: 'fazla-mesai-hesaplama',
    slug: 'fazla-mesai-hesaplama',
    title: 'Fazla Mesai Ücreti Hesaplama',
    description: 'Normal saatlik ücretiniz ve yapılan mesai saatine göre %50 ve %100 zamlı fazla mesai hak edişinizi hesaplayın.',
    categoryId: 'maas',
    status: 'active',
    keywords: ['fazla mesai hesaplama', 'mesai ücreti', 'ek mesai tutarı', 'fazla çalışma ücreti', 'resmi tatil mesaisi']
  },
  {
    id: 'gunluk-ucret-hesaplama',
    slug: 'gunluk-ucret-hesaplama',
    title: 'Günlük Ücret Hesaplama',
    description: 'Aylık maaşınız üzerinden yasal 30 gün katsayısına göre günlük net ve brüt ücretinizi hesaplayın.',
    categoryId: 'maas',
    status: 'active',
    keywords: ['günlük ücret hesaplama', 'günlük yevmiye', 'günlük maaş', 'yevmiye hesaplama', 'günlük kazanç']
  },

  // --- METİN ARAÇLARI (4) ---
  {
    id: 'kelime-sayaci',
    slug: 'kelime-sayaci',
    title: 'Kelime ve Karakter Sayacı',
    description: 'Metninizdeki kelime, boşluklu/boşluksuz karakter, cümle, paragraf sayısı ve tahmini okuma süresini anında analiz edin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['kelime sayacı', 'karakter sayacı', 'harf sayısı hesaplama', 'kelime sayısı', 'cümle sayacı', 'okuma süresi', 'metin istatistiği']
  },
  {
    id: 'buyuk-kucuk-harf-donusturucu',
    slug: 'buyuk-kucuk-harf-donusturucu',
    title: 'Büyük Küçük Harf Dönüştürücü',
    description: 'Türkçe İ/ı karakterlerine tam uyumlu olarak metinleri BÜYÜK HARF, küçük harf, Başlık Düzeni ve Cümle Düzenine çevirin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['büyük küçük harf dönüştürücü', 'büyük harfe çevirme', 'küçük harfe çevirme', 'başlık harf düzeni', 'türkçe harf çevirme', 'case converter']
  },
  {
    id: 'slug-olusturucu',
    slug: 'slug-olusturucu',
    title: 'SEO Slug Oluşturucu',
    description: 'Başlık ve metinleri Türkçe karakterlerden arındırıp SEO ve URL dostu temiz link slug dizgelerine dönüştürün.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['slug oluşturucu', 'seo slug generator', 'url dostu link', 'türkçe karakter temizleme', 'link oluşturucu', 'url converter']
  },
  {
    id: 'lorem-ipsum-olusturucu',
    slug: 'lorem-ipsum-olusturucu',
    title: 'Lorem Ipsum Oluşturucu',
    description: 'Tasarım, web ve arayüz prototipleriniz için özel paragraf, cümle veya kelime sayısına göre hazır taslak metin üretin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['lorem ipsum oluşturucu', 'lorem ipsum üretici', 'dummy text generator', 'taslak metin', 'örnek metin oluşturma']
  },

  // --- DEVELOPER & KODLAMA ARAÇLARI (4) ---
  {
    id: 'json-formatlayici',
    slug: 'json-formatlayici',
    title: 'JSON Formatlayıcı ve Doğrulayıcı',
    description: 'JSON verilerinizi tek tıkla güzelleştirin (beautify), sıkıştırın (minify) ve sözdizimi hatalarını anında doğrulayın.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['json formatlayıcı', 'json beautifier', 'json validator', 'json düzenleyici', 'json minify', 'json format']
  },
  {
    id: 'base64-donusturucu',
    slug: 'base64-donusturucu',
    title: 'Base64 Metin Dönüştürücü',
    description: 'Metinlerinizi ve UTF-8 karakterlerinizi tarayıcınızda güvenle Base64 formatına kodlayın (encode) veya çözün (decode).',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['base64 dönüştürücü', 'base64 encode', 'base64 decode', 'base64 çevirici', 'base64 kodlama']
  },
  {
    id: 'url-encode-decode',
    slug: 'url-encode-decode',
    title: 'URL Encode / Decode',
    description: 'URL parametrelerini ve özel karakterleri güvenli web formatına kodlayın ya da kodlanmış URL dizgelerini orijinal haline çözün.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['url encode', 'url decode', 'url dönüştürücü', 'url encoder decoder', 'url karakter kodlama']
  },
  {
    id: 'uuid-olusturucu',
    slug: 'uuid-olusturucu',
    title: 'UUID v4 Oluşturucu',
    description: 'RFC 4122 standardına uygun benzersiz rastgele UUID v4 (GUID) anahtarları üretin ve tek tıkla toplu olarak kopyalayın.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['uuid oluşturucu', 'guid generator', 'uuid v4', 'rastgele id üretici', 'unique id generator']
  },

  // --- TASARIM VE RENK ARAÇLARI (2) ---
  {
    id: 'qr-kod-olusturucu',
    slug: 'qr-kod-olusturucu',
    title: 'QR Kod Oluşturucu',
    description: 'Web sitesi linki, düz metin, telefon, e-posta veya Wi-Fi erişimi için anında yüksek çözünürlüklü QR kod üretin ve indirin.',
    categoryId: 'tasarim',
    toolType: 'generator',
    status: 'active',
    keywords: ['qr kod oluşturucu', 'qr code generator', 'karekod yapma', 'qr kod üret', 'wifi qr kod']
  },
  {
    id: 'renk-donusturucu',
    slug: 'renk-donusturucu',
    title: 'Renk Kodu Dönüştürücü',
    description: 'HEX, RGB, HSL ve CMYK renk kodları arasında anında karşılıklı dönüşüm yapın, renk paletini önizleyin ve değerleri kopyalayın.',
    categoryId: 'tasarim',
    toolType: 'converter',
    status: 'active',
    keywords: ['renk dönüştürücü', 'hex to rgb', 'rgb to hex', 'hsl to rgb', 'renk kodu bulucu', 'cmyk dönüştürücü', 'color converter']
  },

  // --- GÜVENLİK VE UTILITY (1) ---
  {
    id: 'guvenli-sifre-olusturucu',
    slug: 'guvenli-sifre-olusturucu',
    title: 'Güvenli Şifre Oluşturucu',
    description: 'Kriptografik olarak güçlü Web Crypto API kullanarak harf, rakam ve özel simgelerle kırılması zor rastgele şifreler üretin.',
    categoryId: 'guvenlik',
    toolType: 'generator',
    status: 'active',
    keywords: ['güvenli şifre oluşturucu', 'rastgele şifre üretici', 'güçlü parola oluştur', 'şifre yapma', 'password generator']
  },

  // --- GÖRSEL VE MEDYA (1) ---
  {
    id: 'sosyal-medya-gorsel-boyutlandirici',
    slug: 'sosyal-medya-gorsel-boyutlandirici',
    title: 'Sosyal Medya Görsel Boyutlandırıcı',
    description: 'Instagram, YouTube, TikTok, LinkedIn ve X için görsellerinizi doğru ölçülere kolayca uyarlayın.',
    categoryId: 'gorsel',
    toolType: 'media',
    status: 'active',
    keywords: [
      'sosyal medya görsel boyutlandırıcı',
      'sosyal medya görsel boyutları',
      'görsel boyutlandır',
      'fotoğraf boyutlandır',
      'resim boyutlandır',
      'instagram boyut',
      'instagram görsel',
      'instagram fotoğraf boyutu',
      'story boyutu',
      'reels boyutu',
      'youtube thumbnail',
      'youtube kapak',
      'tiktok boyutu',
      'sosyal medya görsel',
      'resim kırpma',
      'görsel ölçekleme'
    ]
  },

  // --- PDF VE DOSYA ARAÇLARI (7) ---
  {
    id: 'pdf-birlestir',
    slug: 'pdf-birlestir',
    title: 'PDF Birleştirici',
    description: 'Birden fazla PDF belgesini sırasını dilediğiniz gibi belirleyerek tarayıcınızda %100 gizli ve güvenli şekilde tek bir PDF olarak birleştirin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf birleştir', 'pdf birleştirme', 'pdf birleştirici', 'merge pdf', 'pdf ekleme', 'pdf dosyalarını birleştir']
  },
  {
    id: 'pdf-bol',
    slug: 'pdf-bol',
    title: 'PDF Bölücü',
    description: 'Çok sayfalı PDF belgelerinden belirli sayfaları veya sayfa aralıklarını (ör. 1-3, 5, 8-10) ayırıp yeni bir PDF olarak kaydedin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf böl', 'pdf bölme', 'pdf bölücü', 'split pdf', 'pdf sayfalarını ayırma', 'pdf aralık bölme']
  },
  {
    id: 'pdf-sayfa-sil',
    slug: 'pdf-sayfa-sil',
    title: 'PDF Sayfa Silici',
    description: 'PDF belgenizdeki istenmeyen, boş veya hatalı sayfaları görsel ızgara üzerinden seçerek tek tıkla silin ve yeni dosyanızı indirin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf sayfa sil', 'pdf sayfa silme', 'pdf sayfa silici', 'delete pdf pages', 'pdf sayfa kaldırma']
  },
  {
    id: 'pdf-sayfa-dondur',
    slug: 'pdf-sayfa-dondur',
    title: 'PDF Sayfa Döndürücü',
    description: 'Yan veya ters duran PDF sayfalarını 90°, 180° veya 270° açıyla tek tek ya da topluca kalıcı olarak döndürün.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf sayfa döndür', 'pdf döndürme', 'rotate pdf', 'pdf çevirme', 'pdf sayfa yönü değiştir']
  },
  {
    id: 'jpg-pdf-donusturucu',
    slug: 'jpg-pdf-donusturucu',
    title: 'JPG PDF Dönüştürücü',
    description: 'JPG ve PNG görsellerinizi ücretsiz olarak tek PDF dosyasına dönüştürün. Dosyalarınızı tarayıcınızda yerel olarak işleyin ve PDF’inizi hemen indirin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['jpg pdf dönüştürücü', 'jpg to pdf', 'jpg pdf yapma', 'resmi pdf yap', 'fotoğrafı pdf yap', 'png to pdf', 'görselleri pdf yap']
  },
  {
    id: 'gorselleri-pdf-yap',
    slug: 'gorselleri-pdf-yap',
    title: 'Görselleri PDF Yap',
    description: 'Fotoğraf, taranmış evrak ve dekontlarınızı (JPG, PNG, WEBP) sıralayıp A4 veya özel sayfa boyutlarında tek bir PDF dosyasına çevirin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['jpg to pdf', 'görselleri pdf yap', 'png to pdf', 'resmi pdf yapma', 'fotoğrafı pdf yap', 'image to pdf']
  },
  {
    id: 'pdf-sayfa-cikar',
    slug: 'pdf-sayfa-cikar',
    title: 'PDF Sayfa Çıkarıcı',
    description: 'Büyük PDF dosyalarından yalnızca ihtiyacınız olan sayfaları seçerek yeni ve bağımsız bir PDF belgesi oluşturun.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf sayfa çıkar', 'pdf sayfa çıkarma', 'extract pdf pages', 'pdf sayfa ayıklama', 'pdf sayfa alma']
  },
  {
    id: 'pdf-jpg-donusturucu',
    slug: 'pdf-jpg-donusturucu',
    title: 'PDF → JPG Görsel Dönüştürücü',
    description: 'PDF sayfalarınızı tarayıcınızın grafik motoruyla yüksek çözünürlüklü JPEG formatındaki görsellere dönüştürün ve anında indirin.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['pdf to jpg', 'pdf jpg dönüştürücü', 'pdf resme çevirme', 'pdf to image', 'pdf jpg yapma']
  },
  {
    id: 'metni-pdf-donusturucu',
    slug: 'metni-pdf-donusturucu',
    title: "Metni PDF'e Dönüştür",
    description: 'Yazdığınız veya yapıştırdığınız metni hızlıca PDF dosyasına dönüştürün.',
    categoryId: 'pdf',
    toolType: 'pdf',
    status: 'active',
    keywords: ['metni pdf e dönüştür', 'metin pdf', 'pdf oluştur', 'yazıyı pdf yap', 'yazıyı pdf e çevir', 'metni pdf e çevir', 'text to pdf', 'txt pdf', 'pdf yap', 'yazıdan pdf', 'metin belgesi pdf', 'metin dönüştürme', 'metin pdf dönüştürücü', 'yazıyı pdf e donustur']
  }
];



export function getActiveCategories(): Category[] {
  const activeCategoryIds = new Set(tools.filter(t => t.status === 'active').map(t => t.categoryId));
  return categories.filter(c => activeCategoryIds.has(c.id));
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getToolsByCategoryId(categoryId: string): Tool[] {
  return tools.filter(t => t.categoryId === categoryId && t.status === 'active');
}

export function getCategorySampleTools(categoryId: string, limit = 4): string[] {
  return tools
    .filter(t => t.categoryId === categoryId && t.status === 'active')
    .slice(0, limit)
    .map(t => t.title.replace(/ Hesaplama| Dönüştürücü| Oluşturucu/gi, ''));
}

export function getPopularTools(): Tool[] {
  const popularSlugs = [
    'kdv-hesaplama',
    'yuzde-hesaplama',
    'maliyet-hesaplama',
    'pdf-jpg-donusturucu',
    'qr-kod-olusturucu',
    'kar-marji-hesaplama',
    'yakit-maliyeti-hesaplama',
    'guvenli-sifre-olusturucu',
  ];

  return popularSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter((t): t is Tool => Boolean(t && t.status === 'active'));
}

export function getFeaturedTools(limit = 8): Tool[] {
  const popular = getPopularTools();
  if (popular.length >= limit) return popular.slice(0, limit);
  const remaining = tools.filter(t => t.status === 'active' && !popular.some(p => p.id === t.id));
  return [...popular, ...remaining].slice(0, limit);
}

export const POPULAR_SEARCH_TAGS = [
  { label: 'KDV', query: 'kdv' },
  { label: 'PDF → JPG', query: 'pdf jpg' },
  { label: 'QR Kod', query: 'qr' },
  { label: 'Yüzde', query: 'yüzde' },
  { label: 'Maliyet', query: 'maliyet' },
  { label: 'Yakıt', query: 'yakıt' },
  { label: 'Şifre', query: 'şifre' },
  { label: 'Kredi', query: 'kredi' },
  { label: 'JSON', query: 'json' },
];

