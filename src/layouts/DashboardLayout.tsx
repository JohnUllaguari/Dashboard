
import React from 'react';
import { Card } from '@/components/ui/card';
import HeaderUI from '../components/HeaderUI';
import AlertUI from '../components/AlertUI';
import SelectorUI from '../components/SelectorUI';
import IndicatorUI from '../components/IndicatorUI';
import ChartUI from '../components/ChartUI';
import TableUI from '../components/TableUI';
import AdditionalInfo from '../components/AdditionalInfo';
import useDataFetcher from '../functions/useDataFetcher';

interface DashboardLayoutProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function DashboardLayout({
  selectedCity,
  onCityChange,
}: DashboardLayoutProps) {
  // Usar coordenadas por defecto (Berlín) en lugar de ciudad como string
  const { data, loading, error } = useDataFetcher(52.52, 13.41);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Encabezado */}
      <HeaderUI />

      {/* Alertas */}
      <div className="flex justify-end">
        <AlertUI description="No se prevén lluvias" type="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Selector */}
        <div className="lg:col-span-1">
          <SelectorUI selectedCity={selectedCity} onCityChange={onCityChange} />
        </div>

        {/* Indicadores */}
        <div className="lg:col-span-3">
          {loading && (
            <Card className="p-6">
              <p className="text-center text-gray-600">Cargando datos…</p>
            </Card>
          )}
          
          {error && (
            <Card className="p-6 border-red-200 bg-red-50">
              <p className="text-red-600 text-center">{error}</p>
            </Card>
          )}
          
          {data && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <IndicatorUI
                title="Temperatura"
                description={`${Math.round(data.current_weather?.temperature || data.hourly.temperature_2m[0])}°C`}
                color="red"
                trend="stable"
              />
              <IndicatorUI
                title="Viento"
                description={`${Math.round(data.current_weather?.windspeed || data.hourly.wind_speed_10m[0])} km/h`}
                color="blue"
                trend="up"
              />
              <IndicatorUI
                title="Humedad"
                description={`${Math.round(data.hourly.relative_humidity_2m[0])}%`}
                color="green"
                trend="down"
              />
              <IndicatorUI
                title="Sensación Térmica"
                description={`${Math.round(data.hourly.apparent_temperature[0])}°C`}
                color="purple"
                trend="stable"
              />
            </div>
          )}
        </div>
      </div>

      {/* Gráfico y Tabla */}
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hidden md:block">
            <ChartUI
              labels={data.hourly.time}
              series1={data.hourly.temperature_2m}
              series2={data.hourly.wind_speed_10m}
            />
          </div>
          
          <div className="hidden md:block">
            <TableUI
              labels={data.hourly.time}
              values1={data.hourly.temperature_2m}
              values2={data.hourly.wind_speed_10m}
            />
          </div>
        </div>
      )}

      {/* Info extra */}
      <AdditionalInfo />
    </div>
  );
}
