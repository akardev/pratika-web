'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './qr-landing.module.css';

const steps = [
  {
    num: '01',
    title: 'Menünüzü Kolayca Oluşturun',
    desc: 'İşletme adınızı girin, logonuzu yükleyin; kategorilerinizi, ürünlerinizi, fiyatlarınızı ve görsellerinizi ekleyin.',
    tag: 'Teknik Bilgi Gerekmez',
  },
  {
    num: '02',
    title: 'QR Kodunuz Otomatik Oluşsun',
    desc: 'Pratika, işletmenize özel benzersiz bir bağlantı (qr.pratika.com/isletmeniz) ve yüksek çözünürlüklü QR kod üretir.',
    tag: 'Domain Satın Almak Yok',
  },
  {
    num: '03',
    title: 'İndirin ve Masalarınıza Yerleştirin',
    desc: 'Vektörel QR kodunuzu (PNG, SVG veya PDF) tek tıkla indirin. İster kendi yazıcınızda basın, ister matbaanıza iletin.',
    tag: 'Tüm Formatlarda Hazır',
  },
  {
    num: '04',
    title: 'Panelden Anında Güncelleyin',
    desc: 'Fiyat değiştiğinde veya yeni ürün geldiğinde panelden düzenleyin. Masadaki QR kodunuzu ASLA değiştirmek gerekmez.',
    tag: 'Yeniden Baskı İhtiyacı Yok',
  },
];

const faqList = [
  {
    q: 'QR Menü kullanmak için kendi domainimi (alan adı) satın almam gerekir mi?',
    a: 'Hayır, kesinlikle gerekmez. Pratika sizin için işletmenize özel "qr.pratika.com/isletmeniz" bağlantısını otomatik olarak oluşturur. Domain satın alma, DNS yönlendirme veya hosting maliyetleriyle uğraşmazsınız.',
  },
  {
    q: 'Menüde fiyat veya ürün değişince masadaki QR kodu yeniden bastırmam gerekir mi?',
    a: 'Hayır. Pratika QR’ın en büyük avantajı budur: QR kodunuz menü verisini değil, işletmenize özel sabit web bağlantısını taşır. Panelden Türk Kahvesini 90 TL’den 110 TL’ye güncellediğinizde masadaki QR kod aynı kalır, müşteri okuttuğunda anında yeni fiyatı görür.',
  },
  {
    q: 'QR kodunu kim oluşturuyor ve nereden indirebilirim?',
    a: 'QR kodunuzu Pratika sistemi saniyeler içinde otomatik olarak üretir. Yönetim panelinizden PNG, SVG veya PDF formatlarında yüksek çözünürlüklü olarak dilediğiniz zaman indirebilirsiniz.',
  },
  {
    q: 'QR kodları masalara kim yerleştiriyor?',
    a: 'Pratika QR kodunuzu dijital olarak (PNG, SVG, PDF) yüksek kalitede üretir. İşletme olarak panelden indirip kendi ofis yazıcınızda basabilir, matbaada pleksi/ahşap stantlara veya stickerlara bastırıp masalarınıza yerleştirebilirsiniz. Fiziksel montaj ve masaya yerleştirme standart SaaS hizmetimizin bir parçası değildir; ancak talep eden işletmelere yönlendirme ve kurulum desteği sağlanmaktadır.',
  },
  {
    q: 'Menümüzü kendimiz girmek istemezsek Pratika ekleyebilir mi?',
    a: 'Evet! "Menünüzü Biz Ekleyelim" desteğimiz kapsamında mevcut menünüzün PDF, Excel veya fotoğrafını bize iletmeniz yeterlidir. Profesyonel ve İşletme paketlerimizde ekibimiz ilk menü aktarımınızı sizin için tamamlar.',
  },
  {
    q: 'Kaç dil destekleniyor?',
    a: 'Başlangıç paketinde 2 dil (Türkçe ve İngilizce), Profesyonel pakette 4 dil (Türkçe, İngilizce, Almanca ve Rusça) standart olarak sunulur.',
  },
  {
    q: '4 dilden fazla dil ekleyebilir miyim?',
    a: 'Evet. Standart olarak Türkçe, İngilizce, Almanca ve Rusça desteklenir. İhtiyacınız olan ek diller (+99 TL/ay/dil) talebiniz doğrultusunda hesabınıza eklenebilir.',
  },
  {
    q: 'QR menümü cep telefonumdan veya tabletimden yönetebilir miyim?',
    a: 'Evet. Pratika yönetim paneli tamamen mobil uyumludur. Bilgisayara ihtiyaç duymadan, cep telefonunuzdan hızlıca ürün açıp kapatabilir, fiyat veya görsel güncelleyebilirsiniz.',
  },
  {
    q: 'İleride kendi özel web adresimi (örneğin menu.kafem.com) kullanabilir miyim?',
    a: 'Evet. Standart kullanımda hiçbir domain gerekmez; ancak kurumsal ve çok şubeli işletmeler için özel alan adı (Custom Domain) mimarimiz hazırdır ve İşletme paketi kapsamında planlanan bir opsiyon olarak sunulmaktadır.',
  },
  {
    q: '15 günlük ücretsiz deneme süresi nasıl çalışıyor?',
    a: 'Hesabınızı oluşturup menünüzü girdikten sonra 15 gün boyunca tüm özellikleri ücretsiz deneyebilirsiniz. Deneme süreniz menü kurulumunuzu tamamladıktan sonra başlar.',
  },
  {
    q: 'Aboneliği iptal edersem veya durdurursam QR kodum ne olur?',
    a: 'Aboneliğinizi dilediğiniz zaman durdurabilir veya iptal edebilirsiniz. İptal durumunda menü erişimi pasife alınır; ancak menü verileriniz ve işletme adresiniz (qr.pratika.com/isletmeniz) korunur, tekrar aktif ettiğinizde aynı masadaki QR kodunuz çalışmaya devam eder.',
  },
  {
    q: 'QR menü için müşterilerin uygulama indirmesi gerekir mi?',
    a: 'Hayır. Müşterileriniz hiçbir mobil uygulama indirmeden, telefonlarının normal kamera uygulamasıyla QR kodu okutarak menünüze saniyeler içinde doğrudan tarayıcıdan erişir.',
  },
];

export default function QrLandingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [samplePrice, setSamplePrice] = useState(90);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePriceSimulate = () => {
    setSamplePrice((prev) => (prev === 90 ? 110 : prev === 110 ? 125 : 90));
  };

  return (
    <div className={styles.page}>
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badgeGroup}>
              <span className={styles.productBadge}>
                <Image src="/brand/pratika-qr-icon.svg" alt="" width={16} height={16} />
                Pratika QR Çözümü
              </span>
              <span className={styles.trialPill}>15 Gün Ücretsiz Deneme</span>
            </div>

            <h1 className={styles.heroTitle}>
              Menünüzü bir kez oluşturun.
              <br />
              <span className={styles.highlightText}>Güncellemesi saniyeler sürsün.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Ürünlerinizi, fiyatlarınızı, görsellerinizi ve dillerinizi tek panelden kolayca yönetin.
              <strong> Fiyat değiştiğinde QR kodunuzu yeniden bastırmak zorunda kalmayın.</strong>
            </p>

            <div className={styles.heroActionRow}>
              <Link
                href="/demo/qr-menu"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroPrimaryBtn}
              >
                Canlı Demoyu İncele
                <span className={styles.btnIcon}>↗</span>
              </Link>
              <Link href="/login?redirect=/panel" className={styles.heroSecondaryBtn}>
                15 Gün Ücretsiz Başla
              </Link>
            </div>

            <div className={styles.heroTrustList}>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>Domain Satın Almak Gerekmez</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>QR Kod Asla Değişmez</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.checkIcon}>✓</span>
                <span>4 Dil ve Mobil Uyum</span>
              </div>
            </div>
          </div>

          {/* HERO VISUAL MOCKUP */}
          <div className={styles.heroVisualWrap}>
            <div className={styles.heroBackGlow} aria-hidden="true" />

            {/* Mobile Phone Mockup */}
            <div className={styles.phoneMockup}>
              <div className={styles.phoneSpeaker} aria-hidden="true" />
              <div className={styles.phoneScreen}>
                <div className={styles.mockupHeader}>
                  <span>09:41</span>
                  <span className={styles.mockupSignals}>● 5G ▰</span>
                </div>
                <div className={styles.restaurantBadge}>
                  <span className={styles.restaurantLetter}>L</span>
                  <div>
                    <strong>LUNA COFFEE &amp; KITCHEN</strong>
                    <small>qr.pratika.com/luna-coffee</small>
                  </div>
                </div>

                <div className={styles.mockupCategories}>
                  <span className={styles.activePill}>Kahveler</span>
                  <span>Kahvaltı</span>
                  <span>Tatlılar</span>
                </div>

                <div className={styles.mockupCard}>
                  <div className={styles.mockupItemInfo}>
                    <span className={styles.mockupItemTag}>GÜNCEL FİYAT</span>
                    <h4>Türk Kahvesi</h4>
                    <p>Geleneksel usulle közde pişirilir, lokum eşliğinde servis edilir.</p>
                    <div className={styles.mockupPriceRow}>
                      <span className={styles.mockupPrice}>₺{samplePrice}</span>
                      <span className={styles.instantBadge}>● Anında Canlı</span>
                    </div>
                  </div>
                </div>

                <div className={styles.mockupSimulateBox}>
                  <button
                    type="button"
                    onClick={handlePriceSimulate}
                    className={styles.simulateBtn}
                    title="Fiyatı değiştirmek için tıklayın"
                  >
                    <span>Fiyatı Değiştir (Test): ₺{samplePrice === 90 ? 110 : samplePrice === 110 ? 125 : 90}</span>
                    <i>↻</i>
                  </button>
                  <small>Fiyat değişse bile masadaki QR kodunuz %100 aynı kalır.</small>
                </div>
              </div>
            </div>

            {/* Accompanying QR Card Graphic */}
            <div className={styles.floatingQrCard}>
              <div className={styles.floatingQrHeader}>
                <span className={styles.qrDot} />
                <span>Masadaki Sabit QR</span>
              </div>
              <div className={styles.floatingQrBody}>
                <div className={styles.qrBox}>
                  {/* Visual QR presentation */}
                  <svg viewBox="0 0 100 100" className={styles.qrSvg} aria-hidden="true">
                    <rect width="100" height="100" fill="#ffffff" rx="8" />
                    {/* Corner 1 */}
                    <rect x="10" y="10" width="28" height="28" fill="#0a1d37" rx="4" />
                    <rect x="16" y="16" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="20" y="20" width="8" height="8" fill="#0a1d37" />
                    {/* Corner 2 */}
                    <rect x="62" y="10" width="28" height="28" fill="#0a1d37" rx="4" />
                    <rect x="68" y="16" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="72" y="20" width="8" height="8" fill="#0a1d37" />
                    {/* Corner 3 */}
                    <rect x="10" y="62" width="28" height="28" fill="#0a1d37" rx="4" />
                    <rect x="16" y="68" width="16" height="16" fill="#ffffff" rx="2" />
                    <rect x="20" y="72" width="8" height="8" fill="#0a1d37" />
                    {/* Pattern elements */}
                    <rect x="46" y="12" width="8" height="8" fill="#0a1d37" />
                    <rect x="46" y="26" width="8" height="16" fill="#d97750" />
                    <rect x="12" y="46" width="14" height="8" fill="#0a1d37" />
                    <rect x="32" y="46" width="16" height="16" fill="#0a1d37" />
                    <rect x="54" y="46" width="10" height="8" fill="#0a1d37" />
                    <rect x="70" y="46" width="18" height="10" fill="#d97750" />
                    <rect x="46" y="70" width="10" height="18" fill="#0a1d37" />
                    <rect x="64" y="66" width="12" height="12" fill="#0a1d37" />
                    <rect x="80" y="80" width="10" height="10" fill="#0a1d37" />
                  </svg>
                </div>
                <div className={styles.qrCardMeta}>
                  <strong>qr.pratika.com/luna-coffee</strong>
                  <p>Yeniden basıma gerek yok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PILLARS & CORE ADVANTAGE */}
      <section className={styles.advantageBand}>
        <div className={styles.container}>
          <div className={styles.advantageGrid}>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>⚡</div>
              <h3>Anında Fiyat Güncellemesi</h3>
              <p>Maliyetler veya menü değiştiğinde fiyatı panelden güncelleyin, müşteriniz anında görsün.</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>🛡️</div>
              <h3>QR Değişmediği İçin Yeniden Baskı Yok</h3>
              <p>Fiyat veya ürün değiştiğinde masadaki QR kodunuz aynı kalır; masalara tekrar yeni QR bastırma masrafı yapmazsınız.</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>🌐</div>
              <h3>Domain &amp; DNS Derdi Yok</h3>
              <p>Alan adı almanıza gerek yok. Pratika güvenli, hızlı ve size özel bağlantıyı anında hazırlar.</p>
            </div>
            <div className={styles.advantageCard}>
              <div className={styles.advantageIcon}>🌍</div>
              <h3>4 Dilde Turist Dostu</h3>
              <p>Türkçe, İngilizce, Almanca ve Rusça ile yabancı misafirlerinize kusursuz sipariş deneyimi sunun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4 STEPS) */}
      <section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>KOLAY KURULUM</span>
            <h2 className={styles.sectionTitle}>4 Basit Adımda Dijital Menünüz Yayında</h2>
            <p className={styles.sectionLead}>
              Teknik bilgi, kodlama veya karmaşık ayarlar gerektirmez. Dakikalar içinde menünüzü hazırlayın.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((item) => (
              <div key={item.num} className={styles.stepCard}>
                <div className={styles.stepNumRow}>
                  <span className={styles.stepNum}>{item.num}</span>
                  <span className={styles.stepTag}>{item.tag}</span>
                </div>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.stepDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DOMAIN & SUBDOMAIN ARCHITECTURE EXPLANATION */}
      <section className={styles.domainSection}>
        <div className={styles.container}>
          <div className={styles.domainGrid}>
            <div className={styles.domainContent}>
              <span className={styles.sectionEyebrow}>AKILLI BAĞLANTI MİMARİSİ</span>
              <h2>Domain Satın Almanıza Gerek Yok</h2>
              <p>
                Pratika QR, işletmeniz için benzersiz ve kolay okunabilir bir bağlantı üretir.
                DNS ayarları, hosting ücretleri veya yenileme takibiyle uğraşmazsınız.
              </p>

              <div className={styles.urlDisplayBox}>
                <span className={styles.urlLabel}>İşletmenizin Sabit QR Bağlantısı:</span>
                <div className={styles.urlBar}>
                  <span className={styles.urlProtocol}>https://</span>
                  <span className={styles.urlDomain}>qr.pratika.com/</span>
                  <strong className={styles.urlSlug}>luna-coffee</strong>
                </div>
              </div>

              <div className={styles.domainFeatures}>
                <div className={styles.domainFeatureItem}>
                  <strong>✓ Tek Merkezden Güvenli Altyapı</strong>
                  <span>Hızlı açılan bulut sunucularda kesintisiz erişim.</span>
                </div>
                <div className={styles.domainFeatureItem}>
                  <strong>✓ Sabit Hedef URL</strong>
                  <span>Menü içeriğiniz değişse bile bu adres hiç değişmez.</span>
                </div>
                <div className={styles.domainFeatureItem}>
                  <strong>✓ Gelecekte Custom Domain İmkanı</strong>
                  <span>İleride dilerseniz kurumsal paketle menu.isletmeniz.com gibi kendi domaininizi bağlayabilirsiniz.</span>
                </div>
              </div>
            </div>

            <div className={styles.domainVisual}>
              <div className={styles.domainArchitectureCard}>
                <div className={styles.archBadge}>DOĞRU &amp; GÜVENLİ MİMARİ</div>
                <div className={styles.archFlow}>
                  <div className={styles.archNode}>
                    <span className={styles.archIcon}>📱</span>
                    <strong>Masaüstü QR Kod</strong>
                    <small>Fiziksel Baskı</small>
                  </div>
                  <div className={styles.archArrow}>→</div>
                  <div className={styles.archNodePrimary}>
                    <span className={styles.archIcon}>⚡</span>
                    <strong>qr.pratika.com/slug</strong>
                    <small>Sabit Yönlendirme</small>
                  </div>
                  <div className={styles.archArrow}>→</div>
                  <div className={styles.archNode}>
                    <span className={styles.archIcon}>🍽️</span>
                    <strong>Güncel Dijital Menü</strong>
                    <small>Anında Canlı Veri</small>
                  </div>
                </div>
                <div className={styles.archNote}>
                  QR kodu ham menü verisi içermez; web adresini hedefler. Böylece içeriği değiştirdiğinizde masadaki QR asla eskimiz.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SINGLE PANEL MANAGEMENT & MOBILE COMPATIBILITY */}
      <section className={styles.panelSection}>
        <div className={styles.container}>
          <div className={styles.panelBox}>
            <div className={styles.panelText}>
              <span className={styles.sectionEyebrow}>KULLANIM KOLAYLIĞI</span>
              <h2>Tek Panelden, İster Telefondan İster Bilgisayardan Yönetin</h2>
              <p>
                İşletmenizin mutfağında, kasasında veya dışarıdayken menünüz tam kontrolünüz altında.
                Masaüstü veya mobil cihazınızdan tek panel üzerinden menünüzün tüm bileşenlerini kolayca yönetin:
              </p>

              <div className={styles.panelActionList}>
                <div className={styles.panelActionItem}>
                  <span className={styles.actionBullet}>•</span>
                  <div>
                    <strong>Ürün Ekleme, Silme ve Fiyat Değişimi:</strong> Tükendiğinde tek tıkla gizleyin, maliyet değiştiğinde fiyatı anında revize edin.
                  </div>
                </div>
                <div className={styles.panelActionItem}>
                  <span className={styles.actionBullet}>•</span>
                  <div>
                    <strong>Görsel &amp; Alerjen Bilgileri:</strong> İştah açan fotoğraflar ve güven veren içerik/alerjen detayları ekleyin.
                  </div>
                </div>
                <div className={styles.panelActionItem}>
                  <span className={styles.actionBullet}>•</span>
                  <div>
                    <strong>Kategori &amp; Sıralama Düzeni:</strong> Menünüzün akışını dilediğiniz gibi düzenleyin ve popüler ürünleri öne çıkarın.
                  </div>
                </div>
                <div className={styles.panelActionItem}>
                  <span className={styles.actionBullet}>•</span>
                  <div>
                    <strong>Çok Dilli İçerik Yönetimi:</strong> Türkçe, İngilizce, Almanca ve Rusça çevirileri aynı ekrandan güncelleyin.
                  </div>
                </div>
              </div>

              <div className={styles.panelHighlightNote}>
                ⚡ <strong>Önemli:</strong> Panelden yaptığınız tüm güncellemeler anında menüye yansır; masadaki QR kodunuzu yeniden bastırmanız gerekmez.
              </div>

              <div className={styles.panelCtaRow}>
                <Link href="/demo/qr-menu" target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                  Örnek Menüyü İnceleyin <span>↗</span>
                </Link>
              </div>
            </div>

            <div className={styles.panelDashboardMockup}>
              <div className={styles.mockDashboardHeader}>
                <div className={styles.mockDots}><span /><span /><span /></div>
                <span>Pratika QR Yönetim Paneli</span>
              </div>
              <div className={styles.mockDashboardContent}>
                <div className={styles.mockSidebar}>
                  <div className={styles.mockActiveNavItem}>Menü Yönetimi</div>
                  <div className={styles.mockNavItem}>Kategoriler</div>
                  <div className={styles.mockNavItem}>Görseller</div>
                  <div className={styles.mockNavItem}>QR &amp; İndir</div>
                  <div className={styles.mockNavItem}>Diller (4)</div>
                </div>
                <div className={styles.mockMainView}>
                  <div className={styles.mockRowItem}>
                    <div>
                      <strong>Flat White</strong>
                      <small>Kahveler · ₺145 · Aktif</small>
                    </div>
                    <span className={styles.mockEditBadge}>Düzenle</span>
                  </div>
                  <div className={styles.mockRowItem}>
                    <div>
                      <strong>San Sebastian Cheesecake</strong>
                      <small>Tatlılar · ₺220 · Aktif</small>
                    </div>
                    <span className={styles.mockEditBadge}>Düzenle</span>
                  </div>
                  <div className={styles.mockRowItem}>
                    <div>
                      <strong>Avocado Toast</strong>
                      <small>Kahvaltı · ₺280 · Aktif</small>
                    </div>
                    <span className={styles.mockEditBadge}>Düzenle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "MENÜNÜZÜ BİZ EKLEYELİM" SERVICE BANNER */}
      <section className={styles.serviceSection}>
        <div className={styles.container}>
          <div className={styles.serviceCard}>
            <div className={styles.serviceText}>
              <span className={styles.serviceBadge}>İSTEĞE BAĞLI KURULUM HİZMETİ</span>
              <h2>Menünüzü Kendiniz Ekleyin veya Bize Bırakın</h2>
              <p>
                Menünüzü panelden kendiniz kolayca girebilirsiniz. Menü girmekle vakit kaybetmek istemiyorsanız,
                mevcut menünüzün PDF, Excel veya fotoğrafını bize iletin; ilk kurulumda menünüzü Pratika QR&apos;a
                aktarmanıza yardımcı olalım.
              </p>
              <div className={styles.serviceHighlights}>
                <span>📄 PDF / Liste İletimi</span>
                <span>📸 Menü Fotoğrafından Destek</span>
                <span>🤝 Birebir İlk Kurulum Yardımı</span>
              </div>
            </div>
            <div className={styles.serviceAction}>
              <Link href="/iletisim?konu=qr-menu-kurulum" className={styles.serviceBtn}>
                Kurulum Desteği Talep Et <span>→</span>
              </Link>
              <small>Profesyonel ve İşletme paketlerimizde ilk menü kurulum desteği dahildir.</small>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QR CODE PRINTING & MATERIAL GUIDE */}
      <section className={styles.printGuideSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>BASKI &amp; KULLANIM</span>
            <h2 className={styles.sectionTitle}>QR Kodunuzu Nasıl Bastıracaksınız?</h2>
            <p className={styles.sectionLead}>
              Pratika size baskıya hazır, kristal netliğinde vektörel QR kod dosyaları teslim eder.
            </p>
          </div>

          <div className={styles.printGrid}>
            <div className={styles.printCard}>
              <span className={styles.printIcon}>📥</span>
              <h3>1. Paneli Açıp İndirin</h3>
              <p>Yüksek çözünürlüklü PNG, SVG veya PDF formatında tek tıkla indirin.</p>
            </div>
            <div className={styles.printCard}>
              <span className={styles.printIcon}>🖨️</span>
              <h3>2. İstediğiniz Şekilde Basın</h3>
              <p>Kendi yazıcınızda basabilir, matbaanıza veya reklamcınıza iletebilirsiniz.</p>
            </div>
            <div className={styles.printCard}>
              <span className={styles.printIcon}>🪧</span>
              <h3>3. Masalarınıza Yerleştirin</h3>
              <p>Masa kartları, pleksi stantlar, ahşap bloklar veya sticker olarak masalara koyun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRICING SECTION */}
      <section className={styles.pricingSection} id="fiyatlandirma">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>ŞEFFAF FİYATLANDIRMA</span>
            <h2 className={styles.sectionTitle}>İşletmeniz İçin En Uygun Planı Seçin</h2>
            <p className={styles.sectionLead}>
              Gizli ücret yok. 15 gün ücretsiz deneyin, kurulumunuzu tamamlayıp hemen kullanmaya başlayın.
            </p>

            {/* Monthly / Annual Toggle */}
            <div className={styles.billingToggleWrap}>
              <span className={!isAnnual ? styles.activeToggleLabel : styles.toggleLabel}>Aylık</span>
              <button
                type="button"
                className={styles.toggleTrack}
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Aylık ve Yıllık fiyatlandırma arasında geçiş yap"
              >
                <span className={`${styles.toggleThumb} ${isAnnual ? styles.toggleThumbActive : ''}`} />
              </button>
              <span className={isAnnual ? styles.activeToggleLabel : styles.toggleLabel}>
                Yıllık
                <span className={styles.discountBadge}>2 Ay Avantajlı</span>
              </span>
            </div>
          </div>

          <div className={styles.pricingGrid}>
            {/* BAŞLANGIÇ */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingCardHeader}>
                <h3 className={styles.planName}>Başlangıç</h3>
                <p className={styles.planDesc}>Tek şubeli küçük kafe ve butik işletmeler için ideal başlangıç.</p>
                <div className={styles.priceRow}>
                  <span className={styles.currency}>₺</span>
                  <strong className={styles.priceAmount}>{isAnnual ? '2.990' : '299'}</strong>
                  <span className={styles.pricePeriod}>{isAnnual ? '/ yıl' : '/ ay'}</span>
                </div>
                {isAnnual && <span className={styles.annualSubtext}>(Aylık ~249 TL&apos;ye denk gelir)</span>}
              </div>

              <ul className={styles.planFeatures}>
                <li><span>✓</span> 1 İşletme / Şube</li>
                <li><span>✓</span> 100 Ürüne Kadar</li>
                <li><span>✓</span> 10 Kategoriye Kadar</li>
                <li><span>✓</span> 2 Dil Desteği (TR + EN)</li>
                <li><span>✓</span> Mobil Uyumlu QR Menü</li>
                <li><span>✓</span> Otomatik QR Kod Oluşturma &amp; İndirme</li>
                <li><span>✓</span> Anında Menü Güncelleme (QR değişmez)</li>
                <li><span>✓</span> Ürün Görselleri &amp; Alerjen Bilgileri</li>
                <li><span>✓</span> Standart Tasarım Seçenekleri</li>
                <li><span>✓</span> Pratika Destek Merkezi</li>
              </ul>

              <div className={styles.planCtaWrap}>
                <Link href="/login?redirect=/panel" className={styles.planOutlineBtn}>
                  15 Gün Ücretsiz Başla
                </Link>
              </div>
            </div>

            {/* PROFESYONEL (EN POPÜLER) */}
            <div className={`${styles.pricingCard} ${styles.popularCard}`}>
              <div className={styles.popularRibbon}>EN POPÜLER</div>
              <div className={styles.pricingCardHeader}>
                <h3 className={styles.planName}>Profesyonel</h3>
                <p className={styles.planDesc}>Zengin menülü restoranlar, popüler kafeler ve turistik mekanlar.</p>
                <div className={styles.priceRow}>
                  <span className={styles.currency}>₺</span>
                  <strong className={styles.priceAmount}>{isAnnual ? '5.990' : '599'}</strong>
                  <span className={styles.pricePeriod}>{isAnnual ? '/ yıl' : '/ ay'}</span>
                </div>
                {isAnnual && <span className={styles.annualSubtext}>(Aylık ~499 TL&apos;ye denk gelir)</span>}
              </div>

              <ul className={styles.planFeatures}>
                <li><span>✓</span> 1 İşletme / Şube</li>
                <li><strong className={styles.featureAccent}>✓ Sınırsız Ürün &amp; Sınırsız Kategori</strong></li>
                <li><strong className={styles.featureAccent}>✓ 4 Dil Desteği (TR, EN, DE, RU)</strong></li>
                <li><strong className={styles.featureAccent}>✓ Özel Logo &amp; Marka Renkleri</strong></li>
                <li><span>✓</span> Premium Menü Temaları &amp; Tipografi</li>
                <li><span>✓</span> Gelişmiş Ürün Detayları &amp; Kalori / Alerjen</li>
                <li><span>✓</span> Öne Çıkan Ürünler &amp; Rozetler</li>
                <li><strong className={styles.featureAccent}>✓ Yüksek Çözünürlüklü Vektörel QR (PNG, SVG, PDF)</strong></li>
                <li><strong className={styles.featureAccent}>✓ İlk Menü Kurulum Desteği (Biz Ekleyelim)</strong></li>
                <li><span>✓</span> Öncelikli E-posta &amp; WhatsApp Desteği</li>
              </ul>

              <div className={styles.planCtaWrap}>
                <Link href="/login?redirect=/panel" className={styles.planPrimaryBtn}>
                  Profesyonel ile Başla <span>→</span>
                </Link>
              </div>
            </div>

            {/* İŞLETME / ÇOKLU ŞUBE */}
            <div className={styles.pricingCard}>
              <div className={styles.pricingCardHeader}>
                <h3 className={styles.planName}>İşletme &amp; Zincir</h3>
                <p className={styles.planDesc}>Çok şubeli işletmeler, zincir restoranlar ve özel entegrasyonlar.</p>
                <div className={styles.priceRow}>
                  <strong className={styles.customPriceText}>Özel Fiyat</strong>
                </div>
                <span className={styles.annualSubtext}>Şube sayınıza ve ihtiyaçlarınıza göre</span>
              </div>

              <ul className={styles.planFeatures}>
                <li><span>✓</span> Çoklu Şube Yönetimi</li>
                <li><span>✓</span> Merkezi Menü &amp; Şube Bazlı Fiyatlandırma</li>
                <li><span>✓</span> Sınırsız Ürün, Kategori ve Görsel</li>
                <li><span>✓</span> 4+ Dil Seçenekleri &amp; Özel Çeviriler</li>
                <li><span>✓</span> İleride Özel Alan Adı (Custom Domain: menu.sirketiniz.com)</li>
                <li><span>✓</span> Özel Menü Aktarımı &amp; Veri Girişi Desteği</li>
                <li><span>✓</span> Öncelikli VIP Müşteri Yöneticisi</li>
              </ul>

              <div className={styles.planCtaWrap}>
                <Link href="/iletisim?konu=qr-menu-kurumsal" className={styles.planOutlineBtn}>
                  Teklif &amp; Bilgi Alın
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.pricingExtraNote}>
            <div className={styles.extraNoteItem}>
              <span>🌐</span>
              <span><strong>Ek Dil Desteği:</strong> Standart 4 dilin ötesindeki ek diller talebinize göre <strong>+99 TL / ay / dil</strong> olarak hesabınıza tanımlanabilmektedir.</span>
            </div>
            <div className={styles.extraNoteItem}>
              <span>⏱️</span>
              <span><strong>15 Gün Deneme:</strong> Deneme süreniz menü kurulumunuzu tamamladıktan sonra aktif hale gelir.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>MERAK EDİLENLER</span>
            <h2 className={styles.sectionTitle}>Sıkça Sorulan Sorular</h2>
            <p className={styles.sectionLead}>
              Pratika QR Menü hakkında aklınıza takılan tüm soruların net yanıtları.
            </p>
          </div>

          <div className={styles.faqList}>
            {faqList.map((item, idx) => (
              <div
                key={item.q}
                className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemActive : ''}`}
              >
                <button
                  type="button"
                  className={styles.faqQuestionBtn}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={openFaq === idx}
                >
                  <span>{item.q}</span>
                  <span className={styles.faqArrow}>{openFaq === idx ? '−' : '+'}</span>
                </button>
                {openFaq === idx && (
                  <div className={styles.faqAnswer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CALL TO ACTION */}
      <section className={styles.finalCtaSection}>
        <div className={styles.container}>
          <div className={styles.finalCtaBox}>
            <span className={styles.finalBadge}>PRATİKA DİJİTAL İŞLETME ÇÖZÜMLERİ</span>
            <h2>Menünüzü Bugün Dijitale Taşıyın</h2>
            <p>
              Müşterilerinize modern ve hızlı bir menü deneyimi sunun. Yeniden baskı masraflarını geride bırakın.
            </p>
            <div className={styles.finalBtnRow}>
              <Link href="/demo/qr-menu" target="_blank" rel="noopener noreferrer" className={styles.heroPrimaryBtn}>
                Canlı Demoyu Gör <span>↗</span>
              </Link>
              <Link href="/login?redirect=/panel" className={styles.heroSecondaryBtn}>
                15 Gün Ücretsiz Dene
              </Link>
              <Link href="/iletisim?konu=qr-menu" className={styles.textLinkBtn}>
                Bize Ulaşın →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
