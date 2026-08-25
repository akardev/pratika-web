'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import Logo from '@/components/ui/Logo';
import { login, signup } from '@/app/login/actions';

function SubmitButton({ mode }: { mode: 'login' | 'signup' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      formAction={mode === 'login' ? login : signup}
      disabled={pending}
      className="min-h-11 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
    >
      {pending
        ? 'Lütfen bekleyin…'
        : mode === 'login'
        ? 'Giriş Yap'
        : '15 Gün Ücretsiz Başla →'}
    </button>
  );
}

export default function LoginForm({
  message,
  redirectTo = '/panel',
  initialMode = 'login',
}: {
  message?: string;
  redirectTo?: string;
  initialMode?: 'login' | 'signup';
}) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialMode);
  const [clientError, setClientError] = useState<string | null>(null);

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab);
    setClientError(null);
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (activeTab === 'signup') {
      if (password.length < 6) {
        e.preventDefault();
        setClientError('Şifreniz en az 6 karakter olmalıdır.');
        return;
      }
      if (password !== passwordConfirm) {
        e.preventDefault();
        setClientError('Girdiğiniz şifreler birbiriyle eşleşmiyor.');
        return;
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-7 flex justify-center">
        <Logo variant="wordmark" size="lg" />
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        {/* TAB SWITCHER */}
        <div className="mb-6 flex rounded-xl bg-muted/60 p-1">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              activeTab === 'login'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Giriş Yap
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition ${
              activeTab === 'signup'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Yeni Hesap Oluştur
          </button>
        </div>

        <form onSubmit={handleClientSubmit} className="flex w-full flex-col gap-4 text-foreground">
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="mb-1 text-center">
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              {activeTab === 'login'
                ? 'Pratika\'ya Giriş Yap'
                : 'Pratika Hesabınızı Oluşturun'}
            </h1>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {activeTab === 'login'
                ? 'QR Menü panelinize ve araçlarınıza erişmek için giriş yapın.'
                : '15 gün ücretsiz QR menü denemenizi başlatmak için kaydolun. Kredi kartı gerekmez.'}
            </p>
          </div>

          {activeTab === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-700" htmlFor="signup-name">
                Ad Soyad
              </label>
              <input
                id="signup-name"
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder="Örn: Ahmet Yılmaz"
                className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-700" htmlFor="login-email">
              E-posta Adresi *
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ornek@isletme.com"
              required
              className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700" htmlFor="login-password">
              Şifre *
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              autoComplete={activeTab === 'login' ? 'current-password' : 'new-password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
            />
            {activeTab === 'signup' && (
              <span className="mt-1 block text-[11px] text-muted-foreground">
                En az 6 karakter olmalıdır.
              </span>
            )}
          </div>

          {activeTab === 'signup' && (
            <div>
              <label className="text-xs font-semibold text-slate-700" htmlFor="signup-password-confirm">
                Şifre Tekrar *
              </label>
              <input
                id="signup-password-confirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="mt-1 min-h-11 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>
          )}

          {(clientError || message) && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-bold text-red-600"
            >
              {clientError || message}
            </p>
          )}

          <div className="mt-2">
            <SubmitButton mode={activeTab} />
          </div>

          {/* FOOTER SWITCH LINK */}
          <div className="mt-3 text-center text-xs text-muted-foreground">
            {activeTab === 'login' ? (
              <span>
                Hesabınız yok mu?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('signup')}
                  className="font-bold text-slate-900 underline hover:text-orange-600"
                >
                  Ücretsiz Kayıt Olun
                </button>
              </span>
            ) : (
              <span>
                Zaten hesabınız var mı?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('login')}
                  className="font-bold text-slate-900 underline hover:text-orange-600"
                >
                  Giriş Yapın
                </button>
              </span>
            )}
          </div>
        </form>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground">
        Pratika hesapları ile tüm araçlara ve QR yönetim paneline tek girişle erişebilirsiniz.
      </p>
    </div>
  );
}
