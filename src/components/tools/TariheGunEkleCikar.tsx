'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { sanitizeNumericInput } from '@/lib/utils';

export default function TariheGunEkleCikar() {
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [amountStr, setAmountStr] = useState<string>('30');
  const [unit, setUnit] = useState<'gun' | 'hafta' | 'ay' | 'yil'>('gun');

  const [result, setResult] = useState<{
    calculatedDateFormatted: string;
    dayOfWeek: string;
    daysDiff: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!baseDate) {
      setError('Lütfen bir başlangıç tarihi seçiniz.');
      return;
    }

    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount < 0) {
      setError('Lütfen geçerli bir miktar giriniz.');
      return;
    }

    const date = new Date(baseDate);
    if (isNaN(date.getTime())) {
      setError('Geçersiz tarih formatı.');
      return;
    }

    const sign = operation === 'add' ? 1 : -1;

    if (unit === 'gun') {
      date.setDate(date.getDate() + sign * amount);
    } else if (unit === 'hafta') {
      date.setDate(date.getDate() + sign * amount * 7);
    } else if (unit === 'ay') {
      date.setMonth(date.getMonth() + sign * amount);
    } else if (unit === 'yil') {
      date.setFullYear(date.getFullYear() + sign * amount);
    }

    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const dayOfWeek = dayNames[date.getDay()];

    const calculatedDateFormatted = date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const diffTime = Math.abs(date.getTime() - new Date(baseDate).getTime());
    const daysDiff = Math.round(diffTime / (1000 * 60 * 60 * 24));

    setResult({
      calculatedDateFormatted,
      dayOfWeek,
      daysDiff,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <DatePicker
                id="baseDate"
                label="Başlangıç Tarihi"
                value={baseDate}
                onChange={setBaseDate}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">İşlem Türü</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOperation('add')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    operation === 'add' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  + İleriye Tarih Ekle
                </button>
                <button
                  type="button"
                  onClick={() => setOperation('subtract')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    operation === 'subtract' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  - Geriye Tarih Çıkar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="amount" className="block text-xs font-medium mb-1 text-foreground">
                  Miktar <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="amount"
                  placeholder="Örn: 30"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Birim</label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as never)}
                >
                  <option value="gun">Gün</option>
                  <option value="hafta">Hafta</option>
                  <option value="ay">Ay</option>
                  <option value="yil">Yıl</option>
                </select>
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
              Hedef Tarihi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplanan Hedef Tarih
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Sonuç Tarihi</span>
                  <span className="font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
                    {result.calculatedDateFormatted}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-3 py-1.5 rounded-md border border-border/80">
                    {result.dayOfWeek} Günü ({result.daysDiff} Gün Fark)
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/iki-tarih-arasi-gun-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    İki tarih arası gün farkı hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Başlangıç tarihini ve eklenecek/çıkarılacak süreyi seçerek yeni tarihi öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Tarihe Gün Ekleme ve Çıkarma</h2>
        <p className="mb-4 text-muted-foreground">
          Resmi süreler, yasal itiraz vadeleri, pasaport/vize süreleri veya proje teslim tarihlerini hesaplamak için başlangıç tarihine gün, hafta veya ay ekleyip çıkarabilirsiniz.
        </p>
      </div>
    </div>
  );
}
