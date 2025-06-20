
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, CheckCircle } from 'lucide-react';

const AlertsSection = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Alerta de Tormenta',
      message: 'Se esperan tormentas eléctricas en las próximas 2 horas',
      time: 'Hace 15 min'
    },
    {
      id: 2,
      type: 'info',
      title: 'Cambio de Temperatura',
      message: 'Descenso de temperatura previsto para esta noche',
      time: 'Hace 1 hora'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Alertas Meteorológicas</h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start gap-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                  <Badge variant="outline" className="text-xs">
                    {alert.time}
                  </Badge>
                </div>
                <p className="text-gray-600">{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsSection;
