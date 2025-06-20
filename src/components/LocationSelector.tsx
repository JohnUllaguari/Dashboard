
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Globe, Clock, Wifi } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState('madrid');

  const locations = [
    { 
      value: 'madrid', 
      label: 'Madrid', 
      country: 'España',
      timezone: 'UTC+1',
      coordinates: '40.4168°N, 3.7038°W',
      status: 'online'
    },
    { 
      value: 'barcelona', 
      label: 'Barcelona', 
      country: 'España',
      timezone: 'UTC+1',
      coordinates: '41.3851°N, 2.1734°E',
      status: 'online'
    },
    { 
      value: 'valencia', 
      label: 'Valencia', 
      country: 'España',
      timezone: 'UTC+1',
      coordinates: '39.4699°N, 0.3763°W',
      status: 'online'
    },
    { 
      value: 'sevilla', 
      label: 'Sevilla', 
      country: 'España',
      timezone: 'UTC+1',
      coordinates: '37.3886°N, 5.9823°W',
      status: 'online'
    },
    { 
      value: 'bilbao', 
      label: 'Bilbao', 
      country: 'España',
      timezone: 'UTC+1',
      coordinates: '43.2627°N, 2.9253°W',
      status: 'maintenance'
    },
  ];

  const currentLocation = locations.find(loc => loc.value === selectedLocation);
  const currentTime = new Date().toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <Card className="p-6 bg-gradient-to-r from-white via-blue-50 to-white border-0 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        {/* Título y selector */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Ubicación Actual</h2>
          </div>
          
          <div className="space-y-4">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full h-12 bg-white/90 border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <SelectValue placeholder="Selecciona una ubicación" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    <div className="flex items-center gap-3 py-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${location.status === 'online' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        <span className="font-medium">{location.label}</span>
                      </div>
                      <span className="text-gray-500 text-sm">{location.country}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Información de la ubicación */}
        {currentLocation && (
          <div className="bg-white/60 rounded-xl p-4 border border-blue-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-800">{currentLocation.label}</h3>
                <Badge className={currentLocation.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  <Wifi className="w-3 h-3 mr-1" />
                  {currentLocation.status === 'online' ? 'En línea' : 'Mantenimiento'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-500" />
                  <span>{currentLocation.coordinates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{currentLocation.timezone} • {currentTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default LocationSelector;
