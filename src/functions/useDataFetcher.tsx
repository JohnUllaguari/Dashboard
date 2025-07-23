
import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

export interface DataFetcherOutput {
  data: OpenMeteoResponse | null;
  loading: boolean;
  error: string | null;
}

// Esta función está obsoleta, usar useWeatherData en su lugar
export default function useDataFetcher(latitude: number = 52.52, longitude: number = 13.41): DataFetcherOutput {
  return {
    data: null,
    loading: false,
    error: 'Función obsoleta, usar useWeatherData'
  };
}
