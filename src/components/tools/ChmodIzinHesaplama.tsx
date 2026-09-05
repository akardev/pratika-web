'use client';

import { useState } from 'react';

export default function ChmodIzinHesaplama() {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true },
  });

  const calcNum = (p: { read: boolean; write: boolean; execute: boolean }) => {
    return (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
  };

  const calcSym = (p: { read: boolean; write: boolean; execute: boolean }) => {
    return (p.read ? 'r' : '-') + (p.write ? 'w' : '-') + (p.execute ? 'x' : '-');
  };

  const octal = `${calcNum(permissions.owner)}${calcNum(permissions.group)}${calcNum(permissions.others)}`;
  const symbolic = `-${calcSym(permissions.owner)}${calcSym(permissions.group)}${calcSym(permissions.others)}`;

  const handleOctalInput = (val: string) => {
    if (val.length === 3 && /^[0-7]{3}$/.test(val)) {
      const parseOct = (n: number) => ({
        read: (n & 4) !== 0,
        write: (n & 2) !== 0,
        execute: (n & 1) !== 0,
      });
      setPermissions({
        owner: parseOct(Number(val[0])),
        group: parseOct(Number(val[1])),
        others: parseOct(Number(val[2])),
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Owner */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Dosya Sahibi (Owner)</h4>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.owner.read}
                onChange={(e) => setPermissions({ ...permissions, owner: { ...permissions.owner, read: e.target.checked } })}
                className="rounded border-border"
              />
              Okuma (Read - 4)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.owner.write}
                onChange={(e) => setPermissions({ ...permissions, owner: { ...permissions.owner, write: e.target.checked } })}
                className="rounded border-border"
              />
              Yazma (Write - 2)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.owner.execute}
                onChange={(e) => setPermissions({ ...permissions, owner: { ...permissions.owner, execute: e.target.checked } })}
                className="rounded border-border"
              />
              Çalıştırma (Execute - 1)
            </label>
          </div>

          {/* Group */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Grup (Group)</h4>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.group.read}
                onChange={(e) => setPermissions({ ...permissions, group: { ...permissions.group, read: e.target.checked } })}
                className="rounded border-border"
              />
              Okuma (Read - 4)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.group.write}
                onChange={(e) => setPermissions({ ...permissions, group: { ...permissions.group, write: e.target.checked } })}
                className="rounded border-border"
              />
              Yazma (Write - 2)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.group.execute}
                onChange={(e) => setPermissions({ ...permissions, group: { ...permissions.group, execute: e.target.checked } })}
                className="rounded border-border"
              />
              Çalıştırma (Execute - 1)
            </label>
          </div>

          {/* Others */}
          <div className="p-4 rounded-lg border border-border bg-muted/20 space-y-3">
            <h4 className="font-semibold text-sm text-foreground">Diğerleri (Public)</h4>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.others.read}
                onChange={(e) => setPermissions({ ...permissions, others: { ...permissions.others, read: e.target.checked } })}
                className="rounded border-border"
              />
              Okuma (Read - 4)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.others.write}
                onChange={(e) => setPermissions({ ...permissions, others: { ...permissions.others, write: e.target.checked } })}
                className="rounded border-border"
              />
              Yazma (Write - 2)
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={permissions.others.execute}
                onChange={(e) => setPermissions({ ...permissions, others: { ...permissions.others, execute: e.target.checked } })}
                className="rounded border-border"
              />
              Çalıştırma (Execute - 1)
            </label>
          </div>
        </div>

        <div className="pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <span className="text-xs text-muted-foreground block mb-1">Sayısal Chmod Kodu</span>
            <input
              type="text"
              maxLength={3}
              value={octal}
              onChange={(e) => handleOctalInput(e.target.value)}
              className="text-2xl font-bold text-primary bg-transparent w-full border-b border-primary/30 font-mono"
            />
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Sembolik İfade</span>
            <span className="text-2xl font-bold font-mono text-foreground">{symbolic}</span>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <span className="text-xs text-muted-foreground block mb-1">Terminal Komutu</span>
            <span className="text-sm font-mono text-foreground font-semibold">chmod {octal} dosya_adi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
