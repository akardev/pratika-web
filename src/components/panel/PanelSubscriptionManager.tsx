'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BusinessData } from './PanelDashboardOverview';
import { calculateTrialInfo } from '@/lib/trial';
import styles from './panel.module.css';

export default function PanelSubscriptionManager({ business }: { business: BusinessData }) {
  const trial = calculateTrialInfo(business.created_at);
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Abonelik ve Planlar</h2>
          <p className="mt-1 text-xs text-slate-500">
            Mevcut üyelik durumunuzu, ücretsiz deneme sürenizi ve paket seçeneklerini buradan inceleyebilirsiniz.
          </p>
        </div>
      </div>

      {/* CURRENT TRIAL STATUS BANNER */}
      <div className="mb-8 rounded-2xl border border-blue-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 text-white shadow-md">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                {trial.isExpired ? 'Deneme Süresi Doldu' : 'Aktif Ücretsiz Deneme'}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-black text-white">
              {trial.planName}
            </h3>
            <p className="mt-1 text-xs text-slate-300">
              Başlangıç: <strong>{trial.startDateFormatted}</strong> · Bitiş: <strong>{trial.endDateFormatted}</strong>
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-center backdrop-blur-md">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-300">Kalan Süre</span>
            <span className="text-3xl font-black text-white">{trial.daysLeft}</span>
            <span className="block text-[11px] text-slate-300">gün</span>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-300">
          💡 <strong>Ödeme Bilgisi:</strong> Deneme süreniz boyunca kredi kartı veya ödeme bilgisi tanımlamanız gerekmez. Deneme sonunda menünüzü kesintisiz kullanmaya devam etmek için aşağıdaki paketlerden birini seçebilirsiniz.
        </div>
      </div>

      {/* BILLING TOGGLE */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Mevcut Paket Seçenekleri</h3>
          <p className="text-xs text-slate-500">İşletmenizin büyüklüğüne göre en uygun planı belirleyin.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              !isAnnual ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Aylık
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
              isAnnual ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            Yıllık (2 Ay Avantajlı)
          </button>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* BAŞLANGIÇ */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Temel Seviye</span>
            <h4 className="mt-1 text-lg font-black text-slate-900">Başlangıç</h4>
            <p className="mt-1 text-xs text-slate-500">Tek şubeli butik kafe ve küçük işletmeler için.</p>

            <div className="my-4 border-y border-slate-100 py-3">
              <span className="text-2xl font-black text-slate-900">₺{isAnnual ? '2.990' : '299'}</span>
              <span className="text-xs text-slate-500">{isAnnual ? ' / yıl' : ' / ay'}</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700">
              <li>✓ 1 İşletme / Şube</li>
              <li>✓ 100 Ürüne Kadar</li>
              <li>✓ 10 Kategoriye Kadar</li>
              <li>✓ 2 Dil Desteği (TR + EN)</li>
              <li>✓ Mobil Uyumlu QR Menü</li>
              <li>✓ Standart Tasarım Seçenekleri</li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/iletisim?konu=qr-menu-abonelik-baslangic"
              className="block w-full rounded-xl border border-slate-300 py-2.5 text-center text-xs font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Başlangıç Paketi Seç →
            </Link>
          </div>
        </div>

        {/* PROFESYONEL */}
        <div className="relative flex flex-col justify-between rounded-2xl border-2 border-orange-500 bg-white p-6 shadow-md">
          <div className="absolute -top-3 right-4 rounded-full bg-orange-500 px-3 py-0.5 text-[10px] font-black uppercase text-white shadow-xs">
            ÖNERİLEN
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Tam Donanım</span>
            <h4 className="mt-1 text-lg font-black text-slate-900">Profesyonel</h4>
            <p className="mt-1 text-xs text-slate-500">Zengin menülü restoranlar ve popüler mekanlar.</p>

            <div className="my-4 border-y border-slate-100 py-3">
              <span className="text-2xl font-black text-slate-900">₺{isAnnual ? '5.990' : '599'}</span>
              <span className="text-xs text-slate-500">{isAnnual ? ' / yıl' : ' / ay'}</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700">
              <li><strong>✓ Sınırsız Ürün &amp; Kategori</strong></li>
              <li><strong>✓ 4 Dil Desteği (TR, EN, DE, RU)</strong></li>
              <li><strong>✓ Logo &amp; Özel Marka Renkleri</strong></li>
              <li><strong>✓ Vektörel QR Çıktıları (SVG, PDF)</strong></li>
              <li><strong>✓ İlk Menü Kurulum Desteği</strong></li>
              <li>✓ Kalori ve Alerjen Bilgileri</li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/iletisim?konu=qr-menu-abonelik-profesyonel"
              className="block w-full rounded-xl bg-orange-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-orange-700"
            >
              Profesyonel Paketi Seç →
            </Link>
          </div>
        </div>

        {/* İŞLETME / ÇOKLU ŞUBE */}
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kurumsal</span>
            <h4 className="mt-1 text-lg font-black text-slate-900">İşletme &amp; Zincir</h4>
            <p className="mt-1 text-xs text-slate-500">Çok şubeli işletmeler ve zincir markalar için.</p>

            <div className="my-4 border-y border-slate-100 py-3">
              <span className="text-2xl font-black text-slate-900">Özel Teklif</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700">
              <li>✓ Çoklu Şube Yönetimi</li>
              <li>✓ Merkezi Fiyatlandırma</li>
              <li>✓ Sınırsız Ürün ve Dil</li>
              <li>✓ Gelecekte Özel Alan Adı (Domain)</li>
              <li>✓ Özel VIP Menü Aktarım Desteği</li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/iletisim?konu=qr-menu-kurumsal"
              className="block w-full rounded-xl border border-slate-300 py-2.5 text-center text-xs font-bold text-slate-800 transition hover:bg-slate-50"
            >
              Kurumsal Teklif Al →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
