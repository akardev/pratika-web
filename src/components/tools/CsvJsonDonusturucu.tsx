'use client';

import { useState } from 'react';

export default function CsvJsonDonusturucu() {
  const [csvText, setCsvText] = useState('ad,soyad,sehir\nAhmet,Yilmaz,Istanbul\nAyse,Kaya,Ankara\nMehmet,Demir,Izmir');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    try {
      const lines = csvText.trim().split('\n');
      if (lines.length < 2) {
        setError('En az 1 başlık ve 1 veri satırı girilmelidir.');
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const currentline = lines[i].split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const obj: Record<string, string> = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j] || '';
        }
        result.push(obj);
      }

      setJsonOutput(JSON.stringify(result, null, 2));
    } catch {
      setError('CSV ayrıştırılırken hata oluştu.');
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="csv" className="block text-sm font-medium text-foreground mb-1">CSV Verisi (Virgülle Ayrılmış)</label>
          <textarea
            id="csv"
            rows={6}
            value={csvText}
            onChange={(e) => setCsvText(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        {error && <p className="text-sm text-destructive font-medium">{error}</p>}

        <button
          type="button"
          onClick={handleConvert}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          JSON Formatına Dönüştür
        </button>

        {jsonOutput && (
          <div className="mt-8 pt-6 border-t border-border space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">JSON Çıktısı:</span>
            <pre className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-xs overflow-x-auto select-all text-foreground">
              {jsonOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
