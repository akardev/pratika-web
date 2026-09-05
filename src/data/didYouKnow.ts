export interface DidYouKnowItem {
  id: string;
  category: string;
  categorySlug: string;
  fact: string;
  highlight?: string;
  relatedToolSlug?: string;
  relatedToolTitle?: string;
  relatedHistoryDate?: { month: number; day: number };
  sourceHint?: string;
}

export const DID_YOU_KNOW_CATEGORIES = [
  { slug: 'tarih', label: 'Tarih', icon: 'Hourglass' },
  { slug: 'bilim', label: 'Bilim & Evren', icon: 'Atom' },
  { slug: 'insan', label: 'İnsan & Biyoloji', icon: 'Heart' },
  { slug: 'matematik', label: 'Matematik & Sayılar', icon: 'Binary' },
  { slug: 'ekonomi', label: 'Ekonomi & Finans', icon: 'Coins' },
  { slug: 'turkiye', label: 'Türkiye & Kültür', icon: 'Landmark' },
  { slug: 'teknoloji', label: 'Teknoloji', icon: 'Cpu' },
  { slug: 'cografya', label: 'Coğrafya & Doğa', icon: 'Globe' },
] as const;

export const DID_YOU_KNOW_ITEMS: DidYouKnowItem[] = [
  {
    "id": "dyk-1",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Dünya tarihinin en kısa savaşı, 27 Ağustos 1896'da Britanya ile Zanzibar arasında gerçekleşmiş ve yaklaşık 38 ila 45 dakika sürmüştür."
  },
  {
    "id": "dyk-2",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "M.Ö. 1274 civarında Hititler ile Mısırlılar arasında imzalanan Kadeş Antlaşması, tarihte günümüze metni ulaşmış en eski eşit şartlı barış antlaşmasıdır."
  },
  {
    "id": "dyk-3",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Oxford Üniversitesi, Aztek İmparatorluğu'ndan daha eskidir. Oxford'da eğitim 1096'da başlamışken, Aztek medeniyeti 1325'te kurulmuştur."
  },
  {
    "id": "dyk-4",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Antik Roma'da gladyatörlerin teri ve tozu, kozmetik ve gençlik iksiri olarak soylu kadınlar tarafından satın alınırdı."
  },
  {
    "id": "dyk-5",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Büyük İskender fethettiği topraklarda kendi adını taşıyan 70'ten fazla şehir kurdurmuştur; en meşhuru Mısır'daki İskenderiye'dir."
  },
  {
    "id": "dyk-6",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Fransız İmparatoru Napolyon sanılanın aksine çok kısa boylu değildi; yaklaşık 1.68 m boyundaydı ve dönemin ortalamasındaydı."
  },
  {
    "id": "dyk-7",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Tarihteki ilk bilinen yazılı kanunlar Hammurabi değil, M.Ö. 2100 civarında Sümer Kralı Ur-Nammu tarafından hazırlanan kanunlardır."
  },
  {
    "id": "dyk-8",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Antik Mısır piramitlerinin inşasında çalışan işçilere ücretlerinin bir kısmı günlük ekmek ve arpa birası olarak ödenirdi."
  },
  {
    "id": "dyk-9",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Roma İmparatoru Caligula, çok sevdiği yarış atı Incitatus'u senatör ilan etmek istemiş ve ona mermerden bir ahır yaptırmıştır."
  },
  {
    "id": "dyk-10",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1918 İspanyol gribi İspanya'da çıkmamıştır; İspanya I. Dünya Savaşı'nda tarafsız olup basını sansürsüz yazdığı için bu adı almıştır."
  },
  {
    "id": "dyk-11",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Osmanlı İmparatorluğu'nda ilk matbaa, İbrahim Müteferrika tarafından 1727 yılında kurulmuş ve ilk basılan eser Vankulu Lügati olmuştur."
  },
  {
    "id": "dyk-12",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Çin Seddi insan yapımı en uzun savunma duvarıdır, ancak popüler mitin aksine Ay'dan çıplak gözle görülemez."
  },
  {
    "id": "dyk-13",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Kleopatra, Büyük Giza Piramidi'nin yapılışından ziyade Ay'a ayak basılan tarihe (1969) zaman olarak daha yakındır."
  },
  {
    "id": "dyk-14",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Vikingler asla başlıklarına boynuz takmamışlardır; boynuzlu miğfer 19. yüzyıl opera kostümcüleri tarafından uydurulmuştur."
  },
  {
    "id": "dyk-15",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Antik Yunan'da 'ostrakismos' oylamasıyla, demokrasiye tehdit görülen siyasetçiler çömlek parçalarına yazılan oylarla 10 yıl sürgün edilirdi."
  },
  {
    "id": "dyk-16",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Tarihte bilinen ilk posta teşkilatı, M.Ö. 6. yüzyılda Pers İmparatoru I. Darius tarafından kurulan 'Çaparhane' sistemidir."
  },
  {
    "id": "dyk-17",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Cengiz Han'ın ölüm yeri ve mezarı günümüzde bilinmemektedir; rivayete göre mezarı gizlemek için üzerinden bin at koşturulmuştur."
  },
  {
    "id": "dyk-18",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1666 Büyük Londra Yangını kentin büyük kısmını yok etmesine karşın, resmi kayıtlarda sadece 6 can kaybı tespit edilmiştir."
  },
  {
    "id": "dyk-19",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Titanik gemisinin 1912'de batması sonrasında 1914'te Uluslararası Denizde Can Güvenliği Sözleşmesi (SOLAS) kabul edilmiştir."
  },
  {
    "id": "dyk-20",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "İnka İmparatorluğu, tekerleği ve demiri bilmeden Güney Amerika'nın en büyük dağlık medeniyetini ve devasa taş mimarisini kurmuştur."
  },
  {
    "id": "dyk-21",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Magellan, dünyanın çevresini dolaşan ilk seferi başlatmış ancak Filipinler'de hayatını kaybedince turu Juan Sebastián Elcano tamamlamıştır."
  },
  {
    "id": "dyk-22",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Antik Roma'da idrar, amonyak içeriği sayesinde çamaşır yıkamada ve deri tabaklamada yaygın olarak kullanılan bir temizlik maddesiydi."
  },
  {
    "id": "dyk-23",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1783 Paris Antlaşması ile İngiltere, Amerika Birleşik Devletleri'nin bağımsızlığını resmen tanımıştır."
  },
  {
    "id": "dyk-24",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Alman filozof Immanuel Kant, tüm hayatı boyunca doğduğu şehir olan Königsberg'den (günümüz Kaliningrad) neredeyse hiç ayrılmamıştır."
  },
  {
    "id": "dyk-25",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Orhun Yazıtları, Türk dilinin ve tarihinin bilinen en eski yazılı belgeleri olup 8. yüzyıl başlarında Göktürk alfabesiyle dikilmiştir."
  },
  {
    "id": "dyk-26",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Antik Olimpiyat Oyunları M.Ö. 776'dan M.S. 393'e kadar kesintisiz 1000 yıldan uzun süre her 4 yılda bir Olimpia'da düzenlenmiştir."
  },
  {
    "id": "dyk-27",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Eski Mısır'da kediler kutsal sayılırdı; bir ev kedisi öldüğünde tüm aile bireyleri yas göstergesi olarak kaşlarını kazıtırdı."
  },
  {
    "id": "dyk-28",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1804'te Haiti, kölelerin başlattığı başarılı bir devrim sonucunda kurulan tarihteki ilk bağımsız siyah cumhuriyet olmuştur."
  },
  {
    "id": "dyk-29",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Orta Çağ kütüphanelerinde el yazması nadir kitapların çalınmasını önlemek için ciltler masalara zincirlerle kilitlenirdi."
  },
  {
    "id": "dyk-30",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Fatih Sultan Mehmed, İstanbul'un fethinin ardından Bizans saray kütüphanesini korumaya almış ve klasik eserleri tercüme ettirmiştir."
  },
  {
    "id": "dyk-31",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "İlk modern olimpiyat oyunları 1896 yılında Atina'da düzenlenmiş ve 14 ülkeden 241 sporcu katılmıştır."
  },
  {
    "id": "dyk-32",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "İngiltere Kraliçesi I. Elizabeth'in şeker tüketiminden dişleri siyahlaşınca, saray çevresinde siyah diş zenginlik göstergesi sayılmıştır."
  },
  {
    "id": "dyk-33",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1258 Moğol istilası sırasında Bağdat Kütüphanesi yağmalanmış ve atılan yüz binlerce kitaptan Dicle Nehri'nin siyah aktığı kaydedilmiştir."
  },
  {
    "id": "dyk-34",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "1908 yılında Sibirya'da patlayan Tunguska göktaşı, 80 milyon ağacı yerle bir etmiş fakat krater çukuru bırakmadan havada patlamıştır."
  },
  {
    "id": "dyk-35",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Vasco da Gama 1498'de Ümit Burnu'nu dolaşarak Avrupa'dan Hindistan'a doğrudan deniz yolunu açan ilk Avrupalı kaptan olmuştur."
  },
  {
    "id": "dyk-36",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "15. yüzyılda Johannes Gutenberg'in geliştirdiği hareketli harfli matbaa, kitap üretim maliyetini %80'den fazla düşürmüştür."
  },
  {
    "id": "dyk-37",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Eyfel Kulesi 1889 Paris Fuarı için 20 yıllık ömürle geçici inşa edilmiş, radyo kulesi olarak askeri faydası anlaşılınca yıkımdan kurtulmuştur."
  },
  {
    "id": "dyk-38",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Babil'in Asma Bahçeleri, Antik Dünyanın Yedi Harikası arasında varlığına dair arkeolojik kanıt bulunamayan tek yapıdır."
  },
  {
    "id": "dyk-39",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Amerika kıtasına adı verilen Amerigo Vespucci, Kristof Kolomb'un aksine ulaşılan yerlerin Asya değil yeni bir kıta olduğunu fark etmiştir."
  },
  {
    "id": "dyk-40",
    "category": "Tarih",
    "categorySlug": "tarih",
    "fact": "Konya'daki Çatalhöyük, M.Ö. 7400'lere dayanan geçmişiyle sokaksız, evlerin çatılarından girilen dünyanın en eski yerleşimlerindendir."
  },
  {
    "id": "dyk-41",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Güneş ışığının yüzeyden ayrılıp Dünya'ya ulaşması yaklaşık 8 dakika 20 saniye sürer; çekirdekten yüzeye çıkması ise yüz binlerce yıl alır."
  },
  {
    "id": "dyk-42",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Venüs gezegeninde bir gün, bir yıldan daha uzundur; kendi etrafında dönüşü 243 gün sürerken Güneş etrafındaki turu 225 günde biter."
  },
  {
    "id": "dyk-43",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Samanyolu Galaksisi ile Andromeda Galaksisi saatte yaklaşık 400.000 km hızla yaklaşmakta ve 4.5 milyar yıl sonra birleşecektir."
  },
  {
    "id": "dyk-44",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Nötron yıldızları o kadar yoğundur ki, bir nötron yıldızından alınacak bir çay kaşığı madde Dünya'da yaklaşık 6 milyar ton gelir."
  },
  {
    "id": "dyk-45",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Uzayda yerçekimi olmadığı için astronotların omurgasındaki diskler genişler ve boyları uzayda 5 santimetreye kadar uzayabilir."
  },
  {
    "id": "dyk-46",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Satürn gezegeninin ortalama yoğunluğu sudan daha düşüktür; eğer yeterince büyük bir okyanus olsaydı Satürn suyun üzerinde yüzerdi."
  },
  {
    "id": "dyk-47",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Dünya atmosferindeki oksijenin yaklaşık %50 ila %80'i karadaki ağaçlar tarafından değil, okyanuslardaki mikroskobik fitoplanktonlar tarafından üretilir."
  },
  {
    "id": "dyk-48",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Işık saniyede yaklaşık 300.000 km hızla ilerler; bu hızla Dünya'nın ekvator çevresini bir saniyede 7.5 kez dolaşabilir."
  },
  {
    "id": "dyk-49",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Evrendeki atomların %99'undan fazlası hidrojen ve helyum elementlerinden oluşur; diğer tüm ağır elementler yıldızların kalbinde üretilmiştir."
  },
  {
    "id": "dyk-50",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Gözlemlenebilir evrende tahminen 2 trilyondan fazla galaksi ve Dünya'daki tüm kumsallardaki kum tanelerinden daha fazla yıldız vardır."
  },
  {
    "id": "dyk-51",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Ay yüzeyinde rüzgar veya sıvı su erozyonu bulunmadığı için Apollo astronotlarının bıraktığı ayak izleri milyonlarca yıl bozulmadan kalacaktır."
  },
  {
    "id": "dyk-52",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Mars'taki Olympus Mons yanardağı yaklaşık 22 km yüksekliğiyle Everest Dağı'nın yaklaşık 2.5 katı boyundadır ve Güneş Sistemi'nin en yüksek dağıdır."
  },
  {
    "id": "dyk-53",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Bir şimşek çakması anında havanın sıcaklığı yaklaşık 30.000 santigrat dereceye ulaşabilir; bu Güneş yüzeyinin yaklaşık 5 katı sıcaklıktır."
  },
  {
    "id": "dyk-54",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Elmas ve kurşun kalem ucu (grafit) tamamen aynı kimyasal elementten (saf karbon) oluşur; aralarındaki tek fark kristal atom dizilişleridir."
  },
  {
    "id": "dyk-55",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Su donarken hacmi genişleyen nadir maddelerdendir; buzun yoğunluğu sıvı sudan az olduğu için göller dipten değil üstten donar ve yaşamı korur."
  },
  {
    "id": "dyk-56",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Bir insan vücudundaki tüm atomik boşluklar çıkarılsaydı, tüm insan ırkı bir küp şeker büyüklüğüne sıkışabilirdi."
  },
  {
    "id": "dyk-57",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Ses dalgaları boşlukta yayılamaz çünkü titreşecek bir madde ortamı yoktur; bu yüzden uzayda meydana gelen dev patlamalar tamamen sessizdir."
  },
  {
    "id": "dyk-58",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Dünya'nın çekirdeğindeki sıcaklık yaklaşık 5.500 santigrat derece olup Güneş'in yüzey sıcaklığına oldukça yakındır."
  },
  {
    "id": "dyk-59",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Plüton, 1930'daki keşfinden 2006'da cüce gezegen sınıfına alınışına kadar geçen sürede Güneş etrafındaki bir tam turunu bile tamamlayamamıştır."
  },
  {
    "id": "dyk-60",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Jüpiter'in 'Büyük Kırmızı Leke' adı verilen dev fırtınası, en az 300 yıldır devam etmektedir ve içine Dünya rahatlıkla sığabilir."
  },
  {
    "id": "dyk-61",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Güneş Sistemi'nin toplam kütlesinin yaklaşık %99.86'sını tek başına Güneş oluşturur; tüm gezegenler ve uydular geriye kalan %0.14'tür.",
    "relatedToolSlug": "yuzde-hesaplama",
    "relatedToolTitle": "Yüzde Hesaplama"
  },
  {
    "id": "dyk-62",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Bal, içerisindeki düşük su oranı ve yüksek asidite sayesinde mikroorganizma barındırmaz ve binlerce yıl bozulmadan yenilebilir kalabilir."
  },
  {
    "id": "dyk-63",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Mavi balinaların kalp atışı okyanusun altında 3 kilometre öteden özel sonar aygıtlarıyla duyulabilir."
  },
  {
    "id": "dyk-64",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Kutup ışıkları (Aurora), Güneş'ten gelen yüklü parçacıkların Dünya'nın manyetik alanındaki gaz molekülleriyle çarpışması sonucu oluşur."
  },
  {
    "id": "dyk-65",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Karasinekler uçuş sırasında yönlerini ve dengelerini korumak için 'halter' adı verilen mikroskobik titreşimli denge organlarını kullanır."
  },
  {
    "id": "dyk-66",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Dünyadaki okyanusların en derin yeri Mariana Çukuru'dur (yaklaşık 11.000 metre); dipteki su basıncı yüzeyin 1000 katından fazladır."
  },
  {
    "id": "dyk-67",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Bir cam şişenin doğada tamamen yok olması yaklaşık 4.000 yıl sürer; ancak cam kalitesini kaybetmeden sonsuz kez geri dönüştürülebilir."
  },
  {
    "id": "dyk-68",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Lazer ışığı tek bir dalga boyunda ve eş fazlı hareket ettiği için normal lamba ışığı gibi dağılmaz ve Ay'a yansıtılıp geri ölçülebilir."
  },
  {
    "id": "dyk-69",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Altın, evrendeki dev nötron yıldızlarının çarpışması ve süpernova patlamaları sırasında açığa çıkan olağanüstü enerjide sentezlenmiştir."
  },
  {
    "id": "dyk-70",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Ateşböcekleri kimyasal bir reaksiyonla soğuk ışık üretir (biyolüminesans); ürettikleri enerjinin %100'e yakını ısı yerine doğrudan ışığa dönüşür."
  },
  {
    "id": "dyk-71",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Dünya'nın kendi ekseni etrafındaki dönüş hızı ekvatorda saatte yaklaşık 1.670 kilometredir."
  },
  {
    "id": "dyk-72",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Helium gazı mutlak sıfıra yakın sıcaklıklarda (-271°C) 'süperakışkan' hale gelir ve yerçekimine meydan okuyarak kapların çeperinden yukarı tırmanır."
  },
  {
    "id": "dyk-73",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Kuantum dolanıklık teorisine göre birbirine bağlı iki parçacık, aralarındaki mesafe ışık yılları bile olsa anında birbirinin durumunu etkiler."
  },
  {
    "id": "dyk-74",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Radyo dalgaları, görünür ışık, X-ışınları ve mikrodalgaların tümü aynı hızda (ışık hızıyla) hareket eden elektromanyetik dalgalardır."
  },
  {
    "id": "dyk-75",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Beyaz cüce adı verilen ölü yıldızların maddesinden bir kibrit kutusu kadarı Dünya üzerinde yaklaşık 5 ton ağırlığa eşittir."
  },
  {
    "id": "dyk-76",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Sıcak su bazı özel koşullarda soğuk sudan daha hızlı donabilir; bu termodinamik fenomene 'Mpemba Etkisi' denir."
  },
  {
    "id": "dyk-77",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Güneş'in nükleer füzyon çekirdeğinde her saniyede 600 milyon ton hidrojen helyuma dönüşür ve devasa enerji açığa çıkar."
  },
  {
    "id": "dyk-78",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Ozon tabakası stratosferde bulunur ve Güneş'in ölümcül morötesi (UV-B ve UV-C) ışınlarının %98'ini filtreleyerek yeryüzündeki yaşamı korur."
  },
  {
    "id": "dyk-79",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Gözlerimizdeki retinaya düşen görüntüler aslında baş aşağıdır; beynimizin görsel korteksi bu görüntüyü otomatik olarak düzeltir."
  },
  {
    "id": "dyk-80",
    "category": "Bilim & Evren",
    "categorySlug": "bilim",
    "fact": "Evrendeki en soğuk bilinen doğal yer Boomerang Nebulası'dır; sıcaklığı -272 santigrat dereceyle mutlak sıfırın sadece 1 derece üzerindedir."
  },
  {
    "id": "dyk-81",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Yetişkin bir insanın kalbi günde ortalama 100.000 kez atar ve yaklaşık 7.500 litre kanı damar ağına pompalar."
  },
  {
    "id": "dyk-82",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki tüm damarlar (kılcal damarlar dahil) uç uca eklenseydi yaklaşık 100.000 km uzunluğa ulaşır ve Dünya'yı 2.5 kez turlardı."
  },
  {
    "id": "dyk-83",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan beyni vücut ağırlığının yaklaşık %2'sini oluşturmasına rağmen, dinlenme anındaki toplam oksijen ve enerjinin %20'sini harcar."
  },
  {
    "id": "dyk-84",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Parmak izlerimiz anne karnında yaklaşık 17. haftada oluşur ve tek yumurta ikizlerinin bile parmak izleri birbirinin tamamen aynısı değildir."
  },
  {
    "id": "dyk-85",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Gözlerimiz kapalıyken gördüğümüz tam siyah olmayan koyu gri tonun optik bilimindeki özel adı 'Eigengrau'dur.",
    "relatedToolSlug": "renk-donusturucu",
    "relatedToolTitle": "Renk Dönüştürücü"
  },
  {
    "id": "dyk-86",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan kemikleri ağırlık başına mukavemet açısından çelikten daha güçlüdür; 1 santimetreküp kemik yaklaşık 9 tonluk basınca dayanabilir."
  },
  {
    "id": "dyk-87",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Yetişkin bir insanda yaklaşık 206 kemik bulunurken, bebekler yaklaşık 270 ila 300 kemikle doğar; büyüdükçe birçok kemik birbiriyle kaynaşır."
  },
  {
    "id": "dyk-88",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki en güçlü kas, uygulayabildiği kuvvete oranla çene kası olan 'masseter' (çiğneme kası) kabul edilir."
  },
  {
    "id": "dyk-89",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Karaciğer insan vücudunda kendini tamamen yenileyebilen (rejenerasyon yeteneğine sahip) tek iç organdır; %70'i alınsa bile yeniden büyür."
  },
  {
    "id": "dyk-90",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan gözü yaklaşık 10 milyon farklı renk tonunu birbirinden ayırt edebilecek reseptör kapasitesine sahiptir.",
    "relatedToolSlug": "renk-donusturucu",
    "relatedToolTitle": "Renk Dönüştürücü"
  },
  {
    "id": "dyk-91",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Hapşırma sırasında akciğerlerden çıkan havanın hızı saatte 160 kilometreye kadar ulaşabilir."
  },
  {
    "id": "dyk-92",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan derisi yaklaşık 2 metrekarelik yüzey alanı ve vücut ağırlığının %16'sını oluşturmasıyla vücudun en büyük organıdır."
  },
  {
    "id": "dyk-93",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Mide asidi (hidroklorik asit) o kadar güçlüdür ki metalleri aşındırabilir; midenin kendi kendini sindirmesini mukus tabakası engeller."
  },
  {
    "id": "dyk-94",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki hücre sayısı yaklaşık 30 trilyondur; vücudumuzda yaşayan faydalı bakteri sayısı da bu miktara yakındır."
  },
  {
    "id": "dyk-95",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Uyurken koku alma duyumuz neredeyse tamamen devre dışı kalır; bu yüzden yangınlarda insanların duman kokusuyla uyanması zordur."
  },
  {
    "id": "dyk-96",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Dil izi de tıpkı parmak izi gibi her insanda tamamen benzersiz bir yüzey haritasına sahiptir."
  },
  {
    "id": "dyk-97",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki en küçük kemik orta kulakta bulunan ve yalnızca 3 milimetre uzunluğundaki 'üzengi' (stapes) kemiğidir."
  },
  {
    "id": "dyk-98",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Tırnaklar ellerde ayaklara göre yaklaşık 4 kat daha hızlı uzar; en hızlı uzayan tırnak ise genellikle orta parmağınkidir."
  },
  {
    "id": "dyk-99",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Bir insanın tüm hücrelerindeki DNA açılıp uç uca bağlansaydı, Güneş Sistemi'nin sınırlarına kadar gidip dönecek uzunlukta olurdu."
  },
  {
    "id": "dyk-100",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Esnerken beyne daha fazla kan ve oksijen pompalanarak beynin sıcaklığının düşürüldüğü (soğutma hipotezi) öne sürülmektedir."
  },
  {
    "id": "dyk-101",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Yetişkin bir insan günde ortalama 20.000 kez nefes alır ve yaklaşık 11.000 litre havayı akciğerlerine çeker."
  },
  {
    "id": "dyk-102",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan gözü dakikada ortalama 15-20 kez kırpılır; ancak ekran karşısında odaklanıldığında bu sayı yarı yarıya düşer ve kuruluk yapar."
  },
  {
    "id": "dyk-103",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Vücuttaki en uzun sinir siyatik siniridir; omuriliğin alt kısmından başlayıp ayak parmaklarına kadar kesintisiz uzanır."
  },
  {
    "id": "dyk-104",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Tat alma tomurcukları sadece dilde bulunmaz; damağın arkasında, yutakta ve yemek borusunun üst kısmında da yer alır."
  },
  {
    "id": "dyk-105",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Göz korneası kan damarı içermeyen tek insan dokusudur; ihtiyaç duyduğu oksijeni doğrudan ortamdaki havadan difüzyonla alır."
  },
  {
    "id": "dyk-106",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan beyninde yaklaşık 86 milyar nöron bulunur ve bu nöronlar birbirleriyle 100 trilyondan fazla sinaptik bağlantı kurar."
  },
  {
    "id": "dyk-107",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Kırmızı kan hücreleri (alyuvarlar) çekirdeksizdir; vücutta üretildikten sonra yaklaşık 120 gün yaşar ve yenilenirler."
  },
  {
    "id": "dyk-108",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki demir miktarı yaklaşık 4 gramdır; bu miktar küçük bir çivi yapmaya yetecek kadardır."
  },
  {
    "id": "dyk-109",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Boyumuz sabah uyandığımızda akşama göre yaklaşık 1-2 cm daha uzundur; gün boyu omurlar arası diskler yerçekimiyle sıkışır."
  },
  {
    "id": "dyk-110",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Vücut ısısı gün içinde sabit değildir; sabahın erken saatlerinde en düşük seviyedeyken akşamüstü en yüksek seviyeye ulaşır."
  },
  {
    "id": "dyk-111",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Gözyaşı bezleri sadece duygusal anlarda değil, gözü temizlemek için günde yaklaşık 1 mililitre sürekli bazal gözyaşı üretir."
  },
  {
    "id": "dyk-112",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan kulağı yaklaşık 20 Hz ile 20.000 Hz arasındaki ses frekanslarını işitebilir; yaş ilerledikçe yüksek frekans algısı zayıflar."
  },
  {
    "id": "dyk-113",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Kan dolaşımında bir alyuvarın kalpten çıkıp tüm vücudu dolaşarak geri dönmesi yalnızca yaklaşık 60 saniye sürer."
  },
  {
    "id": "dyk-114",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İskelet sistemimizdeki kemiklerin dörtte biri sadece iki ayağımızda yer alır (her ayakta 26 kemik)."
  },
  {
    "id": "dyk-115",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Bağışıklık sisteminin ürettiği antikorlar, daha önce karşılaştıkları mikropları yıllar sonra bile tanıyan hafıza hücreleri barındırır."
  },
  {
    "id": "dyk-116",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan derisi her ay tamamen yenilenir ve bir insan ömrü boyunca yaklaşık 18-20 kilogram ölü deri hücresi döker."
  },
  {
    "id": "dyk-117",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Gülümsemek için yaklaşık 12-17 kas çalışırken, kaş çatmak için 40'tan fazla yüz kası devreye girer."
  },
  {
    "id": "dyk-118",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "REM uykusu evresinde beyin dalgaları uyanık olduğumuz anlar kadar aktiftir ve kaslarımız geçici olarak felç edilir."
  },
  {
    "id": "dyk-119",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "İnsan vücudundaki kalsiyumun %99'u kemiklerde ve dişlerde depolanır; kalan %1'i sinir iletimi ve kas kasılması için hayati önemdedir."
  },
  {
    "id": "dyk-120",
    "category": "İnsan & Biyoloji",
    "categorySlug": "insan",
    "fact": "Tükürük salgısı yiyecekleri sindirmenin yanı sıra tat almayı sağlar; kuru bir dille yiyeceklerin tadını algılamak mümkün değildir."
  },
  {
    "id": "dyk-121",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Ahtapotların üç kalbi, mavi renkli kanı ve her kolunda bağımsız çalışan mini sinir merkezleri (toplam 9 beyin benzeri merkez) vardır."
  },
  {
    "id": "dyk-122",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Koalaların parmak izleri insan parmak izine o kadar benzer ki, suç mahallerinde elektron mikroskobu olmadan ayırt etmek neredeyse imkansızdır."
  },
  {
    "id": "dyk-123",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Bukalemunlar derilerinin rengini sanılanın aksine kamufle olmak için değil, vücut sıcaklığını ayarlamak ve ruh hallerini belli etmek için değiştirir."
  },
  {
    "id": "dyk-124",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Dünyadaki en hızlı kara hayvanı olan çita, saatte 100 kilometre hıza sadece 3 saniyede ulaşabilir; bu çoğu spor otomobilden hızlıdır."
  },
  {
    "id": "dyk-125",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Mavi balinaların dili bir filin ağırlığı kadar (yaklaşık 2.7 ton) gelebilir ve ana atardamarlarının içinden bir insan yüzebilir."
  },
  {
    "id": "dyk-126",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kargalar ve kuzgunlar karmaşık aletler yapabilir, insan yüzlerini tanıyabilir ve kendilerine kötülük yapan insanları yıllarca hatırlayıp nesillerine aktarabilir."
  },
  {
    "id": "dyk-127",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Denizatı dünyada erkeği hamile kalan ve yavruları dünyaya getiren tek canlı türüdür."
  },
  {
    "id": "dyk-128",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Bal arıları diğer arılara nektarın yerini, yönünü ve mesafesini anlatmak için 'sallantı dansı' (waggle dance) adı verilen geometrik bir dans yapar."
  },
  {
    "id": "dyk-129",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kunduzların dişleri sürekli büyür ve içerdiği demir minerali nedeniyle turuncu renktedir; bu demir dişlerini ağaç kemirecek kadar sertleştirir."
  },
  {
    "id": "dyk-130",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Karıncalar kendi ağırlıklarının 20 ila 50 katını taşıyabilir ve uykuya dalmazlar; bunun yerine gün içinde çok kısa dinlenme şekerlemeleri yaparlar."
  },
  {
    "id": "dyk-131",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Yunuslar uyurken beyinlerinin sadece bir yarısını kapatırlar; diğer yarı uyanık kalarak yüzeye çıkıp nefes almayı ve tehlikeleri gözetmeyi sağlar."
  },
  {
    "id": "dyk-132",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Flamingolar pembemsi tüylerini doğuştan almaz; beslendikleri alg ve küçük karideslerde bulunan karotenoid pigmentleri tüylerini renklendirir."
  },
  {
    "id": "dyk-133",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kediler tatlı tadını algılayan genetik reseptöre sahip değildir; bu yüzden kediler tatlı yiyeceklerin tadını alamazlar."
  },
  {
    "id": "dyk-134",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kutup ayılarının derisi aslında siyahtır ve tüyleri şeffaf içi boş tüplerdir; ışığı yansıttıkları için beyaz görünürler."
  },
  {
    "id": "dyk-135",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Devekuşunun gözü beyninden daha büyüktür ve güçlü bacaklarıyla saatte 70 km hızla koşabilir."
  },
  {
    "id": "dyk-136",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kolları kopan deniz yıldızları kopan kollarını yeniden büyütebilir; hatta bazı türlerde kopan tek bir kol yeni bir deniz yıldızına dönüşebilir."
  },
  {
    "id": "dyk-137",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Pangolinler tehlike anında sert keratin pullarıyla mükemmel bir top haline gelebilir; bu pulları aslanlar bile dişleriyle delemez."
  },
  {
    "id": "dyk-138",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Ağaçkakanların dili o kadar uzundur ki kafatasının arkasından dolanarak beynini sarar; bu yapı gagasını vururken beynini sarsıntıdan korur."
  },
  {
    "id": "dyk-139",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Yarasalar memeli hayvanlar arasında gerçek anlamda aktif uçabilen tek canlı grubudur."
  },
  {
    "id": "dyk-140",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Aksolotl (Axolotl) semenderi kalbini, omuriliğini ve hatta beyninin parçalarını yara izi bırakmadan kusursuzca yenileyebilir."
  },
  {
    "id": "dyk-141",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Dünyadaki en büyük yaşayan organizma balina veya mamut ağacı değil, ABD Oregon'daki yaklaşık 9 km² alana yayılan bir bal mantarı (Armillaria) kolonisi dir."
  },
  {
    "id": "dyk-142",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Baykuşlar gözlerini göz yuvalarında oynatamazlar; bunun yerine boyunlarını 270 derece döndürerek çevrelerini izlerler."
  },
  {
    "id": "dyk-143",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Tembel hayvanların sindirim sistemi o kadar yavaştır ki, yedikleri tek bir yaprağı sindirmeleri 30 güne kadar sürebilir."
  },
  {
    "id": "dyk-144",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Köpekbalıkları dinozorlardan yaklaşık 200 milyon yıl önce, ağaçlardan bile yaklaşık 50 milyon yıl önce okyanuslarda ortaya çıkmıştır."
  },
  {
    "id": "dyk-145",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Tarantulalar tehlike anında arka bacaklarıyla karınlarındaki mikroskobik yakıcı tüyleri avcının gözüne doğru fırlatabilir."
  },
  {
    "id": "dyk-146",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Pireler kendi boylarının 150 katı yüksekliğe zıplayabilir; bu bir insanın Eyfel Kulesi'nin üzerinden atlamasına eşdeğerdir."
  },
  {
    "id": "dyk-147",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Koyun ve keçilerin göz bebekleri dikdörtgen şeklindedir; bu geniş açı otlarken başlarını kaldırmadan 340 derecelik çevreyi görmelerini sağlar."
  },
  {
    "id": "dyk-148",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Bal porsukları kalın derileri ve antikorları sayesinde kobra zehrine karşı dirençlidir; ısırıldıktan sonra birkaç saat baygın kalıp uyanırlar."
  },
  {
    "id": "dyk-149",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Filler zıplayamayan tek memeli hayvan türüdür; ancak ayak tabanlarındaki özel reseptörlerle kilometrelerce ötedeki yer sarsıntılarını hissedebilirler."
  },
  {
    "id": "dyk-150",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Denizanaları kalp, beyin, kan veya kemiğe sahip değildir; vücutlarının %95'inden fazlası sudan oluşur."
  },
  {
    "id": "dyk-151",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Istakozlar biyolojik olarak yaşlanmazlar; telomeraz enzimlerinin aktifliği sayesinde hücreleri yaşlanma sınırına uğramaz."
  },
  {
    "id": "dyk-152",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kolibriler (sinek kuşları) kanatlarını saniyede 80 kez çırpabilir ve geriye doğru uçabilen tek kuş türüdür."
  },
  {
    "id": "dyk-153",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Kutup tilkileri -70 santigrat dereceye kadar düşen dondurucu kutup soğuklarında bile vücut sıcaklıklarını koruyabilir."
  },
  {
    "id": "dyk-154",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Deniz samurları uyurken akıntıya kapılıp sürüklenmemek için birbirlerinin patilerini tutarlar ve deniz yosunlarına sarınırlar."
  },
  {
    "id": "dyk-155",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Devekuşu yumurtası dünyanın en büyük yaşayan kuş yumurtasıdır; bir devekuşu yumurtası yaklaşık 24 tavuk yumurtasına eşittir."
  },
  {
    "id": "dyk-156",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Bambu dünyada en hızlı büyüyen bitkidir; bazı türleri 24 saat içinde 90 santimetreye (saatte neredeyse 4 cm) kadar uzayabilir."
  },
  {
    "id": "dyk-157",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Geyiklerin boynuzları dünyada en hızlı büyüyen kemik dokularındandır; günde 2 santimetreye kadar uzayabilir ve her yıl dökülüp yenilenir."
  },
  {
    "id": "dyk-158",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Venüs sinekkapanı yapraklarına bir böcek konduğunda hemen kapanmaz; yaprak üzerindeki tüylere 20 saniye içinde en az 2 kez dokunulmasını bekler."
  },
  {
    "id": "dyk-159",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Salyangozlar nemli koşullarda kesintisiz 3 yıla kadar uykuya (estivasyon/kış uykusu) dalabilirler."
  },
  {
    "id": "dyk-160",
    "category": "Hayvanlar & Doğa",
    "categorySlug": "hayvanlar",
    "fact": "Martılar deniz suyu içebilir; gözlerinin üzerindeki özel tuz bezleri kandaki fazla tuzu filtreleyip burun deliklerinden dışarı atar."
  },
  {
    "id": "dyk-161",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Antarktika yıllık ortalama 50 mm yağış miktarıyla teknik olarak dünyanın en büyük çölüdür (soğuk kutup çölü)."
  },
  {
    "id": "dyk-162",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "İstanbul Boğazı'nda iki yönlü akıntı vardır: Üstte Karadeniz'den Marmara'ya tatlı su akıntısı, dipte ise Marmara'dan Karadeniz'e tuzlu su akar."
  },
  {
    "id": "dyk-163",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en derin gölü olan Baykal Gölü (Sibirya), dünyadaki tüm donmamış yüzey tatlı suyunun yaklaşık %20'sini tek başına barındırır."
  },
  {
    "id": "dyk-164",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Ölü Deniz (Lut Gölü), deniz seviyesinin yaklaşık 430 metre altında bulunmasıyla yeryüzünün en alçak kara noktasıdır."
  },
  {
    "id": "dyk-165",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Rusya 11 farklı zaman dilimine yayılmıştır; ülkenin bir ucunda sabah kahvaltısı yapılırken diğer ucunda gece uykusuna yatılır."
  },
  {
    "id": "dyk-166",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Afrika kıtası hem kuzey hem güney hem de doğu ve batı yarımkürelerde toprağı bulunan tek kıtadır."
  },
  {
    "id": "dyk-167",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Amazon Yağmur Ormanları o kadar büyüktür ki havzası tüm Batı Avrupa'nın yüzölçümünü kaplayacak büyüklüktedir."
  },
  {
    "id": "dyk-168",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "İzlanda'da sivrisinek bulunmaz; ani donma ve çözülme iklim döngüleri sivrisinek larvalarının hayatta kalmasına izin vermez."
  },
  {
    "id": "dyk-169",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en yüksek şelalesi Venezuela'daki Angel Şelalesi'dir; su 979 metre serbest düşüş yaparken rüzgarda buharlaşıp sis haline gelir."
  },
  {
    "id": "dyk-170",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Kanada dünyadaki tüm doğal göllerin yarısından fazlasına ev sahipliği yapar; ülkede 2 milyondan fazla göl bulunur."
  },
  {
    "id": "dyk-171",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en kurak sıcak çölü olan Atacama Çölü'nün (Şili) bazı bölgelerine kayıtlara göre yüzyıllarca tek damla yağmur düşmemiştir."
  },
  {
    "id": "dyk-172",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Avustralya kıtası her yıl tektonik plakalar nedeniyle kuzeye doğru yaklaşık 7 santimetre kaymaktadır; bu durum GPS sistemlerinde güncelleme gerektirir."
  },
  {
    "id": "dyk-173",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Bering Boğazı'ndaki Küçük Diomede (ABD) ve Büyük Diomede (Rusya) adaları arası sadece 3.8 km'dir ancak aralarında 21 saatlik zaman farkı vardır."
  },
  {
    "id": "dyk-174",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Pasifik Okyanusu o kadar geniştir ki, Dünya üzerindeki tüm kıtaların toplam kara alanından daha büyük bir yüzölçümüne sahiptir."
  },
  {
    "id": "dyk-175",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Nil Nehri yaklaşık 6.650 km uzunluğuyla güneyden kuzeye doğru akan dünyadaki ender nehirlerdendir."
  },
  {
    "id": "dyk-176",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en yüksek başkenti Bolivya'nın idari başkenti La Paz'dır (deniz seviyesinden yaklaşık 3.640 metre yüksekliktedir)."
  },
  {
    "id": "dyk-177",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Madagaskar adasındaki canlı türlerinin yaklaşık %90'ı dünyanın başka hiçbir yerinde doğal olarak bulunmayan endemik türlerdir."
  },
  {
    "id": "dyk-178",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Everest Dağı her yıl Hint levhasının Avrasya'ya baskısı sonucu yaklaşık 4 milimetre yükselmeye devam etmektedir."
  },
  {
    "id": "dyk-179",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Hollanda topraklarının yaklaşık dörtte biri deniz seviyesinin altındadır ve 'polder' adı verilen bentlerle korunur."
  },
  {
    "id": "dyk-180",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en küçük bağımsız devleti Vatikan'dır; yüzölçümü sadece 0.44 km² olup İstanbul'daki Gülhane Parkı kadardır."
  },
  {
    "id": "dyk-181",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Büyük Kanyon (Grand Canyon), Colorado Nehri'nin yaklaşık 6 milyon yıl boyunca kayaları aşındırmasıyla oluşmuştur."
  },
  {
    "id": "dyk-182",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Grönland dünyanın en büyük adasıdır ve yüzölçümünün %80'inden fazlası kalın buz tabakasıyla kaplıdır."
  },
  {
    "id": "dyk-183",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Japonya 6.800'den fazla adadan oluşan bir ada ülkesidir; ancak nüfusunun %95'inden fazlası 4 ana adada yaşar."
  },
  {
    "id": "dyk-184",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Sahra Çölü'nün büyüklüğü neredeyse Amerika Birleşik Devletleri'nin toplam yüzölçümüne eşittir ve 11 ülkeye yayılır."
  },
  {
    "id": "dyk-185",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Sarınehir (Huang He), taşıdığı yoğun sarı lös toprağı tortusu nedeniyle dünyanın en çok alüvyon taşıyan nehridir."
  },
  {
    "id": "dyk-186",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Kuzey Kutbu karasal bir toprak parçası olmayıp okyanus üzerindeki yüzen kalın buz tabakasıdır; Güney Kutbu ise kara üzerinde buzuldur."
  },
  {
    "id": "dyk-187",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Dünyanın en uzun kıyı şeridine sahip ülkesi 202.080 kilometre ile Kanada'dır."
  },
  {
    "id": "dyk-188",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Panama Kanalı sayesinde gemiler Güney Amerika'nın en güneyindeki tehlikeli Horn Burnu'nu dolaşmaktan kurtulup 13.000 km yol tasarrufu yapar."
  },
  {
    "id": "dyk-189",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Monako dünyada nüfus yoğunluğu en yüksek ülkedir; kilometrekareye 19.000'den fazla insan düşer."
  },
  {
    "id": "dyk-190",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Hazar Denizi, tuzlu suyu ve okyanusla bağlantısının olmaması nedeniyle teknik olarak dünyanın en büyük gölü kabul edilir."
  },
  {
    "id": "dyk-191",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Hawaii adaları deniz tabanındaki sıcak bir erimiş magma noktasının (hotspot) üzerinden Pasifik levhasının kaymasıyla zincirleme oluşmuştur."
  },
  {
    "id": "dyk-192",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Moğolistan kilometrekareye yaklaşık 2 kişi ile dünyanın nüfus yoğunluğu en düşük bağımsız ülkesidir."
  },
  {
    "id": "dyk-193",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Kafkas Dağları ve Ural Dağları geleneksel olarak Avrupa kıtası ile Asya kıtası arasındaki doğal sınırı belirler."
  },
  {
    "id": "dyk-194",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Endonezya 17.000'den fazla adasıyla dünyada en çok adaya sahip takımada devletidir ve 130 aktif volkana ev sahipliği yapar."
  },
  {
    "id": "dyk-195",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Viktorya Şelalesi (Zambiya-Zimbabve sınırı), 1.700 metre genişlik ve 108 metre yüksekliğiyle dünyanın en büyük su perdesi alanını oluşturur."
  },
  {
    "id": "dyk-196",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Yeni Zelanda'da insan nüfusu yaklaşık 5 milyon iken ülkede 25 milyondan fazla koyun yaşamaktadır."
  },
  {
    "id": "dyk-197",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "San Marino, M.S. 301 yılında kurulmuş olup dünyanın kesintisiz varlığını sürdüren en eski cumhuriyetidir."
  },
  {
    "id": "dyk-198",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Cebelitarık Boğazı Avrupa ile Afrika kıtalarını sadece 14 kilometrelik dar bir su yoluyla birbirinden ayırır."
  },
  {
    "id": "dyk-199",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "İsviçre'nin resmi bir başkenti yasal olarak yoktur; Bern kenti 'federal şehir' statüsündedir."
  },
  {
    "id": "dyk-200",
    "category": "Coğrafya & Doğa",
    "categorySlug": "cografya",
    "fact": "Kuzey Işıkları sadece Dünya'da değil; güçlü manyetik alana sahip Jüpiter ve Satürn gezegenlerinde de kutup ışıkları gözlenir."
  },
  {
    "id": "dyk-201",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "1969'da Apollo 11'i Ay'a götüren Apollo Yönlendirme Bilgisayarı (AGC) sadece 4 kilobayt RAM belleğe sahipti."
  },
  {
    "id": "dyk-202",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İnternet üzerindeki ilk web sitesi (info.cern.ch), 6 Ağustos 1991'de Tim Berners-Lee tarafından CERN'de yayına alınmıştır."
  },
  {
    "id": "dyk-203",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Tarihte ilk bilgisayar 'bug'ı (yazılım hatası), 1947'de Harvard Mark II bilgisayarının rölesine sıkışan gerçek bir güve böceğiydi."
  },
  {
    "id": "dyk-204",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Bilgisayar faresini 1964 yılında Douglas Engelbart ahşap bir blok ve iki metal tekerlek kullanarak icat etmiştir."
  },
  {
    "id": "dyk-205",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Alan Turing, 1950 yılında yayımladığı makaleyle 'Makineler düşünebilir mi?' sorusunu ortaya atmış ve Turing Testi'ni geliştirmiştir."
  },
  {
    "id": "dyk-206",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Dünyadaki ilk ticari kısa mesaj (SMS), 3 Aralık 1992'de Neil Papworth tarafından bilgisayardan cep telefonuna 'Merry Christmas' olarak gönderilmiştir."
  },
  {
    "id": "dyk-207",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "QWERTY klavye dizilimi, 1870'lerde mekanik daktilolarda hızlı yazıldığında harf kollarının birbirine takılmasını önlemek için harfleri dağıtarak tasarlanmıştır."
  },
  {
    "id": "dyk-208",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Dünyadaki ilk sabit disk 1956'da IBM tarafından üretilen RAMAC 305 idi; 5 megabayt kapasiteye sahipti ve bir buzdolabı büyüklüğündeydi."
  },
  {
    "id": "dyk-209",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Bluetooth teknolojisinin adı ve logosu, 10. yüzyılda İskandinav kabilelerini birleştiren Danimarka Kralı Harald Bluetooth'tan (Mavi Diş) gelir."
  },
  {
    "id": "dyk-210",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Wi-Fi teknolojisinin temelindeki frekans atlamalı yayılı spektrum prensibi, 1940'larda ünlü Hollywood oyuncusu Hedy Lamarr tarafından patentlenmiştir."
  },
  {
    "id": "dyk-211",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk cep telefonu araması 3 Nisan 1973'te Motorola mühendisi Martin Cooper tarafından rakip Bell Labs laboratuvarı aranarak yapılmıştır."
  },
  {
    "id": "dyk-212",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Wikipedia 15 Ocak 2001'de Jimmy Wales ve Larry Sanger tarafından kurulmuş olup bugün 300'den fazla dilde 60 milyondan fazla madde içerir."
  },
  {
    "id": "dyk-213",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Dünyada gönderilen günlük e-postaların yaklaşık %80'i spam (istenmeyen posta) olarak sınıflandırılmaktadır."
  },
  {
    "id": "dyk-214",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "YouTube'a yüklenen ilk video, sitenin kurucularından Jawed Karim'in San Diego Hayvanat Bahçesi'ndeki 18 saniyelik 'Me at the zoo' videosudur (2005)."
  },
  {
    "id": "dyk-215",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "QR Kod (Quick Response), 1994 yılında Japon Denso Wave şirketi tarafından otomotiv parçalarının üretim hattında hızlı takibi için icat edilmiştir.",
    "relatedToolSlug": "qr-kod-olusturucu",
    "relatedToolTitle": "QR Kod Oluşturucu"
  },
  {
    "id": "dyk-216",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk dijital kamera 1975 yılında Kodak mühendisi Steven Sasson tarafından yapılmıştır; 0.01 megapiksel çözünürlüğündeydi ve görüntüyü kasete 23 saniyede kaydederdi."
  },
  {
    "id": "dyk-217",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Modern mikroişlemcilerde milyarlarca transistör bulunur; tek bir transistörün boyutu birkaç nanometre olup DNA sarmalından bile küçüktür."
  },
  {
    "id": "dyk-218",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "GPS sistemi Dünya yörüngesindeki en az 24 uydudan oluşur; uyduların hassas zaman ölçümü Einstein'ın Genel Görelilik kuramına göre düzeltilir."
  },
  {
    "id": "dyk-219",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Linux işletim sistemi çekirdeği 1991 yılında Linus Torvalds tarafından hobi projesi olarak başlatılmış, bugün tüm süper bilgisayarların %100'ünde çalışmaktadır."
  },
  {
    "id": "dyk-220",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk bilgisayar oyunu Spacewar!, 1962 yılında MIT öğrencileri tarafından PDP-1 mini bilgisayarında geliştirilmiştir."
  },
  {
    "id": "dyk-221",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Transistör 1947'de Bell Laboratuvarları'nda icat edilmiş ve 20. yüzyılın tüm elektronik, bilgisayar ve uzay çağını başlatan en önemli buluş sayılmıştır."
  },
  {
    "id": "dyk-222",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk e-posta 1971'de Ray Tomlinson tarafından ARPANET üzerinden gönderilmiş ve kullanıcı adıyla sunucuyu ayırmak için '@' işareti seçilmiştir."
  },
  {
    "id": "dyk-223",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Dünyada her saniyede Google üzerinde yaklaşık 100.000 arama yapılmaktadır."
  },
  {
    "id": "dyk-224",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Kuantum bilgisayarlar klasik bitler (0 veya 1) yerine aynı anda her iki durumda bulunabilen kübitler (qubit) kullanarak karmaşık hesapları kat kat hızlı yapar."
  },
  {
    "id": "dyk-225",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Fiber optik kablolar veriyi ışık sinyalleri halinde cam lifler içinde tam iç yansıma ile taşır ve okyanus altından kıtaları bağlar."
  },
  {
    "id": "dyk-226",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk bilgisayar programcısı, 1840'larda Charles Babbage'ın Mekanik Analitik Motoru için algoritma yazan İngiliz matematikçi Ada Lovelace kabul edilir."
  },
  {
    "id": "dyk-227",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Lityum-iyon piller 1991'de ticari olarak kullanılmaya başlanmış ve hafiflikleriyle akıllı telefon ve elektrikli araç devrimini mümkün kılmıştır."
  },
  {
    "id": "dyk-228",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Barkod teknolojisi 1948'de icat edilmiş, market kasasında ilk taranan ürün 1974'te ABD'de bir paket Wrigley sakızı olmuştur."
  },
  {
    "id": "dyk-229",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Güneş panellerinin çalışma prensibi olan 'fotoelektrik etki', Albert Einstein'a 1921 Nobel Fizik Ödülü'nü kazandırmıştır."
  },
  {
    "id": "dyk-230",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk ticari süpersonik yolcu uçağı Concorde, Londra ile New York arasını 3.5 saatten kısa sürede (ses hızının 2 katında) uçabiliyordu."
  },
  {
    "id": "dyk-231",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Bugün kullandığımız modern yazıcı mürekkeplerinin litre fiyatı, dünyadaki en pahalı parfüm ve petrolden kat kat daha pahalıdır."
  },
  {
    "id": "dyk-232",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Kızılötesi uzaktan kumandayı 1956'da Robert Adler 'Zenith Space Command' adıyla geliştirmiş ve televizyon izleme alışkanlıklarını kökten değiştirmiştir."
  },
  {
    "id": "dyk-233",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "3D yazıcı teknolojisinin temelleri 1984 yılında Chuck Hull tarafından 'stereolitografi' adıyla patentlenmiştir."
  },
  {
    "id": "dyk-234",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Kriptografi biliminde kullanılan asimetrik RSA şifreleme algoritması, iki büyük asal sayının çarpımının çarpanlarına ayrılmasının zorluğuna dayanır.",
    "relatedToolSlug": "guvenli-sifre-olusturucu",
    "relatedToolTitle": "Güvenli Şifre Oluşturucu"
  },
  {
    "id": "dyk-235",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "İlk grafik kullanıcı arayüzü (GUI) ve masaüstü ikonu konsepti 1970'lerde Xerox PARC laboratuvarında geliştirilmiştir."
  },
  {
    "id": "dyk-236",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Giyilebilir ilk teknoloji örneklerinden biri, 17. yüzyıl Çin Qing Hanedanlığı döneminde parmağa yüzük olarak takılabilen minyatür abaküstür."
  },
  {
    "id": "dyk-237",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Mikrodalga fırın, 1945'te Percy Spencer'ın radar magnetronu yanında çalışırken cebindeki çikolatanın erimesini fark etmesiyle tesadüfen icat edilmiştir."
  },
  {
    "id": "dyk-238",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Ethernet yerel ağ protokolü 1973 yılında Robert Metcalfe tarafından tasarlanmış ve bilgisayarların kablo üzerinden konuşmasını sağlamıştır."
  },
  {
    "id": "dyk-239",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Uluslararası Uzay İstasyonu (ISS), insanlık tarihinin bugüne kadar inşa ettiği en pahalı tekil mühendislik yapısıdır (yaklaşık 150 milyar dolar)."
  },
  {
    "id": "dyk-240",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "fact": "Modern akıllı telefon ekranlarındaki dokunmatik algılama, parmağın ekran yüzeyindeki elektrostatik alanda yarattığı kapasitans değişimini okur."
  },
  {
    "id": "dyk-241",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "52 kartlık bir iskambil destesini kardığınızda elde ettiğiniz sıralamanın evrenin başlangıcından bu yana hiç var olmamış olma olasılığı kesindir (52! = 8×10⁶⁷).",
    "relatedToolSlug": "yuzde-hesaplama",
    "relatedToolTitle": "Yüzde Hesaplama"
  },
  {
    "id": "dyk-242",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Roma rakamlarında sıfır sayısı için bir sembol bulunmazdı; sıfır kavramı ve basamak değeri 9. yüzyılda Hârizmî tarafından yaygınlaştırılmıştır."
  },
  {
    "id": "dyk-243",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Pi sayısı (π) irrasyonel ve aşkın bir sayıdır; virgülden sonraki basamakları sonsuza kadar düzenli bir tekrar olmadan devam eder."
  },
  {
    "id": "dyk-244",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "2 sayısı hem çift hem de asal olan tek sayıdır; diğer tüm çift sayılar 2'ye bölünebildiği için asal olamaz."
  },
  {
    "id": "dyk-245",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Altın Oran (yaklaşık 1.618), Fibonacci dizisindeki ardışık iki sayının birbirine bölünmesiyle sonsuzda ulaşılan sabit orandır."
  },
  {
    "id": "dyk-246",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir odadaki 23 kişi arasında en az iki kişinin aynı gün doğmuş olma olasılığı %50'den fazladır; buna matematikte 'Doğum Günü Paradoksu' denir.",
    "relatedToolSlug": "yuzde-hesaplama",
    "relatedToolTitle": "Olasılık & Yüzde"
  },
  {
    "id": "dyk-247",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "0.999... sonsuz devirli sayısı matematiksel kanıtlarla tam olarak 1 sayısına eşittir."
  },
  {
    "id": "dyk-248",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir düzlem üzerindeki tüm haritalar, komşu bölgelerin renkleri birbirine karışmayacak şekilde en fazla 4 renkle boyanabilir (Dört Renk Teoremi)."
  },
  {
    "id": "dyk-249",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Googol sayısı 1'in yanına 100 sıfır konularak yazılan sayıdır; gözlemlenebilir evrendeki toplam atom sayısından (10⁸⁰) bile büyüktür."
  },
  {
    "id": "dyk-250",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Tavla zarlarında karşılıklı yüzlerin üzerindeki sayıların toplamı her zaman 7 eder (1-6, 2-5, 3-4)."
  },
  {
    "id": "dyk-251",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir kürenin yüzey alanı, aynı yarıçaplı dairesel kesitinin tam olarak 4 katıdır (4πr²)."
  },
  {
    "id": "dyk-252",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Pascal Üçgeni sadece kombinasyonları değil; içinde Fibonacci sayılarını, üçgensel sayıları ve fraktal desenleri de gizler."
  },
  {
    "id": "dyk-253",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Mükemmel sayı, kendisi hariç pozitif bölenlerinin toplamı kendisine eşit olan sayıdır; bilinen ilk mükemmel sayılar 6 ve 28'dir."
  },
  {
    "id": "dyk-254",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Monty Hall probleminde, üç kapıdan ikisi keçi biri araba olduğunda sunucu bir keçiyi açtıktan sonra kapıyı değiştirmek kazanma şansını 1/3'ten 2/3'e çıkarır."
  },
  {
    "id": "dyk-255",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Fraktal geometride cisimler sonsuz uzunlukta bir çevreye sahipken sonlu bir alan kaplayabilir (Koch Kar Tanesi gibi)."
  },
  {
    "id": "dyk-256",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Sıfır çift bir tam sayıdır çünkü 2'ye tam bölünür ve kalan sıfırdır."
  },
  {
    "id": "dyk-257",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Möbius şeridi tek bir yüzeyi ve tek bir kenarı olan iki boyutlu topolojik bir halkadır."
  },
  {
    "id": "dyk-258",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "2520 sayısı 1'den 10'a kadar olan tüm rakamlara kalansız bölünebilen en küçük pozitif tam sayıdır."
  },
  {
    "id": "dyk-259",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bileşik faizin üstel büyüme gücünü Albert Einstein 'Evrenin sekizinci harikası; anlayan kazanır, anlamayan öder' sözüyle özetlemiştir.",
    "relatedToolSlug": "bilesik-faiz-hesaplama",
    "relatedToolTitle": "Bileşik Faiz Hesaplama"
  },
  {
    "id": "dyk-260",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir kağıt parçasını ikiye katlama sınırı kalınlığına bağlıdır; eğer standart bir kağıt 42 kez katlanabilseydi kalınlığı Dünya ile Ay arasındaki mesafeye ulaşırdı."
  },
  {
    "id": "dyk-261",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Sonsuz sayıda asal sayı olduğunu ilk kez M.Ö. 300 civarında İskenderiyeli matematikçi Öklid kanıtlamıştır."
  },
  {
    "id": "dyk-262",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Öklid dışı geometriler (Hiperbolik ve Eliptik geometri), Einstein'ın eğri uzay-zaman kuramının temel matematiksel zeminini oluşturmuştur."
  },
  {
    "id": "dyk-263",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir pasta 3 düz bıçak darbesiyle en fazla 8 parçaya bölünebilir."
  },
  {
    "id": "dyk-264",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Kriptografide kullanılan asal sayıların basamak sayısı genellikle yüzlerce basamak uzunluğundadır."
  },
  {
    "id": "dyk-265",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Sıfır faktöriyel (0!) matematiksel tanım ve kombinasyon kuralları gereği 1'e eşittir."
  },
  {
    "id": "dyk-266",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Doğadaki ayçiçeklerinde çekirdeklerin spiral dizilişi ardışık iki Fibonacci sayısına göre dizilir ve alandan maksimum tasarruf sağlar."
  },
  {
    "id": "dyk-267",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "111.111.111 sayısı kendisiyle çarpıldığında sonuç 12.345.678.987.654.321 olan bir palindromik sayıdır."
  },
  {
    "id": "dyk-268",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Euler Özdeşliği (e^(iπ) + 1 = 0), matematiğin en önemli 5 temel sabitini (e, i, π, 1, 0) bir araya getiren en zarif denklem kabul edilir."
  },
  {
    "id": "dyk-269",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Kombinatorikte n elemanlı bir kümenin alt küme sayısı her zaman 2^n formülüyle hesaplanır."
  },
  {
    "id": "dyk-270",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Benford Yasası'na göre doğal veri setlerindeki (nüfuslar, hisse fiyatları, nehir boyları) sayıların 1 rakamıyla başlama olasılığı %30'dur."
  },
  {
    "id": "dyk-271",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Bir saatin akrebi ve yelkovanı 24 saatlik bir günde tam 22 kez üst üste gelir."
  },
  {
    "id": "dyk-272",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Kareköklü sayıların irrasyonel olduğunu kanıtlayan antik Pisagorcular efsaneye göre bu sırrı gizlemeye çalışmıştır."
  },
  {
    "id": "dyk-273",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Konveks çokyüzlülerde köşe sayısı eksi ayrıt sayısı artı yüzey sayısı her zaman 2'ye eşittir (Euler formülü: V - E + F = 2)."
  },
  {
    "id": "dyk-274",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Düzgün bir altıgen, çevresi en küçük ve alanı en büyük olan çokgen olduğu için bal arıları peteklerini altıgen inşa eder."
  },
  {
    "id": "dyk-275",
    "category": "Matematik & Sayılar",
    "categorySlug": "matematik",
    "fact": "Satrançta olası benzersiz oyun kombinasyonlarının sayısı (Shannon sayısı: ~10¹²⁰), evrendeki atom sayısından çok daha fazladır."
  },
  {
    "id": "dyk-276",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Şanlıurfa'daki Göbeklitepe, M.Ö. 9600'e tarihlenen anıtsal dikilitaşlarıyla İngiltere'deki Stonehenge'den 6.000 yıl daha eskidir."
  },
  {
    "id": "dyk-277",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Türkiye kişi başına yıllık yaklaşık 3.5 kilogramlık tüketimiyle dünyada en çok çay içilen ülkedir."
  },
  {
    "id": "dyk-278",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Dünyada iki kıta (Asya ve Avrupa) üzerine kurulu tek metropol şehri İstanbul'dur."
  },
  {
    "id": "dyk-279",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Tarihte bilinen ilk standart madeni para, M.Ö. 7. yüzyılda Batı Anadolu'da Lidyalılar tarafından basılmıştır."
  },
  {
    "id": "dyk-280",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Noel Baba olarak bilinen Aziz Nikolaos (St. Nicholas), 4. yüzyılda Antalya'nın Demre (Myra) ilçesinde yaşamış bir piskopostur."
  },
  {
    "id": "dyk-281",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Dünyanın en eski batık gemilerinden biri Antalya Kaş açıklarında bulunan ve M.Ö. 14. yüzyıla tarihlenen Uluburun Batığı'dır."
  },
  {
    "id": "dyk-282",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Anadolu, buğdayın dünyada ilk kez kültüre alınıp evcilleştirildiği Karacadağ (Diyarbakır-Şanlıurfa) bölgesine ev sahipliği yapar."
  },
  {
    "id": "dyk-283",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "İstanbul'daki Kapalıçarşı (1461), 60'tan fazla sokağı ve 4.000'e yakın dükkanıyla dünyanın en eski ve en büyük kapalı alışveriş merkezlerindendir."
  },
  {
    "id": "dyk-284",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Laleler dünyaya Hollanda'dan değil, 16. yüzyılda Osmanlı İmparatorluğu'ndan diplomatik yollarla Avrupa'ya götürülmüştür."
  },
  {
    "id": "dyk-285",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Antik Dünyanın Yedi Harikası'ndan ikisi Türkiye sınırlarındadır: Efes Artemis Tapınağı (İzmir) ve Halikarnas Mozolesi (Bodrum)."
  },
  {
    "id": "dyk-286",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Kapadokya'daki Derinkuyu Yeraltı Şehri, 8 kat derinliğiyle 20.000 kişinin hayvanları ve erzaklarıyla aylarca saklanabileceği havalandırma sistemine sahiptir."
  },
  {
    "id": "dyk-287",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Mimar Sinan, 90 yılı aşan ömründe çıraklık eseri Şehzade Camii, kalfalık eseri Süleymaniye ve ustalık eseri Selimiye Camii dahil yüzlerce eser bırakmıştır."
  },
  {
    "id": "dyk-288",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Türkiye, fındık üretiminde dünya lideridir ve küresel fındık arzının yaklaşık %65-70'ini tek başına karşılar."
  },
  {
    "id": "dyk-289",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Türk kahvesi kültürü ve geleneği, telvesiyle pişirilen tek kahve türü olarak 2013'te UNESCO Somut Olmayan Kültürel Miras Listesi'ne girmiştir."
  },
  {
    "id": "dyk-290",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "İzmir'deki Bergama (Pergamon) Antik Kenti'nde parşömen kağıdı icat edilmiş ve Mısır papirüs tekeline son verilmiştir."
  },
  {
    "id": "dyk-291",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Eski çağlarda Truva Savaşı'nın gerçekleştiği efsanevi Truva kenti, Çanakkale il sınırları içerisinde yer almaktadır."
  },
  {
    "id": "dyk-292",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Mardin taş evleri, bölgeye özgü sarı kalker taşının kolay işlenip havayla temas ettikçe sertleşmesi sayesinde yüzyıllarca ayakta kalır."
  },
  {
    "id": "dyk-293",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Nemrut Dağı zirvesindeki 2.150 metre rakımlı Kommagene Krallığı anıt heykelleri, Doğu ve Batı medeniyetlerinin sanatını birleştirir."
  },
  {
    "id": "dyk-294",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "İstanbul Boğazı altındaki Marmaray Tüneli, deniz tabanına yerleştirilen batırma tüp tüneller arasında 60 metreyle dünyanın en derinidir."
  },
  {
    "id": "dyk-295",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Türkiye'nin en uzun nehri, tamamen ülke sınırları içinde doğup Karadeniz'e dökülen 1.355 kilometrelik Kızılırmak'tır."
  },
  {
    "id": "dyk-296",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Van Gölü yaklaşık 3.713 km² yüzölçümüyle dünyanın en büyük sodalı gölüdür ve inci kefalinin dünyadaki tek yaşam alanıdır."
  },
  {
    "id": "dyk-297",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Ağrı Dağı (5.137 m), Türkiye'nin ve Ermeni Yaylası'nın en yüksek zirvesidir ve efsaneye göre Nuh'un Gemisi'nin karaya oturduğu yerdir."
  },
  {
    "id": "dyk-298",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Rize'nin Fırtına Vadisi ve Kaçkar Dağları, Türkiye'nin en çok yağış alan ve biyolojik çeşitliliği en yüksek ılıman yağmur ormanları kuşağıdır."
  },
  {
    "id": "dyk-299",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Tarsus, Hristiyanlığın yayılmasında en önemli figürlerden biri olan Tarsuslu Pavlus'un (Saint Paul) doğum yeridir."
  },
  {
    "id": "dyk-300",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Hattuşa (Çorum), M.Ö. 17. yüzyıldan itibaren Hitit İmparatorluğu'nun başkenti olmuş ve binlerce çivi yazılı kil tablet arşivine ev sahipliği yapmıştır."
  },
  {
    "id": "dyk-301",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Türkiye dünyada kuru incir, kuru kayısı ve çekirdeksiz kuru üzüm üretim ve ihracatında birinci sıradadır."
  },
  {
    "id": "dyk-302",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Efes Celsus Kütüphanesi antik Roma döneminde İskenderiye ve Bergama'dan sonra dünyanın üçüncü büyük kütüphanesiydi."
  },
  {
    "id": "dyk-303",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Pamukkale Travertenleri, kalsiyum bikarbonatça zengin 35 derece sıcaklıktaki termal suların karbondioksit uçmasıyla çökelmesi sonucu oluşmuştur."
  },
  {
    "id": "dyk-304",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Sumela Manastırı (Trabzon), Karadağ'ın sarp kayalıklarına 1.150 metre rakımda oyulmuş dünyanın en çarpıcı kaya manastırlarındandır."
  },
  {
    "id": "dyk-305",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Amasya, antik çağın ünlü coğrafyacısı ve 17 ciltlik Geographika eserinin yazarı Strabon'un doğduğu şehirdir."
  },
  {
    "id": "dyk-306",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Dalyan İztuzu Plajı, nesli tükenme tehlikesi altındaki Caretta caretta deniz kaplumbağalarının Akdeniz'deki en önemli yumurtlama alanlarındandır."
  },
  {
    "id": "dyk-307",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Safranbolu evleri, birbirinin güneşini ve manzarasını kesmeyecek şekilde eğimli arazilere yerleştirilmiş Osmanlı sivil mimarisinin zirvesidir."
  },
  {
    "id": "dyk-308",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Eskişehir'de çıkarılan lületaşı (beyaz altın), gözenekli yapısıyla dünyada yalnızca bu bölgede pipo ve süs eşyası yapımına uygun kalitede bulunur."
  },
  {
    "id": "dyk-309",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Divriği Ulu Camii ve Darüşşifası (Sivas), taş kapılarındaki asimetrik ince bezemeler ve ikindi vaktinde beliren namaz kılan insan gölgesiyle ünlüdür."
  },
  {
    "id": "dyk-310",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Tuz Gölü, Türkiye'nin tuz ihtiyacının yaklaşık %40'ını karşılar ve yaz aylarında suyun buharlaşmasıyla dev bir beyaz tuz çölüne dönüşür."
  },
  {
    "id": "dyk-311",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "İstanbul'daki Yerebatan Sarnıcı, 532 yılında Bizans İmparatoru I. Justinianus tarafından şehrin su ihtiyacını karşılamak için 336 mermer sütunla yapılmıştır."
  },
  {
    "id": "dyk-312",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Kaş ile Meis Adası arasındaki mesafe yalnızca 2.1 kilometredir ve Türkiye kıyılarından çıplak gözle net şekilde izlenir."
  },
  {
    "id": "dyk-313",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Piri Reis'in 1513 tarihli dünya haritası, ceylan derisi üzerine çizilmiş olup Güney Amerika kıyılarını ve Antarktika dağlarını şaşırtıcı doğrulukla gösterir."
  },
  {
    "id": "dyk-314",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Anıtkabir'in yapımında Türkiye'nin dört bir yanından getirilen traverten ve mermer taşlar kullanılmış; Aslanlı Yol Hitit sanat üslubunda tasarlanmıştır."
  },
  {
    "id": "dyk-315",
    "category": "Türkiye & Kültür",
    "categorySlug": "turkiye",
    "fact": "Cumhuriyet'in ilk demiryolu hamlesinde 'Demir Ağlarla Ördük Anayurdu Dört Baştan' marşı, ülkenin yerli kalkınma vizyonunu simgelemiştir."
  },
  {
    "id": "dyk-316",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Türkçe sondan eklemeli (bitişken) bir dildir; 'Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine' 70 harfli tek bir kelimedir.",
    "relatedToolSlug": "kelime-sayaci",
    "relatedToolTitle": "Kelime & Karakter"
  },
  {
    "id": "dyk-317",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "İnsan beyni 'Plasebo Etkisi' ile sahte bir ilacın işe yarayacağına inandığında gerçek endorfin ve dopamin salgılayarak ağrıyı fiziksel olarak dindirebilir."
  },
  {
    "id": "dyk-318",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Alfabedeki 'ampersand' (&) simgesi, Latincedeki 've' anlamına gelen 'et' harflerinin ligatür olarak birleşmesinden doğmuştur."
  },
  {
    "id": "dyk-319",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Dunning-Kruger Etkisi'ne göre, bir konuda az bilgiye sahip insanlar kendilerini uzman sanırken, gerçek uzmanlar bilgilerinden şüphe duymaya eğilimlidir."
  },
  {
    "id": "dyk-320",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Dünyada en çok konuşulan anadil yaklaşık 1 milyar kişiyle Mandarin Çincesidir; ikinci sırada İspanyolca, üçüncü sırada İngilizce gelir."
  },
  {
    "id": "dyk-321",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Göz bebekleri sadece ışık azaldığında değil, bir insan ilgi duyduğu ya da sevdiği birine baktığında da otomatik olarak büyür."
  },
  {
    "id": "dyk-322",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Fransızcadaki 'Deja vu' (daha önce görülmüş) hissinin tersi olan 'Jamais vu', çok iyi bilinen bir kelime veya yerin birden tamamen yabancı gelmesi durumudur."
  },
  {
    "id": "dyk-323",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Oxford İngilizce Sözlüğü'ne göre 'set' kelimesi 430'dan fazla farklı anlamıyla İngilizcede en çok anlama sahip kelimedir."
  },
  {
    "id": "dyk-324",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Müzik dinlerken tüylerin ürpermesi (frisson), beynin ödül merkezinin ani dopamin dalgası salgılamasından kaynaklanır."
  },
  {
    "id": "dyk-325",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Türkçedeki 'yoğurt' kelimesi dünya dillerine Türkçe kökeninden geçmiş ve yoğurmak eyleminden türetilmiştir."
  },
  {
    "id": "dyk-326",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "İnsanların bir şarkının melodisinin zihinlerinde durmadan tekrarlanması fenomenine psikolojide 'kulak kurdu' (earworm) denir."
  },
  {
    "id": "dyk-327",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Dünyada konuşulan yaklaşık 7.000 dilin yarısından fazlası bu yüzyılın sonuna kadar konuşucusu kalmayarak yok olma tehlikesi altındadır."
  },
  {
    "id": "dyk-328",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Mavi ışık (telefon ve bilgisayar ekranları), melatonin hormonunun salgılanmasını baskılayarak beynin gece olduğunu anlamasını geciktirir."
  },
  {
    "id": "dyk-329",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Braille alfabesi, 1824 yılında henüz 15 yaşında olan görme engelli Louis Braille tarafından 6 noktalı kabartma sistemiyle icat edilmiştir."
  },
  {
    "id": "dyk-330",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Zeigarnik Etkisi'ne göre, insan beyni tamamlanmış işlerden ziyade yarım bırakılan veya kesintiye uğrayan görevleri çok daha iyi hatırlar."
  },
  {
    "id": "dyk-331",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Kore alfabesi Hangul, 1443'te Kral Sejong tarafından halkın okuryazarlığını artırmak amacıyla dil ve ağız hareketleri incelenerek sıfırdan tasarlanmıştır."
  },
  {
    "id": "dyk-332",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Grup içinde bir kaza veya acil durumda insan sayısı arttıkça müdahale etme ihtimalinin düşmesine 'Seyirci Etkisi' (Bystander Effect) denir."
  },
  {
    "id": "dyk-333",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Esperanto, 1887'de L. L. Zamenhof tarafından uluslararası evrensel bir barış ve iletişim dili olması amacıyla yapay olarak oluşturulmuştur."
  },
  {
    "id": "dyk-334",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Bir koku aldığımızda beynimizdeki koku soğancığı hafıza ve duygu merkezleriyle (amigdala ve hipokampus) doğrudan bağlantılı olduğu için anıları canlandırır."
  },
  {
    "id": "dyk-335",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Kelimelerin zihinde renklerle veya tatlarla eşleşmesi nörolojik algı durumuna 'Sinestezi' denir."
  },
  {
    "id": "dyk-336",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Göz teması kurmak beyinde oksitosin salgılanmasını artırarak insanlar arasında empati ve güven hissini güçlendirir."
  },
  {
    "id": "dyk-337",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "İspanyolca dünyada 20'den fazla ülkenin resmi dilidir ve yaklaşık 500 milyon kişi tarafından konuşulur."
  },
  {
    "id": "dyk-338",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Kısa süreli hafıza (çalışma belleği) bir kerede ortalama yalnızca 7 (±2) bilgi parçasını tutabilir (Miller Yasası)."
  },
  {
    "id": "dyk-339",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Eski Türkçede yönler renklerle adlandırılırdı: Kuzey kara, Güney kızıl, Doğu gök, Batı ak (Karadeniz ve Akdeniz isimleri buradan gelir)."
  },
  {
    "id": "dyk-340",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Tebessüm etmek, beynin yüz kaslarından aldığı geri bildirimle (yüz ifadesi geri bildirim hipotezi) ruh halini anlık olarak yükseltebilir."
  },
  {
    "id": "dyk-341",
    "category": "Dil & Psikoloji",
    "categorySlug": "dil",
    "fact": "Noktalama işaretlerinden soru işareti (?), Latincedeki 'soru' anlamına gelen 'questio' kelimesinin baş ve son harflerinin (q ve o) üst üste gelmesinden evrilmiştir."
  },
  {
    "id": "dyk-342",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Karar yorgunluğu (Decision fatigue), gün boyu çok sayıda karar veren bir bireyin zihinsel tükeniş yaşayarak mantıksız kararlara yönelmesidir."
  },
  {
    "id": "dyk-343",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Güneş ışığı almak vücutta serotonin salgısını uyararak mevsimsel depresyon riskini önemli ölçüde düşürür."
  },
  {
    "id": "dyk-344",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "Sosyal medyada gördüklerini kaçırma korkusu psikolojide FOMO (Fear of Missing Out) olarak tanımlanır."
  },
  {
    "id": "dyk-345",
    "category": "Dil & Psikoloji",
    "categorySlug": "psikoloji",
    "fact": "El yazısıyla not tutmak, klavyeyle yazmaya kıyasla bilginin zihinde işlenmesini ve kavramsal öğrenmeyi daha çok artırır."
  },
  {
    "id": "dyk-346",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Dünyadaki toplam para arzının yaklaşık %90'ından fazlası fiziksel banknot ve madeni para değil, banka sistemlerindeki dijital kayıtlardır."
  },
  {
    "id": "dyk-347",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Tarihteki ilk spekülatif ekonomik balon 1637 yılında Hollanda'da tek bir lale soğanının lüks bir ev fiyatına satıldığı 'Lale Çılgınlığı'dır."
  },
  {
    "id": "dyk-348",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Kağıt para ilk kez 7. yüzyılda Tang Hanedanlığı döneminde Çin'de tüccarların ağır bakır paraları taşımamak istemesi üzerine icat edilmiştir."
  },
  {
    "id": "dyk-349",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Bileşik faiz hesaplamasında paranızın ikiye katlanma süresini bulmak için 72 sayısını yıllık faiz oranına bölmek yeterlidir (72 Kuralı).",
    "relatedToolSlug": "bilesik-faiz-hesaplama",
    "relatedToolTitle": "Bileşik Faiz Hesaplama"
  },
  {
    "id": "dyk-350",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "İpek Yolu, Doğu Asya'dan Akdeniz'e kadar uzanan binlerce kilometrelik rotada sadece ipek ve baharat değil, kağıt ve pusula gibi teknolojileri de taşımıştır."
  },
  {
    "id": "dyk-351",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Dünyanın en eski aktif menkul kıymetler borsası 1602 yılında Amsterdam'da Hollanda Doğu Hindistan Şirketi hisselerini işlemeye açmıştır."
  },
  {
    "id": "dyk-352",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Birleşik Krallık sterlini (Pound Sterling), 1200 yıldan uzun süredir kesintisiz kullanılan dünyanın en eski para birimidir."
  },
  {
    "id": "dyk-353",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Enflasyon, paranın satın alma gücünün zamanla erimesidir; yıllık %10 enflasyonda paranızın değeri yaklaşık 7 yılda yarıya iner.",
    "relatedToolSlug": "enflasyon-hesaplama",
    "relatedToolTitle": "Enflasyon Hesaplama"
  },
  {
    "id": "dyk-354",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Altın rezervi en yüksek ülke yaklaşık 8.133 ton altınla Amerika Birleşik Devletleri'dir (Fort Knox ve New York Fed kasalarında tutulur)."
  },
  {
    "id": "dyk-355",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Modern bankacılık kavramı Orta Çağ İtalyan tüccarlarının pazarlarda kurduğu para değiştirme tezgahlarından (banco) türemiştir."
  },
  {
    "id": "dyk-356",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Dünyadaki ilk merkez bankası 1668 yılında kurulan İsveç Merkez Bankası (Sveriges Riksbank) kabul edilir."
  },
  {
    "id": "dyk-357",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Görünmez El teorisi, 1776'da Adam Smith tarafından serbest piyasada bireylerin kendi çıkarlarını gözetirken toplumsal refahı artırmasını açıklar."
  },
  {
    "id": "dyk-358",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Monopoly masa oyunu, 1903 yılında Elizabeth Magie tarafından kontrolsüz tekelciliğin tehlikelerini anlatmak için 'The Landlord's Game' adıyla tasarlanmıştır."
  },
  {
    "id": "dyk-359",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Hiperenflasyonun en uç örneği 1946'da Macaristan'da yaşanmış ve fiyatlar her 15 saatte bir ikiye katlanmıştır."
  },
  {
    "id": "dyk-360",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Tahvil bir borçlanma senediyken, hisse senedi bir şirketin mülkiyet ortaklığını ve kâr payı hakkını temsil eder."
  },
  {
    "id": "dyk-361",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Bretton Woods Konferansı ile 1944'te ABD Doları altına endekslenmiş ve IMF ile Dünya Bankası kurulmuştur."
  },
  {
    "id": "dyk-362",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "1971'de Nixon Şoku ile ABD dolarının altına çevrilebilirliği kaldırılmış ve küresel para sistemi 'itibari para' (fiat para) düzenine geçmiştir."
  },
  {
    "id": "dyk-363",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Gresham Yasası'na göre 'kötü para iyi parayı kovar'; dolaşımda değeri düşük para harcanırken değeri yüksek para (altın/gümüş) kasada saklanır."
  },
  {
    "id": "dyk-364",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Kredi kartının atası sayılan Diners Club kartı, 1950'de Frank McNamara'nın bir restoranda cüzdanını unutup hesap ödeyememesi üzerine doğmuştur."
  },
  {
    "id": "dyk-365",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Pareto İlkesi (80/20 Kuralı), birçok alanda sonuçların %80'inin girdilerin veya sebeplerin %20'sinden kaynaklandığını öne sürer.",
    "relatedToolSlug": "yuzde-hesaplama",
    "relatedToolTitle": "Yüzde Hesabı"
  },
  {
    "id": "dyk-366",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "SWIFT bankalararası iletişim ağı 1973'te Brüksel'de kurulmuş ve ülkeler arası döviz transferlerinin güvenli mesajlaşma standardı olmuştur."
  },
  {
    "id": "dyk-367",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Madeni paraların kenarlarındaki tırtıklar, eskiden insanların paranın kenarındaki değerli altını/gümüşü tıraşlamasını engellemek için Isaac Newton tarafından önerilmiştir."
  },
  {
    "id": "dyk-368",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Türkiye Cumhuriyeti Merkez Bankası (TCMB) 3 Ekim 1931 tarihinde faaliyete geçmiş ve ilk Türk banknotlarını emisyona sunmuştur."
  },
  {
    "id": "dyk-369",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Tüketici Fiyat Endeksi (TÜFE), ortalama bir hanehalkının tükettiği belirli bir mal ve hizmet sepetinin fiyat değişimini ölçer."
  },
  {
    "id": "dyk-370",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "KDV (Katma Değer Vergisi), ilk kez 1954 yılında Fransa'da Maurice Lauré tarafından vergi kaçakçılığını azaltmak için tasarlanmıştır.",
    "relatedToolSlug": "kdv-hesaplama",
    "relatedToolTitle": "KDV Hesaplama"
  },
  {
    "id": "dyk-371",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Barter (takas sistemi), para icat edilmeden önce malların ve hizmetlerin doğrudan birbiriyle değiştirildiği ilk ticaret biçimidir."
  },
  {
    "id": "dyk-372",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Bitcoin'in yaratıcısı Satoshi Nakamoto'nun kimliği günümüzde hâlâ kesin olarak bilinmemektedir."
  },
  {
    "id": "dyk-373",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Dünya Ticaret Örgütü (DTÖ), 1995 yılında GATT anlaşmasının yerini alarak uluslararası ticaret kurallarını düzenleyen ana merci olmuştur."
  },
  {
    "id": "dyk-374",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Giffen malı, fiyatı arttıkça talebi de artan (ekmek veya patates gibi temel geçim gıdaları) istisnai bir iktisadi mal türüdür."
  },
  {
    "id": "dyk-375",
    "category": "Ekonomi & Finans",
    "categorySlug": "ekonomi",
    "fact": "Fırsat maliyeti, bir tercihte bulunurken vazgeçilen en iyi ikinci alternatifin sağladığı potansiyel faydadır."
  }
];

/**
 * Deterministic day of year (0 to 365)
 */
export function getDayOfYear(date: Date = new Date()): number {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const currentDay = new Date(year, date.getMonth(), date.getDate());
  const diff = currentDay.getTime() - startOfYear.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

/**
 * Deterministic daily fact based on day of year
 */
export function getDailyFact(date: Date = new Date()): DidYouKnowItem {
  const dayIndex = getDayOfYear(date);
  const index = Math.abs(dayIndex) % DID_YOU_KNOW_ITEMS.length;
  return DID_YOU_KNOW_ITEMS[index];
}

/**
 * Find relevant fact for a tool or category
 */
export function getFactForTool(toolSlug: string, categorySlug?: string): DidYouKnowItem | null {
  const toolMatch = DID_YOU_KNOW_ITEMS.find((item) => item.relatedToolSlug === toolSlug);
  if (toolMatch) return toolMatch;

  if (categorySlug) {
    const categoryMatches = DID_YOU_KNOW_ITEMS.filter(
      (item) => item.categorySlug === categorySlug
    );
    if (categoryMatches.length > 0) {
      return categoryMatches[0];
    }
  }

  return getDailyFact();
}
