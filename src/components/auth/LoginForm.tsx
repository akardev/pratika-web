'use client';

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
      className={mode === 'login'
        ? 'min-h-11 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition hover:bg-foreground/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60'
        : 'min-h-11 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60'}
    >
      {pending ? 'Bekleyin…' : mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
    </button>
  );
}

export default function LoginForm({ message }: { message?: string }) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-7 flex justify-center"><Logo variant="wordmark" size="lg" /></div>
      <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
        <form className="flex w-full flex-col gap-4 text-foreground">
          <div className="mb-3 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Pratika&apos;ya Giriş Yap</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">Pratika hesabınıza giriş yaparak araçlarınıza ve ürünlerinize erişin.</p>
          </div>
          <label className="text-sm font-medium" htmlFor="login-email">E-posta</label>
          <input id="login-email" className="min-h-11 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" name="email" type="email" autoComplete="email" placeholder="isim@ornek.com" required />
          <label className="text-sm font-medium" htmlFor="login-password">Şifre</label>
          <input id="login-password" className="min-h-11 rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15" type="password" name="password" autoComplete="current-password" placeholder="••••••••" required />
          <div className="mt-2 flex flex-col gap-2"><SubmitButton mode="login" /><SubmitButton mode="signup" /></div>
          {message && <p role="alert" className="mt-2 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">{message}</p>}
        </form>
      </div>
      <p className="mt-5 text-center text-xs text-muted-foreground">Pratika araçları ve ürünleri için ortak hesabınızla giriş yapın.</p>
    </div>
  );
}
