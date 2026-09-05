'use client';

import React, { useState, useMemo, useRef } from 'react';
import { generateQrSvgString, generateQrSvgDataUri } from '@/lib/qrcode';

export default function QrKodOlusturucu() {
  const [qrType, setQrType] = useState<'url' | 'image' | 'text' | 'wifi' | 'email' | 'phone'>('url');
  
  // Content inputs
  const [text, setText] = useState('https://pratiksel.com');
  const [imageUrl, setImageUrl] = useState('');
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [phone, setPhone] = useState('');

  // Logo / Rozet state
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  const [logoSizePercent, setLogoSizePercent] = useState<number>(20);
  const [logoShape, setLogoShape] = useState<'circle' | 'square'>('circle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Styling options
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [ecLevel, setEcLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');

  const payload = useMemo(() => {
    if (qrType === 'image') {
      return imageUrl.trim() || 'https://pratiksel.com';
    }
    if (qrType === 'wifi') {
      const auth = encryption === 'nopass' ? 'nopass' : encryption;
      return `WIFI:T:${auth};S:${ssid};P:${password};;`;
    }
    if (qrType === 'email') {
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
    if (qrType === 'phone') {
      return `tel:${phone.trim()}`;
    }
    return text || 'https://pratiksel.com';
  }, [qrType, imageUrl, text, ssid, password, encryption, email, subject, phone]);

  // If logo is present, use at least 'Q' or 'H' error correction for best scanability
  const activeEcLevel = useMemo(() => {
    if (logoUrl) {
      return ecLevel === 'L' ? 'H' : ecLevel;
    }
    return ecLevel;
  }, [logoUrl, ecLevel]);

  // Handle Logo Upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Lütfen geçerli bir görsel dosyası (PNG, JPG, SVG, WEBP) seçin.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === 'string') {
        setLogoUrl(event.target.result);
        setLogoName(file.name);
        setEcLevel('H');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoUrl(null);
    setLogoName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Base SVG Data URI for rendering
  const qrSvgDataUri = useMemo(() => {
    try {
      return generateQrSvgDataUri(payload, {
        errorCorrectionLevel: activeEcLevel,
        margin: 2,
        color: {
          dark: darkColor,
          light: lightColor,
        },
      });
    } catch {
      return generateQrSvgDataUri('https://pratiksel.com');
    }
  }, [payload, darkColor, lightColor, activeEcLevel]);

  const triggerDownload = (dataUrl: string, ext: string) => {
    const a = document.createElement('a');
    a.download = `pratiksel-qr-kod-${Date.now()}.${ext}`;
    a.href = dataUrl;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download High-Res PNG with Logo
  const handleDownloadPng = () => {
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';

    qrImg.onload = () => {
      const canvas = document.createElement('canvas');
      const canvasSize = 800;
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw background
      ctx.fillStyle = lightColor;
      ctx.fillRect(0, 0, canvasSize, canvasSize);

      // Draw QR Code
      ctx.drawImage(qrImg, 0, 0, canvasSize, canvasSize);

      // If Logo exists, draw centered badge & logo
      if (logoUrl) {
        const logoImg = new Image();
        logoImg.onload = () => {
          const logoPixelSize = (canvasSize * logoSizePercent) / 100;
          const bgPadding = logoPixelSize * 0.15;
          const badgeSize = logoPixelSize + bgPadding * 2;
          const center = canvasSize / 2;
          const badgeX = center - badgeSize / 2;
          const badgeY = center - badgeSize / 2;

          ctx.save();
          if (logoShape === 'circle') {
            ctx.beginPath();
            ctx.arc(center, center, badgeSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = lightColor;
            ctx.fill();
            ctx.strokeStyle = lightColor;
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(center, center, logoPixelSize / 2, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(
              logoImg,
              center - logoPixelSize / 2,
              center - logoPixelSize / 2,
              logoPixelSize,
              logoPixelSize
            );
          } else {
            const radius = 16;
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeSize, badgeSize, radius);
            ctx.fillStyle = lightColor;
            ctx.fill();

            ctx.beginPath();
            ctx.roundRect(
              center - logoPixelSize / 2,
              center - logoPixelSize / 2,
              logoPixelSize,
              logoPixelSize,
              radius * 0.8
            );
            ctx.clip();
            ctx.drawImage(
              logoImg,
              center - logoPixelSize / 2,
              center - logoPixelSize / 2,
              logoPixelSize,
              logoPixelSize
            );
          }
          ctx.restore();

          triggerDownload(canvas.toDataURL('image/png'), 'png');
        };
        logoImg.src = logoUrl;
      } else {
        triggerDownload(canvas.toDataURL('image/png'), 'png');
      }
    };
    qrImg.src = qrSvgDataUri;
  };

  // Download Vector SVG with Logo Embed
  const handleDownloadSvg = () => {
    try {
      let svgStr = generateQrSvgString(payload, {
        errorCorrectionLevel: activeEcLevel,
        margin: 2,
        color: { dark: darkColor, light: lightColor },
      });

      if (logoUrl) {
        const match = svgStr.match(/viewBox="0 0 (\d+) (\d+)"/);
        if (match) {
          const vbSize = parseFloat(match[1]);
          const logoScale = (vbSize * logoSizePercent) / 100;
          const badgeScale = logoScale * 1.25;
          const center = vbSize / 2;
          const badgeX = center - badgeScale / 2;
          const badgeY = center - badgeScale / 2;
          const logoX = center - logoScale / 2;
          const logoY = center - logoScale / 2;

          let badgeSvg = '';
          if (logoShape === 'circle') {
            badgeSvg = `<circle cx="${center}" cy="${center}" r="${badgeScale / 2}" fill="${lightColor}"/><image href="${logoUrl}" x="${logoX}" y="${logoY}" width="${logoScale}" height="${logoScale}" preserveAspectRatio="xMidYMid meet" clip-path="circle(${logoScale / 2}px at ${center}px ${center}px)"/>`;
          } else {
            badgeSvg = `<rect x="${badgeX}" y="${badgeY}" width="${badgeScale}" height="${badgeScale}" rx="${badgeScale * 0.15}" fill="${lightColor}"/><image href="${logoUrl}" x="${logoX}" y="${logoY}" width="${logoScale}" height="${logoScale}" preserveAspectRatio="xMidYMid meet"/>`;
          }

          svgStr = svgStr.replace('</svg>', `${badgeSvg}</svg>`);
        }
      }

      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, 'svg');
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('SVG Export Error:', err);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sol Kolon: Form, Logo & Ayarlar */}
          <div className="lg:col-span-7 space-y-5">
            {/* QR Türü Seçimi */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                QR Kod Okutulduğunda Ne Açılsın?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setQrType('url')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'url'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>🔗</span>
                  <span>Web Sitesi (URL)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('image')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'image'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>🖼️</span>
                  <span>Görsel / Fotoğraf</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('wifi')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'wifi'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>📶</span>
                  <span>Wi-Fi Bağlantısı</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('text')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'text'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>📝</span>
                  <span>Düz Metin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('email')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'email'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>✉️</span>
                  <span>E-Posta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQrType('phone')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${
                    qrType === 'phone'
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>📞</span>
                  <span>Telefon</span>
                </button>
              </div>
            </div>

            {/* Fotoğraf / Görsel Açan QR Alanı */}
            {qrType === 'image' && (
              <div className="space-y-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div>
                  <label htmlFor="qr-image-url" className="block text-xs font-bold text-foreground mb-1.5 flex items-center justify-between">
                    <span>Açılacak Fotoğraf / Görsel Bağlantısı (URL)</span>
                    <span className="text-[11px] text-primary font-normal">Kamera okutunca bu fotoğraf açılır</span>
                  </label>
                  <input
                    type="url"
                    id="qr-image-url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://orneksite.com/gorsel.jpg"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                  />
                </div>

                <div className="text-xs text-muted-foreground leading-relaxed bg-background/80 p-3 rounded-lg border border-border/60">
                  <p className="font-semibold text-foreground mb-1">💡 Fotoğrafınızı QR Koda Nasıl Bağlarsınız?</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    <li>Fotoğrafınızı <strong>Google Drive, iCloud, Dropbox, Imgur, Hızlı Resim</strong> gibi bir servise veya web sitenize yükleyin.</li>
                    <li>Görselin <em>&quot;Paylaşılabilir Bağlantısını&quot;</em> kopyalayıp yukarıdaki alana yapıştırın.</li>
                    <li>Telefon kamerasıyla QR kod okutulduğunda fotoğraf doğrudan tam ekran açılır.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Web Sitesi Linki */}
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
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            )}

            {/* Düz Metin */}
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
                  className="w-full rounded-xl border border-border bg-background p-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            )}

            {/* Wi-Fi Ağı */}
            {qrType === 'wifi' && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border">
                <div>
                  <label htmlFor="wifi-ssid" className="block text-xs font-semibold text-foreground mb-1">
                    Kablosuz Ağ Adı (SSID)
                  </label>
                  <input
                    type="text"
                    id="wifi-ssid"
                    value={ssid}
                    onChange={(e) => setSsid(e.target.value)}
                    placeholder="Ev / Ofis Wi-Fi Adı"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="wifi-pass" className="block text-xs font-semibold text-foreground mb-1">
                    Wi-Fi Parolası
                  </label>
                  <input
                    type="text"
                    id="wifi-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Kablosuz ağ şifresi"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="wifi-enc" className="block text-xs font-semibold text-foreground mb-1">
                    Güvenlik / Şifreleme Türü
                  </label>
                  <select
                    id="wifi-enc"
                    value={encryption}
                    onChange={(e) => setEncryption(e.target.value)}
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3 (Standart)</option>
                    <option value="WEP">WEP (Eski)</option>
                    <option value="nopass">Şifresiz (Açık Ağ)</option>
                  </select>
                </div>
              </div>
            )}

            {/* E-Posta */}
            {qrType === 'email' && (
              <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border">
                <div>
                  <label htmlFor="email-addr" className="block text-xs font-semibold text-foreground mb-1">
                    E-Posta Adresi
                  </label>
                  <input
                    type="email"
                    id="email-addr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ornek@alanadi.com"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email-sub" className="block text-xs font-semibold text-foreground mb-1">
                    Varsayılan Konu Başlığı
                  </label>
                  <input
                    type="text"
                    id="email-sub"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Örn: Bilgi Talebi"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Telefon */}
            {qrType === 'phone' && (
              <div>
                <label htmlFor="qr-phone" className="block text-sm font-medium text-foreground mb-1.5">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  id="qr-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+90 555 123 4567"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                />
              </div>
            )}

            {/* QR Kod Ortasına İsteğe Bağlı Logo Rozeti */}
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <span>🎨 QR Kodun Ortasına Logo / İkon Rozeti Ekle</span>
                  <span className="text-[10px] font-normal text-muted-foreground">(İsteğe Bağlı)</span>
                </label>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Logoyu Kaldır
                  </button>
                )}
              </div>

              {!logoUrl ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="qr-logo-upload"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="qr-logo-upload"
                    className="w-full py-2.5 px-4 rounded-xl border border-dashed border-border hover:border-primary/60 bg-background/50 hover:bg-background cursor-pointer flex items-center justify-center gap-2 text-xs font-semibold text-foreground transition-all"
                  >
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Şirket / Marka Logosu Seç (PNG, JPG, SVG)</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-background border border-border">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logoUrl}
                        alt="Yüklenen Logo"
                        className="w-8 h-8 rounded-lg object-contain border border-border bg-white"
                      />
                      <span className="text-xs font-semibold text-foreground truncate max-w-[200px]">
                        {logoName}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ✓ Logo Eklendi
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label htmlFor="logo-size-opt" className="block text-[11px] font-semibold text-foreground mb-1">
                        Logo Boyutu
                      </label>
                      <select
                        id="logo-size-opt"
                        value={logoSizePercent}
                        onChange={(e) => setLogoSizePercent(parseInt(e.target.value))}
                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary"
                      >
                        <option value={15}>Küçük (%15)</option>
                        <option value={20}>Orta (%20 - Önerilen)</option>
                        <option value={25}>Büyük (%25)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="logo-shape-opt" className="block text-[11px] font-semibold text-foreground mb-1">
                        Logo Rozet Şekli
                      </label>
                      <select
                        id="logo-shape-opt"
                        value={logoShape}
                        onChange={(e) => setLogoShape(e.target.value as 'circle' | 'square')}
                        className="w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary"
                      >
                        <option value="circle">Yuvarlak (Dairesel)</option>
                        <option value="square">Köşeleri Yuvarlatılmış Kare</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Renk & Hata Düzeltme Ayarları */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border/60">
              <div>
                <label htmlFor="qr-dark-color" className="block text-xs font-semibold text-foreground mb-1">
                  QR Rengi
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="qr-dark-color"
                    value={darkColor}
                    onChange={(e) => setDarkColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-background"
                  />
                  <span className="text-xs font-mono text-muted-foreground">{darkColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="qr-light-color" className="block text-xs font-semibold text-foreground mb-1">
                  Arka Plan
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="qr-light-color"
                    value={lightColor}
                    onChange={(e) => setLightColor(e.target.value)}
                    className="w-9 h-9 rounded-lg border border-border cursor-pointer p-0.5 bg-background"
                  />
                  <span className="text-xs font-mono text-muted-foreground">{lightColor}</span>
                </div>
              </div>

              <div>
                <label htmlFor="qr-ec-level" className="block text-xs font-semibold text-foreground mb-1">
                  Hata Düzeltme Seviyesi
                </label>
                <select
                  id="qr-ec-level"
                  value={activeEcLevel}
                  onChange={(e) => setEcLevel(e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-foreground focus:ring-2 focus:ring-primary"
                >
                  <option value="L">L (%7 - Düşük)</option>
                  <option value="M">M (%15 - Standart)</option>
                  <option value="Q">Q (%25 - Yüksek)</option>
                  <option value="H">H (%30 - En Güçlü)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sağ Kolon: QR Önizleme ve İndirme */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 bg-muted/20 rounded-2xl border border-border/80 text-center">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Canlı QR Kod Önizleme
            </span>

            <div className="p-4 rounded-2xl border border-border shadow-xs bg-white inline-flex items-center justify-center relative">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrSvgDataUri}
                  alt="Oluşturulan Standart QR Kod"
                  className="w-full h-full object-contain"
                />

                {/* Ortadaki Canlı Logo Önizleme Rozeti */}
                {logoUrl && (
                  <div
                    style={{
                      width: `${logoSizePercent * 1.35}%`,
                      height: `${logoSizePercent * 1.35}%`,
                      backgroundColor: lightColor,
                    }}
                    className={`absolute flex items-center justify-center shadow-xs p-1 ${
                      logoShape === 'circle' ? 'rounded-full' : 'rounded-lg'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt="Logo Rozeti"
                      className={`w-full h-full object-contain ${
                        logoShape === 'circle' ? 'rounded-full' : 'rounded-md'
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-xs mt-6">
              <button
                type="button"
                onClick={handleDownloadPng}
                className="flex-1 h-11 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary/90 active:scale-95 transition-all shadow-xs"
              >
                PNG İndir
              </button>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="flex-1 h-11 px-4 rounded-xl bg-muted text-foreground font-bold text-xs sm:text-sm hover:bg-muted/80 active:scale-95 transition-all"
              >
                SVG (Vektör)
              </button>
            </div>

            <p className="text-[11px] text-muted-foreground mt-3">
              {qrType === 'image'
                ? '📱 Telefon kamerasıyla okutulduğunda fotoğraf doğrudan tam ekran açılır.'
                : 'Tüm iOS ve Android kamera uygulamaları tarafından anında taranabilir.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bilgilendirme ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">QR Kod ile Fotoğraf Nasıl Açılır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            QR kodlar (ISO/IEC 18004 standardı) metin ve bağlantı verisi saklar. Bir fotoğrafın, restoran menüsünün veya ürün görselinin telefon kamerasından okutulduğunda anında açılması için görselin <strong>bulut veya web bağlantısı (Google Drive, iCloud, Imgur veya web sitesi görsel linki)</strong> QR koda tanımlanır. Kullanıcı kamerayı QR koda tuttuğunda telefon görseli doğrudan tam ekran görüntüler.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">QR kodun içine doğrudan fotoğraf dosyası gömülebilir mi?</h3>
              <p className="text-muted-foreground">
                QR kodların maksimum veri depolama kapasitesi yaklaşık 2.9 KB ile sınırlıdır. Birkaç megabaytlık gerçek fotoğraflar doğrudan piksellerin içine sığmayacağı için tüm dünyada fotoğraflı QR sistemleri, görselin hızlı açılmasını sağlayan yüksek hızlı bir web/bulut linki üzerinden çalışır.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Fotoğrafımı QR koda nasıl bağlarım?</h3>
              <p className="text-muted-foreground">
                Fotoğrafınızı Google Drive, Dropbox, iCloud veya Imgur gibi ücretsiz bir bulut servisine yükleyip bağlantıyı kopyalayın. &quot;Görsel / Fotoğraf&quot; sekmesine yapıştırdığınızda QR kodunuz anında hazır hale gelir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Oluşturulan QR kodun süresi dolar mı?</h3>
              <p className="text-muted-foreground">
                Hayır. Oluşturulan QR kodlar statiktir ve veriyi doğrudan matris pikselleri içine kodlar. Kodun süresi asla dolmaz ve ömür boyu çalışır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
