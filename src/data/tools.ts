import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'egitim',
    slug: 'egitim',
    title: 'Eğitim & Sınavlar',
    description: 'YKS, LGS, KPSS, ALES, not ortalaması, GPA/GANO ve sınav puanı hesaplayıcıları',
  },
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

  // --- MAAŞ & ÇALIŞMA (12) ---
  {
    id: 'kidem-tazminati-hesaplama',
    slug: 'kidem-tazminati-hesaplama',
    title: 'Kıdem Tazminatı Hesaplama',
    description: '1475 sayılı Kanun uyarınca işe giriş-çıkış tarihi, brüt maaş ve yan haklarınıza göre yasal tavan ve damga vergisi dahil net kıdem tazminatınızı hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kıdem tazminatı hesaplama', 'kıdem tazminatı', 'tazminat hesaplama', 'kıdem tavanı', 'işten çıkarılma tazminatı', 'tazminat ne kadar', 'kidem']
  },
  {
    id: 'ihbar-tazminati-hesaplama',
    slug: 'ihbar-tazminati-hesaplama',
    title: 'İhbar Tazminatı Hesaplama',
    description: '4857 sayılı İş Kanunu Madde 17 uyarınca kıdem sürenize göre bildirim haftası, gelir vergisi ve damga vergisi kesintili net ihbar tazminatınızı hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ihbar tazminatı hesaplama', 'ihbar tazminatı', 'ihbar süresi ücreti', 'ihbar hesaplama', 'ihbar parası']
  },
  {
    id: 'kidem-ihbar-tazminati-hesaplama',
    slug: 'kidem-ihbar-tazminati-hesaplama',
    title: 'Kıdem ve İhbar Tazminatı Hesaplama',
    description: 'Kıdem ve ihbar tazminatı hak edişlerinizi aynı ekranda bir arada hesaplayarak toplam net ve brüt tazminat tutarınızı öğrenin.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kıdem ihbar hesaplama', 'tazminat toplamı', 'kıdem ve ihbar', 'toplam tazminat tutarı', 'işten ayrılma tazminatı']
  },
  {
    id: 'yillik-izin-hesaplama',
    slug: 'yillik-izin-hesaplama',
    title: 'Yıllık İzin Hesaplama',
    description: '4857 sayılı İş Kanunu Madde 53 gereğince toplam çalışma süreniz ve yaşınıza göre hak ettiğiniz yasal asgari yıllık ücretli izin gün sayısını hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yıllık izin hesaplama', 'yıllık izin hakkı', 'kaç gün izin hakkım var', 'izin süresi', 'yıllık ücretli izin', 'izin günü']
  },
  {
    id: 'kullanilmayan-yillik-izin-ucreti-hesaplama',
    slug: 'kullanilmayan-yillik-izin-ucreti-hesaplama',
    title: 'Kullanılmayan Yıllık İzin Ücreti Hesaplama',
    description: 'İş sözleşmesi sona erdiğinde kullanılmayan yıllık izin günlerinizin son brüt maaş üzerinden SGK, vergi ve net ücret karşılığını hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kullanılmayan izin ücreti', 'yıllık izin parası', 'izin ücreti hesaplama', 'kalan izin parası', 'izin alacağı']
  },
  {
    id: 'ihbar-suresi-hesaplama',
    slug: 'ihbar-suresi-hesaplama',
    title: 'İhbar Süresi Hesaplama',
    description: 'İşe giriş ve ayrılış tarihinize göre 4857 sayılı Kanundaki 2, 4, 6 veya 8 haftalık yasal bildirim sürenizi ve sözleşme bitiş tarihinizi hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ihbar süresi hesaplama', 'ihbar süresi kaç gün', 'bildirim süresi', 'kaç hafta ihbar', 'ihbar süresi kaç hafta']
  },
  {
    id: 'netten-brute-maas-hesaplama',
    slug: 'netten-brute-maas-hesaplama',
    title: 'Netten Brüte Maaş Hesaplama',
    description: 'Elinize geçen net maaştan SGK, işsizlik primi, vergi dilimleri ve asgari ücret vergi istisnası dahil gereken brüt maaşı ve işveren maliyetini hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['netten brüte maaş hesaplama', 'netten brüte', 'net maaşı brüte çevirme', 'brüt maaş bulma', 'netten brüte bordro']
  },
  {
    id: 'brutten-nete-maas-hesaplama',
    slug: 'brutten-nete-maas-hesaplama',
    title: 'Brütten Nete Maaş Hesaplama',
    description: 'Aylık brüt maaşınızdan SGK işçi primi, işsizlik primi, gelir vergisi, damga vergisi ve asgari ücret istisnası düşülerek net maaşınızı hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['brütten nete maaş hesaplama', 'brütten nete', 'brüt maaş nete çevirme', 'net maaş hesaplama', 'maaş bordrosu hesaplama']
  },
  {
    id: 'ise-giris-cikis-suresi-hesaplama',
    slug: 'ise-giris-cikis-suresi-hesaplama',
    title: 'İşe Giriş / Çıkış Süresi Hesaplama',
    description: 'İşe giriş ve işten ayrılış tarihleriniz arasındaki toplam çalışma süresini yıl, ay, gün ve toplam hafta olarak hesaplayın.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['işe giriş çıkış süresi', 'çalışma süresi hesaplama', 'kıdem süresi hesaplama', 'hizmet süresi', 'ne kadar çalıştım']
  },
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
,

  // ==========================================
  // 104 YENİ ARAÇ (GENİŞLETME PROJESİ)
  // ==========================================

  // --- 1. İŞ, MAAŞ & KARİYER (12) ---
  {
    id: 'isveren-maliyeti-hesaplama',
    slug: 'isveren-maliyeti-hesaplama',
    title: 'İşveren Maliyeti Hesaplama',
    description: 'Net veya brüt maaşa göre SGK primi, işsizlik fonu ve işverene toplam aylık şirket maliyetini hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['işveren maliyeti', 'toplam personel maliyeti', 'brüt maaş işveren primi', 'sgk işveren hissesi', 'şirket maliyeti']
  },
  {
    id: 'maas-zam-farki-hesaplama',
    slug: 'maas-zam-farki-hesaplama',
    title: 'Maaş Zam Farkı ve Yeni Maaş Hesaplama',
    description: 'Yüzdelik veya tutar bazlı zam oranına göre yeni net maaşınızı ve aylık net kazanç farkınızı hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['maaş zam farkı', 'zamlı maaş hesaplama', 'maaş artışı', 'yeni net maaş', 'zam oranı hesapla']
  },
  {
    id: 'deneme-suresi-hesaplama',
    slug: 'deneme-suresi-hesaplama',
    title: 'Deneme Süresi Hesaplama (İş Kanunu)',
    description: '4857 sayılı İş Kanununa göre 2 aylık standart veya 4 aylık toplu iş sözleşmeli deneme süresi bitiş tarihini hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['deneme süresi hesaplama', 'iş sözleşmesi deneme süresi', '2 ay deneme süresi', 'deneme süresi bitiş tarihi', 'iş kanunu deneme']
  },
  {
    id: 'asgari-ucret-karsilastirma',
    slug: 'asgari-ucret-karsilastirma',
    title: 'Maaşın Asgari Ücrete Oranı Hesaplama',
    description: 'Maaşınızın net asgari ücrete oranını, asgari ücretin kaç katı olduğunu ve geçmiş dönem trendini karşılaştırın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['asgari ücret karşılaştırma', 'maaşım asgari ücretin kaç katı', 'asgari ücrete oran', 'maaş alım gücü']
  },
  {
    id: 'emeklilik-yasi-hesaplama',
    slug: 'emeklilik-yasi-hesaplama',
    title: 'Emeklilik Yaşı ve Kalan Süre Hesaplama',
    description: 'Sigorta başlangıç tarihi, prim gün sayısı ve doğum tarihinize göre SGK kademeli emeklilik yaşını ve kalan süreyi hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['emeklilik yaşı hesaplama', 'ne zaman emekli olurum', 'kademeli emeklilik', 'emeklilik prim günü', 'eyt emeklilik']
  },
  {
    id: 'kidem-suresi-hesaplama',
    slug: 'kidem-suresi-hesaplama',
    title: 'Kıdem Süresi Hesaplama (Yıl, Ay, Gün)',
    description: 'İşe giriş ve ayrılış tarihlerine göre işyerindeki toplam kıdem sürenizi gün, ay ve yıl olarak tam hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kıdem süresi hesaplama', 'hizmet süresi bulma', 'kaç yıldır çalışıyorum', 'tazminat süresi hesaplama']
  },
  {
    id: 'part-time-ucret-hesaplama',
    slug: 'part-time-ucret-hesaplama',
    title: 'Kısmi Süreli (Part-Time) Ücret Hesaplama',
    description: 'Haftalık ve aylık çalışma saatine göre kısmi süreli çalışan personelin net ve brüt hak edişini hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['part time maaş hesaplama', 'kısmi süreli ücret', 'saatlik çalışma maaşı', 'yarı zamanlı maaş']
  },
  {
    id: 'ise-alim-maliyeti-hesaplama',
    slug: 'ise-alim-maliyeti-hesaplama',
    title: 'İşe Alım Toplam Maliyeti Hesaplama',
    description: 'İlan, mülakat, oryantasyon, eğitim ve ekipman giderleriyle yeni personel işe alım maliyetini hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['işe alım maliyeti', 'personel alım masrafı', 'cost per hire', 'ik işe alım bütçesi']
  },
  {
    id: 'gunluk-yemek-yol-ucreti-hesaplama',
    slug: 'gunluk-yemek-yol-ucreti-hesaplama',
    title: 'Aylık Yemek ve Yol Ücreti Hesaplama',
    description: 'Günlük yemek ve yol yardım bedelleri ile fiili çalışılan iş günü sayısına göre aylık toplam hak edişi hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yemek parası hesaplama', 'yol parası hesaplama', 'aylık yemek kartı', 'günlük multinet ticket', 'yol yardımı']
  },
  {
    id: 'bes-hesaplama',
    slug: 'bes-hesaplama',
    title: 'BES Devlet Katkısı ve Birikim Hesaplama',
    description: 'Aylık tasarruf tutarı, %30 devlet katkısı ve tahmini fon getirisiyle Bireysel Emeklilik toplam birikimini hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['bes hesaplama', 'bireysel emeklilik devlet katkısı', 'bes getirisi', 'yüzde 30 devlet katkısı', 'otomatik katılım bes']
  },
  {
    id: 'isten-ayrilma-bildirim-suresi',
    slug: 'isten-ayrilma-bildirim-suresi',
    title: 'İstifa ve İhbar Bildirim Süresi Hesaplama',
    description: 'İş Kanununa göre çalışma kıdeminize uygun ihbar önel süresini (2, 4, 6, 8 hafta) ve yasal çıkış tarihinizi hesaplayın.',
    categoryId: 'maas',
    toolType: 'calculator',
    status: 'active',
    keywords: ['istifa bildirim süresi', 'ihbar süresi hesaplama', 'ne zaman işten ayrılabilirim', 'önel süresi', 'ihbar haftası']
  },
  {
    id: 'serbest-meslek-makbuzu-hesaplama',
    slug: 'serbest-meslek-makbuzu-hesaplama',
    title: 'Serbest Meslek Makbuzu (SMM) Hesaplama',
    description: 'Brüt veya net ücretten %20 gelir vergisi stopajı ve %20 KDV dahil serbest meslek makbuzu hesaplayın.',
    categoryId: 'muhasebe',
    toolType: 'calculator',
    status: 'active',
    keywords: ['smm hesaplama', 'serbest meslek makbuzu', 'stopaj kdv smm', 'brütten nete smm', 'avukat doktor makbuzu']
  },

  // --- 2. FİNANS, BİRİKİM & YATIRIM (14) ---
  {
    id: 'bilesik-faiz-hesaplama',
    slug: 'bilesik-faiz-hesaplama',
    title: 'Bileşik Faiz ve Gelecek Değer Hesaplama',
    description: 'Ana para, yıllık getiri oranı, eklenen düzenli katkı ve vadeye göre bileşik faiz getirisini ve servet büyümesini hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['bileşik faiz hesaplama', 'compound interest', 'gelecek değer', 'faiz üstüne faiz', 'birikim büyümesi']
  },
  {
    id: 'aylik-birikim-tasarruf-hesaplama',
    slug: 'aylik-birikim-tasarruf-hesaplama',
    title: 'Aylık Düzenli Birikim ve Tasarruf Hesaplama',
    description: 'Her ay kenara ayıracağınız tutar ve tahmini yıllık reel getiri oranıyla gelecekteki toplam birikiminizi hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['aylık birikim hesaplama', 'tasarruf projeksiyonu', 'düzenli yatırım', 'ayda 5000 tl biriktirmek', 'tasarruf planı']
  },
  {
    id: 'tasarruf-hedefi-hesaplama',
    slug: 'tasarruf-hedefi-hesaplama',
    title: 'Tasarruf Hedefi ve Gerekli Süre Hesaplama',
    description: 'Ev, araba veya tatil hedef tutarınıza ulaşmak için her ay ne kadar biriktirmeniz gerektiğini hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['tasarruf hedefi', 'hedef birikim hesaplama', 'araba için para biriktirme', 'ev peşinatı birikim süresi']
  },
  {
    id: 'pesin-taksit-karsilastirma',
    slug: 'pesin-taksit-karsilastirma',
    title: 'Peşin İndirim vs Taksit Karşılaştırma',
    description: 'Peşin ödeme indirimi ile taksitli fiyatı mevduat faiz fırsat maliyetiyle karşılaştırıp en karlı seçeneği bulun.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['peşin mi taksit mi', 'peşin taksit karşılaştırma', 'fırsat maliyeti faiz', 'peşin indirim hesabı']
  },
  {
    id: 'alim-gucu-hesaplama',
    slug: 'alim-gucu-hesaplama',
    title: 'Enflasyon ve Alım Gücü Kaybı Hesaplama',
    description: 'Enflasyon karşısında paranızın veya maaşınızın reel satın alma gücü kaybını ve erimesini hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['alım gücü hesaplama', 'enflasyon para erimesi', 'reel değer kaybı', 'paranın alım gücü', 'enflasyon kaybı']
  },
  {
    id: 'altin-kar-zarar-hesaplama',
    slug: 'altin-kar-zarar-hesaplama',
    title: 'Altın Alım-Satım Kâr / Zarar Hesaplama',
    description: 'Gram, çeyrek, yarım veya cumhuriyet altını alış ve satış fiyatlarına göre net TL kâr/zarar ve getiri oranını hesaplayın.',
    categoryId: 'yatirim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['altın kar zarar hesaplama', 'gram altın kazanç', 'çeyrek altın karı', 'altın yatırımı getiri', 'altın alım satım']
  },
  {
    id: 'doviz-kar-zarar-hesaplama',
    slug: 'doviz-kar-zarar-hesaplama',
    title: 'Döviz Alım-Satım Kâr / Zarar Hesaplama',
    description: 'Dolar, Euro veya diğer para birimlerinde alış kuru ve satış kuruna göre net TL kârını ve getiri yüzdesini hesaplayın.',
    categoryId: 'yatirim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['döviz kar zarar', 'dolar kazanç hesaplama', 'euro karı', 'döviz alım satım karı', 'kur farkı kazancı']
  },
  {
    id: 'borc-kapatma-kredisi-hesaplama',
    slug: 'borc-kapatma-kredisi-hesaplama',
    title: 'Borç Kapatma (Transfer) Kredisi Hesaplama',
    description: 'Kredi kartı ve farklı banka borçlarınızı tek bir transfer kredisinde birleştirerek aylık taksit tasarrufunuzu hesaplayın.',
    categoryId: 'kredi',
    toolType: 'calculator',
    status: 'active',
    keywords: ['borç kapatma kredisi', 'borç transferi', 'kredi birleştirme', 'borç yapılandırma', 'taksit tasarrufu']
  },
  {
    id: 'mevduat-getirisi-net-stopaj',
    slug: 'mevduat-getirisi-net-stopaj',
    title: 'Net Mevduat Faizi ve Stopaj Kesintisi Hesaplama',
    description: 'Mevduat tutarı, faiz oranı ve vade gününe göre yasal stopaj kesintisi düşülmüş net TL faiz kazancını hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['mevduat faizi net kazanç', 'stopaj kesintisi hesaplama', 'net vadeli mevduat', 'faiz getirisi net', 'mevduat stopaj oranları']
  },
  {
    id: 'kredi-erken-kapama-hesaplama',
    slug: 'kredi-erken-kapama-hesaplama',
    title: 'Kredi Erken Kapatma ve Faiz İndirimi Hesaplama',
    description: 'Kredinizi vadesinden önce kapattığınızda silinecek faiz tutarını ve yasal erken kapama komisyonu sonrası net kârınızı hesaplayın.',
    categoryId: 'kredi',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kredi erken kapama', 'erken ödeme faiz indirimi', 'kredi kapatma cezası', 'erken kapama karı', 'kredi borcu kapatma']
  },
  {
    id: 'fon-getiri-hesaplama',
    slug: 'fon-getiri-hesaplama',
    title: 'Yatırım Fonu Getirisi ve Kazanç Hesaplama',
    description: 'TEFAS yatırım fonlarında pay adedi, alış birim fiyatı ve güncel birim fiyata göre toplam net getiriyi hesaplayın.',
    categoryId: 'yatirim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['fon getiri hesaplama', 'tefas fon kazancı', 'yatırım fonu kar zarar', 'para piyasası fonu getiri', 'hisse fonu kazanç']
  },
  {
    id: 'temettu-verimi-hesaplama',
    slug: 'temettu-verimi-hesaplama',
    title: 'Temettü Verimi ve Net Gelir Hesaplama',
    description: 'Hisse senedi fiyatı, hisse başı temettü (DPS) ve lot sayısına göre temettü verim oranını ve net nakit temettüyü hesaplayın.',
    categoryId: 'yatirim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['temettü verimi hesaplama', 'hisse temettü geliri', 'bist temettü', 'temettü emekliliği', 'net temettü stopaj']
  },
  {
    id: 'gunluk-faiz-hesaplama',
    slug: 'gunluk-faiz-hesaplama',
    title: 'Günlük (Gecelik) Faiz Hesaplama',
    description: 'Gecelik faiz, günlük mevduat ve para piyasası fonlarında 1 günlük net faiz getirisini ve stopaj tutarını hesaplayın.',
    categoryId: 'finans',
    toolType: 'calculator',
    status: 'active',
    keywords: ['günlük faiz hesaplama', 'gecelik faiz getirisi', 'günlük mevduat kazancı', 'günlük vadeli faiz']
  },
  {
    id: 'amortisman-hesaplama',
    slug: 'amortisman-hesaplama',
    title: 'Amortisman Hesaplama (Normal ve Azalan Bakiyeler)',
    description: 'Duran varlıkların faydalı ömür ve amortisman oranına göre normal (doğrusal) ve azalan bakiyeler yöntemiyle yıllık yıpranma payını hesaplayın.',
    categoryId: 'muhasebe',
    toolType: 'calculator',
    status: 'active',
    keywords: ['amortisman hesaplama', 'azalan bakiyeler amortisman', 'doğrusal amortisman', 'faydalı ömür amortisman', 'demirbaş amortismanı']
  },

  // --- 3. VERGİ, TİCARET & ALIŞVERİŞ (12) ---
  {
    id: 'iskonto-hesaplama',
    slug: 'iskonto-hesaplama',
    title: 'Kademeli İskonto ve İndirim Hesaplama',
    description: 'Toptan ve ticari satışlarda zincirleme iskonto oranları (%20 + %10 vb.) ile liste fiyatından net tutarı hesaplayın.',
    categoryId: 'ticaret',
    toolType: 'calculator',
    status: 'active',
    keywords: ['iskonto hesaplama', 'kademeli iskonto', 'zincir iskonto', 'ticari iskonto', 'iskonto formülü']
  },
  {
    id: 'pazaryeri-komisyon-kar-hesaplama',
    slug: 'pazaryeri-komisyon-kar-hesaplama',
    title: 'Pazaryeri Komisyon ve Net Kâr Hesaplama',
    description: 'Trendyol, Hepsiburada, Amazon pazaryeri satışlarında komisyon, kargo, KDV ve maliyet sonrası net satıcı kârını hesaplayın.',
    categoryId: 'ticaret',
    toolType: 'calculator',
    status: 'active',
    keywords: ['pazaryeri komisyon hesaplama', 'trendyol komisyon', 'hepsiburada kar hesaplama', 'pazaryeri kargo kesintisi', 'e-ticaret kar marjı']
  },
  {
    id: 'otv-hesaplama',
    slug: 'otv-hesaplama',
    title: 'ÖTV ve KDV Dahil Fiyat Hesaplama',
    description: 'Vergisiz matrah üzerinden Özel Tüketim Vergisi (ÖTV) ve ÖTVli tutar üzerinden %20 KDV ile nihai satış fiyatını hesaplayın.',
    categoryId: 'muhasebe',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ötv hesaplama', 'ötv kdv dahil fiyat', 'özel tüketim vergisi', 'vergisiz fiyattan ötv', 'ötv oranları']
  },
  {
    id: 'tevkifat-kdv-hesaplama',
    slug: 'tevkifat-kdv-hesaplama',
    title: 'Tevkifatlı KDV ve Fatura Hesaplama',
    description: '2/10, 5/10, 7/10, 9/10 tevkifat oranlarına göre tevkif edilecek KDV, ödenecek KDV ve satıcı tahsilat tutarını hesaplayın.',
    categoryId: 'muhasebe',
    toolType: 'calculator',
    status: 'active',
    keywords: ['tevkifat hesaplama', 'tevkifatlı kdv faturası', '5/10 tevkifat', '7/10 tevkifat', 'kdv tevkifat oranları']
  },
  {
    id: 'birim-fiyat-karsilastirma',
    slug: 'birim-fiyat-karsilastirma',
    title: 'Market Birim Fiyat Karşılaştırma (100g / 1kg)',
    description: 'Farklı gramaj ve paket fiyatlarındaki ürünleri 100g, 1kg veya 1L bazında kıyaslayarak hangisinin daha ekonomik olduğunu bulun.',
    categoryId: 'alisveris',
    toolType: 'calculator',
    status: 'active',
    keywords: ['birim fiyat hesaplama', 'hangisi daha ucuz', 'market fiyat kıyaslama', 'gramaj fiyat karşılaştırma', '100g birim fiyat']
  },
  {
    id: 'kampanya-fiyat-hesaplama',
    slug: 'kampanya-fiyat-hesaplama',
    title: 'Kampanya ve Sepet İndirimi Hesaplama',
    description: '3 Al 2 Öde, 2. Ürüne %50 İndirim ve sepette indirim kampanyalarında adet başına düşen gerçek net maliyeti hesaplayın.',
    categoryId: 'alisveris',
    toolType: 'calculator',
    status: 'active',
    keywords: ['3 al 2 öde hesaplama', '2. ürüne yüzde 50', 'kampanyalı fiyat', 'sepet indirimi', 'adet başı fiyat']
  },
  {
    id: 'markup-fiyatlandirma-hesaplama',
    slug: 'markup-fiyatlandirma-hesaplama',
    title: 'Markup Fiyatlandırma ve Kâr Marjı Hesaplama',
    description: 'Ürün maliyeti üzerine eklenen markup (kâr payı) yüzdesiyle satış fiyatını ve elde edilen kâr marjını hesaplayın.',
    categoryId: 'ticaret',
    toolType: 'calculator',
    status: 'active',
    keywords: ['markup hesaplama', 'maliyet üstü kar', 'markup kar marjı farkı', 'satış fiyatı belirleme', 'maliyet fiyatlandırma']
  },
  {
    id: 'gumruk-vergisi-hesaplama',
    slug: 'gumruk-vergisi-hesaplama',
    title: 'Yurtdışı Alışveriş Gümrük Vergisi Hesaplama',
    description: 'Yurtdışından posta ve hızlı kargo ile gelen ürünlerde AB (%30) ve AB dışı (%60) gümrük vergisi ve ÖTV maliyetini hesaplayın.',
    categoryId: 'alisveris',
    toolType: 'calculator',
    status: 'active',
    keywords: ['gümrük vergisi hesaplama', 'yurtdışı alışveriş vergisi', 'temu gümrük vergisi', 'aliexpress vergi', 'ab dışı gümrük vergisi']
  },
  {
    id: 'damga-vergisi-hesaplama',
    slug: 'damga-vergisi-hesaplama',
    title: 'Damga Vergisi Hesaplama (Sözleşmeler)',
    description: '488 sayılı Damga Vergisi Kanununa göre sözleşme ve taahhütnamelerde binde 9.48 ve maktu damga vergisini hesaplayın.',
    categoryId: 'muhasebe',
    toolType: 'calculator',
    status: 'active',
    keywords: ['damga vergisi hesaplama', 'sözleşme damga vergisi', 'binde 9.48 damga vergisi', 'damga pulu', 'kira sözleşmesi damga vergisi']
  },
  {
    id: 'pesinatsiz-taksit-tutari-hesaplama',
    slug: 'pesinatsiz-taksit-tutari-hesaplama',
    title: 'Peşinatsız Taksit Tutarı Hesaplama',
    description: 'Toplam alışveriş tutarı, vade farkı oranı ve taksit sayısına göre aylık eşit ödenecek taksit tutarını hesaplayın.',
    categoryId: 'alisveris',
    toolType: 'calculator',
    status: 'active',
    keywords: ['taksit tutarı hesaplama', 'aylık taksit ne kadar', 'vade farklı taksit', 'kredi kartı taksit tutarı']
  },
  {
    id: 'kira-artis-orani-hesaplama',
    slug: 'kira-artis-orani-hesaplama',
    title: 'Yasal Kira Artış Oranı Hesaplama (TÜFE)',
    description: 'TÜİK 12 aylık ortalama TÜFE değişim oranına göre konut ve işyeri yasal azami kira artış tutarını ve yeni kirayı hesaplayın.',
    categoryId: 'gayrimenkul',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kira artış oranı hesaplama', 'tüfe kira zammı', 'yasal kira artışı', 'konut kira tavanı', 'yeni kira hesaplama']
  },
  {
    id: 'kira-gelir-vergisi-hesaplama',
    slug: 'kira-gelir-vergisi-hesaplama',
    title: 'Kira Gelir Vergisi (GMSİ) Hesaplama',
    description: 'Yıllık konut ve işyeri kira gelirinden konut istisnası ve %15 götürü gider düşerek ödenecek gelir vergisini ve taksitlerini hesaplayın.',
    categoryId: 'gayrimenkul',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kira gelir vergisi hesaplama', 'gmsi beyannamesi', 'konut istisnası', 'götürü gider kira vergisi', 'ev kira vergisi']
  },

  // --- 4. EĞİTİM, SINAV & NOT HESAPLAMA (15) ---
  {
    id: 'vize-final-hesaplama',
    slug: 'vize-final-hesaplama',
    title: 'Vize Final Not Ortalaması Hesaplama',
    description: 'Üniversite vize (%40) ve final (%60) sınav notları ve ağırlık yüzdeleriyle dönem sonu ders geçme notunu hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['vize final hesaplama', 'ders ortalaması üniversite', 'vize yüzde 40 final yüzde 60', 'geçme notu hesaplama', 'üniversite vize final']
  },
  {
    id: 'finalde-kac-almaliyim',
    slug: 'finalde-kac-almaliyim',
    title: 'Finalde Kaç Almalıyım Hesaplama',
    description: 'Vize notunuzu ve hedeflenen geçme notunu girerek dersten geçmek için finalden almanız gereken en düşük notu hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['finalden kaç almalıyım', 'final notu hesaplama', 'vizeden sonra finalde kaç lazım', 'dersten geçmek için final notu']
  },
  {
    id: 'gpa-gano-hesaplama',
    slug: 'gpa-gano-hesaplama',
    title: 'GPA / GANO Not Ortalaması Hesaplama (4.00 Üzerinden)',
    description: 'Ders kredileri ve harf notlarına göre 4.00 üzerinden ağırlıklı genel not ortalamasını (GANO) ve 100lük karşılığını hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['gpa hesaplama', 'gano hesaplama', 'üniversite not ortalaması', '4lük sistem not ortalaması', 'akts kredi ortalama']
  },
  {
    id: 'not-ortalamasi-hesaplama',
    slug: 'not-ortalamasi-hesaplama',
    title: 'Ders Not Ortalaması Hesaplama',
    description: 'Yazılı sınavlar, sözlü ve performans notlarının aritmetik veya ağırlıklı ortalamasını kolayca hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['not ortalaması hesaplama', 'yazılı sözlü ortalaması', 'okul not ortalaması', 'dönem sonu notu']
  },
  {
    id: 'harf-notu-hesaplama',
    slug: 'harf-notu-hesaplama',
    title: 'Harf Notu ve Katsayı Hesaplama',
    description: '100 üzerinden alınan notun üniversite harf notu karşılığını (AA, BA, BB, CB, CC, DC, DD, FF) ve katsayısını öğrenin.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['harf notu hesaplama', 'aa ba bb harf notları', 'harf notu katsayıları', '100lük sistem harf notu karşılığı']
  },
  {
    id: 'yks-tyt-net-hesaplama',
    slug: 'yks-tyt-net-hesaplama',
    title: 'YKS TYT Net Hesaplama (120 Soru)',
    description: 'Türkçe, Temel Matematik, Fen Bilimleri ve Sosyal Bilimler testlerinde doğru ve yanlış sayılarına göre 4 yanlış 1 doğru kuralıyla net hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['tyt net hesaplama', 'yks net hesaplama', 'tyt 120 soru net', '4 yanlış 1 doğru tyt', 'öys tyt puanı']
  },
  {
    id: 'yks-ayt-net-hesaplama',
    slug: 'yks-ayt-net-hesaplama',
    title: 'YKS AYT Net Hesaplama (Sayısal, EA, Sözel)',
    description: 'Matematik, Fizik, Kimya, Biyoloji, Edebiyat ve Tarih testlerinde AYT netlerinizi alan bazında tam doğrulukla hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ayt net hesaplama', 'yks ayt sayısal net', 'ayt eşit ağırlık net', 'ayt sözel net hesapla', 'alan yeterlilik testi']
  },
  {
    id: 'lgs-net-hesaplama',
    slug: 'lgs-net-hesaplama',
    title: 'LGS Net Hesaplama (3 Yanlış 1 Doğru)',
    description: 'Milli Eğitim Bakanlığı LGS sınavında Sözel ve Sayısal bölümlerde 3 yanlış 1 doğru kuralıyla ders bazında netlerinizi hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['lgs net hesaplama', 'lgs 3 yanlış 1 doğru', 'lgs sözel sayısal net', 'meb lgs netleri']
  },
  {
    id: 'kpss-net-hesaplama',
    slug: 'kpss-net-hesaplama',
    title: 'KPSS Net Hesaplama (Genel Yetenek & Genel Kültür)',
    description: 'KPSS Lisans, Ön Lisans ve Ortaöğretim Genel Yetenek - Genel Kültür 120 soruluk testlerinde toplam netlerinizi hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kpss net hesaplama', 'kpss genel yetenek net', 'kpss genel kültür net', '4 yanlış 1 doğru kpss', 'kpss puan netleri']
  },
  {
    id: 'ales-net-hesaplama',
    slug: 'ales-net-hesaplama',
    title: 'ALES Net Hesaplama (Sayısal & Sözel)',
    description: '50 Sayısal ve 50 Sözel sorusunda 4 yanlış 1 doğru kuralıyla ALES Sayısal, Sözel ve Eşit Ağırlık netlerinizi hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ales net hesaplama', 'ales sayısal net', 'ales sözel net', 'ösem ales net hesabı', 'akademik lisansüstü sınavı']
  },
  {
    id: 'yds-net-hesaplama',
    slug: 'yds-net-hesaplama',
    title: 'YDS ve YÖKDİL Puan ve Seviye Hesaplama',
    description: '80 soruluk YDS / YÖKDİL sınavında doğru sayınıza göre 100 üzerinden puanınızı ve yabancı dil seviyenizi (A, B, C, D, E) hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yds puan hesaplama', 'yökdil puanı', 'yds 80 soru puan', 'yabancı dil seviyesi a b c', 'yds kaç doğru kaç puan']
  },
  {
    id: 'dgs-net-hesaplama',
    slug: 'dgs-net-hesaplama',
    title: 'DGS Net Hesaplama (Sayısal & Sözel)',
    description: 'Dikey Geçiş Sınavı Sayısal ve Sözel testlerinde doğru ve yanlış sayılarına göre netlerinizi hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['dgs net hesaplama', 'dikey geçiş sınavı net', 'dgs sayısal sözel', 'dgs net hesapla']
  },
  {
    id: 'devamsizlik-hesaplama',
    slug: 'devamsizlik-hesaplama',
    title: 'Devamsızlık ve Kalan Hak Hesaplama',
    description: 'MEB lise (özürsüz 10, toplam 30 gün) ve üniversite ders devam zorunluluğuna göre kalan devamsızlık hakkınızı hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['devamsızlık hesaplama', 'kaç gün devamsızlık hakkım kaldı', 'lise devamsızlık sınırı', 'üniversite devamsızlık hesabı']
  },
  {
    id: 'takdir-tesekkur-hesaplama',
    slug: 'takdir-tesekkur-hesaplama',
    title: 'Takdir ve Teşekkür Belgesi Hesaplama',
    description: 'Ders notları, haftalık ders saatleri ve devamsızlık şartına göre Takdir veya Teşekkür belgesi kazanma durumunu hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['takdir teşekkür hesaplama', 'takdir alabilir miyim', 'teşekkür belgesi kaç puan', 'meb takdir teşekkür şartları']
  },
  {
    id: 'kyk-kredi-hesaplama',
    slug: 'kyk-kredi-hesaplama',
    title: 'KYK Öğrenim Kredisi Geri Ödeme Hesaplama',
    description: '7420 sayılı Kanun kapsamında KYK öğrenim kredisi borcu, aylık taksit tutarı ve faizsiz geri ödeme planını hesaplayın.',
    categoryId: 'egitim',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kyk kredi hesaplama', 'kyk borcu', 'kyk geri ödeme taksit', 'öğrenim kredisi faizsiz', 'gsb kyk borç ödeme']
  },

  // --- 5. MATEMATİK & İSTATİSTİK (10) ---
  {
    id: 'yuzde-degisim-fark-hesaplama',
    slug: 'yuzde-degisim-fark-hesaplama',
    title: 'Yüzde Değişim ve Artış/Azalış Farkı Hesaplama',
    description: 'Eski ve yeni değer arasındaki yüzde artış, azalış ve mutlak fark oranını tek tıkla hesaplayın.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yüzde değişim hesaplama', 'yüzde artış azalış', 'iki sayı arası yüzde fark', 'artış oranı hesapla']
  },
  {
    id: 'medyan-mod-hesaplama',
    slug: 'medyan-mod-hesaplama',
    title: 'Medyan, Mod, Ortalama ve Açıklık Hesaplama',
    description: 'Sayı dizisinin ortancasını (medyan), tepe değerini (mod), aritmetik ortalamasını ve açıklığını anında bulun.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['medyan hesaplama', 'mod hesaplama', 'ortanca bulma', 'istatistik medyan mod', 'veri açıklığı']
  },
  {
    id: 'faktoriyel-hesaplama',
    slug: 'faktoriyel-hesaplama',
    title: 'Faktöriyel (n!) Hesaplama ve Açılımı',
    description: 'Büyük sayılar dahil faktöriyel değerini, basamak sayısını ve tam matematiksel açılımını hesaplayın.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['faktöriyel hesaplama', 'n faktöriyel', 'faktoriyel bulucu', 'faktöriyel açılımı', 'matematik faktöriyel']
  },
  {
    id: 'kombinasyon-permutasyon-hesaplama',
    slug: 'kombinasyon-permutasyon-hesaplama',
    title: 'Kombinasyon C(n, r) ve Permütasyon P(n, r) Hesaplama',
    description: 'Seçim (kombinasyon) ve sıralama (permütasyon) olasılık hesaplamalarını formül adımlarıyla anında çözün.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kombinasyon hesaplama', 'permütasyon hesaplama', 'c n r kombinasyon', 'olasılık kombinasyon permütasyon']
  },
  {
    id: 'asal-sayi-kontrolu',
    slug: 'asal-sayi-kontrolu',
    title: 'Asal Sayı Kontrolü ve Pozitif Bölenleri',
    description: 'Bir sayının asal olup olmadığını kontrol edin, tüm pozitif bölenlerini ve en yakın asal sayıları bulun.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['asal sayı kontrolü', 'asal mı', 'çarpanlarına ayırma', 'pozitif bölenler', 'asal sayılar']
  },
  {
    id: 'kesir-hesaplama',
    slug: 'kesir-hesaplama',
    title: 'Kesir Hesaplama (Toplama, Çıkarma, Çarpma, Bölme)',
    description: 'Kesirli sayılarda dört işlem yapın, payda eşitleme adımlarını ve en sade tam sayılı kesir sonucunu görün.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kesir hesaplama', 'kesirlerde toplama çıkarma', 'kesirli işlemler', 'payda eşitleme', 'kesir sadeleştirme']
  },
  {
    id: 'ondalik-kesir-donusturucu',
    slug: 'ondalik-kesir-donusturucu',
    title: 'Ondalık Sayıyı Kesre Dönüştürücü',
    description: 'Virgüllü ondalık sayıları en sade rasyonel kesir haline ve tam sayılı kesre anında dönüştürün.',
    categoryId: 'matematik',
    toolType: 'converter',
    status: 'active',
    keywords: ['ondalık sayıyı kesre çevirme', 'virgüllü sayıyı kesir yapma', 'rasyonel sayı dönüştürücü', 'kesir çevirici']
  },
  {
    id: 'yuvarlama-araci',
    slug: 'yuvarlama-araci',
    title: 'Sayı Yuvarlama Aracı (Round, Ceil, Floor)',
    description: 'Sayıları en yakın tam sayıya, yukarıya (Ceil), aşağıya (Floor) veya istenen ondalık basamağa yuvarlayın.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['sayı yuvarlama', 'aşağı yuvarlama', 'yukarı yuvarlama', 'en yakın tam sayı', 'ondalık basamak yuvarla']
  },
  {
    id: 'standart-sapma-hesaplama',
    slug: 'standart-sapma-hesaplama',
    title: 'Standart Sapma ve Varyans Hesaplama',
    description: 'Veri setinizin örneklem ve popülasyon standart sapmasını, varyansını ve ortalamadan sapma değerlerini hesaplayın.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['standart sapma hesaplama', 'varyans hesaplama', 'istatistik standart sapma', 'örneklem sapması']
  },
  {
    id: 'cember-daire-hesaplama',
    slug: 'cember-daire-hesaplama',
    title: 'Çember ve Daire Alanı / Çevresi Hesaplama',
    description: 'Yarıçap veya çapa göre daire alanı, çember çevresi ve istenen merkez açıya sahip daire dilimi alanını hesaplayın.',
    categoryId: 'matematik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['daire alanı hesaplama', 'çember çevresi', 'pi sayısı daire', 'daire dilimi alanı', 'yarıçaptan alan']
  },

  // --- 6. TARİH, ZAMAN & TAKVİM (9) ---
  {
    id: 'saat-farki-hesaplama',
    slug: 'saat-farki-hesaplama',
    title: 'İki Saat Arası Süre Farkı Hesaplama',
    description: 'Başlangıç ve bitiş saatleri arasındaki saat, dakika ve toplam süreyi (gece yarısı geçişleri dahil) hesaplayın.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['saat farkı hesaplama', 'iki saat arası süre', 'çalışma saati farkı', 'kaç saat kaç dakika', 'zaman farkı bulucu']
  },
  {
    id: 'yas-farki-hesaplama',
    slug: 'yas-farki-hesaplama',
    title: 'İki Tarih / Yaş Farkı Hesaplama',
    description: 'İki kişi veya iki tarih arasındaki kesin yaş farkını yıl, ay, gün, hafta ve saat bazında hesaplayın.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yaş farkı hesaplama', 'iki kişi yaş farkı', 'tarih farkı', 'kaç yaş büyüğüm', 'yaş farkı bulma']
  },
  {
    id: 'haftanin-gunu-bulma',
    slug: 'haftanin-gunu-bulma',
    title: 'Hangi Gün Doğdum / Haftanın Gününü Bulma',
    description: 'Geçmiş veya gelecekteki herhangi bir tarihin haftanın hangi gününe (Pazartesi, Cuma vb.) denk geldiğini bulun.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['hangi gün doğdum', 'haftanın gününü bulma', 'tarih hangi gün', 'doğum günü hangi gün', 'takvim günü bulucu']
  },
  {
    id: 'yilin-kacinci-gunu-haftasi',
    slug: 'yilin-kacinci-gunu-haftasi',
    title: 'Yılın Kaçıncı Günü ve Haftası Hesaplama',
    description: 'Seçilen tarihin yılın kaçıncı günü ve haftası olduğunu, yılın yüzde kaçının tamamlandığını anında öğrenin.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yılın kaçıncı günü', 'yılın kaçıncı haftası', 'day of year', 'yıl ilerleme yüzdesi', 'takvim haftası']
  },
  {
    id: 'artik-yil-kontrolu',
    slug: 'artik-yil-kontrolu',
    title: 'Artık Yıl Kontrolü ve 366 Gün Sorgulama',
    description: 'Bir yılın artık yıl (Şubat 29 çeken, 366 gün) olup olmadığını takvimsel kurallarla anında sorgulayın.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['artık yıl hesaplama', 'artık yıl mı', 'şubat 29 çeken yıllar', 'leap year calculator', '366 gün olan yıllar']
  },
  {
    id: 'zaman-dilimi-donusturucu',
    slug: 'zaman-dilimi-donusturucu',
    title: 'Dünya Saatleri ve Zaman Dilimi Dönüştürücü',
    description: 'Türkiye saati (UTC+3) ile Londra, New York, Tokyo, Berlin ve diğer dünya şehirleri arasındaki saat farkını dönüştürün.',
    categoryId: 'zaman',
    toolType: 'converter',
    status: 'active',
    keywords: ['zaman dilimi dönüştürücü', 'dünya saatleri', 'time zone converter', 'türkiye amerika saat farkı', 'londra saati kaç']
  },
  {
    id: 'geri-sayim-araci',
    slug: 'geri-sayim-araci',
    title: 'Canlı Geri Sayım Sayacı (Tarihe Kalan Süre)',
    description: 'Sınavlar, yeni yıl, doğum günleri veya özel hedefleriniz için gün, saat, dakika ve saniye canlı geri sayım oluşturun.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['geri sayım sayacı', 'canlı geri sayım', 'tarihe ne kadar kaldı', 'yeni yıla geri sayım', 'sınava kalan süre']
  },
  {
    id: 'ay-evresi-hesaplama',
    slug: 'ay-evresi-hesaplama',
    title: 'Ay Evresi (Fazı) ve Aydınlık Oranı Hesaplama',
    description: 'Doğum gününüzde veya seçtiğiniz tarihte Ayın evresini (Yeni Ay, Hilal, Dolunay vb.) ve aydınlık yüzdesini hesaplayın.',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ay evresi hesaplama', 'doğduğum gün ayın evresi', 'moon phase calculator', 'dolunay tarihi', 'ay fazı bulucu']
  },
  {
    id: 'bioritim-hesaplama',
    slug: 'bioritim-hesaplama',
    title: 'Biyoritim Enerji ve Durum Hesaplama',
    description: 'Doğum tarihinize göre fiziksel, duygusal ve zihinsel döngülerinizi analiz edin (Eğlence ve motivasyon amaçlıdır).',
    categoryId: 'zaman',
    toolType: 'calculator',
    status: 'active',
    keywords: ['biyoritim hesaplama', 'biorhythm calculator', 'fiziksel duygusal zihinsel enerji', 'biyoritim grafiği']
  },

  // --- 7. GÜNLÜK HAYAT, EV & SAĞLIK (12) ---
  {
    id: 'bmr-hesaplama',
    slug: 'bmr-hesaplama',
    title: 'BMR Bazal Metabolizma Hızı Hesaplama',
    description: 'Mifflin-St Jeor formülüyle vücudunuzun dinlenme halindeyken yaktığı günlük asgari kalori miktarını hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['bmr hesaplama', 'bazal metabolizma hızı', 'günlük yaktığım kalori', 'mifflin st jeor', 'metabolizma hızı']
  },
  {
    id: 'ideal-kilo-hesaplama',
    slug: 'ideal-kilo-hesaplama',
    title: 'İdeal Kilo Hesaplama (Devine & Robinson Formülleri)',
    description: 'Boy, yaş ve cinsiyete göre Devine, Robinson, Hamwi ve Miller formülleriyle ideal kilonuzu ve sağlıklı kilo aralığınızı hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['ideal kilo hesaplama', 'ideal kilo', 'kaç kilo olmalıyım', 'sağlıklı kilo aralığı', 'devine formülü', 'boy kilo ideali']
  },
  {
    id: 'gunluk-kalori-ihtiyaci-hesaplama',
    slug: 'gunluk-kalori-ihtiyaci-hesaplama',
    title: 'Günlük Kalori ve Makro İhtiyacı Hesaplama (TDEE)',
    description: 'Kilo verme, koruma veya kilo alma hedefinize göre günlük almanız gereken kalori, protein, karbonhidrat ve yağ miktarını hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['tdee hesaplama', 'günlük kalori ihtiyacı', 'kalori açığı hesaplama', 'makro hesaplayıcı', 'kilo verme kalorisi']
  },
  {
    id: 'bel-kalca-orani-hesaplama',
    slug: 'bel-kalca-orani-hesaplama',
    title: 'Bel-Kalça Oranı (WHR) ve Vücut Tipi Hesaplama',
    description: 'Bel ve kalça çevresi ölçülerinize göre WHR oranınızı, elma/armut vücut tipinizi ve kardiyovasküler sağlık riskinizi hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['bel kalça oranı hesaplama', 'whr hesaplayıcı', 'vücut tipi bulma', 'bel çevresi sağlık riski']
  },
  {
    id: 'vucut-yag-orani-hesaplama',
    slug: 'vucut-yag-orani-hesaplama',
    title: 'Vücut Yağ Oranı Hesaplama (US Navy Metodu)',
    description: 'Boy, boyun, bel ve kalça mezura ölçüleriyle US Navy formülü üzerinden vücut yağ yüzdenizi ve yağsız kas kütlenizi hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['vücut yağ oranı hesaplama', 'navy yağ oranı', 'yağsız kütle hesaplama', 'vücut kompozisyonu', 'yağ yüzdesi']
  },
  {
    id: 'adim-mesafe-kalori-hesaplama',
    slug: 'adim-mesafe-kalori-hesaplama',
    title: 'Adım Sayısı, Mesafe ve Kalori Hesaplama',
    description: 'Günlük attığınız adım sayısına ve boyunuza göre katedilen mesafeyi (km) ve yakılan tahmini kaloriyi hesaplayın.',
    categoryId: 'saglik',
    toolType: 'calculator',
    status: 'active',
    keywords: ['adım kalori hesaplama', '10000 adım kaç kalori', 'adım mesafe çevirici', 'adım uzunluğu', 'yürüyüş kalorisi']
  },
  {
    id: 'elektrik-faturasi-hesaplama',
    slug: 'elektrik-faturasi-hesaplama',
    title: 'Elektrik Faturası Hesaplama (Kademeli Tarife)',
    description: 'Aylık kWh elektrik tüketiminize göre mesken 240 kWh altı ve üstü kademeli tarifelerle fatura tutarınızı hesaplayın.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['elektrik faturası hesaplama', 'kademeli elektrik tarifesi', 'kwh elektrik fiyatı', 'aylık elektrik faturam']
  },
  {
    id: 'dogalgaz-tuketim-maliyeti-hesaplama',
    slug: 'dogalgaz-tuketim-maliyeti-hesaplama',
    title: 'Doğalgaz Faturası ve Tüketim Hesaplama',
    description: 'Metreküp (m³) doğalgaz tüketim miktarınızı kWh enerjiye ve güncel KDV dahil tahmini fatura bedeline dönüştürün.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['doğalgaz faturası hesaplama', 'm3 doğalgaz fiyatı', 'doğalgaz tüketim bedeli', 'kombi faturası hesaplama']
  },
  {
    id: 'klima-btu-hesaplama',
    slug: 'klima-btu-hesaplama',
    title: 'Klima BTU Kapasitesi Hesaplama',
    description: 'Oda metrekaresi, coğrafi bölge katsayısı ve cephe durumuna göre gereken klima BTU/h soğutma gücünü hesaplayın.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['klima btu hesaplama', 'kaç btu klima lazım', 'oda metrekaresine göre klima', 'btu hesabı', 'klima kapasitesi']
  },
  {
    id: 'boya-miktari-hesaplama',
    slug: 'boya-miktari-hesaplama',
    title: 'Ev Boya Miktarı Hesaplama (Litre ve Kutu)',
    description: 'Oda boyutları, tavan yüksekliği, kapı-pencere düşümleri ve kat sayısına göre gereken litre duvar boyasını hesaplayın.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['boya miktarı hesaplama', 'kaç litre boya lazım', 'duvar boyası hesabı', 'oda boyama maliyeti']
  },
  {
    id: 'duvarkagidi-rulo-hesaplama',
    slug: 'duvarkagidi-rulo-hesaplama',
    title: 'Duvar Kağıdı Rulo Sayısı Hesaplama',
    description: 'Duvar genişliği, yüksekliği ve rulo ebatlarına (Euro standart 0.53x10m) göre gereken tam rulo adedini hesaplayın.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['duvar kağıdı rulo hesaplama', 'kaç rulo duvar kağıdı', 'duvar kağıdı metrekaresi', 'rulo sayısı bulucu']
  },
  {
    id: 'evcil-hayvan-yasi-hesaplama',
    slug: 'evcil-hayvan-yasi-hesaplama',
    title: 'Kedi ve Köpek Yaşı İnsan Yaşı Karşılığı',
    description: 'Kedi ve köpeğinizin yaşını modern veteriner tıp skalasına göre gerçek insan yaşı karşılığına dönüştürün.',
    categoryId: 'ev-yasam',
    toolType: 'calculator',
    status: 'active',
    keywords: ['kedi yaşı hesaplama', 'köpek yaşı insan yaşı', 'evcil hayvan insan yaşı', 'köpeğim kaç yaşında']
  },

  // --- 8. BİRİM DÖNÜŞTÜRÜCÜLER (8) ---
  {
    id: 'dosya-aktarim-suresi',
    slug: 'dosya-aktarim-suresi',
    title: 'Dosya İndirme ve Aktarım Süresi Hesaplama',
    description: 'Dosya boyutu (MB, GB, TB) ve internet / ağ bağlantı hızına (Mbps, MB/s) göre tahmini dosya aktarım süresini hesaplayın.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['dosya indirme süresi', 'download time calculator', 'kaç saatte iner', 'internet hızı dosya süresi', 'veri aktarım süresi']
  },
  {
    id: 'internet-hizi-donusturucu',
    slug: 'internet-hizi-donusturucu',
    title: 'İnternet Hızı Dönüştürücü (Mbps -> MB/s)',
    description: 'Megabit (Mbps) internet hızını saniyede Megabayt (MB/s) indirme hızına ve dosya aktarım sürelerine dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['internet hızı dönüştürücü', 'mbps to mbs', 'megabit megabyte çevirme', 'indirme hızı hesaplama']
  },
  {
    id: 'hacim-sivi-donusturucu',
    slug: 'hacim-sivi-donusturucu',
    title: 'Hacim ve Sıvı Ölçüleri Dönüştürücü',
    description: 'Litre, mililitre, metreküp, Amerikan/İngiliz galonu, sıvı ons (fl oz) ve varil hacim birimlerini birbirine dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['hacim dönüştürücü', 'litre galon çevirme', 'mililitre litre', 'sıvı ons ml', 'metreküp litre']
  },
  {
    id: 'basinc-donusturucu',
    slug: 'basinc-donusturucu',
    title: 'Basınç Birimleri Dönüştürücü (PSI, Bar, Atm)',
    description: 'Araç lastik basıncı PSI, Bar, Atmosfer (atm), Pascal (Pa) ve mmHg basınç birimleri arasında anında dönüşüm yapın.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['basınç dönüştürücü', 'psi bar çevirme', 'lastik hava basıncı psi', 'bar atm dönüştürücü', 'kpa bar']
  },
  {
    id: 'guc-enerji-donusturucu',
    slug: 'guc-enerji-donusturucu',
    title: 'Güç ve Enerji Dönüştürücü (HP, kW, Watt, Joule, BTU)',
    description: 'Beygir Gücü (HP), Kilowatt (kW), Watt, Joule, Kilokalori (kcal) ve BTU güç/enerji birimlerini dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['güç dönüştürücü', 'beygir kw çevirme', 'hp kw dönüştürücü', 'joule kalori çevirme', 'btu kwh']
  },
  {
    id: 'aci-donusturucu',
    slug: 'aci-donusturucu',
    title: 'Açı Birimleri Dönüştürücü (Derece, Radyan, Grad)',
    description: 'Derece (°), Radyan (rad), Grad (gon) ve Devir açı birimlerini dönüştürün, sin/cos/tan trigonometrik değerlerini görün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['açı dönüştürücü', 'derece radyan çevirme', 'radyan derece', 'grad radyan', 'trigonometrik değerler']
  },
  {
    id: 'yakit-tuketimi-donusturucu',
    slug: 'yakit-tuketimi-donusturucu',
    title: 'Yakıt Tüketimi Dönüştürücü (L/100km, MPG, km/L)',
    description: '100 kilometrede litre (L/100km), Amerikan/İngiliz MPG ve km/L yakıt tüketim değerlerini birbirine dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['yakıt tüketimi dönüştürücü', 'l 100km mpg çevirme', 'mpg to l 100km', 'km l yakıt tüketimi']
  },
  {
    id: 'mutfak-olcubirim-donusturucu',
    slug: 'mutfak-olcubirim-donusturucu',
    title: 'Mutfak Ölçü Birimleri ve Bardak/Gram Çevirici',
    description: 'Su bardağı, yemek kaşığı, tatlı kaşığı, cup ve gram ölçülerini un, şeker, pirinç ve sıvı yoğunluklarına göre dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['mutfak ölçüleri', '1 su bardağı kaç gram un', 'yemek kaşığı gram', 'cup gram çevirici', 'tarif ölçü dönüştürücü']
  },
  {
    id: 'tipografi-donusturucu',
    slug: 'tipografi-donusturucu',
    title: 'Tipografi ve Font Boyutu Dönüştürücü (PX, REM, EM, PT)',
    description: 'Piksel (px), REM, EM, Punto (pt) ve Yüzde (%) font birimlerini canlı görsel boyut önizlemesiyle dönüştürün.',
    categoryId: 'donusum',
    toolType: 'converter',
    status: 'active',
    keywords: ['px rem dönüştürücü', 'rem to px', 'font boyutu çevirici', 'em px çevirme', 'tipografi ölçüleri']
  },

  // --- 9. GELİŞTİRİCİ, METİN & TASARIM (11) ---
  {
    id: 'html-varlik-kodlayici',
    slug: 'html-varlik-kodlayici',
    title: 'HTML Varlık (Entities) Kodlayıcı ve Çözücü',
    description: 'Özel ve Türkçe karakterleri HTML Entity (&amp;, &lt;, &gt;, &quot;) kodlarına dönüştürün veya çözün.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['html entity encoder', 'html karakter kodlayıcı', 'html varlık çözücü', 'special characters html']
  },
  {
    id: 'css-gradient-olusturucu',
    slug: 'css-gradient-olusturucu',
    title: 'CSS Gradient (Gradyan) Oluşturucu',
    description: 'Lineer ve radyal renk geçişleri tasarlayın, canlı önizleyin ve web siteniz için hazır CSS kodunu anında kopyalayın.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['css gradient generator', 'css gradyan oluşturucu', 'renk geçişi kodu', 'linear gradient', 'radial gradient', 'web tasarım renk']
  },
  {
    id: 'metin-karsilastirma-diff',
    slug: 'metin-karsilastirma-diff',
    title: 'Metin Karşılaştırma ve Fark Bulucu (Diff Checker)',
    description: 'İki metin veya kod bloğu arasındaki eklenen, silinen ve değişen satırları görsel diff ile renkli olarak karşılaştırın.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['metin karşılaştırma', 'diff checker türkçe', 'iki metin arası fark', 'kod karşılaştırıcı', 'metin farkı bul']
  },
  {
    id: 'yinelenen-satir-temizleyici',
    slug: 'yinelenen-satir-temizleyici',
    title: 'Yinelenen Satırları Temizleme (Duplicate Line Remover)',
    description: 'Metin ve listelerdeki mükerrer/tekrar eden satırları tek tıkla temizleyin, benzersiz satır listesi elde edin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['yinelenen satırları temizleme', 'duplicate remover', 'tekrar eden satırları sil', 'benzersiz satır listesi']
  },
  {
    id: 'kelime-harf-frekansi',
    slug: 'kelime-harf-frekansi',
    title: 'Kelime ve Harf Sıklığı Analizi',
    description: 'Metninizdeki en sık kullanılan kelimeleri, kelime yoğunluk yüzdesini ve karakter istatistiklerini analiz edin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['kelime sıklığı', 'kelime frekansı', 'word frequency counter', 'metin istatistiği', 'kelime yoğunluğu', 'seo kelime analizi']
  },
  {
    id: 'metin-siralayici',
    slug: 'metin-siralayici',
    title: 'Metin ve Satır Sıralayıcı (A-Z, Sayısal, Uzunluk)',
    description: 'Metin satırlarını Türkçe alfabetik (A-Z / Z-A), sayısal değere, uzunluğa göre sıralayın veya rastgele karıştırın.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['metin sıralayıcı', 'alfabetik sıralama', 'a dan z ye sırala', 'satır sıralama aracı', 'liste sıralayıcı']
  },
  {
    id: 'metin-ters-cevirici',
    slug: 'metin-ters-cevirici',
    title: 'Metin Ters Çevirici ve Palindrom Kontrolü',
    description: 'Metni, kelimeleri veya satırları tersten yazdırın ve metnin palindrom olup olmadığını test edin.',
    categoryId: 'metin',
    toolType: 'text',
    status: 'active',
    keywords: ['metin ters çevirici', 'tersten yazı yazma', 'reverse text', 'palindrom kontrolü', 'kelime ters çevirme']
  },
  {
    id: 'html-metin-ayiklayici',
    slug: 'html-metin-ayiklayici',
    title: 'HTML Etiket Temizleme (Strip HTML to Text)',
    description: 'HTML kodlarını ve etiketlerini temizleyerek saf ve temiz düz metin (plain text) çıktısı elde edin.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['html etiket temizleme', 'strip html tags', 'html to text', 'html etiketlerini sil', 'düz metin yap']
  },
  {
    id: 'css-kutu-golgesi-olusturucu',
    slug: 'css-kutu-golgesi-olusturucu',
    title: 'CSS Kutu Gölgesi (Box Shadow) Oluşturucu',
    description: 'X/Y ofset, bulanıklık (blur), yayılma (spread) ve renk ayarlarıyla canlı box-shadow tasarlayın ve CSS kodunu kopyalayın.',
    categoryId: 'yazilim',
    toolType: 'developer',
    status: 'active',
    keywords: ['css box shadow generator', 'kutu gölgesi oluşturucu', 'css gölge kodu', 'box shadow designer', 'web gölge efekti']
  },
  {
    id: 'reklam-tiklama-tbm-hesaplama',
    slug: 'reklam-tiklama-tbm-hesaplama',
    title: 'TBM, TO (CTR) ve Reklam Metrikleri Hesaplama',
    description: 'Google ve Meta reklamlarınız için Tıklama Başına Maliyet (CPC/TBM), Tıklama Oranı (CTR), BGBM (CPM) ve CPA hesaplayın.',
    categoryId: 'ticaret',
    toolType: 'calculator',
    status: 'active',
    keywords: ['tbm hesaplama', 'cpc hesaplama', 'ctr hesaplama', 'tıklama oranı', 'cpm hesaplama', 'google ads maliyet', 'reklam bütçesi']
  },
  {
    id: 'yakit-tasarruf-hesaplama',
    slug: 'yakit-tasarruf-hesaplama',
    title: 'Yıllık Yakıt Tasarrufu ve Araç Kıyaslama',
    description: 'İki aracın yakıt tüketimini karşılaştırın, yıllık kilometre ve akaryakıt fiyatına göre TL bazında yıllık yakıt tasarrufunuzu hesaplayın.',
    categoryId: 'araba',
    toolType: 'calculator',
    status: 'active',
    keywords: ['yakıt tasarrufu hesaplama', 'araç yakıt kıyaslama', 'benzin dizel tasarruf', 'yıllık yakıt masrafı', 'lpg tasarruf hesabı']
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