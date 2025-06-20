
import React from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Compass, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const WeatherIndicators = () => {
  const indicators = [
    {
      id: 1,
      title: 'Temperatura',
      value: '24°C',
      subtitle: 'Sensación: 26°C',
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      color: 'from-red-50 to-pink-50',
      borderColor: 'border-red-200',
      trend: '+2°C',
      trendColor: 'text-red-600',
      status: 'normal'
    },
    {
      id: 2,
      title: 'Humedad',
      value: '68%',
      subtitle: 'Punto de rocío: 18°C',
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      color: 'from-blue-50 to-cyan-50',
      borderColor: 'border-blue-200',
      trend: '-5%',
      trendColor: 'text-blue-600',
      status: 'ideal'
    },
    {
      id: 3,
      title: 'Viento',
      value: '12 km/h',
      subtitle: 'Dirección: NO',
      icon: <Wind className="w-8 h-8 text-green-500" />,
      color: 'from-green-50 to-emerald-50',
      borderColor: 'border-green-200',
      trend: '+3 km/h',
      trendColor: 'text-green-600',
      status: 'suave'
    },
    {
      id: 4,
      title: 'Visibilidad',
      value: '10 km',
      subtitle: 'Excelente',
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      color: 'from-purple-50 to-violet-50',
      borderColor: 'border-purple-200',
      trend: 'Sin cambios',
      trendColor: 'text-purple-600',
      status: 'excelente'
    },
    {
      id: 5,
      title: 'Presión',
      value: '1013 hPa',
      subtitle: 'Estable',
      icon: <Gauge className="w-8 h-8 text-orange-500" />,
      color: 'from-orange-50 to-amber-50',
      borderColor: 'border-orange-200',
      trend: '+2 hPa',
      trendColor: 'text-orange-600',
      status: 'estable'
    },
    {
      id: 6,
      title: 'Índice UV',
      value: '6',
      subtitle: 'Alto',
      icon: <Sun className="w-8 h-8 text-yellow-500" />,
      color: 'from-yellow-50 to-orange-50',
      borderColor: 'border-yellow-200',
      trend: 'Máximo: 8',
      trendColor: 'text-yellow-600',
      status: 'alto'
    },
    {
      id: 7,
      title: 'Dirección del Viento',
      value: '315°',
      subtitle: 'Noroeste',
      icon: <Compass className="w-8 h-8 text-indigo-500" />,
      color: 'from-indigo-50 to-blue-50',
      borderColor: 'border-indigo-200',
      trend: 'Constante',
      trendColor: 'text-indigo-600',
      status: 'estable'
    },
    {
      id: 8,
      title: 'Actividad Eléctrica',
      value: '0',
      subtitle: 'Sin actividad',
      icon: <Zap className="w-8 h-8 text-gray-500" />,
      color: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      trend: 'Despejado',
      trendColor: 'text-gray-600',
      status: 'sin_actividad'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      normal: { color: 'bg-blue-100 text-blue-800', text: 'Normal' },
      ideal: { color: 'bg-green-100 text-green-800', text: 'Ideal' },
      suave: { color: 'bg-green-100 text-green-800', text: 'Suave' },
      excelente: { color: 'bg-purple-100 text-purple-800', text: 'Excelente' },
      estable: { color: 'bg-blue-100 text-blue-800', text: 'Estable' },
      alto: { color: 'bg-orange-100 text-orange-800', text: 'Alto' },
      sin_actividad: { color: 'bg-gray-100 text-gray-800', text: 'Sin actividad' }
    };
    
    const config = statusConfig[status] || statusConfig.normal;
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {indicators.map((indicator) => (
        <Card
          key={indicator.id}
          className={`p-6 border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br ${indicator.color} ${indicator.borderColor} relative overflow-hidden group`}
        >
          {/* Fondo decorativo */}
          <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
            {indicator.icon}
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-shrink-0 p-2 bg-white/50 rounded-lg">
                {indicator.icon}
              </div>
              {getStatusBadge(indicator.status)}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-800">
                {indicator.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 leading-none">
                {indicator.value}
              </p>
              <p className="text-sm text-gray-600">
                {indicator.subtitle}
              </p>
              <div className="pt-2 border-t border-gray-200/50">
                <p className={`text-xs font-medium ${indicator.trendColor}`}>
                  Tendencia: {indicator.trend}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WeatherIndicators;
