import QRCode from 'qrcode';

export interface QrCodeOptions {
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  margin?: number;
  width?: number;
  color?: {
    dark?: string;
    light?: string;
  };
}

export function generateQrSvgString(
  text: string,
  options?: QrCodeOptions
): string {
  const safeText = text.trim() || 'https://pratiksel.com';
  const qr = QRCode.create(safeText, {
    errorCorrectionLevel: options?.errorCorrectionLevel || 'M',
  });

  const size = qr.modules.size;
  const data = qr.modules.data;
  const margin = options?.margin ?? 2;
  const viewBoxSize = size + margin * 2;
  const dark = options?.color?.dark || '#000000';
  const light = options?.color?.light || '#ffffff';

  let paths = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (data[r * size + c]) {
        paths += `M${c + margin},${r + margin}h1v1h-1z `;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" shape-rendering="crispEdges"><rect width="${viewBoxSize}" height="${viewBoxSize}" fill="${light}"/><path d="${paths}" fill="${dark}"/></svg>`;
}

export function generateQrSvgDataUri(
  text: string,
  options?: QrCodeOptions
): string {
  const svg = generateQrSvgString(text, options);
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
