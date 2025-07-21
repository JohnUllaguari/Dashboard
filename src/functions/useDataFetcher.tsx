// src/functions/useDataFetcher.ts
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useDataFetcher(city: string): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData(null);
      setLoading(false);
      return;
    }

    const url = `TU_URL_OPEN_METEO?city=${city}`; // ← pon aquí tu URL real

    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: OpenMeteoResponse = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchData();
  }, [city]);

  return { data, loading, error };
}
