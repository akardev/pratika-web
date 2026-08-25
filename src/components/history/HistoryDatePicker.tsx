'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

interface HistoryDatePickerProps {
  selectedDate: string;
}

export default function HistoryDatePicker({ selectedDate }: HistoryDatePickerProps) {
  const router = useRouter();
  const [date, setDate] = useState(selectedDate);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!date) return;
    router.push(`/tarihte-bugun/${date}`);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
      <div className="min-w-0">
        <label htmlFor="history-date" className="mb-1.5 block text-xs font-semibold text-foreground">
          Tarih seç
        </label>
        <input
          id="history-date"
          name="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          aria-label="Tarihte Bugün için tarih seç"
          className="h-11 w-full min-w-0 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          required
        />
      </div>
      <button
        type="submit"
        className="h-11 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Tarihi Keşfet
      </button>
    </form>
  );
}
