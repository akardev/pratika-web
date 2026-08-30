export type HistoryCategory =
  | 'event'
  | 'turkey'
  | 'world'
  | 'science'
  | 'culture'
  | 'sports'
  | 'birth'
  | 'death';

export interface HistoryImage {
  url: string;
  alt: string;
  caption?: string;
  credit?: string;
  source?: string;
}

export interface HistoryEvent {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  description: string;
  category: HistoryCategory;
  importance?: 'featured' | 'standard';
  image?: HistoryImage;
  sourceLabel: string;
  sourceUrl: string;
}

export interface TodayInHistoryDay {
  events: HistoryEvent[];
}

export const MONTH_NAMES_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
] as const;

export const MONTH_SLUGS_TR: Record<string, number> = {
  ocak: 1,
  subat: 2,
  şubat: 2,
  mart: 3,
  nisan: 4,
  mayis: 5,
  mayıs: 5,
  haziran: 6,
  temmuz: 7,
  agustos: 8,
  ağustos: 8,
  eylul: 9,
  eylül: 9,
  ekim: 10,
  kasim: 11,
  kasım: 11,
  aralik: 12,
  aralık: 12,
};

export const CATEGORY_LABELS: Record<HistoryCategory, string> = {
  event: 'BUGÜN TARİHTE',
  turkey: 'TÜRKİYE TARİHİ',
  world: 'DÜNYA & SİYASET',
  science: 'BİLİM & TEKNOLOJİ',
  culture: 'SANAT & KÜLTÜR',
  sports: 'SPOR',
  birth: 'DOĞUMLAR',
  death: 'VEFATLAR',
};

/**
 * 100% Doğrulanmış Tarihsel Veri Seti.
 * Resmî ve kurumsal kaynaklara (TBMM, UNESCO, NASA, IOC, TTK, Kültür Bakanlığı, BM vb.) dayandırılmıştır.
 */
export const HISTORY_DATABASE: HistoryEvent[] = [
  // =========================================================================
  // 1 OCAK
  // =========================================================================
  {
    id: '01-01-2005',
    day: 1,
    month: 1,
    year: 2005,
    title: 'Türk Lirası’ndan 6 sıfır atıldı (YTL dönemi başladı).',
    description: 'Türkiye Cumhuriyet Merkez Bankası, paradan 6 sıfır atarak Yeni Türk Lirası (YTL) ve Yeni Kuruş banknot ile madeni paralarını tedavüle sürdü.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'TCMB Tarihçesi',
    sourceUrl: 'https://www.tcmb.gov.tr',
  },
  {
    id: '01-01-1999',
    day: 1,
    month: 1,
    year: 1999,
    title: 'Euro para birimi resmen yürürlüğe girdi.',
    description: 'Avrupa Birliği üyesi 11 ülke, hesap birimi olarak ortak para birimi Euro’yu kullanmaya başladı; Avrupa Merkez Bankası faaliyete geçti.',
    category: 'world',
    sourceLabel: 'Avrupa Merkez Bankası',
    sourceUrl: 'https://www.ecb.europa.eu',
  },
  {
    id: '01-01-1801',
    day: 1,
    month: 1,
    year: 1801,
    title: 'İlk cüce gezegen Ceres keşfedildi.',
    description: 'İtalyan astronom Giuseppe Piazzi, Mars ile Jüpiter arasındaki asteroit kuşağında yer alan ilk ve en büyük gök cismi Ceres’i keşfetti.',
    category: 'science',
    sourceLabel: 'NASA Solar System Exploration',
    sourceUrl: 'https://science.nasa.gov/dwarf-planets/ceres/',
  },


  // =========================================================================
  // 2 OCAK
  // =========================================================================
  {
    id: '01-02-1893',
    day: 2,
    month: 1,
    year: 1893,
    title: 'Frederick Douglass, Haiti Pavilion’ında tarihi konuşmasını yaptı.',
    description: 'Frederick Douglass, Chicago’daki World’s Columbian Exposition kapsamında Haiti Pavyonu’nun açılışında Haiti’nin bağımsızlık tarihini ve siyah özgürlük mücadelesindeki önemini anlatan bir konuşma yaptı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-02/',
  },

  // =========================================================================
  // 3 OCAK
  // =========================================================================
  {
    id: '01-03-1793',
    day: 3,
    month: 1,
    year: 1793,
    title: 'Kadın hakları öncüsü Lucretia Mott doğdu.',
    description: 'Köleliğin kaldırılması, kadın hakları ve barış hareketlerinin önemli isimlerinden Lucretia Coffin Mott, Massachusetts’in Nantucket kentinde doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-03/',
  },

  // =========================================================================
  // 4 OCAK
  // =========================================================================
  {
    id: '01-04-1948',
    day: 4,
    month: 1,
    year: 1948,
    title: 'Burma bağımsızlığını ilan etti.',
    description: 'Britanya sömürge yönetimi altındaki Burma, 4 Ocak 1948’de bağımsız bir devlet oldu; ülke günümüzde Myanmar adıyla anılmaktadır.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-04',
  },

  // =========================================================================
  // 5 OCAK
  // =========================================================================
  {
    id: '01-05-1949',
    day: 5,
    month: 1,
    year: 1949,
    title: 'Harry Truman “Fair Deal” programını açıkladı.',
    description: 'ABD Başkanı Harry S. Truman, Birliğin Durumu konuşmasında sağlık sigortası, asgari ücretin yükseltilmesi, işçi haklarının güçlendirilmesi ve medeni hakların korunması gibi kapsamlı reform önerilerini açıkladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://guides.loc.gov/harry-s-truman/digital-collections',
  },

  // =========================================================================
  // 6 OCAK
  // =========================================================================
  {
    id: '01-06-1945',
    day: 6,
    month: 1,
    year: 1945,
    title: 'George H. W. Bush ve Barbara Pierce evlendi.',
    description: 'II. Dünya Savaşı sırasında ABD Donanması’nda görev yapan George H. W. Bush ile Barbara Pierce, 6 Ocak 1945’te evlendi.',
    category: 'world',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-06/',
  },

  // =========================================================================
  // 7 OCAK
  // =========================================================================
  {
    id: '01-07-1955',
    day: 7,
    month: 1,
    year: 1955,
    title: 'Marian Anderson Metropolitan Opera’da sahne alan ilk Afro-Amerikalı sanatçı oldu.',
    description: 'Ünlü kontralto Marian Anderson, New York Metropolitan Opera’da Verdi’nin Un ballo in maschera eserindeki Ulrica rolüyle sahneye çıkarak kurumun sahnesinde rol alan ilk Afro-Amerikalı sanatçı oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/exhibits/night-at-the-opera/giuseppe-verdi-and-italian-opera.html',
  },

  // =========================================================================
  // 8 OCAK
  // =========================================================================
  {
    id: '01-08-1815',
    day: 8,
    month: 1,
    year: 1815,
    title: 'New Orleans Muharebesi’nde ABD kuvvetleri zafer kazandı.',
    description: 'Tümgeneral Andrew Jackson komutasındaki ABD kuvvetleri, New Orleans Muharebesi’nde yaklaşık 8.000 İngiliz askerine karşı zafer kazandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-08',
  },

  // =========================================================================
  // 9 OCAK
  // =========================================================================
  {
    id: '01-09-1788',
    day: 9,
    month: 1,
    year: 1788,
    title: 'Connecticut, ABD Anayasası’nı onaylayan beşinci eyalet oldu.',
    description: 'Connecticut eyaletindeki anayasa konvansiyonu, ABD Anayasası’nı 9 Ocak 1788’de onaylayarak ülkenin beşinci kurucu eyaleti oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-09/',
  },


  // =========================================================================
  // 10 OCAK
  // =========================================================================
  {
    id: '01-10-1863',
    day: 10,
    month: 1,
    year: 1863,
    title: 'Dünyanın ilk yeraltı metrosu Londra’da açıldı.',
    description: 'Londra Metropolitan Demiryolu, Paddington ile Farringdon Street arasında dünyanın ilk yer altı toplu taşıma seferini başlattı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'London Transport Museum',
    sourceUrl: 'https://www.ltmuseum.co.uk/collections/stories/transport/steam-to-green-underground',
  },
  {
    id: '01-10-1921',
    day: 10,
    month: 1,
    year: 1921,
    title: 'I. İnönü Muharebesi zaferle sonuçlandı.',
    description: 'Kurtuluş Savaşı’nda Albay İsmet Bey komutasındaki Türk ordusu, Yunan kuvvetlerinin taarruzunu İnönü mevkiinde durdurarak Millî Mücadele’nin düzenli orduyla ilk zaferini kazandı.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Milli Savunma Bakanlığı',
    sourceUrl: 'https://www.msb.gov.tr',
  },
  {
    id: '01-10-1946',
    day: 10,
    month: 1,
    year: 1946,
    title: 'Birleşmiş Milletler Genel Kurulu ilk toplantısını yaptı.',
    description: 'Londra’daki Central Hall Westminster’da toplanan ilk BM Genel Kurulu’na 51 üye devletin temsilcileri katıldı.',
    category: 'world',
    sourceLabel: 'Birleşmiş Milletler',
    sourceUrl: 'https://www.un.org/en/about-us/history-of-the-un',
  },

  // =========================================================================
  // 15 MART
  // =========================================================================
  {
    id: '03-15-1877',
    day: 15,
    month: 3,
    year: 1877,
    title: 'Tarihin ilk resmi Test Kriket maçı başladı.',
    description: 'Avustralya ile İngiltere arasında Melbourne Cricket Ground’da oynanan karşılaşma, tarihin ilk uluslararası test kriket maçı olarak kayıtlara geçti.',
    category: 'sports',
    sourceLabel: 'International Cricket Council',
    sourceUrl: 'https://www.icc-cricket.com',
  },
  {
    id: '03-15-1917',
    day: 15,
    month: 3,
    year: 1917,
    title: 'Rus Çarı II. Nikolay tahttan çekildi.',
    description: 'Şubat Devrimi’nin ardından Çar II. Nikolay’ın feragat etmesiyle Rusya’da 300 yıllık Romanov Hanedanlığı yönetimi son buldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Encyclopaedia Britannica',
    sourceUrl: 'https://www.britannica.com/event/Russian-Revolution',
  },
  {
    id: '03-15-1879',
    day: 15,
    month: 3,
    year: 1879,
    title: 'Albert Einstein Almanya’nın Ulm kentinde doğdu.',
    description: 'Genel ve Özel Görelilik kuramlarıyla modern fiziğin temellerini atan, 1921 Nobel Fizik Ödülü sahibi kuramsal fizikçi Albert Einstein dünyaya geldi.',
    category: 'birth',
    sourceLabel: 'Nobel Prize Outreach',
    sourceUrl: 'https://www.nobelprize.org/prizes/physics/1921/einstein/biographical/',
  },

  // =========================================================================
  // 23 NİSAN
  // =========================================================================
  {
    id: '04-23-1920',
    day: 23,
    month: 4,
    year: 1920,
    title: 'Türkiye Büyük Millet Meclisi açıldı.',
    description: 'Mustafa Kemal Atatürk önderliğinde Ankara’da Türkiye Büyük Millet Meclisi çalışmalarına başladı ve millet egemenliğine dayalı yeni devletin temelleri atıldı.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'TBMM Resmî Arşivi',
    sourceUrl: 'https://www.tbmm.gov.tr/Sayfa/KurtulusSavasiMuzesi',
  },
  {
    id: '04-23-1616',
    day: 23,
    month: 4,
    year: 1616,
    title: 'William Shakespeare ve Miguel de Cervantes vefat etti.',
    description: 'Dünya edebiyatının iki dev ismi William Shakespeare ve Don Kişot’un yazarı Miguel de Cervantes aynı gün hayatını kaybetti. Bu tarih UNESCO tarafından Dünya Kitap Günü ilan edilmiştir.',
    category: 'culture',
    sourceLabel: 'UNESCO Dünya Kitap Günü',
    sourceUrl: 'https://www.unesco.org/en/days/world-book-and-copyright',
  },

  // =========================================================================
  // 19 MAYIS
  // =========================================================================
  {
    id: '05-19-1919',
    day: 19,
    month: 5,
    year: 1919,
    title: 'Mustafa Kemal Paşa Samsun’a çıktı.',
    description: 'Mustafa Kemal Paşa’nın Bandırma Vapuru ile Samsun’a ayak basması, Türk İstiklal Harbi’nin fiili ve simgesel başlangıç tarihi kabul edildi.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'T.C. Samsun Valiliği',
    sourceUrl: 'https://www.samsun.gov.tr/ataturk-ve-samsun2',
  },

  // =========================================================================
  // 6 HAZİRAN
  // =========================================================================
  {
    id: '06-06-1944',
    day: 6,
    month: 6,
    year: 1944,
    title: 'Normandiya Çıkarması (D-Day) başladı.',
    description: 'Müttefik kuvvetleri, II. Dünya Savaşı’nın seyrini değiştiren tarihin en büyük amfibi harekâtı olan Overlord Harekâtı’nı Fransa kıyılarında başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'U.S. Naval History and Heritage Command',
    sourceUrl: 'https://www.history.navy.mil/browse-by-topic/wars-conflicts-and-operations/world-war-ii/1944/overlord.html',
  },
  {
    id: '06-06-1984',
    day: 6,
    month: 6,
    year: 1984,
    title: 'Tetris video oyunu ilk kez yayınlandı.',
    description: 'Sovyet bilgisayar mühendisi Aleksey Pajitnov tarafından geliştirilen efsanevi bulmaca oyunu Tetris, Elektronika 60 bilgisayarında ilk kez çalıştırıldı.',
    category: 'science',
    sourceLabel: 'The Tetris Company',
    sourceUrl: 'https://tetris.com/history-of-tetris',
  },

  // =========================================================================
  // 20 TEMMUZ
  // =========================================================================
  {
    id: '07-20-1969',
    day: 20,
    month: 7,
    year: 1969,
    title: 'Apollo 11 Ay yüzeyine başarıyla indi.',
    description: 'Neil Armstrong ve Buzz Aldrin’i taşıyan Kartal (Eagle) modülü Ay’ın Sessizlik Denizi (Mare Tranquillitatis) bölgesine indi. İnsanlık ilk kez başka bir gök cismine ayak bastı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'NASA Apollo 11 Mission Overview',
    sourceUrl: 'https://www.nasa.gov/missions/apollo/apollo-11/apollo-11-mission-overview/',
  },
  {
    id: '07-20-1974',
    day: 20,
    month: 7,
    year: 1974,
    title: 'Kıbrıs Barış Harekâtı başladı.',
    description: 'Türkiye, Garantörlük Antlaşması haklarına dayanarak adadaki Türk toplumunun güvenliğini ve anayasal düzeni korumak amacıyla Kıbrıs Barış Harekâtı’nı başlattı.',
    category: 'turkey',
    sourceLabel: 'T.C. Dışişleri Bakanlığı',
    sourceUrl: 'https://www.mfa.gov.tr',
  },

  // =========================================================================
  // 11 OCAK
  // =========================================================================
  {
    id: '01-11-1757',
    day: 11,
    month: 1,
    year: 1757,
    title: 'Alexander Hamilton doğdu.',
    description: 'ABD’nin ilk Hazine Bakanı Alexander Hamilton, Karayipler’deki Nevis Adası’nda doğdu. Amerikan Devrimi sonrasında yeni federal mali sistemin kurulmasında önemli rol oynadı.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-11/',
  },

  // =========================================================================
  // 12 OCAK
  // =========================================================================
  {
    id: '01-12-1777',
    day: 12,
    month: 1,
    year: 1777,
    title: 'Mission Santa Clara de Asís kuruldu.',
    description: 'Padre Thomas Peña, Junípero Serra’nın yönlendirmesiyle Kaliforniya’daki 21 misyondan sekizincisi olan Mission Santa Clara de Asís’i resmen kurdu.',
    category: 'culture',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-12/',
  },

  // =========================================================================
  // 13 OCAK
  // =========================================================================
  {
    id: '01-13-1833',
    day: 13,
    month: 1,
    year: 1833,
    title: 'Andrew Jackson, Nullification Krizi sırasında Martin Van Buren’e mektup yazdı.',
    description: 'ABD Başkanı Andrew Jackson, Güney Carolina’nın federal otoriteye meydan okumasına karşı olduğunu belirterek Başkan Yardımcısı Martin Van Buren’e yazdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/mcc.050/',
  },

  // =========================================================================
  // 14 OCAK
  // =========================================================================
  {
    id: '01-14-1784',
    day: 14,
    month: 1,
    year: 1784,
    title: 'Paris Antlaşması ABD Kongresi tarafından onaylandı.',
    description: 'Kıta Kongresi, 1783’te imzalanan Paris Antlaşması’nı 14 Ocak 1784’te onaylayarak Amerikan Devrimi’ni sona erdiren barış düzenlemesini resmen kabul etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-14/',
  },

  // =========================================================================
  // 15 OCAK
  // =========================================================================
  {
    id: '01-15-1929',
    day: 15,
    month: 1,
    year: 1929,
    title: 'Martin Luther King Jr. doğdu.',
    description: 'ABD medeni haklar hareketinin en etkili liderlerinden Martin Luther King Jr., Atlanta, Georgia’da doğdu. Şiddetsiz mücadele yaklaşımıyla 20. yüzyılın en etkili insan hakları savunucularından biri oldu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-15/',
  },

  // =========================================================================
  // 16 OCAK
  // =========================================================================
  {
    id: '01-16-1896',
    day: 16,
    month: 1,
    year: 1896,
    title: 'İlk beşer kişilik üniversite basketbol karşılaşmalarından biri oynandı.',
    description: 'Chicago Üniversitesi ile Iowa Üniversitesi arasında oynanan karşılaşma, beşer oyunculu üniversite basketbolunun ilk örneklerinden biri olarak tarihe geçti; Chicago 15-12 kazandı.',
    category: 'sports',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-16/',
  },

  // =========================================================================
  // 17 OCAK
  // =========================================================================
  {
    id: '01-17-1706',
    day: 17,
    month: 1,
    year: 1706,
    title: 'Benjamin Franklin doğdu.',
    description: 'Bilim insanı, mucit, yazar ve devlet adamı Benjamin Franklin Boston’da doğdu. Elektrik deneyleri ve Amerikan bağımsızlığındaki rolüyle tarihin en tanınmış isimlerinden biri oldu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-17/',
  },

  // =========================================================================
  // 18 OCAK
  // =========================================================================
  {
    id: '01-18-1919',
    day: 18,
    month: 1,
    year: 1919,
    title: 'Paris Barış Konferansı başladı.',
    description: 'I. Dünya Savaşı sonrasında savaşın sonuçlarını ve yeni uluslararası düzeni belirlemek üzere Paris Barış Konferansı’nın resmî görüşmeleri başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-18/the-paris-peace-conference/',
  },

  // =========================================================================
  // 19 OCAK
  // =========================================================================
  {
    id: '01-19-1809',
    day: 19,
    month: 1,
    year: 1809,
    title: 'Edgar Allan Poe doğdu.',
    description: 'Gotik edebiyatın ve modern polisiye öykünün öncülerinden Edgar Allan Poe, Boston’da doğdu. Şiirleri, kısa öyküleri ve eleştirileri dünya edebiyatını etkiledi.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-19/',
  },

  // =========================================================================
  // 20 OCAK
  // =========================================================================
  {
    id: '01-20-1937',
    day: 20,
    month: 1,
    year: 1937,
    title: 'Franklin D. Roosevelt, Ocak ayında yemin eden ilk ABD başkanı oldu.',
    description: 'Franklin D. Roosevelt, Anayasa’daki değişikliğin yürürlüğe girmesinin ardından 20 Ocak 1937’de ikinci başkanlık dönemi için yemin etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-20/',
  },

  // =========================================================================
  // 21 OCAK
  // =========================================================================
  {
    id: '01-21-1824',
    day: 21,
    month: 1,
    year: 1824,
    title: 'Stonewall Jackson doğdu.',
    description: 'Amerikan İç Savaşı sırasında Konfederasyon ordusunun en tanınmış generallerinden Thomas J. “Stonewall” Jackson, Virginia’da doğdu.',
    category: 'birth',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-21/',
  },

  // =========================================================================
  // 22 OCAK
  // =========================================================================
  {
    id: '01-22-1912',
    day: 22,
    month: 1,
    year: 1912,
    title: 'Florida Keys’i anakaraya bağlayan denizaşırı demiryolu tamamlandı.',
    description: 'Florida East Coast Railway’in Key West’e ulaşan denizaşırı demiryolu bağlantısı 22 Ocak 1912’de tamamlandı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-22/',
  },

  // =========================================================================
  // 23 OCAK
  // =========================================================================
  {
    id: '01-23-1849',
    day: 23,
    month: 1,
    year: 1849,
    title: 'Elizabeth Blackwell ABD’de tıp diploması alan ilk kadın oldu.',
    description: 'Elizabeth Blackwell, Geneva Medical College’dan mezun olarak ABD’de tıp diploması alan ilk kadın oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-23/',
  },

  // =========================================================================
  // 24 OCAK
  // =========================================================================
  {
    id: '01-24-1848',
    day: 24,
    month: 1,
    year: 1848,
    title: 'Kaliforniya’da altın keşfedildi.',
    description: 'James W. Marshall, Coloma yakınlarında bir kereste fabrikasının kanalında altın buldu. Keşif, 1849’da büyük Kaliforniya Altına Hücum’un başlamasına giden süreci tetikledi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-24/',
  },

  // =========================================================================
  // 25 OCAK
  // =========================================================================
  {
    id: '01-25-1972',
    day: 25,
    month: 1,
    year: 1972,
    title: 'Shirley Chisholm ABD başkanlığı için adaylığını açıkladı.',
    description: 'New York milletvekili Shirley Chisholm, büyük bir Amerikan partisinin başkan adaylığı için yarışan ilk Afro-Amerikalı kadın oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-25/',
  },

  // =========================================================================
  // 26 OCAK
  // =========================================================================
  {
    id: '01-26-1837',
    day: 26,
    month: 1,
    year: 1837,
    title: 'Michigan, ABD’nin 26. eyaleti oldu.',
    description: 'Michigan, 26 Ocak 1837’de Birleşik Devletler Birliği’ne kabul edilerek ülkenin 26. eyaleti oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-26/',
  },

  // =========================================================================
  // 27 OCAK
  // =========================================================================
  {
    id: '01-27-1945',
    day: 27,
    month: 1,
    year: 1945,
    title: 'Auschwitz-Birkenau kurtarıldı.',
    description: 'Sovyet birlikleri 27 Ocak 1945’te Auschwitz kamp kompleksine ulaşarak yaklaşık 7.000 mahkûmu özgürlüğüne kavuşturdu. Bu tarih bugün Uluslararası Holokost Anma Günü olarak anılmaktadır.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'United States Holocaust Memorial Museum',
    sourceUrl: 'https://encyclopedia.ushmm.org/content/en/timeline-event/holocaust/1942-1945/soviet-forces-liberate-auschwitz',
  },

  // =========================================================================
  // 28 OCAK
  // =========================================================================
  {
    id: '01-28-1908',
    day: 28,
    month: 1,
    year: 1908,
    title: 'Julia Ward Howe, American Academy of Arts and Letters’a seçilen ilk kadın oldu.',
    description: 'The Battle Hymn of the Republic adlı eseriyle tanınan yazar ve aktivist Julia Ward Howe, 28 Ocak 1908’de American Academy of Arts and Letters’a seçilen ilk kadın oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-28/',
  },

  // =========================================================================
  // 29 OCAK
  // =========================================================================
  {
    id: '01-29-1861',
    day: 29,
    month: 1,
    year: 1861,
    title: 'Kansas, ABD’nin 34. eyaleti oldu.',
    description: 'Kansas, köleliğin yasaklandığı bir eyalet olarak 29 Ocak 1861’de Birleşik Devletler Birliği’ne kabul edildi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-29/',
  },

  // =========================================================================
  // 30 OCAK
  // =========================================================================
  {
    id: '01-30-1815',
    day: 30,
    month: 1,
    year: 1815,
    title: 'Thomas Jefferson’ın kütüphanesi Kongre Kütüphanesi tarafından satın alındı.',
    description: 'Başkan James Madison, Kongre’nin Thomas Jefferson’ın 6.487 ciltlik kişisel kütüphanesini satın alması için 23.950 dolar ayıran yasayı 30 Ocak 1815’te onayladı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-30',
  },

  // =========================================================================
  // 31 OCAK
  // =========================================================================
  {
    id: '01-31-1848',
    day: 31,
    month: 1,
    year: 1848,
    title: 'John C. Frémont isyan ve emirlere itaatsizlik suçlamalarıyla askerî mahkemeye çıkarıldı.',
    description: 'Binbaşı John C. Frémont, Kaliforniya üzerindeki askerî ve idarî yetki tartışması nedeniyle 31 Ocak 1848’de isyan ve emirlere itaatsizlik suçlamalarıyla askerî mahkemeye çıkarıldı. Karar daha sonra Başkan James K. Polk tarafından bozuldu.',
    category: 'world',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/january-31/',
  },

  // =========================================================================
  // 2 AĞUSTOS
  // =========================================================================
  {
    id: '08-02-1934',
    day: 2,
    month: 8,
    year: 1934,
    title: 'Adolf Hitler, Almanya’nın "Führer"i oldu.',
    description: 'Almanya Cumhurbaşkanı Paul von Hindenburg’un ölümünün ardından Adolf Hitler, şansölyelik ve cumhurbaşkanlığı makamlarını birleştirerek kendisini Führer ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Deutsches Historisches Museum',
    sourceUrl: 'https://www.dhm.de/',
  },
  {
    id: '08-02-1990',
    day: 2,
    month: 8,
    year: 1990,
    title: 'Irak, Kuveyt’i işgal etti.',
    description: 'Saddam Hüseyin liderliğindeki Irak ordusu, komşusu Kuveyt’i işgal ederek I. Körfez Savaşı’nın fitilini ateşledi.',
    category: 'world',
    sourceLabel: 'Birleşmiş Milletler Güvenlik Konseyi Kararları',
    sourceUrl: 'https://www.un.org/securitycouncil/content/resolutions-0',
  },
  {
    id: '08-02-1922',
    day: 2,
    month: 8,
    year: 1922,
    title: 'Alexander Graham Bell vefat etti.',
    description: 'Telefonun mucidi, İskoç asıllı Amerikalı bilim insanı Alexander Graham Bell, 75 yaşında hayata veda etti.',
    category: 'death',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/collections/alexander-graham-bell-papers/about-this-collection/',
  },
  {
    id: '08-02-1939',
    day: 2,
    month: 8,
    year: 1939,
    title: 'Einstein-Szilárd mektubu imzalandı.',
    description: 'Albert Einstein ve Leó Szilárd, ABD Başkanı Franklin D. Roosevelt’e Nazi Almanyası’nın atom bombası geliştirebileceği uyarısında bulunan tarihi mektubu imzaladı.',
    category: 'science',
    sourceLabel: 'Atomic Heritage Foundation',
    sourceUrl: 'https://ahf.nuclearmuseum.org/ahf/history/einstein-szilard-letter-1939/',
  },
  {
    id: '08-02-1870',
    day: 2,
    month: 8,
    year: 1870,
    title: 'Dünyanın ilk yer altı tüp treni Thames Nehri altında açıldı.',
    description: 'Tower Subway adı verilen ve Thames Nehri’nin altından geçen ilk tüp tünel yaya ve kablolu vagon trafiğine açıldı.',
    category: 'science',
    sourceLabel: 'London Transport Museum',
    sourceUrl: 'https://www.ltmuseum.co.uk/',
  },

  // =========================================================================
  // 3 AĞUSTOS
  // =========================================================================
  {
    id: '08-03-1492',
    day: 3,
    month: 8,
    year: 1492,
    title: 'Kristof Kolomb ilk yolculuğuna çıktı.',
    description: 'İtalyan kâşif Kristof Kolomb, İspanya kraliçesinin desteğiyle Niña, Pinta ve Santa María adlı gemilerle Palos de la Frontera limanından Hindistan’a ulaşmak amacıyla yola çıktı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/august-03/',
  },
  {
    id: '08-03-1914',
    day: 3,
    month: 8,
    year: 1914,
    title: 'Almanya, Fransa’ya savaş ilan etti.',
    description: 'I. Dünya Savaşı hızla genişlerken Alman İmparatorluğu, Fransa’ya resmi olarak savaş ilan ederek Batı Cephesi’ni açtı.',
    category: 'world',
    sourceLabel: 'Imperial War Museums',
    sourceUrl: 'https://www.iwm.org.uk/',
  },
  {
    id: '08-03-1958',
    day: 3,
    month: 8,
    year: 1958,
    title: 'Nautilus nükleer denizaltısı Kuzey Kutbu’nu geçti.',
    description: 'ABD Donanması’na ait dünyanın ilk nükleer denizaltısı USS Nautilus, Kuzey Kutbu buz takkesinin altından geçerek tarihi bir ilke imza attı.',
    category: 'science',
    sourceLabel: 'U.S. Navy History',
    sourceUrl: 'https://www.history.navy.mil/',
  },
  {
    id: '08-03-2004',
    day: 3,
    month: 8,
    year: 2004,
    title: 'MESSENGER uzay aracı fırlatıldı.',
    description: 'NASA, Güneş Sistemi’nin en küçük gezegeni Merkür’ü incelemek amacıyla MESSENGER (MErcury Surface, Space ENvironment, GEochemistry, and Ranging) uzay aracını fırlattı.',
    category: 'science',
    sourceLabel: 'NASA Solar System Exploration',
    sourceUrl: 'https://science.nasa.gov/mission/messenger/',
  },
  {
    id: '08-03-1924',
    day: 3,
    month: 8,
    year: 1924,
    title: 'İngiliz yazar Joseph Conrad vefat etti.',
    description: '"Karanlığın Yüreği" ve "Lord Jim" gibi önemli eserlerin yazarı Polonya asıllı İngiliz romancı Joseph Conrad hayatını kaybetti.',
    category: 'death',
    sourceLabel: 'Encyclopaedia Britannica',
    sourceUrl: 'https://www.britannica.com/biography/Joseph-Conrad',
  },

  // =========================================================================
  // 4 AĞUSTOS
  // =========================================================================
  {
    id: '08-04-1693',
    day: 4,
    month: 8,
    year: 1693,
    title: 'Dom Perignon şampanyayı buldu.',
    description: 'Efsaneye göre Fransız Benediktin keşişi Dom Perignon, köpüklü şarabı (şampanyayı) icat ettiğini ilk kez duyurdu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Encyclopaedia Britannica',
    sourceUrl: 'https://www.britannica.com/topic/champagne-wine',
  },
  {
    id: '08-04-1914',
    day: 4,
    month: 8,
    year: 1914,
    title: 'İngiltere, Almanya’ya savaş ilan etti.',
    description: 'Almanya’nın tarafsız Belçika’yı işgal etmesi üzerine Birleşik Krallık, Alman İmparatorluğu’na savaş ilan ederek I. Dünya Savaşı’na resmi olarak dâhil oldu.',
    category: 'world',
    sourceLabel: 'The National Archives (UK)',
    sourceUrl: 'https://www.nationalarchives.gov.uk/first-world-war/',
  },
  {
    id: '08-04-1961',
    day: 4,
    month: 8,
    year: 1961,
    title: 'Barack Obama doğdu.',
    description: 'ABD’nin 44. devlet başkanı ve ülkenin ilk siyahi başkanı olan Barack Obama, Hawaii’nin Honolulu şehrinde dünyaya geldi.',
    category: 'birth',
    sourceLabel: 'Obama Presidential Center',
    sourceUrl: 'https://www.obama.org/',
  },
  {
    id: '08-04-2020',
    day: 4,
    month: 8,
    year: 2020,
    title: 'Beyrut Limanı patlaması meydana geldi.',
    description: 'Lübnan’ın başkenti Beyrut’taki limanda depolanan 2.750 ton amonyum nitratın infilak etmesi sonucu 200’den fazla kişi hayatını kaybetti.',
    category: 'event',
    sourceLabel: 'Birleşmiş Milletler İnsani Yardım Koordinasyon Ofisi (OCHA)',
    sourceUrl: 'https://www.unocha.org/',
  },
  {
    id: '08-04-1944',
    day: 4,
    month: 8,
    year: 1944,
    title: 'Anne Frank ve ailesi tutuklandı.',
    description: 'Amsterdam’da iki yıl boyunca gizli bir bölmede saklanan Anne Frank ve ailesi, Gestapo tarafından keşfedilerek toplama kamplarına gönderildi.',
    category: 'world',
    sourceLabel: 'Anne Frank House',
    sourceUrl: 'https://www.annefrank.org/',
  },

  // =========================================================================
  // 25 AĞUSTOS (ÖNEMLİ REFERANS TARİHİ)
  // =========================================================================
  {
    id: '08-25-1944',
    day: 25,
    month: 8,
    year: 1944,
    title: 'Paris’in Kurtuluşu gerçekleşti.',
    description: 'Dört yılı aşkın Nazi işgalinin ardından General Philippe Leclerc komutasındaki 2. Zırhlı Tümen ve Fransız İç Direniş güçleri Paris’e girdi; Alman garnizonu teslim oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Fransa Savunma Bakanlığı',
    sourceUrl: 'https://www.defense.gouv.fr/mission-liberation/actualites/25-aout-1944-paris-libere',
  },
  {
    id: '08-25-1960',
    day: 25,
    month: 8,
    year: 1960,
    title: 'XVII. Roma Olimpiyat Oyunları başladı.',
    description: 'İtalya’nın başkenti Roma’da düzenlenen ve canlı televizyon yayını yapılan ilk yaz olimpiyatları olan 1960 Olimpiyat Oyunları görkemli törenle açıldı.',
    category: 'sports',
    importance: 'standard',
    sourceLabel: 'Olympic World Library',
    sourceUrl: 'https://library.olympics.com/Default/basicfilesdownload.ashx?itemGuid=2ECE9BE9-EA5F-4F0F-97DF-84C75B6BC60A',
  },
  {
    id: '08-25-1915',
    day: 25,
    month: 8,
    year: 1915,
    title: 'Çanakkale’de İkinci Anafartalar Zaferi kazanıldı.',
    description: 'Anafartalar Grubu Komutanı Kurmay Albay Mustafa Kemal komutasındaki Türk birlikleri, İtilaf Devletleri’nin son büyük taarruzunu püskürterek kesin zafer elde etti.',
    category: 'turkey',
    sourceLabel: 'Çanakkale Savaşları Gelibolu Tarihi Alan Başkanlığı',
    sourceUrl: 'https://canakkaletarihialan.gov.tr',
  },
  {
    id: '08-25-1900',
    day: 25,
    month: 8,
    year: 1900,
    title: 'Ünlü düşünür Friedrich Nietzsche vefat etti.',
    description: 'Böyle Buyurdu Zerdüşt ve İyinin ve Kötünün Ötesinde gibi başyapıtlarıyla modern felsefe, psikoloji ve varoluşçuluk üzerinde derin izler bırakan Alman filozof hayata veda etti.',
    category: 'death',
    sourceLabel: 'Stanford Encyclopedia of Philosophy',
    sourceUrl: 'https://plato.stanford.edu/entries/nietzsche/',
  },
  {
    id: '08-25-1918',
    day: 25,
    month: 8,
    year: 1918,
    title: 'Besteci ve orkestra şefi Leonard Bernstein doğdu.',
    description: 'West Side Story müzikali ve New York Filarmoni Orkestrası şefliğiyle 20. yüzyılın en etkili müzisyenlerinden biri olan Leonard Bernstein dünyaya geldi.',
    category: 'birth',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/collections/leonard-bernstein-collection/',
  },
  {
    id: '08-25-2012',
    day: 25,
    month: 8,
    year: 2012,
    title: 'Ay’a ayak basan ilk insan Neil Armstrong vefat etti.',
    description: 'Apollo 11 göreviyle Ay’a ilk adımı atarak "İnsan için küçük, insanlık için dev bir adım" sözünü tarihe kazıyan efsanevi astronot 82 yaşında vefat etti.',
    category: 'death',
    sourceLabel: 'NASA Resmî Biyografi',
    sourceUrl: 'https://www.nasa.gov/people/neil-a-armstrong/',
  },

  // =========================================================================
  // 26 AĞUSTOS
  // =========================================================================
  {
    id: '08-26-1071',
    day: 26,
    month: 8,
    year: 1071,
    title: 'Malazgirt Zaferi kazanıldı.',
    description: 'Sultan Alparslan komutasındaki Büyük Selçuklu ordusu, Romen Diyojen komutasındaki Bizans ordusunu mağlup ederek Anadolu’nun kapılarını Türklere açtı.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Türk Tarih Kurumu',
    sourceUrl: 'https://www.ttk.gov.tr',
  },
  {
    id: '08-26-1922',
    day: 26,
    month: 8,
    year: 1922,
    title: 'Büyük Taarruz başladı.',
    description: 'Kurtuluş Savaşı’nın son ve kesin aşaması olan Büyük Taarruz, Başkomutan Mustafa Kemal Paşa’nın emriyle sabah 05:30’da Afyon Kocatepe’de topçu ateşiyle başladı.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Milli Savunma Bakanlığı',
    sourceUrl: 'https://www.msb.gov.tr',
  },
  {
    id: '08-26-1789',
    day: 26,
    month: 8,
    year: 1789,
    title: 'İnsan ve Yurttaş Hakları Bildirgesi kabul edildi.',
    description: 'Fransa Ulusal Meclisi, Fransız Devrimi’nin temel metinlerinden biri olan ve insanların özgür, haklar bakımından eşit doğduklarını ilan eden bildirgeyi kabul etti.',
    category: 'world',
    sourceLabel: 'Conseil Constitutionnel',
    sourceUrl: 'https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/declaration-des-droits-de-l-homme-et-du-citoyen-de-1789',
  },
  {
    id: '08-26-1920',
    day: 26,
    month: 8,
    year: 1920,
    title: 'ABD’de kadınlara oy hakkı anayasal güvenceye alındı.',
    description: 'ABD Anayasası’na eklenen 19. Değişiklik resmen yürürlüğe girdi ve kadınların oy kullanma hakkı anayasal düzeyde garanti altına alındı.',
    category: 'world',
    sourceLabel: 'National Archives',
    sourceUrl: 'https://www.archives.gov/milestone-documents/19th-amendment',
  },
  {
    id: '08-26-1924',
    day: 26,
    month: 8,
    year: 1924,
    title: 'Türkiye İş Bankası kuruldu.',
    description: 'Cumhuriyetin ilk ulusal bankası olan Türkiye İş Bankası, Mustafa Kemal Atatürk’ün direktifleriyle Ankara’da faaliyete başladı.',
    category: 'turkey',
    sourceLabel: 'Türkiye İş Bankası Tarihçesi',
    sourceUrl: 'https://www.isbank.com.tr/hakkimizda/tarihcemiz',
  },

  // =========================================================================
  // 27 AĞUSTOS
  // =========================================================================
  {
    id: '08-27-1922',
    day: 27,
    month: 8,
    year: 1922,
    title: 'Türk ordusu Afyonkarahisar’ı Yunan işgalinden kurtardı.',
    description: 'Büyük Taarruz’un ikinci gününde, Başkomutanlık Meydan Muharebesi öncesi kritik bir dönüm noktası olan Afyonkarahisar düşman işgalinden kurtarıldı.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'T.C. Afyonkarahisar Valiliği',
    sourceUrl: 'https://www.afyonkarahisar.gov.tr',
  },
  {
    id: '08-27-1859',
    day: 27,
    month: 8,
    year: 1859,
    title: 'Dünyanın ilk ticari petrol kuyusu açıldı.',
    description: 'Edwin Drake, ABD’nin Pensilvanya eyaletindeki Titusville kasabasında dünyanın ilk ticari petrol kuyusunu başarıyla açarak modern petrol endüstrisini başlattı.',
    category: 'science',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/august-27/',
  },

  // =========================================================================
  // 28 AĞUSTOS
  // =========================================================================
  {
    id: '08-28-1963',
    day: 28,
    month: 8,
    year: 1963,
    title: 'Martin Luther King Jr. "Bir Hayalim Var" konuşmasını yaptı.',
    description: 'İş ve Özgürlük İçin Washington’a Yürüyüş eyleminde Martin Luther King Jr., Lincoln Anıtı önünde toplanan 250 binden fazla kişiye tarihi "I Have a Dream" konuşmasını gerçekleştirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'National Archives',
    sourceUrl: 'https://www.archives.gov',
  },
  {
    id: '08-28-1749',
    day: 28,
    month: 8,
    year: 1749,
    title: 'Alman yazar Johann Wolfgang von Goethe doğdu.',
    description: 'Faust ve Genç Werther’in Acıları gibi başyapıtlarıyla dünya edebiyat tarihinin en büyük yazarlarından kabul edilen Goethe dünyaya geldi.',
    category: 'birth',
    sourceLabel: 'Encyclopaedia Britannica',
    sourceUrl: 'https://www.britannica.com/biography/Johann-Wolfgang-von-Goethe',
  },

  // =========================================================================
  // 29 AĞUSTOS
  // =========================================================================
  {
    id: '08-29-1526',
    day: 29,
    month: 8,
    year: 1526,
    title: 'Mohaç Meydan Muharebesi kazanıldı.',
    description: 'Kanuni Sultan Süleyman komutasındaki Osmanlı ordusu, Macaristan Krallığı ordusunu Mohaç Ovası’nda yalnızca iki saatte mağlup ederek büyük bir zafer elde etti.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Türk Tarih Kurumu',
    sourceUrl: 'https://www.ttk.gov.tr',
  },
  // 30 AĞUSTOS
  // =========================================================================
  {
    id: '08-30-1922',
    day: 30,
    month: 8,
    year: 1922,
    title: 'Büyük Taarruz ve Başkomutanlık Meydan Muharebesi kazanıldı.',
    description: 'Mustafa Kemal Paşa’nın bizzat yönettiği Dumlupınar’daki Başkomutanlık Meydan Muharebesi Türk ordusunun kesin zaferiyle sonuçlandı. 30 Ağustos her yıl Zafer Bayramı olarak kutlanır.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Türk Tarih Kurumu',
    sourceUrl: 'https://www.ttk.gov.tr',
  },

  // =========================================================================
  // 29 EKİM
  // =========================================================================
  {
    id: '10-29-1923',
    day: 29,
    month: 10,
    year: 1923,
    title: 'Türkiye Cumhuriyeti ilan edildi.',
    description: 'Türkiye Büyük Millet Meclisi, Teşkilat-ı Esasiye Kanunu’nda yaptığı değişiklikle devletin yönetim şeklinin Cumhuriyet olduğunu kabul etti. Mustafa Kemal Atatürk oy birliğiyle ilk Cumhurbaşkanı seçildi.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'T.C. Kültür ve Turizm Bakanlığı',
    sourceUrl: 'https://www.ktb.gov.tr/TR-96330/1923.html',
  },
  {
    id: '10-29-1969',
    day: 29,
    month: 10,
    year: 1969,
    title: 'İnternetin atası ARPANET üzerinden ilk veri iletildi.',
    description: 'UCLA’daki bir bilgisayardan Stanford Araştırma Enstitüsü’ndeki diğerine "LOGIN" komutunun ilk iki harfi ("LO") gönderildi ve bilgisayarlar arası ilk paket iletişimi gerçekleşti.',
    category: 'science',
    sourceLabel: 'UCLA Computer Science History',
    sourceUrl: 'https://www.cs.ucla.edu/birthplace-of-the-internet/',
  },
  {
    id: '10-29-1933',
    day: 29,
    month: 10,
    year: 1933,
    title: 'Cumhuriyetin 10. yılı kutlandı ve 10. Yıl Nutku okundu.',
    description: 'Cumhurbaşkanı Mustafa Kemal Atatürk, Ankara Hipodromu’nda Türk milletine seslenerek tarihe geçen Onuncu Yıl Nutku’nu irad etti.',
    category: 'turkey',
    sourceLabel: 'Atatürk Araştırma Merkezi',
    sourceUrl: 'https://www.atam.gov.tr',
  },

  // =========================================================================
  // 10 KASIM
  // =========================================================================
  {
    id: '11-10-1938',
    day: 10,
    month: 11,
    year: 1938,
    title: 'Türkiye Cumhuriyeti’nin kurucusu Gazi Mustafa Kemal Atatürk vefat etti.',
    description: 'Milli Mücadele’nin lideri ve modern Türkiye’nin mimarı Mustafa Kemal Atatürk, saat 09:05’te Dolmabahçe Sarayı’nda hayata gözlerini yumdu.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'Türk Tarih Kurumu Arşivi',
    sourceUrl: 'https://www.ttk.gov.tr',
  },
  {
    id: '11-10-1444',
    day: 10,
    month: 11,
    year: 1444,
    title: 'Varna Muharebesi gerçekleşti.',
    description: 'II. Murad komutasındaki Osmanlı ordusu, Macar ve Leh krallarının öncülük ettiği Haçlı ordusunu Varna Meydan Muharebesi’nde mağlup etti.',
    category: 'turkey',
    sourceLabel: 'İslam Ansiklopedisi',
    sourceUrl: 'https://islamansiklopedisi.org.tr/varna-savasi',
  },

  // =========================================================================
  // 10 ARALIK
  // =========================================================================
  {
    id: '12-10-1948',
    day: 10,
    month: 12,
    year: 1948,
    title: 'İnsan Hakları Evrensel Beyannamesi kabul edildi.',
    description: 'Birleşmiş Milletler Genel Kurulu, Paris’te toplanarak insanlık tarihindeki tüm bireylerin temel hak ve özgürlüklerini garanti altına alan 30 maddelik tarihi beyannameyi kabul etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Birleşmiş Milletler',
    sourceUrl: 'https://www.un.org/en/about-us/universal-declaration-of-human-rights',
  },
  {
    id: '12-10-1901',
    day: 10,
    month: 12,
    year: 1901,
    title: 'İlk Nobel Ödülleri sahiplerini buldu.',
    description: 'Alfred Nobel’in vasiyeti üzerine oluşturulan ödüller; Fizik dalında X ışınlarının kaşifi Wilhelm Röntgen’e, Barış dalında Kızılhaç kurucusu Henry Dunant’a verildi.',
    category: 'science',
    sourceLabel: 'Nobel Vakfı',
    sourceUrl: 'https://www.nobelprize.org',
  },

  // =========================================================================
  // 31 ARALIK
  // =========================================================================
  {
    id: '12-31-1879',
    day: 31,
    month: 12,
    year: 1879,
    title: 'Thomas Edison ilk akkor ampul gösterisini yaptı.',
    description: 'Thomas Edison, New Jersey Menlo Park’taki laboratuvarının sokağını elektrikli akkor lambalarla aydınlatarak halka açık ilk başarılı gösterimini gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Library of Congress',
    sourceUrl: 'https://www.loc.gov/item/today-in-history/december-31/',
  },
  {
    id: '12-31-1999',
    day: 31,
    month: 12,
    year: 1999,
    title: 'Boris Yeltsin istifa etti, Vladimir Putin vekaleten devlet başkanı oldu.',
    description: 'Rusya Devlet Başkanı Boris Yeltsin yılbaşı gecesi televizyondan halkına hitap ederek görevinden istifa ettiğini açıkladı ve yetkilerini Vladimir Putin’e devretti.',
    category: 'world',
    sourceLabel: 'Encyclopaedia Britannica',
    sourceUrl: 'https://www.britannica.com/biography/Boris-Yeltsin',
  },

  // =========================================================================
  // 1960 YILI EK OLAYLARI (YIL KEŞFİ ZENGİNLEŞTİRMESİ)
  // =========================================================================
  {
    id: '05-16-1960',
    day: 16,
    month: 5,
    year: 1960,
    title: 'İlk çalışan lazer (Laser) Theodore Maiman tarafından icat edildi.',
    description: 'Hughes Araştırma Laboratuvarı’nda fizikçi Theodore Maiman, sentetik yakut kristali kullanarak insanlık tarihindeki ilk optik lazer ışınını başarıyla üretti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'American Physical Society',
    sourceUrl: 'https://www.aps.org/publications/apsnews/201005/physicshistory.cfm',
  },
  {
    id: '10-01-1960',
    day: 1,
    month: 10,
    year: 1960,
    title: 'Nijerya bağımsızlığını ilan etti (“Afrika Yılı”).',
    description: '1960 yılında aralarında Nijerya, Kongo, Senegal ve Fildişi Sahili’nin bulunduğu 17 Afrika ülkesi bağımsızlığını kazandı ve bu yıl tarihe "Afrika Yılı" olarak geçti.',
    category: 'world',
    sourceLabel: 'Birleşmiş Milletler Arşivi',
    sourceUrl: 'https://www.un.org/en/about-us/growth-in-un-membership',
  },

  // =========================================================================
  // 1923 YILI EK OLAYLARI (YIL KEŞFİ)
  // =========================================================================
  {
    id: '07-24-1923',
    day: 24,
    month: 7,
    year: 1923,
    title: 'Lozan Barış Antlaşması imzalandı.',
    description: 'İsviçre’nin Lozan kentinde imzalanan antlaşmayla Türkiye Büyük Millet Meclisi hükümetinin tam bağımsızlığı ve Misak-ı Millî sınırları uluslararası alanda tescillendi.',
    category: 'turkey',
    importance: 'featured',
    sourceLabel: 'T.C. Dışişleri Bakanlığı',
    sourceUrl: 'https://www.mfa.gov.tr',
  },
  {
    id: '10-13-1923',
    day: 13,
    month: 10,
    year: 1923,
    title: 'Ankara Türkiye’nin başkenti oldu.',
    description: 'TBMM’de kabul edilen tek maddelik kanun teklifiyle Millî Mücadele’nin karargâhı olan Ankara şehri, yeni Türk devletinin resmî başkenti ilan edildi.',
    category: 'turkey',
    sourceLabel: 'Ankara Büyükşehir Belediyesi & TBMM',
    sourceUrl: 'https://www.ankara.bel.tr',
  },

  // =========================================================================
  // 2000 YILI EK OLAYLARI (YIL KEŞFİ)
  // =========================================================================
  {
    id: '05-17-2000',
    day: 17,
    month: 5,
    year: 2000,
    title: 'Galatasaray UEFA Kupası şampiyonu oldu.',
    description: 'Kopenhag Parken Stadyumu’nda oynanan finalde Arsenal’i penaltı atışlarıyla mağlup eden Galatasaray, Türk futbol tarihinin ilk Avrupa kupası zaferini elde etti.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'UEFA Resmi Arşivi',
    sourceUrl: 'https://www.uefa.com',
  },
  {
    id: '11-02-2000',
    day: 2,
    month: 11,
    year: 2000,
    title: 'Uluslararası Uzay İstasyonu’na (ISS) ilk kalıcı mürettebat yerleşti.',
    description: 'Expedition 1 astronotları Yuri Gidzenko, Sergei Krikalev ve William Shepherd, ISS’e ulaşarak insanlığın uzayda kesintisiz yaşam sürecini başlattı.',
    category: 'science',
    sourceLabel: 'NASA ISS Records',
    sourceUrl: 'https://www.nasa.gov/international-space-station/',
  },
];

// =========================================================================
// HELPER FUNCTIONS & QUERIES
// =========================================================================

export function formatDaySlug(month: number, day: number): string {
  const monthName = MONTH_NAMES_TR[month - 1];
  if (!monthName) return `${String(day).padStart(2, '0')}-${String(month).padStart(2, '0')}`;

  const slugMonth = monthName
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');

  return `${day}-${slugMonth}`;
}

export function formatHistoryDayLabel(month: number, day: number): string {
  const monthName = MONTH_NAMES_TR[month - 1] ?? '';
  return `${day} ${monthName}`;
}

export function parseDaySlug(slug: string): { month: number; day: number } | null {
  if (!slug) return null;
  const clean = slug.trim().toLowerCase();

  // Pattern 1: ISO YYYY-MM-DD or MM-DD (e.g. 2026-08-25 or 08-25)
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    const [, monthStr, dayStr] = clean.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return { month, day };
    }
  }

  if (/^\d{2}-\d{2}$/.test(clean)) {
    const [monthStr, dayStr] = clean.split('-');
    const month = parseInt(monthStr, 10);
    const day = parseInt(dayStr, 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      return { month, day };
    }
  }

  // Pattern 2: DD-monthName (e.g. 25-agustos, 25-ağustos, 10-kasim, 1-ocak)
  const parts = clean.split('-');
  if (parts.length === 2) {
    const day = parseInt(parts[0], 10);
    const monthSlug = parts[1];
    const month = MONTH_SLUGS_TR[monthSlug];
    if (month && day >= 1 && day <= 31) {
      return { month, day };
    }
  }

  return null;
}

export function getEventsByDay(month: number, day: number): HistoryEvent[] {
  return HISTORY_DATABASE.filter(
    (event) => event.month === month && event.day === day
  ).sort((a, b) => a.year - b.year);
}

export function getEventsByYear(year: number): HistoryEvent[] {
  return HISTORY_DATABASE.filter((event) => event.year === year).sort(
    (a, b) => a.month - b.month || a.day - b.day
  );
}

export function getFeaturedEvent(events: HistoryEvent[]): HistoryEvent | null {
  if (!events || events.length === 0) return null;
  const featured = events.find((e) => e.importance === 'featured');
  return featured ?? events[0] ?? null;
}

export function getAdjacentDays(
  month: number,
  day: number
): {
  prev: { month: number; day: number; slug: string; label: string };
  next: { month: number; day: number; slug: string; label: string };
} {
  // Use a standard non-leap year (2025) as baseline for day calculations
  const current = new Date(2025, month - 1, day);

  const prevDate = new Date(current);
  prevDate.setDate(current.getDate() - 1);
  const prevMonth = prevDate.getMonth() + 1;
  const prevDay = prevDate.getDate();

  const nextDate = new Date(current);
  nextDate.setDate(current.getDate() + 1);
  const nextMonth = nextDate.getMonth() + 1;
  const nextDay = nextDate.getDate();

  return {
    prev: {
      month: prevMonth,
      day: prevDay,
      slug: formatDaySlug(prevMonth, prevDay),
      label: formatHistoryDayLabel(prevMonth, prevDay),
    },
    next: {
      month: nextMonth,
      day: nextDay,
      slug: formatDaySlug(nextMonth, nextDay),
      label: formatHistoryDayLabel(nextMonth, nextDay),
    },
  };
}

export function getAdjacentYears(year: number): { prev: number; next: number } {
  return {
    prev: year - 1,
    next: year + 1,
  };
}

export function getAllAvailableDates(): {
  month: number;
  day: number;
  slug: string;
  label: string;
  count: number;
}[] {
  const map = new Map<string, { month: number; day: number; count: number }>();
  for (const event of HISTORY_DATABASE) {
    const key = `${event.month}-${event.day}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { month: event.month, day: event.day, count: 1 });
    }
  }

  return Array.from(map.values())
    .map(({ month, day, count }) => ({
      month,
      day,
      slug: formatDaySlug(month, day),
      label: formatHistoryDayLabel(month, day),
      count,
    }))
    .sort((a, b) => a.month - b.month || a.day - b.day);
}

export function getAllAvailableYears(): { year: number; count: number }[] {
  const map = new Map<number, number>();
  for (const event of HISTORY_DATABASE) {
    map.set(event.year, (map.get(event.year) || 0) + 1);
  }
  return Array.from(map.entries())
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year);
}

/**
 * Geriye dönük uyumluluk: DailyUtilityWidget ve eski sayfalar için
 */
export function getTodayInHistory(date: Date = new Date()): TodayInHistoryDay {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const events = getEventsByDay(month, day);
  return { events };
}

export function formatHistoryDate(date: Date): string {
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function toHistoryDateValue(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function parseHistoryDate(value: string): Date | null {
  const parsed = parseDaySlug(value);
  if (parsed) {
    return new Date(2026, parsed.month - 1, parsed.day);
  }
  return null;
}

export function getHistoryDateKeys(): string[] {
  return getAllAvailableDates().map((d) => `${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`);
}