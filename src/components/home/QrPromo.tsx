import Image from 'next/image';
import Link from 'next/link';

export default function QrPromo() {
  return (
    <section className="border-b border-border/60 bg-[#0a1d37] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-8 overflow-hidden rounded-2xl border border-white/10 bg-[#102b4c] p-6 sm:p-9 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-xl">
            <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f0a27c]">
              <Image src="/brand/pratika-qr-icon.svg" alt="" width={18} height={18} />
              Pratika QR
            </span>
            <h2 className="mb-3 text-2xl font-semibold tracking-tight sm:text-4xl">
              Dijital menünüzü kolayca yönetin.
            </h2>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-blue-100/75 sm:text-base">
              Menünüzü oluşturun, güncelleyin ve müşterilerinizle QR kod üzerinden anında paylaşın.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo/qr-menu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e27d4f] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ef9265]"
              >
                Canlı Demoyu Gör <span aria-hidden="true">↗</span>
              </Link>
              <Link
                href="/qr-menu"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10"
              >
                QR Menüyü Keşfet
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-white/15 bg-[#153657] p-4">
            <div className="mb-4 flex items-center justify-between text-[10px] text-blue-100/60">
              <span>LUNA COFFEE &amp; KITCHEN</span>
              <span>QR MENU</span>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_92px] items-end gap-4">
              <div className="space-y-3">
                <div className="h-2 w-28 rounded-full bg-white/80" />
                <div className="h-2 w-20 rounded-full bg-[#e27d4f]/80" />
                <div className="h-16 rounded-xl bg-white/10" />
              </div>
              <div className="grid aspect-square place-items-center rounded-xl bg-[#f4eee2]">
                <Image src="/brand/pratika-qr-icon.svg" alt="" width={64} height={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
