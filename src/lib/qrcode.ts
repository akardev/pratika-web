/**
 * Lightweight Pure Client-side QR Code Generator
 * Generates an SVG string representation of a QR code.
 */

// GF(256) tables for Reed-Solomon
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);

(function initGalois() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP_TABLE[i] = x;
    EXP_TABLE[i + 255] = x;
    LOG_TABLE[x] = i;
    x <<= 1;
    if (x >= 256) x ^= 0x11d;
  }
})();

function gfMul(x: number, y: number): number {
  if (x === 0 || y === 0) return 0;
  return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
}

function rsCompute(data: number[], ecCount: number): number[] {
  let gen = [1];
  for (let i = 0; i < ecCount; i++) {
    const nextGen = new Array(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      nextGen[j] ^= gfMul(gen[j], EXP_TABLE[i]);
      nextGen[j + 1] ^= gen[j];
    }
    gen = nextGen;
  }

  const res = new Array(ecCount).fill(0);
  for (let i = 0; i < data.length; i++) {
    const factor = data[i] ^ res[0];
    res.shift();
    res.push(0);
    for (let j = 0; j < ecCount; j++) {
      res[j] ^= gfMul(gen[j], factor);
    }
  }
  return res;
}

export function generateQrSvgDataUri(text: string): string {
  const utf8 = new TextEncoder().encode(text || 'Pratika');
  const dataLen = utf8.length;
  
  // Choose QR Version based on length
  let version = 1;
  let totalDataBytes = 19;
  let ecBytes = 7;
  let size = 21;

  if (dataLen <= 17) {
    version = 1; totalDataBytes = 19; ecBytes = 7; size = 21;
  } else if (dataLen <= 32) {
    version = 2; totalDataBytes = 34; ecBytes = 10; size = 25;
  } else if (dataLen <= 53) {
    version = 3; totalDataBytes = 55; ecBytes = 15; size = 29;
  } else if (dataLen <= 78) {
    version = 4; totalDataBytes = 80; ecBytes = 20; size = 33;
  } else if (dataLen <= 106) {
    version = 5; totalDataBytes = 108; ecBytes = 26; size = 37;
  } else {
    version = 6; totalDataBytes = 136; ecBytes = 36; size = 41;
  }

  // Create BitBuffer
  const bitBuf: number[] = [];
  function pushBits(val: number, numBits: number) {
    for (let i = numBits - 1; i >= 0; i--) {
      bitBuf.push((val >> i) & 1);
    }
  }

  // Mode: 8-bit Byte (0100)
  pushBits(0b0100, 4);
  // Char count (8 bits for v1-9)
  pushBits(dataLen, 8);
  // Data bytes
  for (let i = 0; i < dataLen; i++) {
    pushBits(utf8[i], 8);
  }
  // Terminator (up to 4 zeros)
  const maxBits = (totalDataBytes - ecBytes) * 8;
  const termLen = Math.min(4, maxBits - bitBuf.length);
  for (let i = 0; i < termLen; i++) bitBuf.push(0);

  // Pad to byte
  while (bitBuf.length % 8 !== 0) bitBuf.push(0);

  // Pad bytes 0xEC, 0x11
  const dataBytes: number[] = [];
  for (let i = 0; i < bitBuf.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | bitBuf[i + j];
    dataBytes.push(b);
  }
  const maxDataBytes = totalDataBytes - ecBytes;
  let padByte = 0xec;
  while (dataBytes.length < maxDataBytes) {
    dataBytes.push(padByte);
    padByte = padByte === 0xec ? 0x11 : 0xec;
  }

  // Error correction
  const ec = rsCompute(dataBytes, ecBytes);
  const finalBytes = [...dataBytes, ...ec];

  // Grid initialization
  const grid: (boolean | null)[][] = Array.from({ length: size }, () =>
    Array(size).fill(null)
  );

  // Finder patterns
  function addFinder(r: number, c: number) {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const py = r + y;
        const px = c + x;
        if (py >= 0 && py < size && px >= 0 && px < size) {
          if (y === -1 || y === 7 || x === -1 || x === 7) {
            grid[py][px] = false;
          } else if (y === 0 || y === 6 || x === 0 || x === 6) {
            grid[py][px] = true;
          } else if (y >= 2 && y <= 4 && x >= 2 && x <= 4) {
            grid[py][px] = true;
          } else {
            grid[py][px] = false;
          }
        }
      }
    }
  }

  addFinder(0, 0);
  addFinder(0, size - 7);
  addFinder(size - 7, 0);

  // Timing patterns
  for (let i = 8; i < size - 8; i++) {
    if (grid[6][i] === null) grid[6][i] = i % 2 === 0;
    if (grid[i][6] === null) grid[i][6] = i % 2 === 0;
  }

  // Alignment pattern for v2+
  if (version >= 2) {
    const alignPos = [size - 7];
    for (const ar of alignPos) {
      for (const ac of alignPos) {
        if (grid[ar][ac] !== null) continue;
        for (let y = -2; y <= 2; y++) {
          for (let x = -2; x <= 2; x++) {
            grid[ar + y][ac + x] =
              Math.max(Math.abs(y), Math.abs(x)) !== 1;
          }
        }
      }
    }
  }

  // Dark module
  grid[size - 8][8] = true;

  // Format info area reservation
  for (let i = 0; i < 9; i++) {
    if (grid[8][i] === null) grid[8][i] = false;
    if (grid[i][8] === null) grid[i][8] = false;
  }
  for (let i = size - 8; i < size; i++) {
    if (grid[8][i] === null) grid[8][i] = false;
    if (grid[i][8] === null) grid[i][8] = false;
  }

  // Place data bits with Mask 0 ((r+c)%2===0)
  let byteIdx = 0;
  let bitIdx = 7;
  let goingUp = true;

  for (let c = size - 1; c > 0; c -= 2) {
    if (c === 6) c--; // Skip vertical timing column
    const rows = goingUp
      ? Array.from({ length: size }, (_, i) => size - 1 - i)
      : Array.from({ length: size }, (_, i) => i);

    for (const r of rows) {
      for (const col of [c, c - 1]) {
        if (grid[r][col] === null) {
          let bit = 0;
          if (byteIdx < finalBytes.length) {
            bit = (finalBytes[byteIdx] >> bitIdx) & 1;
            bitIdx--;
            if (bitIdx < 0) {
              bitIdx = 7;
              byteIdx++;
            }
          }
          // Mask 0: (r + col) % 2 === 0
          const mask = (r + col) % 2 === 0;
          grid[r][col] = (bit === 1) !== mask;
        }
      }
    }
    goingUp = !goingUp;
  }

  // Format bits for Error Level L + Mask 0: 0x77C4 -> 111011111000100
  const formatBits = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0];
  const formatPosTop = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = formatPosTop[i];
    grid[r][c] = formatBits[i] === 1;
  }

  // Generate SVG string
  const margin = 2;
  const viewBoxSize = size + margin * 2;
  let paths = '';

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c]) {
        paths += `M${c + margin},${r + margin}h1v1h-1z `;
      }
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}" shape-rendering="crispEdges"><rect width="${viewBoxSize}" height="${viewBoxSize}" fill="#ffffff"/><path d="${paths}" fill="#000000"/></svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
