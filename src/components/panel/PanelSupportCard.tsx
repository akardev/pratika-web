import Link from 'next/link';

export default function PanelSupportCard() {
  return (
    <div className="mt-8 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 p-6 text-slate-800">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            🤝 Kurulum Desteği
          </span>
          <h4 className="mt-2 text-base font-bold text-slate-900">
            Menünüzü kendiniz girmek istemiyor musunuz?
          </h4>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600">
            Mevcut kağıt, PDF veya Excel menünüzü bize gönderin. Uzman ekibimiz ilk menü aktarımınızı ve kategori düzenlemenizi sizin için tamamlasın.
          </p>
        </div>
        <Link
          href="/iletisim?konu=qr-menu-kurulum"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-800"
        >
          Menü Kurulum Desteği Al <span>→</span>
        </Link>
      </div>
    </div>
  );
}
