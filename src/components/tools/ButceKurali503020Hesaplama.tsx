'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ButceKurali503020Hesaplama() {
  const [salaryStr, setSalaryStr] = useState('45000'); // Aylık net maaş

  const salary = parseTurkishNumber(salaryStr) || 0;
  const needs = salary * 0.50; // %50 Zorunlu İhtiyaçlar
  const wants = salary * 0.30; // %30 Kişisel İstekler
  const savings = salary * 0.20; // %20 Tasarruf & Yatırım

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="max-w-xs">
          <label htmlFor="sal" className="block text-sm font-medium text-foreground mb-1">Aylık Net Gelir / Maaş (TL)</label>
          <input
            id="sal"
            type="text"
            value={salaryStr}
            onChange={(e) => setSalaryStr(sanitizeNumericInput(e.target.value))}
            className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
          />
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">50/30/20 İdeal Bütçe Dağılımı</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <span className="text-xs text-muted-foreground block mb-1">Zorunlu İhtiyaçlar (%50)</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatNumber(needs)} ₺</span>
              <span className="text-xs text-muted-foreground block mt-1">Kira, faturalar, market, ulaşım</span>
            </div>
            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <span className="text-xs text-muted-foreground block mb-1">Kişisel İstekler (%30)</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatNumber(wants)} ₺</span>
              <span className="text-xs text-muted-foreground block mt-1">Dışarıda yemek, eğlence, hobi, tatil</span>
            </div>
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
              <span className="text-xs text-muted-foreground block mb-1">Tasarruf & Yatırım (%20)</span>
              <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{formatNumber(savings)} ₺</span>
              <span className="text-xs text-muted-foreground block mt-1">Acil durum fonu, borsa, altın, borç kapama</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
