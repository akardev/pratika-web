'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber } from '@/lib/utils';

export default function BioritimHesaplama() {
  const [birthDate, setBirthDate] = useState<string>('1995-05-15');
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);

  const [result, setResult] = useState<{
    daysLived: number;
    physical: number; // 23 gün
    emotional: number; // 28 gün
    intellectual: number; // 33 gün
    overallAverage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!birthDate || !targetDate) {
      setError('Lütfen doğum tarihini ve hedef tarihi seçiniz.');
      return;
    }

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      setError('Geçersiz tarih formatı.');
      return;
    }
    if (target < birth) {
      setError('Hedef tarih doğum tarihinden önce olamaz.');
      return;
    }

    const diffTime = target.getTime() - birth.getTime();
    const daysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Biyoritim sinüs formülü: sin(2 * π * t / T) * 100
    const physical = Math.sin((2 * Math.PI * daysLived) / 23) * 100;
    const emotional = Math.sin((2 * Math.PI * daysLived) / 28) * 100;
    const intellectual = Math.sin((2 * Math.PI * daysLived) / 33) * 100;
    const overallAverage = (physical + emotional + intellectual) / 3;

    setResult({
      daysLived,
      physical,
      emotional,
      intellectual,
      overallAverage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DatePicker
                id="birthDate"
                label="Doğum Tarihiniz"
                value={birthDate}
                onChange={setBirthDate}
                required
              />
              <DatePicker
                id="targetDate"
                label="Hesaplanacak Tarih"
                value={targetDate}
                onChange={setTargetDate}
                required
              />
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
              Biyoritmi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Biyoritim Enerji Seviyeleriniz
                </h3>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-foreground">💪 Fiziksel Enerji (23 Günlük Döngü):</span>
                      <span className={result.physical >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'}>
                        %{formatNumber(result.physical, 1)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${result.physical >= 0 ? 'bg-emerald-500' : 'bg-destructive'}`}
                        style={{ width: `${Math.abs(result.physical)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-foreground">❤️ Duygusal Durum (28 Günlük Döngü):</span>
                      <span className={result.emotional >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-destructive'}>
                        %{formatNumber(result.emotional, 1)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${result.emotional >= 0 ? 'bg-blue-500' : 'bg-destructive'}`}
                        style={{ width: `${Math.abs(result.emotional)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-foreground">🧠 Zihinsel / Odaklanma (33 Günlük Döngü):</span>
                      <span className={result.intellectual >= 0 ? 'text-primary' : 'text-destructive'}>
                        %{formatNumber(result.intellectual, 1)}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full ${result.intellectual >= 0 ? 'bg-primary' : 'bg-destructive'}`}
                        style={{ width: `${Math.abs(result.intellectual)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 mt-4 text-center text-xs text-muted-foreground">
                  Hayatınızın <strong className="text-foreground font-semibold">{result.daysLived}</strong>. günündesiniz.
                </div>

                <div className="mt-4 p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 rounded-lg text-xs text-amber-800 dark:text-amber-300 text-left">
                  ⚠️ <strong>Eğlence ve Motivasyon Amaçlıdır:</strong> Biyoritim hesaplaması 19. yüzyıl ritim kuramına dayanır ve bilimsel / tıbbi bir kanıt niteliği taşımaz. Kişisel planlama ve motivasyon amaçlı kullanılmalıdır.
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yas-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yaş hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğum tarihinizi girerek fiziksel, duygusal ve zihinsel biyoritminizi öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Biyoritim Nedir ve Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Biyoritim teorisi, insanın doğumundan itibaren fiziksel (23 gün), duygusal (28 gün) ve zihinsel (33 gün) döngüler halinde tekrarlayan enerji dalgalanmalarına sahip olduğunu savunur.
        </p>
      </div>
    </div>
  );
}
