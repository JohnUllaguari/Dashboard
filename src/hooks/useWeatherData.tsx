import { useState, useEffect, useCallback, useRef } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import { useWeatherCache } from './useWeatherCache';

export interface WeatherDataOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
  isFromCache: boolean;
  lastUpdated: Date | null;
  cacheAge: number | null;
  refresh: () => void;
}

interface UseWeatherDataOptions {
  autoRefreshMinutes?: number;
  enableOfflineMode?: boolean;
  retryAttempts?: number;
  retryDelayMs?: number;
}

const defaultOptions: UseWeatherDataOptions = {
  autoRefreshMinutes: 5,
  enableOfflineMode: true,
  retryAttempts: 3,
  retryDelayMs: 1000
};

export const useWeatherData = (
  latitude: number,
  longitude: number,
  options: UseWeatherDataOptions = defaultOptions
): WeatherDataOutput => {
  const [data, setData] = useState<OpenMeteoResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [cacheAge, setCacheAge] = useState<number | null>(null);

  const cache = useWeatherCache();
  const retryTimeoutRef = useRef<NodeJS.Timeout>();
  const autoRefreshTimeoutRef = useRef<NodeJS.Timeout>();

  // Crear clave única para la ubicación
  const locationKey = `${latitude.toFixed(4)}_${longitude.toFixed(4)}`;

  // Construir URL de la API
  const buildApiUrl = useCallback((lat: number, lng: number): string => {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lng.toString(),
      hourly: 'temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,precipitation,precipitation_probability,cloud_cover,visibility,uv_index,wind_direction_10m',
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,sunrise,sunset,uv_index_max',
      current_weather: 'true',
      timezone: 'auto',
      forecast_days: '7'
    });
    
    return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  }, []);

  // Función para hacer la petición a la API con reintentos
  const fetchWeatherData = useCallback(async (attempt: number = 1): Promise<OpenMeteoResponse> => {
    const url = buildApiUrl(latitude, longitude);
    
    try {
      console.log(`Fetching weather data (attempt ${attempt}/${options.retryAttempts})`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
      
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const weatherData = await response.json() as OpenMeteoResponse;
      console.log('Weather data fetched successfully');
      
      return weatherData;
      
    } catch (fetchError: any) {
      console.error(`Fetch attempt ${attempt} failed:`, fetchError.message);
      
      // Si no es el último intento, reintentar
      if (attempt < (options.retryAttempts || 3)) {
        const delay = (options.retryDelayMs || 1000) * attempt;
        console.log(`Retrying in ${delay}ms...`);
        
        return new Promise((resolve, reject) => {
          retryTimeoutRef.current = setTimeout(async () => {
            try {
              const result = await fetchWeatherData(attempt + 1);
              resolve(result);
            } catch (retryError) {
              reject(retryError);
            }
          }, delay);
        });
      }
      
      throw fetchError;
    }
  }, [latitude, longitude, buildApiUrl, options.retryAttempts, options.retryDelayMs]);

  // Función principal para obtener datos
  const loadWeatherData = useCallback(async (forceRefresh: boolean = false) => {
    // Limpiar timeouts anteriores
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }

    setError(null);

    // Verificar cache primero si no es refresh forzado
    if (!forceRefresh) {
      const cachedData = cache.getCachedData(locationKey);
      if (cachedData) {
        setData(cachedData);
        setIsFromCache(true);
        setLoading(false);
        
        // Calcular edad del cache
        const cacheStats = cache.getCacheStats();
        if (cacheStats.newestEntry) {
          const age = Math.round((Date.now() - cacheStats.newestEntry) / 1000);
          setCacheAge(age);
          setLastUpdated(new Date(cacheStats.newestEntry));
        }
        
        console.log('Using cached data');
        return;
      }
    }

    // Si no hay cache o es refresh forzado, fetch de la API
    setLoading(true);
    setIsFromCache(false);

    try {
      const freshData = await fetchWeatherData();
      
      // Guardar en cache
      cache.setCachedData(locationKey, freshData);
      
      // Actualizar estado
      setData(freshData);
      setLastUpdated(new Date());
      setCacheAge(0);
      setError(null);
      
    } catch (fetchError: any) {
      console.error('Failed to fetch weather data:', fetchError.message);
      
      // En modo offline, intentar usar datos de cache aunque sean antiguos
      if (options.enableOfflineMode) {
        const allCachedData = cache.getAllCachedData();
        const locationData = allCachedData.find(item => item.location === locationKey);
        
        if (locationData) {
          console.log('Using stale cache data due to network error');
          setData(locationData.data);
          setIsFromCache(true);
          setCacheAge(Math.round((Date.now() - locationData.timestamp) / 1000));
          setLastUpdated(new Date(locationData.timestamp));
          setError(`Datos offline (${Math.round((Date.now() - locationData.timestamp) / 60000)} min antiguos)`);
        } else {
          setError(`Sin conexión y sin datos locales: ${fetchError.message}`);
          setData(null);
        }
      } else {
        setError(fetchError.message);
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [locationKey, cache, fetchWeatherData, options.enableOfflineMode]);

  // Función para refrescar manualmente
  const refresh = useCallback(() => {
    loadWeatherData(true);
  }, [loadWeatherData]);

  // Configurar auto-refresh
  useEffect(() => {
    if (autoRefreshTimeoutRef.current) {
      clearTimeout(autoRefreshTimeoutRef.current);
    }

    if (options.autoRefreshMinutes && options.autoRefreshMinutes > 0) {
      const interval = options.autoRefreshMinutes * 60 * 1000;
      autoRefreshTimeoutRef.current = setTimeout(() => {
        console.log('Auto-refreshing weather data');
        loadWeatherData(true);
      }, interval);
    }

    return () => {
      if (autoRefreshTimeoutRef.current) {
        clearTimeout(autoRefreshTimeoutRef.current);
      }
    };
  }, [loadWeatherData, options.autoRefreshMinutes, data]);

  // Cargar datos cuando cambien las coordenadas
  useEffect(() => {
    if (latitude && longitude) {
      loadWeatherData();
    }
  }, [latitude, longitude, loadWeatherData]);

  // Limpiar timeouts al desmontar
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (autoRefreshTimeoutRef.current) {
        clearTimeout(autoRefreshTimeoutRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    isFromCache,
    lastUpdated,
    cacheAge,
    refresh
  };
};