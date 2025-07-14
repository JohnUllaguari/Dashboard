import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import useDataFetcher from '../functions/useDataFetcher';
import { useLocation } from '../contexts/LocationContext';

const WeatherChart = () => {
  const [viewMode, setViewMode] = useState('line');
  const { selectedLocation } = useLocation();
  const { data, loading, error } = useDataFetcher(selectedLocation.latitude, selectedLocation.longitude);

  if (loading) {
    return (
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-xl">
        <div className="text-center p-6">
          <p className="text-red-600">Error cargando datos del gráfico para {selectedLocation.label}</p>
        </div>
      </Card>
    );
  }

  // Procesar datos para las primeras 24 horas
  const chartData = data.hourly.time.slice(0, 24).map((time, index) => ({
    time: new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    temperatura: Math.round(data.hourly.temperature_2m[index]),
    humedad: Math.round(data.hourly.relative_humidity_2m[index]),
    viento: Math.round(data.hourly.wind_speed_10m[index]),
    sensacion: Math.round(data.hourly.apparent_temperature[index])
  }));

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any; label?: string }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{`Hora: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-medium">
              {`${entry.name}: ${entry.value}${entry.dataKey === 'temperatura' || entry.dataKey === 'sensacion' ? '°C' : 
                entry.dataKey === 'humedad' ? '%' : ' km/h'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Evolución Climática - {selectedLocation.label}
            </h2>
            <p className="text-gray-600 text-sm">Próximas 24 horas • Datos en tiempo real</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800">
            <Calendar className="w-3 h-3 mr-1" />
            24h
          </Badge>
          <Button
            variant={viewMode === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('line')}
            className="h-8"
          >
            Líneas
          </Button>
          <Button
            variant={viewMode === 'area' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('area')}
            className="h-8"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Área
          </Button>
        </div>
      </div>

      <div className="h-96 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          {viewMode === 'line' ? (
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.7} />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                fontWeight={500}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                fontWeight={500}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperatura" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#ef4444', strokeWidth: 2 }}
                name="Temperatura"
              />
              <Line 
                type="monotone" 
                dataKey="humedad" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Humedad"
              />
              <Line 
                type="monotone" 
                dataKey="viento" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                name="Viento"
              />
            </LineChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" opacity={0.7} />
              <XAxis 
                dataKey="time" 
                stroke="#6b7280"
                fontSize={12}
                fontWeight={500}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                fontWeight={500}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="temperatura"
                stackId="1"
                stroke="#ef4444"
                fill="url(#tempGradient)"
                strokeWidth={2}
                name="Temperatura"
              />
              <Area
                type="monotone"
                dataKey="humedad"
                stackId="2"
                stroke="#3b82f6"
                fill="url(#humidityGradient)"
                strokeWidth={2}
                name="Humedad"
              />
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Leyenda mejorada */}
      <div className="flex items-center justify-center gap-6 p-4 bg-gray-50/50 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Temperatura (°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Humedad (%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">Viento (km/h)</span>
        </div>
      </div>
    </Card>
  );
};

export default WeatherChart;
