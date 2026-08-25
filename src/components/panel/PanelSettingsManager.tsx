'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { BusinessData } from './PanelDashboardOverview';
import { parseBusinessSettings } from '@/lib/business-settings';
import { updateBusinessAction } from '@/app/panel/actions';
import styles from './panel.module.css';

export default function PanelSettingsManager({ business }: { business: BusinessData }) {
  const settings = parseBusinessSettings(business);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Logo upload state
  const [logoPreview, setLogoPreview] = useState<string>(business.logo_url || '');

  const [logoUploading, setLogoUploading] = useState(false);

  const businessLetter = (business.name.trim()[0] || 'P').toUpperCase();

  const handleLogoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFeedback(null);
    setLogoUploading(true);

    const { uploadBusinessLogo } = await import('@/lib/storage-client');
    const res = await uploadBusinessLogo(file, business.id);
    setLogoUploading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else if (res.url) {
      setLogoPreview(res.url);
      setFeedback({ type: 'success', text: '✓ Logo başarıyla yüklendi. Değişiklikleri kaydetmek için "Ayarları Kaydet" butonuna basın.' });
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.set('logoUrl', logoPreview || '__REMOVE__');
    formData.set('menuTheme', settings.menu_theme);
    formData.set('showMenuIntro', String(settings.show_menu_intro));

    const result = await updateBusinessAction(business.id, formData);
    setLoading(false);

    if (result.error) {
      setFeedback({ type: 'error', text: result.error });
    } else {
      setFeedback({ type: 'success', text: '✓ İşletme ve menü profil ayarları başarıyla güncellendi.' });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>İşletme ve Menü Profil Ayarları</h2>
          <p className="mt-1 text-xs text-slate-500">
            Logonuzu, karşılama mesajınızı, sloganınızı ve iletişim bilgilerinizi buradan yönetin.
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`mb-4 rounded-xl border p-3.5 text-xs font-bold ${
            feedback.type === 'success'
              ? 'border-green-200 bg-green-50 text-green-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {feedback.text}
        </div>
      )}

      <div className={styles.sectionCard}>
        <form onSubmit={handleSubmit} className="max-w-2xl">
          {/* 1. İŞLETME LOGOSU */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
              İşletme Logosu
            </label>
            <p className="mt-0.5 text-xs text-slate-500">
              Menünün en üstünde ve başlığında görüntülenecektir (PNG, JPG, WebP - Maks. 3MB).
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-5">
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-white shadow-xs">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo Önizleme"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <span className="font-serif text-3xl font-bold text-orange-600">
                    {businessLetter}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:opacity-50">
                  <span>{logoUploading ? 'Yükleniyor...' : logoPreview ? 'Logoyu Değiştir' : 'Logo Yükle'}</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleLogoFileChange}
                    disabled={logoUploading}
                    className="hidden"
                  />
                </label>
                {logoPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-left text-xs font-semibold text-red-600 hover:underline"
                  >
                    Logoyu Kaldır (Baş harfe dön)
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 2. TEMEL BİLGİLER */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="set-name">İşletme Adı *</label>
            <input
              id="set-name"
              name="name"
              type="text"
              defaultValue={business.name}
              className={styles.formInput}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-type">İşletme Türü</label>
              <select
                id="set-type"
                name="businessType"
                defaultValue={business.business_type || 'Kafe'}
                className={styles.formSelect}
              >
                <option value="Kafe">Kafe / Coffee Shop</option>
                <option value="Restoran">Restoran</option>
                <option value="Otel">Otel / Tatil Köyü</option>
                <option value="Bar">Bar / Pub</option>
                <option value="Pastane">Pastane / Fırın</option>
                <option value="Plaj">Plaj / Beach Club</option>
                <option value="Diğer">Diğer İşletme</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-welcome">Hoş Geldiniz Başlığı</label>
              <input
                id="set-welcome"
                name="welcomeMessage"
                type="text"
                defaultValue={settings.welcome_message || 'Hoş geldiniz!'}
                placeholder="Örn: Hoş geldiniz!"
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 3. SLOGAN & ÇALIŞMA SAATLERİ */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-slogan">Kısa Slogan (Opsiyonel)</label>
              <input
                id="set-slogan"
                name="slogan"
                type="text"
                defaultValue={settings.slogan || ''}
                placeholder="Örn: Kahve, mutfak ve iyi anlar."
                className={styles.formInput}
              />
              <span className="mt-1 block text-[11px] text-slate-500">Boş bırakılırsa menüde gizlenir.</span>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-hours">Çalışma Saatleri (Opsiyonel)</label>
              <input
                id="set-hours"
                name="workingHours"
                type="text"
                defaultValue={settings.working_hours || ''}
                placeholder="Örn: Hergün: 08:00 – 23:00"
                className={styles.formInput}
              />
              <span className="mt-1 block text-[11px] text-slate-500">Boş bırakılırsa menüde gizlenir.</span>
            </div>
          </div>

          {/* 4. İLETİŞİM & LOKASYON */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-phone">Telefon Numarası</label>
              <input
                id="set-phone"
                name="phone"
                type="tel"
                defaultValue={business.phone || ''}
                placeholder="0242 000 00 00"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-addr">Adres / Şehir</label>
              <input
                id="set-addr"
                name="address"
                type="text"
                defaultValue={business.address || ''}
                placeholder="Kayseri"
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="set-insta">Instagram Kullanıcı Adı</label>
              <input
                id="set-insta"
                name="instagram"
                type="text"
                defaultValue={business.instagram || ''}
                placeholder="@tinakafe"
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 5. AÇIKLAMA */}
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="set-desc">İşletme Tanıtım Metni</label>
            <textarea
              id="set-desc"
              name="description"
              defaultValue={settings.descriptionText}
              placeholder="Size güzel bir deneyim sunmak için buradayız..."
              className={styles.formTextarea}
            />
          </div>

          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <strong className="block text-xs font-bold text-slate-800">Sabit QR Menü Bağlantınız (Slug):</strong>
            <code className="mt-1 block font-mono text-xs text-orange-600">
              qr.pratika.com/{business.slug}
            </code>
            <small className="mt-2 block text-[11px] text-slate-500">
              Bu slug QR kodunuzun sabit hedefidir. Menünüzü güncellediğinizde masadaki QR kodunuz bozulmaz.
            </small>
          </div>

          <div className="mt-6">
            <button type="submit" disabled={loading} className={styles.actionPrimaryBtn}>
              {loading ? 'Kaydediliyor…' : 'Ayarları Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
