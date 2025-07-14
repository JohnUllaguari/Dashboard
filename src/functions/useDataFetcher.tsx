
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

export interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

export default function useDataFetcher(latitude: number = 52.52, longitude: number = 13.41): DataFetcherOutput {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature&current_weather=true`;

    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<OpenMeteoResponse>;
      })
      .then((json) => {
        console.log('API Response:', json);
        setData(json);
      })
      .catch((err: any) => {
        console.error('API Error:', err);
        setError(err.message || 'Error desconocido');
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [latitude, longitude]);

  return { data, loading, error };
}
