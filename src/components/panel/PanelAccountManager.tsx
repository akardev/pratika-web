'use client';

import { useState } from 'react';
import type { BusinessData } from './PanelDashboardOverview';
import { updatePasswordAction, signout } from '@/app/login/actions';
import { calculateTrialInfo } from '@/lib/trial';
import styles from './panel.module.css';

export default function PanelAccountManager({
  userEmail,
  business,
}: {
  userEmail: string;
  business: BusinessData;
}) {
  const trial = calculateTrialInfo(business.created_at);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const result = await updatePasswordAction(formData);
    setLoading(false);

    if (result.error) {
      setFeedback({ type: 'error', text: result.error });
    } else {
      setFeedback({ type: 'success', text: '✓ Şifreniz başarıyla güncellendi.' });
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  return (
    <div>
      <div className={styles.sectionCardHeader}>
        <div>
          <h2>Hesap ve Güvenlik</h2>
          <p className="mt-1 text-xs text-slate-500">
            Pratika kullanıcı hesabınızı, güvenlik tercihlerinizi ve oturum ayarlarınızı yönetin.
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

      {/* ACCOUNT DETAILS CARD */}
      <div className={styles.sectionCard}>
        <h3 className="mb-4 text-base font-extrabold text-slate-900">Hesap Bilgileri</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Kayıtlı E-posta</span>
            <strong className="mt-1 block text-sm text-slate-900">{userEmail}</strong>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Aktif İşletme</span>
            <strong className="mt-1 block text-sm text-slate-900">{business.name}</strong>
            <span className="text-xs text-slate-500 font-mono">qr.pratika.com/{business.slug}</span>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Abonelik Durumu</span>
            <strong className="mt-1 block text-sm text-emerald-700">{trial.planName}</strong>
            <span className="text-xs text-slate-500">Bitiş: {trial.endDateFormatted}</span>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Kayıt Tarihi</span>
            <strong className="mt-1 block text-sm text-slate-900">{trial.startDateFormatted}</strong>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD CARD */}
      <div className={styles.sectionCard}>
        <h3 className="mb-4 text-base font-extrabold text-slate-900">Şifre Değiştir</h3>

        <form onSubmit={handlePasswordChange} className="max-w-md">
          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="new-pwd">Yeni Şifre *</label>
            <input
              id="new-pwd"
              name="newPassword"
              type="password"
              placeholder="En az 6 karakter"
              required
              className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel} htmlFor="new-pwd-confirm">Yeni Şifre Tekrar *</label>
            <input
              id="new-pwd-confirm"
              name="newPasswordConfirm"
              type="password"
              placeholder="••••••••"
              required
              className={styles.formInput}
            />
          </div>

          <div className="mt-4">
            <button type="submit" disabled={loading} className={styles.actionPrimaryBtn}>
              {loading ? 'Güncelleniyor…' : 'Şifreyi Güncelle'}
            </button>
          </div>
        </form>
      </div>

      {/* SIGNOUT CARD */}
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <strong className="block text-sm font-bold text-red-900">Oturumu Kapat</strong>
            <p className="mt-0.5 text-xs text-red-700">Bu cihazdaki Pratika QR oturumunuzu güvenle sonlandırın.</p>
          </div>
          <form action={signout}>
            <button
              type="submit"
              className="rounded-xl border border-red-300 bg-white px-4 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
