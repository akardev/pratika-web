'use client';

import { useState, useMemo, useSyncExternalStore } from 'react';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const AMBIGUOUS = '0O1lI|';

const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsClient(): boolean {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);
}

function generateSecurePassword(
  length: number,
  useLower: boolean,
  useUpper: boolean,
  useNum: boolean,
  useSym: boolean,
  avoidAmbiguous: boolean
): string {
  let charPool = '';
  if (useLower) charPool += LOWERCASE;
  if (useUpper) charPool += UPPERCASE;
  if (useNum) charPool += NUMBERS;
  if (useSym) charPool += SYMBOLS;

  if (avoidAmbiguous) {
    charPool = charPool
      .split('')
      .filter((c) => !AMBIGUOUS.includes(c))
      .join('');
  }

  if (!charPool) return '';

  const array = new Uint32Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 1000000);
    }
  }

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charPool[array[i] % charPool.length];
  }
  return result;
}

export default function GuvenliSifreOlusturucu() {
  const isClient = useIsClient();
  const [length, setLength] = useState<number>(16);
  const [useLower, setUseLower] = useState(true);
  const [useUpper, setUseUpper] = useState(true);
  const [useNum, setUseNum] = useState(true);
  const [useSym, setUseSym] = useState(true);
  const [avoidAmbiguous, setAvoidAmbiguous] = useState(false);
  const [manualPassword, setManualPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // When client mounts and isClient becomes true, generate deterministic-free secure password
  const clientGeneratedPassword = useMemo(() => {
    if (!isClient) return '';
    return generateSecurePassword(length, useLower, useUpper, useNum, useSym, avoidAmbiguous);
  }, [isClient, length, useLower, useUpper, useNum, useSym, avoidAmbiguous]);

  const activePassword = manualPassword ?? clientGeneratedPassword;

  const handleGenerate = (
    len = length,
    lower = useLower,
    upper = useUpper,
    num = useNum,
    sym = useSym,
    ambig = avoidAmbiguous
  ) => {
    const newPass = generateSecurePassword(len, lower, upper, num, sym, ambig);
    setManualPassword(newPass);
  };

  const handleLengthChange = (newLen: number) => {
    setLength(newLen);
    setManualPassword(null);
  };

  const handleLowerChange = (checked: boolean) => {
    setUseLower(checked);
    setManualPassword(null);
  };

  const handleUpperChange = (checked: boolean) => {
    setUseUpper(checked);
    setManualPassword(null);
  };

  const handleNumChange = (checked: boolean) => {
    setUseNum(checked);
    setManualPassword(null);
  };

  const handleSymChange = (checked: boolean) => {
    setUseSym(checked);
    setManualPassword(null);
  };

  const handleAmbiguousChange = (checked: boolean) => {
    setAvoidAmbiguous(checked);
    setManualPassword(null);
  };

  const strength = useMemo(() => {
    let score = 0;
    if (length >= 12) score += 1;
    if (length >= 16) score += 1;
    if (useLower && useUpper) score += 1;
    if (useNum) score += 1;
    if (useSym) score += 1;

    if (score <= 2) return { label: 'Zayıf', color: 'text-rose-500 bg-rose-500', percent: 25 };
    if (score === 3) return { label: 'Orta', color: 'text-amber-500 bg-amber-500', percent: 50 };
    if (score === 4) return { label: 'Güçlü', color: 'text-emerald-500 bg-emerald-500', percent: 75 };
    return { label: 'Çok Güçlü', color: 'text-emerald-600 bg-emerald-600', percent: 100 };
  }, [length, useLower, useUpper, useNum, useSym]);

  const handleCopy = () => {
    if (!activePassword) return;
    navigator.clipboard.writeText(activePassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayPassword = isClient
    ? activePassword || (!useLower && !useUpper && !useNum && !useSym ? '' : '••••••••••••••••')
    : '••••••••••••••••';

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        {/* Şifre Görüntüleme Kutusu */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Oluşturulan Güvenli Şifre
            </span>
            <span className={`text-xs font-bold ${strength.color.split(' ')[0]}`}>
              Güç: {strength.label}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-muted/20 border border-border">
            <span className="font-mono text-base sm:text-lg font-bold text-foreground select-all break-all">
              {displayPassword || 'Lütfen en az bir karakter seti seçin.'}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleGenerate()}
                className="p-2.5 rounded-xl bg-muted text-foreground hover:bg-muted/80 active:scale-95 transition-all text-sm font-bold"
                title="Yeni Şifre Üret"
                aria-label="Yeni Şifre Üret"
              >
                ↻ Yenile
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-colors shadow-xs"
              >
                {copied ? 'Kopyalandı!' : 'Kopyala'}
              </button>
            </div>
          </div>

          {/* Güç Gösterge Çubuğu */}
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-3">
            <div
              className={`h-full transition-all duration-300 ${strength.color.split(' ')[1]}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
        </div>

        {/* Ayarlar Grid */}
        <div className="space-y-5 pt-4 border-t border-border/60">
          {/* Uzunluk Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="pass-len" className="text-sm font-semibold text-foreground">
                Şifre Uzunluğu: <span className="text-primary font-bold">{length} Karakter</span>
              </label>
            </div>
            <input
              type="range"
              id="pass-len"
              min={6}
              max={64}
              value={length}
              onChange={(e) => handleLengthChange(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          {/* Karakter Seçenekleri */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useUpper}
                onChange={(e) => handleUpperChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground font-medium">Büyük Harfler (A-Z)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useLower}
                onChange={(e) => handleLowerChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground font-medium">Küçük Harfler (a-z)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useNum}
                onChange={(e) => handleNumChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground font-medium">Rakamlar (0-9)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={useSym}
                onChange={(e) => handleSymChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground font-medium">Özel Simgeler (!@#$%^&*)</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer col-span-1 sm:col-span-2">
              <input
                type="checkbox"
                checked={avoidAmbiguous}
                onChange={(e) => handleAmbiguousChange(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-muted-foreground font-medium">
                Karışabilecek benzer karakterleri hariç tut (0, O, 1, l, I)
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Bilgilendirme ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Şifre Güvenliği &amp; Web Crypto API</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Standart rastgele sayı üreteçleri (`Math.random()`) tahmin edilebilir algoritmalar kullanır. Pratiksel Şifre Oluşturucu, tarayıcınızın kriptografik olarak güvenli <strong>Web Crypto API (`crypto.getRandomValues`)</strong> donanım entropisini kullanır. Üretilen hiçbir parola sunucuya iletilmez.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">İdeal bir şifre kaç karakter olmalıdır?</h3>
              <p className="text-muted-foreground">
                Siber güvenlik otoriteleri, kaba kuvvet (brute-force) saldırılarına karşı en az <strong>14–16 karakter</strong> uzunluğunda, harf, rakam ve sembol içeren parolalar kullanılmasını önerir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Üretilen şifre kaydediliyor mu?</h3>
              <p className="text-muted-foreground">
                Kesinlikle hayır. Tüm şifre üretim süreci istemci tarafında (cihazınızda) anlık olarak işlenir ve sayfayı kapattığınızda bellekten silinir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
