
import React from 'react';
import { Card } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';

const WeatherIndicators = () => {
  const indicators = [
    {
      id: 1,
      title: 'Temperatura',
      value: '24°C',
      subtitle: 'Sensación: 26°C',
      icon: <Thermometer className="w-8 h-8 text-red-500" />,
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 2,
      title: 'Humedad',
      value: '68%',
      subtitle: 'Punto de rocío: 18°C',
      icon: <Droplets className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 3,
      title: 'Viento',
      value: '12 km/h',
      subtitle: 'Dirección: NO',
      icon: <Wind className="w-8 h-8 text-green-500" />,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 4,
      title: 'Visibilidad',
      value: '10 km',
      subtitle: 'Excelente',
      icon: <Eye className="w-8 h-8 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 5,
      title: 'Presión',
      value: '1013 hPa',
      subtitle: 'Estable',
      icon: <Gauge className="w-8 h-8 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 6,
      title: 'Índice UV',
      value: '6',
      subtitle: 'Alto',
      icon: <Sun className="w-8 h-8 text-yellow-500" />,
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {indicators.map((indicator) => (
        <Card
          key={indicator.id}
          className={`p-6 border-2 transition-all duration-300 hover:shadow-lg hover:scale-105 ${indicator.color}`}
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {indicator.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {indicator.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">
                {indicator.value}
              </p>
              <p className="text-sm text-gray-600">
                {indicator.subtitle}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default WeatherIndicators;
