/* eslint-disable @next/next/no-img-element */
'use client';

/**
 * Arka Plan Silici (AI Background Remover)
 * 
 * Model Attribution & License:
 * - Model: BiRefNet Lite (studioludens/birefnet-lite-512)
 * - Source: https://huggingface.co/studioludens/birefnet-lite-512
 * - Architecture: BiRefNet (Bilateral Reference Network for High-Resolution Dichotomous Image Segmentation)
 * - License: MIT License
 * - Runtime: Client-side in-browser inference via ONNX Runtime Web / Transformers.js (@huggingface/transformers)
 * - Privacy: Zero server upload. 100% of processing occurs locally in the user's browser.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Produces a safe output filename based on the user's original image name:
 * Example:
 * - XXXX_454.jpg -> pratiksel-XXXX_454.png
 * - urun-123.webp -> pratiksel-urun-123.png
 * - tatil-fotografi.jpeg -> pratiksel-tatil-fotografi.png
 * - benim-urun.png -> pratiksel-benim-urun.png
 */
function getOutputFilename(originalName?: string | null): string {
  if (!originalName || typeof originalName !== 'string') {
    return 'pratiksel-arka-plan-silici.png';
  }

  // Strip extension
  const lastDotIndex = originalName.lastIndexOf('.');
  const baseName = lastDotIndex > 0 ? originalName.substring(0, lastDotIndex) : originalName;

  // Sanitize illegal filesystem / browser characters without mangling the base name
  const safeBaseName = baseName
    .replace(/[/\\?%*:|"<>]/g, '-')
    .trim()
    .replace(/\s+/g, '-');

  return `pratiksel-${safeBaseName || 'arka-plan-silici'}.png`;
}

type ProcessStatus = 'idle' | 'loading-model' | 'processing' | 'success' | 'error';

interface ModelProgress {
  status: string;
  progress?: number;
  file?: string;
  loaded?: number;
  total?: number;
}

interface RawImageLike {
  toCanvas?: () => HTMLCanvasElement;
  width?: number;
  height?: number;
  data?: Uint8Array | Uint8ClampedArray | number[];
  mask?: RawImageLike;
}

type PipelineFunction = (input: unknown) => Promise<RawImageLike | RawImageLike[] | { mask: RawImageLike }>;

// Module-level singleton pipeline cache
let cachedPipeline: PipelineFunction | null = null;
let pipelinePromise: Promise<PipelineFunction> | null = null;

async function getSegmentationPipeline(onProgress?: (data: ModelProgress) => void): Promise<PipelineFunction> {
  if (cachedPipeline) {
    return cachedPipeline;
  }

  if (pipelinePromise) {
    return pipelinePromise;
  }

  pipelinePromise = (async () => {
    try {
      const { pipeline } = await import('@huggingface/transformers');

      // Check if WebGPU is available in this browser
      const hasWebGPU =
        typeof navigator !== 'undefined' &&
        'gpu' in navigator &&
        Boolean((navigator as unknown as { gpu?: unknown }).gpu);

      if (hasWebGPU) {
        try {
          const pipe = (await pipeline('image-segmentation', 'studioludens/birefnet-lite-512', {
            device: 'webgpu',
            progress_callback: onProgress,
          })) as unknown as PipelineFunction;
          cachedPipeline = pipe;
          return pipe;
        } catch (gpuErr) {
          console.warn('WebGPU başlatılamadı, WASM fallback kullanılıyor:', gpuErr);
        }
      }

      // WASM / Standard fallback
      const pipe = (await pipeline('image-segmentation', 'studioludens/birefnet-lite-512', {
        progress_callback: onProgress,
      })) as unknown as PipelineFunction;
      cachedPipeline = pipe;
      return pipe;
    } catch (err) {
      pipelinePromise = null;
      throw err;
    }
  })();

  return pipelinePromise;
}

const CHECKERBOARD_STYLE: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #e2e8f0 25%, transparent 25%),
    linear-gradient(-45deg, #e2e8f0 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e2e8f0 75%),
    linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)
  `,
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  backgroundColor: '#f8fafc',
};

export default function ArkaPlanSilici() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>('pratiksel-arka-plan-silici.png');

  const [status, setStatus] = useState<ProcessStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);

  // Clean up Object URLs when component unmounts or files change
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [originalUrl, resultUrl]);

  const validateAndSetFile = useCallback((file: File) => {
    setErrorMessage(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const hasValidExtension = /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!validTypes.includes(file.type) && !hasValidExtension) {
      setErrorMessage('Bu dosya türü desteklenmiyor. Lütfen JPG, PNG veya WebP formatında bir görsel seçin.');
      return false;
    }

    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    if (file.size > MAX_SIZE_BYTES) {
      setErrorMessage("Dosya boyutu 10 MB'dan küçük olmalıdır.");
      return false;
    }

    // Clean up previous result and original URL
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    const url = URL.createObjectURL(file);
    setSelectedFile(file);
    setOriginalUrl(url);
    setDownloadFilename(getOutputFilename(file.name));
    setResultUrl(null);
    setResultBlob(null);
    setStatus('idle');
    setStatusMessage('');

    // Preload image to get natural dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      originalImageRef.current = img;
    };
    img.onerror = () => {
      setErrorMessage('Görsel dosyası okunurken hata oluştu.');
    };
    img.src = url;

    return true;
  }, [originalUrl, resultUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (status !== 'loading-model' && status !== 'processing') {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (status === 'loading-model' || status === 'processing') return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);

    setSelectedFile(null);
    setOriginalUrl(null);
    setOriginalDimensions(null);
    setResultUrl(null);
    setResultBlob(null);
    setDownloadFilename('pratiksel-arka-plan-silici.png');
    setStatus('idle');
    setStatusMessage('');
    setErrorMessage(null);
    setDownloadProgress(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile || !originalUrl) return;

    setErrorMessage(null);
    const isModelAlreadyLoaded = Boolean(cachedPipeline);

    if (isModelAlreadyLoaded) {
      setStatus('processing');
      setStatusMessage('Arka plan kaldırılıyor...');
    } else {
      setStatus('loading-model');
      setStatusMessage('Yapay zeka modeli hazırlanıyor...\nİlk kullanımda model indiriliyor. Bu işlem biraz sürebilir.');
    }

    try {
      const { RawImage } = await import('@huggingface/transformers');

      // 1. Get or load pipeline with progress callback
      const pipe = await getSegmentationPipeline((p: ModelProgress) => {
        if (p.status === 'progress' && typeof p.progress === 'number') {
          const pct = Math.round(p.progress);
          setDownloadProgress(pct);
          setStatusMessage(`Yapay zeka modeli indiriliyor (%${pct})...`);
        } else if (p.status === 'done' || p.status === 'ready') {
          setStatusMessage('Yapay zeka modeli hazırlanıyor...');
        }
      });

      setStatus('processing');
      setStatusMessage('Arka plan kaldırılıyor...');

      // 2. Open image in browser memory
      let rawImage: unknown;
      try {
        rawImage = await RawImage.fromBlob(selectedFile);
      } catch {
        rawImage = await RawImage.read(originalUrl);
      }

      // 3. Inference with BiRefNet Lite
      const output = await pipe(rawImage);

      // 4. Extract mask
      let mask: RawImageLike | HTMLCanvasElement | null = null;
      if (Array.isArray(output)) {
        const first = output[0];
        mask = (first?.mask ?? first ?? null) as RawImageLike | HTMLCanvasElement | null;
      } else if (output && typeof output === 'object' && 'mask' in output) {
        mask = (output as { mask: RawImageLike }).mask;
      } else if (output) {
        mask = output as RawImageLike | HTMLCanvasElement;
      }

      if (!mask) {
        throw new Error('Modelden maske çıktısı alınamadı.');
      }

      // 5. Ensure we have original image element
      let imgElem = originalImageRef.current;
      if (!imgElem || !imgElem.naturalWidth) {
        imgElem = await new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Görsel yüklenemedi'));
          img.src = originalUrl;
        });
        originalImageRef.current = imgElem;
      }

      const origWidth = imgElem.naturalWidth;
      const origHeight = imgElem.naturalHeight;

      // 6. Draw original image onto canvas
      const origCanvas = document.createElement('canvas');
      origCanvas.width = origWidth;
      origCanvas.height = origHeight;
      const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
      if (!origCtx) throw new Error('Canvas context oluşturulamadı.');
      origCtx.drawImage(imgElem, 0, 0, origWidth, origHeight);
      const origImageData = origCtx.getImageData(0, 0, origWidth, origHeight);
      const origPixels = origImageData.data;

      // 7. Render mask to a canvas
      let maskCanvas: HTMLCanvasElement;
      if (mask instanceof HTMLCanvasElement) {
        maskCanvas = mask;
      } else if (typeof mask.toCanvas === 'function') {
        maskCanvas = mask.toCanvas();
      } else if (mask.data && mask.width && mask.height) {
        maskCanvas = document.createElement('canvas');
        maskCanvas.width = mask.width;
        maskCanvas.height = mask.height;
        const mCtx = maskCanvas.getContext('2d');
        if (!mCtx) throw new Error('Mask canvas context hatası');
        const mImgData = mCtx.createImageData(mask.width, mask.height);
        if (mask.data.length === mask.width * mask.height) {
          for (let i = 0; i < mask.data.length; i++) {
            const v = mask.data[i];
            const idx = i * 4;
            mImgData.data[idx] = v;
            mImgData.data[idx + 1] = v;
            mImgData.data[idx + 2] = v;
            mImgData.data[idx + 3] = 255;
          }
        } else {
          mImgData.data.set(mask.data);
        }
        mCtx.putImageData(mImgData, 0, 0);
      } else {
        throw new Error('Maske formatı desteklenmiyor.');
      }

      // 8. Scale mask to original dimensions using high-quality smoothing
      const scaledMaskCanvas = document.createElement('canvas');
      scaledMaskCanvas.width = origWidth;
      scaledMaskCanvas.height = origHeight;
      const scaledCtx = scaledMaskCanvas.getContext('2d', { willReadFrequently: true });
      if (!scaledCtx) throw new Error('Scaled mask context hatası');

      scaledCtx.imageSmoothingEnabled = true;
      scaledCtx.imageSmoothingQuality = 'high';
      scaledCtx.drawImage(maskCanvas, 0, 0, origWidth, origHeight);

      const maskImageData = scaledCtx.getImageData(0, 0, origWidth, origHeight);
      const maskPixels = maskImageData.data;

      // 9. Apply mask to alpha channel of original image
      for (let i = 0; i < origPixels.length; i += 4) {
        // BiRefNet output: 255 is foreground, 0 is background
        const maskVal = maskPixels[i]; // luminance
        origPixels[i + 3] = Math.round((origPixels[i + 3] * maskVal) / 255);
      }

      origCtx.putImageData(origImageData, 0, 0);

      // 10. Generate PNG Blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        origCanvas.toBlob((b) => {
          if (b) resolve(b);
          else reject(new Error('PNG çıktısı oluşturulamadı.'));
        }, 'image/png');
      });

      const outUrl = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(outUrl);
      setStatus('success');
      setStatusMessage('İşlem tamamlandı.');
    } catch (err: unknown) {
      console.error('Arka plan kaldırma hatası:', err);
      setStatus('error');
      setErrorMessage(
        'Bu görsel işlenirken bir sorun oluştu. Daha küçük bir görsel deneyebilir veya tarayıcınızı güncelleyebilirsiniz.'
      );
    }
  };

  const isBusy = status === 'loading-model' || status === 'processing';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Privacy Guarantee Banner */}
      <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm text-emerald-900 dark:text-emerald-300">
        <svg
          className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <div>
          <span className="font-semibold">Gizlilik Güvencesi:</span> Görselleriniz sunucuya yüklenmez. Arka plan kaldırma
          işlemi tarayıcınızda gerçekleştirilir.
        </div>
      </div>

      {/* Main Action Container */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-xs space-y-6">
        {/* Upload Zone (shown if no image selected) */}
        {!selectedFile && (
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? 'border-primary bg-primary/5 scale-[0.99]'
                  : 'border-border hover:border-primary/50 hover:bg-muted/30'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-base font-semibold text-foreground">
                  Görsel seçmek için tıklayın veya sürükleyip bırakın
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  JPG, PNG veya WebP • Maksimum 10 MB
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2.5">
            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>{errorMessage}</div>
          </div>
        )}

        {/* Selected Image Controls & Comparison View */}
        {selectedFile && originalUrl && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-xs">
                  {selectedFile.name}
                </span>
                <span>•</span>
                <span>{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                {originalDimensions && (
                  <>
                    <span>•</span>
                    <span>
                      {originalDimensions.width} × {originalDimensions.height} px
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isBusy}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-border hover:bg-muted text-foreground transition-colors disabled:opacity-50"
                >
                  Yeni Görsel
                </button>

                {status !== 'success' && (
                  <button
                    type="button"
                    onClick={handleRemoveBackground}
                    disabled={isBusy}
                    className="px-4 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isBusy && (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                    )}
                    <span>{isBusy ? 'İşleniyor...' : 'Arka Planı Kaldır'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Status Feedback Banner */}
            {isBusy && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 font-medium text-primary">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span className="whitespace-pre-line">{statusMessage}</span>
                  </div>
                  {downloadProgress !== null && status === 'loading-model' && (
                    <span className="text-xs font-semibold text-primary">%{downloadProgress}</span>
                  )}
                </div>
                {downloadProgress !== null && status === 'loading-model' && (
                  <div className="w-full bg-primary/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-300 ease-out"
                      style={{ width: `${downloadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Before / After Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Original Panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  <span>ORİJİNAL</span>
                </div>
                <div className="relative aspect-4/3 sm:aspect-square rounded-xl overflow-hidden border border-border bg-muted/20 flex items-center justify-center p-2">
                  <img
                    src={originalUrl}
                    alt="Orijinal Görsel"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-2xs"
                  />
                </div>
              </div>

              {/* Result Panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
                  <span>ŞEFFAF PNG</span>
                  {resultBlob && (
                    <span className="text-xs font-normal normal-case text-muted-foreground">
                      {(resultBlob.size / 1024).toFixed(1)} KB
                    </span>
                  )}
                </div>

                <div
                  style={CHECKERBOARD_STYLE}
                  className="relative aspect-4/3 sm:aspect-square rounded-xl overflow-hidden border border-border flex items-center justify-center p-2"
                >
                  {resultUrl ? (
                    <img
                      src={resultUrl}
                      alt="Arka Planı Kaldırılmış Şeffaf PNG"
                      className="max-h-full max-w-full object-contain drop-shadow-sm"
                    />
                  ) : (
                    <div className="text-center p-6 space-y-2 bg-card/80 backdrop-blur-xs rounded-xl border border-border/50 max-w-[80%]">
                      <div className="text-sm font-medium text-foreground">
                        {isBusy ? 'Görsel işleniyor...' : 'Sonuç burada görünecek'}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {isBusy
                          ? 'Yapay zeka nesneyi ve arka planı ayırıyor.'
                          : 'Arka planı kaldırmak için yukarıdaki butona tıklayın.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Download & Post-Process Actions */}
            {resultUrl && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground text-center sm:text-left">
                  Arka plan başarıyla kaldırıldı. Görsel şeffaf PNG formatında kaydedilmeye hazır.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex-1 sm:flex-initial px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-muted text-foreground transition-colors"
                  >
                    Yeni Görsel
                  </button>

                  <a
                    href={resultUrl}
                    download={downloadFilename}
                    className="flex-1 sm:flex-initial px-6 py-2.5 text-sm font-medium rounded-xl bg-primary hover:bg-primary-hover text-primary-foreground shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>{"PNG'yi İndir"}</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
