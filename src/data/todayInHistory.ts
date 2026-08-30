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
 * Küratörlü Tarihsel Veri Seti.
 * Mevcut kurumsal kayıtlar korunur; eklenen kayıtlar tarih bazlı kaynak sayfalarına bağlanır.
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
  {
    id: '02-01-1793',
    day: 1,
    month: 2,
    year: 1793,
    title: 'Lucretia Mott doğdu.',
    description: 'Kadın hakları, köleliğin kaldırılması ve barış hareketlerinin önemli öncülerinden Lucretia Coffin Mott doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_1',
  },

  {
    id: '02-02-1848',
    day: 2,
    month: 2,
    year: 1848,
    title: 'Guadalupe Hidalgo Antlaşması imzalandı.',
    description: 'Meksika-Amerika Savaşı’nı sona erdiren Guadalupe Hidalgo Antlaşması imzalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_2',
  },

  {
    id: '02-03-1859',
    day: 3,
    month: 2,
    year: 1859,
    title: 'Oregon ABD’nin 33. eyaleti oldu.',
    description: 'Oregon, Birleşik Devletler’e 33. eyalet olarak kabul edildi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_3',
  },

  {
    id: '02-04-1945',
    day: 4,
    month: 2,
    year: 1945,
    title: 'Yalta Konferansı başladı.',
    description: 'Müttefik liderler II. Dünya Savaşı’nın sonrasındaki Avrupa düzenini görüşmek üzere Yalta’da bir araya geldi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_4',
  },

  {
    id: '02-05-1818',
    day: 5,
    month: 2,
    year: 1818,
    title: 'Karl Marx doğdu.',
    description: 'Filozof ve politik düşünür Karl Marx Trier’de doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_5',
  },

  {
    id: '02-06-1952',
    day: 6,
    month: 2,
    year: 1952,
    title: 'II. Elizabeth Birleşik Krallık tahtına çıktı.',
    description: 'Kral VI. George’un ölümünün ardından II. Elizabeth tahta çıktı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_6',
  },

  {
    id: '02-07-1964',
    day: 7,
    month: 2,
    year: 1964,
    title: 'The Beatles ABD’ye ilk kez geldi.',
    description: 'The Beatles, ilk ABD turnesi kapsamında New York’a ulaştı ve Beatlemania’yı Amerika’ya taşıdı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_7',
  },

  {
    id: '02-08-1910',
    day: 8,
    month: 2,
    year: 1910,
    title: 'Williamina Fleming’in çalışmaları astronomide yeni keşiflere katkı sağladı.',
    description: 'Harvard College Observatory’de çalışan Williamina Fleming’in yıldız tayfları üzerine çalışmaları astronomi tarihinde önemli bir yer edindi.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_8',
  },

  {
    id: '02-09-1964',
    day: 9,
    month: 2,
    year: 1964,
    title: 'The Beatles, Ed Sullivan Show’da ilk kez sahne aldı.',
    description: 'The Beatles, ABD televizyonunda geniş kitlelere ulaşan ilk büyük performanslarından birini gerçekleştirdi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_9',
  },

  {
    id: '02-10-1763',
    day: 10,
    month: 2,
    year: 1763,
    title: 'Paris Antlaşması imzalandı.',
    description: 'Yedi Yıl Savaşı’nı sona erdiren Paris Antlaşması imzalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_10',
  },

  {
    id: '02-11-1990',
    day: 11,
    month: 2,
    year: 1990,
    title: 'Nelson Mandela serbest bırakıldı.',
    description: 'Apartheid karşıtı mücadelenin lideri Nelson Mandela, 27 yıllık hapis hayatının ardından serbest bırakıldı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_11',
  },

  {
    id: '02-12-1809',
    day: 12,
    month: 2,
    year: 1809,
    title: 'Abraham Lincoln doğdu.',
    description: 'Amerika Birleşik Devletleri’nin 16. başkanı Abraham Lincoln Kentucky’de doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_12',
  },

  {
    id: '02-13-1635',
    day: 13,
    month: 2,
    year: 1635,
    title: 'Boston Latin School kuruldu.',
    description: 'Amerika’nın en eski devlet okullarından Boston Latin School eğitim vermeye başladı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_13',
  },

  {
    id: '02-14-1876',
    day: 14,
    month: 2,
    year: 1876,
    title: 'Alexander Graham Bell telefon patenti için başvurdu.',
    description: 'Alexander Graham Bell telefon için patent başvurusunu yaptı; aynı gün Elisha Gray de benzer bir başvuruda bulundu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_14',
  },

  {
    id: '02-15-1898',
    day: 15,
    month: 2,
    year: 1898,
    title: 'USS Maine Havana Limanı’nda battı.',
    description: 'ABD savaş gemisi USS Maine Havana Limanı’nda meydana gelen patlamayla battı ve olay İspanya-Amerika Savaşı sürecini hızlandırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_15',
  },

  {
    id: '02-16-1923',
    day: 16,
    month: 2,
    year: 1923,
    title: 'Howard Carter Tutankhamun’un mezar odasını açtı.',
    description: 'Howard Carter, Tutankhamun’un mezar odasına girerek arkeoloji tarihinin en ünlü keşiflerinden birini gerçekleştirdi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_16',
  },

  {
    id: '02-17-1864',
    day: 17,
    month: 2,
    year: 1864,
    title: 'H.L. Hunley denizaltısı ilk başarılı savaş saldırısını gerçekleştirdi.',
    description: 'Konfederasyon denizaltısı H.L. Hunley, USS Housatonic’e saldırarak savaş tarihinde denizaltıyla gerçekleştirilen ilk başarılı saldırılardan birini yaptı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_17',
  },

  {
    id: '02-18-1930',
    day: 18,
    month: 2,
    year: 1930,
    title: 'Plüton keşfedildi.',
    description: 'Clyde Tombaugh, Lowell Observatory’de yaptığı gözlemler sonucunda daha sonra Plüton adı verilen gökcismini keşfetti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_18',
  },

  {
    id: '02-19-1473',
    day: 19,
    month: 2,
    year: 1473,
    title: 'Nicolaus Copernicus doğdu.',
    description: 'Güneş merkezli evren modelinin öncülerinden Nicolaus Copernicus doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_19',
  },

  {
    id: '02-20-1962',
    day: 20,
    month: 2,
    year: 1962,
    title: 'John Glenn Dünya yörüngesine çıkan ilk Amerikalı oldu.',
    description: 'John Glenn, Friendship 7 göreviyle Dünya’nın çevresinde üç tur atarak ABD’nin ilk insanlı yörünge uçuşunu gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_20',
  },

  {
    id: '02-21-1972',
    day: 21,
    month: 2,
    year: 1972,
    title: 'Richard Nixon Çin’i ziyaret etti.',
    description: 'ABD Başkanı Richard Nixon’ın Çin ziyareti, iki ülke arasındaki ilişkilerin normalleşmesinde tarihi bir dönüm noktası oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_21',
  },

  {
    id: '02-22-1732',
    day: 22,
    month: 2,
    year: 1732,
    title: 'George Washington doğdu.',
    description: 'ABD’nin ilk başkanı George Washington Virginia’da doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_22',
  },

  {
    id: '02-23-1945',
    day: 23,
    month: 2,
    year: 1945,
    title: 'Iwo Jima’da Suribachi Dağı ele geçirildi.',
    description: 'ABD Deniz Piyadeleri Iwo Jima Muharebesi sırasında Suribachi Dağı’nda bayrak kaldırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_23',
  },

  {
    id: '02-24-1582',
    day: 24,
    month: 2,
    year: 1582,
    title: 'Gregoryen takviminin reform süreci başlatıldı.',
    description: 'Papa XIII. Gregorius’un takvim reformu için hazırlanan düzenleme, modern Gregoryen takviminin temelini oluşturdu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_24',
  },

  {
    id: '02-25-1945',
    day: 25,
    month: 2,
    year: 1945,
    title: 'Türkiye’de çok partili siyasi hayatın önemli adımlarından biri atıldı.',
    description: 'Türkiye’de savaş sonrası siyasi ortamda demokratikleşme ve çok partili hayata geçiş tartışmaları yoğunlaştı.',
    category: 'turkey',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_25',
  },

  {
    id: '02-26-1815',
    day: 26,
    month: 2,
    year: 1815,
    title: 'Napolyon Elba’dan kaçtı.',
    description: 'Napolyon Bonapart Elba Adası’ndan kaçarak Fransa’ya döndü ve Yüz Gün dönemini başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_26',
  },

  {
    id: '02-27-1932',
    day: 27,
    month: 2,
    year: 1932,
    title: 'John Steinbeck doğdu.',
    description: 'Amerikalı yazar John Steinbeck doğdu; daha sonra Nobel Edebiyat Ödülü’ne layık görüldü.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_27',
  },

  {
    id: '02-28-1953',
    day: 28,
    month: 2,
    year: 1953,
    title: 'DNA’nın çift sarmal yapısının keşfine giden çalışma yayımlandı.',
    description: 'James Watson ve Francis Crick’in DNA yapısı üzerine çalışmaları, modern moleküler biyolojinin temel taşlarından biri oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_28',
  },

  {
    id: '03-01-1872',
    day: 1,
    month: 3,
    year: 1872,
    title: 'Yellowstone dünyanın ilk millî parkı oldu.',
    description: 'Yellowstone, ABD Başkanı Ulysses S. Grant’ın imzasıyla dünyanın ilk millî parkı olarak koruma altına alındı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_1',
  },

  {
    id: '03-02-1958',
    day: 2,
    month: 3,
    year: 1958,
    title: 'Explorer 2 fırlatıldı.',
    description: 'ABD’nin erken dönem uydu programlarından Explorer serisinin ikinci uydusu fırlatıldı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_2',
  },

  {
    id: '03-03-1931',
    day: 3,
    month: 3,
    year: 1931,
    title: 'Amerika Birleşik Devletleri milli marşı resmen kabul edildi.',
    description: 'The Star-Spangled Banner, ABD’nin resmi milli marşı oldu.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_3',
  },

  {
    id: '03-04-1933',
    day: 4,
    month: 3,
    year: 1933,
    title: 'Franklin D. Roosevelt ilk başkanlık yeminini etti.',
    description: 'Franklin D. Roosevelt ABD başkanı olarak yemin etti ve Büyük Buhran dönemindeki görevine başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_4',
  },

  {
    id: '03-05-1770',
    day: 5,
    month: 3,
    year: 1770,
    title: 'Boston Katliamı gerçekleşti.',
    description: 'İngiliz askerleri ile Boston halkı arasındaki çatışmada beş kişi öldü; olay Amerikan Devrimi’nin sembollerinden biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_5',
  },

  {
    id: '03-06-1475',
    day: 6,
    month: 3,
    year: 1475,
    title: 'Michelangelo doğdu.',
    description: 'Rönesans’ın en büyük sanatçılarından Michelangelo Buonarroti doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_6',
  },

  {
    id: '03-07-1876',
    day: 7,
    month: 3,
    year: 1876,
    title: 'Alexander Graham Bell telefon patenti aldı.',
    description: 'Alexander Graham Bell, telefon için ABD patentini aldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_7',
  },

  {
    id: '03-08-1917',
    day: 8,
    month: 3,
    year: 1917,
    title: 'Petrograd’da Şubat Devrimi başladı.',
    description: 'Rusya’daki devrimci hareketler Petrograd’da geniş çaplı gösterilere dönüştü ve Çarlık rejiminin sonunu getiren süreci başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_8',
  },

  {
    id: '03-09-1959',
    day: 9,
    month: 3,
    year: 1959,
    title: 'Barbie bebek ilk kez tanıtıldı.',
    description: 'Barbie, New York Oyuncak Fuarı’nda ilk kez tanıtıldı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_9',
  },

  {
    id: '03-10-1876',
    day: 10,
    month: 3,
    year: 1876,
    title: 'Bell ilk anlaşılır telefon görüşmesini yaptı.',
    description: 'Alexander Graham Bell, yardımcısı Thomas Watson ile telefon üzerinden ilk anlaşılır konuşmasını gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_10',
  },

  {
    id: '03-11-2011',
    day: 11,
    month: 3,
    year: 2011,
    title: 'Tōhoku depremi ve tsunamisi gerçekleşti.',
    description: 'Japonya’nın kuzeydoğusunu vuran 9,0 büyüklüğündeki deprem ve ardından gelen tsunami büyük yıkıma yol açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_11',
  },

  {
    id: '03-12-1933',
    day: 12,
    month: 3,
    year: 1933,
    title: 'FDR ilk “Fireside Chat” konuşmasını yaptı.',
    description: 'Franklin D. Roosevelt, bankacılık krizi sırasında halka radyodan doğrudan seslenerek ilk Fireside Chat konuşmasını gerçekleştirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_12',
  },

  {
    id: '03-13-1781',
    day: 13,
    month: 3,
    year: 1781,
    title: 'Uranüs keşfedildi.',
    description: 'William Herschel, daha sonra Uranüs adı verilen gezegeni keşfetti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_13',
  },

  {
    id: '03-14-1879',
    day: 14,
    month: 3,
    year: 1879,
    title: 'Albert Einstein doğdu.',
    description: 'Modern fiziğin en etkili isimlerinden Albert Einstein Almanya’nın Ulm kentinde doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_14',
  },

  {
    id: '03-15-44',
    day: 15,
    month: 3,
    year: 44,
    title: 'Julius Caesar öldürüldü.',
    description: 'Julius Caesar, Roma Senatosu’nda suikasta uğradı; olay Roma Cumhuriyeti’nin son dönemini şekillendirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_15',
  },

  {
    id: '03-17-1762',
    day: 17,
    month: 3,
    year: 1762,
    title: 'Aziz Patrick Günü geçit töreni geleneği başladı.',
    description: 'New York’ta düzenlenen erken dönem Aziz Patrick Günü yürüyüşleri, bugün dünyanın farklı yerlerinde sürdürülen geleneğin temellerinden oldu.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_17',
  },

  {
    id: '03-18-1965',
    day: 18,
    month: 3,
    year: 1965,
    title: 'Alexei Leonov uzay yürüyüşü yapan ilk insan oldu.',
    description: 'Sovyet kozmonot Alexei Leonov, Voskhod 2 görevi sırasında uzay aracından çıkarak tarihin ilk uzay yürüyüşünü gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_18',
  },

  {
    id: '03-19-2003',
    day: 19,
    month: 3,
    year: 2003,
    title: 'Irak Savaşı başladı.',
    description: 'ABD öncülüğündeki koalisyon güçleri Irak’a yönelik askeri harekâtı başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_19',
  },

  {
    id: '03-20-1800',
    day: 20,
    month: 3,
    year: 1800,
    title: 'Alessandro Volta elektrik pili geliştirdi.',
    description: 'Alessandro Volta’nın elektrik pili üzerine çalışmaları, sürekli elektrik akımı üretiminin önünü açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_20',
  },

  {
    id: '03-21-1960',
    day: 21,
    month: 3,
    year: 1960,
    title: 'Sharpeville Katliamı gerçekleşti.',
    description: 'Güney Afrika’da apartheid karşıtı protestoda polis ateş açtı; olay uluslararası apartheid karşıtı hareketin dönüm noktalarından biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_21',
  },

  {
    id: '03-22-1993',
    day: 22,
    month: 3,
    year: 1993,
    title: 'Dünya Su Günü ilk kez kutlandı.',
    description: 'Birleşmiş Milletler’in kararıyla 22 Mart Dünya Su Günü olarak küresel ölçekte anılmaya başladı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_22',
  },

  {
    id: '03-23-1775',
    day: 23,
    month: 3,
    year: 1775,
    title: 'Patrick Henry “Bana özgürlük ya da ölüm” konuşmasını yaptı.',
    description: 'Patrick Henry Virginia’da Amerikan Devrimi’nin en ünlü konuşmalarından birini yaptı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_23',
  },

  {
    id: '03-25-1821',
    day: 25,
    month: 3,
    year: 1821,
    title: 'Yunan Bağımsızlık Savaşı başladı.',
    description: 'Yunan bağımsızlık hareketi Osmanlı yönetimine karşı ayaklanmayla geniş çaplı bir savaşa dönüştü.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_25',
  },

  {
    id: '03-26-1979',
    day: 26,
    month: 3,
    year: 1979,
    title: 'Mısır-İsrail Barış Antlaşması imzalandı.',
    description: 'Mısır ve İsrail, Camp David sürecinin ardından barış antlaşmasını imzaladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_26',
  },

  {
    id: '03-27-1977',
    day: 27,
    month: 3,
    year: 1977,
    title: 'Tenerife uçak kazası gerçekleşti.',
    description: 'İki Boeing 747’nin çarpışmasıyla Tenerife’de havacılık tarihinin en ölümcül kazalarından biri yaşandı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_27',
  },

  {
    id: '03-28-1979',
    day: 28,
    month: 3,
    year: 1979,
    title: 'Three Mile Island nükleer kazası meydana geldi.',
    description: 'ABD’nin Pennsylvania eyaletindeki Three Mile Island nükleer santralinde kısmi çekirdek erimesi yaşandı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_28',
  },

  {
    id: '03-29-1886',
    day: 29,
    month: 3,
    year: 1886,
    title: 'Coca-Cola ilk kez satışa çıktı.',
    description: 'John Pemberton’un geliştirdiği Coca-Cola Atlanta’da ilk kez satışa sunuldu.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_29',
  },

  {
    id: '03-30-1981',
    day: 30,
    month: 3,
    year: 1981,
    title: 'Ronald Reagan’a suikast girişiminde bulunuldu.',
    description: 'ABD Başkanı Ronald Reagan Washington’da silahlı saldırıya uğradı ve yaralı olarak kurtuldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_30',
  },

  {
    id: '03-31-1889',
    day: 31,
    month: 3,
    year: 1889,
    title: 'Eyfel Kulesi açıldı.',
    description: 'Paris’te Eyfel Kulesi, 1889 Dünya Fuarı öncesinde tamamlanarak ziyaretçilere açıldı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_31',
  },

  {
    id: '04-01-1976',
    day: 1,
    month: 4,
    year: 1976,
    title: 'Apple kuruldu.',
    description: 'Steve Jobs, Steve Wozniak ve Ronald Wayne Apple Computer Company’yi kurdu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_1',
  },

  {
    id: '04-02-1513',
    day: 2,
    month: 4,
    year: 1513,
    title: 'Juan Ponce de León Florida kıyılarına ulaştı.',
    description: 'İspanyol kâşif Juan Ponce de León, Florida olarak adlandırılacak bölgeye ulaştı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_2',
  },

  {
    id: '04-03-1860',
    day: 3,
    month: 4,
    year: 1860,
    title: 'İlk başarılı ticari yeraltı petrol kuyularından biri açıldı.',
    description: 'Petrol arama ve üretim teknolojilerinin gelişmesiyle modern petrol endüstrisinin temelleri güçlendi.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_3',
  },

  {
    id: '04-04-1968',
    day: 4,
    month: 4,
    year: 1968,
    title: 'Martin Luther King Jr. öldürüldü.',
    description: 'ABD medeni haklar hareketinin lideri Martin Luther King Jr. Memphis’te suikasta uğradı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_4',
  },

  {
    id: '04-06-1896',
    day: 6,
    month: 4,
    year: 1896,
    title: 'İlk modern Olimpiyat Oyunları başladı.',
    description: 'Atina’da düzenlenen oyunlarla modern Olimpiyat hareketi uluslararası ölçekte yeniden başladı.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_6',
  },

  {
    id: '04-07-1948',
    day: 7,
    month: 4,
    year: 1948,
    title: 'Dünya Sağlık Örgütü kuruldu.',
    description: 'Dünya Sağlık Örgütü’nün anayasası yürürlüğe girerek WHO resmen kuruldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_7',
  },

  {
    id: '04-09-1865',
    day: 9,
    month: 4,
    year: 1865,
    title: 'Robert E. Lee Appomattox’ta teslim oldu.',
    description: 'Amerikan İç Savaşı’nın en önemli dönüm noktalarından biri olarak Robert E. Lee ordusunu General Grant’a teslim etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_9',
  },

  {
    id: '04-11-1970',
    day: 11,
    month: 4,
    year: 1970,
    title: 'Apollo 13 fırlatıldı.',
    description: 'Apollo 13 görevi Ay’a gitmek üzere fırlatıldı; sonraki günlerde yaşanan kaza mürettebatın hayatta kalma mücadelesine dönüştü.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_11',
  },

  {
    id: '04-12-1961',
    day: 12,
    month: 4,
    year: 1961,
    title: 'Yuri Gagarin uzaya çıkan ilk insan oldu.',
    description: 'Sovyet kozmonot Yuri Gagarin Vostok 1 ile Dünya yörüngesine çıkarak uzaya giden ilk insan oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_12',
  },

  {
    id: '04-14-1865',
    day: 14,
    month: 4,
    year: 1865,
    title: 'Abraham Lincoln vuruldu.',
    description: 'ABD Başkanı Abraham Lincoln, Washington’daki Ford’s Theatre’da John Wilkes Booth tarafından vuruldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_14',
  },

  {
    id: '04-15-1912',
    day: 15,
    month: 4,
    year: 1912,
    title: 'Titanic battı.',
    description: 'RMS Titanic bir buzdağına çarptıktan sonra Kuzey Atlantik’te battı ve 1.500’den fazla insan hayatını kaybetti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_15',
  },

  {
    id: '04-18-1906',
    day: 18,
    month: 4,
    year: 1906,
    title: 'San Francisco depremi meydana geldi.',
    description: 'Büyük San Francisco Depremi ve ardından çıkan yangınlar şehri ağır biçimde tahrip etti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_18',
  },

  {
    id: '04-19-1775',
    day: 19,
    month: 4,
    year: 1775,
    title: 'Amerikan Devrimi’nin ilk çatışmaları yaşandı.',
    description: 'Lexington ve Concord çatışmaları Amerikan Devrimi’nin silahlı aşamasını başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_19',
  },

  {
    id: '04-22-1970',
    day: 22,
    month: 4,
    year: 1970,
    title: 'İlk Dünya Günü kutlandı.',
    description: 'Çevre bilincini artırmak amacıyla ilk Dünya Günü etkinlikleri düzenlendi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_22',
  },

  {
    id: '04-26-1986',
    day: 26,
    month: 4,
    year: 1986,
    title: 'Çernobil nükleer kazası gerçekleşti.',
    description: 'Ukrayna’daki Çernobil Nükleer Santrali’nin 4 numaralı reaktöründe büyük bir nükleer kaza meydana geldi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_26',
  },

  {
    id: '04-30-1789',
    day: 30,
    month: 4,
    year: 1789,
    title: 'George Washington ilk ABD başkanı olarak yemin etti.',
    description: 'George Washington New York’ta yemin ederek Amerika Birleşik Devletleri’nin ilk başkanı oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_30',
  },

  {
    id: '05-01-1886',
    day: 1,
    month: 5,
    year: 1886,
    title: 'Haymarket olaylarına giden işçi hareketleri yoğunlaştı.',
    description: 'Chicago’daki işçi hareketleri sekiz saatlik çalışma günü mücadelesinin sembolü haline geldi ve 1 Mayıs’ın işçi bayramı olarak anılmasına zemin hazırladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_1',
  },

  {
    id: '05-02-1519',
    day: 2,
    month: 5,
    year: 1519,
    title: 'Leonardo da Vinci öldü.',
    description: 'Rönesans’ın en büyük sanatçı ve düşünürlerinden Leonardo da Vinci Amboise’da öldü.',
    category: 'death',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_2',
  },

  {
    id: '05-04-1970',
    day: 4,
    month: 5,
    year: 1970,
    title: 'Kent State Üniversitesi protestolarında dört öğrenci öldürüldü.',
    description: 'Vietnam Savaşı protestoları sırasında Ohio’daki Kent State Üniversitesi’nde Ulusal Muhafız ateş açtı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_4',
  },

  {
    id: '05-05-1818',
    day: 5,
    month: 5,
    year: 1818,
    title: 'Karl Marx doğdu.',
    description: 'Filozof ve politik düşünür Karl Marx Trier’de doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_5',
  },

  {
    id: '05-06-1957',
    day: 6,
    month: 5,
    year: 1957,
    title: 'John Diefenbaker Kanada başbakanı seçildi.',
    description: 'Kanada’da federal seçim sonucunda Muhafazakâr Parti iktidara geldi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_6',
  },

  {
    id: '05-07-1945',
    day: 7,
    month: 5,
    year: 1945,
    title: 'Almanya koşulsuz teslim belgesini imzaladı.',
    description: 'Nazi Almanyası Müttefiklere teslim oldu; Avrupa’da II. Dünya Savaşı’nın sonuna giden süreç tamamlandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_7',
  },

  {
    id: '05-08-1945',
    day: 8,
    month: 5,
    year: 1945,
    title: 'Avrupa’da II. Dünya Savaşı’nın zaferi kutlandı.',
    description: 'Almanya’nın teslimiyetinin ardından Avrupa’da savaşın sona ermesi VE Day olarak anıldı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_8',
  },

  {
    id: '05-09-1950',
    day: 9,
    month: 5,
    year: 1950,
    title: 'Schuman Bildirisi açıklandı.',
    description: 'Robert Schuman’ın önerisi Avrupa kömür ve çelik kaynaklarının ortak yönetimini savunarak Avrupa bütünleşmesinin temel adımlarından birini oluşturdu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_9',
  },

  {
    id: '05-10-1994',
    day: 10,
    month: 5,
    year: 1994,
    title: 'Nelson Mandela Güney Afrika başkanı olarak yemin etti.',
    description: 'Apartheid sonrası ilk demokratik seçimlerin ardından Nelson Mandela Güney Afrika’nın başkanı oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_10',
  },

  {
    id: '05-12-1820',
    day: 12,
    month: 5,
    year: 1820,
    title: 'Florence Nightingale doğdu.',
    description: 'Modern hemşireliğin kurucularından Florence Nightingale Floransa’da doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_12',
  },

  {
    id: '05-14-1607',
    day: 14,
    month: 5,
    year: 1607,
    title: 'Jamestown yerleşimi kuruldu.',
    description: 'İngiliz kolonistlerin Jamestown’da yerleşmesi Kuzey Amerika’daki İngiliz sömürge tarihinin önemli dönüm noktalarından biri oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_14',
  },

  {
    id: '05-15-1948',
    day: 15,
    month: 5,
    year: 1948,
    title: 'İsrail Devleti kuruldu.',
    description: 'İsrail’in kuruluşunun ardından Birinci Arap-İsrail Savaşı başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_15',
  },

  {
    id: '05-16-1929',
    day: 16,
    month: 5,
    year: 1929,
    title: 'İlk Akademi Ödülleri töreni düzenlendi.',
    description: 'Hollywood’un ilk Academy Awards töreni Los Angeles’ta gerçekleştirildi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_16',
  },

  {
    id: '05-18-1980',
    day: 18,
    month: 5,
    year: 1980,
    title: 'Mount St. Helens patladı.',
    description: 'ABD’nin Washington eyaletindeki Mount St. Helens volkanı büyük bir patlamayla faaliyete geçti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_18',
  },

  {
    id: '05-20-1927',
    day: 20,
    month: 5,
    year: 1927,
    title: 'Charles Lindbergh Atlantik’i tek başına geçmek için uçuşuna başladı.',
    description: 'Lindbergh, Spirit of St. Louis ile New York’tan Paris’e tarihi solo transatlantik uçuşunu gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_20',
  },

  {
    id: '05-21-1904',
    day: 21,
    month: 5,
    year: 1904,
    title: 'FIFA kuruldu.',
    description: 'Uluslararası Futbol Federasyonları Birliği FIFA Paris’te kuruldu.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_21',
  },

  {
    id: '05-22-1455',
    day: 22,
    month: 5,
    year: 1455,
    title: 'Gutenberg İncili’nin basımı dönüm noktası oldu.',
    description: 'Johannes Gutenberg’in matbaa teknolojisiyle hazırladığı İncil, Avrupa’da basım devriminin simgelerinden biri oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_22',
  },

  {
    id: '05-25-1977',
    day: 25,
    month: 5,
    year: 1977,
    title: 'Star Wars sinemalarda gösterime girdi.',
    description: 'George Lucas’ın Star Wars filmi ABD’de sinemalarda gösterime girerek popüler kültürde büyük bir dönüm noktası yarattı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_25',
  },

  {
    id: '05-27-1937',
    day: 27,
    month: 5,
    year: 1937,
    title: 'Golden Gate Köprüsü açıldı.',
    description: 'San Francisco’daki Golden Gate Köprüsü halka açıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_27',
  },

  {
    id: '05-29-1953',
    day: 29,
    month: 5,
    year: 1953,
    title: 'Everest’in zirvesine ilk kez çıkıldı.',
    description: 'Edmund Hillary ve Tenzing Norgay Everest Dağı’nın zirvesine ulaşan ilk kişiler oldu.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_29',
  },

  {
    id: '05-31-1859',
    day: 31,
    month: 5,
    year: 1859,
    title: 'Big Ben’in saati çalışmaya başladı.',
    description: 'Londra’daki Westminster saat kulesinin saati ilk kez çalıştırıldı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_31',
  },

  {
    id: '06-01-1926',
    day: 1,
    month: 6,
    year: 1926,
    title: 'Marilyn Monroe doğdu.',
    description: 'Amerikalı oyuncu ve şarkıcı Marilyn Monroe Los Angeles’ta doğdu.',
    category: 'birth',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_1',
  },

  {
    id: '06-02-1953',
    day: 2,
    month: 6,
    year: 1953,
    title: 'II. Elizabeth’in taç giyme töreni yapıldı.',
    description: 'II. Elizabeth Londra Westminster Abbey’de Birleşik Krallık kraliçesi olarak taç giydi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_2',
  },

  {
    id: '06-03-1965',
    day: 3,
    month: 6,
    year: 1965,
    title: 'Edward Higgins White uzay yürüyüşü yaptı.',
    description: 'Amerikalı astronot Edward H. White, Gemini 4 görevi sırasında ABD’nin ilk uzay yürüyüşünü gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_3',
  },

  {
    id: '06-05-1944',
    day: 5,
    month: 6,
    year: 1944,
    title: 'D-Day hazırlıkları tamamlandı.',
    description: 'Müttefik kuvvetler Normandiya çıkarması öncesinde Avrupa’daki en büyük deniz harekâtının hazırlıklarını tamamladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_5',
  },

  {
    id: '06-08-1968',
    day: 8,
    month: 6,
    year: 1968,
    title: 'Robert Kennedy’nin cenazesi yapıldı.',
    description: 'Suikasta uğrayan ABD senatörü Robert F. Kennedy’nin cenazesi New York’ta düzenlendi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_8',
  },

  {
    id: '06-10-1967',
    day: 10,
    month: 6,
    year: 1967,
    title: 'Altı Gün Savaşı sona erdi.',
    description: 'İsrail ile Mısır, Ürdün ve Suriye arasındaki Altı Gün Savaşı ateşkesle sona erdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_10',
  },

  {
    id: '06-12-1987',
    day: 12,
    month: 6,
    year: 1987,
    title: 'Reagan Berlin Duvarı konuşmasını yaptı.',
    description: 'ABD Başkanı Ronald Reagan Batı Berlin’de yaptığı konuşmada Sovyet liderliğine Berlin Duvarı’nın kaldırılması çağrısında bulundu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_12',
  },

  {
    id: '06-13-1983',
    day: 13,
    month: 6,
    year: 1983,
    title: 'Pioneer 10 Güneş Sistemi’nin dış bölgelerine ilerledi.',
    description: 'Pioneer 10, Güneş Sistemi’nin dış bölgelerini keşfeden önemli uzay görevlerinden biri olarak yolculuğunu sürdürdü.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_13',
  },

  {
    id: '06-14-1777',
    day: 14,
    month: 6,
    year: 1777,
    title: 'ABD bayrağı kabul edildi.',
    description: 'Kıta Kongresi yıldızlar ve şeritlerden oluşan ABD bayrağının temel tasarımını kabul etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_14',
  },

  {
    id: '06-15-1215',
    day: 15,
    month: 6,
    year: 1215,
    title: 'Magna Carta mühürlendi.',
    description: 'İngiltere Kralı John, Magna Carta’yı mühürleyerek kralın yetkilerinin sınırlandırılması tarihinde önemli bir adım attı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_15',
  },

  {
    id: '06-16-1963',
    day: 16,
    month: 6,
    year: 1963,
    title: 'Valentina Tereshkova uzaya çıkan ilk kadın oldu.',
    description: 'Sovyet kozmonot Valentina Tereshkova Vostok 6 ile uzaya çıkarak tarihin ilk kadın uzay yolcusu oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_16',
  },

  {
    id: '06-17-1972',
    day: 17,
    month: 6,
    year: 1972,
    title: 'Watergate baskını gerçekleşti.',
    description: 'Demokrat Parti’nin Washington’daki Watergate merkezine girilmesi daha sonra ABD tarihinin en büyük siyasi skandallarından birine dönüştü.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_17',
  },

  {
    id: '06-18-1815',
    day: 18,
    month: 6,
    year: 1815,
    title: 'Waterloo Muharebesi gerçekleşti.',
    description: 'Napolyon’un son büyük savaşı olan Waterloo Muharebesi’nde Müttefik orduları Fransız ordusunu yendi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_18',
  },

  {
    id: '06-19-1865',
    day: 19,
    month: 6,
    year: 1865,
    title: 'Juneteenth’in dayandığı özgürlük ilanı Teksas’ta duyuruldu.',
    description: 'General Gordon Granger, Galveston’da köleleştirilen insanların özgür olduğunu ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_19',
  },

  {
    id: '06-20-1969',
    day: 20,
    month: 6,
    year: 1969,
    title: 'Apollo 11 Ay’a iniş hazırlıkları tamamlandı.',
    description: 'Apollo 11 ekibi Ay’a iniş öncesindeki son hazırlıkları tamamladı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_20',
  },

  {
    id: '06-21-1788',
    day: 21,
    month: 6,
    year: 1788,
    title: 'New Hampshire ABD Anayasası’nı onayladı.',
    description: 'New Hampshire’ın onayıyla ABD Anayasası gerekli dokuz eyalet eşiğine ulaştı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_21',
  },

  {
    id: '06-22-1941',
    day: 22,
    month: 6,
    year: 1941,
    title: 'Almanya Sovyetler Birliği’ni işgal etti.',
    description: 'Nazi Almanyası Barbarossa Harekâtı ile Sovyetler Birliği’ne saldırarak II. Dünya Savaşı’nın doğu cephesini başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_22',
  },

  {
    id: '06-23-2016',
    day: 23,
    month: 6,
    year: 2016,
    title: 'Birleşik Krallık Brexit referandumunu yaptı.',
    description: 'Birleşik Krallık’ta yapılan referandumda seçmenlerin çoğunluğu Avrupa Birliği’nden ayrılma yönünde oy kullandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_23',
  },

  {
    id: '06-24-1948',
    day: 24,
    month: 6,
    year: 1948,
    title: 'Berlin Ablukası başladı.',
    description: 'Sovyetler Birliği Batı Berlin’e kara ulaşımını kısıtladı ve Berlin Ablukası başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_24',
  },

  {
    id: '06-25-1950',
    day: 25,
    month: 6,
    year: 1950,
    title: 'Kore Savaşı başladı.',
    description: 'Kuzey Kore birliklerinin Güney Kore’ye saldırmasıyla Kore Savaşı başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_25',
  },

  {
    id: '06-26-1945',
    day: 26,
    month: 6,
    year: 1945,
    title: 'Birleşmiş Milletler Şartı imzalandı.',
    description: 'San Francisco Konferansı sonunda Birleşmiş Milletler Şartı imzalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_26',
  },

  {
    id: '06-28-1914',
    day: 28,
    month: 6,
    year: 1914,
    title: 'Arşidük Franz Ferdinand suikasta uğradı.',
    description: 'Avusturya-Macaristan veliahtı Franz Ferdinand ve eşi Saraybosna’da suikasta uğradı; olay I. Dünya Savaşı’nın patlak vermesine giden süreci hızlandırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_28',
  },

  {
    id: '06-30-1908',
    day: 30,
    month: 6,
    year: 1908,
    title: 'Tunguska olayı meydana geldi.',
    description: 'Sibirya’da büyük bir göktaşı/asteroit patlaması gerçekleşti ve geniş bir ormanlık alanı etkiledi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_30',
  },

  {
    id: '07-01-1863',
    day: 1,
    month: 7,
    year: 1863,
    title: 'Gettysburg Muharebesi başladı.',
    description: 'Amerikan İç Savaşı’nın dönüm noktalarından Gettysburg Muharebesi başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_1',
  },

  {
    id: '07-02-1962',
    day: 2,
    month: 7,
    year: 1962,
    title: 'Walmart’ın ilk mağazası açıldı.',
    description: 'Sam Walton’ın kurduğu Walmart’ın ilk mağazası Arkansas’ta açıldı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_2',
  },

  {
    id: '07-04-1776',
    day: 4,
    month: 7,
    year: 1776,
    title: 'ABD Bağımsızlık Bildirgesi kabul edildi.',
    description: 'Kıta Kongresi Bağımsızlık Bildirgesi’ni kabul ederek Amerikan kolonilerinin bağımsızlığını ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_4',
  },

  {
    id: '07-05-1687',
    day: 5,
    month: 7,
    year: 1687,
    title: 'Newton’un Principia eseri yayımlandı.',
    description: 'Isaac Newton’un Principia Mathematica adlı eseri yayımlandı ve klasik mekaniğin temelini attı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_5',
  },

  {
    id: '07-06-1957',
    day: 6,
    month: 7,
    year: 1957,
    title: 'John Lennon ve Paul McCartney tanıştı.',
    description: 'John Lennon ile Paul McCartney’nin buluşması daha sonra The Beatles’ın oluşumuna giden yolun başlangıcı oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_6',
  },

  {
    id: '07-07-2005',
    day: 7,
    month: 7,
    year: 2005,
    title: 'Londra bombalamaları gerçekleşti.',
    description: 'Londra toplu taşıma sistemine yönelik koordineli bombalı saldırılar düzenlendi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_7',
  },

  {
    id: '07-08-1956',
    day: 8,
    month: 7,
    year: 1956,
    title: 'Amerikan Uzay ve Havacılık alanında yeni dönem başladı.',
    description: 'ABD’nin erken dönem uzay programları insanlı uzay uçuşlarına hazırlık çalışmalarını hızlandırdı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_8',
  },

  {
    id: '07-09-1816',
    day: 9,
    month: 7,
    year: 1816,
    title: 'Arjantin bağımsızlığını ilan etti.',
    description: 'Tucumán Kongresi Arjantin’in İspanya’dan bağımsızlığını ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_9',
  },

  {
    id: '07-10-1962',
    day: 10,
    month: 7,
    year: 1962,
    title: 'Telstar uydusu fırlatıldı.',
    description: 'Telstar 1, ilk aktif iletişim uydularından biri olarak kıtalararası televizyon sinyallerinin iletilmesinde kullanıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_10',
  },

  {
    id: '07-11-1960',
    day: 11,
    month: 7,
    year: 1960,
    title: 'Harper Lee’nin To Kill a Mockingbird romanı yayımlandı.',
    description: 'Harper Lee’nin Pulitzer ödüllü romanı To Kill a Mockingbird yayımlandı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_11',
  },

  {
    id: '07-12-1962',
    day: 12,
    month: 7,
    year: 1962,
    title: 'Rolling Stones ilk kez sahne aldı.',
    description: 'The Rolling Stones Londra’daki Marquee Club’da ilk konserlerinden birini verdi.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_12',
  },

  {
    id: '07-13-1985',
    day: 13,
    month: 7,
    year: 1985,
    title: 'Live Aid konserleri düzenlendi.',
    description: 'Londra ve Philadelphia merkezli Live Aid konserleri dünya çapında milyonlarca kişiye ulaşarak Afrika’daki kıtlık için yardım topladı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_13',
  },

  {
    id: '07-14-1789',
    day: 14,
    month: 7,
    year: 1789,
    title: 'Bastille Baskını gerçekleşti.',
    description: 'Paris halkının Bastille hapishanesine saldırması Fransız Devrimi’nin sembolik dönüm noktalarından biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_14',
  },

  {
    id: '07-15-1099',
    day: 15,
    month: 7,
    year: 1099,
    title: 'Haçlılar Kudüs’ü ele geçirdi.',
    description: 'Birinci Haçlı Seferi sırasında Kudüs Haçlı ordularının kontrolüne geçti.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_15',
  },

  {
    id: '07-16-1969',
    day: 16,
    month: 7,
    year: 1969,
    title: 'Apollo 11 fırlatıldı.',
    description: 'Apollo 11, insanları Ay’a götürmek üzere Kennedy Uzay Merkezi’nden fırlatıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_16',
  },

  {
    id: '07-17-1918',
    day: 17,
    month: 7,
    year: 1918,
    title: 'Rus Çarlık ailesi öldürüldü.',
    description: 'Romanov ailesi Yekaterinburg’da Bolşevik muhafızlar tarafından öldürüldü.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_17',
  },

  {
    id: '07-18-1925',
    day: 18,
    month: 7,
    year: 1925,
    title: 'Hitler’in Mein Kampf eseri yayımlandı.',
    description: 'Adolf Hitler’in Mein Kampf adlı kitabının ilk cildi yayımlandı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_18',
  },

  {
    id: '07-21-1969',
    day: 21,
    month: 7,
    year: 1969,
    title: 'Apollo 11 astronotları Ay’dan ayrıldı.',
    description: 'Apollo 11 mürettebatı Ay yüzeyindeki çalışmalarını tamamlayarak Dünya’ya dönüş yolculuğuna başladı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_21',
  },

  {
    id: '07-22-1933',
    day: 22,
    month: 7,
    year: 1933,
    title: 'Wiley Post tek başına dünya çevresinde uçtu.',
    description: 'Wiley Post dünya çevresini tek başına uçakla dolaşan ilk kişi oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_22',
  },

  {
    id: '07-23-1829',
    day: 23,
    month: 7,
    year: 1829,
    title: 'William Burt daktilografik makine için patent aldı.',
    description: 'William Austin Burt, yazma işlemini mekanikleştirmeye yönelik erken bir cihazın patentini aldı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_23',
  },

  {
    id: '07-25-1978',
    day: 25,
    month: 7,
    year: 1978,
    title: 'İlk tüp bebek doğdu.',
    description: 'Louise Brown, laboratuvar ortamında döllenen embriyodan dünyaya gelen ilk bebek oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_25',
  },

  {
    id: '07-26-1953',
    day: 26,
    month: 7,
    year: 1953,
    title: 'Küba’da Moncada Kışlası saldırısı gerçekleşti.',
    description: 'Fidel Castro liderliğindeki hareket Moncada Kışlası’na saldırdı; olay Küba Devrimi’nin başlangıç noktalarından biri kabul edilir.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_26',
  },

  {
    id: '07-27-1953',
    day: 27,
    month: 7,
    year: 1953,
    title: 'Kore Ateşkes Antlaşması imzalandı.',
    description: 'Kore Savaşı’nı durduran ateşkes Panmunjom’da imzalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_27',
  },

  {
    id: '07-28-1914',
    day: 28,
    month: 7,
    year: 1914,
    title: 'I. Dünya Savaşı başladı.',
    description: 'Avusturya-Macaristan’ın Sırbistan’a savaş ilan etmesiyle I. Dünya Savaşı başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_28',
  },

  {
    id: '07-29-1981',
    day: 29,
    month: 7,
    year: 1981,
    title: 'Prens Charles ve Lady Diana evlendi.',
    description: 'Birleşik Krallık tahtının varisi Charles ile Diana Spencer’ın düğünü dünya çapında milyonlarca kişi tarafından izlendi.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_29',
  },

  {
    id: '07-30-1965',
    day: 30,
    month: 7,
    year: 1965,
    title: 'Medicare yasası imzalandı.',
    description: 'ABD’de Medicare sağlık sigortası programını oluşturan yasa Başkan Lyndon Johnson tarafından imzalandı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_30',
  },

  {
    id: '07-31-1991',
    day: 31,
    month: 7,
    year: 1991,
    title: 'START I Antlaşması imzalandı.',
    description: 'ABD ve Sovyetler Birliği stratejik nükleer silahların azaltılmasını öngören START I Antlaşması’nı imzaladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_31',
  },

  {
    id: '08-04-1789',
    day: 4,
    month: 8,
    year: 1789,
    title: 'Fransız Devrimi’nde feodal ayrıcalıklar kaldırıldı.',
    description: 'Fransız Ulusal Meclisi feodal ayrıcalıkların kaldırılmasını kabul ederek devrimin toplumsal dönüşümünü hızlandırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_4',
  },

  {
    id: '08-05-1963',
    day: 5,
    month: 8,
    year: 1963,
    title: 'Martin Luther King Jr. “I Have a Dream” konuşmasına hazırlık yaptı.',
    description: 'Washington’daki yürüyüş öncesinde medeni haklar hareketi ulusal ölçekte büyük bir destek kazandı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_5',
  },

  {
    id: '08-06-1945',
    day: 6,
    month: 8,
    year: 1945,
    title: 'Hiroşima’ya atom bombası atıldı.',
    description: 'ABD, Japonya’nın Hiroşima kentine atom bombası attı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_6',
  },

  {
    id: '08-07-1974',
    day: 7,
    month: 8,
    year: 1974,
    title: 'Fransa’da nükleer enerji programı genişledi.',
    description: 'Fransa’nın enerji politikalarında nükleer enerjinin payını artıran programlar hız kazandı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_7',
  },

  {
    id: '08-08-1963',
    day: 8,
    month: 8,
    year: 1963,
    title: 'Büyük Tren Soygunu gerçekleşti.',
    description: 'İngiltere’de Royal Mail trenine yapılan soygun ülkenin en ünlü suç vakalarından biri oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_8',
  },

  {
    id: '08-09-1945',
    day: 9,
    month: 8,
    year: 1945,
    title: 'Nagasaki’ye atom bombası atıldı.',
    description: 'ABD, Japonya’nın Nagasaki kentine atom bombası attı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_9',
  },

  {
    id: '08-10-1628',
    day: 10,
    month: 8,
    year: 1628,
    title: 'Petition of Right kabul edildi.',
    description: 'İngiliz Parlamentosu kralın keyfi vergilendirme ve tutuklama yetkilerini sınırlayan Petition of Right belgesini kabul etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_10',
  },

  {
    id: '08-11-1965',
    day: 11,
    month: 8,
    year: 1965,
    title: 'Watts Ayaklanması başladı.',
    description: 'Los Angeles’ın Watts bölgesinde günler süren toplumsal olaylar başladı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_11',
  },

  {
    id: '08-12-1981',
    day: 12,
    month: 8,
    year: 1981,
    title: 'IBM PC tanıtıldı.',
    description: 'IBM, kişisel bilgisayar pazarında büyük etki yaratacak IBM PC’yi tanıttı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_12',
  },

  {
    id: '08-13-1961',
    day: 13,
    month: 8,
    year: 1961,
    title: 'Berlin Duvarı’nın inşası başladı.',
    description: 'Doğu Almanya yönetimi Batı Berlin’e geçişleri engellemek amacıyla Berlin Duvarı’nı inşa etmeye başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_13',
  },

  {
    id: '08-14-1945',
    day: 14,
    month: 8,
    year: 1945,
    title: 'Japonya teslim olacağını açıkladı.',
    description: 'Japonya teslim olma kararını duyurdu ve II. Dünya Savaşı’nın Pasifik cephesinin sona ermesi sürecini başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_14',
  },

  {
    id: '08-15-1947',
    day: 15,
    month: 8,
    year: 1947,
    title: 'Hindistan bağımsızlığını kazandı.',
    description: 'Hindistan Britanya yönetiminden bağımsızlığını kazandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_15',
  },

  {
    id: '08-16-1977',
    day: 16,
    month: 8,
    year: 1977,
    title: 'Elvis Presley öldü.',
    description: 'Rock and roll ikonlarından Elvis Presley Memphis’te hayatını kaybetti.',
    category: 'death',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_16',
  },

  {
    id: '08-17-1960',
    day: 17,
    month: 8,
    year: 1960,
    title: 'Gabon bağımsızlığını ilan etti.',
    description: 'Gabon Fransa’dan bağımsızlığını kazandı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_17',
  },

  {
    id: '08-18-1963',
    day: 18,
    month: 8,
    year: 1963,
    title: 'James Meredith Mississippi Üniversitesi’nden mezun oldu.',
    description: 'James Meredith, üniversite entegrasyonu mücadelesinin sembol isimlerinden biri olarak mezun oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_18',
  },

  {
    id: '08-19-1960',
    day: 19,
    month: 8,
    year: 1960,
    title: 'Sputnik 5 canlıları yörüngeye taşıdı.',
    description: 'Sovyet uzay aracı Sputnik 5, Belka ve Strelka adlı köpeklerle birlikte canlıları güvenli şekilde Dünya yörüngesine gönderdi ve geri getirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_19',
  },

  {
    id: '08-20-1977',
    day: 20,
    month: 8,
    year: 1977,
    title: 'Voyager 2 fırlatıldı.',
    description: 'NASA’nın Voyager 2 uzay aracı dış gezegenleri keşfetmek üzere fırlatıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_20',
  },

  {
    id: '08-21-1959',
    day: 21,
    month: 8,
    year: 1959,
    title: 'Hawaii ABD’nin 50. eyaleti oldu.',
    description: 'Hawaii, ABD’nin 50. eyaleti olarak Birliğe katıldı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_21',
  },

  {
    id: '08-22-1963',
    day: 22,
    month: 8,
    year: 1963,
    title: 'De Gaulle suikast girişiminden kurtuldu.',
    description: 'Fransa Cumhurbaşkanı Charles de Gaulle’a yönelik saldırı girişimi başarısız oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_22',
  },

  {
    id: '08-23-1939',
    day: 23,
    month: 8,
    year: 1939,
    title: 'Molotov-Ribbentrop Paktı imzalandı.',
    description: 'Nazi Almanyası ile Sovyetler Birliği saldırmazlık paktı imzaladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_23',
  },

  {
    id: '08-24-1991',
    day: 24,
    month: 8,
    year: 1991,
    title: 'Ukrayna bağımsızlığını ilan etti.',
    description: 'Ukrayna Sovyetler Birliği’nden bağımsızlığını ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_24',
  },

  {
    id: '08-31-1997',
    day: 31,
    month: 8,
    year: 1997,
    title: 'Prenses Diana hayatını kaybetti.',
    description: 'Prenses Diana Paris’te meydana gelen trafik kazasında hayatını kaybetti.',
    category: 'death',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_31',
  },

  {
    id: '09-01-1939',
    day: 1,
    month: 9,
    year: 1939,
    title: 'II. Dünya Savaşı başladı.',
    description: 'Almanya’nın Polonya’yı işgaliyle II. Dünya Savaşı Avrupa’da başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_1',
  },

  {
    id: '09-02-1945',
    day: 2,
    month: 9,
    year: 1945,
    title: 'Japonya teslim belgesini imzaladı.',
    description: 'Japonya’nın teslim belgesini imzalamasıyla II. Dünya Savaşı resmen sona erdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_2',
  },

  {
    id: '09-03-1783',
    day: 3,
    month: 9,
    year: 1783,
    title: 'Paris Antlaşması imzalandı.',
    description: 'Amerikan Devrimi’ni sona erdiren Paris Antlaşması imzalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_3',
  },

  {
    id: '09-04-1888',
    day: 4,
    month: 9,
    year: 1888,
    title: 'George Eastman Kodak fotoğraf makinesini tanıttı.',
    description: 'George Eastman’ın Kodak sistemi fotoğrafçılığı geniş kitlelere ulaştıran teknolojilerden biri oldu.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_4',
  },

  {
    id: '09-05-1972',
    day: 5,
    month: 9,
    year: 1972,
    title: 'Münih Olimpiyatları’nda terör saldırısı gerçekleşti.',
    description: 'Filistinli Kara Eylül örgütü sporculara yönelik saldırı düzenledi.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_5',
  },

  {
    id: '09-06-1991',
    day: 6,
    month: 9,
    year: 1991,
    title: 'Sovyetler Birliği Baltık devletlerinin bağımsızlığını tanıdı.',
    description: 'SSCB, Estonya, Letonya ve Litvanya’nın bağımsızlığını tanıdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_6',
  },

  {
    id: '09-07-1822',
    day: 7,
    month: 9,
    year: 1822,
    title: 'Brezilya bağımsızlığını ilan etti.',
    description: 'Brezilya, Portekiz’den bağımsızlığını ilan etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_7',
  },

  {
    id: '09-08-1941',
    day: 8,
    month: 9,
    year: 1941,
    title: 'Leningrad Kuşatması başladı.',
    description: 'Nazi Almanyası’nın Sovyetler Birliği’ne saldırısı sırasında Leningrad Kuşatması başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_8',
  },

  {
    id: '09-09-1776',
    day: 9,
    month: 9,
    year: 1776,
    title: 'Amerika Birleşik Devletleri adı kullanılmaya başlandı.',
    description: 'Kıta Kongresi, ülkenin resmi adı olarak “United States of America” ifadesini kullandı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_9',
  },

  {
    id: '09-10-2008',
    day: 10,
    month: 9,
    year: 2008,
    title: 'Büyük Hadron Çarpıştırıcısı ilk kez çalıştırıldı.',
    description: 'CERN’de Büyük Hadron Çarpıştırıcısı ilk kez proton ışınlarını dolaştırdı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_10',
  },

  {
    id: '09-11-2001',
    day: 11,
    month: 9,
    year: 2001,
    title: '11 Eylül saldırıları gerçekleşti.',
    description: 'El Kaide bağlantılı teröristler ABD’de dört yolcu uçağını kaçırdı; saldırılar New York ve Washington’da binlerce insanın ölümüne yol açtı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_11',
  },

  {
    id: '09-12-1959',
    day: 12,
    month: 9,
    year: 1959,
    title: 'Luna 2 Ay’a ulaşan ilk insan yapımı araç oldu.',
    description: 'Sovyet Luna 2 uzay aracı Ay yüzeyine ulaşarak başka bir gökcismine ulaşan ilk insan yapımı araç oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_12',
  },

  {
    id: '09-13-1993',
    day: 13,
    month: 9,
    year: 1993,
    title: 'Oslo Anlaşmaları imzalandı.',
    description: 'İsrail ve Filistin Kurtuluş Örgütü temsilcileri Oslo süreci kapsamında tarihi anlaşmaları imzaladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_13',
  },

  {
    id: '09-14-1814',
    day: 14,
    month: 9,
    year: 1814,
    title: 'ABD milli marşının sözlerine ilham veren olay yaşandı.',
    description: 'Fort McHenry bombardımanı sırasında Francis Scott Key, daha sonra ABD milli marşına dönüşecek şiiri yazdı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_14',
  },

  {
    id: '09-15-1916',
    day: 15,
    month: 9,
    year: 1916,
    title: 'Tanklar savaş alanında ilk kez kullanıldı.',
    description: 'İngilizler Somme Muharebesi’nde tankları savaş alanında ilk kez kullandı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_15',
  },

  {
    id: '09-16-1908',
    day: 16,
    month: 9,
    year: 1908,
    title: 'General Motors kuruldu.',
    description: 'General Motors Company otomotiv endüstrisinin en büyük şirketlerinden biri olacak yapının temelini oluşturdu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_16',
  },

  {
    id: '09-17-1787',
    day: 17,
    month: 9,
    year: 1787,
    title: 'ABD Anayasası imzalandı.',
    description: 'Philadelphia’daki Anayasa Konvansiyonu ABD Anayasası’nı imzaladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_17',
  },

  {
    id: '09-18-1851',
    day: 18,
    month: 9,
    year: 1851,
    title: 'The New York Times yayımlanmaya başladı.',
    description: 'New-York Daily Times’ın ilk sayısı yayımlandı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_18',
  },

  {
    id: '09-19-1982',
    day: 19,
    month: 9,
    year: 1982,
    title: 'Scott Fahlman ilk internet ifadelerinden birini önerdi.',
    description: 'Carnegie Mellon’da Scott Fahlman, çevrimiçi iletişimde :-) ifadesini kullanmayı önerdi.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_19',
  },

  {
    id: '09-20-1973',
    day: 20,
    month: 9,
    year: 1973,
    title: 'Billie Jean King Bobby Riggs’i yendi.',
    description: 'Billie Jean King, “Battle of the Sexes” olarak anılan tenis maçında Bobby Riggs’i mağlup etti.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_20',
  },

  {
    id: '09-21-1780',
    day: 21,
    month: 9,
    year: 1780,
    title: 'Benedict Arnold’un ihaneti ortaya çıktı.',
    description: 'Amerikan Devrimi sırasında Benedict Arnold’un İngilizlerle gizli işbirliği yaptığı ortaya çıktı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_21',
  },

  {
    id: '09-22-1862',
    day: 22,
    month: 9,
    year: 1862,
    title: 'Özgürlük Bildirisi ilan edildi.',
    description: 'Abraham Lincoln, köleleştirilmiş insanların özgürleştirilmesine yönelik Emancipation Proclamation’ın ön duyurusunu yaptı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_22',
  },

  {
    id: '09-23-1846',
    day: 23,
    month: 9,
    year: 1846,
    title: 'Neptün keşfedildi.',
    description: 'Neptün gezegeni matematiksel tahminler doğrultusunda gözlemlendi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_23',
  },

  {
    id: '09-24-1789',
    day: 24,
    month: 9,
    year: 1789,
    title: 'ABD Yüksek Mahkemesi’nin temelleri atıldı.',
    description: 'Judiciary Act ile ABD federal yargı sisteminin yapısı oluşturuldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_24',
  },

  {
    id: '09-25-1972',
    day: 25,
    month: 9,
    year: 1972,
    title: 'Norveç Avrupa Topluluğu üyeliğini reddetti.',
    description: 'Norveç halkı yapılan referandumda Avrupa Ekonomik Topluluğu üyeliğine hayır dedi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_25',
  },

  {
    id: '09-26-1960',
    day: 26,
    month: 9,
    year: 1960,
    title: 'ABD’de ilk başkanlık televizyon tartışması yapıldı.',
    description: 'John F. Kennedy ve Richard Nixon ilk canlı televizyon başkanlık tartışmasında karşı karşıya geldi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_26',
  },

  {
    id: '09-27-1825',
    day: 27,
    month: 9,
    year: 1825,
    title: 'Dünyanın ilk kamu demiryolu yolcu seferlerinden biri başladı.',
    description: 'Stockton-Darlington Demiryolu buharlı lokomotiflerle yolcu ve yük taşımacılığının önünü açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_27',
  },

  {
    id: '09-28-1928',
    day: 28,
    month: 9,
    year: 1928,
    title: 'Penisilin keşfedildi.',
    description: 'Alexander Fleming laboratuvarında bakterileri öldüren küf etkisini gözlemleyerek penisilinin keşfine yol açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_28',
  },

  {
    id: '09-29-1954',
    day: 29,
    month: 9,
    year: 1954,
    title: 'Halk Cumhuriyeti Çin’deki ilk anayasal düzenlemelerini güçlendirdi.',
    description: 'Çin Halk Cumhuriyeti’nin erken dönem siyasi kurumları yeni anayasal yapı etrafında şekillendi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_29',
  },

  {
    id: '09-30-1960',
    day: 30,
    month: 9,
    year: 1960,
    title: 'Nijerya bağımsız oldu.',
    description: 'Nijerya Birleşik Krallık’tan bağımsızlığını kazandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/September_30',
  },

  {
    id: '10-02-1950',
    day: 2,
    month: 10,
    year: 1950,
    title: 'Peanuts çizgi romanı yayımlanmaya başladı.',
    description: 'Charles M. Schulz’un Peanuts çizgi romanı ilk kez gazetelerde yayımlandı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_2',
  },

  {
    id: '10-03-1990',
    day: 3,
    month: 10,
    year: 1990,
    title: 'Almanya yeniden birleşti.',
    description: 'Doğu ve Batı Almanya’nın birleşmesi resmen gerçekleşti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_3',
  },

  {
    id: '10-04-1957',
    day: 4,
    month: 10,
    year: 1957,
    title: 'Sputnik 1 fırlatıldı.',
    description: 'Sovyetler Birliği Sputnik 1’i fırlatarak uzay çağını başlattı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_4',
  },

  {
    id: '10-05-1962',
    day: 5,
    month: 10,
    year: 1962,
    title: 'The Beatles ilk kayıtlarını gerçekleştirdi.',
    description: 'The Beatles’ın müzik kariyerindeki erken kayıt dönemleri grubun küresel başarıya giden yolunu açtı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_5',
  },

  {
    id: '10-06-1927',
    day: 6,
    month: 10,
    year: 1927,
    title: 'İlk sesli film döneminin önemli yapımlarından The Jazz Singer gösterildi.',
    description: 'Sesli sinemanın yükselişini simgeleyen The Jazz Singer dönemin film teknolojisini değiştirdi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_6',
  },

  {
    id: '10-07-1959',
    day: 7,
    month: 10,
    year: 1959,
    title: 'Luna 3 Ay’ın uzak yüzünü görüntüledi.',
    description: 'Sovyet Luna 3, Ay’ın Dünya’dan görünmeyen yüzünün ilk görüntülerini gönderdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_7',
  },

  {
    id: '10-08-1956',
    day: 8,
    month: 10,
    year: 1956,
    title: 'Donald Trump doğdu.',
    description: 'Amerikalı iş insanı ve siyasetçi Donald Trump doğdu.',
    category: 'birth',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_8',
  },

  {
    id: '10-09-1967',
    day: 9,
    month: 10,
    year: 1967,
    title: 'Che Guevara yakalandı.',
    description: 'Bolivya’daki gerilla mücadelesi sırasında Che Guevara yakalandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_9',
  },

  {
    id: '10-10-1985',
    day: 10,
    month: 10,
    year: 1985,
    title: 'Amiral Grace Hopper öldü.',
    description: 'Bilgisayar bilimci ve öncü programcı Grace Hopper hayatını kaybetti.',
    category: 'death',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_10',
  },

  {
    id: '10-11-1984',
    day: 11,
    month: 10,
    year: 1984,
    title: 'Brighton otel saldırısı gerçekleşti.',
    description: 'IRA, İngiltere’de Muhafazakâr Parti konferansı sırasında Brighton’daki Grand Hotel’e bombalı saldırı düzenledi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_11',
  },

  {
    id: '10-12-1964',
    day: 12,
    month: 10,
    year: 1964,
    title: 'Sovyetler Birliği ilk çok kişilik uzay aracını fırlattı.',
    description: 'Voskhod 1, üç kişilik mürettebatıyla uzay görevlerinde yeni bir dönemi başlattı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_12',
  },

  {
    id: '10-14-1947',
    day: 14,
    month: 10,
    year: 1947,
    title: 'Chuck Yeager ses duvarını aştı.',
    description: 'Bell X-1 ile uçan Chuck Yeager, kontrollü yatay uçuşta ses hızını aşan ilk pilot oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_14',
  },

  {
    id: '10-15-1951',
    day: 15,
    month: 10,
    year: 1951,
    title: 'I Love Lucy televizyon tarihine damga vurdu.',
    description: 'I Love Lucy dizisinin ilk sezonları televizyon komedisinin biçimini değiştirdi.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_15',
  },

  {
    id: '10-16-1923',
    day: 16,
    month: 10,
    year: 1923,
    title: 'Walt Disney Company’nin öncülü kuruldu.',
    description: 'Disney Brothers Cartoon Studio, Walt ve Roy Disney tarafından kuruldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_16',
  },

  {
    id: '10-17-1931',
    day: 17,
    month: 10,
    year: 1931,
    title: 'Al Capone vergi kaçakçılığından suçlu bulundu.',
    description: 'Chicago gangsteri Al Capone vergi kaçakçılığı suçlamalarıyla mahkûm edildi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_17',
  },

  {
    id: '10-18-1922',
    day: 18,
    month: 10,
    year: 1922,
    title: 'BBC kuruldu.',
    description: 'British Broadcasting Company kurularak daha sonra BBC’ye dönüşecek yayıncılık kurumunun temeli atıldı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_18',
  },

  {
    id: '10-19-1987',
    day: 19,
    month: 10,
    year: 1987,
    title: 'Kara Pazartesi yaşandı.',
    description: 'Dünya borsalarında büyük düşüş yaşandı; Dow Jones bir günde yüzde 22’den fazla değer kaybetti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_19',
  },

  {
    id: '10-20-1968',
    day: 20,
    month: 10,
    year: 1968,
    title: 'Apollo 7 Dünya’ya döndü.',
    description: 'Apollo 7 insanlı Apollo programının ilk başarılı insanlı görevini tamamladı.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_20',
  },

  {
    id: '10-21-1805',
    day: 21,
    month: 10,
    year: 1805,
    title: 'Trafalgar Muharebesi gerçekleşti.',
    description: 'Britanya Kraliyet Donanması Trafalgar Muharebesi’nde Fransız ve İspanyol donanmalarını yendi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_21',
  },

  {
    id: '10-22-1962',
    day: 22,
    month: 10,
    year: 1962,
    title: 'Küba Füze Krizi kamuoyuna açıklandı.',
    description: 'John F. Kennedy, Sovyet füzelerinin Küba’da konuşlandırıldığını açıklayarak nükleer kriz dönemini başlattı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_22',
  },

  {
    id: '10-23-1940',
    day: 23,
    month: 10,
    year: 1940,
    title: 'Pelé doğdu.',
    description: 'Brezilyalı futbol efsanesi Pelé doğdu.',
    category: 'birth',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_23',
  },

  {
    id: '10-24-1945',
    day: 24,
    month: 10,
    year: 1945,
    title: 'Birleşmiş Milletler resmen kuruldu.',
    description: 'BM Şartı yürürlüğe girdi ve Birleşmiş Milletler resmen faaliyete başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_24',
  },

  {
    id: '10-25-1929',
    day: 25,
    month: 10,
    year: 1929,
    title: 'Büyük Buhran’ın borsa krizi derinleşti.',
    description: 'Wall Street’teki büyük düşüşler küresel ekonomik krizin derinleşmesine yol açtı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_25',
  },

  {
    id: '10-26-1881',
    day: 26,
    month: 10,
    year: 1881,
    title: 'O.K. Corral çatışması gerçekleşti.',
    description: 'Arizona’daki O.K. Corral silahlı çatışması Amerikan Vahşi Batı tarihinin en ünlü olaylarından biri oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_26',
  },

  {
    id: '10-27-1904',
    day: 27,
    month: 10,
    year: 1904,
    title: 'New York metrosu açıldı.',
    description: 'New York City Subway’in ilk hattı hizmete girdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_27',
  },

  {
    id: '10-28-1962',
    day: 28,
    month: 10,
    year: 1962,
    title: 'Küba Füze Krizi sona erdi.',
    description: 'Sovyetler Birliği’nin Küba’daki füzeleri çekmeyi kabul etmesiyle kriz yatıştı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_28',
  },

  {
    id: '10-30-1938',
    day: 30,
    month: 10,
    year: 1938,
    title: 'War of the Worlds radyo yayını yapıldı.',
    description: 'Orson Welles’in radyo uyarlaması ABD’de geniş yankı uyandırdı ve kitle iletişim araçlarının gücünü gösteren ünlü örneklerden biri oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_30',
  },

  {
    id: '10-31-1517',
    day: 31,
    month: 10,
    year: 1517,
    title: 'Martin Luther 95 Tez’i yayımladı.',
    description: 'Martin Luther’in Wittenberg’deki 95 Tez’i Protestan Reformu’nun sembolik başlangıçlarından biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/October_31',
  },

  {
    id: '11-01-1952',
    day: 1,
    month: 11,
    year: 1952,
    title: 'İlk hidrojen bombası denemesi yapıldı.',
    description: 'ABD, Ivy Mike kod adlı ilk başarılı termonükleer silah denemesini gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_1',
  },

  {
    id: '11-03-1957',
    day: 3,
    month: 11,
    year: 1957,
    title: 'Sputnik 2 Laika’yı uzaya taşıdı.',
    description: 'Sovyetler Birliği Sputnik 2 ile Laika adlı köpeği Dünya yörüngesine gönderdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_3',
  },

  {
    id: '11-04-1922',
    day: 4,
    month: 11,
    year: 1922,
    title: 'Tutankhamun’un mezarı bulundu.',
    description: 'Howard Carter, Mısır’daki Krallar Vadisi’nde Tutankhamun’un mezarının girişini keşfetti.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_4',
  },

  {
    id: '11-05-1605',
    day: 5,
    month: 11,
    year: 1605,
    title: 'Barut Komplosu başarısız oldu.',
    description: 'Guy Fawkes ve komplocuların İngiliz Parlamentosu’nu havaya uçurma planı ortaya çıkarıldı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_5',
  },

  {
    id: '11-06-1860',
    day: 6,
    month: 11,
    year: 1860,
    title: 'Abraham Lincoln ABD başkanı seçildi.',
    description: 'Abraham Lincoln ABD başkanlık seçimlerini kazanarak ülkenin 16. başkanı oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_6',
  },

  {
    id: '11-07-1917',
    day: 7,
    month: 11,
    year: 1917,
    title: 'Ekim Devrimi Petrograd’da gerçekleşti.',
    description: 'Bolşevikler Petrograd’da iktidarı ele geçirerek Rus Devrimi’nin ikinci büyük aşamasını gerçekleştirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_7',
  },

  {
    id: '11-08-1895',
    day: 8,
    month: 11,
    year: 1895,
    title: 'Wilhelm Röntgen X ışınlarını duyurdu.',
    description: 'Wilhelm Conrad Röntgen’in X ışınları üzerine çalışmaları tıpta görüntüleme devriminin temelini oluşturdu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_8',
  },

  {
    id: '11-09-1989',
    day: 9,
    month: 11,
    year: 1989,
    title: 'Berlin Duvarı geçişlere açıldı.',
    description: 'Doğu Almanya’nın geçiş kurallarını gevşetmesiyle Berlin Duvarı fiilen açıldı ve Almanya’nın yeniden birleşmesine giden yol hızlandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_9',
  },

  {
    id: '11-10-1989',
    day: 10,
    month: 11,
    year: 1989,
    title: 'Dünyanın en büyük duvarlarından birinin yıkım süreci hızlandı.',
    description: 'Berlin Duvarı’nın parçalanması Soğuk Savaş’ın sona ermesinin sembolü haline geldi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_10',
  },

  {
    id: '11-11-1918',
    day: 11,
    month: 11,
    year: 1918,
    title: 'I. Dünya Savaşı sona erdi.',
    description: 'Müttefikler ile Almanya arasındaki ateşkes yürürlüğe girerek I. Dünya Savaşı’nı sona erdirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_11',
  },

  {
    id: '11-12-1933',
    day: 12,
    month: 11,
    year: 1933,
    title: 'Hugh Gray Loch Ness canavarının ilk modern fotoğraflarından birini çekti.',
    description: 'Loch Ness canavarı efsanesinin modern dönemdeki en bilinen görsel iddialarından biri ortaya çıktı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_12',
  },

  {
    id: '11-13-1985',
    day: 13,
    month: 11,
    year: 1985,
    title: 'Kolombiya’daki Nevado del Ruiz patladı.',
    description: 'Volkanik patlama ve laharlar Armero kentinde büyük can kaybına yol açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_13',
  },

  {
    id: '11-14-1969',
    day: 14,
    month: 11,
    year: 1969,
    title: 'Apollo 12 fırlatıldı.',
    description: 'Apollo 12 Ay’a ikinci insanlı inişi gerçekleştirmek üzere fırlatıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_14',
  },

  {
    id: '11-15-1988',
    day: 15,
    month: 11,
    year: 1988,
    title: 'Filistin Devleti bağımsızlığını ilan etti.',
    description: 'Filistin Ulusal Konseyi Cezayir’de bağımsızlık ilanını duyurdu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_15',
  },

  {
    id: '11-16-1945',
    day: 16,
    month: 11,
    year: 1945,
    title: 'UNESCO kuruldu.',
    description: 'Birleşmiş Milletler Eğitim, Bilim ve Kültür Örgütü UNESCO’nun anayasası imzalandı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_16',
  },

  {
    id: '11-17-1970',
    day: 17,
    month: 11,
    year: 1970,
    title: 'Luna 17 Ay’a indi.',
    description: 'Sovyet Luna 17 görevi Lunokhod 1 gezginini Ay yüzeyine ulaştırdı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_17',
  },

  {
    id: '11-18-1928',
    day: 18,
    month: 11,
    year: 1928,
    title: 'Mickey Mouse ilk kez sesli olarak gösterildi.',
    description: 'Steamboat Willie’nin gösterimi Mickey Mouse’un sinema tarihindeki büyük çıkışını başlattı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_18',
  },

  {
    id: '11-19-1863',
    day: 19,
    month: 11,
    year: 1863,
    title: 'Gettysburg Address yapıldı.',
    description: 'Abraham Lincoln Gettysburg’da ünlü konuşmasını yaptı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_19',
  },

  {
    id: '11-20-1947',
    day: 20,
    month: 11,
    year: 1947,
    title: 'Prenses Elizabeth ve Philip evlendi.',
    description: 'Geleceğin Kraliçesi II. Elizabeth ile Philip Mountbatten evlendi.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_20',
  },

  {
    id: '11-21-1783',
    day: 21,
    month: 11,
    year: 1783,
    title: 'İlk insanlı balon uçuşlarından biri gerçekleşti.',
    description: 'Montgolfier kardeşlerin sıcak hava balonu deneyleri insanlı uçuş çağının başlangıcını simgeledi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_21',
  },

  {
    id: '11-22-1963',
    day: 22,
    month: 11,
    year: 1963,
    title: 'John F. Kennedy öldürüldü.',
    description: 'ABD Başkanı John F. Kennedy Dallas’ta suikasta uğradı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_22',
  },

  {
    id: '11-23-1963',
    day: 23,
    month: 11,
    year: 1963,
    title: 'Doctor Who ilk kez yayımlandı.',
    description: 'BBC’nin bilimkurgu dizisi Doctor Who ilk bölümünü yayımladı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_23',
  },

  {
    id: '11-24-1859',
    day: 24,
    month: 11,
    year: 1859,
    title: 'Charles Darwin’in Türlerin Kökeni yayımlandı.',
    description: 'Darwin’in doğal seçilim yoluyla evrim teorisini açıklayan kitabı yayımlandı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_24',
  },

  {
    id: '11-25-1960',
    day: 25,
    month: 11,
    year: 1960,
    title: 'Kadınlara yönelik uluslararası şiddetle mücadele hareketlerinin temelleri güçlendi.',
    description: 'Dominik Cumhuriyeti’ndeki Mirabal kardeşlerin öldürülmesi daha sonra 25 Kasım’ın kadına yönelik şiddete karşı uluslararası gün olarak anılmasına zemin hazırladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_25',
  },

  {
    id: '11-26-1922',
    day: 26,
    month: 11,
    year: 1922,
    title: 'Tutankhamun’un mezar odası açıldı.',
    description: 'Howard Carter ve ekibi Tutankhamun’un mezar odasına girerek arkeoloji tarihinin en büyük keşiflerinden birini gerçekleştirdi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_26',
  },

  {
    id: '11-27-1895',
    day: 27,
    month: 11,
    year: 1895,
    title: 'Alfred Nobel vasiyetini imzaladı.',
    description: 'Alfred Nobel’in vasiyeti Nobel Ödülleri’nin kurulmasına temel oluşturdu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_27',
  },

  {
    id: '11-28-1964',
    day: 28,
    month: 11,
    year: 1964,
    title: 'Mariner 4 Mars’a doğru fırlatıldı.',
    description: 'NASA’nın Mariner 4 uzay aracı Mars’ı incelemek üzere fırlatıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_28',
  },

  {
    id: '11-29-1947',
    day: 29,
    month: 11,
    year: 1947,
    title: 'Birleşmiş Milletler Filistin için bölünme planını kabul etti.',
    description: 'BM Genel Kurulu Filistin topraklarının Arap ve Yahudi devletleri arasında bölünmesini öngören planı kabul etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_29',
  },

  {
    id: '11-30-1982',
    day: 30,
    month: 11,
    year: 1982,
    title: 'Michael Jackson’ın Thriller albümü yayımlandı.',
    description: 'Thriller, pop müzik tarihinin en etkili ve en çok satan albümlerinden biri olarak yayımlandı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/November_30',
  },

  {
    id: '12-01-1955',
    day: 1,
    month: 12,
    year: 1955,
    title: 'Rosa Parks tutuklandı.',
    description: 'Rosa Parks, Montgomery’de otobüste yerini değiştirmeyi reddettiği için tutuklandı; olay Sivil Haklar Hareketi’nin önemli dönüm noktalarından biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_1',
  },

  {
    id: '12-02-1942',
    day: 2,
    month: 12,
    year: 1942,
    title: 'İlk kontrollü nükleer zincirleme reaksiyon gerçekleştirildi.',
    description: 'Enrico Fermi ve ekibi Chicago Pile-1 ile kontrollü nükleer zincirleme reaksiyonunu gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_2',
  },

  {
    id: '12-03-1967',
    day: 3,
    month: 12,
    year: 1967,
    title: 'Christiaan Barnard ilk kalp naklini gerçekleştirdi.',
    description: 'Güney Afrikalı cerrah Christiaan Barnard tarihin ilk başarılı insan kalp naklini gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_3',
  },

  {
    id: '12-04-1952',
    day: 4,
    month: 12,
    year: 1952,
    title: 'Great Smog Londra’yı etkiledi.',
    description: 'Londra’da günler süren yoğun hava kirliliği binlerce kişinin ölümüne yol açtı ve çevre mevzuatında değişiklikleri tetikledi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_4',
  },

  {
    id: '12-05-1933',
    day: 5,
    month: 12,
    year: 1933,
    title: 'Prohibition ABD’de sona erdi.',
    description: 'ABD’de alkollü içeceklerin üretim ve satışını yasaklayan federal yasaklama dönemi sona erdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_5',
  },

  {
    id: '12-06-1921',
    day: 6,
    month: 12,
    year: 1921,
    title: 'İrlanda-İngiltere antlaşması imzalandı.',
    description: 'İrlanda Bağımsızlık Savaşı’nı sona erdiren antlaşma imzalandı ve İrlanda Özgür Devleti’nin kuruluş süreci başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_6',
  },

  {
    id: '12-07-1941',
    day: 7,
    month: 12,
    year: 1941,
    title: 'Pearl Harbor saldırısı gerçekleşti.',
    description: 'Japonya’nın Pearl Harbor’daki ABD deniz üssüne saldırısı ABD’nin II. Dünya Savaşı’na girmesine yol açtı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_7',
  },

  {
    id: '12-08-1980',
    day: 8,
    month: 12,
    year: 1980,
    title: 'John Lennon öldürüldü.',
    description: 'The Beatles üyesi John Lennon New York’ta suikasta uğradı.',
    category: 'death',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_8',
  },

  {
    id: '12-09-1965',
    day: 9,
    month: 12,
    year: 1965,
    title: 'A Charlie Brown Christmas ilk kez yayımlandı.',
    description: 'Peanuts karakterlerinin yer aldığı özel televizyon programı Noel yayınları arasında klasikleşti.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_9',
  },

  {
    id: '12-11-1946',
    day: 11,
    month: 12,
    year: 1946,
    title: 'UNICEF kuruldu.',
    description: 'Birleşmiş Milletler Çocuklara Yardım Fonu UNICEF savaş sonrası çocuklara yardım amacıyla kuruldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_11',
  },

  {
    id: '12-12-1961',
    day: 12,
    month: 12,
    year: 1961,
    title: 'Dünya’nın ilk iletişim uydularından OSCAR 1 fırlatıldı.',
    description: 'Amatör telsiz topluluğunun geliştirdiği OSCAR 1, uzaya gönderilen ilk amatör radyo uydusu oldu.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_12',
  },

  {
    id: '12-13-1642',
    day: 13,
    month: 12,
    year: 1642,
    title: 'Abel Tasman Yeni Zelanda’ya ulaştı.',
    description: 'Hollandalı kâşif Abel Tasman Yeni Zelanda kıyılarını Avrupa adına kayda geçiren ilk denizcilerden biri oldu.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_13',
  },

  {
    id: '12-14-1962',
    day: 14,
    month: 12,
    year: 1962,
    title: 'Mariner 2 Venüs’ün ilk başarılı yakın geçişini gerçekleştirdi.',
    description: 'NASA’nın Mariner 2 uzay aracı Venüs’ün yanından geçerek başka bir gezegenin başarılı ilk yakın geçişini gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_14',
  },

  {
    id: '12-15-1791',
    day: 15,
    month: 12,
    year: 1791,
    title: 'ABD Haklar Bildirgesi yürürlüğe girdi.',
    description: 'ABD Anayasası’nın ilk on değişikliği Haklar Bildirgesi olarak yürürlüğe girdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_15',
  },

  {
    id: '12-16-1773',
    day: 16,
    month: 12,
    year: 1773,
    title: 'Boston Çay Partisi gerçekleşti.',
    description: 'Amerikan kolonistleri Boston Limanı’nda İngiliz çayını denize dökerek vergilendirme politikasını protesto etti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_16',
  },

  {
    id: '12-17-1903',
    day: 17,
    month: 12,
    year: 1903,
    title: 'Wright kardeşler ilk motorlu uçuşu gerçekleştirdi.',
    description: 'Orville ve Wilbur Wright, Kitty Hawk’ta kontrollü motorlu uçuşu başarıyla gerçekleştirdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_17',
  },

  {
    id: '12-18-1865',
    day: 18,
    month: 12,
    year: 1865,
    title: 'ABD’de köleliği kaldıran 13. Değişiklik onaylandı.',
    description: 'ABD Anayasası’nın 13. Değişikliği köleliği kaldırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_18',
  },

  {
    id: '12-19-1848',
    day: 19,
    month: 12,
    year: 1848,
    title: 'Emily Brontë doğdu.',
    description: 'İngiliz romancı ve şair Emily Brontë doğdu.',
    category: 'birth',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_19',
  },

  {
    id: '12-20-1803',
    day: 20,
    month: 12,
    year: 1803,
    title: 'Louisiana Satın Alımı tamamlandı.',
    description: 'ABD, Fransa’dan Louisiana topraklarını devralarak ülke topraklarını büyük ölçüde genişletti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_20',
  },

  {
    id: '12-21-1620',
    day: 21,
    month: 12,
    year: 1620,
    title: 'Mayflower Plymouth’a ulaştı.',
    description: 'Mayflower gemisi New England’daki Plymouth bölgesine ulaştı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_21',
  },

  {
    id: '12-22-1989',
    day: 22,
    month: 12,
    year: 1989,
    title: 'Romanya’da Çavuşesku rejimi devrildi.',
    description: 'Romanya’daki devrim sırasında Nicolae Ceaușescu iktidardan uzaklaştırıldı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_22',
  },

  {
    id: '12-23-1947',
    day: 23,
    month: 12,
    year: 1947,
    title: 'Transistör tanıtıldı.',
    description: 'Bell Labs’ta geliştirilen transistör elektronik teknolojisinin temel yapı taşlarından biri oldu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_23',
  },

  {
    id: '12-24-1818',
    day: 24,
    month: 12,
    year: 1818,
    title: 'Silent Night ilk kez söylendi.',
    description: 'Avusturya’da “Stille Nacht” ilahisi ilk kez seslendirildi ve daha sonra dünyaca bilinen Noel şarkısına dönüştü.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_24',
  },

  {
    id: '12-25-1991',
    day: 25,
    month: 12,
    year: 1991,
    title: 'Sovyetler Birliği’nin sonu kesinleşti.',
    description: 'Mihail Gorbaçov’un istifası ve Sovyet bayrağının indirilmesiyle SSCB’nin sona erme süreci tamamlandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_25',
  },

  {
    id: '12-26-2004',
    day: 26,
    month: 12,
    year: 2004,
    title: 'Hint Okyanusu tsunamisi gerçekleşti.',
    description: 'Sumatra açıklarında meydana gelen büyük deprem Hint Okyanusu boyunca yıkıcı bir tsunami oluşturdu.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_26',
  },

  {
    id: '12-27-1932',
    day: 27,
    month: 12,
    year: 1932,
    title: 'Radio City Music Hall açıldı.',
    description: 'New York’taki Radio City Music Hall kapılarını açtı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_27',
  },

  {
    id: '12-28-1895',
    day: 28,
    month: 12,
    year: 1895,
    title: 'Lumière kardeşler ilk halka açık sinema gösterimini gerçekleştirdi.',
    description: 'Paris’te Lumière kardeşlerin düzenlediği gösterim sinema tarihinin başlangıç noktalarından biri kabul edilir.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_28',
  },

  {
    id: '12-29-1170',
    day: 29,
    month: 12,
    year: 1170,
    title: 'Thomas Becket öldürüldü.',
    description: 'Canterbury Başpiskoposu Thomas Becket katedralde öldürüldü.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_29',
  },

  {
    id: '12-30-1922',
    day: 30,
    month: 12,
    year: 1922,
    title: 'Sovyetler Birliği kuruldu.',
    description: 'Sovyet Sosyalist Cumhuriyetler Birliği resmen kuruldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/December_30',
  },

  {
    id: '02-29-1940',
    day: 29,
    month: 2,
    year: 1940,
    title: 'Hattie McDaniel Oscar kazanan ilk Afro-Amerikalı oldu.',
    description: 'Hattie McDaniel, Gone with the Wind filmindeki rolüyle Akademi Ödülü kazanan ilk Afro-Amerikalı oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/February_29',
  },
  {
    id: '03-16-1926',
    day: 16,
    month: 3,
    year: 1926,
    title: 'Robert Goddard ilk sıvı yakıtlı roketini fırlattı.',
    description: 'Robert H. Goddard, Massachusetts’te sıvı yakıt kullanan ilk roketini başarıyla fırlattı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_16',
  },
  {
    id: '03-24-1989',
    day: 24,
    month: 3,
    year: 1989,
    title: 'Exxon Valdez petrol tankeri karaya oturdu.',
    description: 'Exxon Valdez’in Alaska’da karaya oturması büyük bir petrol sızıntısına yol açtı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/March_24',
  },
  {
    id: '04-05-1614',
    day: 5,
    month: 4,
    year: 1614,
    title: 'Pocahontas ile John Rolfe evlendi.',
    description: 'Pocahontas ile İngiliz yerleşimci John Rolfe Virginia’da evlendi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_5',
  },
  {
    id: '04-08-1820',
    day: 8,
    month: 4,
    year: 1820,
    title: 'Venüs de Milo heykeli keşfedildi.',
    description: 'Antik Yunan heykeli Venüs de Milo, Milos Adası’nda bulundu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_8',
  },
  {
    id: '04-10-1912',
    day: 10,
    month: 4,
    year: 1912,
    title: 'Titanic Southampton’dan yola çıktı.',
    description: 'RMS Titanic ilk ve son yolculuğuna Southampton’dan başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_10',
  },
  {
    id: '04-13-1742',
    day: 13,
    month: 4,
    year: 1742,
    title: 'Handel’in Messiah eseri ilk kez Dublin’de seslendirildi.',
    description: 'George Frideric Handel’in Messiah oratoryosu Dublin’de ilk kez sahnelendi.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_13',
  },
  {
    id: '04-16-1943',
    day: 16,
    month: 4,
    year: 1943,
    title: 'LSD’nin psikoaktif etkileri keşfedildi.',
    description: 'Albert Hofmann, LSD’nin güçlü psikoaktif etkilerini fark etti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_16',
  },
  {
    id: '04-17-1961',
    day: 17,
    month: 4,
    year: 1961,
    title: 'Domuzlar Körfezi Çıkarması başladı.',
    description: 'ABD destekli Kübalı sürgünlerin Fidel Castro hükümetini devirmeye yönelik çıkarması başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_17',
  },
  {
    id: '04-20-1999',
    day: 20,
    month: 4,
    year: 1999,
    title: 'Columbine Lisesi saldırısı gerçekleşti.',
    description: 'Colorado’daki Columbine Lisesi’nde silahlı saldırı meydana geldi ve ABD’de silah güvenliği tartışmalarını derinden etkiledi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_20',
  },
  {
    id: '04-21-753',
    day: 21,
    month: 4,
    year: 753,
    title: 'Roma’nın kuruluşu geleneksel olarak bu tarihe bağlanır.',
    description: 'Geleneksel Roma kronolojisinde Roma kentinin kuruluş tarihi 21 Nisan 753 BCE olarak kabul edilir.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_21',
  },
  {
    id: '04-24-1800',
    day: 24,
    month: 4,
    year: 1800,
    title: 'Kongre Kütüphanesi kuruldu.',
    description: 'ABD Kongresi, Library of Congress’ın kurulması için ödenek ayırdı.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_24',
  },
  {
    id: '04-25-1974',
    day: 25,
    month: 4,
    year: 1974,
    title: 'Karanfil Devrimi gerçekleşti.',
    description: 'Portekiz’de askerî darbe ve halk hareketi Estado Novo diktatörlüğünün sonunu getirdi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_25',
  },
  {
    id: '04-27-1961',
    day: 27,
    month: 4,
    year: 1961,
    title: 'Sierra Leone bağımsız oldu.',
    description: 'Sierra Leone Birleşik Krallık’tan bağımsızlığını kazandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_27',
  },
  {
    id: '04-28-1789',
    day: 28,
    month: 4,
    year: 1789,
    title: 'Bounty’de isyan çıktı.',
    description: 'HMS Bounty mürettebatının isyanı denizcilik tarihinin en ünlü isyanlarından biri oldu.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_28',
  },
  {
    id: '04-29-1992',
    day: 29,
    month: 4,
    year: 1992,
    title: 'Los Angeles ayaklanmaları başladı.',
    description: 'Rodney King davasının ardından Los Angeles’ta günler süren büyük toplumsal olaylar başladı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/April_29',
  },
  {
    id: '05-03-1494',
    day: 3,
    month: 5,
    year: 1494,
    title: 'Kristof Kolomb Jamaika’yı gördü.',
    description: 'Kristof Kolomb ikinci seferi sırasında Jamaika adasına ulaştı.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_3',
  },
  {
    id: '05-11-1997',
    day: 11,
    month: 5,
    year: 1997,
    title: 'Deep Blue, Garry Kasparov’u yendi.',
    description: 'IBM’in Deep Blue bilgisayarı dünya şampiyonu Garry Kasparov’u satranç maçında mağlup etti.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_11',
  },
  {
    id: '05-13-1958',
    day: 13,
    month: 5,
    year: 1958,
    title: 'Canadian Bill of Rights süreci güçlendi.',
    description: 'Kanada’da federal düzeyde insan haklarının korunmasına yönelik yasal düzenlemeler güçlendirildi.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_13',
  },
  {
    id: '05-23-1785',
    day: 23,
    month: 5,
    year: 1785,
    title: 'Benjamin Franklin bifokal gözlüklerini anlattı.',
    description: 'Benjamin Franklin’in çift odaklı gözlükleri optik tasarım tarihinde erken örneklerden biri oldu.',
    category: 'science',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_23',
  },
  {
    id: '05-24-1844',
    day: 24,
    month: 5,
    year: 1844,
    title: 'İlk telgraf mesajı gönderildi.',
    description: 'Samuel Morse Washington ile Baltimore arasında ilk ünlü telgraf mesajını gönderdi.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_24',
  },
  {
    id: '05-26-1897',
    day: 26,
    month: 5,
    year: 1897,
    title: 'Dracula yayımlandı.',
    description: 'Bram Stoker’ın Dracula romanı yayımlandı ve modern vampir edebiyatının en etkili eserlerinden biri oldu.',
    category: 'culture',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_26',
  },
  {
    id: '05-28-1937',
    day: 28,
    month: 5,
    year: 1937,
    title: 'Golden Gate Köprüsü tamamlandı.',
    description: 'San Francisco’daki Golden Gate Köprüsü resmen tamamlanarak kente açıldı.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_28',
  },
  {
    id: '05-30-1431',
    day: 30,
    month: 5,
    year: 1431,
    title: 'Jeanne d’Arc idam edildi.',
    description: 'Jeanne d’Arc, Rouen’da yakılarak idam edildi; daha sonra Fransa’nın ulusal sembollerinden biri haline geldi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/May_30',
  },
  {
    id: '06-04-1989',
    day: 4,
    month: 6,
    year: 1989,
    title: 'Tiananmen Meydanı olayları gerçekleşti.',
    description: 'Pekin’de Tiananmen Meydanı çevresindeki protestoların askerî müdahaleyle bastırılması dünya kamuoyunda büyük yankı uyandırdı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_4',
  },
  {
    id: '06-07-1942',
    day: 7,
    month: 6,
    year: 1942,
    title: 'Midway Muharebesi sona erdi.',
    description: 'ABD Donanması Midway Muharebesi’nde Japon filosuna karşı önemli bir zafer kazandı.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_7',
  },
  {
    id: '06-09-1934',
    day: 9,
    month: 6,
    year: 1934,
    title: 'Donald Duck ilk kez göründü.',
    description: 'Donald Duck, The Wise Little Hen adlı animasyonda ilk kez izleyici karşısına çıktı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_9',
  },
  {
    id: '06-11-1962',
    day: 11,
    month: 6,
    year: 1962,
    title: 'Alcatraz’dan kaçış gerçekleşti.',
    description: 'Frank Morris ve iki mahkûm Alcatraz Federal Hapishanesi’nden kaçtı; akıbetleri kesin olarak bilinmedi.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_11',
  },
  {
    id: '06-27-1950',
    day: 27,
    month: 6,
    year: 1950,
    title: 'ABD Güney Kore’ye askerî destek gönderdi.',
    description: 'Kore Savaşı’nın başlamasının ardından ABD Başkanı Harry Truman Güney Kore’ye askerî destek verilmesini emretti.',
    category: 'world',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_27',
  },
  {
    id: '06-29-2007',
    day: 29,
    month: 6,
    year: 2007,
    title: 'İlk iPhone satışa çıktı.',
    description: 'Apple’ın ilk iPhone modeli ABD’de satışa sunularak akıllı telefon pazarını dönüştürdü.',
    category: 'science',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/June_29',
  },
  {
    id: '07-03-1985',
    day: 3,
    month: 7,
    year: 1985,
    title: 'Live Aid’in hazırlıkları başladı.',
    description: 'Dünyanın en büyük yardım konserlerinden Live Aid için Londra ve Philadelphia’daki organizasyonlar tamamlandı.',
    category: 'culture',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_3',
  },
  {
    id: '07-19-1903',
    day: 19,
    month: 7,
    year: 1903,
    title: 'İlk Tour de France tamamlandı.',
    description: 'Maurice Garin ilk Tour de France’ın genel klasmanını kazanarak yarışın ilk şampiyonu oldu.',
    category: 'sports',
    importance: 'featured',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/July_19',
  },
  {
    id: '08-01-1291',
    day: 1,
    month: 8,
    year: 1291,
    title: 'İsviçre Konfederasyonu’nun kuruluşu geleneksel olarak bu tarihe bağlanır.',
    description: 'İsviçre’nin ulusal kuruluş anlatısında üç kantonun 1291 tarihli Federal Şartı konfederasyonun temellerinden kabul edilir.',
    category: 'world',
    importance: 'standard',
    sourceLabel: 'Wikipedia – On This Day',
    sourceUrl: 'https://en.wikipedia.org/wiki/August_1',
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