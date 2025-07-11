// src/App.tsx
import React, { useState } from 'react';
import SelectorUI from './components/SelectorUI';
import DataFetcher, { DataFetcherOutput } from './functions/DataFetcher';
import IndicatorUI from './components/IndicatorUI';

export default function App() {
  const [city, setCity] = useState<string>('');
  const { data, loading, error }: DataFetcherOutput = DataFetcher(city);

  // para extraer la humedad actual de hourly:
  const currentIdx =
    data?.hourly.time.findIndex((t) => t === data.current_weather.time) ?? -1;

  return (
    <div style={{ padding: 16, maxWidth: 600, margin: '0 auto' }}>
      <SelectorUI selectedCity={city} onCityChange={setCity} />

      {loading && <p>Cargando datos…</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {data && (
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          <IndicatorUI
            title="Temperatura (2m)"
            description={`${data.current_weather.temperature} ${data.hourly_units.temperature_2m}`}
          />
          <IndicatorUI
            title="Viento (10m)"
            description={`${data.current_weather.windspeed} ${data.hourly_units.wind_speed_10m}`}
          />
          {currentIdx >= 0 && (
            <IndicatorUI
              title="Humedad relativa"
              description={`${data.hourly.relativehumidity_2m[currentIdx]} ${data.hourly_units.relativehumidity_2m}`}
            />
          )}
        </div>
      )}
    </div>
  );
}
