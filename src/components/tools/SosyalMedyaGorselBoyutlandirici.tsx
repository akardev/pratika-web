'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  SOCIAL_MEDIA_PLATFORMS,
  SocialMediaPlatform,
  SocialMediaFormat,
} from '@/data/socialMediaSizes';
import PrivacyBadge from './pdf/PrivacyBadge';

type FitMode = 'cover' | 'contain';
type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';
type BgColorPreset = '#ffffff' | '#000000' | 'transparent' | 'custom';

export default function SosyalMedyaGorselBoyutlandirici() {
  // 1. Loaded Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const [imgNaturalSize, setImgNaturalSize] = useState<{ width: number; height: number } | null>(null);

  // 2. Selected Platform & Format
  const [selectedPlatformId, setSelectedPlatformId] = useState<string>('instagram');
  const activePlatform: SocialMediaPlatform =
    SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === selectedPlatformId) || SOCIAL_MEDIA_PLATFORMS[0];

  const [selectedFormatId, setSelectedFormatId] = useState<string>(activePlatform.formats[0].id);
  const activeFormat: SocialMediaFormat =
    activePlatform.formats.find((f) => f.id === selectedFormatId) || activePlatform.formats[0];

  // 3. Transformation & Cropping State
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [zoom, setZoom] = useState<number>(1.0);
  const [offsetX, setOffsetX] = useState<number>(0); // -1.0 to 1.0 (relative to canvas)
  const [offsetY, setOffsetY] = useState<number>(0); // -1.0 to 1.0
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  const [flipX, setFlipX] = useState<boolean>(false);
  const [flipY, setFlipY] = useState<boolean>(false);

  // 4. Background for Contain Mode
  const [bgPreset, setBgPreset] = useState<BgColorPreset>('#ffffff');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');

  // 5. Output Settings
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('image/jpeg');
  const [quality, setQuality] = useState<number>(90);
  const [customFileName, setCustomFileName] = useState<string>('');

  // 6. UI Interaction & Processing State
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [infoActivePlatform, setInfoActivePlatform] = useState<string>('instagram');

  // Preview & Canvas Refs
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isPointerDownRef = useRef(false);
  const dragStartPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Derived file extension and default name
  const fileExtension = outputFormat === 'image/jpeg' ? 'jpg' : outputFormat === 'image/png' ? 'png' : 'webp';
  const defaultFileName = `${activeFormat.defaultFileNamePrefix}.${fileExtension}`;

  // When platform changes, auto-select first format
  const handleSelectPlatform = (platformId: string) => {
    setSelectedPlatformId(platformId);
    const platform = SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === platformId);
    if (platform && platform.formats.length > 0) {
      setSelectedFormatId(platform.formats[0].id);
    }
  };

  // Load Image File
  const handleFile = (file: File) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(jpe?g|png|webp)$/i)) {
      setErrorMessage('Lütfen geçerli bir görsel dosyası seçin (JPG, PNG veya WebP).');
      return;
    }

    const MAX_SIZE_MB = 20;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrorMessage(`Dosya boyutu çok büyük (${(file.size / (1024 * 1024)).toFixed(1)} MB). Lütfen ${MAX_SIZE_MB} MB altı bir görsel seçin.`);
      return;
    }

    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }

    const objectUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImageSrc(objectUrl);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageObj(img);
      setImgNaturalSize({ width: img.naturalWidth, height: img.naturalHeight });
      // Reset transformations
      setZoom(1.0);
      setOffsetX(0);
      setOffsetY(0);
      setRotation(0);
      setFlipX(false);
      setFlipY(false);
    };
    img.onerror = () => {
      setErrorMessage('Görsel yüklenirken bir sorun oluştu. Lütfen başka bir dosya deneyin.');
    };
    img.src = objectUrl;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleResetImage = () => {
    if (imageSrc) {
      URL.revokeObjectURL(imageSrc);
    }
    setImageFile(null);
    setImageSrc(null);
    setImageObj(null);
    setImgNaturalSize(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Reset Positioning & Zoom
  const handleResetPosition = () => {
    setZoom(1.0);
    setOffsetX(0);
    setOffsetY(0);
    setRotation(0);
    setFlipX(false);
    setFlipY(false);
  };

  // Rotate 90 deg clockwise
  const handleRotateCw = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Rotate 90 deg counter-clockwise
  const handleRotateCcw = () => {
    setRotation((prev) => (prev - 90 + 360) % 360);
  };

  // Flip Horizontal
  const handleFlipHorizontal = () => {
    setFlipX((prev) => !prev);
  };

  // Draw on Canvas (used for both Preview and final rendering)
  const drawImageToCanvas = useCallback(
    (canvas: HTMLCanvasElement, targetWidth: number, targetHeight: number) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !imageObj || !imgNaturalSize) return;

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // 1. Background Fill
      ctx.clearRect(0, 0, targetWidth, targetHeight);
      const isRotated90 = rotation === 90 || rotation === 270;
      const effectiveImgW = isRotated90 ? imgNaturalSize.height : imgNaturalSize.width;
      const effectiveImgH = isRotated90 ? imgNaturalSize.width : imgNaturalSize.height;

      const bgColor = bgPreset === 'custom' ? customBgColor : bgPreset;

      if (outputFormat === 'image/jpeg' || (bgColor !== 'transparent' && fitMode === 'contain')) {
        ctx.fillStyle = bgColor === 'transparent' ? '#ffffff' : bgColor;
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      } else if (bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetWidth, targetHeight);
      }

      // 2. Scale & Sizing
      const scaleCover = Math.max(targetWidth / effectiveImgW, targetHeight / effectiveImgH);
      const scaleContain = Math.min(targetWidth / effectiveImgW, targetHeight / effectiveImgH);
      const baseScale = fitMode === 'cover' ? scaleCover : scaleContain;
      const finalScale = baseScale * zoom;

      // 3. Transformation & Draw
      ctx.save();
      const centerX = targetWidth / 2 + offsetX * targetWidth;
      const centerY = targetHeight / 2 + offsetY * targetHeight;

      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipX ? -1 : 1, flipY ? -1 : 1);

      const drawW = imgNaturalSize.width * finalScale;
      const drawH = imgNaturalSize.height * finalScale;

      ctx.drawImage(imageObj, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    },
    [
      imageObj,
      imgNaturalSize,
      fitMode,
      zoom,
      offsetX,
      offsetY,
      rotation,
      flipX,
      flipY,
      bgPreset,
      customBgColor,
      outputFormat,
    ]
  );

  // Redraw preview whenever parameters change
  useEffect(() => {
    if (previewCanvasRef.current && imageObj && imgNaturalSize) {
      // For preview canvas, render at a crisp display resolution that preserves aspect ratio
      const maxDisplayDim = 800;
      const aspect = activeFormat.width / activeFormat.height;
      let displayW = maxDisplayDim;
      let displayH = maxDisplayDim / aspect;

      if (aspect < 1) {
        // Vertical format (e.g. 9:16)
        displayH = maxDisplayDim;
        displayW = maxDisplayDim * aspect;
      }

      drawImageToCanvas(previewCanvasRef.current, Math.round(displayW), Math.round(displayH));
    }
  }, [drawImageToCanvas, imageObj, imgNaturalSize, activeFormat]);

  // Pointer Drag Handlers for Interactive Pan
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    startOffsetRef.current = { x: offsetX, y: offsetY };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPointerDownRef.current || !previewCanvasRef.current) return;
    const dx = e.clientX - dragStartPosRef.current.x;
    const dy = e.clientY - dragStartPosRef.current.y;

    const rect = previewCanvasRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Convert pixel drag to relative offset
    const relDx = dx / rect.width;
    const relDy = dy / rect.height;

    setOffsetX(Math.max(-1.5, Math.min(1.5, startOffsetRef.current.x + relDx)));
    setOffsetY(Math.max(-1.5, Math.min(1.5, startOffsetRef.current.y + relDy)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isPointerDownRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Final Download Handler with Strict Exact Target Pixel Dimensions
  const handleDownload = async () => {
    if (!imageObj || !imgNaturalSize) {
      setErrorMessage('Lütfen önce bir görsel yükleyin.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Create full-resolution offscreen canvas matching EXACT target width & height
      const targetCanvas = document.createElement('canvas');
      drawImageToCanvas(targetCanvas, activeFormat.width, activeFormat.height);

      const mimeType = outputFormat;
      const q = outputFormat === 'image/png' ? undefined : quality / 100;

      targetCanvas.toBlob(
        (blob) => {
          if (!blob) {
            setIsProcessing(false);
            setErrorMessage('Görsel oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.');
            return;
          }

          // Build clean filename without duplicate extension
          const ext = outputFormat === 'image/jpeg' ? 'jpg' : outputFormat === 'image/png' ? 'png' : 'webp';
          let cleanName = customFileName.trim();
          if (!cleanName) {
            cleanName = `${activeFormat.defaultFileNamePrefix}.${ext}`;
          } else {
            // Remove existing extension if present
            cleanName = cleanName.replace(/\.(jpe?g|png|webp)$/i, '');
            cleanName = `${cleanName}.${ext}`;
          }

          const downloadUrl = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = downloadUrl;
          a.download = cleanName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          setTimeout(() => URL.revokeObjectURL(downloadUrl), 5000);

          setIsProcessing(false);
          setSuccessMessage(`Görsel başarıyla indirildi (${activeFormat.width} × ${activeFormat.height} px).`);
          setTimeout(() => setSuccessMessage(null), 4000);
        },
        mimeType,
        q
      );
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      setErrorMessage('Görsel oluşturulurken bir sorun oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleCopySize = (w: number, h: number, index: number) => {
    navigator.clipboard.writeText(`${w}x${h}`);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentInfoPlatform =
    SOCIAL_MEDIA_PLATFORMS.find((p) => p.id === infoActivePlatform) || SOCIAL_MEDIA_PLATFORMS[0];

  return (
    <div className="w-full space-y-10">
      {/* 1. UPLOAD & MAIN RESIZER SECTION */}
      <div className="bg-card rounded-2xl border border-border/70 p-5 sm:p-7 md:p-8 shadow-xs">
        {/* If no image loaded yet: Big Dropzone Area */}
        {!imageSrc ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
              isDraggingFile
                ? 'border-primary bg-primary/5 scale-[0.99]'
                : 'border-border/80 hover:border-primary/50 bg-muted/15'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFile(e.target.files[0]);
                }
              }}
            />
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5">Görselinizi yükleyin</h2>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-5">
              JPG, PNG veya WebP görselinizi sürükleyip bırakın ya da bilgisayarınızdan seçin. (Maksimum 20 MB)
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-xs hover:bg-primary/90 transition-all pointer-events-none"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Görsel Seç
            </button>
          </div>
        ) : (
          /* Active Image Resizer Workspace */
          <div className="space-y-6">
            {/* Loaded Image Header Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-muted/30 border border-border/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate max-w-xs sm:max-w-md">
                    {imageFile?.name || 'Yüklenen Görsel'}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <span>
                      Orijinal: {imgNaturalSize?.width} × {imgNaturalSize?.height} px
                    </span>
                    <span>•</span>
                    <span>{((imageFile?.size || 0) / (1024 * 1024)).toFixed(2)} MB</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg bg-muted text-xs font-semibold text-foreground hover:bg-muted/80 transition-colors"
                >
                  Görseli Değiştir
                </button>
                <button
                  type="button"
                  onClick={handleResetImage}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  Kaldır
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleFile(e.target.files[0]);
                    }
                  }}
                />
              </div>
            </div>

            {/* Platform Selection Tabs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 block">
                1. Hedef Platformu Seçin
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {SOCIAL_MEDIA_PLATFORMS.map((platform) => {
                  const isSelected = platform.id === selectedPlatformId;
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => handleSelectPlatform(platform.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground shadow-xs'
                          : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <span>{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Format Selection Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  2. Görsel Formatı ve Ölçüsü
                </label>
                <span className="text-xs text-muted-foreground">
                  {activePlatform.formats.length} format mevcut
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {activePlatform.formats.map((format) => {
                  const isSelected = format.id === selectedFormatId;
                  return (
                    <button
                      key={format.id}
                      type="button"
                      onClick={() => setSelectedFormatId(format.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all relative ${
                        isSelected
                          ? 'border-primary bg-primary/5 ring-1 ring-primary shadow-xs'
                          : 'border-border/70 bg-card hover:border-primary/40 hover:bg-muted/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-semibold text-xs sm:text-sm text-foreground">
                          {format.name}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary shrink-0">
                          {format.aspectRatio}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1.5 mb-1">
                        <span className="font-mono text-sm sm:text-base font-bold text-foreground">
                          {format.width} × {format.height}
                        </span>
                        <span className="text-[11px] text-muted-foreground">px</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {format.notes}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Two-Column Editor Layout: Controls on Left, Large Canvas on Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
              {/* Left Column: Adjustments & Settings (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-5">
                {/* Sığdırma Modu (Fit vs Fill) */}
                <div className="p-4 rounded-xl bg-muted/20 border border-border/70 space-y-3">
                  <label className="text-xs font-bold text-foreground block">Kırpma ve Sığdırma Mantığı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFitMode('cover')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                        fitMode === 'cover'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/60 bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Kırp ve Doldur (Crop)
                      <span className="block text-[10px] font-normal opacity-80 mt-0.5">Alanı tam kaplar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFitMode('contain')}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-center ${
                        fitMode === 'contain'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/60 bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Tam Görseli Sığdır (Fit)
                      <span className="block text-[10px] font-normal opacity-80 mt-0.5">Hiçbir yeri kesmez</span>
                    </button>
                  </div>

                  {/* Arka Plan Rengi (Contain modunda veya şeffaflıkta) */}
                  {fitMode === 'contain' && (
                    <div className="pt-2 border-t border-border/50 space-y-2">
                      <label className="text-xs font-medium text-foreground block">Boş Alan Arka Plan Rengi</label>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setBgPreset('#ffffff')}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                            bgPreset === '#ffffff'
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
                              : 'border-border/60 text-muted-foreground'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-border bg-white" />
                          Beyaz
                        </button>
                        <button
                          type="button"
                          onClick={() => setBgPreset('#000000')}
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                            bgPreset === '#000000'
                              ? 'border-primary bg-primary/10 text-primary font-semibold'
                              : 'border-border/60 text-muted-foreground'
                          }`}
                        >
                          <span className="w-3.5 h-3.5 rounded-full border border-border bg-black" />
                          Siyah
                        </button>
                        {outputFormat !== 'image/jpeg' && (
                          <button
                            type="button"
                            onClick={() => setBgPreset('transparent')}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${
                              bgPreset === 'transparent'
                                ? 'border-primary bg-primary/10 text-primary font-semibold'
                                : 'border-border/60 text-muted-foreground'
                            }`}
                          >
                            <span className="w-3.5 h-3.5 rounded-full border border-border bg-gradient-to-tr from-gray-300 to-transparent" />
                            Şeffaf
                          </button>
                        )}
                        <div className="flex items-center gap-1.5">
                          <input
                            type="color"
                            value={customBgColor}
                            onChange={(e) => {
                              setCustomBgColor(e.target.value);
                              setBgPreset('custom');
                            }}
                            className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
                            title="Özel Renk Seç"
                          />
                          <span className="text-[11px] font-mono text-muted-foreground">
                            {bgPreset === 'custom' ? customBgColor : 'Özel'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Konumlandırma, Yakınlaştırma ve Döndürme */}
                <div className="p-4 rounded-xl bg-muted/20 border border-border/70 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground">Önizleme ve Konum Ayarları</label>
                    <button
                      type="button"
                      onClick={handleResetPosition}
                      className="text-[11px] font-medium text-primary hover:underline"
                    >
                      Konumu Sıfırla
                    </button>
                  </div>

                  {/* Zoom Slider */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Ölçek / Yakınlaştırma</span>
                      <span className="font-mono font-bold text-foreground">{Math.round(zoom * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.05"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Manual Pan Sliders */}
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Yatay (X)</span>
                        <span className="font-mono text-xs">{Math.round(offsetX * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={offsetX}
                        onChange={(e) => setOffsetX(parseFloat(e.target.value))}
                        className="w-full accent-primary h-1 bg-muted rounded cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-muted-foreground">Dikey (Y)</span>
                        <span className="font-mono text-xs">{Math.round(offsetY * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="-1"
                        max="1"
                        step="0.01"
                        value={offsetY}
                        onChange={(e) => setOffsetY(parseFloat(e.target.value))}
                        className="w-full accent-primary h-1 bg-muted rounded cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Rotate & Flip Tools */}
                  <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleRotateCcw}
                        title="90° Sola Döndür"
                        className="p-2 rounded-lg bg-card border border-border/70 hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 10h10a5 5 0 015 5v2m0 0l-3-3m3 3l3-3M3 10l3-3m-3 3l3 3"
                          />
                        </svg>
                        -90°
                      </button>
                      <button
                        type="button"
                        onClick={handleRotateCw}
                        title="90° Sağa Döndür"
                        className="p-2 rounded-lg bg-card border border-border/70 hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 10H11a5 5 0 00-5 5v2m0 0l3-3m-3 3l-3-3m17-4l-3-3m3 3l-3 3"
                          />
                        </svg>
                        +90°
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleFlipHorizontal}
                        title="Yatay Çevir"
                        className={`p-2 rounded-lg border text-xs font-semibold ${
                          flipX ? 'border-primary bg-primary/10 text-primary' : 'bg-card border-border/70 text-foreground'
                        }`}
                      >
                        Yatay Çevir
                      </button>
                    </div>
                  </div>
                </div>

                {/* Çıktı ve Format Ayarları */}
                <div className="p-4 rounded-xl bg-muted/20 border border-border/70 space-y-3.5">
                  <label className="text-xs font-bold text-foreground block">Çıktı Formatı ve Kalite</label>

                  {/* Format Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'JPG', value: 'image/jpeg' as OutputFormat },
                      { label: 'PNG', value: 'image/png' as OutputFormat },
                      { label: 'WebP', value: 'image/webp' as OutputFormat },
                    ].map((fmt) => (
                      <button
                        key={fmt.value}
                        type="button"
                        onClick={() => setOutputFormat(fmt.value)}
                        className={`py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          outputFormat === fmt.value
                            ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                            : 'border-border/60 bg-card text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {fmt.label}
                      </button>
                    ))}
                  </div>

                  {/* Quality Slider (for JPG & WebP) */}
                  {outputFormat !== 'image/png' ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Sıkıştırma Kalitesi</span>
                        <span className="font-mono font-bold text-foreground">%{quality}</span>
                      </div>
                      <input
                        type="range"
                        min="60"
                        max="100"
                        step="5"
                        value={quality}
                        onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                        className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                      />
                    </div>
                  ) : (
                    <p className="text-[11px] text-muted-foreground bg-muted/40 p-2 rounded-lg">
                      💡 PNG formatı kayıpsız (lossless) olduğu için kalite ayarı uygulanmaz.
                    </p>
                  )}

                  {/* Custom File Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] text-muted-foreground">İndirilecek Dosya Adı</label>
                    <input
                      type="text"
                      placeholder={defaultFileName}
                      value={customFileName}
                      onChange={(e) => setCustomFileName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-card border border-border/80 rounded-lg text-foreground font-mono focus:outline-none focus:border-primary placeholder:text-muted-foreground/60"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Live Preview Area (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Canlı Önizleme
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                      {activeFormat.width} × {activeFormat.height} px
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground hidden sm:inline">
                    🖱️ Görseli sürükleyerek hizalayabilirsiniz
                  </span>
                </div>

                {/* Canvas Display Viewport */}
                <div className="w-full flex items-center justify-center p-3 sm:p-5 rounded-2xl bg-neutral-900/5 dark:bg-neutral-900/40 border border-border/60 min-h-[340px] sm:min-h-[420px] overflow-hidden">
                  <div
                    className="relative max-w-full max-h-[500px] flex items-center justify-center shadow-lg rounded-lg overflow-hidden border border-border/40"
                    style={{
                      aspectRatio: `${activeFormat.width} / ${activeFormat.height}`,
                    }}
                  >
                    <canvas
                      ref={previewCanvasRef}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerCancel={handlePointerUp}
                      className="max-w-full max-h-[480px] w-auto h-auto object-contain cursor-grab active:cursor-grabbing select-none touch-none"
                    />
                  </div>
                </div>

                {/* Target Information Badge Bar */}
                <div className="w-full mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
                  <span>
                    Hedef: <strong className="text-foreground">{activePlatform.name} {activeFormat.name}</strong>
                  </span>
                  <span>Oran: <strong className="text-foreground">{activeFormat.aspectRatio}</strong></span>
                </div>

                {/* CTA Action Button */}
                <div className="w-full mt-5 space-y-3">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isProcessing}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base shadow-sm hover:bg-primary/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Hazırlanıyor...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Görseli İndir ({activeFormat.width} × {activeFormat.height} px)
                      </>
                    )}
                  </button>

                  {/* Feedback Messages */}
                  {successMessage && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-700 dark:text-emerald-300 text-center animate-fade-in">
                      ✓ {successMessage}
                    </div>
                  )}

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-700 dark:text-red-300 text-center">
                      ⚠️ {errorMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. PRIVACY GUARANTEE BADGE */}
      <PrivacyBadge />

      {/* 3. REFERENCE SECTION: PRESERVED SOCIAL MEDIA IMAGE SIZES GUIDE */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="mb-6">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mb-1">
            Sosyal Medya Görsel Boyutları Rehberi
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Platformlara göre güncel piksel standartları, en boy oranları ve önerilen formatlar.
          </p>
        </div>

        {/* Platform Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {SOCIAL_MEDIA_PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              onClick={() => setInfoActivePlatform(platform.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                infoActivePlatform === platform.id
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              {platform.name}
            </button>
          ))}
        </div>

        {/* Boyut Tablosu / Listesi */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-bold text-foreground uppercase tracking-wider">
              {currentInfoPlatform.name} Standart Ölçüleri
            </span>
            <span className="text-xs text-muted-foreground">
              {currentInfoPlatform.formats.length} farklı format
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {currentInfoPlatform.formats.map((size, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-muted/20 border border-border/80 hover:border-primary/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-sm text-foreground">{size.name}</h3>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {size.aspectRatio}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-lg sm:text-xl font-bold text-foreground">
                      {size.width} × {size.height}
                    </span>
                    <span className="text-xs text-muted-foreground">piksel (px)</span>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {size.notes}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-muted-foreground">Format: {size.recommendedFormat}</span>
                  <button
                    type="button"
                    onClick={() => handleCopySize(size.width, size.height, index)}
                    className="font-semibold text-primary hover:underline"
                  >
                    {copiedIndex === index ? 'Kopyalandı!' : 'Boyutu Kopyala'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
