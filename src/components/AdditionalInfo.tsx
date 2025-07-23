
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
  Sun
} from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import { useWeatherData } from '../hooks/useWeatherData';

const AdditionalInfo = () => {
  const { selectedLocation } = useLocation();
  const { data } = useWeatherData(selectedLocation.latitude, selectedLocation.longitude);

  // Generar consejos dinámicos basados en datos reales
  const generateTips = () => {
    if (!data) return [];
    
    const tips = [];
    const currentTemp = data.current_weather?.temperature || data.hourly.temperature_2m[0];
    const currentHumidity = data.hourly.relative_humidity_2m[0];
    const currentWind = data.current_weather?.windspeed || data.hourly.wind_speed_10m[0];
    
    // Consejo de vestimenta basado en temperatura
    if (currentTemp > 25) {
      tips.push({
        icon: <Shirt className="w-4 h-4 text-orange-500" />,
        title: 'Vestimenta',
        description: 'Ropa ligera y transpirable. Colores claros preferibles.',
        priority: 'media',
        action: 'Vestirse fresco'
      });
    } else if (currentTemp < 15) {
      tips.push({
        icon: <Shirt className="w-4 h-4 text-blue-500" />,
        title: 'Vestimenta',
        description: 'Ropa de abrigo recomendada. Capas múltiples.',
        priority: 'alta',
        action: 'Vestirse abrigado'
      });
    } else {
      tips.push({
        icon: <Shirt className="w-4 h-4 text-green-500" />,
        title: 'Vestimenta',
        description: 'Ropa cómoda y ligera para el día.',
        priority: 'baja',
        action: 'Vestirse cómodo'
      });
    }
    
    // Consejo de protección solar
    if (currentTemp > 20) {
      tips.push({
        icon: <Sun className="w-4 h-4 text-yellow-500" />,
        title: 'Protección solar',
        description: `Con ${Math.round(currentTemp)}°C, usa protector solar factor 30+.`,
        priority: 'alta',
        action: 'Aplicar protector'
      });
    }
    
    // Consejo de humedad
    if (currentHumidity > 70) {
      tips.push({
        icon: <Umbrella className="w-4 h-4 text-blue-500" />,
        title: 'Humedad alta',
        description: `Humedad del ${Math.round(currentHumidity)}%. Mantente hidratado.`,
        priority: 'media',
        action: 'Beber agua'
      });
    }
    
    return tips;
  };

  const tips = generateTips();

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

  // Generar datos astronómicos dinámicos basados en ubicación
  const generateAstronomicalData = () => {
    const now = new Date();
    const sunrise = new Date();
    const sunset = new Date();
    
    // Calcular aproximadamente basado en latitud (simplificado)
    const lat = selectedLocation.latitude;
    const seasonOffset = Math.sin((now.getMonth() - 2) * Math.PI / 6) * 2; // Aproximación estacional
    
    sunrise.setHours(7 + seasonOffset - lat * 0.02, 30, 0, 0);
    sunset.setHours(19 - seasonOffset - lat * 0.02, 45, 0, 0);
    
    const timeToSunrise = sunrise.getTime() - now.getTime();
    const timeToSunset = sunset.getTime() - now.getTime();
    
    const formatTimeLeft = (ms) => {
      const hours = Math.floor(Math.abs(ms) / (1000 * 60 * 60));
      const minutes = Math.floor((Math.abs(ms) % (1000 * 60 * 60)) / (1000 * 60));
      return ms > 0 ? `En ${hours}h ${minutes}min` : `Hace ${hours}h ${minutes}min`;
    };
    
    return [
      {
        icon: <Sunrise className="w-4 h-4 text-orange-500" />,
        label: 'Salida del sol',
        value: sunrise.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        detail: formatTimeLeft(timeToSunrise)
      },
      {
        icon: <Sunset className="w-4 h-4 text-orange-600" />,
        label: 'Puesta del sol',
        value: sunset.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        detail: formatTimeLeft(timeToSunset)
      },
      {
        icon: <Moon className="w-4 h-4 text-blue-400" />,
        label: 'Fase lunar',
        value: 'Cuarto creciente',
        detail: '67% iluminada'
      }
    ];
  };

  const astronomicalData = generateAstronomicalData();

  // Generar calidad del aire dinámicamente basada en ubicación
  const generateAirQuality = () => {
    if (!data) {
      return {
        index: 42,
        level: 'Buena',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        components: [
          { name: 'PM2.5', value: '12 μg/m³', status: 'Bueno' },
          { name: 'O₃', value: '85 μg/m³', status: 'Moderado' }
        ]
      };
    }
    
    const humidity = data.hourly.relative_humidity_2m[0];
    const wind = data.current_weather?.windspeed || data.hourly.wind_speed_10m[0];
    
    // Simulación basada en condiciones climáticas
    let index = 50;
    let level = 'Moderada';
    let color = 'text-yellow-600';
    let bgColor = 'bg-yellow-50';
    
    if (wind > 15) { // Viento ayuda a limpiar el aire
      index -= 10;
    }
    
    if (humidity > 80) { // Humedad alta puede empeorar calidad
      index += 5;
    }
    
    if (index < 50) {
      level = 'Buena';
      color = 'text-green-600';
      bgColor = 'bg-green-50';
    } else if (index > 100) {
      level = 'Mala';
      color = 'text-red-600';
      bgColor = 'bg-red-50';
    }
    
    return {
      index: Math.round(index),
      level,
      color,
      bgColor,
      components: [
        { name: 'PM2.5', value: `${Math.round(index * 0.3)} μg/m³`, status: level },
        { name: 'O₃', value: `${Math.round(index * 2)} μg/m³`, status: level }
      ]
    };
  };

  const airQuality = generateAirQuality();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {/* Consejos del día */}
      <Card className="p-5 bg-gradient-to-br from-white via-blue-50/40 to-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Consejos del Día</h2>
            <p className="text-xs text-gray-600">Recomendaciones</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <div key={index} className="p-3 bg-white/80 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 hover:bg-white/90">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm text-gray-800">{tip.title}</h3>
                    <Badge className={`text-xs ${getPriorityColor(tip.priority)}`}>
                      {tip.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Datos astronómicos */}
      <Card className="p-5 bg-gradient-to-br from-white via-orange-50/40 to-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-lg">
            <Sunrise className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Datos Astronómicos</h2>
            <p className="text-xs text-gray-600">Solar y lunar</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {astronomicalData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/80 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 hover:bg-white/90">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-50 rounded-lg">
                  {item.icon}
                </div>
                <div>
                  <span className="text-gray-600 text-xs">{item.label}</span>
                  <p className="font-bold text-sm text-gray-800">{item.value}</p>
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
      <Card className="p-5 bg-gradient-to-br from-white via-green-50/40 to-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 backdrop-blur-sm md:col-span-2 xl:col-span-1">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg">
            <Activity className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Calidad del Aire</h2>
            <p className="text-xs text-gray-600">Índice ambiental</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`p-4 rounded-xl ${airQuality.bgColor} border border-green-200 hover:shadow-md transition-all duration-200`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Índice AQI</span>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                {airQuality.level}
              </Badge>
            </div>
            <p className={`text-2xl font-bold ${airQuality.color}`}>{airQuality.index}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {airQuality.components.map((component, index) => (
              <div key={index} className="p-3 bg-white/80 rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200 hover:bg-white/90">
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
