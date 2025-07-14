
import React from 'react';
import IndicatorUI from './IndicatorUI';
import useDataFetcher from '../functions/useDataFetcher';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

const WeatherIndicators = () => {
  const { data, loading, error } = useDataFetcher();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-24 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Error cargando datos: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No hay datos disponibles</p>
      </div>
    );
  }

  // Obtener datos actuales
  const currentTemp = data.current_weather?.temperature || data.hourly.temperature_2m[0];
  const currentHumidity = data.hourly.relative_humidity_2m[0];
  const currentWind = data.current_weather?.windspeed || data.hourly.wind_speed_10m[0];
  const currentApparent = data.hourly.apparent_temperature[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      <IndicatorUI
        title="Temperatura"
        description={`${Math.round(currentTemp)}°C`}
        icon={<Thermometer className="w-6 h-6" />}
        color="red"
        trend="stable"
      />
      
      <IndicatorUI
        title="Humedad"
        description={`${Math.round(currentHumidity)}%`}
        icon={<Droplets className="w-6 h-6" />}
        color="blue"
        trend="down"
      />
      
      <IndicatorUI
        title="Viento"
        description={`${Math.round(currentWind)} km/h`}
        icon={<Wind className="w-6 h-6" />}
        color="green"
        trend="up"
      />
      
      <IndicatorUI
        title="Sensación Térmica"
        description={`${Math.round(currentApparent)}°C`}
        icon={<Eye className="w-6 h-6" />}
        color="purple"
        trend="stable"
      />
    </div>
  );
};

export default WeatherIndicators;
