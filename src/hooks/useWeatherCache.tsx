import { useState, useEffect, useCallback } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface CacheItem {
  data: OpenMeteoResponse;
  timestamp: number;
  location: string;
}

interface WeatherCacheConfig {
  cacheDurationMinutes: number;
  maxCacheEntries: number;
}

const defaultConfig: WeatherCacheConfig = {
  cacheDurationMinutes: 10, // Cache válido por 10 minutos
  maxCacheEntries: 10 // Máximo 10 ubicaciones en cache
};

export const useWeatherCache = (config: WeatherCacheConfig = defaultConfig) => {
  const CACHE_KEY = 'weather_cache';
  
  // Obtener cache del localStorage
  const getCache = useCallback((): Record<string, CacheItem> => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch (error) {
      console.warn('Error reading cache from localStorage:', error);
      return {};
    }
  }, []);

  // Guardar cache en localStorage
  const setCache = useCallback((cache: Record<string, CacheItem>) => {
    try {
      // Limpiar entradas expiradas antes de guardar
      const now = Date.now();
      const validCache = Object.fromEntries(
        Object.entries(cache).filter(([, item]) => 
          now - item.timestamp < config.cacheDurationMinutes * 60 * 1000
        )
      );

      // Limitar número de entradas
      const entries = Object.entries(validCache);
      if (entries.length > config.maxCacheEntries) {
        // Mantener solo las más recientes
        const sortedEntries = entries
          .sort(([, a], [, b]) => b.timestamp - a.timestamp)
          .slice(0, config.maxCacheEntries);
        const limitedCache = Object.fromEntries(sortedEntries);
        localStorage.setItem(CACHE_KEY, JSON.stringify(limitedCache));
      } else {
        localStorage.setItem(CACHE_KEY, JSON.stringify(validCache));
      }
    } catch (error) {
      console.warn('Error saving cache to localStorage:', error);
    }
  }, [config.cacheDurationMinutes, config.maxCacheEntries]);

  // Verificar si el cache es válido
  const isCacheValid = useCallback((item: CacheItem): boolean => {
    const now = Date.now();
    const cacheAge = now - item.timestamp;
    return cacheAge < config.cacheDurationMinutes * 60 * 1000;
  }, [config.cacheDurationMinutes]);

  // Obtener datos del cache
  const getCachedData = useCallback((locationKey: string): OpenMeteoResponse | null => {
    const cache = getCache();
    const item = cache[locationKey];
    
    if (item && isCacheValid(item)) {
      console.log(`Cache hit for ${locationKey}, age: ${Math.round((Date.now() - item.timestamp) / 1000)}s`);
      return item.data;
    }
    
    console.log(`Cache miss for ${locationKey}`);
    return null;
  }, [getCache, isCacheValid]);

  // Guardar datos en cache
  const setCachedData = useCallback((locationKey: string, data: OpenMeteoResponse) => {
    const cache = getCache();
    cache[locationKey] = {
      data,
      timestamp: Date.now(),
      location: locationKey
    };
    setCache(cache);
    console.log(`Data cached for ${locationKey}`);
  }, [getCache, setCache]);

  // Limpiar cache expirado
  const cleanExpiredCache = useCallback(() => {
    const cache = getCache();
    const now = Date.now();
    let hasExpired = false;

    const cleanCache = Object.fromEntries(
      Object.entries(cache).filter(([, item]) => {
        const isValid = now - item.timestamp < config.cacheDurationMinutes * 60 * 1000;
        if (!isValid) hasExpired = true;
        return isValid;
      })
    );

    if (hasExpired) {
      setCache(cleanCache);
      console.log('Expired cache entries removed');
    }
  }, [getCache, setCache, config.cacheDurationMinutes]);

  // Obtener todas las entradas del cache
  const getAllCachedData = useCallback((): CacheItem[] => {
    const cache = getCache();
    return Object.values(cache).filter(item => isCacheValid(item));
  }, [getCache, isCacheValid]);

  // Limpiar todo el cache
  const clearCache = useCallback(() => {
    try {
      localStorage.removeItem(CACHE_KEY);
      console.log('Cache cleared');
    } catch (error) {
      console.warn('Error clearing cache:', error);
    }
  }, []);

  // Estadísticas del cache
  const getCacheStats = useCallback(() => {
    const cache = getCache();
    const entries = Object.values(cache);
    const validEntries = entries.filter(item => isCacheValid(item));
    
    return {
      totalEntries: entries.length,
      validEntries: validEntries.length,
      expiredEntries: entries.length - validEntries.length,
      oldestEntry: entries.length > 0 ? Math.min(...entries.map(e => e.timestamp)) : null,
      newestEntry: entries.length > 0 ? Math.max(...entries.map(e => e.timestamp)) : null
    };
  }, [getCache, isCacheValid]);

  return {
    getCachedData,
    setCachedData,
    cleanExpiredCache,
    getAllCachedData,
    clearCache,
    getCacheStats,
    isCacheValid: (locationKey: string) => {
      const cache = getCache();
      const item = cache[locationKey];
      return item ? isCacheValid(item) : false;
    }
  };
};