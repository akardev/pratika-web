'use client';

import { useState } from 'react';

export default function RastgelePinUretici() {
  const [digits, setDigits] = useState(4);
  const [avoidConsecutive, setAvoidConsecutive] = useState(true);
  const [count, setCount] = useState(5);
  const [pins, setPins] = useState<string[]>([]);

  const generatePins = () => {
    const list: string[] = [];
    while (list.length < count) {
      const arr = new Uint8Array(digits);
      crypto.getRandomValues(arr);
      const pin = Array.from(arr).map(n => n % 10).join('');

      if (avoidConsecutive) {
        // 1111 veya 1234 veya 4321 gibi basit örüntüleri filtrele
        const isRepeated = /^(\d)\1+$/.test(pin);
        const isAscending = '0123456789'.includes(pin);
        const isDescending = '9876543210'.includes(pin);
        if (isRepeated || isAscending || isDescending) continue;
      }

      list.push(pin);
    }
    setPins(list);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="dig" className="block text-sm font-medium text-foreground mb-1">PIN Hane Sayısı</label>
            <select
              id="dig"
              value={digits}
              onChange={(e) => setDigits(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value={4}>4 Haneli (Banka / Kasa)</option>
              <option value={6}>6 Haneli (Telefon / OTP)</option>
              <option value={8}>8 Haneli (Yüksek Güvenlik)</option>
            </select>
          </div>
          <div>
            <label htmlFor="cnt" className="block text-sm font-medium text-foreground mb-1">Üretilecek Adet</label>
            <select
              id="cnt"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value={1}>1 Adet</option>
              <option value={5}>5 Adet</option>
              <option value={10}>10 Adet</option>
            </select>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={avoidConsecutive}
                onChange={(e) => setAvoidConsecutive(e.target.checked)}
                className="rounded border-border"
              />
              Ardışık/Tekrar Edenleri Engelle
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={generatePins}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Güvenli PIN Üret
        </button>

        {pins.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Üretilen PIN Kodları:</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {pins.map((p, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/40 border border-border text-center font-mono font-bold text-xl tracking-widest text-primary select-all">
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
