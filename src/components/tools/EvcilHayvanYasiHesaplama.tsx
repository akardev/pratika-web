'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EvcilHayvanYasiHesaplama() {
  const [petType, setPetType] = useState<'kedi' | 'kopek'>('kedi');
  const [dogSize, setDogSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [ageStr, setAgeStr] = useState<string>('4');

  const [result, setResult] = useState<{
    petAge: number;
    humanEquivalentAge: number;
    lifeStage: string;
    stageDescription: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const age = parseTurkishNumber(ageStr);
    if (isNaN(age) || age < 0.1 || age > 30) {
      setError('Lütfen 0.1 ile 30 arasında geçerli bir yaş giriniz.');
      return;
    }

    let humanEquivalentAge = 0;

    if (petType === 'kedi') {
      // Kedi: 1. yaş = 15 insan yaşı, 2. yaş = 24 insan yaşı, sonraki her yıl +4
      if (age <= 1) {
        humanEquivalentAge = age * 15;
      } else if (age <= 2) {
        humanEquivalentAge = 15 + (age - 1) * 9;
      } else {
        humanEquivalentAge = 24 + (age - 2) * 4;
      }
    } else {
      // Köpek (Boyut bazlı modern AVMA skalası)
      if (dogSize === 'small') {
        // Küçük ırk (<10 kg)
        if (age <= 1) humanEquivalentAge = age * 15;
        else if (age <= 2) humanEquivalentAge = 15 + (age - 1) * 9;
        else humanEquivalentAge = 24 + (age - 2) * 4;
      } else if (dogSize === 'medium') {
        // Orta ırk (10-25 kg)
        if (age <= 1) humanEquivalentAge = age * 15;
        else if (age <= 2) humanEquivalentAge = 15 + (age - 1) * 9;
        else humanEquivalentAge = 24 + (age - 2) * 5;
      } else {
        // Büyük ırk (>25 kg)
        if (age <= 1) humanEquivalentAge = age * 14;
        else if (age <= 2) humanEquivalentAge = 14 + (age - 1) * 9;
        else humanEquivalentAge = 23 + (age - 2) * 7;
      }
    }

    let lifeStage = 'Yetişkin';
    let stageDescription = 'Enerjik ve sağlıklı olgunluk dönemi.';

    if (humanEquivalentAge < 15) {
      lifeStage = 'Yavru (Kitten / Puppy)';
      stageDescription = 'Hızlı büyüme ve keşif dönemi.';
    } else if (humanEquivalentAge < 25) {
      lifeStage = 'Genç (Adolescent)';
      stageDescription = 'Gelişimini tamamlamış genç yetişkinlik.';
    } else if (humanEquivalentAge >= 50) {
      lifeStage = 'Kıdemli / Yaşlı (Senior)';
      stageDescription = 'Düzenli veteriner kontrolleri ve özel beslenme gereken dönem.';
    }

    setResult({
      petAge: age,
      humanEquivalentAge: Math.round(humanEquivalentAge),
      lifeStage,
      stageDescription,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Evcil Hayvan Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPetType('kedi')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    petType === 'kedi' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  🐱 Kedi
                </button>
                <button
                  type="button"
                  onClick={() => setPetType('kopek')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    petType === 'kopek' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  🐶 Köpek
                </button>
              </div>
            </div>

            {petType === 'kopek' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-foreground">
                  Köpek Irk Boyutu
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDogSize('small')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      dogSize === 'small' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                    }`}
                  >
                    Küçük (&lt;10 kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDogSize('medium')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      dogSize === 'medium' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                    }`}
                  >
                    Orta (10-25 kg)
                  </button>
                  <button
                    type="button"
                    onClick={() => setDogSize('large')}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      dogSize === 'large' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                    }`}
                  >
                    Büyük (&gt;25 kg)
                  </button>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="petAge" className="block text-sm font-medium mb-1 text-foreground">
                Evcil Hayvanınızın Yaşı <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="petAge"
                  placeholder="Örn: 4"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={ageStr}
                  onChange={(e) => setAgeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Yaşında</div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              İnsan Yaşı Karşılığını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  İnsan Yaşı Eşdeğeri
                </h3>

                <div className="text-5xl mb-2">{petType === 'kedi' ? '🐱' : '🐶'}</div>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {result.humanEquivalentAge} Yaşında
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  {result.lifeStage}
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 text-xs text-muted-foreground">
                  {result.stageDescription}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yas-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kendi yaşınızı ve gün sayınızı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kedi veya köpeğinizin yaşını girerek insan yaşı karşılığını öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kedi ve Köpek Yaşı İnsan Yaşına Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Yaygın bilinen &quot;1 kedi/köpek yılı = 7 insan yılı&quot; kuralı bilimsel olarak eksiktir. Evcil hayvanlar ilk 2 yıllarında çok hızlı gelişir (1 yaş ≈ 15 insan yaşı, 2 yaş ≈ 24 insan yaşı) ve sonrasında yılda ortalama 4-5 insan yılı yaşlanırlar.
        </p>
      </div>
    </div>
  );
}
