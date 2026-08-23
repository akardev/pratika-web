import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 minutes cache

export interface MarketItem {
  code: string;
  name: string;
  value: number;
  symbol: string;
  prefix?: string;
  decimals: number;
}

export interface MarketsResponse {
  success: boolean;
  data?: {
    usd: MarketItem;
    eur: MarketItem;
    gold: MarketItem;
    updatedAt: string;
  };
  error?: string;
}

const TROY_OUNCE_IN_GRAMS = 31.1034768;

export async function GET() {
  try {
    // 1. Fetch Currency Rates (USD/TRY, EUR/TRY)
    let usdTry = 0;
    let eurTry = 0;

    try {
      const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5000),
      });

      if (fxRes.ok) {
        const fxData = await fxRes.json();
        usdTry = fxData?.rates?.TRY || 0;
        const usdEur = fxData?.rates?.EUR || 1;
        eurTry = usdEur > 0 ? usdTry / usdEur : 0;
      }
    } catch {
      // ignore, will fallback
    }

    // 2. Fetch Gold Price (XAU/USD)
    let gramGoldTry = 0;
    try {
      const goldRes = await fetch('https://api.gold-api.com/price/XAU', {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5000),
      });

      if (goldRes.ok) {
        const goldData = await goldRes.json();
        const ounceGoldUsd = goldData?.price || 0;
        if (ounceGoldUsd > 0 && usdTry > 0) {
          gramGoldTry = (ounceGoldUsd * usdTry) / TROY_OUNCE_IN_GRAMS;
        }
      }
    } catch {
      // ignore, will fallback
    }

    // If both failed or invalid
    if (usdTry <= 0 || eurTry <= 0) {
      return NextResponse.json<MarketsResponse>(
        {
          success: false,
          error: 'Piyasa verileri şu anda alınamıyor.',
        },
        { status: 503 }
      );
    }

    const payload: MarketsResponse = {
      success: true,
      data: {
        usd: {
          code: 'USD/TRY',
          name: 'Dolar',
          value: Number(usdTry.toFixed(2)),
          symbol: '₺',
          decimals: 2,
        },
        eur: {
          code: 'EUR/TRY',
          name: 'Euro',
          value: Number(eurTry.toFixed(2)),
          symbol: '₺',
          decimals: 2,
        },
        gold: {
          code: 'ALTIN',
          name: 'Gram Altın',
          value: gramGoldTry > 0 ? Number(gramGoldTry.toFixed(1)) : 0,
          symbol: '₺',
          decimals: 1,
        },
        updatedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return NextResponse.json<MarketsResponse>(
      {
        success: false,
        error: 'Piyasa verileri servisine ulaşılamadı.',
      },
      { status: 500 }
    );
  }
}
