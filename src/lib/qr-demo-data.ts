export type DemoLocale = 'tr' | 'en' | 'de' | 'ru';

export type DemoTranslation = Record<DemoLocale, string>;

export interface DemoCategory {
  id: string;
  name: DemoTranslation;
}

export interface DemoProduct {
  id: string;
  categoryId: string;
  name: DemoTranslation;
  description: DemoTranslation;
  image: string;
  price: number;
}

export const demoLocales: { id: DemoLocale; label: string }[] = [
  { id: 'tr', label: 'Türkçe' },
  { id: 'en', label: 'English' },
  { id: 'de', label: 'Deutsch' },
  { id: 'ru', label: 'Русский' },
];

export const demoCategories: DemoCategory[] = [
  { id: 'coffee', name: { tr: 'Kahveler', en: 'Coffee', de: 'Kaffee', ru: 'Кофе' } },
  { id: 'breakfast', name: { tr: 'Kahvaltı', en: 'Breakfast', de: 'Frühstück', ru: 'Завтрак' } },
  { id: 'mains', name: { tr: 'Ana Yemekler', en: 'Mains', de: 'Hauptgerichte', ru: 'Основные блюда' } },
  { id: 'desserts', name: { tr: 'Tatlılar', en: 'Desserts', de: 'Desserts', ru: 'Десерты' } },
  { id: 'cold-drinks', name: { tr: 'Soğuk İçecekler', en: 'Cold Drinks', de: 'Kalte Getränke', ru: 'Холодные напитки' } },
];

const imageUrl = (slug: string) => `/qr-demo/${slug}.jpg`;

export const demoProducts: DemoProduct[] = [
  {
    id: 'flat-white', categoryId: 'coffee',
    name: { tr: 'Flat White', en: 'Flat White', de: 'Flat White', ru: 'Флэт уайт' },
    description: {
      tr: 'Yoğun espresso ve ipeksi mikro köpükle dengeli, kısa bir kahve klasiği.',
      en: 'A balanced coffee classic with rich espresso and silky microfoam.',
      de: 'Ein ausgewogener Klassiker mit kräftigem Espresso und seidigem Mikroschaum.',
      ru: 'Сбалансированная классика с насыщенным эспрессо и шелковистой микропеной.',
    },
    image: imageUrl('flat-white'), price: 145,
  },
  {
    id: 'spanish-latte', categoryId: 'coffee',
    name: { tr: 'Spanish Latte', en: 'Spanish Latte', de: 'Spanish Latte', ru: 'Испанский латте' },
    description: {
      tr: 'Çift shot espresso, soğuk süt ve hafif tatlı dokunuşuyla yumuşak içimli.',
      en: 'Double-shot espresso, chilled milk and a gentle sweetness in every sip.',
      de: 'Doppelter Espresso mit kalter Milch und einer dezenten, feinen Süße.',
      ru: 'Двойной эспрессо с холодным молоком и лёгкой нежной сладостью.',
    },
    image: imageUrl('spanish-latte'), price: 165,
  },
  {
    id: 'turkish-coffee', categoryId: 'coffee',
    name: { tr: 'Türk Kahvesi', en: 'Turkish Coffee', de: 'Türkischer Kaffee', ru: 'Турецкий кофе' },
    description: {
      tr: 'Geleneksel usulle, bakır cezvede pişirilir. Lokum eşliğinde servis edilir.',
      en: 'Brewed traditionally in a copper pot and served with a small piece of lokum.',
      de: 'Traditionell im Kupferkännchen zubereitet und mit einem Stück Lokum serviert.',
      ru: 'Традиционно сварен в медной джезве и подаётся с кусочком лукума.',
    },
    image: imageUrl('turkish-coffee'), price: 90,
  },
  {
    id: 'avocado-toast', categoryId: 'breakfast',
    name: { tr: 'Avocado Toast', en: 'Avocado Toast', de: 'Avocado-Toast', ru: 'Тост с авокадо' },
    description: {
      tr: 'Ekşi mayalı ekmek, ezilmiş avokado, poşe yumurta ve pul biber.',
      en: 'Sourdough, smashed avocado, a poached egg and a touch of chilli flakes.',
      de: 'Sauerteigbrot mit Avocado, pochiertem Ei und einem Hauch Chiliflocken.',
      ru: 'Хлеб на закваске, авокадо, яйцо пашот и немного хлопьев чили.',
    },
    image: imageUrl('avocado-toast'), price: 280,
  },
  {
    id: 'serpme-breakfast', categoryId: 'breakfast',
    name: { tr: 'Serpme Kahvaltı', en: 'Turkish Breakfast Spread', de: 'Türkisches Frühstück', ru: 'Турецкий завтрак' },
    description: {
      tr: 'Seçme peynirler, zeytinler, reçel, bal, yumurta ve sıcak ekmeklerle iki kişilik şölen.',
      en: 'A generous spread for two with cheeses, olives, jams, honey, eggs and warm bread.',
      de: 'Eine großzügige Auswahl für zwei mit Käse, Oliven, Marmelade, Honig, Ei und warmem Brot.',
      ru: 'Щедрый завтрак на двоих: сыры, оливки, джемы, мёд, яйца и тёплый хлеб.',
    },
    image: imageUrl('serpme-breakfast'), price: 450,
  },
  {
    id: 'truffle-pasta', categoryId: 'mains',
    name: { tr: 'Trüflü Makarna', en: 'Truffle Pasta', de: 'Trüffel-Pasta', ru: 'Паста с трюфелем' },
    description: {
      tr: 'Ev yapımı tagliatelle, parmesan kreması ve taze trüf yağıyla tamamlanır.',
      en: 'Handmade tagliatelle finished with parmesan cream and fragrant truffle oil.',
      de: 'Hausgemachte Tagliatelle mit Parmesancreme und aromatischem Trüffelöl.',
      ru: 'Домашняя тальятелле с кремом из пармезана и ароматным трюфельным маслом.',
    },
    image: imageUrl('truffle-pasta'), price: 390,
  },
  {
    id: 'san-sebastian', categoryId: 'desserts',
    name: { tr: 'San Sebastian Cheesecake', en: 'Basque Cheesecake', de: 'San Sebastian Cheesecake', ru: 'Чизкейк Сан-Себастьян' },
    description: {
      tr: 'Dışı karamelize, içi ipeksi ve akışkan; fırından yeni çıkmış özel tarifimiz.',
      en: 'Our signature bake: caramelised outside, silky and soft at the centre.',
      de: 'Unsere Spezialität: karamellisierte Oberfläche und ein cremig-weicher Kern.',
      ru: 'Фирменный десерт: карамельная корочка и нежная, кремовая середина.',
    },
    image: imageUrl('san-sebastian'), price: 220,
  },
  {
    id: 'tiramisu', categoryId: 'desserts',
    name: { tr: 'Tiramisu', en: 'Tiramisu', de: 'Tiramisu', ru: 'Тирамису' },
    description: {
      tr: 'Espressoyla ıslatılmış savoiardi, mascarpone kreması ve kakao.',
      en: 'Espresso-soaked savoiardi layered with mascarpone cream and cocoa.',
      de: 'In Espresso getränkte Savoiardi mit Mascarponecreme und Kakao.',
      ru: 'Пропитанные эспрессо савоярди со сливками маскарпоне и какао.',
    },
    image: imageUrl('tiramisu'), price: 200,
  },
  {
    id: 'iced-latte', categoryId: 'cold-drinks',
    name: { tr: 'Iced Latte', en: 'Iced Latte', de: 'Iced Latte', ru: 'Айс-латте' },
    description: {
      tr: 'Çift shot espresso, soğuk süt ve bol buzla ferahlatıcı kahve molası.',
      en: 'A refreshing coffee break with double espresso, cold milk and plenty of ice.',
      de: 'Erfrischender Kaffeegenuss mit doppeltem Espresso, kalter Milch und Eis.',
      ru: 'Освежающий кофе с двойным эспрессо, холодным молоком и льдом.',
    },
    image: imageUrl('iced-latte'), price: 155,
  },
  {
    id: 'homemade-lemonade', categoryId: 'cold-drinks',
    name: { tr: 'Ev Yapımı Limonata', en: 'Homemade Lemonade', de: 'Hausgemachte Limonade', ru: 'Домашний лимонад' },
    description: {
      tr: 'Taze limon suyu, nane ve mevsim meyveleriyle hazırlanan buz gibi ev yapımı tarif.',
      en: 'Our icy homemade blend of fresh lemon, mint and seasonal fruit.',
      de: 'Eisgekühlte Hauslimonade mit frischer Zitrone, Minze und Saisonfrüchten.',
      ru: 'Ледяной домашний лимонад из свежего лимона, мяты и сезонных фруктов.',
    },
    image: imageUrl('homemade-lemonade'), price: 120,
  },
];

export const demoCopy: Record<DemoLocale, {
  eyebrow: string; welcome: string; intro: string; viewMenu: string; menu: string;
  openMenu: string; close: string; details: string; createdWith: string;
  createYourMenu: string; createCta: string; allergens: string; discover: string; demoNote: string;
}> = {
  tr: {
    eyebrow: 'Hoş geldiniz', welcome: 'Kahve, mutfak ve iyi anlar.',
    intro: 'Günün ritmine eşlik eden seçkin tatlar, sıcak bir atmosfer ve Luna dokunuşu.',
    viewMenu: 'Menüyü Gör', menu: 'Menü', openMenu: 'Menüyü aç', close: 'Kapat', details: 'Ürün detayları',
    createdWith: 'Bu menü Pratika QR ile oluşturuldu.', createYourMenu: 'Kendi işletmeniz için profesyonel bir QR menü oluşturun.',
    createCta: 'QR Menümü Oluştur', allergens: 'İçerik ve alerjen bilgisi işletme ayarlarından eklenebilir.',
    discover: 'Günün seçkisi', demoNote: 'Demo işletmedir · Gerçek müşteri değildir',
  },
  en: {
    eyebrow: 'Welcome in', welcome: 'Coffee, food and good moments.',
    intro: 'Thoughtful flavours, a warm atmosphere and a little Luna touch for every part of your day.',
    viewMenu: 'View menu', menu: 'Menu', openMenu: 'Open menu', close: 'Close', details: 'Item details',
    createdWith: 'This menu was created with Pratika QR.', createYourMenu: 'Create a professional QR menu for your business.',
    createCta: 'Create my QR menu', allergens: 'Ingredient and allergen details can be added in the business settings.',
    discover: "Today's selection", demoNote: 'Demo business · Not a real customer',
  },
  de: {
    eyebrow: 'Willkommen', welcome: 'Kaffee, Küche und schöne Momente.',
    intro: 'Feine Aromen, eine warme Atmosphäre und ein Hauch Luna für jeden Moment des Tages.',
    viewMenu: 'Menü ansehen', menu: 'Menü', openMenu: 'Menü öffnen', close: 'Schließen', details: 'Produktdetails',
    createdWith: 'Dieses Menü wurde mit Pratika QR erstellt.', createYourMenu: 'Erstellen Sie ein professionelles QR-Menü für Ihr Unternehmen.',
    createCta: 'Mein QR-Menü erstellen', allergens: 'Zutaten- und Allergeninformationen können in den Betriebseinstellungen ergänzt werden.',
    discover: 'Unsere Auswahl', demoNote: 'Demo-Betrieb · Kein echter Kunde',
  },
  ru: {
    eyebrow: 'Добро пожаловать', welcome: 'Кофе, кухня и хорошие моменты.',
    intro: 'Продуманные вкусы, тёплая атмосфера и особое настроение Luna в каждый момент дня.',
    viewMenu: 'Посмотреть меню', menu: 'Меню', openMenu: 'Открыть меню', close: 'Закрыть', details: 'О блюде',
    createdWith: 'Это меню создано с помощью Pratika QR.', createYourMenu: 'Создайте профессиональное QR-меню для своего заведения.',
    createCta: 'Создать моё QR-меню', allergens: 'Информацию о составе и аллергенах можно добавить в настройках заведения.',
    discover: 'Выбор дня', demoNote: 'Демо-заведение · Не настоящий клиент',
  },
};

export const formatDemoPrice = (price: number, locale: DemoLocale) =>
  new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale, {
    style: 'currency', currency: 'TRY', maximumFractionDigits: 0,
  }).format(price);
