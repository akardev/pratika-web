'use client';

type SalaryType = 'gross' | 'net';

export default function SalaryTypeSelector({ value, onChange }: { value: SalaryType; onChange: (value: SalaryType) => void }) {
  return (
    <fieldset className="space-y-1.5">
      <legend className="block text-xs font-semibold text-foreground">Maaş Türü</legend>
      <div className="grid grid-cols-2 gap-2">
        {(['gross', 'net'] as const).map((type) => (
          <button
            key={type}
            type="button"
            aria-pressed={value === type}
            onClick={() => onChange(type)}
            className={`min-h-11 rounded-lg border px-3 py-2 text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${value === type ? 'border-primary bg-primary text-primary-foreground shadow-xs' : 'border-border bg-background text-foreground hover:bg-muted/40'}`}
          >
            {type === 'gross' ? 'Brüt Maaş' : 'Net Maaş (Ele Geçen)'}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground">Net girişte brüt karşılık, mevcut vergi/SGK motorunun iteratif hesabıyla bulunur.</p>
    </fieldset>
  );
}
