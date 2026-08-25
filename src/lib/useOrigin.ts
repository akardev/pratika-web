'use client';

import { useSyncExternalStore } from 'react';

const DEFAULT_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === 'production' ? 'https://pratika.com' : 'http://localhost:3000');

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
}

function getSnapshot() {
  return window.location.origin;
}

function getServerSnapshot() {
  return DEFAULT_ORIGIN;
}

export function useOrigin(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
