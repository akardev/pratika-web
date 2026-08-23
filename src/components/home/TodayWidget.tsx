'use client';

import React, { useState, useEffect, useId, useSyncExternalStore } from 'react';
import { TURKEY_CITIES, CityCoordinate, getWeatherCondition, WeatherCondition } from '@/data/todayData';
import WeatherIcon from './WeatherIcon';

interface WeatherData {
  temp: number;
  apparentTemp: number;
  tempMax: number;
  tempMin: number;
  condition: WeatherCondition;
  cityName: string;
  timestamp: number;
}

const CACHE_KEY_WEATHER = 'pratika_today_weather_v1';
const CACHE_KEY_LOCATION = 'pratika_today_location_v1';
const CACHE_KEY_DISMISSED = 'pratika_today_dismissed_v1';
const CACHE_TTL_MS = 20 * 60 * 1000; // 20 minutes

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

function getStoredCity(): CityCoordinate {
  if (typeof window === 'undefined') return TURKEY_CITIES[0];
  try {
    const raw = localStorage.getItem(CACHE_KEY_LOCATION);
    if (raw) {
      const parsed = JSON.parse(raw) as CityCoordinate;
      if (parsed?.name && parsed?.lat && parsed?.lng) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return TURKEY_CITIES[0];
}

function getStoredDismissed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(CACHE_KEY_DISMISSED) === 'true';
  } catch {
    return false;
  }
}

export default function TodayWidget() {
  const isClient = useIsClient();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [searchCityQuery, setSearchCityQuery] = useState('');
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('');
  const [currentDateStr, setCurrentDateStr] = useState<string>('');
  const [isDismissed, setIsDismissed] = useState<boolean>(getStoredDismissed);
  const [activeCity, setActiveCity] = useState<CityCoordinate>(getStoredCity);
  const [isLocating, setIsLocating] = useState(false);
  const citySearchInputId = useId();

  // 1. Calculate Date and Time on Client to prevent hydration mismatch
  useEffect(() => {
    if (!isClient) return;

    const updateDateTime = () => {
      const now = new Date();
      const dateFormatted = now.toLocaleDateString('tr-TR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      });
      const timeFormatted = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      setCurrentDateStr(dateFormatted);
      setCurrentTimeStr(timeFormatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 30000);
    return () => clearInterval(interval);
  }, [isClient]);

  // 2. Fetch Weather Data safely inside Effect with ignore flag
  useEffect(() => {
    if (!isClient) return;

    let ignore = false;

    const loadWeather = async () => {
      // 1. Try local cache
      try {
        const cachedRaw = localStorage.getItem(CACHE_KEY_WEATHER);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw) as WeatherData;
          if (cached.cityName === activeCity.name && Date.now() - cached.timestamp < CACHE_TTL_MS) {
            if (!ignore) {
              setWeather(cached);
              setError(null);
            }
            return;
          }
        }
      } catch {
        // ignore cache read error
      }

      if (!ignore) {
        setLoading(true);
        setError(null);
      }

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${activeCity.lat}&longitude=${activeCity.lng}&current=temperature_2m,apparent_temperature,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
        const res = await fetch(url, { signal: AbortSignal.timeout(6000) });

        if (!res.ok) {
          throw new Error('Hava durumu servisi yanıt vermedi.');
        }

        const data = await res.json();
        const current = data.current;
        const daily = data.daily;

        const condition = getWeatherCondition(
          current?.weather_code ?? 0,
          current?.is_day === 1
        );

        const weatherObj: WeatherData = {
          temp: Math.round(current?.temperature_2m ?? 0),
          apparentTemp: Math.round(current?.apparent_temperature ?? current?.temperature_2m ?? 0),
          tempMax: Math.round(daily?.temperature_2m_max?.[0] ?? current?.temperature_2m ?? 0),
          tempMin: Math.round(daily?.temperature_2m_min?.[0] ?? current?.temperature_2m ?? 0),
          condition,
          cityName: activeCity.name,
          timestamp: Date.now(),
        };

        if (!ignore) {
          setWeather(weatherObj);
          setError(null);
          try {
            localStorage.setItem(CACHE_KEY_WEATHER, JSON.stringify(weatherObj));
          } catch {
            // ignore storage error
          }
        }
      } catch {
        if (!ignore) {
          setError('Hava durumu bilgisi şu anda alınamıyor.');
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      ignore = true;
    };
  }, [isClient, activeCity]);

  // 3. Request Geolocation on user click
  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Tarayıcınız konum özelliğini desteklemiyor.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // Find nearest city in our dataset
        let nearestCity = TURKEY_CITIES[0];
        let minDistance = Infinity;

        for (const c of TURKEY_CITIES) {
          const d = Math.hypot(c.lat - latitude, c.lng - longitude);
          if (d < minDistance) {
            minDistance = d;
            nearestCity = c;
          }
        }

        const selectedCity: CityCoordinate = {
          name: nearestCity.name,
          lat: latitude,
          lng: longitude,
        };

        setActiveCity(selectedCity);
        try {
          localStorage.setItem(CACHE_KEY_LOCATION, JSON.stringify(selectedCity));
        } catch {
          // ignore
        }

        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setIsCityModalOpen(true);
      },
      { timeout: 8000, maximumAge: 60000 }
    );
  };

  // 4. Select City manually
  const handleSelectCity = (city: CityCoordinate) => {
    setActiveCity(city);
    try {
      localStorage.setItem(CACHE_KEY_LOCATION, JSON.stringify(city));
    } catch {
      // ignore
    }
    setIsCityModalOpen(false);
  };

  // 5. Dismiss / Close Widget
  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem(CACHE_KEY_DISMISSED, 'true');
    } catch {
      // ignore
    }
  };

  const handleRestore = () => {
    setIsDismissed(false);
    try {
      localStorage.removeItem(CACHE_KEY_DISMISSED);
    } catch {
      // ignore
    }
  };

  // If SSR or not hydrated yet: render minimal matching shell to avoid layout shift
  if (!isClient) {
    return (
      <div className="w-full border-b border-border/60 bg-muted/20 py-2 sm:py-2.5">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="h-4 w-40 sm:w-56 bg-muted rounded animate-pulse" />
          <div className="h-4 w-28 sm:w-48 bg-muted rounded animate-pulse" />
        </div>
      </div>
    );
  }

  // If user dismissed: render subtle compact restore bar
  if (isDismissed) {
    return (
      <div className="w-full border-b border-border/40 bg-muted/10 py-1">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex justify-end">
          <button
            type="button"
            onClick={handleRestore}
            className="text-[11px] text-muted-foreground/70 hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
            aria-label="Bugün ve hava durumu çubuğunu göster"
          >
            <span>Bugün ve Hava Durumu</span>
            <span aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    );
  }

  const filteredCities = TURKEY_CITIES.filter((c) =>
    c.name.toLocaleLowerCase('tr-TR').includes(searchCityQuery.trim().toLocaleLowerCase('tr-TR'))
  );

  const ariaDescription = weather
    ? `Bugün, ${currentDateStr}. ${weather.cityName}'de hava ${weather.condition.label.toLowerCase()}, sıcaklık ${weather.temp} derece, hissedilen ${weather.apparentTemp} derece, yerel saat ${currentTimeStr}.`
    : `Bugün, ${currentDateStr}.`;

  return (
    <aside
      aria-label="Günlük Bilgiler ve Hava Durumu"
      className="w-full border-b border-border/60 bg-card/60 backdrop-blur-xs transition-all"
    >
      <div
        className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-xs text-foreground"
        aria-label={ariaDescription}
      >
        <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-3">
          {/* Sol Kısım: Bugün Rozeti + Tarih + Saat */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <span className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-primary/10 text-primary uppercase tracking-wider">
              Bugün
            </span>
            <span className="font-medium text-foreground text-xs sm:text-sm">
              {currentDateStr || 'Bugün'}
            </span>
            {currentTimeStr && (
              <>
                <span className="text-border/80 text-xs hidden sm:inline" aria-hidden="true">•</span>
                <span className="font-mono text-muted-foreground text-xs hidden sm:inline">
                  {currentTimeStr}
                </span>
              </>
            )}
          </div>

          {/* Sağ Kısım: Şehir + Hava Durumu + Konum + Kapat */}
          <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
            {loading ? (
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                <span className="text-[11px] sm:text-xs">Hava durumu alınıyor...</span>
              </div>
            ) : error ? (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">{activeCity.name}</span>
                <span className="text-[11px] text-amber-600 hidden xs:inline">
                  (Bağlanılamadı)
                </span>
                <button
                  type="button"
                  onClick={() => setIsCityModalOpen(true)}
                  className="text-primary hover:underline text-xs font-medium cursor-pointer"
                >
                  Şehir Seç
                </button>
              </div>
            ) : weather ? (
              <div className="flex items-center gap-1.5 sm:gap-2.5">
                {/* Şehir Değiştirici Buton */}
                <button
                  type="button"
                  onClick={() => setIsCityModalOpen(true)}
                  className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-primary transition-colors text-xs sm:text-sm group cursor-pointer"
                  title="Şehir Değiştir"
                >
                  <span>{weather.cityName}</span>
                  <svg
                    className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Hava Durumu İkonu ve Derece */}
                <div className="inline-flex items-center gap-1.5 bg-muted/50 px-2 py-0.5 sm:py-1 rounded-md border border-border/50">
                  <div className="text-primary shrink-0 flex items-center justify-center">
                    <WeatherIcon icon={weather.condition.icon} className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono font-semibold text-xs sm:text-sm text-foreground">
                    {weather.temp}°C
                  </span>
                  <span className="text-muted-foreground text-xs hidden md:inline">
                    {weather.condition.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground font-normal hidden lg:inline">
                    (Hissedilen {weather.apparentTemp}°)
                  </span>
                </div>
              </div>
            ) : null}

            {/* Konumumu Kullan Hızlı Butonu */}
            <button
              type="button"
              onClick={handleUseGeolocation}
              disabled={isLocating}
              className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-muted/80 transition-colors text-xs cursor-pointer flex items-center justify-center"
              title="Mevcut Konumumu Kullan"
              aria-label="Mevcut Konumumu Kullan"
            >
              <svg
                className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-primary' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>

            {/* Kapat / Gizle Butonu */}
            <button
              type="button"
              onClick={handleDismiss}
              className="p-1 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/80 transition-colors text-xs cursor-pointer flex items-center justify-center"
              title="Bu alanı gizle"
              aria-label="Bugün alanını gizle"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Şehir Seçim Modalı */}
      {isCityModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="city-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsCityModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-card border border-border rounded-2xl shadow-xl p-5 space-y-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 id="city-modal-title" className="font-bold text-sm sm:text-base text-foreground">
                Şehir Seçin
              </h3>
              <button
                type="button"
                onClick={() => setIsCityModalOpen(false)}
                className="text-muted-foreground hover:text-foreground text-xs p-1 cursor-pointer"
                aria-label="Kapat"
              >
                ✕
              </button>
            </div>

            {/* Konum İzni Hızlı Seçeneği */}
            <button
              type="button"
              onClick={() => {
                setIsCityModalOpen(false);
                handleUseGeolocation();
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
              <span>Mevcut Konumumu Kullan</span>
            </button>

            {/* Şehir Arama Input */}
            <div className="space-y-1">
              <label htmlFor={citySearchInputId} className="sr-only">
                Şehir Ara
              </label>
              <input
                id={citySearchInputId}
                type="text"
                value={searchCityQuery}
                onChange={(e) => setSearchCityQuery(e.target.value)}
                placeholder="Şehir adı yazın (ör. Antalya, İzmir)..."
                className="w-full px-3 py-2 text-xs bg-muted/30 border border-border/80 rounded-xl text-foreground focus:outline-none focus:border-primary"
                autoFocus
              />
            </div>

            {/* Şehir Listesi Grid */}
            <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className={`text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors truncate cursor-pointer ${
                      activeCity.name === city.name
                        ? 'bg-primary text-primary-foreground font-semibold'
                        : 'bg-muted/20 hover:bg-muted text-foreground'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
              {filteredCities.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">
                  Eşleşen şehir bulunamadı.
                </p>
              )}
            </div>

            <p className="text-[11px] text-muted-foreground border-t border-border/50 pt-2 text-center">
              🔒 Konumunuz yalnızca hava durumunu göstermek için kullanılır ve sunucuda saklanmaz.
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
