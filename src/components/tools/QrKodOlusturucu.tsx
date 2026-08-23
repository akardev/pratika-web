'use client';

import { useState, useMemo } from 'react';
import { generateQrSvgDataUri } from '@/lib/qrcode';

export default function QrKodOlusturucu() {
  const [text, setText] = useState('https://pratika.com.tr');
  const [qrType, setQrType] = useState<'url' | 'text' | 'wifi' | 'email'>('url');
  
  // Wi-Fi inputs
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');

  // Email inputs
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const payload = useMemo(() => {
    if (qrType === 'wifi') {
      return `WIFI:T:${encryption};S:${ssid};P:${password};;`;
    }
    if (qrType === 'email') {
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
    return text || 'https://pratika.com.tr';
  }, [qrType, text, ssid, password, encryption, email, subject]);

  const qrSvgDataUri = useMemo(() => {
    try {
      return generateQrSvgDataUri(payload);
    } catch {
      return generateQrSvgDataUri('https://pratika.com.tr');
    }
  }, [payload]);

  const handleDownload = () => {
    // Download SVG or PNG via Canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 600, 600);
      ctx.drawImage(img, 0, 0, 600, 600);

      const a = document.createElement('a');
      a.download = `pratika-qr-kod-${Date.now()}.png`;
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    img.src = qrSvgDataUri;
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol Kolon: Form */}
          <div className="lg:col-span-7 space-y-5">
            {/* QR Türü Seçimi */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                QR Kod İçeriği Türü
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setQrType('url')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    qrType === 'url'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Web Linki (URL)
                </button>
                <button
                  type="button"
                  onClick={() => setQrType('text')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    qrType === 'text'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Düz Metin
                </button>
                <button
                  type="button"
                  onClick={() => setQrType('wifi')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    qrType === 'wifi'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Wi-Fi Bağlantısı
                </button>
                <button
                  type="button"
                  onClick={() => setQrType('email')}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    qrType === 'email'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  E-Posta
                </button>
              </div>
            </div>

            {/* Input Alanları */}
            {qrType === 'url' && (
              <div>
                <label htmlFor="qr-url" className="block text-sm font-medium text-foreground mb-1.5">
                  Web Sitesi Linki (URL)
                </label>
                <input
                  type="url"
                  id="qr-url"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://orneksite.com"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label htmlFor="qr-text" className="block text-sm font-medium text-foreground mb-1.5">
                  Düz Metin veya Mesaj
                </label>
                <textarea
                  id="qr-text"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="QR kod içine yazmak istediğiniz metni girin..."
                  className="w-full rounded-xl border border-border bg-background p-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="space-y-3">
                <div>
                  <label htmlFor="wifi-ssid" className="block text-sm font-medium text-foreground mb-1">
                    Ağ Adı (SSID)
                  </label>
                  <input
                    type="text"
                    id="wifi-ssid"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    placeholder="Ev / Ofis Wi-Fi Adı"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="wifi-pass" className="block text-sm font-medium text-foreground mb-1">
                    Wi-Fi Şifresi
                  </label>
                  <input
                    type="text"
                    id="wifi-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kablosuz ağ şifresi"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="wifi-enc" className="block text-sm font-medium text-foreground mb-1">
                    Güvenlik Türü
                  </label>
                  <select
                    id="wifi-enc"
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Şifresiz (Açık Ağ)</option>
                  </select>
                </div>
              </div>
            )}

            {qrType === 'email' && (
              <div className="space-y-3">
                <div>
                  <label htmlFor="email-addr" className="block text-sm font-medium text-foreground mb-1">
                    E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    id="email-addr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="iletisim@pratika.com.tr"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email-sub" className="block text-sm font-medium text-foreground mb-1">
                    Konu Başlığı
                  </label>
                  <input
                    type="text"
                    id="email-sub"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Örn: Bilgi Talebi"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sağ Kolon: QR Önizleme ve İndirme */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-muted/20 rounded-2xl border border-border/80 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              QR Kod Önizleme (%100 Tarayıcıda Üretilir)
            </span>

            <div className="bg-white p-4 rounded-xl border border-border shadow-sm inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrSvgDataUri}
                alt="Oluşturulan QR Kod"
                width={200}
                height={200}
                className="w-48 h-48 object-contain"
              />
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-6 w-full max-w-xs h-11 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-xs"
            >
              QR Kodu İndir (PNG)
            </button>
            <p className="text-[11px] text-muted-foreground mt-2">
              Akıllı telefon kameraları ile anında taranabilir.
            </p>
          </div>
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">QR Kod Nedir ve Nerelerde Kullanılır?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          QR Kod (Quick Response), iki boyutlu bir barkod türüdür. Akıllı telefon kameraları tarafından saniyeler içinde taranarak kullanıcıları web sitelerine, Wi-Fi ağlarına veya iletişim bilgilerine doğrudan yönlendirir. Menülerde, afişlerde ve kartvizitlerde yaygın olarak kullanılır.
        </p>
      </div>
    </div>
  );
}
