'use client';

import { useState, useMemo, useSyncExternalStore } from 'react';
import { sanitizeNumericInput } from '@/lib/utils';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsClient(): boolean {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

function generateSingleUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateUuidList(count: number, uppercase: boolean, removeHyphens: boolean): string[] {
  const list: string[] = [];
  const safeCount = Math.max(1, Math.min(count || 1, 50));

  for (let i = 0; i < safeCount; i++) {
    let id = generateSingleUuid();
    if (removeHyphens) {
      id = id.replace(/-/g, '');
    }
    if (uppercase) {
      id = id.toUpperCase();
    }
    list.push(id);
  }
  return list;
}

export default function UuidOlusturucu() {
  const isClient = useIsClient();
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
  const [manualUuids, setManualUuids] = useState<string[] | null>(null);
  const [copied, setCopied] = useState(false);

  // When client mounts and isClient becomes true, generate deterministic-free UUIDs
  const clientGeneratedUuids = useMemo(() => {
    if (!isClient) return [];
    return generateUuidList(count, uppercase, removeHyphens);
  }, [isClient, count, uppercase, removeHyphens]);

  const activeUuids = manualUuids ?? clientGeneratedUuids;

  const handleGenerate = (cnt = count, upper = uppercase, noHyphen = removeHyphens) => {
    setManualUuids(generateUuidList(cnt, upper, noHyphen));
  };

  const handleCountChange = (newCount: number) => {
    const safe = Math.max(1, Math.min(newCount || 1, 50));
    setCount(safe);
    setManualUuids(null);
  };

  const handleUpperChange = (checked: boolean) => {
    setUppercase(checked);
    setManualUuids(null);
  };

  const handleHyphenChange = (checked: boolean) => {
    setRemoveHyphens(checked);
    setManualUuids(null);
  };

  const handleCopyAll = () => {
    if (!isClient || activeUuids.length === 0) return;
    navigator.clipboard.writeText(activeUuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySingle = (id: string) => {
    if (!id || id.includes('•')) return;
    navigator.clipboard.writeText(id);
  };

  const displayUuids =
    isClient && activeUuids.length > 0
      ? activeUuids
      : Array.from(
          { length: Math.max(1, Math.min(count || 1, 50)) },
          () => '••••••••-••••-4•••-••••-••••••••••••'
        );

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        {/* Ayarlar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="uuid-count" className="block text-sm font-semibold text-foreground mb-2">
              Üretilecek Adet (1 - 50)
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="uuid-count"
              value={count}
              onChange={(e) => {
                const cleaned = sanitizeNumericInput(e.target.value, { allowDecimal: false });
                const num = parseInt(cleaned) || 1;
                handleCountChange(Math.max(1, Math.min(num, 50)));
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            />
          </div>

          <div className="flex flex-col justify-center space-y-2 pt-2 sm:pt-6">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => handleUpperChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>Büyük Harf (A-Z)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
              <input
                type="checkbox"
                checked={removeHyphens}
                onChange={(e) => handleHyphenChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span>Tireleri Kaldır</span>
            </label>
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={() => handleGenerate()}
              className="w-full h-11 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-xs"
            >
              ↻ Yeniden Üret
            </button>
          </div>
        </div>

        {/* Sonuç Listesi */}
        <div className="border-t border-border/60 pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Üretilen UUID v4 Listesi ({displayUuids.length})
            </span>
            <button
              type="button"
              onClick={handleCopyAll}
              className="text-xs font-semibold text-primary hover:underline"
            >
              {copied ? 'Tümü Kopyalandı!' : 'Tümünü Kopyala'}
            </button>
          </div>

          <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
            {displayUuids.map((id, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-3 rounded-xl bg-muted/20 border border-border/80 hover:border-primary/40 transition-all group"
              >
                <span className="font-mono text-xs sm:text-sm text-foreground select-all break-all">
                  {id}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopySingle(id)}
                  className="shrink-0 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors px-2 py-1 rounded hover:bg-muted"
                  title="Kopyala"
                >
                  Kopyala
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bilgilendirme ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">UUID v4 (GUID) Nedir?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            UUID (Universally Unique Identifier), veritabanlarında, yazılımlarda ve dağıtık sistemlerde çakışma olasılığı matematiksel olarak sıfıra yakın benzersiz 128-bitlik tanımlayıcılardır. Sürüm 4 (Version 4), kriptografik rastgeleliğe dayanır.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">UUID v4 çakışma ihtimali var mı?</h3>
              <p className="text-muted-foreground">
                Teorik olarak evet, ancak pratikte 1 milyar UUID üretilse dahi çakışma olasılığı ihmal edilebilecek kadar düşüktür (10^-18&apos;den az).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">UUID ile GUID arasındaki fark nedir?</h3>
              <p className="text-muted-foreground">
                GUID (Globally Unique Identifier), Microsoft ekosisteminde kullanılan UUID terimidir. İkisi aynı yapıyı ve standardı temsil eder.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
