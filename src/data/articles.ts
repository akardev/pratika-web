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
