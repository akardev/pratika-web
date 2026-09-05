'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunesPaneliHesaplama() {
  const [dailyKwhStr, setDailyKwhStr] = useState('8.5'); // Günlük tüketim kWh
  const [sunHours, setSunHours] = useState(5); // Ortalama günlük güneşlenme saati
  const [panelWatt, setPanelWatt] = useState(450); // Panel gücü W

  const [result, setResult] = useState<{
    totalSystemWatt: number;
    panelCount: number;
    batteryCapacityAh: number;
    inverterKw: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const dailyKwh = parseTurkishNumber(dailyKwhStr);
    if (isNaN(dailyKwh) || dailyKwh <= 0) return;

    // %25 kayıp/tolerans payı ekle
    const neededDailyWatt = dailyKwh * 1000 * 1.25;
    const systemWatt = neededDailyWatt / sunHours;
    const panelCount = Math.ceil(systemWatt / panelWatt);

    // 12V akü kapasitesi tahmini (Wh / 12V / 0.5 derin deşarj payı)
    const batteryAh = Math.round((neededDailyWatt / 12) * 1.5);
    const inverterKw = Math.round((systemWatt / 1000) * 1.5 * 10) / 10;

    setResult({
      totalSystemWatt: Math.round(systemWatt),
      panelCount,
      batteryCapacityAh: batteryAh,
      inverterKw: Math.max(1.5, inverterKw),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="kwh" className="block text-sm font-medium text-foreground mb-1">Günlük Tüketim (kWh)</label>
              <input
                id="kwh"
                type="text"
                value={dailyKwhStr}
                onChange={(e) => setDailyKwhStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="sh" className="block text-sm font-medium text-foreground mb-1">Güneşlenme Süresi (Saat/Gün)</label>
              <select
                id="sh"
                value={sunHours}
                onChange={(e) => setSunHours(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={4}>4 Saat (Kış / Kuzey)</option>
                <option value={5}>5 Saat (Türkiye Ortalaması)</option>
                <option value={6}>6 Saat (Ege / Akdeniz Yaz)</option>
                <option value={7}>7 Saat (Güneydoğu)</option>
              </select>
            </div>
            <div>
              <label htmlFor="pw" className="block text-sm font-medium text-foreground mb-1">Panel Birim Gücü (Watt)</label>
              <select
                id="pw"
                value={panelWatt}
                onChange={(e) => setPanelWatt(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={400}>400 Watt Monokristal</option>
                <option value={450}>450 Watt Half-Cut</option>
                <option value={550}>550 Watt Yüksek Güç</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sistem İhtiyacını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Gereken Güneş Enerjisi Donanımı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs text-muted-foreground block mb-1">Gereken Güneş Paneli</span>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{result.panelCount} Adet</span>
                <span className="text-xs text-muted-foreground block mt-1">({panelWatt}W Paneller)</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Sistem Gücü</span>
                <span className="text-xl font-bold text-primary">{formatNumber(result.totalSystemWatt)} Watt</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tavsiye Akü Kapasitesi</span>
                <span className="text-xl font-bold text-foreground">~{result.batteryCapacityAh} Ah (12V)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tavsiye İnverter</span>
                <span className="text-xl font-bold text-foreground">{result.inverterKw} kW Akıllı</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
