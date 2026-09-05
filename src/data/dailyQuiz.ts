export interface QuizQuestion {
  id: string;
  category: string;
  categorySlug: string;
  question: string;
  options: string[]; // 4 options [A, B, C, D]
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  relatedToolSlug?: string;
  relatedToolTitle?: string;
  relatedHistoryDate?: { month: number; day: number };
}

export const QUIZ_CATEGORIES = [
  { slug: 'tarih', label: 'Tarih' },
  { slug: 'bilim', label: 'Bilim & Doğa' },
  { slug: 'cografya', label: 'Coğrafya' },
  { slug: 'genel-kultur', label: 'Genel Kültür' },
  { slug: 'matematik', label: 'Matematik & Mantık' },
  { slug: 'teknoloji', label: 'Teknoloji' },
  { slug: 'turkiye', label: 'Türkiye' },
  { slug: 'sanat', label: 'Sanat & Kültür' },
] as const;

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    "id": "quiz-1",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş Sistemi'ndeki en büyük gezegen hangisidir?",
    "options": [
      "Satürn",
      "Jüpiter",
      "Neptün",
      "Uranüs"
    ],
    "correctIndex": 1,
    "explanation": "Jüpiter, sistemdeki diğer tüm gezegenlerin toplam kütlesinin 2.5 katı kütleye sahiptir."
  },
  {
    "id": "quiz-2",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en uzun nehri aşağıdakilerden hangisidir?",
    "options": [
      "Amazon Nehri",
      "Nil Nehri",
      "Mississippi Nehri",
      "Yangtze Nehri"
    ],
    "correctIndex": 1,
    "explanation": "Nil Nehri yaklaşık 6.650 km uzunluğuyla dünyanın en uzun nehri kabul edilir."
  },
  {
    "id": "quiz-3",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin yüz ölçümü bakımından en büyük gölü hangisidir?",
    "options": [
      "Tuz Gölü",
      "Van Gölü",
      "Beyşehir Gölü",
      "İznik Gölü"
    ],
    "correctIndex": 1,
    "explanation": "Van Gölü, yaklaşık 3.713 km² yüzölçümüyle Türkiye'nin en büyük gölüdür."
  },
  {
    "id": "quiz-4",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Everest Tepesi hangi sıradağlar üzerinde yer alır?",
    "options": [
      "Alpler",
      "And Dağları",
      "Himalayalar",
      "Kafkaslar"
    ],
    "correctIndex": 2,
    "explanation": "Everest Dağı (8.848 m), Nepal ile Çin (Tibet) sınırında Himalayalar üzerindedir."
  },
  {
    "id": "quiz-5",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en büyük okyanusu hangisidir?",
    "options": [
      "Atlantik Okyanusu",
      "Hint Okyanusu",
      "Büyük Okyanus",
      "Arktik Okyanusu"
    ],
    "correctIndex": 2,
    "explanation": "Pasifik Okyanusu, tüm kıtaların toplam kara alanından daha büyük bir yüzölçümüne sahiptir."
  },
  {
    "id": "quiz-6",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin kıyı şeridi en uzun olan coğrafi bölgesi hangisidir?",
    "options": [
      "Karadeniz Bölgesi",
      "Akdeniz Bölgesi",
      "Ege Bölgesi",
      "Marmara Bölgesi"
    ],
    "correctIndex": 2,
    "explanation": "Ege Bölgesi, çok sayıda koy, körfez ve yarımadaya sahip girintili çıkıntılı yapısıyla en uzun."
  },
  {
    "id": "quiz-7",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Yüzölçümü bakımından dünyanın en büyük ülkesi hangisidir?",
    "options": [
      "Kanada",
      "Çin",
      "ABD",
      "Rusya"
    ],
    "correctIndex": 3,
    "explanation": "Rusya Federasyonu, yaklaşık 17.1 milyon km² yüzölçümüyle dünyanın en geniş ülkesidir."
  },
  {
    "id": "quiz-8",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en büyük sıcak çölü hangisidir?",
    "options": [
      "Gobi Çölü",
      "Kalahari Çölü",
      "Sahra Çölü",
      "Atacama Çölü"
    ],
    "correctIndex": 2,
    "explanation": "Sahra Çölü, yaklaşık 9.2 milyon km² yüzölçümüyle Kuzey Afrika'nın büyük bölümünü kaplar."
  },
  {
    "id": "quiz-9",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Avrupa ile Asya kıtalarını birbirinden ayıran doğal kara sınırı kabul edilen dağ sırası hangisidir?",
    "options": [
      "Ural Dağları",
      "Alpler",
      "Pireneler",
      "Karpatlar"
    ],
    "correctIndex": 0,
    "explanation": "Ural Dağları, coğrafi olarak Avrupa ve Asya arasındaki geleneksel kara sınırını oluşturur."
  },
  {
    "id": "quiz-10",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Afrika kıtasının en yüksek noktası olan dağ hangisidir?",
    "options": [
      "Kenya Dağı",
      "Kilimanjaro Dağı",
      "Atlas Dağları",
      "Ruwenzori Dağı"
    ],
    "correctIndex": 1,
    "explanation": "Tanzanya'da bulunan Kilimanjaro Dağı, 5.895 metre yüksekliğiyle kıtanın en yüksek zirvesidir."
  },
  {
    "id": "quiz-11",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İki kıtaya yayılan dünyadaki tek boğaz şehri hangisidir?",
    "options": [
      "Kahire",
      "İstanbul",
      "Süveyş",
      "Cebelitarık"
    ],
    "correctIndex": 1,
    "explanation": "İstanbul, hem Asya hem de Avrupa kıtasında yer alan dünyadaki tek metropol şehirdir."
  },
  {
    "id": "quiz-12",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en derin gölü olan Baykal Gölü hangi ülkededir?",
    "options": [
      "Kanada",
      "Finlandiya",
      "Rusya",
      "Kazakistan"
    ],
    "correctIndex": 2,
    "explanation": "Baykal Gölü, 1.642 metre derinliğiyle Rusya'nın Sibirya bölgesinde yer alır."
  },
  {
    "id": "quiz-13",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Avustralya'nın başkenti aşağıdakilerden hangisidir?",
    "options": [
      "Sidney",
      "Melbourne",
      "Canberra",
      "Brisbane"
    ],
    "correctIndex": 2,
    "explanation": "Avustralya'nın başkenti, Sidney ile Melbourne arasındaki çekişmeyi bitirmek için kurulan."
  },
  {
    "id": "quiz-14",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Cebelitarık Boğazı hangi iki denizi/okyanusu birbirine bağlar?",
    "options": [
      "Akdeniz - Atlantik",
      "Kızıldeniz - Hint",
      "Karadeniz - Ege",
      "Baltık - Kuzey Denizi"
    ],
    "correctIndex": 0,
    "explanation": "Cebelitarık Boğazı, Akdeniz'i Atlas (Atlantik) Okyanusu'na bağlayan stratejik geçittir."
  },
  {
    "id": "quiz-15",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Güney Amerika kıtasının en uzun sıradağları hangisidir?",
    "options": [
      "Kayalık Dağları",
      "And Dağları",
      "Alpler",
      "Atlas Dağları"
    ],
    "correctIndex": 1,
    "explanation": "And Dağları, yaklaşık 7.000 kilometre boyunca kıtanın batı kıyısı boyunca uzanır."
  },
  {
    "id": "quiz-16",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Deniz seviyesinin en altında yer alan en tuzlu göl hangisidir?",
    "options": [
      "Hazar Denizi",
      "Lut Gölü",
      "Aral Gölü",
      "Baykal Gölü"
    ],
    "correctIndex": 1,
    "explanation": "Lut Gölü, deniz seviyesinden yaklaşık 430 metre aşağıda olup yüksek tuzluluk oranıyla bilinir."
  },
  {
    "id": "quiz-17",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Japonya'nın en yüksek ve en kutsal sayılan dağı hangisidir?",
    "options": [
      "Fuji Dağı",
      "Kita Dağı",
      "Hida Dağları",
      "Tate Dağı"
    ],
    "correctIndex": 0,
    "explanation": "Fuji Dağı (3.776 m), Tokyo yakınlarında yer alan simgesel bir stratovolkandır."
  },
  {
    "id": "quiz-18",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyada en fazla zaman dilimine sahip ülke hangisidir?",
    "options": [
      "Rusya",
      "ABD",
      "Fransa",
      "Çin"
    ],
    "correctIndex": 2,
    "explanation": "Fransa, denizaşırı toprakları sayesinde toplam 12 farklı zaman dilimine sahiptir."
  },
  {
    "id": "quiz-19",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin en yüksek dağı hangisidir?",
    "options": [
      "Süphan Dağı",
      "Erciyes Dağı",
      "Ağrı Dağı",
      "Kaçkar Dağı"
    ],
    "correctIndex": 2,
    "explanation": "Ağrı Dağı, 5.137 metre yüksekliğiyle Türkiye'nin en yüksek noktasıdır."
  },
  {
    "id": "quiz-20",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Amazon Nehri hangi okyanusa dökülür?",
    "options": [
      "Büyük Okyanus",
      "Atlantik Okyanusu",
      "Hint Okyanusu",
      "Arktik Okyanusu"
    ],
    "correctIndex": 1,
    "explanation": "Amazon Nehri, Güney Amerika kıtasını batıdan doğuya katederek Atlas Okyanusu'na dökülür."
  },
  {
    "id": "quiz-21",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Kuzey Kutbu ile Güney Kutbu arasındaki en temel coğrafi fark nedir?",
    "options": [
      "Kuzey kara, Güney deniz",
      "Kuzey deniz, Güney kara",
      "Kuzey daha soğuk",
      "Güneyde penguen yok"
    ],
    "correctIndex": 1,
    "explanation": "Kuzey Kutbu Arktik Okyanusu üzerindeki deniz buzudur."
  },
  {
    "id": "quiz-22",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Kanada'nın başkenti aşağıdakilerden hangisidir?",
    "options": [
      "Toronto",
      "Montreal",
      "Vancouver",
      "Ottawa"
    ],
    "correctIndex": 3,
    "explanation": "Kanada'nın başkenti Ontario eyaletinde bulunan Ottawa kentidir."
  },
  {
    "id": "quiz-23",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de rüzgâr erozyonu ve kumul alanı en belirgin il neresidir?",
    "options": [
      "Konya (Karapınar)",
      "Şanlıurfa",
      "Iğdır",
      "Aksaray"
    ],
    "correctIndex": 0,
    "explanation": "Konya'nın Karapınar ilçesi, Türkiye'de rüzgar erozyonunun en şiddetli yaşandığı kumul alanıdır."
  },
  {
    "id": "quiz-24",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İzlanda hangi okyanusta yer alan volkanik bir ada ülkesidir?",
    "options": [
      "Büyük Okyanus",
      "Hint Okyanusu",
      "Kuzey Atlantik",
      "Güney Okyanusu"
    ],
    "correctIndex": 2,
    "explanation": "İzlanda, Kuzey Atlantik Okyanusu'nda Orta Atlantik Sırtı üzerinde yer alan volkanik bir adadır."
  },
  {
    "id": "quiz-25",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın yüzölçümü bakımından en küçük bağımsız devleti hangisidir?",
    "options": [
      "Monako",
      "Nauru",
      "San Marino",
      "Vatikan"
    ],
    "correctIndex": 3,
    "explanation": "Vatikan, 0.44 km² yüzölçümü ve Roma içindeki konumuyla dünyanın en küçük devletidir."
  },
  {
    "id": "quiz-26",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Panama Kanalı hangi iki okyanusu birbirine bağlar?",
    "options": [
      "Atlantik - Pasifik",
      "Atlantik - Hint",
      "Pasifik - Arktik",
      "Hint - Akdeniz"
    ],
    "correctIndex": 0,
    "explanation": "Panama Kanalı, Orta Amerika'da Atlas Okyanusu ile Büyük Okyanusu (Pasifik) birbirine bağlar."
  },
  {
    "id": "quiz-27",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Süveyş Kanalı hangi iki denizi birbirine bağlar?",
    "options": [
      "Karadeniz ile Ege",
      "Akdeniz - Kızıldeniz",
      "Hazar - Karadeniz",
      "Baltık - Kuzey Denizi"
    ],
    "correctIndex": 1,
    "explanation": "1869'da açılan Süveyş Kanalı, Akdeniz ile Kızıldeniz'i birbirine bağlayarak Asya yolunu kısaltmıştır."
  },
  {
    "id": "quiz-28",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Brezilya'nın resmi dili aşağıdakilerden hangisidir?",
    "options": [
      "İspanyolca",
      "Portekizce",
      "İngilizce",
      "Fransızca"
    ],
    "correctIndex": 1,
    "explanation": "Brezilya, Güney Amerika'da resmi dili Portekizce olan tek ülkedir."
  },
  {
    "id": "quiz-29",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İsviçre'nin ulusal para birimi hangisidir?",
    "options": [
      "Euro",
      "İsviçre Frangı",
      "Sterlin",
      "Kron"
    ],
    "correctIndex": 1,
    "explanation": "İsviçre, Avrupa Birliği üyesi olmadığı için kendi para birimi olan İsviçre Frangı'nı (CHF) kullanır."
  },
  {
    "id": "quiz-30",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin en uzun kara sınırına sahip olduğu komşu ülke hangisidir?",
    "options": [
      "İran",
      "Irak",
      "Suriye",
      "Yunanistan"
    ],
    "correctIndex": 2,
    "explanation": "Türkiye'nin en uzun kara sınırı yaklaşık 911 kilometre ile Suriye sınırıdır."
  },
  {
    "id": "quiz-31",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Grönland adası siyasi olarak hangi ülkeye bağlı özerk bölgedir?",
    "options": [
      "Kanada",
      "Norveç",
      "Danimarka",
      "İzlanda"
    ],
    "correctIndex": 2,
    "explanation": "Grönland, coğrafi olarak Kuzey Amerika'ya ait olsa da siyasi olarak Danimarka Krallığı'na bağlıdır."
  },
  {
    "id": "quiz-32",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en kalabalık ada devleti hangisidir?",
    "options": [
      "Madagaskar",
      "Endonezya",
      "Japonya",
      "İngiltere"
    ],
    "correctIndex": 1,
    "explanation": "Endonezya, 275 milyondan fazla nüfusuyla dünyanın en kalabalık ada ülkesidir."
  },
  {
    "id": "quiz-33",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Kuzey Yarımküre'de en uzun gündüz hangi tarihte yaşanır?",
    "options": [
      "21 Mart",
      "21 Haziran",
      "23 Eylül",
      "21 Aralık"
    ],
    "correctIndex": 1,
    "explanation": "21 Haziran yaz gündönümünde Güneş ışınları Yengeç Dönencesi'ne dik gelir ve en uzun gündüz yaşanır."
  },
  {
    "id": "quiz-34",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Ekvator çizgisi aşağıdaki kıtaların hangisinden geçmez?",
    "options": [
      "Güney Amerika",
      "Afrika",
      "Asya",
      "Avrupa"
    ],
    "correctIndex": 3,
    "explanation": "Ekvator çizgisi Avrupa kıtasından geçmez; Güney Amerika, Afrika ve Güneydoğu Asya adalarından geçer."
  },
  {
    "id": "quiz-35",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Gece ile gündüzün eşit olduğu ekinoks tarihleri hangileridir?",
    "options": [
      "21 Mart - 23 Eylül",
      "21 Haziran - 21 Aralık",
      "1 Ocak - 1 Temmuz",
      "23 Nisan - 29 Ekim"
    ],
    "correctIndex": 0,
    "explanation": "21 Mart ve 23 Eylül ekinoks tarihlerinde Dünya'nın her yerinde gece ve gündüz süreleri eşittir."
  },
  {
    "id": "quiz-36",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İspanya ile Fransa arasındaki doğal sınır sıradağları hangisidir?",
    "options": [
      "Alpler",
      "Pireneler",
      "Apeninler",
      "Karpatlar"
    ],
    "correctIndex": 1,
    "explanation": "Pireneler Dağları, İber Yarımadası ile Avrupa anakarasını birbirinden ayırır."
  },
  {
    "id": "quiz-37",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en yüksek kesintisiz şelalesi olan Angel Şelalesi nerededir?",
    "options": [
      "Brezilya",
      "Venezuela",
      "Arjantin",
      "Kolombiya"
    ],
    "correctIndex": 1,
    "explanation": "Angel Şelalesi (979 m), Venezuela'nın Canaima Milli Parkı'nda yer alır."
  },
  {
    "id": "quiz-38",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Akdeniz'in yüzölçümü en büyük adası hangisidir?",
    "options": [
      "Girit",
      "Kıbrıs",
      "Korsika",
      "Sicilya"
    ],
    "correctIndex": 3,
    "explanation": "İtalya'ya bağlı Sicilya adası, yaklaşık 25.700 km² yüzölçümüyle Akdeniz'in en büyük adasıdır."
  },
  {
    "id": "quiz-39",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Büyük Set Resifi (Great Barrier Reef) hangi ülkededir?",
    "options": [
      "Endonezya",
      "Avustralya",
      "Filipinler",
      "Meksika"
    ],
    "correctIndex": 1,
    "explanation": "Büyük Set Resifi, Avustralya'nın kuzeydoğu kıyısında bulunan dünyanın en büyük mercan resif."
  },
  {
    "id": "quiz-40",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de çay tarımının neredeyse tamamı hangi bölgededir?",
    "options": [
      "Doğu Karadeniz",
      "Batı Karadeniz",
      "Güney Marmara",
      "Çukurova"
    ],
    "correctIndex": 0,
    "explanation": "Çay bitkisi bol nem ve yağış istediği için Rize, Trabzon ve Artvin kıyılarında yetiştirilir."
  },
  {
    "id": "quiz-41",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Güneş'in 24 saat batmadığı 'Geceyarısı Güneşi' nerede görülür?",
    "options": [
      "Ekvator Kuşağı",
      "Kutup Daireleri",
      "Dönenceler",
      "Ilıman Kuşak"
    ],
    "correctIndex": 1,
    "explanation": "Kutup dairelerinin kuzeyinde ve güneyinde yaz aylarında Güneş 24 saat boyunca ufkun altına inmez."
  },
  {
    "id": "quiz-42",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en kurak çölü kabul edilen Atacama Çölü hangi kıtadadır?",
    "options": [
      "Afrika",
      "Güney Amerika",
      "Asya",
      "Avustralya"
    ],
    "correctIndex": 1,
    "explanation": "Atacama Çölü, Güney Amerika'da Şili'nin kuzeyinde Pasifik kıyısında yer alır."
  },
  {
    "id": "quiz-43",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Fas, Tunus ve Cezayir'in oluşturduğu Kuzeybatı Afrika bölgesine ne denir?",
    "options": [
      "Mağrip",
      "Meşrık",
      "Sahel",
      "Levant"
    ],
    "correctIndex": 0,
    "explanation": "Arapçada 'batı' anlamına gelen Mağrip, Kuzeybatı Afrika ülkelerini tanımlar."
  },
  {
    "id": "quiz-44",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin UNESCO Listesi'ndeki ilk karma miras alanı neresidir?",
    "options": [
      "Göreme - Kapadokya",
      "Pamukkale-Hierapolis",
      "Efes",
      "Nemrut Dağı"
    ],
    "correctIndex": 0,
    "explanation": "1985 yılında listeye alınan Göreme ve Kapadokya, Türkiye'nin ilk karma dünya mirasıdır."
  },
  {
    "id": "quiz-45",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en derin okyanus çukuru olan Mariana Çukuru nerededir?",
    "options": [
      "Atlantik",
      "Büyük Okyanus",
      "Hint",
      "Arktik"
    ],
    "correctIndex": 1,
    "explanation": "Mariana Çukuru, Batı Pasifik Okyanusu'nda Mariana Adaları'nın doğusunda yer alır."
  },
  {
    "id": "quiz-46",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Karadeniz'i Marmara Denizi'ne bağlayan su yolu hangisidir?",
    "options": [
      "Çanakkale Boğazı",
      "İstanbul Boğazı",
      "Kerç Boğazı",
      "Korint Kanalı"
    ],
    "correctIndex": 1,
    "explanation": "İstanbul Boğazı, Karadeniz havzasını Marmara Denizi ve Akdeniz'e bağlayan tek doğal boğazdır."
  },
  {
    "id": "quiz-47",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Almanya Federal Cumhuriyeti'nin başkenti neresidir?",
    "options": [
      "Münih",
      "Frankfurt",
      "Berlin",
      "Hamburg"
    ],
    "correctIndex": 2,
    "explanation": "Almanya Federal Cumhuriyeti'nin başkenti ve en kalabalık kenti Berlin'dir."
  },
  {
    "id": "quiz-48",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Kızıldeniz ile Akdeniz'i birbirine bağlayan yapay su yolu hangisidir?",
    "options": [
      "Kiel Kanalı",
      "Panama Kanalı",
      "Süveyş Kanalı",
      "Karakum Kanalı"
    ],
    "correctIndex": 2,
    "explanation": "Mısır topraklarında yer alan Süveyş Kanalı 1869'da uluslararası ulaşıma açılmıştır."
  },
  {
    "id": "quiz-49",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Yunanistan'ın resmi para birimi hangisidir?",
    "options": [
      "Drahmi",
      "Euro",
      "Lek",
      "Dinar"
    ],
    "correctIndex": 1,
    "explanation": "Yunanistan, 2001 yılında Euro bölgesine dahil olarak resmi para birimi olarak Euro'ya geçmiştir."
  },
  {
    "id": "quiz-50",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Aşağıdaki ülkelerden hangisinin Hazar Denizi'ne kıyısı yoktur?",
    "options": [
      "Azerbaycan",
      "Rusya",
      "İran",
      "Türkiye"
    ],
    "correctIndex": 3,
    "explanation": "Türkiye'nin Hazar Denizi'ne doğrudan kıyısı yoktur."
  },
  {
    "id": "quiz-51",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Işığın boşluktaki yayılma hızı saniyede yaklaşık kaç kilometredir?",
    "options": [
      "150.000 km/s",
      "200.000 km/s",
      "300.000 km/s",
      "500.000 km/s"
    ],
    "correctIndex": 2,
    "explanation": "Işığın boşluktaki hızı evrensel sabit olup saniyede yaklaşık 299.792 km'dir."
  },
  {
    "id": "quiz-52",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Periyodik tabloda 'Fe' sembolü ile gösterilen kimyasal element hangisidir?",
    "options": [
      "Flor",
      "Demir",
      "Fosfor",
      "Frankiyum"
    ],
    "correctIndex": 1,
    "explanation": "Demir elementinin simgesi Latincedeki 'Ferrum' kelimesinden gelen Fe'dir."
  },
  {
    "id": "quiz-53",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "İnsan vücudundaki en büyük organ hangisidir?",
    "options": [
      "Karaciğer",
      "Deri",
      "Akciğer",
      "Beyin"
    ],
    "correctIndex": 1,
    "explanation": "Deri, yaklaşık 2 metrekare yüzey alanı ve toplam ağırlığıyla insan vücudunun en büyük organıdır."
  },
  {
    "id": "quiz-54",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Suyun 1 atm basınçta kaynama noktası kaç °C'dir?",
    "options": [
      "90°C",
      "100°C",
      "110°C",
      "120°C"
    ],
    "correctIndex": 1,
    "explanation": "Saf su, deniz seviyesinde (1 atm basınçta) tam 100°C sıcaklıkta kaynar."
  },
  {
    "id": "quiz-55",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Bitkilerin güneş ışığını kullanarak besin ve oksijen üretmesi sürecine nedir?",
    "options": [
      "Solunum",
      "Fotosentez",
      "Fermantasyon",
      "Terleme"
    ],
    "correctIndex": 1,
    "explanation": "Fotosentez, klorofil pigmenti sayesinde ışık enerjisinin kimyasal enerjiye dönüştürülmesidir."
  },
  {
    "id": "quiz-56",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Havadaki gazların yaklaşık %78'ini oluşturan en bol gaz hangisidir?",
    "options": [
      "Oksijen",
      "Azot (Nitrojen)",
      "Karbondioksit",
      "Argon"
    ],
    "correctIndex": 1,
    "explanation": "Dünya atmosferinin hacimce yaklaşık %78'i azot, %21'i oksijen gazından oluşur."
  },
  {
    "id": "quiz-57",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "DNA'nın çift sarmal yapısını 1953 keşfeden bilim insanları kimlerdir?",
    "options": [
      "Watson ve Crick",
      "Newton ve Galileo",
      "Pasteur ve Koch",
      "Darwin ve Mendel"
    ],
    "correctIndex": 0,
    "explanation": "James Watson ve Francis Crick, Rosalind Franklin'in X-ışını verilerinden yararlanarak DNA."
  },
  {
    "id": "quiz-58",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Kuduz aşısını ve pastörizasyon yöntemini geliştiren ünlü Fransız mikrobiyolog kimdir?",
    "options": [
      "Louis Pasteur",
      "Robert Koch",
      "Alexander Fleming",
      "Edward Jenner"
    ],
    "correctIndex": 0,
    "explanation": "Louis Pasteur, mikroorganizmaların hastalıklara yol açtığını kanıtlamış ve kuduz aşısını bulmuştur."
  },
  {
    "id": "quiz-59",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Yerçekimi Kanunu'nu formüle eden ve Principia eserini yazan İngiliz fizikçi kimdir?",
    "options": [
      "Albert Einstein",
      "Isaac Newton",
      "Niels Bohr",
      "Michael Faraday"
    ],
    "correctIndex": 1,
    "explanation": "Isaac Newton, 1687'de yayımladığı eserinde evrensel kütleçekim yasasını açıklamıştır."
  },
  {
    "id": "quiz-60",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Genetik biliminin kurucusu kabul edilen ve bezelyelerle kalıtım deneyleri yapan?",
    "options": [
      "Gregor Mendel",
      "Charles Darwin",
      "Jean-Baptiste Lamarck",
      "Thomas Hunt Morgan"
    ],
    "correctIndex": 0,
    "explanation": "Gregor Mendel, 1860'larda bezelye melezlemeleriyle kalıtımın temel yasalarını ortaya koymuştur."
  },
  {
    "id": "quiz-61",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Penisilini 1928 yılında tesadüfen keşfederek ilk antibiyotiği bulan İskoç bilim?",
    "options": [
      "Alexander Fleming",
      "Joseph Lister",
      "Howard Florey",
      "Ernst Chain"
    ],
    "correctIndex": 0,
    "explanation": "Alexander Fleming, laboratuvarda küflenen bakteri kültüründe penisilinin bakterileri."
  },
  {
    "id": "quiz-62",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Maddeyi oluşturan en küçük yapı taşı kabul edilen ve proton, nedir?",
    "options": [
      "Molekül",
      "Atom",
      "Hücre",
      "Bileşik"
    ],
    "correctIndex": 1,
    "explanation": "Atom, kimyasal elementlerin tüm özelliklerini taşıyan temel yapı birimidir."
  },
  {
    "id": "quiz-63",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Nobel Fizik ve Kimya ödüllerini iki ayrı alanda kazanan tek bilim kadını kimdir?",
    "options": [
      "Rosalind Franklin",
      "Marie Curie",
      "Lise Meitner",
      "Dorothy Hodgkin"
    ],
    "correctIndex": 1,
    "explanation": "Marie Curie, radyoaktivite çalışmalarıyla 1903'te Fizik, 1911'de Kimya Nobel Ödülü'nü kazanmıştır."
  },
  {
    "id": "quiz-64",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Dünya'nın kendi ekseni etrafında dönmesi sonucu ne oluşur?",
    "options": [
      "Mevsimler",
      "Gece ve Gündüz",
      "Ay tutulması",
      "Gelgit"
    ],
    "correctIndex": 1,
    "explanation": "Dünya'nın kendi ekseni etrafındaki 24 saatlik dönüşü gece ve gündüz döngüsünü meydana getirir."
  },
  {
    "id": "quiz-65",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Ses hızı havada saniyede yaklaşık kaç metredir?",
    "options": [
      "340 m/s",
      "1000 m/s",
      "300.000 m/s",
      "50 m/s"
    ],
    "correctIndex": 0,
    "explanation": "Ses dalgaları 20°C oda sıcaklığındaki kuru havada saniyede yaklaşık 343 metre hızla ilerler."
  },
  {
    "id": "quiz-66",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Gözde ışığa duyarlı sinir hücrelerinin bulunduğu ve görüntünün oluştuğu arka?",
    "options": [
      "Kornea",
      "İris",
      "Retina (Ağ tabaka)",
      "Göz merceği"
    ],
    "correctIndex": 2,
    "explanation": "Retina, fotoreseptör hücreleri (koni ve çubuk) barındırarak optik sinyali beyne iletir."
  },
  {
    "id": "quiz-67",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Kimyasal elementlerden altın'ın sembolü nedir?",
    "options": [
      "Ag",
      "Au",
      "Al",
      "At"
    ],
    "correctIndex": 1,
    "explanation": "Altın elementinin simgesi Latincede parlayan şafak anlamına gelen 'Aurum' kelimesinden türeyen."
  },
  {
    "id": "quiz-68",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Kanda oksijen taşıyan ve kırmızı rengi veren protein nedir?",
    "options": [
      "İnsülin",
      "Hemoglobin",
      "Keratin",
      "Kolajen"
    ],
    "correctIndex": 1,
    "explanation": "Hemoglobin, merkezindeki demir atomu sayesinde oksijen moleküllerine bağlanır ve kana kırmızı."
  },
  {
    "id": "quiz-69",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Maddenin gaz halinden doğrudan katı hale geçmesi fiziksel olayına nedir?",
    "options": [
      "Süblimleşme",
      "Kırağılaşma",
      "Yoğuşma",
      "Buharlaşma"
    ],
    "correctIndex": 1,
    "explanation": "Gaz halindeki bir maddenin sıvılaşmadan doğrudan katıya geçmesine kırağılaşma (depozisyon) denir."
  },
  {
    "id": "quiz-70",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Elektrik akım şiddetinin temel SI birimi nedir?",
    "options": [
      "Volt",
      "Amper",
      "Ohm",
      "Watt"
    ],
    "correctIndex": 1,
    "explanation": "Elektrik akımının temel uluslararası birimi Fransız fizikçi André-Marie Ampère anısına Amper (A)'dir."
  },
  {
    "id": "quiz-71",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Evrendeki en hafif ve en bol bulunan kimyasal element hangisidir?",
    "options": [
      "Helyum",
      "Hidrojen",
      "Karbon",
      "Oksijen"
    ],
    "correctIndex": 1,
    "explanation": "Hidrojen, periyodik tablonun ilk elementi olup tek bir protondan oluşur ve evrenin %75'ini oluşturur."
  },
  {
    "id": "quiz-72",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş tutulması ne zaman gerçekleşir?",
    "options": [
      "Ay, Dünya",
      "Dünya, Güneş",
      "Güneş söndüğünde",
      "Ay dolunay"
    ],
    "correctIndex": 0,
    "explanation": "Ay, Dünya ile Güneş arasından geçerken Güneş ışığını bloke ettiğinde Güneş tutulması yaşanır."
  },
  {
    "id": "quiz-73",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "İnsan vücudunda kan şekerini düşüren ve pankreas tarafından üretilen hormon?",
    "options": [
      "Adrenalin",
      "İnsülin",
      "Tiroksin",
      "Kortizol"
    ],
    "correctIndex": 1,
    "explanation": "İnsülin hormonu, kandaki glikozun hücre içine alınmasını sağlayarak kan şekerini dengeler."
  },
  {
    "id": "quiz-74",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Sıvıların yüzeyindeki moleküllerin birbirini çekmesiyle oluşan gerilime nedir?",
    "options": [
      "Viskozite",
      "Yüzey Gerilimi",
      "Kılcallık",
      "Özgül Ağırlık"
    ],
    "correctIndex": 1,
    "explanation": "Yüzey gerilimi sayesinde su damlaları küresel şekil alır ve bazı böcekler suyun üzerinde yürüyebilir."
  },
  {
    "id": "quiz-75",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Karasal omurgalı hayvanlarda solunumu sağlayan ana organ hangisidir?",
    "options": [
      "Solungaç",
      "Akciğer",
      "Deri",
      "Böbrek"
    ],
    "correctIndex": 1,
    "explanation": "Akciğerler, havadaki oksijeni kana alıp karbondioksiti dışarı atmayı sağlayan solunum organıdır."
  },
  {
    "id": "quiz-76",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Fosil yakıtların yanması sonucu atmosfere salınarak küresel ısınmaya yol açan?",
    "options": [
      "Oksijen",
      "Karbondioksit (CO2)",
      "Azot",
      "Helyum"
    ],
    "correctIndex": 1,
    "explanation": "Karbondioksit gazı, atmosferde ısıyı tutarak sera etkisinin artmasına ve küresel iklim krizine."
  },
  {
    "id": "quiz-77",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Dünya'nın uydusu olan Ay'ın Dünya etrafındaki bir tam dolanımı yaklaşık sürer?",
    "options": [
      "7 gün",
      "27.3 gün",
      "45 gün",
      "365 gün"
    ],
    "correctIndex": 1,
    "explanation": "Ay, Dünya çevresindeki yörünge turunu yaklaşık 27.3 günde tamamlar."
  },
  {
    "id": "quiz-78",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Bir kimyasal çözeltinin asitliğini veya bazlığını ölçen 0-14 arası ölçeğe nedir?",
    "options": [
      "Santigrat",
      "pH Ölçeği",
      "Richter",
      "Kelvin"
    ],
    "correctIndex": 1,
    "explanation": "pH ölçeğinde 7 nötr (saf su), 7'nin altı asidik, 7'nin üstü ise bazik ortamı ifade eder."
  },
  {
    "id": "quiz-79",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Hücrede enerjinin (ATP) üretildiği santral organel hangisidir?",
    "options": [
      "Ribozom",
      "Mitokondri",
      "Golgi Aygıtı",
      "Lizozom"
    ],
    "correctIndex": 1,
    "explanation": "Mitokondri, hücresel solunum yoluyla glikozdan ATP üreterek hücrenin enerji santrali görevini görür."
  },
  {
    "id": "quiz-80",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Elektrik ampulünü ticari ve uzun ömürlü olarak geliştiren Amerikalı mucit kimdir?",
    "options": [
      "Nikola Tesla",
      "Thomas Edison",
      "Alexander Graham Bell",
      "Benjamin Franklin"
    ],
    "correctIndex": 1,
    "explanation": "Thomas Edison, 1879'da karbon filament kullanarak uzun süre ışık veren pratik ampulü geliştirmiştir."
  },
  {
    "id": "quiz-81",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Periyodik tabloda sembolü 'O' olan ve yaşam için zorunlu olan gaz hangisidir?",
    "options": [
      "Oksijen",
      "Osmiyum",
      "Ozon",
      "Oganesson"
    ],
    "correctIndex": 0,
    "explanation": "Oksijen elementi, atom numarası 8 olan ve hücresel solunumda kullanılan temel elementtir."
  },
  {
    "id": "quiz-82",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Alternatif akım (AC) sistemini ve kablosuz enerji aktarım teorilerini geliştiren?",
    "options": [
      "Nikola Tesla",
      "Thomas Edison",
      "James Watt",
      "Guglielmo Marconi"
    ],
    "correctIndex": 0,
    "explanation": "Nikola Tesla, alternatif akım motoru ve şebekesini geliştirerek modern elektrik dağıtımını kurmuştur."
  },
  {
    "id": "quiz-83",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Gökcisimlerini inceleyen bilim dalına nedir?",
    "options": [
      "Astroloji",
      "Astronomi (Gökbilim)",
      "Meteoroloji",
      "Jeoloji"
    ],
    "correctIndex": 1,
    "explanation": "Astronomi, evrendeki yıldızlar, gezegenler ve galaksilerin hareket ve yapılarını inceleyen bilimdir."
  },
  {
    "id": "quiz-84",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Suyun kimyasal formülü nedir?",
    "options": [
      "CO2",
      "H2O",
      "NaCl",
      "CH4"
    ],
    "correctIndex": 1,
    "explanation": "Su, 2 hidrojen ve 1 oksijen atomunun kovalent bağlanmasıyla oluşan H2O molekülüdür."
  },
  {
    "id": "quiz-85",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Depremlerin büyüklüğünü ölçen alet ve ölçek nedir?",
    "options": [
      "Barometre",
      "Sismograf ve Richter",
      "Termometre",
      "Higrometre"
    ],
    "correctIndex": 1,
    "explanation": "Sismograf yer hareketlerini kaydeder."
  },
  {
    "id": "quiz-86",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Mitoz bölünmede vücut hücrelerindeki kromozom sayısı nasıl değişir?",
    "options": [
      "Yarıya iner",
      "Sabit kalır",
      "İki katına çıkar",
      "Dört katına çıkar"
    ],
    "correctIndex": 1,
    "explanation": "Mitoz bölünmede ana hücredeki kromozom sayısı yavru hücrelerde aynen korunur (2n -> 2n)."
  },
  {
    "id": "quiz-87",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Atmosfer basıncını ölçmeye yarayan alet hangisidir?",
    "options": [
      "Termometre",
      "Barometre",
      "Manometre",
      "Altimetre"
    ],
    "correctIndex": 1,
    "explanation": "Barometre, havanın uyguladığı atmosferik basıncı ölçmek için kullanılan ölçüm aygıtıdır."
  },
  {
    "id": "quiz-88",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Işığın kırılarak prizmadan geçtiğinde renklere ayrılması olayına nedir?",
    "options": [
      "Işık Tayfı (Spektrum)",
      "Gölge",
      "Yansıma",
      "Soğurulma"
    ],
    "correctIndex": 0,
    "explanation": "Beyaz ışık farklı dalga boylarına göre kırılarak kırmızıdan mora uzanan spektruma ayrılır."
  },
  {
    "id": "quiz-89",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş'e en yakın gezegen hangisidir?",
    "options": [
      "Venüs",
      "Merkür",
      "Mars",
      "Dünya"
    ],
    "correctIndex": 1,
    "explanation": "Merkür, Güneş'e en yakın ve Güneş Sistemi'nin en küçük ana gezegenidir."
  },
  {
    "id": "quiz-90",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Kutup yıldızı (Polaris) hangi yönü gösterir?",
    "options": [
      "Güney",
      "Doğu",
      "Kuzey",
      "Batı"
    ],
    "correctIndex": 2,
    "explanation": "Kutup Yıldızı, Dünya'nın kuzey dönme eksenine çok yakın doğrultuda olduğu için daima Kuzey'i."
  },
  {
    "id": "quiz-91",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Işık yılı neyi ölçen bir birimdir?",
    "options": [
      "Zaman",
      "Mesafe (Uzaklık)",
      "Ağırlık",
      "Işık Parlaklığı"
    ],
    "correctIndex": 1,
    "explanation": "Işık yılı, ışığın boşlukta 1 yılda katettiği yaklaşık 9."
  },
  {
    "id": "quiz-92",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Masa tuzunun kimyasal adı nedir?",
    "options": [
      "Sodyum Klorür (NaCl)",
      "Kalsiyum Karbonat",
      "Sodyum Bikarbonat",
      "Potasyum Nitrat"
    ],
    "correctIndex": 0,
    "explanation": "Sofra tuzu, sodyum ve klor iyonlarından oluşan Sodyum Klorür (NaCl) bileşiğidir."
  },
  {
    "id": "quiz-93",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Sıcak hava balonlarının yükselmesini sağlayan temel ilke nedir?",
    "options": [
      "Yerçekimi yokluğu",
      "Arşimet Prensibi",
      "Rüzgar itişi",
      "Manyetik itme"
    ],
    "correctIndex": 1,
    "explanation": "Isıtılan havanın yoğunluğu çevredeki soğuk havadan daha düşük olduğu için balon yukarı doğru itilir."
  },
  {
    "id": "quiz-94",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş Sistemi'nde halkalarıyla en meşhur olan gezegen hangisidir?",
    "options": [
      "Jüpiter",
      "Satürn",
      "Uranüs",
      "Neptün"
    ],
    "correctIndex": 1,
    "explanation": "Satürn, buz ve kaya parçacıklarından oluşan devasa ve parlak halka sistemiyle tanınır."
  },
  {
    "id": "quiz-95",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Madde ısı aldığında hacminin büyümesi olayına nedir?",
    "options": [
      "Genleşme",
      "Büzülme",
      "Donma",
      "Erime"
    ],
    "correctIndex": 0,
    "explanation": "Isınan maddelerde atomların titreşimi artarak aralarındaki mesafe açılır ve genleşme meydana gelir."
  },
  {
    "id": "quiz-96",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Göz bebeğinin büyümesini ve küçülmesini sağlayan renkli tabaka hangisidir?",
    "options": [
      "Kornea",
      "İris",
      "Retina",
      "Sklera"
    ],
    "correctIndex": 1,
    "explanation": "İris, ortasındaki göz bebeğini kasılıp gevşeyerek göze giren ışık miktarını kontrol eden renkli."
  },
  {
    "id": "quiz-97",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Radyo dalgalarını ilk kez laboratuvarda üreterek varlığını kanıtlayan Alman fizikçi?",
    "options": [
      "Heinrich Hertz",
      "Guglielmo Marconi",
      "Wilhelm Röntgen",
      "Max Planck"
    ],
    "correctIndex": 0,
    "explanation": "Heinrich Hertz'in elektromanyetik dalgaları kanıtlaması anısına frekans birimine 'Hertz' (Hz)."
  },
  {
    "id": "quiz-98",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Yarasaların karanlıkta avlarını bulmasını sağlayan duyu yetisi nedir?",
    "options": [
      "Ekolokasyon (Yankı)",
      "Biyolüminesans",
      "Kamufle",
      "Metamorfoz"
    ],
    "correctIndex": 0,
    "explanation": "Ekolokasyon, yüksek frekanslı ses çıkarıp yankısının geri dönüş süresinden harita çıkarma."
  },
  {
    "id": "quiz-99",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Sıvılaştırılmış petrol gazının kısaltması nedir?",
    "options": [
      "CNG",
      "LPG",
      "LNG",
      "Dizel"
    ],
    "correctIndex": 1,
    "explanation": "LPG (Liquefied Petroleum Gas), propan ve bütan gazlarının basınç altında sıvılaştırılmış halidir."
  },
  {
    "id": "quiz-100",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Karasal bitkilerde topraktan su ve mineral taşıyan iletim borularına nedir?",
    "options": [
      "Ksilem (Odun Borusu)",
      "Floem (Soymuk Borusu)",
      "Kambiyum",
      "Kütikula"
    ],
    "correctIndex": 0,
    "explanation": "Ksilem boruları köklerden alınan su ve mineralleri gövdeye ve yapraklara taşır."
  },
  {
    "id": "quiz-101",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Modern bilgisayarların atası kabul edilen ilk genel amaçlı elektronik dijital?",
    "options": [
      "ENIAC",
      "UNIVAC",
      "Colossus",
      "Apple I"
    ],
    "correctIndex": 0,
    "explanation": "ENIAC, 1945'te Pennsylvania Üniversitesi'nde tamamlanan ilk programlanabilir elektronik dijital."
  },
  {
    "id": "quiz-102",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Açık kaynak kodlu Linux işletim sistemini 1991'de başlatan bilgisayar mühendisi?",
    "options": [
      "Steve Wozniak",
      "Linus Torvalds",
      "Richard Stallman",
      "Ken Thompson"
    ],
    "correctIndex": 1,
    "explanation": "Linus Torvalds, Helsinki Üniversitesi'nde öğrenciyken Linux çekirdeğini geliştirip dünyaya."
  },
  {
    "id": "quiz-103",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "World Wide Web (WWW) sistemini ve HTML dilini 1989'da icat kimdir?",
    "options": [
      "Alan Turing",
      "Tim Berners-Lee",
      "Bill Gates",
      "Steve Jobs"
    ],
    "correctIndex": 1,
    "explanation": "Tim Berners-Lee, CERN laboratuvarlarında bilgi paylaşımını kolaylaştırmak için Web'i icat etmiştir."
  },
  {
    "id": "quiz-104",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bilgisayar biliminde 'bit' (binary digit) kavramı hangi iki temel rakamı eder?",
    "options": [
      "0 ve 1",
      "1 ve 2",
      "-1 ve +1",
      "A ve B"
    ],
    "correctIndex": 0,
    "explanation": "İkili sayı sisteminde (binary) en küçük bilgi birimi 0 veya 1 durumunu temsil eden bittir."
  },
  {
    "id": "quiz-105",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bir bayt (byte) kaç bitten oluşur?",
    "options": [
      "4 bit",
      "8 bit",
      "16 bit",
      "32 bit"
    ],
    "correctIndex": 1,
    "explanation": "Standart bir bayt tam olarak 8 bitten oluşur ve bir karakteri temsil edebilir."
  },
  {
    "id": "quiz-106",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Dünyanın ilk ticari taşınabilir cep telefonunu (DynaTAC 8000X) geliştiren şirket?",
    "options": [
      "Nokia",
      "Motorola",
      "Sony",
      "IBM"
    ],
    "correctIndex": 1,
    "explanation": "Motorola, Martin Cooper önderliğinde 1983 yılında ilk ticari cep telefonunu satışa sunmuştur."
  },
  {
    "id": "quiz-107",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Python programlama dilini 1991 yılında tasarlayan Hollandalı yazılımcı kimdir?",
    "options": [
      "Bjarne Stroustrup",
      "Guido van Rossum",
      "James Gosling",
      "Dennis Ritchie"
    ],
    "correctIndex": 1,
    "explanation": "Guido van Rossum, okunabilirliği ve sadeliği ön plana alan Python dilini geliştirmiştir."
  },
  {
    "id": "quiz-108",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İnternet sitelerinin adreslerinde bulunan 'https' protokolündeki 's' harfi ne?",
    "options": [
      "Server",
      "Secure (Güvenli)",
      "Standard",
      "Speed"
    ],
    "correctIndex": 1,
    "explanation": "HTTPS (Hypertext Transfer Protocol Secure), verilerin SSL/TLS sertifikasıyla şifrelendiğini gösterir."
  },
  {
    "id": "quiz-109",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Akıllı telefonlarda kullanılan 'Android' işletim sistemi çekirdek olarak hangi?",
    "options": [
      "Windows",
      "Linux",
      "BSD",
      "DOS"
    ],
    "correctIndex": 1,
    "explanation": "Android işletim sistemi, Google tarafından geliştirilen açık kaynaklı Linux çekirdeği üzerine."
  },
  {
    "id": "quiz-110",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "1 kilobayt (KB) veri ikili sistemde kaç bayta eşittir?",
    "options": [
      "1000 bayt",
      "1024 bayt",
      "512 bayt",
      "2048 bayt"
    ],
    "correctIndex": 1,
    "explanation": "Dijital depolamada 2'nin 10. kuvveti olan 1024 bayt 1 kilobayta eşittir."
  },
  {
    "id": "quiz-111",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "C programlama dilini ve Unix işletim sistemini geliştiren efsanevi bilgisayar kimdir?",
    "options": [
      "Dennis Ritchie",
      "Bill Joy",
      "Ada Lovelace",
      "Donald Knuth"
    ],
    "correctIndex": 0,
    "explanation": "Dennis Ritchie, Bell Laboratuvarları'nda C dilini tasarlayarak modern yazılımın temelini atmıştır."
  },
  {
    "id": "quiz-112",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Apple şirketini Steve Jobs ile birlikte bir garajda kuran elektronik kimdir?",
    "options": [
      "Steve Wozniak",
      "Paul Allen",
      "Tim Cook",
      "Jony Ive"
    ],
    "correctIndex": 0,
    "explanation": "Steve Wozniak, ilk Apple I ve Apple II bilgisayarlarının donanımını bizzat tasarlamıştır."
  },
  {
    "id": "quiz-113",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Elektronik devrelerde akımın yalnızca tek bir yönde geçmesine izin veren nedir?",
    "options": [
      "Direnç",
      "Diyot",
      "Kondansatör",
      "Transformatör"
    ],
    "correctIndex": 1,
    "explanation": "Diyot, akımı tek yönde ileterek alternatif akımı doğru akıma çevirmede (doğrultucu) kullanılır."
  },
  {
    "id": "quiz-114",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Barkodların yerine geçen ve iki boyutlu kare şeklinde optik veri nedir?",
    "options": [
      "ISBN",
      "QR Kod",
      "RFID",
      "NFC"
    ],
    "correctIndex": 1,
    "explanation": "QR Kod (Quick Response), yatay ve dikey yönde bilgi saklayabilen iki boyutlu bir matris barkoddur."
  },
  {
    "id": "quiz-115",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Güneş enerjisini doğrudan elektrik enerjisine dönüştüren panellerin hücrelerine?",
    "options": [
      "Fotovoltaik Hücre",
      "Termoelektrik Hücre",
      "Galvanik Pil",
      "Akümülatör"
    ],
    "correctIndex": 0,
    "explanation": "Fotovoltaik hücreler, ışık fotonlarının silikon plakalara çarpmasıyla serbest elektron akışı yaratır."
  },
  {
    "id": "quiz-116",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Kablosuz iletişim standardı 'Bluetooth' adı nereden gelmektedir?",
    "options": [
      "Kral Harald Bluetooth",
      "Mavi renkli bir dişten",
      "Denizaltı projesinden",
      "Buluşçunun soyadından"
    ],
    "correctIndex": 0,
    "explanation": "İskandinav kabilelerini birleştiren Kral Harald'ın unvanı, cihazları birleştiren bu teknolojiye."
  },
  {
    "id": "quiz-117",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Web sayfalarının iskeletini ve içerik yapısını oluşturmak için kullanılan standart?",
    "options": [
      "CSS",
      "HTML",
      "JavaScript",
      "SQL"
    ],
    "correctIndex": 1,
    "explanation": "HTML (HyperText Markup Language), web sayfalarının başlık, paragraf ve link yapısını tanımlar."
  },
  {
    "id": "quiz-118",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İlk başarılı insanlı motorlu uçuşu 1903 yılında gerçekleştiren kardeşler kimlerdir?",
    "options": [
      "Wright Kardeşler",
      "Montgolfier Kardeşler",
      "Lumière Kardeşler",
      "Siemens Kardeşler"
    ],
    "correctIndex": 0,
    "explanation": "Orville ve Wilbur Wright, 17 Aralık 1903'te Kuzey Karolina'da ilk kontrollü motorlu uçuşu yapmıştır."
  },
  {
    "id": "quiz-119",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "GPS (Küresel Konumlandırma Sistemi) teknolojisi ilk olarak hangi amaçla?",
    "options": [
      "Askeri yön",
      "Hava durumu tahmini",
      "Otomobil yarışları",
      "Balıkçılık takibi"
    ],
    "correctIndex": 0,
    "explanation": "GPS, 1970'lerde ABD Savunma Bakanlığı tarafından askeri birlik ve füzelerin konumlanması için."
  },
  {
    "id": "quiz-120",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bilgisayarda verileri mekanik parça olmadan depolayan modern birim nedir?",
    "options": [
      "HDD",
      "SSD (Solid",
      "CD-ROM",
      "Disket"
    ],
    "correctIndex": 1,
    "explanation": "SSD'ler flaş bellek yongaları kullanarak mekanik disklere göre çok daha hızlı veri okur ve yazar."
  },
  {
    "id": "quiz-121",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Radyoyu icat eden ve ilk transatlantik telsiz mesajını ileten İtalyan kimdir?",
    "options": [
      "Guglielmo Marconi",
      "Alexander Graham Bell",
      "Samuel Morse",
      "Heinrich Hertz"
    ],
    "correctIndex": 0,
    "explanation": "Marconi, 1901'de İngiltere'den Kanada'ya Atlas Okyanusu üzerinden ilk kablosuz radyo sinyalini."
  },
  {
    "id": "quiz-122",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Mors alfabesinde harfler hangi iki temel işaretin kombinasyonuyla oluşturulur?",
    "options": [
      "Nokta ve Çizgi",
      "Artı ve Eksi",
      "0 ve 1",
      "Harf ve Sayı"
    ],
    "correctIndex": 0,
    "explanation": "Samuel Morse tarafından geliştirilen alfabe, kısa (nokta) ve uzun (çizgi) ses/ışık sinyallerine."
  },
  {
    "id": "quiz-123",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Yapay zeka modellerini eğitmekte kullanılan paralel işlemci nedir?",
    "options": [
      "CPU",
      "GPU (Grafik İşlemci)",
      "RAM",
      "Modem"
    ],
    "correctIndex": 1,
    "explanation": "GPU'lar binlerce küçük çekirdeğiyle matris işlemlerini aynı anda yaparak yapay zekayı hızlandırır."
  },
  {
    "id": "quiz-124",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İnternetin atası sayılan ve 1969'da ABD Savunma Bakanlığı desteğiyle kurulan?",
    "options": [
      "ARPANET",
      "Ethernet",
      "Usenet",
      "NSFNET"
    ],
    "correctIndex": 0,
    "explanation": "ARPANET, paket anahtarlamalı veri iletimini ilk kullanan ve internetin doğmasını sağlayan ağdır."
  },
  {
    "id": "quiz-125",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "1876'da telefonu icat ederek ilk ses iletimini yapan mucit kimdir?",
    "options": [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Guglielmo Marconi",
      "Nikola Tesla"
    ],
    "correctIndex": 1,
    "explanation": "Alexander Graham Bell, yardımcısına 'Bay Watson, buraya gelin, sizi görmek istiyorum' diyerek."
  },
  {
    "id": "quiz-126",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İnternette alan adlarını (örn: pratiksel.com) IP adreslerine çeviren sisteme nedir?",
    "options": [
      "DNS (Domain",
      "DHCP",
      "FTP",
      "HTTP"
    ],
    "correctIndex": 0,
    "explanation": "DNS, kullanıcı dostu web adreslerini bilgisayarların anladığı sayısal IP adresleriyle eşleştirir."
  },
  {
    "id": "quiz-127",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bir bilgisayarda işlemci ile anakart ve diğer bileşenler arasındaki geçici nedir?",
    "options": [
      "RAM",
      "ROM",
      "BIOS",
      "Cache"
    ],
    "correctIndex": 0,
    "explanation": "RAM (Random Access Memory), çalışan programların geçici verilerini tutan yüksek hızlı bellektir."
  },
  {
    "id": "quiz-128",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Rulo film icat edip Kodak markasını kuran kimdir?",
    "options": [
      "George Eastman",
      "Edwin Land",
      "Louis Daguerre",
      "Joseph Niépce"
    ],
    "correctIndex": 0,
    "explanation": "George Eastman, 1888'de kutu kamerayı piyasaya sürerek fotoğrafçılığı halka yaymıştır."
  },
  {
    "id": "quiz-129",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bluetooth bağlantısında iki cihazın birbirini tanıması ve güvenli iletişim kurması?",
    "options": [
      "Eşleştirme (Pairing)",
      "Formatlama",
      "Yedekleme",
      "Kriptolama"
    ],
    "correctIndex": 0,
    "explanation": "Eşleştirme, iki cihazın şifreleme anahtarlarını paylaşarak bağlantı kurması işlemidir."
  },
  {
    "id": "quiz-130",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Dokunmatik ekran teknolojisinde parmağın elektrik alanını değiştirmesini algılayan?",
    "options": [
      "Kapasitif Ekran",
      "Rezistif Ekran",
      "Kızılötesi Ekran",
      "Akustik Ekran"
    ],
    "correctIndex": 0,
    "explanation": "Modern akıllı telefonlarda kullanılan kapasitif ekranlar, parmaktaki iletkenliği algılar."
  },
  {
    "id": "quiz-131",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bilgisayara bağlanan harici aygıtların çalışmasını sağlayan küçük sistem?",
    "options": [
      "Sürücü (Driver)",
      "Firmware",
      "Kernel",
      "BIOS"
    ],
    "correctIndex": 0,
    "explanation": "Sürücüler, işletim sisteminin yazıcı, ekran kartı gibi donanımlarla iletişim kurmasını sağlar."
  },
  {
    "id": "quiz-132",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Elektrikli araçlarda batarya yönetim sisteminin (BMS) temel görevi nedir?",
    "options": [
      "Hücre güvenlik dengesi",
      "Radyoyu açmak",
      "Lastik basıncını",
      "Klimayı hızlandırmak"
    ],
    "correctIndex": 0,
    "explanation": "BMS, lityum batarya hücrelerinin aşırı şarj, ısınma veya patlamasını engelleyen kritik kontrol."
  },
  {
    "id": "quiz-133",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Kripto para birimlerinde işlemlerin merkeziyetsiz ve değiştirilemez şekilde?",
    "options": [
      "Blockchain (Blokzincir",
      "SQL",
      "Bulut Depolama",
      "Büyük Veri"
    ],
    "correctIndex": 0,
    "explanation": "Blokzincir, bloklar halindeki verilerin kriptografik özetlerle birbirine zincirlendiği veri."
  },
  {
    "id": "quiz-134",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "PDF (Portable Document Format) dosya formatı hangi yazılım şirketi tarafından?",
    "options": [
      "Microsoft",
      "Adobe",
      "Apple",
      "IBM"
    ],
    "correctIndex": 1,
    "explanation": "Adobe, 1993 yılında işletim sisteminden bağımsız belge görüntüleme için PDF standardını yaratmıştır."
  },
  {
    "id": "quiz-135",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bilgisayarda işlemci çekirdeklerinin aynı anda birden fazla iş parçacığı?",
    "options": [
      "Multi-threading",
      "Overclock",
      "Cache",
      "Paging"
    ],
    "correctIndex": 0,
    "explanation": "Multi-threading, bir çekirdeğin boş bekleme sürelerini değerlendirerek performansı artıran."
  },
  {
    "id": "quiz-136",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Veritabanlarında veri sorgulamak ve güncellemek için kullanılan standart dil?",
    "options": [
      "SQL",
      "HTML",
      "XML",
      "JSON"
    ],
    "correctIndex": 0,
    "explanation": "SQL (Structured Query Language), ilişkisel veritabanlarını yönetmek için kullanılan standart dildir."
  },
  {
    "id": "quiz-137",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Uçakların ve gemilerin konumunu elektromanyetik dalga yankılarıyla tespit eden?",
    "options": [
      "Radar",
      "Sonar",
      "Lidar",
      "Barometre"
    ],
    "correctIndex": 0,
    "explanation": "Radar (Radio Detection and Ranging), radyo dalgalarının cisimden yansıma süresini ölçer."
  },
  {
    "id": "quiz-138",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Suyun altında ses dalgaları yayarak cisimleri ve derinliği tespit eden hangisidir?",
    "options": [
      "Sonar",
      "Radar",
      "Telsiz",
      "Jiroskop"
    ],
    "correctIndex": 0,
    "explanation": "Sonar (Sound Navigation and Ranging), su altında radyo dalgaları zayıfladığı için ses."
  },
  {
    "id": "quiz-139",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İlk mekanik daktiloyu ticari olarak üreten ve daktilo patentini alan kimdir?",
    "options": [
      "Christopher Sholes",
      "Alexander Bell",
      "Eli Whitney",
      "Elisha Otis"
    ],
    "correctIndex": 0,
    "explanation": "Christopher Sholes, 1868'de pratik daktiloyu geliştirmiş ve QWERTY klavye düzenini tasarlamıştır."
  },
  {
    "id": "quiz-140",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "İnternet üzerinde dosya transferi yapmak için kullanılan en eski ağ hangisidir?",
    "options": [
      "FTP (File",
      "SMTP",
      "POP3",
      "IMAP"
    ],
    "correctIndex": 0,
    "explanation": "FTP, sunucu ile istemci arasında dosya indirme ve yükleme işlemlerinde kullanılan protokoldür."
  },
  {
    "id": "quiz-141",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Bilgisayarların merkezi işlem birimi olan CPU'nun saat hızı genellikle hangi edilir?",
    "options": [
      "Gigahertz (GHz)",
      "Megabayt (MB)",
      "Watt (W)",
      "Amper (A)"
    ],
    "correctIndex": 0,
    "explanation": "GHz (Gigahertz), işlemcinin saniyede kaç milyar saat döngüsü gerçekleştirdiğini gösterir."
  },
  {
    "id": "quiz-142",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Arama motorlarının sayfaları keşfeden otomatik bot yazılımı nedir?",
    "options": [
      "Web Tarama (Crawl)",
      "Rendering",
      "Phishing",
      "Caching"
    ],
    "correctIndex": 0,
    "explanation": "Arama motoru botları (crawler'lar), bağlantıları takip ederek internetteki yeni sayfaları arşivler."
  },
  {
    "id": "quiz-143",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Elektronik devrelerde elektrik enerjisini elektrostatik alanda depolayan bileşen?",
    "options": [
      "Kondansatör (Kapasitör",
      "Direnç",
      "Bobin",
      "Röle"
    ],
    "correctIndex": 0,
    "explanation": "Kondansatörler, iki iletken levha arasındaki yalıtkan katman sayesinde elektrik yükünü depolar."
  },
  {
    "id": "quiz-144",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Verilerin çalınmasını veya değiştirilmesini önlemek amacıyla şifrelenmesi bilimine?",
    "options": [
      "Kriptografi",
      "Steganografi",
      "Biyometri",
      "Telemetri"
    ],
    "correctIndex": 0,
    "explanation": "Kriptografi, matematiksel algoritmalar kullanarak bilginin sadece yetkili kişilerce okunmasını."
  },
  {
    "id": "quiz-145",
    "category": "Teknoloji",
    "categorySlug": "teknoloji",
    "question": "Akıllı telefonlarda dokunma hissi veren titreşim mekanizması nedir?",
    "options": [
      "Haptik Titreşim Motoru",
      "Step Motor",
      "Servo Motor",
      "Dizel Motor"
    ],
    "correctIndex": 0,
    "explanation": "Eksantrik kütleli mini motorlar veya lineer rezonans aktüatörleri haptik titreşim hissini üretir."
  },
  {
    "id": "quiz-146",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir üçgenin iç açılarının toplamı Öklid geometrisinde kaç derecedir?",
    "options": [
      "90°",
      "180°",
      "270°",
      "360°"
    ],
    "correctIndex": 1,
    "explanation": "Tüm düzlemsel üçgenlerin iç açıları toplamı her zaman 180 derecedir."
  },
  {
    "id": "quiz-147",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Hem çift hem de asal olan tek sayı hangisidir?",
    "options": [
      "0",
      "1",
      "2",
      "4"
    ],
    "correctIndex": 2,
    "explanation": "2 sayısı hem 2'ye hem 1'e bölündüğü için asaldır ve çift olan tek asal sayıdır."
  },
  {
    "id": "quiz-148",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir saatin akrebi ve yelkovanı bir günde (24 saatte) kaç kez üst üste gelir?",
    "options": [
      "24",
      "22",
      "12",
      "20"
    ],
    "correctIndex": 1,
    "explanation": "Akrep de hareket ettiği için her 12 saatte 11 kez, 24 saatte ise toplam 22 kez çakışırlar."
  },
  {
    "id": "quiz-149",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Matematikte 'π' (Pi) sayısı yaklaşık olarak hangi kesirli değere denk gelir?",
    "options": [
      "22/7",
      "16/5",
      "31/10",
      "19/6"
    ],
    "correctIndex": 0,
    "explanation": "22/7 kesri (yaklaşık 3.1428), Pi sayısına (3.14159...) en yakın pratik kesir kabul edilir."
  },
  {
    "id": "quiz-150",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir karenin bir kenar uzunluğu 5 cm ise alanı kaç santimetrekaredir?",
    "options": [
      "10 cm²",
      "20 cm²",
      "25 cm²",
      "30 cm²"
    ],
    "correctIndex": 2,
    "explanation": "Karenin alanı bir kenarının karesidir: 5 × 5 = 25 cm²."
  },
  {
    "id": "quiz-151",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir sayının sıfırıncı kuvveti (a^0, a≠0) kaça eşittir?",
    "options": [
      "0",
      "1",
      "Sonsuz",
      "Tanımsız"
    ],
    "correctIndex": 1,
    "explanation": "Matematiksel üslü sayı kuralları gereği, sıfırdan farklı her sayının sıfırıncı kuvveti 1'e eşittir."
  },
  {
    "id": "quiz-152",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Dik üçgende a² + b² = c² bağıntısı hangi teorem olarak bilinir?",
    "options": [
      "Öklid Teoremi",
      "Pisagor Teoremi",
      "Tales Teoremi",
      "Fermat Teoremi"
    ],
    "correctIndex": 1,
    "explanation": "Pisagor Teoremi (a² + b² = c²), dik üçgenlerdeki temel bağıntıdır."
  },
  {
    "id": "quiz-153",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "1'den 100'e kadar olan sayıların toplamı pratik formülle (n*(n+1)/2) kaçtır?",
    "options": [
      "4950",
      "5000",
      "5050",
      "5100"
    ],
    "correctIndex": 2,
    "explanation": "Genç Gauss'un da bulduğu yöntemle: 100 × 101 / 2 = 5050'dir."
  },
  {
    "id": "quiz-154",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Altın Oran'ın sembolü olarak kullanılan Yunan alfabesi harfi hangisidir?",
    "options": [
      "Pi (π)",
      "Fi (Phi - φ)",
      "Alfa (α)",
      "Teta (θ)"
    ],
    "correctIndex": 1,
    "explanation": "Altın oran, antik Yunan heykeltıraşı Phidias anısına 'Fi' (Phi) harfiyle gösterilir."
  },
  {
    "id": "quiz-155",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir zar atıldığında çift sayı gelme olasılığı kaçtır?",
    "options": [
      "1/6",
      "1/3",
      "1/2 (%50)",
      "2/3"
    ],
    "correctIndex": 2,
    "explanation": "6 yüzeyden 3 tanesi çift sayıdır (2, 4, 6); bu nedenle olasılık 3/6 = 1/2'dir."
  },
  {
    "id": "quiz-156",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "5 faktöriyel (5!) ifadesinin sayısal değeri kaçtır?",
    "options": [
      "25",
      "60",
      "120",
      "720"
    ],
    "correctIndex": 2,
    "explanation": "5! = 5 × 4 × 3 × 2 × 1 = 120'dir."
  },
  {
    "id": "quiz-157",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Fibonacci dizisinde 1, 1, 2, 3, 5, 8 sayılarından sonra gelen sayı kaçtır?",
    "options": [
      "11",
      "12",
      "13",
      "15"
    ],
    "correctIndex": 2,
    "explanation": "Her sayı kendinden önceki iki sayının toplamıdır: 5 + 8 = 13."
  },
  {
    "id": "quiz-158",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir çemberin çevresinin çapına oranı her zaman hangi sabite eşittir?",
    "options": [
      "Altın Oran (φ)",
      "Euler Sayısı (e)",
      "Pi Sayısı (π)",
      "Doğal Logaritma"
    ],
    "correctIndex": 2,
    "explanation": "Büyüklüğü ne olursa olsun tüm çemberlerde çevre bölü çap oranı Pi (π) sayısını verir."
  },
  {
    "id": "quiz-159",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Rakamları birbirinden farklı en küçük üç basamaklı pozitif tam sayı kaçtır?",
    "options": [
      "100",
      "101",
      "102",
      "123"
    ],
    "correctIndex": 2,
    "explanation": "Rakamları farklı kuralına göre ilk basamak 1, ikinci 0, üçüncü 2 seçilerek 102 elde edilir."
  },
  {
    "id": "quiz-160",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Roma rakamlarında 'L' harfi hangi sayıyı temsil eder?",
    "options": [
      "10",
      "50",
      "100",
      "500"
    ],
    "correctIndex": 1,
    "explanation": "Roma rakam sisteminde L harfi 50 sayısını gösterir (C=100, D=500, M=1000)."
  },
  {
    "id": "quiz-161",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir dikdörtgenler prizmasının kaç tane köşesi vardır?",
    "options": [
      "6",
      "8",
      "12",
      "16"
    ],
    "correctIndex": 1,
    "explanation": "Dikdörtgenler prizmasında (ve küpte) 6 yüz, 12 ayrıt ve 8 köşe bulunur."
  },
  {
    "id": "quiz-162",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir sayının %20'si 40 ise o sayının tamamı kaçtır?",
    "options": [
      "160",
      "200",
      "240",
      "400"
    ],
    "correctIndex": 1,
    "explanation": "Sayının 1/5'i 40 olduğuna göre tamamı: 40 × 5 = 200'dür."
  },
  {
    "id": "quiz-163",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Asal çarpanları sadece 2 ve 3 olan iki basamaklı en küçük sayı kaçtır?",
    "options": [
      "6",
      "12",
      "18",
      "24"
    ],
    "correctIndex": 1,
    "explanation": "İki basamaklı olması gerektiğinden: 2² × 3 = 12 sayısı bu kuralı sağlar."
  },
  {
    "id": "quiz-164",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir küpün kaç tane yüzeyi vardır?",
    "options": [
      "4",
      "6",
      "8",
      "12"
    ],
    "correctIndex": 1,
    "explanation": "Küp, birbirine eşit 6 kare yüzeyden oluşan düzgün bir geometrik cisimdir."
  },
  {
    "id": "quiz-165",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Ortalaması 15 olan 4 sayının toplamı kaçtır?",
    "options": [
      "45",
      "60",
      "75",
      "90"
    ],
    "correctIndex": 1,
    "explanation": "Sayıların toplamı ortalama ile sayı adedinin çarpımıdır: 15 × 4 = 60."
  },
  {
    "id": "quiz-166",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Matematikte 'sıfır' sayısını bağımsız bir basamak ve işlem değeri olarak kimdir?",
    "options": [
      "Brahmagupta",
      "Aryabhata",
      "Ramanujan",
      "Bhaskara"
    ],
    "correctIndex": 0,
    "explanation": "Brahmagupta, 7. yüzyılda sıfırın matematiksel kurallarını ve işlemlerini formüle etmiştir."
  },
  {
    "id": "quiz-167",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Kenar uzunlukları 3, 4 ve 5 birim olan üçgen hangi tür üçgendir?",
    "options": [
      "Eşkenar üçgen",
      "Dik üçgen",
      "Geniş açılı üçgen",
      "İkizkenar üçgen"
    ],
    "correctIndex": 1,
    "explanation": "3² + 4² = 9 + 16 = 25 = 5² bağıntısını sağladığı için bu özel bir dik üçgendir."
  },
  {
    "id": "quiz-168",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir madeni para 3 kez atıldığında üçünün de tura gelme olasılığı kaçtır?",
    "options": [
      "1/2",
      "1/4",
      "1/8",
      "1/16"
    ],
    "correctIndex": 2,
    "explanation": "Her atış bağımsız olup olasılık (1/2) × (1/2) × (1/2) = 1/8'dir."
  },
  {
    "id": "quiz-169",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Çemberin merkezinden geçen ve iki noktayı birleştiren en uzun kirişe nedir?",
    "options": [
      "Yarıçap",
      "Çap",
      "Teğet",
      "Yay"
    ],
    "correctIndex": 1,
    "explanation": "Çap, merkezden geçen ve çemberi iki eşit parçaya bölen en uzun doğru parçasıdır."
  },
  {
    "id": "quiz-170",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "10 tabanındaki logaritma işleminde log(1000) değeri kaçtır?",
    "options": [
      "1",
      "2",
      "3",
      "10"
    ],
    "correctIndex": 2,
    "explanation": "10'un 3. kuvveti 1000 ettiği için log10(1000) = 3'tür."
  },
  {
    "id": "quiz-171",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Düzgün bir beşgenin tüm iç açılarının toplamı kaç derecedir?",
    "options": [
      "360°",
      "540°",
      "720°",
      "180°"
    ],
    "correctIndex": 1,
    "explanation": "(n - 2) × 180 formülünden: (5 - 2) × 180 = 3 × 180 = 540 derecedir."
  },
  {
    "id": "quiz-172",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir düzlemde kesişmeyen ve aralarındaki mesafe her zaman sabit olan nedir?",
    "options": [
      "Kesişen doğrular",
      "Paralel doğrular",
      "Dik doğrular",
      "Çakışık doğrular"
    ],
    "correctIndex": 1,
    "explanation": "Paralel doğrular, aynı düzlemde uzatıldıklarında hiçbir zaman kesişmeyen doğrulardır."
  },
  {
    "id": "quiz-173",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir araba saatte 90 km sabit hızla 3 saatte kaç kilometre yol alır?",
    "options": [
      "180 km",
      "240 km",
      "270 km",
      "300 km"
    ],
    "correctIndex": 2,
    "explanation": "Yol = Hız × Zaman formülüyle: 90 × 3 = 270 kilometredir."
  },
  {
    "id": "quiz-174",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "2 sayısının 10. kuvveti (2^10) kaçtır?",
    "options": [
      "512",
      "1000",
      "1024",
      "2048"
    ],
    "correctIndex": 2,
    "explanation": "Bilgisayar biliminde kilobaytın da karşılığı olan 2^10 değeri 1024'tür."
  },
  {
    "id": "quiz-175",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir sayının %50'sinin %50'si o sayının yüzde kaçına eşittir?",
    "options": [
      "%100",
      "%50",
      "%25",
      "%10"
    ],
    "correctIndex": 2,
    "explanation": "Yarısının yarısı çeyreği ifade eder; yani sayının %25'ine eşittir."
  },
  {
    "id": "quiz-176",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Pozitif bir sayıyı sıfıra bölmeye çalıştığımızda matematikteki karşılığı nedir?",
    "options": [
      "0",
      "1",
      "Tanımsız",
      "Sonsuz"
    ],
    "correctIndex": 2,
    "explanation": "Sıfıra bölme işlemi standart aritmetikte tanımsız kabul edilir."
  },
  {
    "id": "quiz-177",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "İki asal sayının toplamı 5 ise bu sayılar hangileridir?",
    "options": [
      "1 ve 4",
      "2 ve 3",
      "0 ve 5",
      "Hiçbiri"
    ],
    "correctIndex": 1,
    "explanation": "2 ve 3 asal sayılardır ve toplamları 2 + 3 = 5'tir (1 asal sayı değildir)."
  },
  {
    "id": "quiz-178",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Doğal sayılar kümesi matematikte hangi harf simgesi ile gösterilir?",
    "options": [
      "Z",
      "N",
      "Q",
      "R"
    ],
    "correctIndex": 1,
    "explanation": "Doğal sayılar kümesi Latincede doğal anlamına gelen 'Naturalis'ten ötürü 'N' harfiyle gösterilir."
  },
  {
    "id": "quiz-179",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir reel sayının mutlak değeri her zaman hangi değer aralığındadır?",
    "options": [
      "Negatif",
      "Sıfır veya Pozitif",
      "Sadece Pozitif",
      "Kesirli"
    ],
    "correctIndex": 1,
    "explanation": "Mutlak değer bir sayının sıfıra olan uzaklığı olduğundan hiçbir zaman negatif olamaz."
  },
  {
    "id": "quiz-180",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Eşkenar bir üçgenin bir iç açısı kaç derecedir?",
    "options": [
      "45°",
      "60°",
      "90°",
      "120°"
    ],
    "correctIndex": 1,
    "explanation": "İç açıları toplamı 180° olup üçü de eşit olduğundan: 180 / 3 = 60 derecedir."
  },
  {
    "id": "quiz-181",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "100 liralık bir ürüne önce %20 zam yapılıp sonra %20 olur?",
    "options": [
      "100 TL",
      "96 TL",
      "104 TL",
      "95 TL"
    ],
    "correctIndex": 1,
    "explanation": "100 TL zamla 120 TL olur; 120 TL'nin %20'si 24 TL olup indirilirse son fiyat 96 TL kalır."
  },
  {
    "id": "quiz-182",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir dairenin alanı hangi formülle hesaplanır?",
    "options": [
      "2πr",
      "πr²",
      "4πr²",
      "πd"
    ],
    "correctIndex": 1,
    "explanation": "Dairenin alanı Pi sayısı ile yarıçapın karesinin çarpımına eşittir: A = πr²."
  },
  {
    "id": "quiz-183",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir torbadaki 4 kırmızı, 6 mavi bilyeden rastgele çekilen bir nedir?",
    "options": [
      "%40",
      "%50",
      "%60",
      "%80"
    ],
    "correctIndex": 2,
    "explanation": "Toplam 10 bilye vardır; mavi olma olasılığı 6/10 = %60'tır."
  },
  {
    "id": "quiz-184",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir saatin akrebi 1 saatte kaç derecelik açı süpürür?",
    "options": [
      "15°",
      "30°",
      "45°",
      "60°"
    ],
    "correctIndex": 1,
    "explanation": "Saat kadranı 360° olup 12 eşit dilime ayrılmıştır: 360 / 12 = 30 derecedir."
  },
  {
    "id": "quiz-185",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Aşağıdakilerden hangisi bir asal sayı değildir?",
    "options": [
      "17",
      "19",
      "21",
      "23"
    ],
    "correctIndex": 2,
    "explanation": "21 sayısı 1 ve kendisinin yanı sıra 3 ve 7'ye bölündüğü için asal değildir."
  },
  {
    "id": "quiz-186",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Ardışık iki çift sayının EBOB'u (En Büyük Ortak Böleni) her zaman kaçtır?",
    "options": [
      "1",
      "2",
      "4",
      "Bilinemez"
    ],
    "correctIndex": 1,
    "explanation": "Ardışık iki çift sayı aralarında 2 fark barındırdığından en büyük ortak bölenleri daima 2'dir."
  },
  {
    "id": "quiz-187",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir küpün bir kenar uzunluğu 2 katına çıkarılırsa hacmi kaç katına çıkar?",
    "options": [
      "2 katına",
      "4 katına",
      "6 katına",
      "8 katına"
    ],
    "correctIndex": 3,
    "explanation": "Hacim kübik büyür: (2a)³ = 8a³ olduğundan hacim 8 katına çıkar."
  },
  {
    "id": "quiz-188",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Ters açıların ölçüleri birbirine göre nasıldır?",
    "options": [
      "Toplamları 180'dir",
      "Birbirine eşittir",
      "Toplamları 90'dır",
      "Farklıdır"
    ],
    "correctIndex": 1,
    "explanation": "Kesişen iki doğrunun oluşturduğu karşılıklı ters açılar daima birbirine eşittir."
  },
  {
    "id": "quiz-189",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "1 kilometre kaç milimetreye eşittir?",
    "options": [
      "100.000 mm",
      "1.000.000 mm",
      "10.000.000 mm",
      "1.000 mm"
    ],
    "correctIndex": 1,
    "explanation": "1 km = 1.000 m = 100.000 cm = 1.000.000 milimetredir."
  },
  {
    "id": "quiz-190",
    "category": "Matematik & Mantık",
    "categorySlug": "matematik",
    "question": "Bir günün saniye cinsinden toplam süresi kaçtır?",
    "options": [
      "3.600 saniye",
      "43.200 saniye",
      "86.400 saniye",
      "100.000 saniye"
    ],
    "correctIndex": 2,
    "explanation": "1 gün = 24 saat × 60 dakika × 60 saniye = 86.400 saniyedir."
  },
  {
    "id": "quiz-191",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Louvre Müzesi'nde sergilenen dünyaca ünlü Mona Lisa tablosunu kim yapmıştır?",
    "options": [
      "Michelangelo",
      "Leonardo da Vinci",
      "Raphael",
      "Rembrandt"
    ],
    "correctIndex": 1,
    "explanation": "Mona Lisa (La Gioconda), 16. yüzyıl başında Leonardo da Vinci tarafından yapılmıştır."
  },
  {
    "id": "quiz-192",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İstiklal Marşı'mızın bestecisi kimdir?",
    "options": [
      "Osman Zeki Üngör",
      "Zeki Müren",
      "Itri",
      "Hacı Arif Bey"
    ],
    "correctIndex": 0,
    "explanation": "İstiklal Marşı'nın günümüzde okunan resmi bestesi Osman Zeki Üngör tarafından yapılmıştır."
  },
  {
    "id": "quiz-193",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Kürk Mantolu Madonna, Kuyucaklı Yusuf ve İçimizdeki Şeytan romanlarının yazarı?",
    "options": [
      "Ahmet Hamdi Tanpınar",
      "Sabahattin Ali",
      "Peyami Safa",
      "Yaşar Kemal"
    ],
    "correctIndex": 1,
    "explanation": "Sabahattin Ali, Türk edebiyatının klasikleşen bu başyapıtlarını kaleme almıştır."
  },
  {
    "id": "quiz-194",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İspanyol ressam Pablo Picasso'nun öncülüğünü yaptığı modern sanat akımı hangisidir?",
    "options": [
      "Empresyonizm",
      "Sürrealizm",
      "Kübizm",
      "Fütürizm"
    ],
    "correctIndex": 2,
    "explanation": "Kübizm akımı, nesneleri geometrik formlara ayırarak çok açılı sunmasıyla Picasso ile özdeşleşmiştir."
  },
  {
    "id": "quiz-195",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Yıldızlı Gece (The Starry Night) tablosu hangi ünlü Hollandalı post-empresyonist?",
    "options": [
      "Vincent van Gogh",
      "Claude Monet",
      "Paul Gauguin",
      "Johannes Vermeer"
    ],
    "correctIndex": 0,
    "explanation": "Van Gogh, 1889 yılında Saint-Rémy'deki sanatoryumda penceresinden gördüğü manzarayı resmetmiştir."
  },
  {
    "id": "quiz-196",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Türk edebiyatında ilk yerli tiyatro eseri kabul edilen 'Şair Evlenmesi' aittir?",
    "options": [
      "Namık Kemal",
      "Şinasi",
      "Recaizade Mahmut Ekrem",
      "Ziya Paşa"
    ],
    "correctIndex": 1,
    "explanation": "İbrahim Şinasi tarafından 1859'da yazılan tek perdelik töre komedisi ilk yerli piyestir."
  },
  {
    "id": "quiz-197",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İlahi Komedya (La Divina Commedia) adlı epik eserin İtalyan yazarı kimdir?",
    "options": [
      "Petrarca",
      "Boccaccio",
      "Dante Alighieri",
      "Machiavelli"
    ],
    "correctIndex": 2,
    "explanation": "Dante, 14. yüzyıl başında Cehennem, Araf ve Cennet yolculuğunu anlatan başyapıtını yazmıştır."
  },
  {
    "id": "quiz-198",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İnce Memed roman serisiyle tanınan ve Nobel'e aday gösterilen büyük kimdir?",
    "options": [
      "Orhan Pamuk",
      "Yaşar Kemal",
      "Kemal Tahir",
      "Orhan Kemal"
    ],
    "correctIndex": 1,
    "explanation": "Yaşar Kemal, Çukurova'daki eşkıya ve ağalık düzenini İnce Memed serisiyle dünya edebiyatına."
  },
  {
    "id": "quiz-199",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Vatikan'daki Sistine Şapeli'nin tavan fresklerini ve ünlü Adem'in Yaratılışı?",
    "options": [
      "Leonardo da Vinci",
      "Michelangelo",
      "Donatello",
      "Botticelli"
    ],
    "correctIndex": 1,
    "explanation": "Michelangelo Buonarroti, 1508-1512 yılları arasında şapelin tavanını tek başına fresklerle."
  },
  {
    "id": "quiz-200",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Suç ve Ceza, Karamazov Kardeşler ve Budala romanlarının Rus yazarı kimdir?",
    "options": [
      "Lev Tolstoy",
      "Fyodor Dostoyevski",
      "Anton Çehov",
      "Maksim Gorki"
    ],
    "correctIndex": 1,
    "explanation": "Dostoyevski, insan ruhunun derinliklerini ve psikolojik çelişkilerini bu eserlerinde ustalıkla."
  },
  {
    "id": "quiz-201",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İnci Küpeli Kız (Girl with a Pearl Earring) tablosu hangi aittir?",
    "options": [
      "Johannes Vermeer",
      "Rembrandt",
      "Frans Hals",
      "Jan Steen"
    ],
    "correctIndex": 0,
    "explanation": "Johannes Vermeer, ışığı ustalıkla kullandığı 1665 tarihli bu tablosuyla 'Kuzeyin Mona Lisa'sını."
  },
  {
    "id": "quiz-202",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "2006 Nobel Edebiyat Ödülü'nü kazanan ilk Türk yazar kimdir?",
    "options": [
      "Nazım Hikmet",
      "Orhan Pamuk",
      "Aziz Nesin",
      "Ahmet Ümit"
    ],
    "correctIndex": 1,
    "explanation": "Orhan Pamuk, 'Kentinin melankolik ruhunun izlerini sürerken kültürlerin çatışması için yeni."
  },
  {
    "id": "quiz-203",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Savaş ve Barış ile Anna Karenina romanlarının yazarı olan Rus edebiyatçı kimdir?",
    "options": [
      "Dostoyevski",
      "Lev Tolstoy",
      "Turgenyev",
      "Puşkin"
    ],
    "correctIndex": 1,
    "explanation": "Kont Lev Tolstoy, gerçekçi roman sanatının zirvesi sayılan bu başyapıtların yaratıcısıdır."
  },
  {
    "id": "quiz-204",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Çığlık (The Scream) adlı dışavurumcu başyapıt tablo hangi Norveçli ressama aittir?",
    "options": [
      "Edvard Munch",
      "Gustav Klimt",
      "Egon Schiele",
      "Wassily Kandinsky"
    ],
    "correctIndex": 0,
    "explanation": "Edvard Munch, 1893 tarihli eserinde modern insanın kaygı ve varoluşsal çığlığını yansıtmıştır."
  },
  {
    "id": "quiz-205",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Hamlet, Romeo ve Juliet, Macbeth ve Kral Lear trajedilerinin İngiliz kimdir?",
    "options": [
      "William Shakespeare",
      "Charles Dickens",
      "Christopher Marlowe",
      "Geoffrey Chaucer"
    ],
    "correctIndex": 0,
    "explanation": "Shakespeare, dünya tiyatro edebiyatının en büyük oyun yazarı ve şairi kabul edilir."
  },
  {
    "id": "quiz-206",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Saatleri Ayarlama Enstitüsü ve Huzur romanlarının yazarı kimdir?",
    "options": [
      "Ahmet Hamdi Tanpınar",
      "Oğuz Atay",
      "Yusuf Atılgan",
      "Peyami Safa"
    ],
    "correctIndex": 0,
    "explanation": "Ahmet Hamdi Tanpınar, Doğu ile Batı arasında bocalayan Türk modernleşmesini bu eserlerde işlemiştir."
  },
  {
    "id": "quiz-207",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Sürrealizm (Gerçeküstücülük) akımının 'Eriyen Saatler' tablosuyla bilinen ressamı?",
    "options": [
      "Salvador Dalí",
      "René Magritte",
      "Max Ernst",
      "Joan Miró"
    ],
    "correctIndex": 0,
    "explanation": "Salvador Dalí, 1931 tarihli 'Belleğin Azmi' tablosunda zamanın akışkanlığını eriyen saatlerle."
  },
  {
    "id": "quiz-208",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Sefiller (Les Misérables) ve Notre Dame'ın Kamburu romanlarının Fransız yazarı?",
    "options": [
      "Victor Hugo",
      "Émile Zola",
      "Gustave Flaubert",
      "Alexandre Dumas"
    ],
    "correctIndex": 0,
    "explanation": "Victor Hugo, 19. yüzyıl Fransız romantizminin ve toplumsal adalet mücadelesinin en güçlü sesidir."
  },
  {
    "id": "quiz-209",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Türk edebiyatında 'Tutunamayanlar' romanıyla postmodern edebiyatın kapısını?",
    "options": [
      "Oğuz Atay",
      "Bilge Karasu",
      "Vüs'at O. Bener",
      "Adalet Ağaoğlu"
    ],
    "correctIndex": 0,
    "explanation": "Oğuz Atay, 1972'de yayımladığı Tutunamayanlar ile Türk romanında çığır açmıştır."
  },
  {
    "id": "quiz-210",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Guernica tablosuyla İspanya İç Savaşı'ndaki sivil katliamını protesto eden ressam?",
    "options": [
      "Pablo Picasso",
      "Francisco Goya",
      "Diego Velázquez",
      "Joan Miró"
    ],
    "correctIndex": 0,
    "explanation": "Picasso, Guernica kasabasının bombalanmasının yarattığı dehşeti 1937'de dev tablosunda anlatmıştır."
  },
  {
    "id": "quiz-211",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Don Kişot romanıyla modern roman türünün ilk örneğini veren İspanyol kimdir?",
    "options": [
      "Miguel de Cervantes",
      "Federico García Lorca",
      "Lope de Vega",
      "Gabriel García Márquez"
    ],
    "correctIndex": 0,
    "explanation": "Cervantes, 1605 yılında yayımladığı Don Kişot ile şövalye romanlarını hicvederek modern romanı."
  },
  {
    "id": "quiz-212",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Ayasofya Camii'nin pandantiflerindeki ünlü mozaik figürler nelerdir?",
    "options": [
      "Dört Büyük Melek",
      "Dört Mevsim",
      "Dört İncil Yazarı",
      "Dört Element"
    ],
    "correctIndex": 0,
    "explanation": "Ayasofya'nın kubbe pandantiflerinde altı kanatlı melekler (Seraphim) tasvir edilmiştir."
  },
  {
    "id": "quiz-213",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Semerkant, Buhara ve İsfahan gibi şehirlerde görülen turkuaz çini kubbeli aittir?",
    "options": [
      "Timurlular ve",
      "Emeviler",
      "Endülüs",
      "Fatimiler"
    ],
    "correctIndex": 0,
    "explanation": "Timurlu ve Safevi mimarisi çini mozaikli turkuaz soğan kubbeleriyle İslam sanatının zirvesini."
  },
  {
    "id": "quiz-214",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Küçük Prens (Le Petit Prince) kitabının Fransız yazarı ve pilotu kimdir?",
    "options": [
      "Antoine de",
      "Albert Camus",
      "Jean-Paul Sartre",
      "Marcel Proust"
    ],
    "correctIndex": 0,
    "explanation": "Saint-Exupéry, bir çöl kazası sonrası Küçük Prens'in felsefi öyküsünü kaleme almıştır."
  },
  {
    "id": "quiz-215",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Dönüşüm adlı eserinde böceğe dönüşen Gregor Samsa'yı anlatan yazar kimdir?",
    "options": [
      "Franz Kafka",
      "Thomas Mann",
      "Hermann Hesse",
      "Stefan Zweig"
    ],
    "correctIndex": 0,
    "explanation": "Franz Kafka, modern insanın yabancılaşmasını ve bürokratik çaresizliğini bu başyapıtında anlatır."
  },
  {
    "id": "quiz-216",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Mimar Sinan'ın Edirne'de inşa ettiği ve 'ustalık eserim' dediği abidevi hangisidir?",
    "options": [
      "Süleymaniye Camii",
      "Selimiye Camii",
      "Şehzade Camii",
      "Rüstem Paşa Camii"
    ],
    "correctIndex": 1,
    "explanation": "Selimiye Camii (1575), tek kubbesi ve dört ince minaresiyle Mimar Sinan'ın başyapıtıdır."
  },
  {
    "id": "quiz-217",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Simyacı (The Alchemist) romanıyla dünya çapında milyonlarca okura ulaşan Brezilyalı?",
    "options": [
      "Paulo Coelho",
      "Jorge Luis Borges",
      "Gabriel García Márquez",
      "Mario Vargas Llosa"
    ],
    "correctIndex": 0,
    "explanation": "Paulo Coelho, Endülüslü çoban Santiago'nun Mısır piramitlerine yaptığı içsel yolculuğu anlatmıştır."
  },
  {
    "id": "quiz-218",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Kaplumbağa Terbiyecisi tablosunun ressamı olan müzeci kimdir?",
    "options": [
      "Osman Hamdi Bey",
      "Şeker Ahmet Paşa",
      "İbrahim Çallı",
      "Hoca Ali Rıza"
    ],
    "correctIndex": 0,
    "explanation": "Osman Hamdi Bey, modern Türk müzeciliğinin öncüsü ve oryantalist tarzda eser veren büyük bir."
  },
  {
    "id": "quiz-219",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Yüzyıllık Yalnızlık ve Kırmızı Pazartesi romanlarının Nobel ödüllü Kolombiyalı?",
    "options": [
      "Gabriel García Márquez",
      "Octavio Paz",
      "Carlos Fuentes",
      "Pablo Neruda"
    ],
    "correctIndex": 0,
    "explanation": "Márquez, 'büyülü gerçekçilik' akımının Macondo kasabası üzerinden anlatıldığı başyapıtın yazarıdır."
  },
  {
    "id": "quiz-220",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Beethoven'ın 9. Senfonisi'nin son bölümünde koro tarafından söylenen ünlü şiir?",
    "options": [
      "Neşeye Övgü",
      "Faust",
      "Erlkönig",
      "Gece Şarkısı"
    ],
    "correctIndex": 0,
    "explanation": "Friedrich Schiller'in 'Neşeye Övgü' şiiri, Beethoven'ın 9."
  },
  {
    "id": "quiz-221",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Türk edebiyatında hece ölçüsünü ustalıkla kullanan ve 'Çile' adlı şiir kimdir?",
    "options": [
      "Necip Fazıl Kısakürek",
      "Yahya Kemal Beyatlı",
      "Ahmet Haşim",
      "Cahit Sıtkı Tarancı"
    ],
    "correctIndex": 0,
    "explanation": "Necip Fazıl, hece vezniyle yazdığı mistik ve felsefi şiirlerini 'Çile' adlı eserinde toplamıştır."
  },
  {
    "id": "quiz-222",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Mona Lisa tablosunun orijinali günümüzde hangi şehirdeki müzede sergilenmektedir?",
    "options": [
      "Roma",
      "Paris (Louvre)",
      "Londra",
      "Madrid"
    ],
    "correctIndex": 1,
    "explanation": "Mona Lisa, Paris'teki Louvre Müzesi'nin Salle des États salonunda kurşun geçirmez cam ardında."
  },
  {
    "id": "quiz-223",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Klasik Türk müziğinde 200'den fazla makam bulunur; bunlardan hüzzam, nihavend eder?",
    "options": [
      "Müzik aletlerini",
      "Makam (dizi) adlarını",
      "Usul vuruşlarını",
      "Beste formlarını"
    ],
    "correctIndex": 1,
    "explanation": "Nihavend, Rast, Hüzzam, Türk sanat müziğinin en temel ve köklü makamlarındandır."
  },
  {
    "id": "quiz-224",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "'Otuz Beş Yaş' şiiriyle tanınan ünlü Türk şairi kimdir?",
    "options": [
      "Cahit Sıtkı Tarancı",
      "Ahmet Muhip Dıranas",
      "Orhan Veli Kanık",
      "Attila İlhan"
    ],
    "correctIndex": 0,
    "explanation": "Cahit Sıtkı Tarancı, 1946'da yazdığı Otuz Beş Yaş şiiriyle Türk şiirinde ölüm ve zaman temasını."
  },
  {
    "id": "quiz-225",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "İtalyan besteci Antonio Vivaldi'nin dört keman konçertosundan oluşan en ünlü?",
    "options": [
      "Dört Mevsim",
      "Kuğu Gölü",
      "Fındıkkıran",
      "Boléro"
    ],
    "correctIndex": 0,
    "explanation": "Dört Mevsim (Le quattro stagioni), ilkbahar, yaz, sonbahar ve kışı betimleyen barok bir şaheserdir."
  },
  {
    "id": "quiz-226",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Garip Akımı'nın (Birinci Yeni) öncüsü şairler kimlerdir?",
    "options": [
      "Garip Şairleri",
      "İkinci Yeni",
      "Toplumcu Şiir",
      "Saf Şiir"
    ],
    "correctIndex": 0,
    "explanation": "1941'de Garip kitabını yayımlayan bu üçlü, şiirde ölçü ve kafiyeyi kaldırarak sokağı şiire."
  },
  {
    "id": "quiz-227",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Divan edebiyatında aşk, şarap, kadın ve güzellik üzerine yazılan lirik nedir?",
    "options": [
      "Kaside",
      "Gazel",
      "Mesnevi",
      "Mersiye"
    ],
    "correctIndex": 1,
    "explanation": "Gazel, beyitlerden oluşan ve genellikle aşk ve güzellik konularını işleyen en yaygın divan."
  },
  {
    "id": "quiz-228",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Avusturyalı dahi besteci Wolfgang Amadeus Mozart hangi çağın (dönemin) temsilcisidir?",
    "options": [
      "Barok Dönem",
      "Klasik Dönem",
      "Romantik Dönem",
      "Modern Dönem"
    ],
    "correctIndex": 1,
    "explanation": "Mozart, Haydn ve genç Beethoven ile birlikte Klasik Dönem Viyana ekolünün zirvesidir."
  },
  {
    "id": "quiz-229",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Mai ve Siyah ile Aşk-ı Memnu romanlarının Servet-i Fünun dönemi yazarı kimdir?",
    "options": [
      "Halid Ziya Uşaklıgil",
      "Mehmet Rauf",
      "Tevfik Fikret",
      "Cenap Şahabettin"
    ],
    "correctIndex": 0,
    "explanation": "Halid Ziya Uşaklıgil, modern Türk roman tekniğini Batılı standartlara ulaştıran ilk büyük romancıdır."
  },
  {
    "id": "quiz-230",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Bale sanatının en tanınmış eserlerinden Kuğu Gölü ve Fındıkkıran'ın Rus kimdir?",
    "options": [
      "Pyotr İlyiç Çaykovski",
      "Sergey Rahmaninov",
      "Dmitri Şostakoviç",
      "İgor Stravinski"
    ],
    "correctIndex": 0,
    "explanation": "Çaykovski, romantik dönemin en zarif bale ve senfonilerini besteleyen Rus dâhisidir."
  },
  {
    "id": "quiz-231",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Oğuz Türklerinin efsanevi kahramanlık destanlarını anlatan eser nedir?",
    "options": [
      "Kıpçaklar",
      "Oğuzlar",
      "Uygurlar",
      "Karluklar"
    ],
    "correctIndex": 1,
    "explanation": "Dede Korkut Kitabı, Oğuz Türklerinin kahramanlıklarını, törelerini ve İslamiyet öncesi/sonrası."
  },
  {
    "id": "quiz-232",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Heykeltıraş Auguste Rodin'in derin düşünceye dalmış bir insanı betimleyen ünlü?",
    "options": [
      "Düşünen Adam",
      "Davut Heykeli",
      "Pietà",
      "Venüs de Milo"
    ],
    "correctIndex": 0,
    "explanation": "Düşünen Adam (Le Penseur), felsefi derinliği ve insan zihninin gücünü simgeleyen bronz bir heykeldir."
  },
  {
    "id": "quiz-233",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Yaban romanında aydın ve köylü çatışmasını işleyen yazar kimdir?",
    "options": [
      "Yakup Kadri",
      "Halide Edib Adıvar",
      "Reşat Nuri Güntekin",
      "Falih Rıfkı Atay"
    ],
    "correctIndex": 0,
    "explanation": "Yakup Kadri, Yaban romanında Anadolu köyündeki gözlemlerini ve milli mücadele atmosferini."
  },
  {
    "id": "quiz-234",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Çalıkuşu romanının idealist öğretmeni Feride'nin hikayesini yazan Türk edebiyatçısı?",
    "options": [
      "Reşat Nuri Güntekin",
      "Refik Halit Karay",
      "Memduh Şevket Esendal",
      "Ömer Seyfettin"
    ],
    "correctIndex": 0,
    "explanation": "Reşat Nuri Güntekin, Anadolu'da öğretmenlik yapan Feride'nin serüvenini Çalıkuşu'nda."
  },
  {
    "id": "quiz-235",
    "category": "Sanat & Edebiyat",
    "categorySlug": "genel-kultur",
    "question": "Kendi Kulağını Kesen ve ayçiçekleri tablolarıyla bilinen trajik hayatlı ressam?",
    "options": [
      "Vincent van Gogh",
      "Paul Cézanne",
      "Henri Matisse",
      "Edgar Degas"
    ],
    "correctIndex": 0,
    "explanation": "Vincent van Gogh, hayatı boyunca sadece tek bir tablo satabilmiş olmasına rağmen modern sanatın."
  },
  {
    "id": "quiz-236",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin uluslararası telefon alan kodu nedir?",
    "options": [
      "+90",
      "+49",
      "+33",
      "+44"
    ],
    "correctIndex": 0,
    "explanation": "Türkiye'nin uluslararası telefon ülke kodu +90'dır."
  },
  {
    "id": "quiz-237",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Nobel Barış Ödülü diğer Nobel ödüllerinden farklı olarak hangi ülkede verilir?",
    "options": [
      "İsveç (Stockholm)",
      "Norveç (Oslo)",
      "İsviçre (Cenevre)",
      "Danimarka (Kopenhag)"
    ],
    "correctIndex": 1,
    "explanation": "Alfred Nobel'in vasiyeti gereği Barış Ödülü Oslo'da, diğer tüm ödüller Stockholm'de takdim edilir."
  },
  {
    "id": "quiz-238",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Olimpiyat halkalarında yer alan 5 farklı renk neyi temsil eder?",
    "options": [
      "5 Kıtayı",
      "5 Okyanusu",
      "5 Spor Dalını",
      "5 Olimpiyat Kurucusunu"
    ],
    "correctIndex": 0,
    "explanation": "Mavi, sarı, siyah, yeşil ve kırmızı halkalar dünyanın 5 ana kıtasının kardeşliğini simgeler."
  },
  {
    "id": "quiz-239",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk deneysel televizyon yayını nerede başlatılmıştır?",
    "options": [
      "TRT (1968)",
      "İTÜ TV (1952)",
      "Anadolu Ajansı (1960)",
      "PTT (1975)"
    ],
    "correctIndex": 1,
    "explanation": "Türkiye'de ilk deneysel TV yayını 1952'de İTÜ TV tarafından yapılmış."
  },
  {
    "id": "quiz-240",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Satranç tahtasında toplam kaç adet kare bulunur?",
    "options": [
      "36",
      "49",
      "64",
      "81"
    ],
    "correctIndex": 2,
    "explanation": "Standart bir satranç tahtası 8x8 diziliminde toplam 64 açık ve koyu kareden oluşur."
  },
  {
    "id": "quiz-241",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin yüzölçümü yaklaşık kaç kilometrekaredir?",
    "options": [
      "500.000 km²",
      "783.562 km²",
      "950.000 km²",
      "1.200.000 km²"
    ],
    "correctIndex": 1,
    "explanation": "Türkiye Cumhuriyeti'nin göller dahil toplam yüzölçümü yaklaşık 783.562 kilometrekaredir."
  },
  {
    "id": "quiz-242",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Japonya'nın geleneksel güreş sporu hangisidir?",
    "options": [
      "Judo",
      "Karate",
      "Sumo",
      "Kendo"
    ],
    "correctIndex": 2,
    "explanation": "Sumo güreşi, Şinto ritüellerine dayanan köklü bir Japon ulusal sporudur."
  },
  {
    "id": "quiz-243",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Birleşmiş Milletler (BM) Genel Merkezi hangi şehirdedir?",
    "options": [
      "Cenevre",
      "New York",
      "Brüksel",
      "Paris"
    ],
    "correctIndex": 1,
    "explanation": "Birleşmiş Milletler'in ana idari genel merkezi New York'ta East River kıyısında bulunur."
  },
  {
    "id": "quiz-244",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de plaka kodu '01' olan ilimiz hangisidir?",
    "options": [
      "Adana",
      "Adıyaman",
      "Afyonkarahisar",
      "Ağrı"
    ],
    "correctIndex": 0,
    "explanation": "Alfabetik il plaka sıralamasında ilk sırada 01 kodu ile Adana yer alır."
  },
  {
    "id": "quiz-245",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Maraton koşusunun standart mesafesi tam olarak kaç kilometredir?",
    "options": [
      "40 km",
      "42.195 metre",
      "45 km",
      "50 km"
    ],
    "correctIndex": 1,
    "explanation": "Maraton mesafesi, 1908 Londra Olimpiyatları'nda saray önünde başlamasıyla 42."
  },
  {
    "id": "quiz-246",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türk lirasının simgesi (₺) hangi yılda kabul edilmiştir?",
    "options": [
      "2005",
      "2009",
      "2012",
      "2016"
    ],
    "correctIndex": 2,
    "explanation": "Tülay Lale tarafından tasarlanan çıpa ve yükselişi simgeleyen TL sembolü 1 Mart 2012'de."
  },
  {
    "id": "quiz-247",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Güneş'in uzaydan bakıldığında görünen gerçek rengi nedir?",
    "options": [
      "Kırmızı",
      "Beyaz",
      "Mavi",
      "Yeşil"
    ],
    "correctIndex": 1,
    "explanation": "Güneş tüm görünür dalga boylarını birlikte yaydığı için uzaydan bakıldığında saf beyaz renktedir."
  },
  {
    "id": "quiz-248",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk yerli ve milli haberleşme uydusu hangisidir?",
    "options": [
      "Türksat 1A",
      "Türksat 4A",
      "Türksat 5B",
      "Türksat 6A"
    ],
    "correctIndex": 3,
    "explanation": "Türksat 6A, Türk mühendisleri tarafından yerli imkanlarla üretilen ilk milli haberleşme uydusudur."
  },
  {
    "id": "quiz-249",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Futbolda bir takım sahaya kaç oyuncu ile çıkar?",
    "options": [
      "9",
      "10",
      "11",
      "12"
    ],
    "correctIndex": 2,
    "explanation": "Resmi futbol kurallarına göre her takım biri kaleci olmak üzere 11 oyuncuyla maça başlar."
  },
  {
    "id": "quiz-250",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünya Sağlık Örgütü'nün (WHO) genel merkezi hangi şehirdedir?",
    "options": [
      "Cenevre",
      "Viyana",
      "Roma",
      "Londra"
    ],
    "correctIndex": 0,
    "explanation": "DSÖ, İsviçre'nin Cenevre kentinde uluslararası sağlık koordinasyonunu yönetir."
  },
  {
    "id": "quiz-251",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk nükleer güç santrali hangi ilimizde inşa edilmektedir?",
    "options": [
      "Sinop",
      "Mersin (Akkuyu)",
      "Kırklareli",
      "İzmir"
    ],
    "correctIndex": 1,
    "explanation": "Akkuyu Nükleer Güç Santrali, Mersin'in Gülnar ilçesi kıyısında inşa edilmektedir."
  },
  {
    "id": "quiz-252",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Gökkuşağında sırasıyla dıştan içe kaç renk bulunur?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctIndex": 2,
    "explanation": "Gökkuşağında kırmızı, turuncu, sarı, yeşil, mavi, lacivert ve mor olmak üzere 7 renk ayırt edilir."
  },
  {
    "id": "quiz-253",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye Cumhuriyeti'nin ilk Başbakanı kimdir?",
    "options": [
      "Fevzi Çakmak",
      "İsmet İnönü",
      "Rauf Orbay",
      "Ali Fethi Okyar"
    ],
    "correctIndex": 1,
    "explanation": "Cumhuriyetin ilanı sonrasında ilk hükümeti kurma görevi İsmet İnönü'ye verilmiştir."
  },
  {
    "id": "quiz-254",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyanın en yüksek binası olan Burç Halife (Burj Khalifa) hangi şehirdedir?",
    "options": [
      "Doha",
      "Riyad",
      "Dubai",
      "Abu Dabi"
    ],
    "correctIndex": 2,
    "explanation": "Burj Khalifa, 828 metre yüksekliğiyle Birleşik Arap Emirlikleri'nin Dubai kentindedir."
  },
  {
    "id": "quiz-255",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de kaç tane il bulunmaktadır?",
    "options": [
      "67",
      "80",
      "81",
      "82"
    ],
    "correctIndex": 2,
    "explanation": "Türkiye'de son olarak Düzce'nin il olmasıyla birlikte toplam 81 il bulunmaktadır."
  },
  {
    "id": "quiz-256",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kuzey Atlantik Antlaşması Örgütü'nün (NATO) merkezi hangi şehirdedir?",
    "options": [
      "Brüksel (Belçika)",
      "Washington (ABD)",
      "Paris (Fransa)",
      "Berlin (Almanya)"
    ],
    "correctIndex": 0,
    "explanation": "NATO'nun siyasi ve askeri ana karargahı Belçika'nın başkenti Brüksel'dedir."
  },
  {
    "id": "quiz-257",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Basketbol maçlarında her takım sahada aynı anda kaç oyuncu ile mücadele eder?",
    "options": [
      "4",
      "5",
      "6",
      "7"
    ],
    "correctIndex": 1,
    "explanation": "Standart basketbol karşılaşmalarında her takımdan 5 oyuncu parkede yer alır."
  },
  {
    "id": "quiz-258",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de Boğaziçi Köprüsü (15 Temmuz Şehitler Köprüsü) hangi yıl hizmete?",
    "options": [
      "1965",
      "1973",
      "1988",
      "1993"
    ],
    "correctIndex": 1,
    "explanation": "Cumhuriyetin 50. yılı olan 29 Ekim 1973 tarihinde Boğaziçi'nin ilk asma köprüsü açılmıştır."
  },
  {
    "id": "quiz-259",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Uluslararası Para Fonu'nun kısa adı nedir?",
    "options": [
      "UNICEF",
      "UNESCO",
      "IMF",
      "WHO"
    ],
    "correctIndex": 2,
    "explanation": "IMF (International Monetary Fund), küresel finansal istikrarı izleyen kuruluştur."
  },
  {
    "id": "quiz-260",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk kadın başbakanı kimdir?",
    "options": [
      "Tansu Çiller",
      "Behice Boran",
      "Fatma Aliye",
      "Sabiha Gökçen"
    ],
    "correctIndex": 0,
    "explanation": "Tansu Çiller, 1993-1996 yılları arasında Türkiye Cumhuriyeti Başbakanı olarak görev yapmıştır."
  },
  {
    "id": "quiz-261",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Bir standart iskambil destesinde toplam kaç adet oyun kartı bulunur?",
    "options": [
      "48",
      "52",
      "54",
      "60"
    ],
    "correctIndex": 1,
    "explanation": "Jokerler hariç tutulduğunda standart destede 4 gruptan 13'er adet olmak üzere 52 kart vardır."
  },
  {
    "id": "quiz-262",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünya Barış Günü Türkiye'de ve birçok ülkede geleneksel olarak hangi kutlanır?",
    "options": [
      "1 Eylül",
      "21 Eylül",
      "1 Mayıs",
      "24 Ekim"
    ],
    "correctIndex": 0,
    "explanation": "II. Dünya Savaşı'nın başladığı 1 Eylül tarihi Türkiye'de Dünya Barış Günü olarak anılır."
  },
  {
    "id": "quiz-263",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk yerli otomobil girişimi olarak 1961'de üretilen aracın adı nedir?",
    "options": [
      "Anadol",
      "Devrim",
      "Murat 124",
      "Tofaş"
    ],
    "correctIndex": 1,
    "explanation": "Devrim arabası, 1961'de Eskişehir Cer Atölyesi'nde Türk mühendislerince 129 günde yapılmıştır."
  },
  {
    "id": "quiz-264",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Voleybol maçında her takım sahada kaç oyuncu ile yer alır?",
    "options": [
      "5",
      "6",
      "7",
      "8"
    ],
    "correctIndex": 1,
    "explanation": "Standart voleybolda takımlar sahada 6 oyuncu ile mücadele eder ve saat yönünde dönerler."
  },
  {
    "id": "quiz-265",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin UNESCO Dünya Mirası'na giren ilk arkeolojik alanı neresidir?",
    "options": [
      "Efes",
      "Divriği Ulu Camii",
      "Truva",
      "Hattuşa"
    ],
    "correctIndex": 1,
    "explanation": "1985 yılında Sivas Divriği Ulu Camii ve Darüşşifası Türkiye'den listeye giren ilk eserdir."
  },
  {
    "id": "quiz-266",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyadaki ilk metrosu 1863 yılında hangi şehirde faaliyete geçmiştir?",
    "options": [
      "Paris",
      "Londra",
      "New York",
      "İstanbul"
    ],
    "correctIndex": 1,
    "explanation": "Londra Metrosu (The Tube), buharlı lokomotiflerle 1863'te yeraltında çalışan ilk metrodur."
  },
  {
    "id": "quiz-267",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "İstanbul'daki tarihi 'Tünel' füniküleri (1875), dünyada Londra'dan sonraki kaçıncı?",
    "options": [
      "İkinci",
      "Üçüncü",
      "Beşinci",
      "Onuncu"
    ],
    "correctIndex": 0,
    "explanation": "Karaköy ile Beyoğlu'nu bağlayan Tünel, Londra'dan sonra dünyanın en eski ikinci yeraltı raylı."
  },
  {
    "id": "quiz-268",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ve dünyanın ilk kadın savaş pilotu kimdir?",
    "options": [
      "Bedriye Gökmen",
      "Sabiha Gökçen",
      "Leman Altınçekiç",
      "Yıldız Eruç"
    ],
    "correctIndex": 1,
    "explanation": "Atatürk'ün manevi kızı Sabiha Gökçen, 1937'de askeri uçuşlar yaparak dünyanın ilk kadın savaş."
  },
  {
    "id": "quiz-269",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Fransa'nın başkenti Paris'ten geçen ünlü nehir hangisidir?",
    "options": [
      "Tuna Nehri",
      "Ren Nehri",
      "Sen Nehri (Seine)",
      "Elbe Nehri"
    ],
    "correctIndex": 2,
    "explanation": "Sen Nehri (Seine), Paris'i ortasından ikiye bölerek şehre tarihi silüetini kazandırır."
  },
  {
    "id": "quiz-270",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kuzey Kıbrıs Türk Cumhuriyeti (KKTC) hangi yıl ilan edilmiştir?",
    "options": [
      "1974",
      "1983",
      "1990",
      "1999"
    ],
    "correctIndex": 1,
    "explanation": "KKTC, 15 Kasım 1983 tarihinde bağımsızlığını ilan etmiştir."
  },
  {
    "id": "quiz-271",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Nobel Ödülleri adını hangi dinamitin mucidi olan İsveçli sanayiciden alır?",
    "options": [
      "Alfred Nobel",
      "Emil Nobel",
      "Ragnar Nobel",
      "Ludvig Nobel"
    ],
    "correctIndex": 0,
    "explanation": "Alfred Nobel, patlayıcı sanayisinden kazandığı servetini insanlığa hizmet edenlere ödül olarak."
  },
  {
    "id": "quiz-272",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk kadın muhtar seçilen Gülesin Hanım hangi ilimizin Çine gelmiştir?",
    "options": [
      "İzmir",
      "Aydın",
      "Muğla",
      "Manisa"
    ],
    "correctIndex": 1,
    "explanation": "Gül Esin, 1933 yılında Aydın'ın Çine ilçesine bağlı Demircidere köyünde muhtar seçilmiştir."
  },
  {
    "id": "quiz-273",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Avrupa Birliği'nin yürütme organı olan kurum hangisidir?",
    "options": [
      "Avrupa Parlamentosu",
      "Avrupa Komisyonu",
      "Avrupa Konseyi",
      "Adalet Divanı"
    ],
    "correctIndex": 1,
    "explanation": "Avrupa Komisyonu, AB mevzuatını öneren ve bütçeyi yöneten yürütme organıdır."
  },
  {
    "id": "quiz-274",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk yerli üretim insansız hava aracı (İHA) hangisidir?",
    "options": [
      "Bayraktar TB2",
      "ANKA",
      "Şimşek",
      "Akıncı"
    ],
    "correctIndex": 0,
    "explanation": "Bayraktar TB2 ve TUSAŞ ANKA sistemleri, Türkiye'nin ilk operasyonel yerli İHA'larıdır."
  },
  {
    "id": "quiz-275",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Olimpiyat Oyunları kural olarak kaç yılda bir düzenlenir?",
    "options": [
      "2 yılda bir",
      "3 yılda bir",
      "4 yılda bir",
      "5 yılda bir"
    ],
    "correctIndex": 2,
    "explanation": "Modern yaz ve kış olimpiyatları dörder yıllık periyotlarla organize edilir."
  },
  {
    "id": "quiz-276",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kızılhaç teşkilatının Müslüman ülkelerdeki karşılığı olan simge nedir?",
    "options": [
      "Kızılay (Hilal)",
      "Kırmızı Yıldız",
      "Kırmızı Güneş",
      "Yeşil Ay"
    ],
    "correctIndex": 0,
    "explanation": "Kızılay (Kırmızı Hilal), ilk kez 1876-1878 Osmanlı-Rus Savaşı'nda Osmanlı tarafından kullanılmıştır."
  },
  {
    "id": "quiz-277",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk petrol kuyusu nerede açılmış ve petrol bulunmuştur?",
    "options": [
      "Adana",
      "Batman (Raman Dağı)",
      "Diyarbakır",
      "Siirt"
    ],
    "correctIndex": 1,
    "explanation": "1940'ta Batman Raman Dağı'ndaki Raman-8 kuyusunda Türkiye'nin ilk ticari petrolü çıkarılmıştır."
  },
  {
    "id": "quiz-278",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyanın en çok konuşulan yapay uluslararası dili hangisidir?",
    "options": [
      "Klingonca",
      "Esperanto",
      "Volapük",
      "Ido"
    ],
    "correctIndex": 1,
    "explanation": "Esperanto, L. L. Zamenhof tarafından 1887'de geliştirilen en yaygın yapay dildir."
  },
  {
    "id": "quiz-279",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin 1958'de ilan edilen ilk milli parkı neresidir?",
    "options": [
      "Yozgat Çamlığı",
      "Soğuksu Milli Parkı",
      "Uludağ Milli Parkı",
      "Göreme Milli Parkı"
    ],
    "correctIndex": 0,
    "explanation": "Yozgat Çamlığı, 1958 yılında Türkiye'nin ilk milli parkı ilan edilmiştir."
  },
  {
    "id": "quiz-280",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türk bayrağındaki oran ve standartlar hangi kanunla belirlenmiştir?",
    "options": [
      "1923 Teşkilat",
      "1936 Bayrak Kanunu",
      "1960 Anayasası",
      "1982 Anayasası"
    ],
    "correctIndex": 1,
    "explanation": "2994 sayılı Türk Bayrağı Kanunu, 29 Mayıs 1936'da bayrağın ölçü ve oranlarını belirlemiştir."
  },
  {
    "id": "quiz-281",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünya Posta Birliği'nin (UPU) merkezi hangi İsviçre kentindedir?",
    "options": [
      "Zürih",
      "Bern",
      "Cenevre",
      "Basel"
    ],
    "correctIndex": 1,
    "explanation": "1874'te kurulan Dünya Posta Birliği'nin merkezi İsviçre'nin Bern kentindedir."
  },
  {
    "id": "quiz-282",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin en batı noktası hangi ilimiz sınırları içindedir?",
    "options": [
      "Edirne",
      "Çanakkale (Gökçeada)",
      "İzmir",
      "Kırklareli"
    ],
    "correctIndex": 1,
    "explanation": "Türkiye'nin en batı ucu Çanakkale'ye bağlı Gökçeada'daki İnceburun (Avlakaburnu)'dur."
  },
  {
    "id": "quiz-283",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin en doğu noktası hangi sınır kapısı yakınlarındadır?",
    "options": [
      "Kapıkule",
      "Dilucu (Iğdır)",
      "Sarp",
      "Habur"
    ],
    "correctIndex": 1,
    "explanation": "Iğdır'ın Aralık ilçesindeki Dilucu Sınır Kapısı, Türkiye'nin en doğu ucudur."
  },
  {
    "id": "quiz-284",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk nüfus sayımı Cumhuriyet döneminde hangi yılda yapılmıştır?",
    "options": [
      "1923",
      "1927",
      "1935",
      "1940"
    ],
    "correctIndex": 1,
    "explanation": "Cumhuriyetin ilk genel nüfus sayımı 28 Ekim 1927'de yapılmış ve nüfus 13.648.270 çıkmıştır."
  },
  {
    "id": "quiz-285",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyanın ilk kadın başbakanı olan Sirimavo Bandaranaike hangi ülkede seçilmiştir?",
    "options": [
      "Hindistan",
      "Sri Lanka (Seylan)",
      "İsrail",
      "İngiltere"
    ],
    "correctIndex": 1,
    "explanation": "Sirimavo Bandaranaike, 1960 yılında Seylan'da (günümüz Sri Lanka) dünyanın ilk kadın başbakanı."
  },
  {
    "id": "quiz-286",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "UNESCO kısaltmasının temsil ettiği temel alanlar hangileridir?",
    "options": [
      "UNICEF (Çocuk)",
      "Eğitim, Bilim, Kültür",
      "UNDP (Kalkınma)",
      "Çevre Fonu"
    ],
    "correctIndex": 1,
    "explanation": "UNESCO (United Nations Educational, Scientific and Cultural Organization), eğitim ve kültürel."
  },
  {
    "id": "quiz-287",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin Akdeniz'deki en büyük konteyner limanı hangisidir?",
    "options": [
      "İskenderun Limanı",
      "Mersin Limanı",
      "Antalya Limanı",
      "Fethiye Limanı"
    ],
    "correctIndex": 1,
    "explanation": "Mersin Limanı, hinterland genişliği ve konteyner hacmiyle Türkiye'nin Akdeniz'deki en büyük."
  },
  {
    "id": "quiz-288",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Uluslararası sivil havacılıkta acil tehlike durumunu bildiren standart çağrı?",
    "options": [
      "Mayday",
      "SOS",
      "Pan-Pan",
      "Roger"
    ],
    "correctIndex": 0,
    "explanation": "Fransızcadaki 'venez m'aider' (bana yardıma gelin) ifadesinden türeyen 'Mayday' kelimesidir."
  },
  {
    "id": "quiz-289",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de 'Güller Diyarı' olarak bilinen ve gül yağı üretiminde dünya hangisidir?",
    "options": [
      "Burdur",
      "Isparta",
      "Afyonkarahisar",
      "Denizli"
    ],
    "correctIndex": 1,
    "explanation": "Isparta, kozmetik ve parfümeri için kullanılan yağ gülü üretiminde dünya ihtiyacının büyük."
  },
  {
    "id": "quiz-290",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Modern olimpiyatlarda altın, gümüş ve bronz madalya uygulaması ilk kez başlamıştır?",
    "options": [
      "1896 Atina",
      "1904 St. Louis",
      "1924 Paris",
      "1936 Berlin"
    ],
    "correctIndex": 1,
    "explanation": "İlk üç dereceye altın, gümüş ve bronz madalya verilmesi 1904 St."
  },
  {
    "id": "quiz-291",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin tahıl ambarı olarak nitelendirilen geniş ovası hangisidir?",
    "options": [
      "Çukurova",
      "Konya Ovası",
      "Bafra Ovası",
      "Gediz Ovası"
    ],
    "correctIndex": 1,
    "explanation": "Konya Ovası, geniş düzlükleri ve buğday üretimiyle Türkiye'nin tahıl ambarı unvanına sahiptir."
  },
  {
    "id": "quiz-292",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Eski Türk takvimlerinde kullanılan 12 Hayvanlı Türk Takvimi'nde her yıl?",
    "options": [
      "Bir gezegen adı",
      "Bir hayvan adı",
      "Bir renk adı",
      "Bir hükümdar adı"
    ],
    "correctIndex": 1,
    "explanation": "12 Hayvanlı Türk Takvimi'nde 12 yıllık döngüdeki her yıl sıçan, sığır, pars gibi hayvan."
  },
  {
    "id": "quiz-293",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Güneydoğu Anadolu Projesi'nin kalbi olan Atatürk Barajı hangi nehirdedir?",
    "options": [
      "Dicle",
      "Fırat",
      "Kızılırmak",
      "Seyhan"
    ],
    "correctIndex": 1,
    "explanation": "Atatürk Barajı, Güneydoğu Anadolu Projesi (GAP) kapsamında Fırat Nehri üzerinde inşa edilmiştir."
  },
  {
    "id": "quiz-294",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Başlangıç meridyeni (0 derece) hangi gözlemevinden geçer?",
    "options": [
      "Greenwich (Londra)",
      "Paris",
      "Kandilli (İstanbul)",
      "Pekin"
    ],
    "correctIndex": 0,
    "explanation": "Başlangıç meridyeni (Prime Meridian), İngiltere'nin başkenti Londra'daki Greenwich Kraliyet."
  },
  {
    "id": "quiz-295",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Yozgat Çamlığı Milli Parkı hangi ağaç türüyle ünlüdür?",
    "options": [
      "Karaçam",
      "Kızılçam",
      "Sedir",
      "Kayın"
    ],
    "correctIndex": 0,
    "explanation": "Yozgat Çamlığı, Kafkas karaçamı türünün İç Anadolu'daki kalıntı ormanıdır."
  },
  {
    "id": "quiz-296",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dört yılda bir eklenen artık gün hangi ayın sonuna eklenir?",
    "options": [
      "Ocak",
      "Şubat (29 Şubat)",
      "Aralık",
      "Temmuz"
    ],
    "correctIndex": 1,
    "explanation": "Artık yıllarda Şubat ayı 28 yerine 29 çeker ve takvim ile mevsimler senkronize edilir."
  },
  {
    "id": "quiz-297",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk kadın avukat ve kadın hakları savunucusu kimdir?",
    "options": [
      "Süreyya Ağaoğlu",
      "Halide Edib",
      "Nezihe Muhiddin",
      "Mualla Eyüboğlu"
    ],
    "correctIndex": 0,
    "explanation": "Süreyya Ağaoğlu, 1927'de İstanbul Barosu'na kaydolarak Türkiye'nin ilk kadın avukatı olmuştur."
  },
  {
    "id": "quiz-298",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Ölümsüzlük arayışını anlatan dünyanın en eski destanı hangisidir?",
    "options": [
      "İlyada",
      "Gılgamış Destanı",
      "Mahabharata",
      "Odesa"
    ],
    "correctIndex": 1,
    "explanation": "Gılgamış Destanı, Uruk Kralı Gılgamış'ın arkadaşı Enkidu'nun ardından ölümsüzlüğü aramasını anlatır."
  },
  {
    "id": "quiz-299",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin Karadeniz ile Akdeniz'i birbirine bağlayan iç denizi hangisidir?",
    "options": [
      "Marmara Denizi",
      "Ege Denizi",
      "Azak Denizi",
      "Hazar Denizi"
    ],
    "correctIndex": 0,
    "explanation": "Marmara Denizi, tamamen Türkiye sınırları içinde yer alan stratejik bir iç denizdir."
  },
  {
    "id": "quiz-300",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyada kadınlara ilk kez genel oy hakkı tanıyan ülke hangisidir?",
    "options": [
      "Yeni Zelanda",
      "İsviçre",
      "Fransa",
      "ABD"
    ],
    "correctIndex": 0,
    "explanation": "Yeni Zelanda, 1893 yılında kadınlara ulusal seçimlerde oy kullanma hakkı veren ilk ülkedir."
  },
  {
    "id": "quiz-301",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye Cumhuriyeti'nin ilk kadın hekimi kimdir?",
    "options": [
      "Safiye Ali",
      "Afife Jale",
      "Keriman Halis",
      "Fatma Seher"
    ],
    "correctIndex": 0,
    "explanation": "Dr. Safiye Ali, Almanya'da tıp eğitimi alarak Türkiye'nin ilk kadın tıp doktoru olmuştur."
  },
  {
    "id": "quiz-302",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Geleneksel Türk gölge oyununun iki ana başkarakteri kimlerdir?",
    "options": [
      "Karagöz ve Hacivat",
      "Kavuklu ve Pişekar",
      "Meddah ve İbiş",
      "Nasreddin ve Keloğlan"
    ],
    "correctIndex": 0,
    "explanation": "Karagöz (halk adamı) ve Hacivat (okumuş aydın), Türk gölge tiyatrosunun temel figürleridir."
  },
  {
    "id": "quiz-303",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "İlk yerli uçağı üreten ve özel uçuş okulu açan Türk tayyareci kimdir?",
    "options": [
      "Vecihi Hürkuş",
      "Nuri Demirağ",
      "Mehmet Ali Kurçer",
      "Şakir Zümre"
    ],
    "correctIndex": 0,
    "explanation": "Vecihi Hürkuş, Vecihi K-VI adlı ilk yerli uçağı tasarlamış ve Türk sivil havacılığının öncüsü."
  },
  {
    "id": "quiz-304",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Hazar Denizi kıyısında bulunan Azerbaycan'ın başkenti neresidir?",
    "options": [
      "Tiflis",
      "Bakü",
      "Erivan",
      "Aşkabat"
    ],
    "correctIndex": 1,
    "explanation": "Bakü, Kafkasya'nın en büyük kenti ve Azerbaycan'ın Hazar kıyısındaki başkentidir."
  },
  {
    "id": "quiz-305",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Atatürk'ün Nutuk eseri hangi yıllar arasındaki olayları belgeler?",
    "options": [
      "1919 - 1927",
      "1914 - 1923",
      "1923 - 1938",
      "1918 - 1920"
    ],
    "correctIndex": 0,
    "explanation": "Nutuk, 1919'da Samsun'a çıkıştan başlayarak 1927 yılına kadar olan bağımsızlık ve inkılap."
  },
  {
    "id": "quiz-306",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Osmanlı Devleti'nde ilk nüfus sayımı hangi padişah döneminde yapılmıştır?",
    "options": [
      "II. Mahmud",
      "Abdülmecid",
      "II. Abdülhamid",
      "III. Selim"
    ],
    "correctIndex": 0,
    "explanation": "II. Mahmud döneminde 1831 yılında sadece erkeklerin sayıldığı ilk modern nüfus sayımı yapılmıştır."
  },
  {
    "id": "quiz-307",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Mısır'ın fethiyle halifeliğin Osmanlı'ya geçtiği savaş hangisidir?",
    "options": [
      "Ridaniye Savaşı",
      "Mercidabık Savaşı",
      "Çaldıran Savaşı",
      "Otlukbeli Savaşı"
    ],
    "correctIndex": 0,
    "explanation": "1517 Ridaniye Savaşı ile Memlük Devleti yıkılmış ve Mısır ile halifelik Osmanlı'ya geçmiştir."
  },
  {
    "id": "quiz-308",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "İlk Türk kadın tiyatro oyuncusu kimdir?",
    "options": [
      "Afife Jale",
      "Bedia Muvahhit",
      "Cahide Sonku",
      "Neyyire Neyir"
    ],
    "correctIndex": 0,
    "explanation": "Afife Jale, 1920'de Kadıköy'de 'Tatlı Sır' oyununda sahneye çıkan ilk Müslüman Türk kadınıdır."
  },
  {
    "id": "quiz-309",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Osmanlı Devleti'nde Şeyhülislamlık makamının resmi dairesine ne ad verilirdi?",
    "options": [
      "Bab-ı Ali",
      "Bab-ı Meşihat",
      "Divan-ı Hümayun",
      "Defterdarlık"
    ],
    "correctIndex": 1,
    "explanation": "Bab-ı Meşihat, dini fetva ve şer'i mahkemelerin başında bulunan Şeyhülislamlık makamıdır."
  },
  {
    "id": "quiz-310",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "1402 Ankara Savaşı hangi iki hükümdar arasında yapılmıştır?",
    "options": [
      "Yıldırım - Timur",
      "Fatih - Uzun Hasan",
      "I. Murad - Lazar",
      "Yavuz - Şah İsmail"
    ],
    "correctIndex": 0,
    "explanation": "1402 Ankara Savaşı'nda Timur, Yıldırım Bayezid'i mağlup etmiş ve Osmanlı Fetret Devri'ne girmiştir."
  },
  {
    "id": "quiz-311",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "'Lambalı Kadın' lakaplı modern hemşireliğin kurucusu kimdir?",
    "options": [
      "Florence Nightingale",
      "Clara Barton",
      "Mary Seacole",
      "Edith Cavell"
    ],
    "correctIndex": 0,
    "explanation": "Florence Nightingale, Üsküdar Selimiye Kışlası'nda yaralı askerleri tedavi ederek modern."
  },
  {
    "id": "quiz-312",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Osmanlı Devleti'nin ilk başkenti neresidir?",
    "options": [
      "Bursa",
      "Edirne",
      "Söğüt",
      "İznik"
    ],
    "correctIndex": 2,
    "explanation": "Osmanlı Beyliği'nin ilk idari merkezi Osman Gazi döneminde Söğüt kasabası olmuştur."
  },
  {
    "id": "quiz-313",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Selçuklu'da esnaf ve zanaatkarların dayanışma teşkilatı hangisidir?",
    "options": [
      "Ahi Teşkilatı",
      "Yeniçeri Ocağı",
      "İltizam",
      "Tımar"
    ],
    "correctIndex": 0,
    "explanation": "Ahi Evran tarafından Kırşehir merkezli kurulan Ahilik, mesleki ahlak ve usta-çırak sistemini."
  },
  {
    "id": "quiz-314",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Sivas Kongresi hangi yıl toplanmıştır?",
    "options": [
      "1918",
      "1919",
      "1920",
      "1921"
    ],
    "correctIndex": 1,
    "explanation": "Sivas Kongresi, 4-11 Eylül 1919 tarihleri arasında 'Manda ve himaye kabul edilemez' kararıyla."
  },
  {
    "id": "quiz-315",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Erzurum Kongresi'ne başkanlık eden milli mücadele lideri kimdir?",
    "options": [
      "Mustafa Kemal Paşa",
      "Kazım Karabekir",
      "Rauf Orbay",
      "Refet Bele"
    ],
    "correctIndex": 0,
    "explanation": "Erzurum Kongresi, 23 Temmuz 1919'da Mustafa Kemal Paşa başkanlığında toplanmıştır."
  },
  {
    "id": "quiz-316",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Başkomutanlık Meydan Muharebesi hangi tarihte zaferle sonuçlanmıştır?",
    "options": [
      "19 Mayıs 1919",
      "23 Nisan 1920",
      "30 Ağustos 1922",
      "29 Ekim 1923"
    ],
    "correctIndex": 2,
    "explanation": "30 Ağustos 1922'de Dumlupınar'da Yunan ordusu imha edilmiş ve 30 Ağustos Zafer Bayramı olmuştur."
  },
  {
    "id": "quiz-317",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Osmanlı Devleti'nin ilk resmi gazetesi hangisidir?",
    "options": [
      "Takvim-i Vekayi",
      "Ceride-i Havadis",
      "Tercüman-ı Ahval",
      "Tasvir-i Efkar"
    ],
    "correctIndex": 0,
    "explanation": "Takvim-i Vekayi, 1831 yılında II. Mahmud döneminde haftalık olarak yayımlanmaya başlamıştır."
  },
  {
    "id": "quiz-318",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Mimar Sinan'ın İstanbul'daki ilk büyük eseri kabul edilen cami hangisidir?",
    "options": [
      "Şehzade Camii",
      "Süleymaniye Camii",
      "Mihrimah Sultan Camii",
      "Kılıç Ali Paşa Camii"
    ],
    "correctIndex": 0,
    "explanation": "Mimar Sinan, 1548'de tamamladığı Şehzade Camii'ni 'çıraklık eserim' olarak nitelendirmiştir."
  },
  {
    "id": "quiz-319",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "İlk Türk kadın heykeltıraş kimdir?",
    "options": [
      "Sabiha Bengütaş",
      "Aliye Berger",
      "Fahrelnissa Zeid",
      "Mihri Müşfik"
    ],
    "correctIndex": 0,
    "explanation": "Sabiha Bengütaş, Sanayi-i Nefise Mektebi heykel bölümünün ilk kadın mezunu ve heykeltıraşıdır."
  },
  {
    "id": "quiz-320",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "İstiklal Madalyası Kanunu hangi yıl TBMM tarafından kabul edilmiştir?",
    "options": [
      "1920",
      "1923",
      "1924",
      "1928"
    ],
    "correctIndex": 0,
    "explanation": "İstiklal Madalyası, 29 Kasım 1920'de Milli Mücadele'de yararlılık gösterenler için ihdas edilmiştir."
  },
  {
    "id": "quiz-321",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "1926'da Türkiye'nin ilk Atatürk anıtını yapan heykeltıraş kimdir?",
    "options": [
      "Heinrich Krippel",
      "Pietro Canonica",
      "Ali Hadi Bara",
      "Kenan Yontunç"
    ],
    "correctIndex": 0,
    "explanation": "Avusturyalı heykeltıraş Heinrich Krippel, Sarayburnu'ndaki ilk Atatürk anıtını bronzdan dökmüştür."
  },
  {
    "id": "quiz-322",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Türkiye'de tarımda traktör kullanımı hangi on yılda hızlanmıştır?",
    "options": [
      "1930'lar",
      "1950'ler",
      "1970'ler",
      "1990'lar"
    ],
    "correctIndex": 1,
    "explanation": "1950'li yıllarda Marshall Planı ve mekanizasyonla birlikte Türkiye'de traktör sayısı hızla."
  },
  {
    "id": "quiz-323",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Boğazlar üzerinde Türkiye'ye tam egemenlik veren sözleşme hangisidir?",
    "options": [
      "Montrö Sözleşmesi",
      "Lozan Antlaşması",
      "Mondros Mütarekesi",
      "Sevr Antlaşması"
    ],
    "correctIndex": 0,
    "explanation": "20 Temmuz 1936'da imzalanan Montrö Sözleşmesi ile Boğazlar Komisyonu kalkmış ve Türk askeri."
  },
  {
    "id": "quiz-324",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Osmanlı Devleti'nde ilk kağıt para (Kaime) hangi padişah döneminde basılmıştır?",
    "options": [
      "Sultan Abdülmecid",
      "II. Mahmud",
      "Abdülaziz",
      "V. Murad"
    ],
    "correctIndex": 0,
    "explanation": "1840 yılında Sultan Abdülmecid döneminde faiz getirili hazine bonosu niteliğinde Kaime çıkarılmıştır."
  },
  {
    "id": "quiz-325",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Tevhid-i Tedrisat (Öğretim Birliği) Kanunu hangi tarihte kabul edildi?",
    "options": [
      "29 Ekim 1923",
      "3 Mart 1924",
      "1 Kasım 1928",
      "5 Şubat 1937"
    ],
    "correctIndex": 1,
    "explanation": "3 Mart 1924'te kabul edilen kanunla tüm eğitim kurumları Milli Eğitim Bakanlığı'na bağlanmıştır."
  },
  {
    "id": "quiz-326",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Harf İnkılabı ile yeni Türk harfleri hangi yıl kabul edilmiştir?",
    "options": [
      "1926",
      "1928",
      "1930",
      "1934"
    ],
    "correctIndex": 1,
    "explanation": "1 Kasım 1928 tarihinde TBMM'de kabul edilen kanunla Latin esaslı yeni Türk alfabesine geçilmiştir."
  },
  {
    "id": "quiz-327",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Hatay Devleti Türkiye Cumhuriyeti'ne hangi yıl katılmıştır?",
    "options": [
      "1936",
      "1938",
      "1939",
      "1940"
    ],
    "correctIndex": 2,
    "explanation": "Hatay Millet Meclisi, 23 Haziran 1939'da oy birliğiyle Türkiye'ye katılma kararı almıştır."
  },
  {
    "id": "quiz-328",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Türkiye'de kadınlara milletvekili seçme ve seçilme hakkı hangi yıl tanınmıştır?",
    "options": [
      "1930",
      "1933",
      "1934",
      "1938"
    ],
    "correctIndex": 2,
    "explanation": "5 Aralık 1934 tarihinde anayasa değişikliğiyle Türk kadınlarına genel milletvekili seçilme."
  },
  {
    "id": "quiz-329",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "İstanbul Üniversitesi tarihi giriş kapısı hangi mimari üsluptadır?",
    "options": [
      "Klasik Osmanlı",
      "Barok",
      "Ampir / Neo-Klasik",
      "Gotik"
    ],
    "correctIndex": 2,
    "explanation": "Harbiye Nezareti kapısı olarak 19."
  },
  {
    "id": "quiz-330",
    "category": "Tarih",
    "categorySlug": "tarih",
    "question": "Türk Tarih ve Türk Dil Kurumları hangi liderin vasiyetiyle kuruldu?",
    "options": [
      "Mustafa Kemal Atatürk",
      "İsmet İnönü",
      "Fevzi Çakmak",
      "Kazım Karabekir"
    ],
    "correctIndex": 0,
    "explanation": "Atatürk, 1931'de Türk Tarih Kurumu'nu, 1932'de Türk Dil Kurumu'nu kurmuş ve mirasını bu."
  },
  {
    "id": "quiz-331",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin en derin göllerinden olan Elazığ'daki göl hangisidir?",
    "options": [
      "Eğirdir Gölü",
      "Hazar Gölü",
      "Beyşehir Gölü",
      "Burdur Gölü"
    ],
    "correctIndex": 1,
    "explanation": "Elazığ'daki Hazar Gölü, yaklaşık 219 metreye ulaşan derinliğiyle Türkiye'nin en derin göllerindendir."
  },
  {
    "id": "quiz-332",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de güneşin en erken doğduğu ilimiz hangisidir?",
    "options": [
      "Iğdır",
      "Van",
      "Kars",
      "Hakkari"
    ],
    "correctIndex": 0,
    "explanation": "Iğdır, Türkiye'nin en doğu boylamında (44° 48' D) yer aldığı için yerel saati en ileride olan."
  },
  {
    "id": "quiz-333",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Karadeniz'i İç Anadolu'ya bağlayan Zigana ve Ilgaz geçitleri nedir?",
    "options": [
      "Zidane Geçidi",
      "Zigetvar Geçidi",
      "Ilgaz ve Zigana",
      "Belen Geçidi"
    ],
    "correctIndex": 2,
    "explanation": "Zigana Geçidi Trabzon-Gümüşhane, Ilgaz Geçidi ise Kastamonu-Çankırı arasında geçiş sağlar."
  },
  {
    "id": "quiz-334",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Akdeniz'i İç Anadolu'ya bağlayan tarihi Kilikya Kapıları geçidi nedir?",
    "options": [
      "Gülek Boğazı",
      "Zigana Geçidi",
      "Kop Geçidi",
      "Cankurtaran Geçidi"
    ],
    "correctIndex": 0,
    "explanation": "Gülek Boğazı, Adana'yı İç Anadolu Yaylası'na bağlayan antik Kilikya Kapıları'dır."
  },
  {
    "id": "quiz-335",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de obruk ve karstik göllerin en yoğun olduğu bölge neresidir?",
    "options": [
      "Konya ve Toroslar",
      "Trakya",
      "Doğu Karadeniz",
      "Ergene Havzası"
    ],
    "correctIndex": 0,
    "explanation": "Kireçtaşının erimesiyle oluşan obruklar ve karstik göller Konya Ovası ve Göller Yöresi'nde yaygındır."
  },
  {
    "id": "quiz-336",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en yüksek debili ve en geniş nehri hangisidir?",
    "options": [
      "Nil",
      "Amazon",
      "Kongo",
      "Mississippi"
    ],
    "correctIndex": 1,
    "explanation": "Amazon Nehri, denize döktüğü su hacmi (saniyede 200."
  },
  {
    "id": "quiz-337",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Avrupa kıtasının en uzun nehri hangisidir?",
    "options": [
      "Tuna Nehri",
      "Volga Nehri",
      "Ren Nehri",
      "Dinyeper"
    ],
    "correctIndex": 1,
    "explanation": "Rusya'dan geçip Hazar Denizi'ne dökülen Volga Nehri (3.530 km), Avrupa'nın en uzun nehridir."
  },
  {
    "id": "quiz-338",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Afrika kıtası ile Madagaskar adası arasındaki su yolu hangisidir?",
    "options": [
      "Mozambik Kanalı",
      "Kızıldeniz",
      "Zanzibar Boğazı",
      "Aden Körfezi"
    ],
    "correctIndex": 0,
    "explanation": "Mozambik Kanalı, Madagaskar'ı Afrika anakarasından ayıran yaklaşık 1."
  },
  {
    "id": "quiz-339",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Japonya'nın başkenti Tokyo, hangi adanın üzerinde yer alır?",
    "options": [
      "Hokkaido",
      "Honshu",
      "Kyushu",
      "Shikoku"
    ],
    "correctIndex": 1,
    "explanation": "Tokyo, Osaka ve Kyoto kentleri Japonya'nın en büyük adası olan Honshu üzerindedir."
  },
  {
    "id": "quiz-340",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en büyük körfezi hangisidir?",
    "options": [
      "Meksika Körfezi",
      "Bengal Körfezi",
      "Basra Körfezi",
      "Gine Körfezi"
    ],
    "correctIndex": 1,
    "explanation": "Hint Okyanusu'nun kuzeyindeki Bengal Körfezi, yaklaşık 2."
  },
  {
    "id": "quiz-341",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İtalya'nın başkenti Roma'nın ortasından geçen nehir hangisidir?",
    "options": [
      "Po Nehri",
      "Tiber Nehri",
      "Arno Nehri",
      "Adige"
    ],
    "correctIndex": 1,
    "explanation": "Tiber Nehri, antik Roma'nın kurulduğu yedi tepenin arasından akarak Tiren Denizi'ne dökülür."
  },
  {
    "id": "quiz-342",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "İngiltere'nin başkenti Londra'dan geçen ünlü nehir hangisidir?",
    "options": [
      "Thames Nehri",
      "Severn Nehri",
      "Trent Nehri",
      "Mersey"
    ],
    "correctIndex": 0,
    "explanation": "Thames Nehri, Londra'nın kalbinden geçerek Kuzey Denizi'ne dökülen tarihi su yoludur."
  },
  {
    "id": "quiz-343",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin Ege Denizi'ndeki en büyük adası hangisidir?",
    "options": [
      "Bozcaada",
      "Gökçeada",
      "Cunda Adası",
      "Marmara Adası"
    ],
    "correctIndex": 1,
    "explanation": "Gökçeada, yaklaşık 289 km² yüzölçümüyle Türkiye'nin en büyük adasıdır."
  },
  {
    "id": "quiz-344",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de ilk rüzgar enerjisi santrali (RES) hangi ilçemizde kurulmuştur?",
    "options": [
      "Çeşme (İzmir)",
      "Bandırma",
      "Bozcaada",
      "Alaçatı"
    ],
    "correctIndex": 0,
    "explanation": "1998 yılında İzmir Çeşme Alaçatı'da Türkiye'nin ilk ticari rüzgar santrali devreye alınmıştır."
  },
  {
    "id": "quiz-345",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyadaki en derin kanyonlardan biri olan Köprülü Kanyon hangi ilimizdedir?",
    "options": [
      "Antalya",
      "Muğla",
      "Kastamonu",
      "Isparta"
    ],
    "correctIndex": 0,
    "explanation": "Köprülü Kanyon Milli Parkı, Antalya'nın Manavgat ilçesi sınırlarında rafting merkezi bir vadidir."
  },
  {
    "id": "quiz-346",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Nemrut Krater Gölü hangi ilimizin Tatvan ilçesinde yer alan bir kaldera gölüdür?",
    "options": [
      "Bitlis",
      "Van",
      "Muş",
      "Ağrı"
    ],
    "correctIndex": 0,
    "explanation": "Nemrut Stratovulkanının patlamasıyla oluşan kaldera gölü, Bitlis'in Tatvan ilçesi sınırındadır."
  },
  {
    "id": "quiz-347",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Doğu Anadolu'da Ani Harabeleri ile ünlü ilimiz hangisidir?",
    "options": [
      "Kars",
      "Erzurum",
      "Ağrı",
      "Van"
    ],
    "correctIndex": 0,
    "explanation": "Kars, ani harabeleri ve tarihi taş mimarisiyle Türkiye'nin en doğu kültür merkezlerindendir."
  },
  {
    "id": "quiz-348",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın Grönland'dan sonraki en büyük ikinci adası hangisidir?",
    "options": [
      "Yeni Gine",
      "Borneo",
      "Madagaskar",
      "Baffin"
    ],
    "correctIndex": 0,
    "explanation": "Yeni Gine adası, yaklaşık 785.000 km² alanı ile Grönland'dan sonraki en büyük adadır."
  },
  {
    "id": "quiz-349",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Göksu Nehri'nin Akdeniz'e döküldüğü yerde oluşturduğu delta hangisidir?",
    "options": [
      "Çukurova",
      "Silifke Deltası",
      "Bafra Ovası",
      "Çarşamba Ovası"
    ],
    "correctIndex": 1,
    "explanation": "Göksu Nehri, Mersin'in Silifke ilçesinde alüvyonlarını bırakarak Silifke Deltası'nı oluşturur."
  },
  {
    "id": "quiz-350",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en tuzlu denizlerinden biri olan Kızıldeniz hangi iki kıta arasındadır?",
    "options": [
      "Avrupa ile Afrika",
      "Afrika ile Asya",
      "Asya ile Avustralya",
      "Avrupa ile Asya"
    ],
    "correctIndex": 1,
    "explanation": "Kızıldeniz, Afrika kıtası ile Arap Yarımadası (Asya) arasında uzanan dar bir denizdir."
  },
  {
    "id": "quiz-351",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'nin yüzölçümü en küçük olan ili hangisidir?",
    "options": [
      "Yalova",
      "Kilis",
      "Bartın",
      "Bayburt"
    ],
    "correctIndex": 0,
    "explanation": "Yalova, yaklaşık 847 km² yüzölçümüyle Türkiye'nin yüzölçümü en küçük ilidir."
  },
  {
    "id": "quiz-352",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Ekvatorda öğleden sonra görülen sağanak yağış türü nedir?",
    "options": [
      "Konveksiyonel Yağış",
      "Yamaç Yağışı",
      "Cephe Yağışı",
      "Muson Yağışı"
    ],
    "correctIndex": 0,
    "explanation": "Gündüz ısınan havanın hızla yükselip soğumasıyla oluşan yağışlara konveksiyonel yağış denir."
  },
  {
    "id": "quiz-353",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Dünyanın en zorlu zirvelerinden olan K2 hangi sıradağlardadır?",
    "options": [
      "Karakurum Dağları",
      "Alpler",
      "Andlar",
      "Ural Dağları"
    ],
    "correctIndex": 0,
    "explanation": "K2 (8.611 m), Pakistan ile Çin sınırındaki Karakurum Sıradağları üzerinde yer alır."
  },
  {
    "id": "quiz-354",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Büyük Okyanus ile Hint Okyanusu arasındaki stratejik boğaz hangisidir?",
    "options": [
      "Malakka Boğazı",
      "Hürmüz Boğazı",
      "Babülmendep Boğazı",
      "Bering Boğazı"
    ],
    "correctIndex": 0,
    "explanation": "Malakka Boğazı, Malezya ile Sumatra (Endonezya) arasında dünya ticaretinin en işlek suyoludur."
  },
  {
    "id": "quiz-355",
    "category": "Coğrafya",
    "categorySlug": "cografya",
    "question": "Türkiye'de zeytin ağacı sayısı bakımından önde gelen Ege ili hangisidir?",
    "options": [
      "Aydın",
      "Manisa",
      "Balıkesir",
      "İzmir"
    ],
    "correctIndex": 0,
    "explanation": "Aydın ve Ege kıyıları Türkiye'nin en köklü zeytin ve zeytinyağı üretim merkezidir."
  },
  {
    "id": "quiz-356",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş'in merkezinde hidrojenin helyuma dönüştüğü nükleer tepkime nedir?",
    "options": [
      "Nükleer Füzyon",
      "Nükleer Fisyon",
      "Kimyasal Yanma",
      "Radyoaktif Bozunma"
    ],
    "correctIndex": 0,
    "explanation": "Nükleer füzyon, Güneş'in ve tüm aktif yıldızların ışıma ve ısı enerjisini ürettiği ana kaynaktır."
  },
  {
    "id": "quiz-357",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Vücutta kalsiyum ve fosfor dengesini ayarlayan boyundaki bez hangisidir?",
    "options": [
      "Paratiroid Bezi",
      "Hipofiz Bezi",
      "Böbreküstü Bezi",
      "Timüs Bezi"
    ],
    "correctIndex": 0,
    "explanation": "Paratiroid bezleri, salgıladığı parathormon ile kandaki kalsiyum seviyesini hassas şekilde ayarlar."
  },
  {
    "id": "quiz-358",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Mutlak sıfırda atomların tek dalga gibi davrandığı kuantum hali nedir?",
    "options": [
      "Bose-Einstein",
      "Plazma",
      "Sıvı Kristal",
      "Amorf"
    ],
    "correctIndex": 0,
    "explanation": "Bose-Einstein yoğuşması, maddenin katı, sıvı, gaz ve plazmadan sonraki beşinci hali kabul edilir."
  },
  {
    "id": "quiz-359",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "İnsan vücudunda kanın pıhtılaşmasını sağlayan kan pulcuklarına nedir?",
    "options": [
      "Trombosit",
      "Eritrosit",
      "Lökosit",
      "Lenfosit"
    ],
    "correctIndex": 0,
    "explanation": "Trombositler, damar yaralanmalarında kümelenerek kanamayı durduran pıhtı tıkacını oluşturur."
  },
  {
    "id": "quiz-360",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Işığın hem dalga hem parçacık özelliği gösteren kuantumu nedir?",
    "options": [
      "Foton",
      "Elektron",
      "Kuark",
      "Nötrino"
    ],
    "correctIndex": 0,
    "explanation": "Foton, elektromanyetik radyasyonun temel enerji paketçiği ve kuvvet taşıyıcısıdır."
  },
  {
    "id": "quiz-361",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Hücre içinde protein sentezinden sorumlu olan mikroskobik organel hangisidir?",
    "options": [
      "Ribozom",
      "Sentrozom",
      "Koful",
      "Kloroplast"
    ],
    "correctIndex": 0,
    "explanation": "Ribozomlar, DNA'dan gelen mRNA kodunu okuyarak amino asitlerden protein zinciri sentezler."
  },
  {
    "id": "quiz-362",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Evrende görünür kütleyle açıklanamayan çekim gücüne ne ad verilir?",
    "options": [
      "Karanlık Madde",
      "Antimadde",
      "Karanlık Enerji",
      "Kozmik Toz"
    ],
    "correctIndex": 0,
    "explanation": "Karanlık madde, ışık yaymayan fakat galaksileri bir arada tutan kütleçekimsel etkisinden."
  },
  {
    "id": "quiz-363",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Gözde görme bozukluğu olan miyopluk ne anlama gelir?",
    "options": [
      "Uzağı net görememe",
      "Yakını net görememe",
      "Renkleri ayırt edememe",
      "Gece görememe"
    ],
    "correctIndex": 0,
    "explanation": "Miyopide göz küresinin uzun olması nedeniyle görüntü retinanın önüne düşer ve uzağı bulanık görür."
  },
  {
    "id": "quiz-364",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Yer kabuğunun kırılmasıyla ortaya çıkan sarsıntı dalgaları nedir?",
    "options": [
      "Sismik Dalgalar",
      "Ses Dalgaları",
      "Radyo Dalgaları",
      "Işık Dalgaları"
    ],
    "correctIndex": 0,
    "explanation": "Sismik dalgalar (P ve S dalgaları), deprem anında yerküre içinde yayılarak sarsıntı oluşturur."
  },
  {
    "id": "quiz-365",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "B12 vitamininin mideden emilimi için gereken protein faktörü nedir?",
    "options": [
      "İntrensek Faktör",
      "Pepsin",
      "Gastrin",
      "Amilaz"
    ],
    "correctIndex": 0,
    "explanation": "Mide mukozasından salgılanan intrensek faktör olmadan B12 vitamini ince bağırsaktan emilemez."
  },
  {
    "id": "quiz-366",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Evrenin tekillikten genişlediğini savunan kozmolojik teori nedir?",
    "options": [
      "Büyük Patlama",
      "Sabit Durum Teorisi",
      "Döngüsel Evren",
      "Genişleyen Kütle"
    ],
    "correctIndex": 0,
    "explanation": "Big Bang teorisi, evrenin çok yoğun ve sıcak bir noktadan genişlemeye başladığını açıklar."
  },
  {
    "id": "quiz-367",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Karaciğerin ürettiği ve yağ sindirimine yardımcı olan sıvı nedir?",
    "options": [
      "Safra",
      "Mide Özsuyu",
      "Pankreas Özsuyu",
      "Tükürük"
    ],
    "correctIndex": 0,
    "explanation": "Safra sıvısı karaciğerde üretilip safra kesesinde depolanır ve yağları küçük damlacıklara ayırır."
  },
  {
    "id": "quiz-368",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Fiber optik kablolarda ışığın dışarı çıkmadan iletilmesi ilkesi nedir?",
    "options": [
      "Tam İç Yansıma",
      "Kırınım",
      "Girişim",
      "Polarizasyon"
    ],
    "correctIndex": 0,
    "explanation": "Işık kritik açıdan büyük bir açıyla cama çarptığında dışarı kaçamaz ve %100 oranında içeri yansır."
  },
  {
    "id": "quiz-369",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Beyinde sağ ve sol yarımküreleri bağlayan kalın sinir demeti nedir?",
    "options": [
      "Korpus Kallozum",
      "Beyincik",
      "Talamus",
      "Hipotalamus"
    ],
    "correctIndex": 0,
    "explanation": "Korpus kallozum (nasırlaşmış cisim), yaklaşık 200 milyon aksonla iki beyin yarımküresini."
  },
  {
    "id": "quiz-370",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Bir kimyasal reaksiyonu başlatmak için gereken minimum enerji nedir?",
    "options": [
      "Aktivasyon Enerjisi",
      "Bağ Enerjisi",
      "Kinetik Enerji",
      "Termal Enerji"
    ],
    "correctIndex": 0,
    "explanation": "Aktivasyon enerjisi, reaktiflerin ürüne dönüşebilmesi için aşması gereken potansiyel enerji."
  },
  {
    "id": "quiz-371",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Genetik bilgiyi hücre çekirdeğinden ribozoma taşıyan RNA türü hangisidir?",
    "options": [
      "mRNA (Mesajcı RNA)",
      "tRNA (Taşıyıcı RNA)",
      "rRNA (Ribozomal RNA)",
      "siRNA"
    ],
    "correctIndex": 0,
    "explanation": "mRNA, DNA'daki gen kodunun kopyasını çıkararak protein üretimi için şablonluk yapar."
  },
  {
    "id": "quiz-372",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Güneş'in zararlı morötesi ışınlarını soğurarak Dünya'yı koruyan gaz hangisidir?",
    "options": [
      "Ozon (O3)",
      "Azot",
      "Metan",
      "Neon"
    ],
    "correctIndex": 0,
    "explanation": "Üç oksijen atomundan oluşan Ozon (O3) gazı, stratosferde koruyucu ozon tabakasını oluşturur."
  },
  {
    "id": "quiz-373",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Yetişkin bir insanda normal istirahat nabız aralığı dakikada kaçtır?",
    "options": [
      "60 - 100 atım/dk",
      "40 - 50 atım/dk",
      "120 - 140 atım/dk",
      "150 - 180 atım/dk"
    ],
    "correctIndex": 0,
    "explanation": "Sağlıklı bir yetişkinde dinlenme nabzı dakikada 60 ila 100 kalp atımı arasında seyreder."
  },
  {
    "id": "quiz-374",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Kütleçekim kuvveti iki kütle arasındaki mesafeyle nasıl orantılıdır?",
    "options": [
      "Mesafe ile ters",
      "Mesafe karesiyle ters",
      "Mesafe ile doğru",
      "Bağımsızdır"
    ],
    "correctIndex": 1,
    "explanation": "Newton'un kütleçekim yasasına göre çekim kuvveti mesafenin karesiyle ters orantılı olarak zayıflar."
  },
  {
    "id": "quiz-375",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Bitki yapraklarındaki stomaların temel biyolojik görevi nedir?",
    "options": [
      "Gaz değişimi, terleme",
      "Kökten su çekmek",
      "Çiçek açmak",
      "Tohum saçmak"
    ],
    "correctIndex": 0,
    "explanation": "Stomalar (gözenekler), yaprak yüzeyinde açılıp kapanarak CO2 alımı ve su buharı atımını kontrol eder."
  },
  {
    "id": "quiz-376",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Periyodik tablonun en reaktif soygaz olmayan ametal grubu hangisidir?",
    "options": [
      "Halojenler (Grup 17)",
      "Alkali Metaller",
      "Toprak Alkali",
      "Geçiş Metalleri"
    ],
    "correctIndex": 0,
    "explanation": "Flor, klor, brom ve iyot gibi halojenler tek bir elektrona ihtiyaç duydukları için son derece."
  },
  {
    "id": "quiz-377",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Ses tellerimiz solunum sisteminin hangi bölümünde yer alır?",
    "options": [
      "Gırtlak (Larenks)",
      "Yutak (Farenks)",
      "Soluk Borusu (Trake)",
      "Bronş"
    ],
    "correctIndex": 0,
    "explanation": "Larenks (gırtlak), kıkırdak yapısı ve içinde titreşen ses telleriyle konuşma sesini üretir."
  },
  {
    "id": "quiz-378",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Elektrikte voltaj, akım ve direnç arasındaki bağıntı kanunu nedir?",
    "options": [
      "Ohm Kanunu (V = I × R)",
      "Coulomb Kanunu",
      "Faraday Kanunu",
      "Kirchhoff Kanunu"
    ],
    "correctIndex": 0,
    "explanation": "Ohm Kanunu, bir iletkenden geçen akımın potansiyel farkla doğru, dirençle ters orantılı."
  },
  {
    "id": "quiz-379",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Hücre çekirdeğinde bulunan ve genetik materyali paketleyen protein ailesi nedir?",
    "options": [
      "Histon Proteinleri",
      "Kolajen",
      "Miyozin",
      "Aktin"
    ],
    "correctIndex": 0,
    "explanation": "Histonlar, uzun DNA iplikçiklerinin makaraya sarılır gibi sarılarak kromatin oluşturmasını sağlar."
  },
  {
    "id": "quiz-380",
    "category": "Bilim & Doğa",
    "categorySlug": "bilim",
    "question": "Radyoaktif elementlerin yarılanma ömrü neyi ifade eder?",
    "options": [
      "Yarı kütle bozunma",
      "Tamamen yok olma",
      "Isının katlanması",
      "Kütlenin artması"
    ],
    "correctIndex": 0,
    "explanation": "Yarılanma ömrü, radyoaktif bir çekirdek örneğindeki atomların yarısının kararlı elemente."
  },
  {
    "id": "quiz-381",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye Cumhuriyeti'nin ilk kadın valisi kimdir?",
    "options": [
      "Lale Aytaman",
      "Tansu Çiller",
      "Güler Sabancı",
      "Türkan Saylan"
    ],
    "correctIndex": 0,
    "explanation": "Lale Aytaman, 1991 yılında Muğla Valiliği'ne atanarak Türkiye'nin ilk kadın valisi olmuştur."
  },
  {
    "id": "quiz-382",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türk edebiyatında ilk psikolojik roman kabul edilen 'Eylül' kime aittir?",
    "options": [
      "Mehmet Rauf",
      "Halid Ziya",
      "Peyami Safa",
      "Namık Kemal"
    ],
    "correctIndex": 0,
    "explanation": "Mehmet Rauf, 1901'de yayımlanan Eylül romanında kahramanların iç dünyalarını başarıyla tahlil."
  },
  {
    "id": "quiz-383",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türk sinemasının ilk sesli filmi kabul edilen eser hangisidir?",
    "options": [
      "İstanbul Sokakları",
      "Bir Millet Uyanıyor",
      "Aysel Bataklı Dam",
      "Halıcı Kız"
    ],
    "correctIndex": 0,
    "explanation": "1931 yapımı 'İstanbul Sokaklarında', Türk sinema tarihinin ilk sesli filmi olarak kayıtlara."
  },
  {
    "id": "quiz-384",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk milli maç hangi ülkeye karşı 1923 yılında oynanmıştır?",
    "options": [
      "Romanya",
      "Yunanistan",
      "Bulgaristan",
      "Rusya"
    ],
    "correctIndex": 0,
    "explanation": "A Milli Futbol Takımı, ilk maçını 26 Ekim 1923'te İstanbul Taksim Stadı'nda Romanya'ya karşı."
  },
  {
    "id": "quiz-385",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "İlk Türk kadın opera sanatçısı ve sopranosu kimdir?",
    "options": [
      "Semiha Berksoy",
      "Leyla Gencer",
      "Afife Jale",
      "Safiye Ayla"
    ],
    "correctIndex": 0,
    "explanation": "Semiha Berksoy, 1934'te sahnelenen ilk Türk operası 'Özsoy'da başrol oynayan ilk kadın opera."
  },
  {
    "id": "quiz-386",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Tıp simgesi olan kadeh ve yılan figürü hangi antik tanrıya dayanır?",
    "options": [
      "Asklepios",
      "Apollon",
      "Hermes",
      "Hades"
    ],
    "correctIndex": 0,
    "explanation": "Asklepios'un asasına sarılı yılan, zehrin doğru dozda şifaya dönüşmesini ve tıbbı simgeler."
  },
  {
    "id": "quiz-387",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de Çırağan Sarayı hangi Osmanlı padişahı tarafından yaptırılmıştır?",
    "options": [
      "Sultan Abdülaziz",
      "Sultan Abdülmecid",
      "II. Abdülhamid",
      "Sultan Reşad"
    ],
    "correctIndex": 0,
    "explanation": "Boğaz kıyısındaki Çırağan Sarayı, 1871 yılında Sultan Abdülaziz döneminde Balyan ailesi."
  },
  {
    "id": "quiz-388",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Lületaşı madeninin dünyadaki en önemli çıkarım merkezi olan il neresidir?",
    "options": [
      "İç Anadolu Bölgesi",
      "Ege Bölgesi",
      "Marmara Bölgesi",
      "Karadeniz Bölgesi"
    ],
    "correctIndex": 0,
    "explanation": "Lületaşı, dünyada yalnızca Eskişehir civarında tütün piposu ve biblo yapımına uygun kalitede bulunur."
  },
  {
    "id": "quiz-389",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk kadın muhtarı Gül Esin hangi ilimizde görev yapmıştır?",
    "options": [
      "Aydın",
      "İzmir",
      "Manisa",
      "Denizli"
    ],
    "correctIndex": 0,
    "explanation": "Gül Esin, 1933 yılında Aydın Çine Demircidere köyünde kadın muhtar seçilmiştir."
  },
  {
    "id": "quiz-390",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Geleneksel Türk gölge oyununda perdenin adı nedir?",
    "options": [
      "Küşteri Meydanı",
      "Hayal Perdesi",
      "Zilli Kefe",
      "Ayna"
    ],
    "correctIndex": 1,
    "explanation": "Şeyh Küşteri'nin icat ettiğine inanılan Karagöz perdesine 'Hayal Perdesi' veya 'Küşteri."
  },
  {
    "id": "quiz-391",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kudret helvası ve manna olarak bilinen tatlı özsu hangi ağaçtan elde edilir?",
    "options": [
      "Dişbudak ağacı",
      "Çam ağacı",
      "Meşe ağacı",
      "Kavak ağacı"
    ],
    "correctIndex": 0,
    "explanation": "Dişbudak ağacının gövdesinden sızıp havada katılaşan şekerli tatlı madde kudret helvası adını alır."
  },
  {
    "id": "quiz-392",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Akdeniz foklarının korunması için kurulan önemli koruma alanı nerededir?",
    "options": [
      "Foça (İzmir)",
      "Bodrum",
      "Alanya",
      "Kaş"
    ],
    "correctIndex": 0,
    "explanation": "İzmir Foça Siren Kayalıkları, nesli tehlikedeki Akdeniz foklarının en bilinen koruma barınağıdır."
  },
  {
    "id": "quiz-393",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Mimar Sinan'ın Üsküdar'da inşa ettiği simgesel cami hangisidir?",
    "options": [
      "Mihrimah Sultan Camii",
      "Atik Valide Camii",
      "Şemsi Paşa Camii",
      "Çinili Cami"
    ],
    "correctIndex": 0,
    "explanation": "Üsküdar ve Edirnekapı'daki Mihrimah Sultan camileri, gün doğumunda ve batımında mimari bir ışık."
  },
  {
    "id": "quiz-394",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Dünyanın en eski üniversitesi sayılan Karaviyyin hangi ülkededir?",
    "options": [
      "Fas (Fes)",
      "Mısır (Kahire)",
      "İtalya (Bologna)",
      "İspanya (Kurtuba)"
    ],
    "correctIndex": 0,
    "explanation": "Fas'ın Fes kentindeki Karaviyyin Üniversitesi, UNESCO ve Guinness tarafından dünyanın en eski."
  },
  {
    "id": "quiz-395",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "İlk çeviri roman olan Telemak eserini Türkçeye kim çevirmiştir?",
    "options": [
      "Yusuf Kamil Paşa",
      "Şinasi",
      "Namık Kemal",
      "Ziya Paşa"
    ],
    "correctIndex": 0,
    "explanation": "Yusuf Kamil Paşa, 1862'de Fransız yazar Fénelon'un 'Telemak'ını Türkçeye çevirerek ilk roman."
  },
  {
    "id": "quiz-396",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "2015 Nobel Kimya Ödülü'nü kazanan Türk bilim insanı kimdir?",
    "options": [
      "Aziz Sancar",
      "Cahit Arf",
      "Oktay Sinanoğlu",
      "Feza Gürsey"
    ],
    "correctIndex": 0,
    "explanation": "Prof. Dr. Aziz Sancar, hücrelerin hasar gören DNA'yı onarma mekanizmalarını haritalandırmıştır."
  },
  {
    "id": "quiz-397",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "10 Türk Lirası banknotundaki ünlü Türk matematikçi kimdir?",
    "options": [
      "Cahit Arf",
      "Ali Kuşçu",
      "Uluğ Bey",
      "Hârizmî"
    ],
    "correctIndex": 0,
    "explanation": "Ordinaryüs Profesör Cahit Arf (Arf Değişmezi kuramcısı), 10 TL banknotunun arkasında yer alır."
  },
  {
    "id": "quiz-398",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "5 Türk Lirası banknotundaki ünlü Türk bilim tarihçisi kimdir?",
    "options": [
      "Prof. Dr. Aydın Sayılı",
      "Prof. Dr. Fuat Sezgin",
      "Halil İnalcık",
      "Ekrem Akurgal"
    ],
    "correctIndex": 0,
    "explanation": "Aydın Sayılı, İslam ve Türk dünyasında bilim kurumları üzerine yaptığı araştırmalarla tanınır."
  },
  {
    "id": "quiz-399",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "20 Türk Lirası banknotundaki büyük Türk mimarı kimdir?",
    "options": [
      "Mimar Kemaleddin",
      "Mimar Sinan",
      "Sedefkar Mehmed Ağa",
      "Sarkis Balyan"
    ],
    "correctIndex": 0,
    "explanation": "Birinci Ulusal Mimarlık Akımı'nın öncüsü Mimar Kemaleddin, 20 TL banknotunda yer almaktadır."
  },
  {
    "id": "quiz-400",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "50 Türk Lirası'ndaki ilk kadın Türk felsefeci ve romancı kimdir?",
    "options": [
      "Fatma Aliye Topuz",
      "Halide Edib Adıvar",
      "Nezihe Muhiddin",
      "Suat Derviş"
    ],
    "correctIndex": 0,
    "explanation": "Ahmet Cevdet Paşa'nın kızı Fatma Aliye, ilk Türk kadın romancısı ve felsefe yazarıdır."
  },
  {
    "id": "quiz-401",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "100 Türk Lirası'ndaki klasik Türk musikisi bestekârı kimdir?",
    "options": [
      "Mustafa Itri",
      "İsmail Dede Efendi",
      "Zekai Dede",
      "Cemil Bey"
    ],
    "correctIndex": 0,
    "explanation": "17. yüzyıl klasik Türk musikisinin büyük bestekarı Itri (Nevakar makamı ve Segah Tekbiri."
  },
  {
    "id": "quiz-402",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "200 Türk Lirası'nda 'Sevelim Sevilelim' sözüyle anılan mutasavvıf kimdir?",
    "options": [
      "Yunus Emre",
      "Mevlana Celaleddin",
      "Hacı Bektaş Veli",
      "Ahi Evran"
    ],
    "correctIndex": 0,
    "explanation": "13. yüzyıl halk şairi ve gönül eri Yunus Emre, 200 TL banknotunun arka yüzünde yer almaktadır."
  },
  {
    "id": "quiz-403",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk yerli gözlem uydusu olan İMECE hangi yılda uzaya fırlatılmıştır?",
    "options": [
      "2020",
      "2021",
      "2023",
      "2024"
    ],
    "correctIndex": 2,
    "explanation": "İMECE, TÜBİTAK UZAY tarafından geliştirilip 15 Nisan 2023'te yörüngeye fırlatılmıştır."
  },
  {
    "id": "quiz-404",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kıbrıs Barış Harekâtı hangi yıl gerçekleştirilmiştir?",
    "options": [
      "1970",
      "1974",
      "1978",
      "1983"
    ],
    "correctIndex": 1,
    "explanation": "20 Temmuz 1974'te garantörlük hakları kullanılarak Ada'daki Türklerin güvenliği için harekat."
  },
  {
    "id": "quiz-405",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk şeker fabrikaları hangi illerde kurulmuştur?",
    "options": [
      "Uşak ve Alpullu",
      "Eskişehir",
      "Turhal",
      "Konya"
    ],
    "correctIndex": 0,
    "explanation": "Cumhuriyetin ilk sanayi hamlelerinden biri olarak 1926'da Alpullu ve Uşak Şeker Fabrikaları."
  },
  {
    "id": "quiz-406",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türk edebiyatında 'Şair-i Azam' unvanıyla anılan Tanzimat şairi kimdir?",
    "options": [
      "Abdülhak Hamit Tarhan",
      "Recaizade Mahmut Ekrem",
      "Muallim Naci",
      "Namık Kemal"
    ],
    "correctIndex": 0,
    "explanation": "Makber şiirinin yazarı Abdülhak Hamit Tarhan, döneminde Şair-i Azam olarak anılmıştır."
  },
  {
    "id": "quiz-407",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Safranbolu evlerinin ana çatılarında hangi kiremit türü kullanılır?",
    "options": [
      "Alaturka kiremit",
      "Taş levha",
      "Çinko",
      "Saz kamışı"
    ],
    "correctIndex": 0,
    "explanation": "Safranbolu evlerinin karakteristik çatılarında geleneksel oluklu kırmızı alaturka kiremitler."
  },
  {
    "id": "quiz-408",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "İlk tüketici kanunu sayılan Kanunname-i İhtisab hangi padişahındır?",
    "options": [
      "II. Bayezid (1502)",
      "Fatih Sultan Mehmed",
      "Kanuni Sultan Süleyman",
      "Yavuz Sultan Selim"
    ],
    "correctIndex": 0,
    "explanation": "1502 tarihli Bursa İhtisab Kanunu, dünyada standart ve kalite denetimi getiren ilk resmi belgedir."
  },
  {
    "id": "quiz-409",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk milli parkı Yozgat Çamlığı, hangi yıl ilan edilmiştir?",
    "options": [
      "1958",
      "1965",
      "1973",
      "1980"
    ],
    "correctIndex": 0,
    "explanation": "Türkiye'nin ormancılık ve doğa koruma tarihindeki ilk milli parkı 1958'de Yozgat'ta kurulmuştur."
  },
  {
    "id": "quiz-410",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Ekinoksta güneş ışınları dik gelirken tüm dünyada ne yaşanır?",
    "options": [
      "Ekinoks",
      "Gündönümü",
      "Aphelion",
      "Perihelion"
    ],
    "correctIndex": 0,
    "explanation": "Ekinoks (gün tün eşitliği), 21 Mart ve 23 Eylül tarihlerinde gerçekleşir."
  },
  {
    "id": "quiz-411",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk kağıt fabrikası olan SEKA hangi ilimizde kurulmuştur?",
    "options": [
      "Kocaeli (İzmit)",
      "Balıkesir",
      "Giresun",
      "Zonguldak"
    ],
    "correctIndex": 0,
    "explanation": "1936 yılında İzmit'te temeli atılan SEKA, Türkiye'nin ilk yerli kağıt üretim tesisidir."
  },
  {
    "id": "quiz-412",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'de ilk demir-çelik fabrikası 1937'de nerede kurulmuştur?",
    "options": [
      "Karabük (KARDEMİR)",
      "İskenderun (İSDEMİR)",
      "Ereğli (ERDEMİR)",
      "Sivas"
    ],
    "correctIndex": 0,
    "explanation": "Karabük Demir Çelik Fabrikası, 'fabrikalar kuran fabrika' unvanıyla sanayinin temeli olmuştur."
  },
  {
    "id": "quiz-413",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Anıtkabir projesini çizen Türk mimarlar kimlerdir?",
    "options": [
      "Emin Onat - O. Arda",
      "Vedat Tek - Kemaleddin",
      "Sedad Hakkı Eldem",
      "Clemens Holzmeister"
    ],
    "correctIndex": 0,
    "explanation": "Anıtkabir projesi, 1941'deki uluslararası yarışmayı kazanan Prof."
  },
  {
    "id": "quiz-414",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Türkiye'nin ilk milli denizaltısı projesinin adı nedir?",
    "options": [
      "MİLDEN",
      "Preveze",
      "Atılay",
      "Piri Reis"
    ],
    "correctIndex": 0,
    "explanation": "MİLDEN (Milli Denizaltı), Türk Deniz Kuvvetleri için yerli tasarım ve inşa edilen denizaltı."
  },
  {
    "id": "quiz-415",
    "category": "Genel Kültür",
    "categorySlug": "genel-kultur",
    "question": "Kuzey Kutbu'nda yaşayan kutup ayılarının ana besin kaynağı nedir?",
    "options": [
      "Foklar",
      "Balıklar",
      "Kutup Tavşanı",
      "Kuş Yumurtası"
    ],
    "correctIndex": 0,
    "explanation": "Kutup ayıları yüksek yağ içerikli halkalı ve sakallı fokları buz yarıklarında avlayarak beslenir."
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
 * Deterministic daily question based on day of year
 */
export function getDailyQuestion(date: Date = new Date()): QuizQuestion {
  const dayIndex = getDayOfYear(date);
  const index = Math.abs(dayIndex) % QUIZ_QUESTIONS.length;
  return QUIZ_QUESTIONS[index];
}
