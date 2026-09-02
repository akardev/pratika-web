'use client';

import { useState } from 'react';

export default function CronIfadeOlusturucu() {
  const [minute, setMinute] = useState<string>('*/15');
  const [hour, setHour] = useState<string>('*');
  const [dayOfMonth, setDayOfMonth] = useState<string>('*');
  const [month, setMonth] = useState<string>('*');
  const [dayOfWeek, setDayOfWeek] = useState<string>('*');

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const getExplanation = () => {
    let text = '';
    if (minute === '*/15' && hour === '*') text = 'Her 15 dakikada bir çalışır.';
    else if (minute === '0' && hour === '0') text = 'Her gece yarısı (00:00) bir kez çalışır.';
    else if (minute === '0' && hour === '*/2') text = 'Her 2 saatte bir saat başında çalışır.';
    else if (minute === '0' && hour === '9' && dayOfWeek === '1-5') text = 'Hafta içi her sabah saat 09:00\'da çalışır.';
    else if (minute === '*' && hour === '*') text = 'Her dakikada bir aralıksız çalışır.';
    else text = `Dakika: ${minute}, Saat: ${hour}, Gün: ${dayOfMonth}, Ay: ${month}, Hafta Günü: ${dayOfWeek} zamanlamasında çalışır.`;
    return text;
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Hızlı Hazır Şablonlar</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Her 15 Dakika', m: '*/15', h: '*', dom: '*', mon: '*', dow: '*' },
              { label: 'Her Saat Başı', m: '0', h: '*', dom: '*', mon: '*', dow: '*' },
              { label: 'Her Gece Yarısı', m: '0', h: '0', dom: '*', mon: '*', dow: '*' },
              { label: 'Hafta İçi Sabah 09:00', m: '0', h: '9', dom: '*', mon: '*', dow: '1-5' },
              { label: 'Ayın 1. Günü 00:00', m: '0', h: '0', dom: '1', mon: '*', dow: '*' },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setMinute(p.m);
                  setHour(p.h);
                  setDayOfMonth(p.dom);
                  setMonth(p.mon);
                  setDayOfWeek(p.dow);
                }}
                className="text-xs px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-medium"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Dakika (0-59)</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Saat (0-23)</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Ayın Günü (1-31)</label>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Ay (1-12)</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono text-center"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Hafta Günü (0-6)</label>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono text-center"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-1">
          <span className="text-xs text-muted-foreground block">Oluşturulan Cron İfadesi:</span>
          <span className="text-2xl font-bold font-mono text-primary block">{cronExpression}</span>
          <span className="text-xs font-medium text-foreground block pt-1">{getExplanation()}</span>
        </div>
      </div>
    </div>
  );
}
