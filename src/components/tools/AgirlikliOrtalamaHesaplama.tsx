'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface Row {
  id: string;
  value: string;
  weight: string;
}

export default function AgirlikliOrtalamaHesaplama() {
  const [rows, setRows] = useState<Row[]>([
    { id: '1', value: '80', weight: '3' },
    { id: '2', value: '90', weight: '4' },
    { id: '3', value: '70', weight: '2' },
  ]);

  const [weightedMean, setWeightedMean] = useState<number | null>(null);
  const [totalWeight, setTotalWeight] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addRow = () => {
    setRows([...rows, { id: Date.now().toString(), value: '', weight: '' }]);
  };

  const removeRow = (id: string) => {
    if (rows.length > 2) {
      setRows(rows.filter((r) => r.id !== id));
    }
  };

  const updateRow = (id: string, field: 'value' | 'weight', val: string) => {
    const sanitized = sanitizeNumericInput(val, { allowDecimal: true });
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: sanitized } : r)));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setWeightedMean(null);
    setTotalWeight(null);

    let sumWeighted = 0;
    let sumWeights = 0;

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (!r.value.trim() || !r.weight.trim()) {
        setError(`Lütfen ${i + 1}. satırdaki tüm alanları doldurun.`);
        return;
      }

      const val = parseTurkishNumber(r.value);
      const weight = parseTurkishNumber(r.weight);

      if (isNaN(val) || isNaN(weight) || weight <= 0) {
        setError(`${i + 1}. satırda geçerli bir değer ve 0&apos;dan büyük ağırlık/kredi girin.`);
        return;
      }

      sumWeighted += val * weight;
      sumWeights += weight;
    }

    if (sumWeights === 0) {
      setError('Toplam ağırlık/kredi 0 olamaz.');
      return;
    }

    setWeightedMean(sumWeighted / sumWeights);
    setTotalWeight(sumWeights);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-muted-foreground px-1">
                <span className="col-span-6">Not / Değer</span>
                <span className="col-span-4">Kredi / Ağırlık</span>
                <span className="col-span-2 text-center">İşlem</span>
              </div>

              {rows.map((r, index) => (
                <div key={r.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-6">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder={`Not ${index + 1}`}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={r.value}
                      onChange={(e) => updateRow(r.id, 'value', e.target.value)}
                    />
                  </div>

                  <div className="col-span-4">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Kredi"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      value={r.weight}
                      onChange={(e) => updateRow(r.id, 'weight', e.target.value)}
                    />
                  </div>

                  <div className="col-span-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeRow(r.id)}
                      disabled={rows.length <= 2}
                      className="text-xs text-destructive hover:bg-destructive/10 disabled:opacity-30 p-2 rounded-md transition-colors"
                      title="Satırı sil"
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRow}
              className="text-xs font-semibold text-primary hover:underline block pt-1"
            >
              + Yeni Satır / Ders Ekle
            </button>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Ağırlıklı Ortalamayı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {weightedMean !== null ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Ağırlıklı Genel Ortalama</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(weightedMean)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Toplam Kredi / Ağırlık: <strong>{formatNumber(totalWeight || 0)}</strong>
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Ders notlarını ve kredilerini girip hesaplayın.</p>
                <p className="text-xs text-muted-foreground mt-1">Ağırlıklı not ortalaması burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ağırlıklı Ortalama (GANO) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Her bir dersin notu o dersin kredi katsayısıyla çarpılır, elde edilen çarpımlar toplanarak toplam kredi sayısına bölünür.
        </p>
      </div>
    </div>
  );
}
