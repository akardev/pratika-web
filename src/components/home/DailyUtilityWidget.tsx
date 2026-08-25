'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { getTodayInHistory } from '@/data/todayInHistory';

interface MarketItem {
  code: string;
  name: string;
  value: number;
  symbol: string;
  decimals: number;
}

interface MarketsData {
  usd: MarketItem;
  eur: MarketItem;
  gold: MarketItem;
  updatedAt: string;
}

const CACHE_KEY_MARKETS = 'pratika_markets_cache_v1';
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function DailyUtilityWidget() {
  const isClient = useIsClient();
  const [markets, setMarkets] = useState<MarketsData | null>(null);
  const [marketsLoading, setMarketsLoading] = useState(false);
  const [marketsError, setMarketsError] = useState<string | null>(null);

  // Fetch Market Rates safely with local cache on client
  useEffect(() => {
    if (!isClient) return;

    let ignore = false;

    const loadMarkets = async () => {
      // Try local cache
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY_MARKETS);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached?.data && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            if (!ignore) {
              setMarkets(cached.data);
              setMarketsError(null);
            }
            return;
          }
        }
      } catch {
        // ignore cache read error
      }

      if (!ignore) {
        setMarketsLoading(true);
        setMarketsError(null);
      }

      try {
        const res = await fetch('/api/markets', { signal: AbortSignal.timeout(6000) });
        if (!res.ok) {
          throw new Error('Piyasa servisi yanıt vermedi.');
        }

        const data = await res.json();
        if (data?.success && data?.data) {
          if (!ignore) {
            setMarkets(data.data);
            setMarketsError(null);
            try {
              localStorage.setItem(
                CACHE_KEY_MARKETS,
                JSON.stringify({ data: data.data, timestamp: Date.now() })
              );
            } catch {
              // ignore storage error
            }
          }
        } else {
          throw new Error('Piyasa verisi formatı geçersiz.');
        }
      } catch {
        if (!ignore) {
          setMarketsError('Piyasa verileri şu anda kullanılamıyor.');
        }
      } finally {
        if (!ignore) {
          setMarketsLoading(false);
        }
      }
    };

    loadMarkets();

    return () => {
      ignore = true;
    };
  }, [isClient]);

  // Format currency value safely in Turkish locale
  const formatMoney = (val: number, decimals: number = 2) => {
    return val.toLocaleString('tr-TR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  if (!isClient) {
    return (
      <section className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-52 rounded-2xl bg-card border border-border/60 animate-pulse" />
            <div className="h-24 rounded-2xl bg-card border border-border/60 animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  const now = new Date();
  const todayInHistory = getTodayInHistory(now);

  return (
    <section
      aria-label="Tarihte Bugün ve Piyasalar"
      className="py-3.5 sm:py-5 px-4 sm:px-6 lg:px-8 border-b border-border/60 bg-muted/10"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* ============================================================ */}
          {/* 1. TARİHTE BUGÜN                                             */}
          {/* ============================================================ */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card shadow-2xs flex flex-col">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Tarihte Bugün</span>
              </div>

              <span className="text-[11px] text-muted-foreground font-medium">
                Tarih arşivi
              </span>
            </div>

            <div className="mt-1 space-y-2.5">
              {todayInHistory.events.length > 0 ? todayInHistory.events.slice(0, 3).map((event) => (
                <div key={`${event.year}-${event.title}`} className="flex gap-3">
                  <span className="shrink-0 pt-0.5 font-mono text-[11px] font-semibold text-primary">
                    {event.year}
                  </span>
                  <p className="min-w-0 text-xs sm:text-sm font-medium leading-snug text-foreground">
                    {event.title}
                  </p>
                </div>
              )) : (
                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  Bu tarih için henüz doğrulanmış bir içerik bulunmuyor.
                </p>
              )}
            </div>

            <div className="mt-3 border-t border-border/50 pt-2.5">
              <Link
                href="/tarihte-bugun"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80 hover:underline"
              >
                Daha fazlasını gör <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2. PİYASALAR (USD/TRY, EUR/TRY, GRAM ALTIN)                   */}
          {/* ============================================================ */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-card shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-wider">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <span>Piyasalar</span>
              </div>

              <span className="text-[11px] text-muted-foreground font-medium">
                Canlı Kurlar
              </span>
            </div>

            {marketsLoading && !markets ? (
              <div className="grid grid-cols-3 gap-2 my-2 animate-pulse">
                <div className="h-9 bg-muted/60 rounded-lg" />
                <div className="h-9 bg-muted/60 rounded-lg" />
                <div className="h-9 bg-muted/60 rounded-lg" />
              </div>
            ) : marketsError && !markets ? (
              <div className="my-2 py-1 text-xs text-muted-foreground flex items-center justify-between">
                <span>{marketsError}</span>
              </div>
            ) : markets ? (
              <div className="grid grid-cols-3 gap-2 my-1">
                {/* USD */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold uppercase">
                    USD / TRY
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-foreground mt-0.5">
                    ₺{formatMoney(markets.usd.value, 2)}
                  </div>
                </div>

                {/* EUR */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold uppercase">
                    EUR / TRY
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-foreground mt-0.5">
                    ₺{formatMoney(markets.eur.value, 2)}
                  </div>
                </div>

                {/* Gram Altın */}
                <div className="p-2 sm:p-2.5 rounded-xl bg-muted/30 border border-border/50">
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground font-semibold uppercase">
                    Gram Altın
                  </div>
                  <div className="text-xs sm:text-sm font-bold font-mono text-foreground mt-0.5">
                    ₺{markets.gold.value > 0 ? formatMoney(markets.gold.value, 0) : '-'}
                  </div>
                </div>
              </div>
            ) : null}

            <div className="pt-2 mt-1 border-t border-border/50 text-[11px] text-muted-foreground flex items-center justify-between">
              <span>Canlı serbest piyasa</span>
              <span className="text-[10px] text-muted-foreground/80 font-mono">
                {markets?.updatedAt ? 'Otomatik güncellenir' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
