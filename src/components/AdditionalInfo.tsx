
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Umbrella, Shirt, Car } from 'lucide-react';

const AdditionalInfo = () => {
  const tips = [
    {
      icon: <Umbrella className="w-5 h-5 text-blue-500" />,
      title: 'Probabilidad de lluvia',
      description: 'No olvides llevar paraguas por la tarde',
      priority: 'media'
    },
    {
      icon: <Shirt className="w-5 h-5 text-green-500" />,
      title: 'Vestimenta recomendada',
      description: 'Ropa ligera y cómoda para el día',
      priority: 'baja'
    },
    {
      icon: <Car className="w-5 h-5 text-orange-500" />,
      title: 'Condiciones de conducción',
      description: 'Buenas condiciones para viajar',
      priority: 'baja'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta':
        return 'bg-red-100 text-red-800';
      case 'media':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Consejos del día */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-semibold text-gray-800">Consejos del Día</h2>
        </div>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="p-4 bg-white/60 rounded-lg border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-800">{tip.title}</h3>
                    <Badge className={getPriorityColor(tip.priority)}>
                      {tip.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Información adicional */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Datos Adicionales</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
            <span className="text-gray-600">Salida del sol</span>
            <span className="font-semibold text-gray-800">07:32</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
            <span className="text-gray-600">Puesta del sol</span>
            <span className="font-semibold text-gray-800">20:45</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
            <span className="text-gray-600">Duración del día</span>
            <span className="font-semibold text-gray-800">13h 13m</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/60 rounded-lg">
            <span className="text-gray-600">Fase lunar</span>
            <span className="font-semibold text-gray-800">Cuarto creciente</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
