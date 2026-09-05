import { Article } from '@/types';

export const articles: Article[] = [
  {
    id: 'kdv-nasil-hesaplanir',
    slug: 'kdv-nasil-hesaplanir',
    title: 'KDV Nasıl Hesaplanır?',
    description: 'KDV tutarını ve KDV dahil satış fiyatını hesaplama yöntemleri, formülleri, güncel oranlar ve pratik örnekler.',
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
        formula: 'KDV Tutarı = Vergisiz Tutar × (KDV Oranı / 100)\nKDV Dahil Fiyat = Vergisiz Tutar + KDV Tutarı\nPratik Formül: KDV Dahil = Vergisiz Tutar × (1 + KDV Oranı / 100)'
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
        note: 'Yasal oranlar (%1, %10, %20) mevzuat değişiklikleri veya sektörel istisnalara göre dönemsel olarak güncellenebilir.'
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
        heading: 'Art Arda İndirimler Neden Toplanmaz?',
        paragraphs: [
          'Mağazalarda sıkça görülen "%50 + %20 İndirim" kampanyaları doğrudan %70 indirim anlamına gelmez. İkinci indirim, ilk indirim düşüldükten sonra kalan ara fiyat üzerinden uygulanır.',
          'Örneğin 100 TL\'lik üründe: Önce %50 indirimle 50 TL\'ye düşer; ardından 50 TL\'nin %20\'si olan 10 TL düşülür ve ödenecek tutar 40 TL (net %60 indirim) olur.'
        ]
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
          'Günlük hayatta en sık karşılaşılan dört temel yüzde işlemi şunlardır: Bir sayının yüzdesini bulma, bir sayının diğerine oranını bulma, yüzde artış ve yüzde azalış hesaplama.'
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
  },
  {
    id: 'zam-nasil-hesaplanir',
    slug: 'zam-nasil-hesaplanir',
    title: 'Zam Nasıl Hesaplanır?',
    description: 'Bir fiyata zam uygulama formülü, zamlı fiyat bulma, zam tutarı ve zam öncesi eski fiyatı hesaplama rehberi.',
    category: 'Finans',
    relatedToolSlug: 'zam-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['zam nasıl hesaplanır', 'zam hesaplama', 'zamlı fiyat bulma', 'ters zam hesabı', 'zam formülü'],
    sections: [
      {
        heading: 'Zam Hesaplama Temelleri',
        paragraphs: [
          'Zam, bir malın, hizmetin veya maaşın mevcut fiyatına uygulanan oransal fiyat artışıdır.',
          'Uygulanan zam oranı üzerinden hem ödenecek net zam tutarı hem de artış sonrasındaki yeni fiyat hesaplanır.'
        ]
      },
      {
        heading: 'Zam Hesaplama Formülü',
        paragraphs: [
          'Mevcut tutara zam eklemek için aşağıdaki formüller kullanılır:'
        ],
        formula: 'Zam Tutarı = Mevcut Fiyat × (Zam Oranı / 100)\nZamlı Yeni Fiyat = Mevcut Fiyat + Zam Tutarı'
      },
      {
        heading: 'Ters Zam Hesabı (Zam Öncesi Fiyatı Bulma)',
        paragraphs: [
          'Zamlı fiyattan eski fiyatı bulurken doğrudan aynı yüzdeyi çıkarmak matematiksel olarak hatalıdır. Doğru yöntem bölme işlemi yapmaktır:'
        ],
        formula: 'Zam Öncesi Fiyat = Zamlı Fiyat / (1 + Zam Oranı / 100)\nZam Tutarı = Zamlı Fiyat - Zam Öncesi Fiyat'
      },
      {
        heading: 'Örnek Hesaplama ve Ters Zam Karşılaştırması',
        paragraphs: [
          '10.000 TL\'lik bir fiyata %25 zam uygulandığında ve ardından ters hesap yapıldığında durum şöyledir:'
        ],
        example: {
          title: '%25 Zam ve Ters Hesaplama Özeti',
          items: [
            { label: 'Başlangıç Fiyatı', value: '10.000,00 TL' },
            { label: 'Zam Tutarı (%25)', value: '2.500,00 TL' },
            { label: 'Zamlı Yeni Fiyat', value: '12.500,00 TL' },
            { label: 'Zam Öncesi Fiyat (12.500 / 1,25)', value: '10.000,00 TL' }
          ]
        },
        note: '12.500 TL\'den %25 düşülürse 9.375 TL bulunur. Bu nedenle zam öncesi fiyata ulaşmak için mutlaka bölme formülü (12.500 / 1,25) kullanılmalıdır.'
      }
    ]
  },
  {
    id: 'kar-ve-zarar-nasil-hesaplanir',
    slug: 'kar-ve-zarar-nasil-hesaplanir',
    title: 'Kâr ve Zarar Nasıl Hesaplanır?',
    description: 'Maliyet ve satış fiyatına göre net kâr veya zarar tutarını bulma, kâr/zarar oranı hesaplama ve kâr marjı ile farkı.',
    category: 'Finans',
    relatedToolSlug: 'kar-zarar-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kar ve zarar nasıl hesaplanır', 'kâr zarar hesaplama', 'net kâr bulma', 'zarar hesaplama', 'kâr oranı'],
    sections: [
      {
        heading: 'Kâr ve Zarar Mantığı',
        paragraphs: [
          'Ticari işlemlerde veya ürün satışlarında ortaya çıkan net kazanç veya kayıp, satış fiyatı ile ürünün toplam maliyeti arasındaki farkla belirlenir.',
          'Satış fiyatı maliyetten yüksekse kâr, düşükse zarar elde edilmiş olur.'
        ]
      },
      {
        heading: 'Kâr ve Zarar Formülleri',
        paragraphs: [
          'Net fark ve maliyet üzerinden kâr/zarar oranı şu formüllerle bulunur:'
        ],
        formula: 'Net Kâr/Zarar = Satış Fiyatı - Maliyet\nKâr/Zarar Oranı (%) = [(Satış Fiyatı - Maliyet) / Maliyet] × 100'
      },
      {
        heading: 'Kâr/Zarar Oranı ile Kâr Marjı Farkı',
        paragraphs: [
          'Kâr/zarar oranı hesaplanırken elde edilen kâr "maliyete" bölünür. Kâr marjı hesaplanırken ise elde edilen kâr "satış fiyatına" bölünür.',
          'Örneğin 800 TL maliyetli ürün 1.000 TL\'ye satıldığında: 200 TL kâr elde edilir. Maliyete göre Kâr Oranı %25, Satışa göre Kâr Marjı %20\'dir.'
        ]
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          'Farklı senaryolarda kâr ve zarar sonuçları:'
        ],
        example: {
          title: 'Kâr ve Zarar Örnekleri',
          items: [
            { label: '800 TL Maliyet / 1.000 TL Satış', value: '+200 TL Kâr (%25 Oran)' },
            { label: '1.000 TL Maliyet / 800 TL Satış', value: '-200 TL Zarar (-%20 Oran)' },
            { label: '1.000 TL Maliyet / 1.000 TL Satış', value: '0 TL (Başabaş)' }
          ]
        }
      }
    ]
  },
  {
    id: 'basit-faiz-nasil-hesaplanir',
    slug: 'basit-faiz-nasil-hesaplanir',
    title: 'Basit Faiz Nasıl Hesaplanır?',
    description: 'Anapara, faiz oranı ve süreye göre basit faiz tutarı ve toplam getiri hesaplama yöntemleri ve örnekleri.',
    category: 'Finans',
    relatedToolSlug: 'faiz-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['basit faiz nasıl hesaplanır', 'basit faiz hesaplama', 'basit faiz formülü', 'faiz getirisi', 'anapara faizi'],
    sections: [
      {
        heading: 'Basit Faiz Nedir?',
        paragraphs: [
          'Basit faiz, anaparanın vade boyunca sabit kaldığı ve her dönem yalnızca başlangıç tutarı üzerinden getiri üretildiği faiz hesaplama yöntemidir.',
          'Kazanılan faiz anaparaya ilave edilmez; bu nedenle getiri vade süresiyle doğru orantılı olarak doğrusal artar.'
        ]
      },
      {
        heading: 'Basit Faiz Formülü',
        paragraphs: [
          'Yıllık faiz oranına göre faiz tutarı ve vade sonu toplam tutar formülü:'
        ],
        formula: 'Faiz Tutarı = Anapara × (Yıllık Faiz Oranı / 100) × Süre (Yıl)\nToplam Tutar = Anapara + Faiz Tutarı'
      },
      {
        heading: 'Aylık Vadeler İçin Hesaplama',
        paragraphs: [
          'Süre ay olarak verildiğinde, ay sayısı 12\'ye bölünerek yıl karşılığı bulunur. Örneğin 6 ay = 6/12 = 0,5 yıldır.'
        ],
        formula: 'Aylık Faiz = Anapara × (Faiz Oranı / 100) × (Ay Sayısı / 12)'
      },
      {
        heading: 'Örnek Hesaplamalar',
        paragraphs: [
          '10.000 TL anapara ve %20 yıllık faiz oranı ile:'
        ],
        example: {
          title: '10.000 TL ve %20 Yıllık Faiz Örnekleri',
          items: [
            { label: '1 Yıllık Faiz Tutarı', value: '2.000,00 TL' },
            { label: '1 Yıl Sonu Toplam', value: '12.000,00 TL' },
            { label: '6 Aylık Faiz Tutarı', value: '1.000,00 TL' },
            { label: '6 Ay Sonu Toplam', value: '11.000,00 TL' }
          ]
        }
      }
    ]
  },
  {
    id: 'bilesik-faiz-nedir-ve-nasil-hesaplanir',
    slug: 'bilesik-faiz-nedir-ve-nasil-hesaplanir',
    title: 'Bileşik Faiz Nedir ve Nasıl Hesaplanır?',
    description: 'Bileşik faiz hesaplama formülü, bileşikleşme sıklığı mantığı, anapara büyümesi ve basit faiz ile farkları.',
    category: 'Finans',
    relatedToolSlug: 'faiz-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['bilesik faiz nedir', 'bileşik faiz hesaplama', 'bileşik faiz formülü', 'faizin faizi', 'aylık bileşik faiz'],
    sections: [
      {
        heading: 'Bileşik Faiz Kavramı (Kartopu Etkisi)',
        paragraphs: [
          'Bileşik faiz, her dönem kazanılan faiz tutarının anaparaya eklenmesi ve sonraki dönemin faizinin bu büyüyen yeni tutar üzerinden hesaplanmasıdır.',
          'Halk arasında "faizin faizi" olarak bilinen bu mekanizma, uzun vadelerde basit faize kıyasla çok daha yüksek getiri sağlar.'
        ]
      },
      {
        heading: 'Bileşik Faiz Formülü',
        paragraphs: [
          'Bileşik faizde vade sonu toplam birikim tutarı formülü:'
        ],
        formula: 'Toplam Tutar (A) = Anapara (P) × (1 + r / n)^(n × t)\nFaiz Tutarı = Toplam Tutar - Anapara'
      },
      {
        heading: 'Formüldeki Değişkenler',
        paragraphs: [
          'P: Başlangıç Anaparası, r: Yıllık Faiz Oranı (ondalık olarak %20 için 0,20), n: Yıldaki bileşikleşme sayısı (Aylık için 12, 3 Aylık için 4, Yıllık için 1), t: Yıl cinsinden vade.'
        ]
      },
      {
        heading: 'Örnek Hesaplama (Basit vs Bileşik)',
        paragraphs: [
          '10.000 TL anapara, %10 faiz oranı ve 2 yıl vade durumunda:'
        ],
        example: {
          title: '10.000 TL / %10 Oran / 2 Yıl Karşılaştırması',
          items: [
            { label: 'Basit Faiz Toplamı', value: '12.000,00 TL (2.000 TL Faiz)' },
            { label: 'Bileşik Faiz Toplamı (Yıllık)', value: '12.100,00 TL (2.100 TL Faiz)' },
            { label: 'Bileşik Faiz Farkı', value: '+100,00 TL Ek Kazanç' }
          ]
        }
      }
    ]
  },
  {
    id: 'maliyet-nedir-ve-nasil-hesaplanir',
    slug: 'maliyet-nedir-ve-nasil-hesaplanir',
    title: 'Maliyet Nedir ve Nasıl Hesaplanır?',
    description: 'Ürün ve hizmetlerde toplam maliyet ve birim maliyet hesaplama formülleri, kargo, komisyon ve ek giderlerin maliyete etkisi.',
    category: 'Finans',
    relatedToolSlug: 'maliyet-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['maliyet nedir', 'maliyet nasıl hesaplanır', 'birim maliyet hesaplama', 'toplam maliyet', 'ürün maliyeti'],
    sections: [
      {
        heading: 'Maliyet Kavramı ve Birim Alış Fiyatı ile Farkı',
        paragraphs: [
          'Maliyet, bir mal veya hizmetin üretilmesi, tedarik edilmesi ve satışa hazır hale getirilmesi için yapılan tüm parasal harcamaların toplamıdır.',
          'Ticarette sıkça yapılan en temel hata, tedarikçiye ödenen "birim alış fiyatını" doğrudan nihai maliyet kabul etmektir. Bir ürünün gerçek birim maliyeti; alış bedeline eklenen nakliye, kargo, platform komisyonu, ambalaj ve operasyonel giderlerin ürün adedine paylaştırılmasıyla belirlenir.'
        ]
      },
      {
        heading: 'Toplam Maliyet ve Birim Maliyet Formülleri',
        paragraphs: [
          'Bir ürünün veya toplu ürün partisinin maliyetini bulmak için şu formüller uygulanır:'
        ],
        formula: 'Toplam Alış Maliyeti = Birim Alış Fiyatı × Ürün Adedi\nToplam Maliyet = Toplam Alış Maliyeti + Kargo + Komisyon + Diğer Giderler\nBirim Maliyet = Toplam Maliyet / Ürün Adedi'
      },
      {
        heading: 'Kargo, Komisyon ve Diğer Giderlerin Önemi',
        paragraphs: [
          'Kargo Ücreti: Ürünün depoya gelişi veya müşteriye ulaştırılması için satıcı tarafından karşılanan taşıma bedelidir.',
          'Pazaryeri Komisyonu: E-ticaret platformlarının veya sanal POS aracı kurumlarının işlem başına kestiği hizmet bedelidir.',
          'Diğer Giderler: Paketleme malzemeleri, etiketleme ve doğrudan ürünle ilişkili diğer operasyonel masraflardır.'
        ]
      },
      {
        heading: 'Gerçek Örnek Hesaplama (10 Adet E-Ticaret Ürünü)',
        paragraphs: [
          'Birim alış fiyatı 600 TL olan 10 adet ürün için yapılan harcama kalemleri ve maliyet dökümü:'
        ],
        example: {
          title: '10 Adet Ürün İçin Maliyet Dökümü',
          items: [
            { label: 'Birim Alış Fiyatı', value: '600,00 TL' },
            { label: 'Ürün Adedi', value: '10 Adet' },
            { label: 'Toplam Alış Maliyeti (600 × 10)', value: '6.000,00 TL' },
            { label: 'Kargo ve Nakliye', value: '15,00 TL' },
            { label: 'Pazaryeri Komisyonu', value: '250,00 TL' },
            { label: 'Diğer Giderler (Ambalaj vb.)', value: '34,00 TL' },
            { label: 'Toplam Maliyet', value: '6.299,00 TL' },
            { label: 'Birim Maliyet (6.299 / 10)', value: '629,90 TL / adet' }
          ]
        },
        note: 'Eğer birim maliyet hesaplanırken ek giderler hesaba katılmasaydı, adet başına düşen 29,90 TL\'lik masraf gözden kaçarak kârlılığı eritebilirdi.'
      },
      {
        heading: 'Maliyetten Kârlılığa Geçiş',
        paragraphs: [
          'Gerçek birim maliyetinizi kesin olarak belirledikten sonra, satmayı planladığınız fiyat üzerinden net kazancınızı görmek için Pratiksel Kâr / Zarar Hesaplama veya hedeflediğiniz kâr marjını tutturmak için Kar Marjı Hesaplama araçlarını kullanabilirsiniz.'
        ]
      }
    ]
  },
  {
    id: 'kredi-taksiti-nasil-hesaplanir',
    slug: 'kredi-taksiti-nasil-hesaplanir',
    title: 'Kredi Taksiti Nasıl Hesaplanır?',
    description: 'Banka kredilerinde aylık eşit taksit, toplam faiz ve geri ödeme tutarı hesaplama formülleri ve örnekleri.',
    category: 'Finans',
    relatedToolSlug: 'kredi-taksit-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['kredi taksiti hesaplama', 'kredi faiz formülü', 'annuite taksit', 'aylık kredi ödemesi'],
    sections: [
      {
        heading: 'Kredi Taksit Mantığı (Annuite)',
        paragraphs: [
          'Bankacılıkta tüketici, konut ve taşıt kredilerinde en yaygın yöntem eşit taksitli (annuite) geri ödeme planıdır. Her taksitte anapara ve faiz payı zamanla değişir.'
        ],
        formula: 'Aylık Taksit = Anapara × [ r(1+r)^n / ((1+r)^n - 1) ]'
      }
    ]
  },
  {
    id: 'roi-nedir-ve-nasil-hesaplanir',
    slug: 'roi-nedir-ve-nasil-hesaplanir',
    title: 'ROI Nedir ve Nasıl Hesaplanır?',
    description: 'Yatırımın getiri oranı (ROI) formülü, pazarlama ve ticari yatırımlarda kârlılık analizi rehberi.',
    category: 'Finans',
    relatedToolSlug: 'roi-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['roi nedir', 'roi hesaplama', 'yatırım getirisi', 'return on investment'],
    sections: [
      {
        heading: 'Yatırım Getirisi Oranı',
        paragraphs: [
          'ROI (Return on Investment), bir yatırıma ayrılan sermayenin ne ölçüde net kâr ürettiğini yüzde cinsinden gösteren temel rasyodur.'
        ],
        formula: 'ROI (%) = [(Toplam Getiri - Yatırım Maliyeti) / Yatırım Maliyeti] × 100'
      }
    ]
  },
  {
    id: 'temettu-nedir-ve-nasil-hesaplanir',
    slug: 'temettu-nedir-ve-nasil-hesaplanir',
    title: 'Temettü (Kâr Payı) Nedir ve Nasıl Hesaplanır?',
    description: 'Borsa ve hisse senedi yatırımlarında nakit temettü geliri ve temettü verimi hesaplama yöntemi.',
    category: 'Finans',
    relatedToolSlug: 'kar-payi-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['temettü nedir', 'temettü hesaplama', 'kâr payı dağıtımı', 'temettü verimi'],
    sections: [
      {
        heading: 'Temettü Geliri ve Verimi',
        paragraphs: [
          'Şirketlerin yıllık net kârlarından hissedarlarına dağıttığı nakit paydır. Temettü verimi ise dağıtılan nakdin hisse fiyatına oranıdır.'
        ],
        formula: 'Toplam Temettü = Hisse Adedi × Hisse Başı Net Temettü\nTemettü Verimi (%) = (Hisse Başı Temettü / Hisse Fiyatı) × 100'
      }
    ]
  },
  {
    id: 'enflasyon-ve-satin-alma-gucu-hesaplama',
    slug: 'enflasyon-ve-satin-alma-gucu-hesaplama',
    title: 'Enflasyon ve Satın Alma Gücü Nasıl Hesaplanır?',
    description: 'Enflasyonun paranın reel değerine etkisi, kümülatif enflasyon ve gelecekteki satın alma gücü formülleri.',
    category: 'Finans',
    relatedToolSlug: 'enflasyon-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['enflasyon hesaplama', 'satın alma gücü', 'kümülatif enflasyon', 'para değer kaybı'],
    sections: [
      {
        heading: 'Enflasyonun Reel Etkisi',
        paragraphs: [
          'Enflasyon arttıkça aynı parayla satın alınabilen mal miktarı azalır. Kümülatif enflasyon zaman içinde bileşik faiz gibi katlanarak ilerler.'
        ],
        formula: 'Gelecekteki Eşdeğer Tutar = Tutar × (1 + Enflasyon / 100)^Yıl'
      }
    ]
  },
  {
    id: 'basabas-noktasi-nedir-ve-nasil-hesaplanir',
    slug: 'basabas-noktasi-nedir-ve-nasil-hesaplanir',
    title: 'Başabaş Noktası Nedir ve Nasıl Hesaplanır?',
    description: 'Sabit ve değişken giderlere göre kâra geçiş için satılması gereken başabaş ürün adedi ve ciro formülleri.',
    category: 'İş ve Ticaret',
    relatedToolSlug: 'basabas-noktasi-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['başabaş noktası', 'break even point', 'başabaş analizi', 'kâra geçiş noktası'],
    sections: [
      {
        heading: 'Başabaş Noktası Mantığı',
        paragraphs: [
          'Toplam hasılatın toplam maliyetlere eşit olduğu ve kârın sıfır olduğu kritik işletme üretim hacmidir.'
        ],
        formula: 'Birim Katkı Payı = Satış Fiyatı - Değişken Maliyet\nBaşabaş Satış Adedi = Toplam Sabit Giderler / Birim Katkı Payı'
      }
    ]
  },
  {
    id: 'komisyon-tutari-nasil-hesaplanir',
    slug: 'komisyon-tutari-nasil-hesaplanir',
    title: 'Komisyon Tutarı Nasıl Hesaplanır?',
    description: 'E-ticaret pazaryerlerinde ve aracı kuruluşlarda oransal ve sabit komisyon hesaplama yöntemleri.',
    category: 'İş ve Ticaret',
    relatedToolSlug: 'komisyon-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['komisyon hesaplama', 'pazaryeri komisyonu', 'satıcı komisyonu', 'net hakediş'],
    sections: [
      {
        heading: 'Komisyon Kesintileri',
        paragraphs: [
          'Platformlar satış tutarından belirli bir yüzde ve işlem ücreti keserek kalan tutarı satıcıya aktarır.'
        ],
        formula: 'Kesilen Komisyon = (Satış Tutarı × Komisyon Oranı / 100) + Sabit Ücret'
      }
    ]
  },
  {
    id: 'ciro-nedir-ve-nasil-hesaplanir',
    slug: 'ciro-nedir-ve-nasil-hesaplanir',
    title: 'Ciro Nedir ve Nasıl Hesaplanır?',
    description: 'İşletmelerde brüt ciro, hasılat hesaplama ve ciro ile kâr arasındaki temel farklar.',
    category: 'İş ve Ticaret',
    relatedToolSlug: 'ciro-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['ciro nedir', 'ciro hesaplama', 'hasılat hesaplama', 'brüt ciro'],
    sections: [
      {
        heading: 'Ciro ve Hasılat',
        paragraphs: [
          'Ciro, bir işletmenin belirli bir zaman diliminde yaptığı satışlardan elde ettiği brüt para girişidir.'
        ],
        formula: 'Ciro = Satılan Ürün Adedi × Ortalama Satış Fiyatı'
      }
    ]
  },
  {
    id: 'stok-devir-hizi-nedir-ve-nasil-hesaplanir',
    slug: 'stok-devir-hizi-nedir-ve-nasil-hesaplanir',
    title: 'Stok Devir Hızı Nedir ve Nasıl Hesaplanır?',
    description: 'Stok devir hızı oranı, stokta kalma gün süresi ve depo verimliliği hesaplama rehberi.',
    category: 'İş ve Ticaret',
    relatedToolSlug: 'stok-devir-hizi-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['stok devir hızı', 'stok devir süresi', 'stok eritme hızı', 'envanter devri'],
    sections: [
      {
        heading: 'Stok Devir Rasyosu',
        paragraphs: [
          'Depodaki malların yılda kaç kez satılıp yenilendiğini ve bir ürünün ortalama kaç gün stokta beklediğini gösterir.'
        ],
        formula: 'Stok Devir Hızı = Satılan Malın Maliyeti / Ortalama Stok\nStokta Kalma Süresi = 365 / Stok Devir Hızı'
      }
    ]
  },
  {
    id: 'ortalama-medyan-mod-nasil-hesaplanir',
    slug: 'ortalama-medyan-mod-nasil-hesaplanir',
    title: 'Ortalama, Medyan ve Mod Nasıl Hesaplanır?',
    description: 'Aritmetik ortalama, ortanca değer (medyan) ve tepe değer (mod) hesaplama yöntemleri ve farkları.',
    category: 'Matematik',
    relatedToolSlug: 'ortalama-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['ortalama hesaplama', 'medyan bulma', 'mod nedir', 'merkezi eğilim ölçüleri'],
    sections: [
      {
        heading: 'İstatistikte Merkez Eğilim',
        paragraphs: [
          'Ortalama sayıların toplamının adede bölünmesidir. Medyan sıralanmış dizinin tam ortasındaki sayıdır. Mod ise en çok tekrar eden sayıdır.'
        ]
      }
    ]
  },
  {
    id: 'oran-oranti-nasil-hesaplanir',
    slug: 'oran-oranti-nasil-hesaplanir',
    title: 'Oran Orantı Nasıl Hesaplanır?',
    description: 'Doğru orantı ve ters orantı formülleri, içler dışlar çarpımı ve problem çözme adımları.',
    category: 'Matematik',
    relatedToolSlug: 'oran-oranti-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['oran orantı hesaplama', 'doğru orantı', 'ters orantı', 'içler dışlar'],
    sections: [
      {
        heading: 'Orantı Türleri',
        paragraphs: [
          'Doğru orantıda iki çokluk aynı anda artar veya azalır (X = B × C / A). Ters orantıda ise biri artarken diğeri azalır (X = A × B / C).'
        ]
      }
    ]
  },
  {
    id: 'tarih-farki-nasil-hesaplanir',
    slug: 'tarih-farki-nasil-hesaplanir',
    title: 'İki Tarih Arasındaki Gün ve Süre Farkı Nasıl Hesaplanır?',
    description: 'İki tarih arasındaki gün, hafta, ay, yıl ve iş günü farkını hesaplama rehberi.',
    category: 'Zaman ve Tarih',
    relatedToolSlug: 'tarih-farki-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['tarih farkı hesaplama', 'iki tarih arası gün', 'gün sayısı bulma'],
    sections: [
      {
        heading: 'Tarih Farkı Hesabı',
        paragraphs: [
          'Miladi takvimde ay günlerinin (28, 30, 31) ve artık yılların dikkate alınmasıyla iki tarih arasındaki tam gün ve iş günü farkı bulunur.'
        ]
      }
    ]
  },
  {
    id: 'beden-kitle-indeksi-bmi-nedir',
    slug: 'beden-kitle-indeksi-bmi-nedir',
    title: 'Beden Kitle İndeksi (BMI) Nedir ve Nasıl Hesaplanır?',
    description: 'Boy ve kiloya göre vücut kitle indeksi hesaplama, WHO kilo kategorileri ve ideal kilo aralığı.',
    category: 'Günlük Hayat ve Sağlık',
    relatedToolSlug: 'bmi-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['beden kitle indeksi', 'bmi hesaplama', 'vki formülü', 'ideal kilo'],
    sections: [
      {
        heading: 'Vücut Kitle İndeksi (VKİ)',
        paragraphs: [
          'Dünya Sağlık Örgütü tarafından vücut ağırlığının boyun karesine bölünmesiyle hesaplanan genel sağlık ve kilo göstergesidir.'
        ],
        formula: 'BMI = Kilo (kg) / [Boy (m) × Boy (m)]'
      }
    ]
  },
  {
    id: 'maas-saat-ucreti-ve-fazla-mesai-hesaplama',
    slug: 'maas-saat-ucreti-ve-fazla-mesai-hesaplama',
    title: 'Maaş Saat Ücreti ve Fazla Mesai Nasıl Hesaplanır?',
    description: '4857 sayılı İş Kanununa göre 225 saat yasal böleni, saatlik ücret ve %50-%100 zamlı fazla mesai hak edişi.',
    category: 'Maaş ve Çalışma',
    relatedToolSlug: 'saat-ucreti-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['saat ücreti hesaplama', 'fazla mesai hesaplama', '225 saat kuralı', 'iş kanunu mesai'],
    sections: [
      {
        heading: 'Yasal Saatlik Ücret ve Fazla Çalışma',
        paragraphs: [
          'İş Kanunu uyarınca aylık çalışma saati 225 saattir. Normal fazla çalışma saat ücretinin %50 fazlasıyla, resmi tatil çalışmaları ise %100 zamla ödenir.'
        ],
        formula: 'Saatlik Ücret = Aylık Maaş / 225\nNormal Fazla Mesai = Saat Ücreti × 1,5 × Mesai Saati'
      }
    ]
  },
  {
    id: 'json-nedir-ve-nasil-formatlanir',
    slug: 'json-nedir-ve-nasil-formatlanir',
    title: 'JSON Nedir ve Nasıl Formatlanır?',
    description: 'JSON (JavaScript Object Notation) veri yapısı, kullanım alanları, beautify, minify ve doğrulama rehberi.',
    category: 'Developer ve Kodlama',
    relatedToolSlug: 'json-formatlayici',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['json nedir', 'json formatlama', 'json beautifier', 'json validator', 'json yapısı'],
    sections: [
      {
        heading: 'JSON Veri Formatı',
        paragraphs: [
          'JSON (JavaScript Object Notation), insanlar tarafından kolayca okunabilen ve makineler tarafından hızla ayrıştırılabilen hafif bir veri değişim formatıdır.',
          'Web API\'leri, veritabanları ve modern yazılım mimarilerinde veri iletimi için küresel standart olarak kullanılır.'
        ]
      },
      {
        heading: 'Beautify (Güzelleştirme) ve Minify (Sıkıştırma)',
        paragraphs: [
          'Güzelleştirme (Beautify), tek satır halindeki JSON dizgesine 2 veya 4 boşluklu hiyerarşik girintiler ekleyerek okunabilirliği artırır.',
          'Sıkıştırma (Minify) ise tüm boşluk ve satır sonlarını temizleyerek dosya boyutunu düşürür ve ağ transfer hızını optimize eder.'
        ]
      }
    ]
  },
  {
    id: 'seo-uyumlu-url-slug-nasil-olusturulur',
    slug: 'seo-uyumlu-url-slug-nasil-olusturulur',
    title: 'SEO Uyumlu URL (Slug) Nasıl Oluşturulur?',
    description: 'Arama motoru optimizasyonunda temiz URL yapısının önemi, Türkçe karakter dönüşümü ve en iyi slug kuralları.',
    category: 'Metin Araçları',
    relatedToolSlug: 'slug-olusturucu',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['seo slug nedir', 'url slug oluşturma', 'seo dostu url', 'temiz link yapısı'],
    sections: [
      {
        heading: 'URL Slug Nedir?',
        paragraphs: [
          'Slug, bir web sayfasının adresinin (URL) son bölümünde yer alan ve sayfa içeriğini hem kullanıcılara hem de arama motorlarına açıkça anlatan okunabilir metin parçasıdır.'
        ]
      },
      {
        heading: 'En İyi SEO Slug Kuralları',
        paragraphs: [
          'Kelimeleri ayırmak için alt çizgi (_) yerine tire (-) kullanılmalıdır.',
          'Türkçe ve özel karakterler standart ASCII karşılıklarına dönüştürülmeli (ö -> o, ş -> s vb.), tüm harfler küçük olmalı ve gereksiz bağlaçlar (ve, ile, için) temizlenmelidir.'
        ]
      }
    ]
  },
  {
    id: 'guclu-ve-guvenli-sifre-nasil-olusturulur',
    slug: 'guclu-ve-guvenli-sifre-nasil-olusturulur',
    title: 'Güçlü ve Güvenli Şifre Nasıl Oluşturulur?',
    description: 'Kaba kuvvet (brute-force) saldırılarına karşı kırılması imkansız şifre oluşturma taktikleri ve entropi ilkeleri.',
    category: 'Güvenlik ve Utility',
    relatedToolSlug: 'guvenli-sifre-olusturucu',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['güvenli şifre oluşturma', 'güçlü parola kriterleri', 'şifre güvenliği', 'brute force koruma'],
    sections: [
      {
        heading: 'Güçlü Bir Şifrenin Kriterleri',
        paragraphs: [
          'Güvenli bir parola en az 14-16 karakter uzunluğunda olmalı; büyük harf, küçük harf, rakam ve özel sembollerin dengeli bir karışımını içermelidir.',
          'Doğum tarihi, isim veya sıralı harfler gibi tahmin edilebilir kişisel verilerden kesinlikle kaçınılmalıdır.'
        ]
      },
      {
        heading: 'Kriptografik Rastgelelik ve Parola Yöneticileri',
        paragraphs: [
          'Tarayıcı tabanlı güvenli şifre üreteçleri, Web Crypto API donanım entropisini kullanarak tamamen tahmin edilemez dizgeler üretir. Her hesap için benzersiz bir şifre kullanmak veri sızıntılarına karşı en etkili kalkandır.'
        ]
      }
    ]
  },
  {
    id: 'pdf-nasil-birlestirilir',
    slug: 'pdf-nasil-birlestirilir',
    title: 'PDF Dosyaları Nasıl Birleştirilir?',
    description: 'Birden fazla bağımsız PDF belgesini tek bir dosyada güvenle birleştirme adımları, sayfa sıralaması ve dikkat edilmesi gerekenler.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'pdf-birlestir',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['pdf birleştirme', 'pdf nasıl birleştirilir', 'pdf dosyalarını birleştir', 'merge pdf rehberi'],
    sections: [
      {
        heading: 'PDF Birleştirme Neden Gereklidir?',
        paragraphs: [
          'İş başvurularında CV ve sertifikaları tek bir dosyada toplamak, resmi kurumlara gönderilen çok parçalı evrakları düzenlemek veya rapor eklerini tek bir belgede sunmak için PDF birleştirme işlemine sıklıkla ihtiyaç duyulur.',
          'Birden fazla PDF belgesini e-posta ile tek tek göndermek yerine tek bir derli toplu PDF halinde iletmek hem profesyonel bir görünüm sağlar hem de karşı tarafın belgeleri eksiksiz incelemesini kolaylaştırır.'
        ]
      },
      {
        heading: 'Adım Adım PDF Birleştirme',
        paragraphs: [
          '1. Birleştirmek istediğiniz PDF dosyalarını Pratiksel PDF Birleştirici alanına sürükleyin veya dosya seçici ile yükleyin.',
          '2. Dosya listesindeki yukarı/aşağı ok butonlarını kullanarak belgelerin nihai PDF içindeki sıralamasını belirleyin.',
          '3. "PDF’leri Birleştir" butonuna tıklayın. Birleştirilmiş yeni dosyanız anında tarayıcınızda oluşturulup indirilmeye hazır hale gelir.'
        ]
      }
    ]
  },
  {
    id: 'pdf-nasil-bolunur-ve-sayfalar-nasil-ayrilir',
    slug: 'pdf-nasil-bolunur-ve-sayfalar-nasil-ayrilir',
    title: 'PDF Nasıl Bölünür ve Belirli Sayfalar Nasıl Ayrılır?',
    description: 'Çok sayfalı büyük PDF belgelerinden belirli sayfaları ayırma yöntemleri, sayfa aralığı yazım kuralları ve pratik çözümler.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'pdf-bol',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['pdf bölme', 'pdf nasıl bölünür', 'pdf sayfa ayırma', 'split pdf rehberi'],
    sections: [
      {
        heading: 'PDF Bölme Mantığı',
        paragraphs: [
          'Bazen onlarca sayfalık bir sözleşmenin veya e-kitabın yalnızca 2-3 sayfasına ihtiyaç duyarsınız. Tüm belgeyi paylaşmak yerine yalnızca ilgili sayfaları bölüp ayırmak hem dosya boyutunu küçültür hem de gizlilik sağlar.'
        ]
      },
      {
        heading: 'Sayfa Aralıklarını Belirleme',
        paragraphs: [
          'Sayfa numaralarını virgülle ayırarak tekil sayfaları (örneğin 1, 4, 9), tire işareti ile de ardışık sayfa bloklarını (örneğin 3-7) ifade edebilirsiniz.',
          'Pratiksel PDF Bölücü, orijinal dosyanızı değiştirmeden yalnızca istediğiniz sayfalardan yepyeni bir PDF oluşturur.'
        ]
      }
    ]
  },
  {
    id: 'pdf-sayfasi-nasil-silinir',
    slug: 'pdf-sayfasi-nasil-silinir',
    title: 'PDF Sayfası Nasıl Silinir ve Temizlenir?',
    description: 'PDF belgelerindeki boş, gereksiz veya hatalı sayfaları kolayca çıkarma ve temizleme rehberi.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'pdf-sayfa-sil',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['pdf sayfa silme', 'pdf sayfası nasıl silinir', 'pdf boş sayfa sil', 'delete pdf pages'],
    sections: [
      {
        heading: 'İstenmeyen Sayfaları Çıkarma',
        paragraphs: [
          'Tarama işlemlerinde sıklıkla araya boş sayfalar karışır veya çift taraflı baskı taramalarında arka kapak gibi gereksiz sayfalar yer alır.',
          'Pratiksel PDF Sayfa Silici ile belgenizdeki tüm sayfaları ızgara düzeninde görerek silmek istediklerinizi tek tıkla işaretleyebilir ve saniyeler içinde temiz bir kopya elde edebilirsiniz.'
        ]
      }
    ]
  },
  {
    id: 'jpg-ve-png-gorselleri-pdf-yapma',
    slug: 'jpg-ve-png-gorselleri-pdf-yapma',
    title: 'JPG ve PNG Görselleri PDF’e Dönüştürme',
    description: 'Fotoğrafları, faturaları ve belgeleri tek bir A4 PDF dosyasında birleştirme rehberi ve sayfa ayarları.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'gorselleri-pdf-yap',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['jpg to pdf', 'fotoğrafı pdf yapma', 'resmi pdf yap', 'png to pdf rehberi'],
    sections: [
      {
        heading: 'Görselleri Neden PDF Formatına Çevirmeliyiz?',
        paragraphs: [
          'Fotoğraf formatları (JPG, PNG) farklı cihazlarda farklı boyutlarda görüntülenebilir. Belgeleri PDF formatına dönüştürmek, evrakların tüm yazıcılarda ve ekranlarda standart A4 veya orijinal sayfa ölçülerinde açılmasını garanti eder.'
        ]
      }
    ]
  },
  {
    id: 'pdf-islemlerinde-tarayici-tabanli-guvenlik',
    slug: 'pdf-islemlerinde-tarayici-tabanli-guvenlik',
    title: 'Online PDF İşlemlerinde Güvenlik ve Gizlilik',
    description: 'Hassas evrakların sunucuya yüklenmeden tarayıcı içinde (Client-Side) işlenmesinin önemi ve avantajları.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'pdf-birlestir',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['pdf güvenliği', 'güvenli pdf birleştirme', 'client side pdf', 'dosya gizliliği'],
    sections: [
      {
        heading: 'Geleneksel Online Araçların Gizlilik Riski',
        paragraphs: [
          'Pek çok geleneksel çevrimiçi dosya dönüştürücü, belgelerinizi önce kendi uzak sunucularına yükler, orada işler ve ardından indirme linki sunar. Bu durum sözleşmeler, kimlik fotokopileri veya finansal dekontlar gibi hassas veriler için gizlilik riski doğurabilir.'
        ]
      },
      {
        heading: 'Pratiksel’in %100 İstemci Taraflı (Client-Side) Mimarisi',
        paragraphs: [
          'Pratiksel PDF ve Dosya Araçları, modern JavaScript ve WebAssembly teknolojileriyle doğrudan bilgisayarınızın veya telefonunuzun tarayıcısında çalışır. Dosyalarınız cihazınızın dışına asla çıkmaz, hiçbir sunucuya yüklenmez ve üçüncü taraflarla paylaşılmaz.'
        ]
      }
    ]
  },
  {
    id: 'jpg-pdf-nasil-donusturulur',
    slug: 'jpg-pdf-nasil-donusturulur',
    title: 'JPG Dosyaları PDF’e Nasıl Dönüştürülür?',
    description: 'Fotoğrafları, faturaları ve taranmış evrakları kalite kaybı yaşamadan tek bir A4 PDF dosyasında birleştirme ve dönüştürme rehberi.',
    category: 'PDF ve Dosya',
    relatedToolSlug: 'jpg-pdf-donusturucu',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['jpg pdf dönüştürme', 'jpg to pdf nasıl yapılır', 'resmi pdf yapma', 'fotoğrafı pdf yapma', 'jpg pdf çevirici rehberi'],
    sections: [
      {
        heading: 'JPG ve PDF Formatları Arasındaki Farklar',
        paragraphs: [
          'JPG (Joint Photographic Experts Group), dijital fotoğrafları ve rasterize edilmiş görselleri sıkıştırarak küçük dosya boyutunda saklamak için tasarlanmış popüler bir resim formatıdır.',
          'PDF (Portable Document Format) ise metin, vektör grafikler ve raster görselleri bir arada barındıran; açıldığı her cihazda, işletim sisteminde ve yazıcıda sayfa düzeninin, fontların ve boyutların milimetrik olarak aynı kalmasını garanti eden evrensel bir belge standardıdır.'
        ]
      },
      {
        heading: 'Görselleri Neden PDF Formatına Çevirmeliyiz?',
        paragraphs: [
          '1. Tek Dosyada Toplama: 10 ayrı fotoğrafı e-posta ile tek tek göndermek yerine hepsini sıralı sayfalar halinde tek bir PDF dosyasında iletmek çok daha profesyoneldir.',
          '2. Yazdırma Standartı: Resimler fotoğraf yazıcılarında farklı kenar boşluklarıyla basılabilirken, A4 formatındaki bir PDF her yazıcıda tam ölçüsünde çıkar.',
          '3. Resmi Başvurular: Vize, iş başvurusu, bankacılık ve kamu portalları evrak yüklemelerinde çoğunlukla yalnızca PDF formatını kabul eder.'
        ]
      },
      {
        heading: 'A4 Sayfaya Görsel Yerleştirme ve Aspect Ratio (En-Boy Oranı)',
        paragraphs: [
          'Görseller PDF sayfasına aktarılırken en sık yapılan hata, resmin sayfa boyutuna zorlanarak uzatılması (ezilmesi) veya kenarlarının kırpılmasıdır.',
          'Pratiksel JPG PDF Dönüştürücü, orijinal görselin en-boy oranını (aspect ratio) tam olarak korur. Resim, sayfa içerisine ve seçilen kenar boşluklarına göre maksimum ölçekte, ortalanmış olarak yerleştirilir.'
        ]
      },
      {
        heading: 'Adım Adım JPG → PDF Dönüştürme',
        paragraphs: [
          '1. Birleştirmek istediğiniz JPG, JPEG veya PNG görsellerini Pratiksel yükleme alanına sürükleyin.',
          '2. Liste üzerinden yukarı ve aşağı ok butonlarıyla sayfa sırasını belirleyin.',
          '3. Sayfa boyutunu (A4, A5 veya Görsel Boyutu) ve kenar boşluğunu seçin.',
          '4. "PDF’i Oluştur ve İndir" butonuna tıklayın. Belgeniz anında cihazınızda üretilir.'
        ]
      },
      {
        heading: 'Dosya Güvenliği ve Yerel (Client-Side) Gizlilik',
        paragraphs: [
          'Pasaport fotokopileri, sözleşmeler ve banka dekontları gibi kişisel veriler içeren görsellerinizin güvenliği son derece kritiktir.',
          'Pratiksel, hiçbir görselinizi uzak sunuculara göndermez. Tüm dönüşüm işlemi tarayıcınızın kendi bellek ve işlemci gücüyle cihazınızda tamamlanır.'
        ]
      }
    ]
  },
  {
    id: 'metin-pdfe-nasil-donusturulur',
    slug: 'metin-pdfe-nasil-donusturulur',
    title: "Metin PDF'e Nasıl Dönüştürülür?",
    description: 'Yazı ve metinlerinizi tarayıcı üzerinde A4, A5 ve Letter formatında PDF dosyasına dönüştürme rehberi, yazı tipi ve sayfa ayarları.',
    category: 'PDF & Dosya',
    relatedToolSlug: 'metni-pdf-donusturucu',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-23',
    keywords: ['metin pdf dönüştürme', 'yazıyı pdf yapma', 'text to pdf', 'online pdf oluşturucu', 'telefonda metni pdf yapma'],
    sections: [
      {
        heading: "Metni PDF'e Dönüştürme Nedir?",
        paragraphs: [
          "Metni PDF'e dönüştürme, kopyaladığınız veya sıfırdan yazdığınız düz yazıların sayfa yapısı, kenar boşlukları ve tipografisi sabitlenmiş evrensel bir PDF belgesine çevrilmesidir.",
          "Düz metin (.txt) dosyaları açıldıkları cihazın yazı tipine ve ekran boyutuna göre değişkenlik gösterirken, PDF formatı belgenin her ekranda ve yazıcı çıktısında tam olarak aynı görünmesini sağlar."
        ]
      },
      {
        heading: "Metin Neden PDF Formatına Dönüştürülür?",
        paragraphs: [
          "1. Sabit Sayfa Düzeni: Belgenin kenar boşlukları, satır yükseklikleri ve sayfa geçişleri kilitlenir; cihazlar arası biçim bozulması yaşanmaz.",
          "2. Resmi Paylaşım Kolaylığı: Raporlar, sözleşme taslakları, dilekçeler ve ödevler kurumsal ortamlarda standart olarak PDF formatında talep edilir.",
          "3. Yazdırma Uyumluluğu: A4, A5 veya Letter boyutlarında standartlaşmış bir PDF, ofis veya ev yazıcılarında kayma olmadan tam ölçüsünde basılır.",
          "4. Güvenlik ve Bütünlük: Metin üzerinde yanlışlıkla yapılacak değişikliklerin önüne geçilir."
        ]
      },
      {
        heading: 'Telefonda ve Bilgisayarda Metin PDF’e Nasıl Çevrilir?',
        paragraphs: [
          '1. Metninizi Hazırlayın: Dönüştürmek istediğiniz yazıyı kopyalayın veya doğrudan Pratiksel metin alanına yazın.',
          '2. Sayfa ve Tipografi Ayarlarını Seçin: İhtiyacınıza göre sayfa boyutunu (A4, A5, Letter), yönünü (Dikey, Yatay), yazı tipini ve boyutunu belirleyin.',
          '3. Önizlemeyi Kontrol Edin: Sayfa yerleşimini ve tahmini sayfa sayısını sağdaki önizleme kutusundan inceleyin.',
          '4. İndirin: "PDF Oluştur ve İndir" butonuna dokunarak dosyanızı saniyeler içinde cihazınıza kaydedin.'
        ]
      },
      {
        heading: 'Sayfa Boyutu, Yazı Tipi ve Kenar Boşluklarının Önemi',
        paragraphs: [
          'Sayfa Boyutu: Resmi yazışmalar, faturalar ve dilekçeler için Türkiye standardı A4 (210 × 297 mm) boyutudur. Küçük notlar için A5 veya uluslararası dokümanlar için Letter tercih edilebilir.',
          'Yazı Tipi (Font): Modern ve kolay okunan dokümanlar için Arial (Sans-serif), edebi ve resmi belgeler için Georgia (Serif), kod ve teknik metinler için Courier New (Monospace) önerilir.',
          'Yazı Boyutu: Standart bir A4 belgede 12 pt veya 14 pt yazı boyutu en ideal okunabilirliği sunar.'
        ]
      },
      {
        heading: 'Türkçe Karakterler PDF’te Neden Bozulabilir?',
        paragraphs: [
          'Birçok eski veya standart PDF kütüphanesi yalnızca İngilizce ASCII / Latin-1 karakter setini destekler. Bu nedenle "ç, Ç, ğ, Ğ, ı, İ, ö, Ö, ş, Ş, ü, Ü" gibi Türkçe karakterler "?" veya anlamsız semboller olarak basılabilir.',
          'Pratiksel Metni PDF’e Dönüştürücü aracı, Türkçe karakterleri tam destekleyen Unicode font motoru (Latin-Extended) kullanır. Bu sayede yazınızdaki tüm Türkçe harfler eksiksiz ve kusursuz şekilde PDF belgenize işlenir.'
        ]
      },
      {
        heading: 'Tarayıcı Tabanlı Gizlilik ve Veri Güvenliği',
        paragraphs: [
          'Yazdığınız özel notlar, sözleşme taslakları veya kişisel bilgileriniz hiçbir uzak sunucuya aktarılmaz.',
          'PDF oluşturma işleminin tamamı tarayıcınızın kendi işlemci gücüyle cihazınızda (client-side) gerçekleşir, tam gizlilik ve güvenlik sağlanır.'
        ]
      }
    ]
  },
  {
    id: 'sosyal-medya-gorsel-boyutlari-rehberi',
    slug: 'sosyal-medya-gorsel-boyutlari',
    title: 'Sosyal Medya Görsel Boyutları: Instagram, YouTube, TikTok ve Diğer Platformlar',
    description: 'Instagram, YouTube, TikTok, LinkedIn ve X için güncel görsel ölçüleri, en boy oranları ve görsel kalitesini koruma rehberi.',
    category: 'Görsel ve Medya',
    relatedToolSlug: 'sosyal-medya-gorsel-boyutlandirici',
    readTime: '5 dk okuma',
    publishedAt: '2026-08-24',
    keywords: [
      'sosyal medya görsel boyutları',
      'instagram gönderi boyutu',
      'instagram story reels boyutu',
      'youtube thumbnail boyutu',
      'tiktok video boyutu',
      'linkedin görsel ölçüleri',
      'twitter kapak boyutu',
      'görsel boyutlandırma'
    ],
    sections: [
      {
        heading: 'Sosyal Medyada Doğru Görsel Boyutunun Önemi',
        paragraphs: [
          'Sosyal medya algoritmaları ve mobil arayüzler, paylaşılan içeriklerin belirli en-boy oranlarına (aspect ratio) ve piksel ölçülerine tam olarak uymasını bekler. Yanlış boyutta yüklenen görseller platformlar tarafından otomatik olarak kırpılır veya sıkıştırılır; bu da bulanıklığa, metinlerin kesilmesine ve etkileşim kaybına yol açar.',
          'Görsellerinizi paylaşmadan önce platformun önerdiği kesin piksel ölçülerine getirmek, içeriğinizin hem masaüstünde hem de mobil cihazlarda en net ve profesyonel kalitede görünmesini sağlar.'
        ]
      },
      {
        heading: 'Instagram Görsel Boyutları ve Formatları',
        paragraphs: [
          'Instagram akışında en çok tercih edilen format 1080 × 1350 piksel (4:5 dikey) ölçüsüdür. Dikey format, kullanıcının telefon ekranında maksimum alanı kaplayarak dikkat çekme oranını artırır.',
          'Instagram için standart ölçüler şunlardır:\n• Dikey Gönderi (Portrait): 1080 × 1350 px (4:5 oran)\n• Kare Gönderi (Square): 1080 × 1080 px (1:1 oran)\n• Yatay Gönderi (Landscape): 1080 × 566 px (1.91:1 oran)\n• Hikaye ve Reels (Story & Reels): 1080 × 1920 px (9:16 oran)\n• Profil Fotoğrafı: 320 × 320 px (1:1 daire kırpma)'
        ]
      },
      {
        heading: 'YouTube Küçük Resim (Thumbnail) ve Kapak Ölçüleri',
        paragraphs: [
          'YouTube videolarında tıklanma oranını (CTR) belirleyen en kritik unsur küçük resimdir (Thumbnail). 1280 × 720 piksel (16:9) ölçüsü standarttır ve maksimum dosya boyutu 2 MB olmalıdır.',
          'YouTube kanal kapak bannerı için 2560 × 1440 piksel önerilir. Ancak mobil, tablet ve TV gibi farklı ekranlarda güvenli alan merkezdeki 1235 × 338 pikseldir; logo ve kanal sloganınızı bu merkez alana yerleştirmelisiniz.'
        ]
      },
      {
        heading: 'TikTok, LinkedIn ve X (Twitter) Ölçüleri',
        paragraphs: [
          'TikTok: Tam ekran dikey video ve hikayeler için 1080 × 1920 piksel (9:16 oran) kullanılır. Profil resmi için en az 200 × 200 piksel önerilir.',
          'LinkedIn: Bağlantı ve gönderi görselleri için 1200 × 627 piksel (1.91:1) veya 1080 × 1080 piksel (1:1) kullanılır. Kişisel profil kapak görseli 1584 × 396 piksel, şirket kapak görseli ise 1128 × 191 pikseldir.',
          'X (Twitter): Akış tweet görselleri için 1200 × 675 piksel (16:9), profil üst header kapağı için 1500 × 500 piksel (3:1 oran) standarttır.'
        ]
      },
      {
        heading: 'JPG, PNG ve WebP: Hangi Formatı Seçmelisiniz?',
        paragraphs: [
          '• JPG (JPEG): Fotoğraflar ve karmaşık renk geçişleri içeren görseller için idealdir. Küçük dosya boyutu ile hızlı yükleme sunar.',
          '• PNG: Şeffaf arka plan gerektiren logolar, ikonlar ve keskin metin içeren tasarımlar için kayıpsız (lossless) en iyi seçenektir.',
          '• WebP: Modern web standardı olup JPG ve PNG kalitesini %30 daha küçük dosya boyutunda sağlayarak hızlı yükleme avantajı sunar.'
        ],
        note: 'Görselinizi seçtiğiniz sosyal medya ölçüsüne tarayıcınızda anında ve ücretsiz dönüştürmek için Pratiksel Sosyal Medya Görsel Boyutlandırıcı aracını kullanabilirsiniz.'
      }
    ]
  },
  {
    id: 'kidem-tazminati-nasil-hesaplanir',
    slug: 'kidem-tazminati-nasil-hesaplanir',
    title: 'Kıdem Tazminatı Nasıl Hesaplanır?',
    description: '1475 sayılı Kanun uyarınca kıdem tazminatı hesaplama şartları, giydirilmiş brüt ücret mantığı, yasal tavan ve kesintiler rehberi.',
    category: 'İş & Çalışma',
    relatedToolSlug: 'kidem-tazminati-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-24',
    keywords: ['kıdem tazminatı nasıl hesaplanır', 'kıdem tazminatı şartları', 'giydirilmiş brüt ücret', 'kıdem tavanı'],
    sections: [
      {
        heading: 'Kıdem Tazminatına Hak Kazanma Şartları',
        paragraphs: [
          '1475 Sayılı İş Kanunu m. 14 hükmüne göre kıdem tazminatı; işçinin aynı işverene bağlı işyerlerinde en az 1 tam yıl çalışmış olması ve iş sözleşmesinin kanunda belirtilen haklı veya geçerli nedenlerle sona ermesi halinde ödenen yasal bir tazminattır.',
          'İşverenin haksız feshi, işçinin haklı nedenle feshi (ücretin ödenmemesi, mobbing vb.), askerlik, emeklilik veya kadın işçinin evlilik tarihinden itibaren 1 yıl içinde ayrılması durumlarında kıdem tazminatı hakkı doğar.'
        ]
      },
      {
        heading: 'Kıdem Tazminatı Hesaplama Formülü',
        paragraphs: [
          'Çalışılan her tam yıl için 30 günlük giydirilmiş brüt ücret ödenir. 1 yıldan artan aylar ve günler oranlanarak hesaba katılır.',
          'Kıdem tazminatından SGK primi ve Gelir Vergisi kesilmez; yalnızca binde 7,59 (%0,759) oranında Damga Vergisi kesintisi yapılır.'
        ],
        formula: 'Brüt Kıdem = Giydirilmiş Brüt Maaş × (Toplam Çalışma Günü / 365)\nNet Kıdem = Brüt Kıdem - (Brüt Kıdem × 0,00759)'
      },
      {
        heading: 'Örnek Hesaplama',
        paragraphs: [
          '3 yıl 6 ay (3,5 yıl) çalışan ve aylık giydirilmiş brüt maaşı 40.000 TL olan bir çalışanın hesabı:'
        ],
        example: {
          title: '3,5 Yıllık Kıdem Örneği (40.000 TL Brüt)',
          items: [
            { label: 'Giydirilmiş Brüt Maaş', value: '40.000,00 TL' },
            { label: 'Çalışma Süresi', value: '3 Yıl 6 Ay (3,5 Yıl)' },
            { label: 'Toplam Brüt Kıdem (40.000 × 3,5)', value: '140.000,00 TL' },
            { label: 'Damga Vergisi (%0,759)', value: '-1.062,60 TL' },
            { label: 'Ele Geçecek Net Kıdem', value: '138.937,40 TL' }
          ]
        },
        note: 'Giydirilmiş brüt ücret Hazine ve Maliye Bakanlığı tarafından açıklanan Kıdem Tazminatı Tavanını aşıyorsa hesaplamada tavan tutarı esas alınır.'
      }
    ]
  },
  {
    id: 'ihbar-sureleri-ve-ihbar-tazminati',
    slug: 'ihbar-sureleri-ve-ihbar-tazminati',
    title: 'İhbar Süresi ve İhbar Tazminatı Nedir?',
    description: '4857 sayılı İş Kanunu Madde 17 kapsamındaki yasal bildirim süreleri, kademeler ve ihbar tazminatı hesaplama kuralları.',
    category: 'İş & Çalışma',
    relatedToolSlug: 'ihbar-tazminati-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-24',
    keywords: ['ihbar tazminatı nedir', 'ihbar süresi hesaplama', 'ihbar haftaları', 'iş arama izni'],
    sections: [
      {
        heading: 'İhbar Süresi ve Kademeleri Nelerdir?',
        paragraphs: [
          '4857 Sayılı İş Kanunu m. 17 uyarınca belirsiz süreli iş sözleşmelerinin feshinden önce karşı tarafa yazılı bildirim yapılması zorunludur. Bildirim süreleri kıdeme göre şu şekildedir:',
          '• 6 aydan az kıdem: 2 Hafta (14 Gün)\n• 6 ay - 1,5 yıl arası kıdem: 4 Hafta (28 Gün)\n• 1,5 yıl - 3 yıl arası kıdem: 6 Hafta (42 Gün)\n• 3 yıldan fazla kıdem: 8 Hafta (56 Gün)'
        ]
      },
      {
        heading: 'İhbar Tazminatı Hesaplama ve Kesintiler',
        paragraphs: [
          'Bildirim süresine uymadan sözleşmeyi fesheden taraf (işçi veya işveren), karşı tarafa bu sürenin brüt ücreti tutarında ihbar tazminatı öder.',
          'İhbar tazminatından Gelir Vergisi (kümülatif dilime göre %15-%40) ve Damga Vergisi (%0,759) kesilir. SGK primi kesilmez.'
        ],
        formula: 'Günlük Brüt Ücret = Aylık Brüt Maaş / 30\nBrüt İhbar = Günlük Brüt Ücret × İhbar Günü Sayısı\nNet İhbar = Brüt İhbar - (Gelir Vergisi + Damga Vergisi)'
      },
      {
        heading: 'Günde 2 Saat İş Arama İzni',
        paragraphs: [
          'İhbar süresini çalışarak geçiren işçiye, iş saatleri içinde ve ücretinde hiçbir kesinti yapılmaksızın günde en az 2 saat yeni iş arama izni verilmesi zorunludur (4857 SK m. 27).'
        ]
      }
    ]
  },
  {
    id: 'yillik-izin-hakki-ve-sureleri',
    slug: 'yillik-izin-hakki-ve-sureleri',
    title: 'Yıllık İzin Hakkı ve Süreleri Nasıl Hesaplanır?',
    description: 'İş Kanunu uyarınca yıllık ücretli izin hak etme koşulları, kıdeme göre asgari izin günleri ve yaş koruma kuralları.',
    category: 'İş & Çalışma',
    relatedToolSlug: 'yillik-izin-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-24',
    keywords: ['yıllık izin hakkı', 'kaç gün yıllık izin', 'yıllık ücretli izin', 'izin süreleri'],
    sections: [
      {
        heading: 'Yıllık İzne Hak Kazanma Koşulları',
        paragraphs: [
          'İşçinin aynı işverene bağlı olarak işe başladığı günden itibaren, deneme süresi de dahil olmak üzere en az 1 tam yıl fiilen çalışmış olması şarttır (4857 SK m. 53).',
          '1 yıldan az çalışan işçiler yasal yıllık ücretli izne hak kazanamaz.'
        ]
      },
      {
        heading: 'Yasal Asgari İzin Süreleri',
        paragraphs: [
          'Kanunda belirlenen asgari yıllık izin süreleri şunlardır:\n• 1 yıldan 5 yıla kadar (5 yıl dahil): En az 14 Gün\n• 5 yıldan fazla 15 yıldan az: En az 20 Gün\n• 15 yıl (dahil) ve daha fazla: En az 26 Gün',
          'Önemli Kural: 18 ve daha küçük yaştaki işçiler ile 50 ve daha yukarı yaştaki işçilere verilecek yıllık ücretli izin süresi 20 günden az olamaz.'
        ]
      },
      {
        heading: 'Kullanılmayan İznin Ücrete Dönüşmesi',
        paragraphs: [
          'İş sözleşmesi devam ederken yıllık izinden feragat edilemez veya izin yerine ücret ödenemez. Ancak iş sözleşmesi sona erdiğinde (istifa veya çıkarılma), kullanılmayan tüm izin günlerinin ücreti son brüt maaş üzerinden nakden ödenir (4857 SK m. 59).'
        ]
      }
    ]
  },
  {
    id: 'brut-maas-ile-net-maas-farki',
    slug: 'brut-maas-ile-net-maas-farki',
    title: 'Brüt Maaş ile Net Maaş Arasındaki Fark Nedir?',
    description: 'Brüt ücretten net ele geçen tutara ulaşırken yapılan SGK, gelir vergisi, damga vergisi kesintileri ve asgari ücret istisnası mantığı.',
    category: 'İş & Çalışma',
    relatedToolSlug: 'brutten-nete-maas-hesaplama',
    readTime: '4 dk okuma',
    publishedAt: '2026-08-24',
    keywords: ['brüt net maaş farkı', 'brütten nete kesintiler', 'gelir vergisi dilimleri', 'asgari ücret istisnası'],
    sections: [
      {
        heading: 'Brüt Maaş ve Net Maaş Tanımları',
        paragraphs: [
          'Brüt Maaş: İş sözleşmesinde yazılı olan ve henüz hiçbir yasal kesinti (SGK, işsizlik, gelir vergisi, damga vergisi) yapılmamış toplam ücrettir.',
          'Net Maaş: Tüm yasal kesintiler yapıldıktan sonra çalışanın banka hesabına fiilen yatan tutardır.'
        ]
      },
      {
        heading: 'Bordrodaki Kesinti Kalemleri',
        paragraphs: [
          '1. SGK İşçi Payı: Brüt maaşın %14\'ü\n2. İşsizlik Sigortası İşçi Payı: Brüt maaşın %1\'i\n3. Gelir Vergisi: (Brüt - SGK Kesintileri) matrahına uygulanan %15, %20, %27 veya %35 dilim oranı\n4. Damga Vergisi: Brüt ücret üzerinden binde 7,59 (%0,759)'
        ]
      },
      {
        heading: 'Asgari Ücret Vergi İstisnası',
        paragraphs: [
          '7349 sayılı Kanun ile tüm çalışanların maaşlarının asgari ücrete kadar olan kısmı Gelir Vergisi ve Damga Vergisinden muaf tutulmuştur. Bu istisna bordroda hesaplanan vergiden doğrudan düşülerek çalışanın net maaşını artırır.'
        ]
      }
    ]
  },
  {
    id: 'fazla-mesai-ucreti-ve-calisma-saatleri',
    slug: 'fazla-mesai-ucreti-ve-calisma-saatleri',
    title: 'Fazla Mesai Ücreti ve Yasal Çalışma Saatleri',
    description: '4857 sayılı İş Kanunu Madde 41 uyarınca haftalık 45 saat çalışma sınırı, saatlik ücret hesabı ve %50 / %100 zamlı mesai oranları.',
    category: 'İş & Çalışma',
    relatedToolSlug: 'fazla-mesai-hesaplama',
    readTime: '3 dk okuma',
    publishedAt: '2026-08-24',
    keywords: ['fazla mesai ücreti', 'fazla çalışma nasıl hesaplanır', 'saatlik ücret', 'resmi tatil mesaisi'],
    sections: [
      {
        heading: 'Yasal Haftalık Çalışma Süresi',
        paragraphs: [
          '4857 Sayılı İş Kanunu m. 63 uyarınca genel bakımdan haftalık çalışma süresi en çok 45 saattir. Haftalık 45 saati aşan her çalışma "Fazla Çalışma" (Fazla Mesai) olarak kabul edilir.'
        ]
      },
      {
        heading: 'Saatlik Ücret ve Zam Katsayıları',
        paragraphs: [
          'Aylık yasal çalışma saati 225 saattir (45 saat / 6 gün × 30 gün = 225 saat). Çıplak saatlik ücret `Aylık Brüt Maaş / 225` formülü ile bulunur.',
          '• Normal Fazla Mesai: Saatlik ücretin %50 fazlası (%150 / 1.5 katsayı) olarak ödenir.\n• Ulusal Bayram ve Genel Tatil Çalışması: Çalışılan her gün için 1 tam günlük ek yevmiye (%100 zamlı) ödenir.'
        ],
        formula: 'Saatlik Ücret = Aylık Brüt Maaş / 225\nNormal Mesai Ücreti = Saatlik Ücret × 1,5 × Fazla Mesai Saati\nTatil Mesai Ücreti = Saatlik Ücret × 2,0 × Fazla Mesai Saati'
      },
      {
        heading: 'Yıllık 270 Saat Fazla Mesai Sınırı',
        paragraphs: [
          'Kanun gereğince işçiye bir yılda yaptırılabilecek toplam fazla mesai süresi 270 saati aşamaz. Fazla mesai için işçinin onayının alınması esastır.'
        ]
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
