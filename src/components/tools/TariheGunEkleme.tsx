'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import DatePicker from '@/components/ui/DatePicker';

export default function TariheGunEkleme() {
  const [baseDateStr, setBaseDateStr] = useState<string>('2026-08-24');
  const [amountStr, setAmountStr] = useState<string>('30');
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');

  const [targetDateStr, setTargetDateStr] = useState<string | null>(null);
  const [targetDayName, setTargetDayName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTargetDateStr(null);

    if (!baseDateStr) {
      setError('Lütfen bir başlangıç tarihi seçin veya yazın.');
      return;
    }

    if (!amountStr.trim()) {
      setError('Miktar boş bırakılamaz.');
      return;
    }

    const amount = parseTurkishNumber(amountStr);
    if (isNaN(amount) || !Number.isInteger(amount) || amount <= 0) {
      setError('Miktar pozitif bir tam sayı olmalıdır.');
      return;
    }

    const d = new Date(baseDateStr + 'T00:00:00');
    if (isNaN(d.getTime())) {
      setError('Geçerli bir tarih seçin.');
      return;
    }

    const factor = operation === 'add' ? 1 : -1;

    if (unit === 'days') {
      d.setDate(d.getDate() + amount * factor);
    } else if (unit === 'weeks') {
      d.setDate(d.getDate() + amount * 7 * factor);
    } else if (unit === 'months') {
      d.setMonth(d.getMonth() + amount * factor);
    } else if (unit === 'years') {
      d.setFullYear(d.getFullYear() + amount * factor);
    }

    setTargetDateStr(d.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }));
    setTargetDayName(d.toLocaleDateString('tr-TR', { weekday: 'long' }));
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-2">
              <button
                type="button"
                onClick={() => setOperation('add')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  operation === 'add'
                    ? 'bg-card text-foreground shadow-xs border border-border/80'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                + Süre Ekle
              </button>
              <button
                type="button"
                onClick={() => setOperation('subtract')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  operation === 'subtract'
                    ? 'bg-card text-foreground shadow-xs border border-border/80'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                - Süre Çıkar
              </button>
            </div>

            <DatePicker
              id="baseDate"
              label="Başlangıç Tarihi"
              required
              value={baseDateStr}
              onChange={setBaseDateStr}
              placeholder="24.08.2026"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-xs font-semibold mb-1.5 text-foreground">
                  Miktar <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="amount"
                  placeholder="30"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
              </div>

              <div>
                <label htmlFor="unit" className="block text-xs font-semibold mb-1.5 text-foreground">
                  Birim
                </label>
                <select
                  id="unit"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value as 'days' | 'weeks' | 'months' | 'years')}
                >
                  <option value="days">Gün</option>
                  <option value="weeks">Hafta</option>
                  <option value="months">Ay</option>
                  <option value="years">Yıl</option>
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
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hedef Tarihi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {targetDateStr ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplanan Hedef Tarih
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{targetDayName}</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                    {targetDateStr}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tarih ve süre girip hedef günü bulun.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
