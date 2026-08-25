'use client';

import { useState } from 'react';
import { createUserByAdminAction } from '@/app/admin/actions';
import styles from './admin.module.css';

export default function AdminCreateUserModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const formData = new FormData(e.currentTarget);
    const res = await createUserByAdminAction(formData);
    setLoading(false);

    if (res.error) {
      setFeedback({ type: 'error', text: res.error });
    } else {
      setFeedback({ type: 'success', text: res.message || '✓ Kullanıcı başarıyla oluşturuldu.' });
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0f172a] p-6 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400 border border-blue-600/30 text-base">
              👤
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Yeni Kullanıcı Oluştur</h3>
              <p className="text-xs text-slate-400">Sisteme yeni bir müşteri veya yönetici hesabı ekleyin.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
          >
            ✕
          </button>
        </div>

        {feedback && (
          <div
            className={`mb-4 rounded-xl border p-3 text-xs font-bold ${
              feedback.type === 'success'
                ? 'border-green-500/30 bg-green-500/10 text-emerald-300'
                : 'border-red-500/30 bg-red-500/10 text-red-300'
            }`}
          >
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Ad Soyad *
            </label>
            <input
              name="fullName"
              required
              placeholder="Örn: Barış Akar"
              className={styles.searchInput}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              E-Posta Adresi *
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="musteri@example.com"
              className={styles.searchInput}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Geçici Şifre * (En az 6 karakter)
            </label>
            <input
              name="password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className={styles.searchInput}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Kullanıcı Rolü *
            </label>
            <select
              name="role"
              className="w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-xs font-semibold text-white outline-none focus:border-blue-500"
            >
              <option value="customer">👤 Müşteri (Normal Kullanıcı)</option>
              <option value="admin">👑 Yönetici (Süper Admin)</option>
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className={styles.btnSecondary}
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className={styles.btnPrimary}
            >
              {loading ? 'Oluşturuluyor...' : 'Kullanıcıyı Oluştur →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
