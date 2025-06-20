
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  Umbrella, 
  Shirt, 
  Car, 
  Sunrise, 
  Sunset, 
  Moon, 
  Activity,
  Thermometer,
  Droplets,
  Wind,
  Sun
} from 'lucide-react';

const AdditionalInfo = () => {
  const tips = [
    {
      icon: <Umbrella className="w-5 h-5 text-blue-500" />,
      title: 'Probabilidad de lluvia',
      description: 'No olvides llevar paraguas por la tarde. Se esperan chubascos ligeros entre las 16:00 y 18:00.',
      priority: 'media',
      action: 'Preparar paraguas'
    },
    {
      icon: <Shirt className="w-5 h-5 text-green-500" />,
      title: 'Vestimenta recomendada',
      description: 'Ropa ligera y cómoda para el día. Considera una chaqueta ligera para la noche.',
      priority: 'baja',
      action: 'Vestirse apropiadamente'
    },
    {
      icon: <Car className="w-5 h-5 text-orange-500" />,
      title: 'Condiciones de conducción',
      description: 'Buenas condiciones para viajar durante el día. Precaución por posible lluvia vespertina.',
      priority: 'baja',
      action: 'Conducir con precaución'
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      title: 'Protección solar',
      description: 'Índice UV alto entre 12:00-16:00. Usa protector solar y evita exposición prolongada.',
      priority: 'alta',
      action: 'Aplicar protector solar'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const astronomicalData = [
    {
      icon: <Sunrise className="w-5 h-5 text-orange-500" />,
      label: 'Salida del sol',
      value: '07:32',
      detail: 'En 2h 15min'
    },
    {
      icon: <Sunset className="w-5 h-5 text-orange-600" />,
      label: 'Puesta del sol',
      value: '20:45',
      detail: 'En 15h 28min'
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      label: 'Duración del día',
      value: '13h 13m',
      detail: '+2min vs ayer'
    },
    {
      icon: <Moon className="w-5 h-5 text-blue-400" />,
      label: 'Fase lunar',
      value: 'Cuarto creciente',
      detail: '67% iluminada'
    }
  ];

  const airQuality = {
    index: 42,
    level: 'Buena',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    components: [
      { name: 'PM2.5', value: '12 μg/m³', status: 'Bueno' },
      { name: 'PM10', value: '28 μg/m³', status: 'Bueno' },
      { name: 'O₃', value: '85 μg/m³', status: 'Moderado' },
      { name: 'NO₂', value: '23 μg/m³', status: 'Bueno' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Consejos del día */}
      <Card className="p-6 bg-gradient-to-br from-white via-blue-50/30 to-white border-0 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Lightbulb className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Consejos del Día</h2>
            <p className="text-sm text-gray-600">Recomendaciones personalizadas</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-4 bg-white/70 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 p-2 bg-gray-50 rounded-lg">
                    {tip.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-800">{tip.title}</h3>
                      <Badge className={getPriorityColor(tip.priority)}>
                        {tip.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{tip.description}</p>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      {tip.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Datos astronómicos */}
      <Card className="p-6 bg-gradient-to-br from-white via-orange-50/30 to-white border-0 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Sunrise className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Datos Astronómicos</h2>
            <p className="text-sm text-gray-600">Información solar y lunar</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {astronomicalData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white/70 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <span className="text-gray-600 text-sm">{item.label}</span>
                  <p className="font-bold text-gray-800">{item.value}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">{item.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Calidad del aire */}
      <Card className="p-6 bg-gradient-to-br from-white via-green-50/30 to-white border-0 shadow-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Calidad del Aire</h2>
            <p className="text-sm text-gray-600">Índice de calidad ambiental</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${airQuality.bgColor} border border-green-200`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Índice AQI</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {airQuality.level}
              </Badge>
            </div>
            <p className={`text-3xl font-bold ${airQuality.color}`}>{airQuality.index}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {airQuality.components.map((component, index) => (
              <div key={index} className="p-3 bg-white/70 rounded-lg border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">{component.name}</div>
                <div className="font-semibold text-gray-800 text-sm">{component.value}</div>
                <div className="text-xs text-green-600">{component.status}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
