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
          'Gerçek birim maliyetinizi kesin olarak belirledikten sonra, satmayı planladığınız fiyat üzerinden net kazancınızı görmek için Pratika Kâr / Zarar Hesaplama veya hedeflediğiniz kâr marjını tutturmak için Kar Marjı Hesaplama araçlarını kullanabilirsiniz.'
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
