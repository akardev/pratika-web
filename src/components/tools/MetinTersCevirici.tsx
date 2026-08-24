'use client';

import { useState } from 'react';

export default function MetinTersCevirici() {
  const [inputText, setInputText] = useState<string>('ey edip adanada pide ye');
  const [outputText, setOutputText] = useState<string>('ey edip adanada pide ye');
  const [isPalindrome, setIsPalindrome] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const checkPalindrome = (str: string) => {
    const clean = str.replace(/[\s\p{P}]/gu, '').toLowerCase();
    const reversed = clean.split('').reverse().join('');
    return clean.length > 1 && clean === reversed;
  };

  const handleReverseChars = () => {
    const res = inputText.split('').reverse().join('');
    setOutputText(res);
    setIsPalindrome(checkPalindrome(inputText));
  };

  const handleReverseWords = () => {
    const res = inputText.split(/\s+/).reverse().join(' ');
    setOutputText(res);
  };

  const handleReverseLines = () => {
    const res = inputText.split('\n').reverse().join('\n');
    setOutputText(res);
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-1.5 text-foreground">
              Ters Çevrilecek Metin
            </label>
            <textarea
              id="input"
              rows={4}
              placeholder="Metninizi buraya yazın..."
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setIsPalindrome(checkPalindrome(e.target.value));
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={handleReverseChars}
              className="py-2.5 px-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
            >
              🔄 Harf Harf Ters Çevir
            </button>
            <button
              type="button"
              onClick={handleReverseWords}
              className="py-2.5 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              🔁 Kelime Kelime Ters Çevir
            </button>
            <button
              type="button"
              onClick={handleReverseLines}
              className="py-2.5 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              🔃 Satır Satır Ters Çevir
            </button>
          </div>

          {isPalindrome && (
            <div className="p-3 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-500/20 text-center">
              ✨ Bu metin bir Palindrom&apos;dur! (Düzden ve tersten okunuşu aynıdır).
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output" className="block text-sm font-medium text-foreground">
                Ters Çevrilmiş Sonuç
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
              >
                {copied ? 'Kopyalandı! ✓' : 'Kopyala'}
              </button>
            </div>
            <textarea
              id="output"
              rows={4}
              readOnly
              className="w-full rounded-lg border border-border bg-muted/30 p-3 text-foreground font-mono text-sm focus:outline-none"
              value={outputText}
            />
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Palindrom ve Metin Ters Çevirme</h2>
        <p className="mb-4 text-muted-foreground">
          Palindrom, tersten okunduğunda da aynı olan kelime veya cümlelerdir (Örn: &quot;kazak&quot;, &quot;ey edip adanada pide ye&quot;, &quot;traşını ol da traş ol&quot;).
        </p>
      </div>
    </div>
  );
}
