import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import WeatherTableFilters from './WeatherTableFilters';
import { useWeatherData } from '../hooks/useWeatherData';
import { useLocation } from '../contexts/LocationContext';

const WeatherTable = () => {
  const [filter, setFilter] = useState('all');
  const { selectedLocation } = useLocation();
  const { data, loading, error, refresh } = useWeatherData(
    selectedLocation.latitude, 
    selectedLocation.longitude
  );

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
        <div className="text-center p-6">
          <p className="text-red-600">Error cargando datos de la tabla para {selectedLocation.label}</p>
        </div>
      </Card>
    );
  }

  // Procesar datos para la tabla (primeras 12 horas)
  const weatherData = data.hourly.time.slice(0, 12).map((time, index) => {
    const hour = new Date(time).getHours();
    const timeString = new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    
    return {
      hora: timeString,
      temperatura: `${Math.round(data.hourly.temperature_2m[index])}°C`,
      humedad: `${Math.round(data.hourly.relative_humidity_2m[index])}%`,
      viento: `${Math.round(data.hourly.wind_speed_10m[index])} km/h`,
      sensacion: `${Math.round(data.hourly.apparent_temperature[index])}°C`,
      periodo: hour >= 6 && hour < 12 ? 'morning' : hour >= 12 && hour < 18 ? 'afternoon' : 'night',
      temp_value: data.hourly.temperature_2m[index],
      tendencia: index > 0 ? 
        (data.hourly.temperature_2m[index] > data.hourly.temperature_2m[index - 1] ? 'up' : 
         data.hourly.temperature_2m[index] < data.hourly.temperature_2m[index - 1] ? 'down' : 'stable') : 'stable'
    };
  });

  const getEstadoBadge = (temp: number) => {
    if (temp > 25) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Calor</Badge>;
    } else if (temp > 15) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Óptimo</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Fresco</Badge>;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredData = filter === 'all' ? weatherData : weatherData.filter(row => row.periodo === filter);

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Calendar className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Condiciones Detalladas - {selectedLocation.label}
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <p className="text-gray-600">Pronóstico por horas • Próximas 12 horas</p>
              {error && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">
                  {error}
                </span>
              )}
              <button 
                onClick={refresh}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs hover:bg-blue-200 transition-colors"
              >
                ↻ Actualizar
              </button>
            </div>
          </div>
        </div>
        
        <WeatherTableFilters 
          filter={filter}
          setFilter={setFilter}
          totalRows={weatherData.length}
          filteredRows={filteredData.length}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="hover:bg-gray-50/80">
              <TableHead className="font-bold text-gray-700 h-12">Hora</TableHead>
              <TableHead className="font-bold text-gray-700">Temperatura</TableHead>
              <TableHead className="font-bold text-gray-700">Humedad</TableHead>
              <TableHead className="font-bold text-gray-700">Viento</TableHead>
              <TableHead className="font-bold text-gray-700">Sensación</TableHead>
              <TableHead className="font-bold text-gray-700">Estado</TableHead>
              <TableHead className="font-bold text-gray-700 text-center">Tendencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-blue-50/30 transition-colors border-b border-gray-100"
              >
                <TableCell className="font-bold text-gray-800 bg-gray-50/30">
                  {row.hora}
                </TableCell>
                <TableCell className="font-bold text-red-600">
                  {row.temperatura}
                </TableCell>
                <TableCell className="font-medium text-blue-600">
                  {row.humedad}
                </TableCell>
                <TableCell className="font-medium text-green-600">
                  {row.viento}
                </TableCell>
                <TableCell className="font-medium text-purple-600">
                  {row.sensacion}
                </TableCell>
                <TableCell>{getEstadoBadge(row.temp_value)}</TableCell>
                <TableCell className="text-center">
                  {getTendenciaIcon(row.tendencia)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
        <span>Mostrando {filteredData.length} de {weatherData.length} registros</span>
        <span>Última actualización: {new Date().toLocaleTimeString('es-ES')}</span>
      </div>
    </Card>
  );
};

export default WeatherTable;
