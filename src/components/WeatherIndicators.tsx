import React from 'react';
import IndicatorUI from './IndicatorUI';
import { useWeatherData } from '../hooks/useWeatherData';
import { useLocation } from '../contexts/LocationContext';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

const WeatherIndicators = () => {
  const { selectedLocation } = useLocation();
  const { data, loading, error, isFromCache, cacheAge, refresh } = useWeatherData(
    selectedLocation.latitude, 
    selectedLocation.longitude
  );

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

  if (error && !data) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Error cargando datos de {selectedLocation.label}: {error}</p>
        <button 
          onClick={refresh}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No hay datos disponibles para {selectedLocation.label}</p>
      </div>
    );
  }

  // Obtener datos actuales
  const currentTemp = data.current_weather?.temperature || data.hourly.temperature_2m[0];
  const currentHumidity = data.hourly.relative_humidity_2m[0];
  const currentWind = data.current_weather?.windspeed || data.hourly.wind_speed_10m[0];
  const currentApparent = data.hourly.apparent_temperature[0];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Condiciones actuales en {selectedLocation.label}
        </h3>
        <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
          {isFromCache && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Cache ({cacheAge}s)
            </span>
          )}
          {error && (
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded">
              Datos offline
            </span>
          )}
          <button 
            onClick={refresh}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
          >
            Actualizar
          </button>
        </div>
      </div>
      
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
    </div>
  );
};

export default WeatherIndicators;
