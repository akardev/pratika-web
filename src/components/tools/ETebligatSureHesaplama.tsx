'use client';

import { useState } from 'react';

export default function ETebligatSureHesaplama() {
  const [reachDate, setReachDate] = useState('');
  const [objectionDays, setObjectionDays] = useState(7); // İtiraz / cevap süresi (7, 15, 30 gün)

  const [result, setResult] = useState<{
    deemedServedDate: string;
    finalDeadlineDate: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reachDate) return;

    const reach = new Date(reachDate);
    // Elektronik Tebligat Yönetmeliği 10. Md: Ulaştığı tarihi izleyen 5. günün sonunda tebliğ edilmiş sayılır (+5 gün)
    const deemedServed = new Date(reach.getTime() + (5 * 24 * 60 * 60 * 1000));

    // Yasal süre tebliğ sayıldığı günün ertesinde başlar
    const deadline = new Date(deemedServed.getTime() + (objectionDays * 24 * 60 * 60 * 1000));

    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });

    setResult({
      deemedServedDate: fmt(deemedServed),
      finalDeadlineDate: fmt(deadline),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rd" className="block text-sm font-medium text-foreground mb-1">
                E-Tebligatın UETS Posta Kutusuna Ulaştığı Tarih
              </label>
              <input
                id="rd"
                type="date"
                value={reachDate}
                onChange={(e) => setReachDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="od" className="block text-sm font-medium text-foreground mb-1">
                Yasal İtiraz / Cevap Süresi
              </label>
              <select
                id="od"
                value={objectionDays}
                onChange={(e) => setObjectionDays(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={7}>7 Gün (İcra İtirazı, Ödeme Emri)</option>
                <option value={8}>8 Gün (İş Mahkemesi İstinaf)</option>
                <option value={15}>15 Gün (HMK Dava Cevap Dilekçesi)</option>
                <option value={30}>30 Gün (Vergi / İdare Mahkemesi Dava Açma)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yasal Süreleri Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">E-Tebligat Yasal Süre Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tebliğ Edilmiş Sayıldığı Tarih (5. Gün Kuralı)</span>
                <span className="text-lg font-bold text-foreground">{result.deemedServedDate}</span>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Son İtiraz / Cevap Verme Günü (Mesai Bitimi)</span>
                <span className="text-lg font-bold text-destructive">{result.finalDeadlineDate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
