'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createBusinessAction } from '@/app/panel/actions';
import { uploadBusinessLogo } from '@/lib/storage-client';
import styles from './panel.module.css';

export default function PanelOnboarding() {
  const router = useRouter();

  // Form fields
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('Kafe');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');

  // Logo state
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [logoUploading, setLogoUploading] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setLogoUploading(true);

    const res = await uploadBusinessLogo(file, 'onboarding');
    setLogoUploading(false);

    if (res.error) {
      setErrorMsg(res.error);
    } else if (res.url) {
      setLogoPreview(res.url);
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) {
      setErrorMsg('Lütfen işletme adınızı girin.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append('name', businessName.trim());
    formData.append('businessType', businessType);
    formData.append('phone', phone.trim());
    formData.append('address', address.trim());
    formData.append('instagram', instagram.trim());
    formData.append('description', description.trim());
    if (logoPreview) {
      formData.append('logoUrl', logoPreview);
    }

    const result = await createBusinessAction(formData);

    if (result.error) {
      setErrorMsg(result.error);
      setLoading(false);
    } else if (result.success) {
      // Direct redirect to panel
      router.push('/panel');
      router.refresh();
    }
  };

  const businessLetter = (businessName.trim()[0] || 'P').toUpperCase();

  return (
    <div className={styles.onboardingWrapper}>
      <div className={styles.onboardingCard}>
        <div>
          <span className={styles.onboardingStepPill}>TEK ADIMDA KURULUM · İŞLETME PROFİLİ</span>
          <h1>Pratika QR&apos;a Hoş Geldiniz 👋</h1>
          <p>
            Dijital QR menünüzü anında oluşturmak için işletmenizin temel bilgilerini girin.
          </p>

          {errorMsg && (
            <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-700">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* LOGO UPLOAD SECTION */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-800">
                İşletme Logosu (Opsiyonel)
              </label>
              <p className="mt-0.5 text-xs text-slate-500">
                Menü başlığında ve QR karşılama ekranında gösterilir (PNG, JPG, WebP - Maks. 3MB).
              </p>

              <div className="mt-3 flex items-center gap-4">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-white shadow-xs">
                  {logoPreview ? (
                    <Image
                      src={logoPreview}
                      alt="Logo Önizleme"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="font-serif text-2xl font-bold text-orange-600">
                      {businessLetter}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-slate-900 px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition hover:bg-slate-800 disabled:opacity-50">
                    <span>{logoUploading ? 'Yükleniyor...' : logoPreview ? 'Logoyu Değiştir' : 'Logo Seç'}</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleLogoChange}
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
                      Logoyu Kaldır
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* İŞLETME ADI */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="onb-name">
                İşletme Adı *
              </label>
              <input
                id="onb-name"
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="Örn: Luna Coffee & Kitchen, Tina Kafe"
                className={styles.formInput}
                required
              />
            </div>

            {/* İŞLETME TÜRÜ & ŞEHİR */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="onb-type">
                  İşletme Türü
                </label>
                <select
                  id="onb-type"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="Kafe">Kafe / Coffee Shop</option>
                  <option value="Restoran">Restoran</option>
                  <option value="Otel">Otel</option>
                  <option value="Bar">Bar / Pub</option>
                  <option value="Pastane">Pastane / Fırın</option>
                  <option value="Fast Food">Fast Food / Dürüm</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="onb-city">
                  Şehir / Lokasyon
                </label>
                <input
                  id="onb-city"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Örn: Antalya, Kadıköy / İstanbul"
                  className={styles.formInput}
                />
              </div>
            </div>

            {/* TELEFON & INSTAGRAM */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="onb-phone">
                  Telefon Numarası
                </label>
                <input
                  id="onb-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Örn: 0555 123 45 67"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel} htmlFor="onb-insta">
                  Instagram Hesabı
                </label>
                <input
                  id="onb-insta"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Örn: @tinakafe"
                  className={styles.formInput}
                />
              </div>
            </div>

            {/* AÇIKLAMA */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="onb-desc">
                Kısa Açıklama / Slogan
              </label>
              <textarea
                id="onb-desc"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Örn: Taze çekilmiş kahveler ve özel lezzetler..."
                className={styles.formTextarea}
              />
            </div>

            <div className="mt-6 pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Otomatik QR &amp; Tema hazır oluşturulur
              </span>
              <button
                type="submit"
                disabled={loading || logoUploading}
                className={styles.actionPrimaryBtn}
              >
                {loading ? 'İşletme Oluşturuluyor…' : '🚀 İşletmeyi Oluştur ve Panele Geç →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
