import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminUnauthorizedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-[#070b12] flex flex-col items-center justify-center p-4 sm:p-6 text-white font-sans">
      <div className="w-full max-w-md text-center">
        {/* ICON */}
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-3xl mb-5 text-red-400">
          🔒
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
          Yetkisiz Erişim
        </h1>

        <p className="text-sm text-slate-400 mb-6 leading-relaxed">
          Oturum açmış olduğunuz hesap (
          <strong className="text-slate-200">{user?.email || 'Müşteri'}</strong>
          ) Pratika SaaS Yönetici (Admin) yetkisine sahip değildir.
        </p>

        {/* CARD WITH ACTIONS */}
        <div className="rounded-3xl border border-white/10 bg-[#0f172a]/90 backdrop-blur-xl p-6 shadow-2xl shadow-black/50 space-y-3">
          <Link
            href="/panel"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition"
          >
            <span>🏢</span>
            <span>Müşteri Paneline Git (/panel)</span>
          </Link>

          <Link
            href="/admin/login"
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <span>🔄</span>
            <span>Farklı Yönetici Hesabıyla Giriş Yap</span>
          </Link>
        </div>

        <div className="mt-6">
          <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition">
            ← Pratika Ana Sayfasına Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
