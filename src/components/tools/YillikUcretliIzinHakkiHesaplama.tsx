'use client';

import { useState } from 'react';


export default function YillikUcretliIzinHakkiHesaplama() {
  const [yearsOfService, setYearsOfService] = useState<number>(3);
  const [age, setAge] = useState<number>(30);
  const [isUndergroundWorker, setIsUndergroundWorker] = useState<boolean>(false);

  const [result, setResult] = useState<{
    entitledDays: number;
    legalArticle: string;
    description: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // 4857 Sayılı İş Kanunu Madde 53:
    // a) 1 yıldan 5 yıla kadar (5 yıl dahil) olanlara 14 gün,
    // b) 5 yıldan fazla 15 yıldan az olanlara 20 gün,
    // c) 15 yıl (dahil) ve daha fazla olanlara 26 gün.
    // Ancak 18 ve daha küçük yaştaki işçilerle 50 ve daha yukarı yaştaki işçilere verilecek yıllık ücretli izin süresi 20 günden az olamaz.
    // Maden / yeraltı işçilerinde dörder gün artırılır.

    if (yearsOfService < 1) {
      setResult({
        entitledDays: 0,
        legalArticle: '4857 SK Madde 53',
        description: 'İş Kanunu uyarınca yıllık ücretli izne hak kazanabilmek için işyerinde en az 1 tam yıl çalışmış olmak şarttır.',
      });
      return;
    }

    let days = 14;
    if (yearsOfService >= 15) {
      days = 26;
    } else if (yearsOfService > 5) {
      days = 20;
    }

    // 18 yaş altı veya 50 yaş üstü koruması: En az 20 gün
    if ((age <= 18 || age >= 50) && days < 20) {
      days = 20;
    }

    if (isUndergroundWorker) {
      days += 4;
    }

    setResult({
      entitledDays: days,
      legalArticle: '4857 sayılı İş Kanunu Madde 53',
      description: `${yearsOfService} yıllık kıdem ve ${age} yaş durumu dikkate alınarak yasal asgari izin hakkınız belirlenmiştir.`,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="ys" className="block text-sm font-medium text-foreground mb-1">Hizmet Süresi (Tam Yıl)</label>
              <input
                id="ys"
                type="number"
                value={yearsOfService}
                onChange={(e) => setYearsOfService(Number(e.target.value))}
                min="0" max="60"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ag" className="block text-sm font-medium text-foreground mb-1">Çalışanın Yaşı</label>
              <input
                id="ag"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                min="14" max="100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ug" className="block text-sm font-medium text-foreground mb-1">İş Kolu Türü</label>
              <select
                id="ug"
                value={isUndergroundWorker ? 'yes' : 'no'}
                onChange={(e) => setIsUndergroundWorker(e.target.value === 'yes')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="no">Standart İş Kolu</option>
                <option value="yes">Yeraltı / Maden İşçisi (+4 gün)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İzin Hakkını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Yasal Yıllık İzin Süresi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Asgari İzin Hakkı</span>
                <span className="text-3xl font-bold text-primary">{result.entitledDays} İş Günü</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yasal Dayanak</span>
                <span className="text-base font-bold text-foreground">{result.legalArticle}</span>
                <span className="text-xs text-muted-foreground block mt-1">{result.description}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
