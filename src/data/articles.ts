import { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 'kdv-nasil-hesaplanir',
    slug: 'kdv-nasil-hesaplanir',
    title: 'KDV Nasıl Hesaplanır?',
    description: 'KDV tutarını ve KDV dahil satış fiyatını hesaplama yöntemleri, formülleri ve pratik örnekleri.',
    category: 'Finans',
    relatedToolSlug: 'kdv-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kdv hesaplama', 'kdv nasıl hesaplanır', 'kdv formülü', 'kdv ekleme', 'vergi hesaplama'],
    sections: [
      {
        heading: 'KDV (Katma Değer Vergisi) Nedir?',
        paragraphs: [
          'Katma Değer Vergisi (KDV), mal ve hizmet teslimlerinde alıcı tarafından ödenen ve satıcı tarafından devlete aktarılan dolaylı bir tüketim vergisidir. Türkiye\'de genel olarak %1, %10 ve %20 oranlarında uygulanmaktadır.',
          'Bir ürünün veya hizmetin vergisiz (KDV hariç) tutarına KDV oranının uygulanmasıyla hem ödenecek vergi tutarı hem de nihai tüketiciye yansıyacak KDV dahil fiyat belirlenir.'
        ]
      },
      {
        heading: 'KDV Hesaplama Formülü',
        paragraphs: [
          'KDV hariç tutardan KDV tutarını ve KDV dahil toplam tutarı bulmak için aşağıdaki formüller kullanılır:'
        ],
        formula: 'KDV Tutarı = Vergisiz Tutar × (KDV Oranı / 100)\nKDV Dahil Fiyat = Vergisiz Tutar + KDV Tutarı'
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          '1.000 TL değerinde ve %20 KDV oranına tabi bir ürünün KDV ve toplam tutar hesabı şu şekildedir:'
        ],
        example: {
          title: '%20 KDV Uygulaması (1.000 TL)',
          items: [
            { label: 'KDV Hariç Tutar', value: '1.000,00 TL' },
            { label: 'KDV Oranı', value: '%20' },
            { label: 'KDV Tutarı (1.000 × 0,20)', value: '200,00 TL' },
            { label: 'KDV Dahil Toplam', value: '1.200,00 TL' }
          ]
        },
        note: 'Pratik ipucu: %20 KDV dahil tutarı tek işlemde bulmak için vergisiz tutarı doğrudan 1,20 ile çarpabilirsiniz.'
      }
    ]
  },
  {
    id: 'kdv-dahil-fiyattan-kdv-nasil-cikarilir',
    slug: 'kdv-dahil-fiyattan-kdv-nasil-cikarilir',
    title: 'KDV Dahil Fiyattan KDV Nasıl Çıkarılır?',
    description: 'KDV dahil toplam tutardan vergisiz net fiyatı ve içindeki KDV tutarını ayırma formülü ve örnek hesaplamaları.',
    category: 'Finans',
    relatedToolSlug: 'kdv-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kdv dahil fiyattan kdv ayırma', 'kdv hariç fiyat bulma', 'kdv çıkarma', 'kdv dahil hariç'],
    sections: [
      {
        heading: 'KDV Ayırma Mantığı',
        paragraphs: [
          'Faturalarda veya fişlerde yer alan KDV dahil tutardan KDV\'yi çıkarıp ürünün net vergisiz fiyatını bulmak, özellikle muhasebe kayıtlarında ve maliyet analizlerinde sıkça yapılan bir işlemdir.',
          'KDV dahil tutardan doğrudan KDV oranını çıkarmak (örneğin 1.200 TL\'den %20 düşmek: 1.200 - 240 = 960 TL) yaygın yapılan bir matematiksel hatadır. Doğru yöntem bölme işlemi ile tersine hesap yapmaktır.'
        ]
      },
      {
        heading: 'KDV Hariç Tutar ve KDV Ayırma Formülü',
        paragraphs: [
          'KDV dahil fiyattan vergisiz net tutarı ve içindeki KDV\'yi bulmak için aşağıdaki formül uygulanır:'
        ],
        formula: 'KDV Hariç Tutar = KDV Dahil Fiyat / (1 + KDV Oranı / 100)\nİçindeki KDV Tutarı = KDV Dahil Fiyat - KDV Hariç Tutar'
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          'KDV dahil fiyatı 1.200 TL olan ve %20 KDV içeren bir ürünün ayrıştırma hesabı:'
        ],
        example: {
          title: '1.200 TL KDV Dahil Fiyattan KDV Ayırma',
          items: [
            { label: 'KDV Dahil Fiyat', value: '1.200,00 TL' },
            { label: 'Bölen Katsayı (1 + 0,20)', value: '1,20' },
            { label: 'KDV Hariç Tutar (1.200 / 1,20)', value: '1.000,00 TL' },
            { label: 'İçindeki KDV Tutarı (1.200 - 1.000)', value: '200,00 TL' }
          ]
        },
        note: '%10 KDV için tutarı 1,10\'a; %1 KDV için ise 1,01\'e bölerek net fiyatı bulabilirsiniz.'
      }
    ]
  },
  {
    id: 'kar-marji-nedir-ve-nasil-hesaplanir',
    slug: 'kar-marji-nedir-ve-nasil-hesaplanir',
    title: 'Kâr Marjı Nedir ve Nasıl Hesaplanır?',
    description: 'Ürün ve hizmet satışlarında kâr marjı hesaplama mantığı, formülü ve hedef marja göre satış fiyatı belirleme.',
    category: 'Finans',
    relatedToolSlug: 'kar-marji-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kar marjı nedir', 'kar marjı hesaplama', 'satış kâr marjı', 'kâr marjı formülü', 'marj hesaplama'],
    sections: [
      {
        heading: 'Kâr Marjı Kavramı',
        paragraphs: [
          'Kâr marjı (profit margin), bir işletmenin yaptığı satışlardan ne kadar kâr elde ettiğini gösteren temel kârlılık göstergesidir.',
          'Kâr marjı, elde edilen net kârın satış fiyatına bölünmesiyle hesaplanır. Yani bir müşterinin ödediği paranın yüzde kaçının kâr olarak işletmede kaldığını ifade eder.'
        ]
      },
      {
        heading: 'Kâr Marjı Formülü',
        paragraphs: [
          'Kâr marjını hesaplamak için öncelikle satış fiyatından maliyet çıkarılarak net kâr bulunur, ardından bu kâr satış fiyatına bölünür:'
        ],
        formula: 'Net Kâr = Satış Fiyatı - Maliyet\nKâr Marjı (%) = (Net Kâr / Satış Fiyatı) × 100'
      },
      {
        heading: 'Hedef Kâr Marjına Göre Satış Fiyatı Bulma',
        paragraphs: [
          'Belirli bir maliyeti olan üründe arzu edilen kâr marjına ulaşmak için gerekli satış fiyatı şu formülle hesaplanır:'
        ],
        formula: 'Satış Fiyatı = Maliyet / (1 - Hedef Kâr Marjı / 100)'
      },
      {
        heading: 'Gerçek Örnek',
        paragraphs: [
          'Maliyeti 800 TL olan bir üründen %20 kâr marjı elde etmek istenirse:'
        ],
        example: {
          title: '800 TL Maliyet ve %20 Hedef Marj',
          items: [
            { label: 'Maliyet', value: '800,00 TL' },
            { label: 'Hedef Marj', value: '%20' },
            { label: 'Satış Fiyatı (800 / 0,80)', value: '1.000,00 TL' },
            { label: 'Elde Edilen Kâr', value: '200,00 TL' }
          ]
        },
        note: 'Önemli: 800 TL maliyete doğrudan %20 eklenirse satış fiyatı 960 TL olur ancak bu fiyattaki gerçek kâr marjı yalnızca %16,67 kalır.'
      }
    ]
  },
  {
    id: 'kar-marji-ve-kar-orani-farki',
    slug: 'kar-marji-ve-kar-orani-farki',
    title: 'Kâr Marjı ile Kâr Oranı Arasındaki Fark',
    description: 'Satış üzerinden kâr marjı ile maliyet üzerinden kâr oranı (markup) arasındaki temel farklar ve hesaplama örnekleri.',
    category: 'Finans',
    relatedToolSlug: 'kar-marji-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kar marjı ve kar oranı farkı', 'marj ve markup', 'maliyet üzerinden kâr', 'kâr oranı'],
    sections: [
      {
        heading: 'İki Farklı Kârlılık Yaklaşımı',
        paragraphs: [
          'Ticarette en çok karıştırılan iki kavram "Kâr Marjı (Margin)" ile "Maliyet Üzerinden Kâr Oranı (Markup)"dır.',
          'Temel fark baz alınan referans değerdir: Kâr marjı satış fiyatını baz alırken, maliyet üzerinden kâr oranı ürünün alış/üretim maliyetini baz alır.'
        ]
      },
      {
        heading: 'Karşılaştırmalı Formüller',
        paragraphs: [
          'Her iki oranın hesaplanış şekli aşağıdadır:'
        ],
        formula: 'Kâr Marjı (%) = (Kâr / Satış Fiyatı) × 100\nMaliyet Üzerinden Kâr (%) = (Kâr / Maliyet) × 100'
      },
      {
        heading: 'Aynı Örnek Üzerinde Karşılaştırma',
        paragraphs: [
          'Maliyeti 800 TL olan ve 1.000 TL\'ye satılan bir ürünü inceleyelim. Net kâr 200 TL\'dir.'
        ],
        example: {
          title: '800 TL Maliyet / 1.000 TL Satış',
          items: [
            { label: 'Kâr Tutarı', value: '200,00 TL' },
            { label: 'Kâr Marjı (200 / 1.000)', value: '%20,00' },
            { label: 'Maliyet Üzerinden Kâr (200 / 800)', value: '%25,00' }
          ]
        },
        note: 'Maliyet üzerinden kâr oranı matematiksel olarak her zaman kâr marjından daha yüksek çıkar.'
      }
    ]
  },
  {
    id: 'indirim-orani-nasil-hesaplanir',
    slug: 'indirim-orani-nasil-hesaplanir',
    title: 'İndirim Oranı Nasıl Hesaplanır?',
    description: 'Etiket fiyatı üzerinden indirim tutarı, indirimli fiyat ve yüzde indirim oranı hesaplama formülü.',
    category: 'Finans',
    relatedToolSlug: 'indirim-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['indirim oranı hesaplama', 'indirim hesaplama', 'yüzde indirim bulma', 'iskonto hesabı'],
    sections: [
      {
        heading: 'İndirim Hesaplama Temelleri',
        paragraphs: [
          'İndirim, bir ürünün orijinal etiket fiyatından yapılan parasal düşüşü ifade eder. İndirim oranı ise bu tasarrufun orijinal fiyata olan yüzde oranıdır.',
          'Alışverişlerde tasarruf miktarını ve kampanyalı son fiyatı doğru belirlemek için indirim hesaplama formülleri kullanılır.'
        ]
      },
      {
        heading: 'İndirim Formülleri',
        paragraphs: [
          'İndirim tutarı ve indirimli fiyat hesabı:'
        ],
        formula: 'İndirim Tutarı = Orijinal Fiyat × (İndirim Oranı / 100)\nİndirimli Fiyat = Orijinal Fiyat - İndirim Tutarı'
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          '500 TL etiket fiyatına sahip bir üründe %30 indirim uygulandığında:'
        ],
        example: {
          title: '500 TL Üzerine %30 İndirim',
          items: [
            { label: 'Orijinal Fiyat', value: '500,00 TL' },
            { label: 'İndirim Oranı', value: '%30' },
            { label: 'İndirim Tutarı (500 × 0,30)', value: '150,00 TL' },
            { label: 'Ödenecek İndirimli Fiyat', value: '350,00 TL' }
          ]
        },
        note: 'Pratik yöntem: %30 indirimli fiyatı doğrudan bulmak için orijinal tutarı (1 - 0,30) = 0,70 ile çarpabilirsiniz.'
      }
    ]
  },
  {
    id: 'yuzde-nasil-hesaplanir',
    slug: 'yuzde-nasil-hesaplanir',
    title: 'Yüzde Nasıl Hesaplanır?',
    description: 'Bir sayının yüzdesini bulma, iki sayı arasındaki yüzde oranı, yüzde artış ve azalış hesaplama rehberi.',
    category: 'Finans',
    relatedToolSlug: 'yuzde-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['yüzde nasıl hesaplanır', 'yüzde hesaplama', 'yüzde formülü', 'yüzde artış', 'yüzde azalış'],
    sections: [
      {
        heading: 'Yüzde Hesaplama Yöntemleri',
        paragraphs: [
          'Yüzde, yüz eşit parçaya bölünen bir bütünün belirli bir parçasını gösteren matematiksel bir orandır.',
          'Günlük hayatta en sık karşılaşılan üç temel yüzde işlemi şunlardır: Bir sayının yüzdesini bulma, bir sayının diğerine oranını bulma ve yüzde artış/azalış hesaplama.'
        ]
      },
      {
        heading: 'Temel Yüzde Formülleri',
        paragraphs: [
          'A sayısının %B\'sini bulmak için:'
        ],
        formula: 'Sonuç = (A × B) / 100'
      },
      {
        heading: 'Yüzde Değişim (Artış / Azalış) Formülü',
        paragraphs: [
          'Eski değerden yeni değere gerçekleşen yüzde değişimi bulmak için:'
        ],
        formula: 'Yüzde Değişim = [(Yeni Değer - Eski Değer) / Eski Değer] × 100'
      },
      {
        heading: 'Örnek Hesaplamalar',
        paragraphs: [
          'Örnek 1: 400 sayısının %15\'i: (400 × 15) / 100 = 60.',
          'Örnek 2: Fiyatı 200 TL\'den 250 TL\'ye çıkan bir üründe artış: [(250 - 200) / 200] × 100 = %25 artış.'
        ],
        example: {
          title: 'Yüzde Değişim Özeti',
          items: [
            { label: 'Eski Değer', value: '200' },
            { label: 'Yeni Değer', value: '250' },
            { label: 'Fark', value: '+50' },
            { label: 'Artış Oranı', value: '%25' }
          ]
        }
      }
    ]
  },
  {
    id: 'yas-nasil-hesaplanir',
    slug: 'yas-nasil-hesaplanir',
    title: 'Yaş Nasıl Hesaplanır?',
    description: 'Doğum tarihine göre yaşın yıl, ay ve gün olarak kesin hesaplanması ve artık yıl etkileri.',
    category: 'Zaman ve Tarih',
    relatedToolSlug: 'yas-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['yaş nasıl hesaplanır', 'yaş hesaplama formülü', 'kaç yaşındayım', 'doğum günü hesabı'],
    sections: [
      {
        heading: 'Yaş Hesaplamanın Mantığı',
        paragraphs: [
          'Yaş, bir kişinin doğum tarihi ile bulunulan tarih (veya hedeflenen herhangi bir referans tarih) arasındaki zaman farkıdır.',
          'Tam ve kesin bir yaş hesabı yaparken yalnızca yılların farkını almak yetersiz kalır; geçen tam aylar, artık yıllar (366 gün) ve ayların gün sayıları (28, 30, 31 gün) dikkate alınmalıdır.'
        ]
      },
      {
        heading: 'Yıl, Ay ve Gün Hesabı Adımları',
        paragraphs: [
          '1. Gün Hesabı: Bulunulan gün doğum gününden küçükse, önceki aydan gün borç alınarak fark hesaplanır.',
          '2. Ay Hesabı: Bulunulan ay doğum ayından küçükse, yıldan 12 ay borç alınarak ay farkı bulunur.',
          '3. Yıl Hesabı: Kalan yıllar arasındaki fark alınır.'
        ]
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          'Doğum Tarihi: 28 Ağustos 1999 olan bir kişinin 23 Ağustos 2026 tarihindeki kesin yaş hesabı:'
        ],
        example: {
          title: 'Kesin Yaş Detayı (28.08.1999 Doğumlu)',
          items: [
            { label: 'Tamamlanan Yıl', value: '26 Yaş' },
            { label: 'Tamamlanan Ay', value: '11 Ay' },
            { label: 'Kalan Gün', value: '26 Gün' },
            { label: 'Sonraki Doğum Günü', value: '5 Gün Kaldı' }
          ]
        },
        note: 'Doğum gününüz henüz gelmediyse tamamladığınız yaş bir önceki yaşınızdır; gün doldurma esastır.'
      }
    ]
  }
];

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByToolSlug(toolSlug: string): Article[] {
  return articles.filter((a) => a.relatedToolSlug === toolSlug);
}
