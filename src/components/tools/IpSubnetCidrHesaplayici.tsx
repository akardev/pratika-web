'use client';

import { useState } from 'react';

function ipToInt(ip: string): number {
  return ip.split('.').reduce((acc, oct) => (acc << 8) + parseInt(oct, 10), 0) >>> 0;
}

function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255,
  ].join('.');
}

export default function IpSubnetCidrHesaplayici() {
  const [ipStr, setIpStr] = useState<string>('192.168.1.100');
  const [cidr, setCidr] = useState<number>(24);
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    networkIp: string;
    broadcastIp: string;
    netmask: string;
    firstHost: string;
    lastHost: string;
    totalHosts: number;
    usableHosts: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const parts = ipStr.trim().split('.');
    if (parts.length !== 4 || parts.some(p => isNaN(Number(p)) || Number(p) < 0 || Number(p) > 255)) {
      setError('Lütfen geçerli bir IPv4 adresi girin (örn: 192.168.1.1).');
      return;
    }

    const ipInt = ipToInt(ipStr.trim());
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | ~maskInt) >>> 0;

    const totalHosts = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

    const firstHost = cidr >= 31 ? intToIp(netInt) : intToIp(netInt + 1);
    const lastHost = cidr >= 31 ? intToIp(bcastInt) : intToIp(bcastInt - 1);

    setResult({
      networkIp: intToIp(netInt),
      broadcastIp: intToIp(bcastInt),
      netmask: intToIp(maskInt),
      firstHost,
      lastHost,
      totalHosts,
      usableHosts,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="ip" className="block text-sm font-medium text-foreground mb-1">IPv4 Adresi</label>
              <input
                id="ip"
                type="text"
                value={ipStr}
                onChange={(e) => setIpStr(e.target.value)}
                placeholder="Örn: 192.168.1.100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm font-mono"
              />
            </div>
            <div>
              <label htmlFor="cidr" className="block text-sm font-medium text-foreground mb-1">Alt Ağ Maskesi (CIDR)</label>
              <select
                id="cidr"
                value={cidr}
                onChange={(e) => setCidr(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm font-mono"
              >
                {Array.from({ length: 32 }, (_, i) => 32 - i).map(c => (
                  <option key={c} value={c}>/{c}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Subnet Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4 font-mono">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-sans">Alt Ağ Parametreleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-muted/20 border border-border rounded-lg">
                <span className="text-muted-foreground block mb-0.5">Ağ Adresi (Network IP):</span>
                <span className="text-sm font-bold text-foreground">{result.networkIp}</span>
              </div>
              <div className="p-3 bg-muted/20 border border-border rounded-lg">
                <span className="text-muted-foreground block mb-0.5">Alt Ağ Maskesi (Subnet Mask):</span>
                <span className="text-sm font-bold text-foreground">{result.netmask}</span>
              </div>
              <div className="p-3 bg-muted/20 border border-border rounded-lg">
                <span className="text-muted-foreground block mb-0.5">Yayın Adresi (Broadcast IP):</span>
                <span className="text-sm font-bold text-foreground">{result.broadcastIp}</span>
              </div>
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <span className="text-muted-foreground block mb-0.5">Kullanılabilir Cihaz (Host):</span>
                <span className="text-sm font-bold text-primary">{result.usableHosts.toLocaleString('tr-TR')} Adet</span>
              </div>
              <div className="p-3 bg-muted/20 border border-border rounded-lg sm:col-span-2">
                <span className="text-muted-foreground block mb-0.5">Kullanılabilir IP Aralığı:</span>
                <span className="text-sm font-bold text-foreground">{result.firstHost} — {result.lastHost}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
