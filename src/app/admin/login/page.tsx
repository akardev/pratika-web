'use client';

import { useState } from 'react';
import Link from 'next/link';
import { adminLoginAction } from '@/app/admin/actions';

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const res = await adminLoginAction(formData);

    if (res?.error) {
      setErrorMsg(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center p-4 sm:p-6 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* BRAND BADGE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 mb-4 text-2xl">
            🛡️
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Pratika Admin
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-400">
            SaaS Yönetim ve Kontrol Merkezi Girişi
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-3xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl p-7 sm:p-8 shadow-2xl shadow-black/50">
          {errorMsg && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-bold text-red-300 flex items-center gap-2"
            >
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Yönetici E-Postası
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="admin@pratika.com"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5"
              >
                Şifre
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <input type="hidden" name="redirectTo" value="/admin" />

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/35 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block animate-spin">⏳</span>
                    <span>Doğrulanıyor...</span>
                  </>
                ) : (
                  <>
                    <span>🔐 Yönetici Olarak Giriş Yap</span>
                    <span>→</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <Link
              href="/"
              className="hover:text-slate-200 transition"
            >
              ← Ana Sayfa
            </Link>
            <Link
              href="/login"
              className="text-blue-400 hover:text-blue-300 font-semibold transition"
            >
              🏢 Müşteri Girişi (/login)
            </Link>
          </div>
        </div>

        {/* SECURITY NOTICE */}
        <div className="mt-6 text-center text-[11px] text-slate-500">
          Bu alan yalnızca yetkili Pratika yöneticileri içindir. Tüm erişim ve oturum aktiviteleri kayıt altına alınmaktadır.
        </div>
      </div>
    </div>
  );
}
