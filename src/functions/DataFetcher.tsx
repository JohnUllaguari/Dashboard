// src/functions/DataFetcher.tsx
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

export interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function DataFetcher(
  city: string
): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const url = `TU_URL_OPEN_METEO?city=${city}`; // ← pon aquí tu URL real

    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<OpenMeteoResponse>;
      })
      .then((json) => {
        setData(json);
        setError(null);
      })
      .catch((err: any) => {
        setError(err.message || 'Error desconocido');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [city]);

  return { data, loading, error };
}
