'use client';

import { useState } from 'react';

const MORSE_MAP: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'Ç': '-.-..', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'Ğ': '--.-.', 'H': '....', 'I': '..', 'İ': '..', 'J': '.---', 'K': '-.-',
  'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'Ö': '---.', 'P': '.--.', 'R': '.-.',
  'S': '...', 'Ş': '----', 'T': '-', 'U': '..-', 'Ü': '..--', 'V': '...-', 'Y': '-.--',
  'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
  '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
  ' ': '/', '.': '.-.-.-', ',': '--..--', '?': '..--..', '!': '-.-.--',
};

const REVERSE_MORSE_MAP: Record<string, string> = {};
Object.entries(MORSE_MAP).forEach(([char, code]) => {
  REVERSE_MORSE_MAP[code] = char;
});

export default function MorsAlfabesiCevirici() {
  const [textInput, setTextInput] = useState<string>('PRATIKSEL');
  const [morseInput, setMorseInput] = useState<string>('.--. .-. .- - .. -.- .-');

  const handleTextChange = (val: string) => {
    setTextInput(val);
    const upper = val.toLocaleUpperCase('tr-TR');
    const morseResult = upper
      .split('')
      .map(ch => MORSE_MAP[ch] || '')
      .filter(Boolean)
      .join(' ');
    setMorseInput(morseResult);
  };

  const handleMorseChange = (val: string) => {
    setMorseInput(val);
    const tokens = val.trim().split(/\s+/);
    const textResult = tokens
      .map(token => token === '/' ? ' ' : (REVERSE_MORSE_MAP[token] || '?'))
      .join('');
    setTextInput(textResult);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <label htmlFor="tin" className="block text-sm font-medium text-foreground mb-1.5">Metin (Türkçe / Latin)</label>
          <textarea
            id="tin"
            rows={3}
            value={textInput}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-sans"
          />
        </div>

        <div className="flex items-center justify-center text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          ⇅ Çift Yönlü Anlık Dönüşüm
        </div>

        <div>
          <label htmlFor="min" className="block text-sm font-medium text-foreground mb-1.5">Mors Kodu (. ve - ile ayrılmış)</label>
          <textarea
            id="min"
            rows={3}
            value={morseInput}
            onChange={(e) => handleMorseChange(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono tracking-widest text-primary"
          />
        </div>
      </div>
    </div>
  );
}
