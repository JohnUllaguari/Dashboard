
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Info, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import useDataFetcher from '../functions/useDataFetcher';

const AlertsSection = () => {
  const { selectedLocation } = useLocation();
  const { data } = useDataFetcher(selectedLocation.latitude, selectedLocation.longitude);

  // Generar alertas dinámicas basadas en datos reales
  const generateAlerts = () => {
    if (!data) return [];
    
    const alerts = [];
    const currentTemp = data.current_weather?.temperature || data.hourly.temperature_2m[0];
    const currentWind = data.current_weather?.windspeed || data.hourly.wind_speed_10m[0];
    const currentHumidity = data.hourly.relative_humidity_2m[0];
    
    // Alerta por temperatura extrema
    if (currentTemp > 30) {
      alerts.push({
        id: 1,
        type: 'warning',
        title: 'Temperatura Alta',
        message: `Temperatura de ${Math.round(currentTemp)}°C registrada. Se recomienda hidratarse frecuentemente y evitar exposición prolongada al sol.`,
        time: 'Ahora',
        location: selectedLocation.label,
        severity: 'Alta'
      });
    } else if (currentTemp < 5) {
      alerts.push({
        id: 1,
        type: 'warning',
        title: 'Temperatura Baja',
        message: `Temperatura de ${Math.round(currentTemp)}°C registrada. Use ropa de abrigo y evite exposición prolongada al frío.`,
        time: 'Ahora',
        location: selectedLocation.label,
        severity: 'Alta'
      });
    }
    
    // Alerta por viento fuerte
    if (currentWind > 25) {
      alerts.push({
        id: 2,
        type: 'warning',
        title: 'Vientos Fuertes',
        message: `Vientos de ${Math.round(currentWind)} km/h registrados. Precaución al conducir y evite actividades al aire libre.`,
        time: 'Hace 5 min',
        location: selectedLocation.label,
        severity: 'Media'
      });
    }
    
    // Alerta por humedad alta
    if (currentHumidity > 80) {
      alerts.push({
        id: 3,
        type: 'info',
        title: 'Humedad Alta',
        message: `Humedad del ${Math.round(currentHumidity)}% registrada. Sensación térmica puede ser mayor que la temperatura real.`,
        time: 'Hace 10 min',
        location: selectedLocation.label,
        severity: 'Baja'
      });
    }
    
    // Si no hay alertas, mostrar condiciones favorables
    if (alerts.length === 0) {
      alerts.push({
        id: 4,
        type: 'success',
        title: 'Condiciones Favorables',
        message: `Condiciones climáticas óptimas en ${selectedLocation.label}. Ideal para actividades al aire libre.`,
        time: 'Ahora',
        location: selectedLocation.label,
        severity: 'Baja'
      });
    }
    
    return alerts;
  };

  const alerts = generateAlerts();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-6 h-6 text-amber-600" />;
      case 'info':
        return <Info className="w-6 h-6 text-blue-600" />;
      default:
        return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 hover:shadow-amber-100';
      case 'info':
        return 'bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 hover:shadow-blue-100';
      default:
        return 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 hover:shadow-green-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Alta':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Media':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Alertas Meteorológicas</h2>
        <Badge className="bg-red-500 text-white animate-pulse">
          {alerts.length} activas
        </Badge>
      </div>
      
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-5 rounded-xl border transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${getAlertStyle(alert.type)}`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-gray-800">{alert.title}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{alert.message}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{alert.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{alert.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertsSection;
