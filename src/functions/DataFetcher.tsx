// src/functions/DataFetcher.tsx

export interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export default async function DataFetcher<T>(
  url: string,
  ttlMinutes: number = 5
): Promise<T> {
  const key = `cache_${url}`;
  const now = Date.now();

  // 1) Intento leer del cache
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const entry: CacheEntry<T> = JSON.parse(raw);
      const ageMinutes = (now - entry.timestamp) / 1000 / 60;
      if (ageMinutes < ttlMinutes) {
        // Cache vigente → lo devolvemos
        return entry.data;
      }
      // Cache expirado → seguimos al fetch pero guardamos stale
    } catch {
      localStorage.removeItem(key);
    }
  }

  // 2) Petición a la API
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as T;

    // 3) Guardamos en cache
    const newEntry: CacheEntry<T> = { timestamp: now, data: json };
    try {
      localStorage.setItem(key, JSON.stringify(newEntry));
    } catch {
      /* si storage falla, lo ignoramos */
    }

    return json;
  } catch (err) {
    // 4) Si falla el fetch, devolvemos stale si existe
    if (raw) {
      try {
        const entry: CacheEntry<T> = JSON.parse(raw);
        return entry.data;
      } catch {
        // parsing fallido → seguimos al error
      }
    }
    // No hay cache → lanzamos error
    throw err;
  }
}
