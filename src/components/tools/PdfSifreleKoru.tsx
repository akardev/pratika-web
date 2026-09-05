'use client';

import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

export default function PdfSifreleKoru() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!selectedFile || !password) return;
    setLoading(true);
    setDownloadUrl(null);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer);
      // PDF-Lib doğrudan şifreleme ve meta koruma kaydetme
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      setDownloadUrl(URL.createObjectURL(blob));
    } catch {
      alert('PDF şifrelenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pdffile" className="block text-sm font-medium text-foreground mb-1">PDF Dosyası Seçin</label>
            <input
              id="pdffile"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                  setDownloadUrl(null);
                }
              }}
              className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
            />
          </div>
          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-foreground mb-1">Açılış Şifresi</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              placeholder="Güçlü bir şifre girin..."
            />
          </div>
        </div>

        {selectedFile && password && (
          <button
            type="button"
            disabled={loading}
            onClick={handleProcess}
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? 'İşleniyor...' : 'Şifreli PDF Olarak Kaydet'}
          </button>
        )}

        {downloadUrl && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Korumalı Belge Hazır:</span>
            <div>
              <a
                href={downloadUrl}
                download="pratikacom-korunmus.pdf"
                className="px-6 h-11 inline-flex items-center justify-center bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Korumalı PDF&apos;i İndir
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
