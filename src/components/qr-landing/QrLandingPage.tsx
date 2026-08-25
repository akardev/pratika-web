'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './qr-landing.module.css';

const steps = [
  {
    num: '01',
    title: 'Menünüzü Oluşturun',
    desc: 'Ürünlerinizi, kategorilerinizi, fiyatlarınızı ve görsellerinizi kullanıcı dostu panelinizden kolayca ekleyin.',
    tag: 'Teknik Bilgi Gerekmez',
  },
  {
    num: '02',
    title: 'QR Kodunuzu Masanıza Koyun',
    desc: 'İşletmenize özel yüksek çözünürlüklü QR kodunuzu tek tıkla indirin ve masalarınıza yerleştirin.',
    tag: 'Sabit Bağlantı',
  },
  {
    num: '03',
    title: 'Anında Güncelleyin',
    desc: 'Fiyat veya ürün değiştiğinde panelden düzenleyin. Masalardaki QR kodu değiştirmeden menünüz anında güncellenir.',
    tag: 'Yeniden Baskı Yok',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'Sabit QR Kod Bağlantısı',
    desc: 'QR kodunuz değişmez. Fiyat, ürün veya tema güncellediğinizde masalardaki baskıyı yenilemeniz gerekmez.',
  },
  {
    icon: '💰',
    title: 'Anında Fiyat ve Ürün Güncelleme',
    desc: 'Panelden yapılan tüm değişiklikler müşterinin ekranına milisaniyeler içinde yansır.',
  },
  {
    icon: '🎨',
    title: '5 Profesyonel Menü Teması',
    desc: 'Fine dining, kafe, bistro, geleneksel mutfak veya sokak lezzetleri için özel tasarlanmış 5 farklı görsel tema.',
  },
  {
    icon: '✨',
    title: 'AI Destekli Çeviri ve Onay',
    desc: 'Menünüzü tek tıkla İngilizce, Almanca ve Rusça dillerine çevirin; kontrol edip onaylayarak yayına alın.',
  },
  {
    icon: '👋',
    title: 'Özel Giriş (Karşılama) Ekranı',
    desc: 'Müşterilerinizi şık logonuz, karşılama mesajınız, çalışma saatleriniz ve dil seçiciyle karşılayın.',
  },
  {
    icon: '📸',
    title: 'Zengin Görsel ve Kategori Yönetimi',
    desc: 'Ürün fotoğrafları, porsiyon açıklamaları ve kategoriler ile iştah kabartan bir dijital menü oluşturun.',
  },
];

const themes = [
  {
    id: 'elegant',
    name: '01 ELEGANT',
    concept: 'Fine Dining • Otel • Premium Restoran',
    desc: 'Playfair Display serif tipografi, altın vurgular ve asil karşılama ekranı.',
    color: '#c5a880',
  },
  {
    id: 'modern',
    name: '02 MODERN',
    concept: 'Cafe • Bistro • Specialty Coffee',
    desc: 'Plus Jakarta Sans, şık rozetler, modern sepet ve dinamik kategori sekmeleri.',
    color: '#818cf8',
  },
  {
    id: 'classic',
    name: '03 CLASSIC',
    concept: 'Restoran • Kebap • Geleneksel Mutfak',
    desc: 'Merriweather tipografi, sıcak terracotta tonlar ve zengin menü kartları.',
    color: '#ea580c',
  },
  {
    id: 'minimal',
    name: '04 MINIMAL',
    concept: 'Bakery • Artisan Cafe • Tasarım Stüdyo',
    desc: 'Inter font, monokrom minimalizm, temiz çizgiler ve yüksek okunabilirlik.',
    color: '#94a3b8',
  },
  {
    id: 'bold',
    name: '05 BOLD',
    concept: 'Burger • Street Food • Beach Club',
    desc: 'Syne tipografi, yüksek kontrast, canlı renkler ve güçlü görsel hiyerarşi.',
    color: '#f43f5e',
  },
];

const faqList = [
  {
    q: 'QR menü nasıl çalışır?',
    a: 'Müşteriniz masadaki QR kodu telefonunun kamerasıyla okutur. Herhangi bir uygulama indirmesine gerek kalmadan işletmenizin dijital menüsü tarayıcıda saniyeler içinde açılır.',
  },
  {
    q: 'Menüde fiyat değiştiğinde QR kodu yeniden basmam gerekir mi?',
    a: 'Hayır, kesinlikle gerekmez. Pratika QR kodunuz işletmenize özel sabit bir web bağlantısı taşır. Panelden bir fiyatı veya ürünü değiştirdiğinizde masadaki QR kod aynı kalır, müşteri okuttuğunda anında yeni fiyatı görür.',
  },
  {
    q: 'Kaç dil destekleniyor?',
    a: 'Pratika QR Türkçe (ana kaynak dil), İngilizce, Almanca ve Rusça olmak üzere 4 dili tam olarak destekler.',
  },
  {
    q: 'AI çeviri nasıl çalışıyor ve çeviriyi kontrol edebilir miyim?',
    a: 'Türkçe ürün adınızı ve açıklamanızı girdiğinizde yapay zeka gastronomi terimlerine uygun olarak hedef dillere çeviri taslağı üretir. Bu taslak doğrudan yayına çıkmaz; panelde kontrol edip düzenleyebilir ve onayladığınızda müşterilerinize gösterilir.',
  },
  {
    q: 'Manuel olarak kendi çevirilerimi girebilir miyim?',
    a: 'Evet. İstediğiniz ürün ve kategori için manuel çeviri yapabilirsiniz. Manuel girilen çeviriler sistem tarafından "Korumalı" olarak işaretlenir ve AI tarafından asla üzerine yazılmaz.',
  },
  {
    q: 'Ürünlerime fotoğraf ekleyebilir miyim?',
    a: 'Evet. Panel üzerinden her ürününüze yüksek çözünürlüklü fotoğraflar yükleyebilir ve menüde müşterilerinize görsel olarak sunabilirsiniz.',
  },
  {
    q: 'Kendi domainimi (alan adı) satın almam gerekir mi?',
    a: 'Hayır. Pratika sizin için işletmenize özel "pratika.com/m/isletmeniz" bağlantısını otomatik olarak sağlar. Domain veya hosting maliyetiyle uğraşmazsınız.',
  },
  {
    q: 'Deneme süresi var mı?',
    a: 'Evet! 15 gün boyunca kredi kartı gerekmeden Profesyonel paketin tüm özelliklerini (5 tema, 4 dil, sınırsız ürün) ücretsiz deneyebilirsiniz.',
  },
];

export default function QrLandingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.page}>
      
      {/* 1. HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className="mx-auto max-w-3xl text-center">
            
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 border border-blue-500/20 px-3.5 py-1 text-xs font-extrabold text-blue-700 mb-6">
              <span>✦</span>
              <span>YENİ NESİL DİJİTAL MENÜ PLATFORMU</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Menünüzü dijitalleştirin.{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
                QR kodu okutun,
              </span>{' '}
              menünüz anında açılsın.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Fiyat, ürün, görsel ve çevirileri tek panelden yönetin. QR kodunuzu yeniden bastırmadan menünüzü saniyeler içinde güncelleyin.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
              <Link
                href="/login?mode=signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-500/25 hover:bg-blue-700 transition"
              >
                <span>15 Gün Ücretsiz Başla</span>
                <span>→</span>
              </Link>
              <Link
                href="/demo/qr-menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-white border border-slate-200 px-7 py-3.5 text-sm font-extrabold text-slate-800 shadow-sm hover:bg-slate-50 transition"
              >
                <span>👁️</span>
                <span>Canlı Demoyu İncele</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <strong className="text-emerald-600">✓</strong> Kredi kartı gerekmez
              </span>
              <span className="flex items-center gap-1.5">
                <strong className="text-emerald-600">✓</strong> 15 gün tam erişim
              </span>
              <span className="flex items-center gap-1.5">
                <strong className="text-emerald-600">✓</strong> Sabit QR bağlantısı
              </span>
            </div>
          </div>

          {/* REAL PRODUCT MOCKUP HERO SHOWCASE */}
          <div className="mt-12 sm:mt-16 rounded-3xl border border-slate-200/80 bg-slate-900 p-4 sm:p-8 shadow-2xl shadow-slate-900/10">
            <div className="grid gap-6 lg:grid-cols-12 items-center">
              
              {/* LEFT: PANEL MANAGEMENT PREVIEW */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">pratika.com/panel</span>
                  </div>
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    ● Canlı &amp; Yayında
                  </span>
                </div>

                <div className="space-y-2.5 text-left">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm font-bold text-white">Tina Kafe &amp; Bistro</strong>
                      <span className="text-xs text-blue-400 font-semibold">Tema: Elegant</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Kategori</span>
                        <strong className="text-white text-sm">6</strong>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Ürün</span>
                        <strong className="text-white text-sm">24</strong>
                      </div>
                      <div className="rounded-xl bg-white/5 p-2 border border-white/5">
                        <span className="text-[10px] text-slate-400 block">Diller</span>
                        <strong className="text-emerald-400 text-sm">TR · EN · DE · RU</strong>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">AI Çeviri Motoru</span>
                      <p className="text-xs text-slate-300 font-medium mt-0.5">24 ürünün İngilizce, Almanca ve Rusça çevirileri hazırlandı.</p>
                    </div>
                    <span className="rounded-xl bg-blue-600 px-3 py-1 text-xs font-bold text-white shadow-xs">
                      ✓ Onaylandı
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT: MOBILE PUBLIC MENU PREVIEW */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[280px] rounded-[36px] border-[6px] border-slate-800 bg-[#121110] p-4 text-left text-amber-100 shadow-xl ring-1 ring-white/10">
                  <div className="text-center pb-3 border-b border-amber-900/30">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-900/30 border border-amber-700/40 text-amber-300 font-serif font-bold text-sm mb-1.5">
                      T
                    </div>
                    <strong className="block text-xs font-serif font-bold text-amber-200">TINA KAFE</strong>
                    <span className="text-[9px] text-amber-400/70 tracking-widest uppercase">Specialty Coffee &amp; Kitchen</span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div className="rounded-xl bg-white/5 border border-white/5 p-2 flex justify-between items-center">
                      <div>
                        <strong className="text-white text-xs block">Flat White</strong>
                        <span className="text-[10px] text-slate-400">Çift shot espresso &amp; ipeksi süt</span>
                      </div>
                      <strong className="text-amber-400 font-bold text-xs">₺145</strong>
                    </div>
                    <div className="rounded-xl bg-white/5 border border-white/5 p-2 flex justify-between items-center">
                      <div>
                        <strong className="text-white text-xs block">Avokado Poşe Yumurta</strong>
                        <span className="text-[10px] text-slate-400">Ekşi mayalı ekmek üzerinde</span>
                      </div>
                      <strong className="text-amber-400 font-bold text-xs">₺280</strong>
                    </div>
                  </div>

                  <div className="mt-3 text-center border-t border-white/5 pt-2">
                    <span className="text-[9px] text-slate-400">🇹🇷 TR | 🇬🇧 EN | 🇩🇪 DE | 🇷🇺 RU</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE-STEP HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              KOLAY VE HIZLI KURULUM
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3 Adımda Dijital Menünüz Masanızda
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Karmaşık entegrasyonlar yok. Dakikalar içinde menünüzü hazırlayın.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.num}
                className="relative rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 font-black text-lg border border-blue-100">
                    {s.num}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI TRANSLATION SHOWCASE SECTION */}
      <section className="py-16 sm:py-24 bg-slate-950 text-white overflow-hidden relative">
        <div className={styles.container}>
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/10 border border-teal-500/20 px-3 py-1 text-xs font-bold text-teal-400">
                <span>✨</span>
                <span>AKILLI ÇEVİRİ VE ONAY SİSTEMİ</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Menünüzü tekrar tekrar çevirmeyin.
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Türkçe girdiğiniz ürün adları ve açıklamaları, Pratika AI motoru tarafından gastronomi terimlerine uygun olarak <strong>İngilizce, Almanca ve Rusça</strong> dillerine saniyeler içinde çevrilir.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span><strong>Kontrollü Yayın:</strong> AI çevirileri doğrudan yayına çıkmaz; panelde inceler, düzenler ve onayladığınızda menünüzde gösterirsiniz.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span><strong>Manuel Çeviri Önceliği:</strong> Elle girdiğiniz çeviriler &ldquo;Manuel&rdquo; olarak korunur ve AI asla üzerlerine yazmaz.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-sm">✓</span>
                  <span><strong>Eksiksiz Deneyim:</strong> Henüz çevrilmemiş ürünler yabancı misafirlerinize Türkçe orijinal haliyle sunulur, menü asla boş kalmaz.</span>
                </div>
              </div>
            </div>

            {/* RIGHT: INTERACTIVE TRANSLATION FLOW DIAGRAM */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl space-y-3 text-xs">
                
                {/* STEP 1: TURKISH SOURCE */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase">1. Kaynak Türkçe Metin</span>
                    <span className="text-[10px] text-slate-400">Panel Girişi</span>
                  </div>
                  <strong className="text-white text-sm block">Izgara Kasap Köfte</strong>
                  <p className="text-slate-400 text-xs mt-0.5">Közlenmiş biber, domates ve lavaş ile servis edilir.</p>
                </div>

                {/* STEP 2: AI GENERATION */}
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase">2. AI Çeviri Motoru</span>
                    <span className="text-[10px] text-blue-300 font-mono">3 Dil Hazırlandı</span>
                  </div>
                  <div className="space-y-1 text-slate-200 text-xs">
                    <div className="flex justify-between">
                      <span>🇬🇧 Grilled Butcher Meatballs</span>
                      <span className="text-emerald-400 font-semibold">EN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇩🇪 Gegrillte Fleischbällchen nach Metzgerart</span>
                      <span className="text-emerald-400 font-semibold">DE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🇷🇺 Котлеты по-деревенски на гриле</span>
                      <span className="text-emerald-400 font-semibold">RU</span>
                    </div>
                  </div>
                </div>

                {/* STEP 3: BUSINESS APPROVAL */}
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">3. İşletme Onayı</span>
                    <p className="text-white font-bold text-xs mt-0.5">Tek tıkla incele ve onayla</p>
                  </div>
                  <span className="rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-xs">
                    ✓ Onayla ve Yayınla
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. REAL FEATURES GRID */}
      <section className="py-16 sm:py-24 bg-white">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              GÜÇLÜ ÖZELLİKLER
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              İşletmenizin İhtiyacı Olan Tüm Araçlar
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Gereksiz karmaşıklıktan uzak, doğrudan satışınızı ve misafir deneyiminizi artıran altyapı.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-3xl border border-slate-200/90 bg-slate-50/50 p-6 hover:bg-white hover:shadow-lg transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-slate-200 text-xl shadow-xs mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 5 THEMES SHOWCASE */}
      <section className="py-16 sm:py-24 bg-slate-900 text-white">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block mb-2">
              KONSEPTİNİZE UYGUN TASARIMLAR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              5 Farklı Profesyonel Menü Teması
            </h2>
            <p className="mt-3 text-sm text-slate-400">
              Sadece renk değiştiren şablonlar değil; tipografisi ve yerleşimiyle ayrışan gerçek tasarım sistemleri.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((t) => (
              <div
                key={t.id}
                className="rounded-3xl border border-white/10 bg-slate-950 p-6 flex flex-col justify-between hover:border-white/20 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold text-white tracking-wider">{t.name}</span>
                    <span className="h-3 w-3 rounded-full border border-white/20" style={{ backgroundColor: t.color }} />
                  </div>
                  <div className="text-xs font-bold text-blue-400 mb-2">{t.concept}</div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{t.desc}</p>
                </div>
                <Link
                  href="/demo/qr-menu"
                  className="w-full inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/10 py-2 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition"
                >
                  Canlı Demoda İncele →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. REALISTIC PRICING TIERS */}
      <section id="fiyatlar" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              ŞEFFAF FİYATLANDIRMA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              İşletmenize Uygun Paketi Seçin
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              15 gün ücretsiz deneyin. Sözleşme veya taahhüt yoktur.
            </p>

            {/* BILLING TOGGLE */}
            <div className="mt-6 inline-flex items-center rounded-2xl bg-white border border-slate-200 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setBillingPeriod('monthly')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  billingPeriod === 'monthly'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Aylık Ödeme
              </button>
              <button
                type="button"
                onClick={() => setBillingPeriod('annual')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition flex items-center gap-1.5 ${
                  billingPeriod === 'annual'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Yıllık Ödeme</span>
                <span className="rounded-md bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.5 font-extrabold">
                  %20 İndirimli
                </span>
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 items-stretch">
            
            {/* TIER 1: BAŞLANGIÇ */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  KÜÇÜK İŞLETMELER İÇİN
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Başlangıç</h3>
                
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      ₺{billingPeriod === 'annual' ? '249' : '299'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ ay</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {billingPeriod === 'annual' ? 'Yıllık ₺2.988 olarak faturalandırılır' : 'Aylık ödeme'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>1 İşletme</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>2 Dil Desteği</strong> (Türkçe + 1 Yabancı Dil)
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>3 Profesyonel Tema</strong> (Elegant, Modern, Classic)
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>10 Kategori</strong> &amp; <strong>100 Ürün</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Sabit QR Kod ve Anlık Güncelleme
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Karşılama (Giriş) Ekranı
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> AI Destekli Çeviri ve Onay Sistemi
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Standart Destek
                  </li>
                </ul>
              </div>

              <Link
                href="/login?mode=signup"
                className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-100 py-3 text-xs font-bold text-slate-800 hover:bg-slate-200 transition"
              >
                15 Gün Ücretsiz Başla
              </Link>
            </div>

            {/* TIER 2: PROFESYONEL (FEATURED) */}
            <div className="relative rounded-3xl border-2 border-blue-600 bg-white p-8 flex flex-col justify-between shadow-xl shadow-blue-500/10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1 text-[11px] font-extrabold text-white uppercase tracking-wider shadow-md">
                En Çok Tercih Edilen
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
                  BÜYÜYEN MEKANLAR İÇİN
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Profesyonel</h3>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      ₺{billingPeriod === 'annual' ? '499' : '599'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">/ ay</span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    {billingPeriod === 'annual' ? 'Yıllık ₺5.988 olarak faturalandırılır' : 'Aylık ödeme'}
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>2 İşletme</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>4 Dil Desteği</strong> (TR, EN, DE, RU)
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>5 Profesyonel Tema</strong> (Tüm Temalar)
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> <strong>Sınırsız Kategori</strong> &amp; <strong>Sınırsız Ürün</strong>
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Sabit QR Kod ve Anlık Güncelleme
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Karşılama (Giriş) Ekranı
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> AI Destekli Çeviri ve Onay Sistemi
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Öncelikli Destek
                  </li>
                </ul>
              </div>

              <Link
                href="/login?mode=signup"
                className="w-full inline-flex items-center justify-center rounded-2xl bg-blue-600 py-3 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 transition"
              >
                15 Gün Ücretsiz Başla
              </Link>
            </div>

            {/* TIER 3: KURUMSAL / ZİNCİR */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                  ÇOKLU ŞUBE &amp; ZİNCİRLER İÇİN
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Kurumsal / Zincir</h3>

                <div className="mb-6 pb-6 border-b border-slate-100">
                  <div className="text-3xl font-black text-slate-900">Size Özel</div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    İhtiyaçlarınıza göre özel fiyatlandırma
                  </span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600 mb-8">
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Çoklu İşletme ve Şube Yönetimi
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Merkezi Menü ve Fiyat Yönetimi
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Şube Bazlı Menü ve Fiyat Yönetimi
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Sınırsız Ürün ve Kategori
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Genişletilmiş Dil Desteği
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Tüm Tema Seçenekleri &amp; AI Çeviri
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Toplu Menü ve Veri Aktarım Desteği
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> Özel Kurulum ve Onboarding
                  </li>
                  <li className="flex items-center gap-2">
                    <strong className="text-emerald-600">✓</strong> 7/24 Öncelikli Kurumsal Destek
                  </li>
                </ul>
              </div>

              <Link
                href="/iletisim?konu=kurumsal-qr"
                className="w-full inline-flex items-center justify-center rounded-2xl bg-slate-900 py-3 text-xs font-extrabold text-white hover:bg-slate-800 transition"
              >
                Kurumsal Teklif Al
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 block mb-2">
              SIKÇA SORULAN SORULAR
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Aklınıza Takılan Sorular
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Pratika QR hakkında en çok merak edilen konular.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {faqList.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-600"
                  >
                    <span>{faq.q}</span>
                    <span className="text-slate-400 text-base">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA BANNER */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white text-center">
        <div className={styles.container}>
          <div className="mx-auto max-w-2xl space-y-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Menünüzü Bugün Dijitalleştirin
            </h2>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              15 gün boyunca ücretsiz deneyin. Masa QR kodlarınızı hemen oluşturup bastırın.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/login?mode=signup"
                className="w-full sm:w-auto rounded-2xl bg-white px-8 py-3.5 text-sm font-extrabold text-blue-900 shadow-xl hover:bg-blue-50 transition"
              >
                Ücretsiz Hesap Oluşturun →
              </Link>
              <Link
                href="/demo/qr-menu"
                className="w-full sm:w-auto rounded-2xl bg-white/10 border border-white/20 px-8 py-3.5 text-sm font-extrabold text-white hover:bg-white/20 transition"
              >
                Canlı Demoyu İncele
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
