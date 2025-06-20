
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin } from 'lucide-react';

const LocationSelector = () => {
  const [selectedLocation, setSelectedLocation] = useState('madrid');

  const locations = [
    { value: 'madrid', label: 'Madrid, España', timezone: 'UTC+1' },
    { value: 'barcelona', label: 'Barcelona, España', timezone: 'UTC+1' },
    { value: 'valencia', label: 'Valencia, España', timezone: 'UTC+1' },
    { value: 'sevilla', label: 'Sevilla, España', timezone: 'UTC+1' },
    { value: 'bilbao', label: 'Bilbao, España', timezone: 'UTC+1' },
  ];

  const currentLocation = locations.find(loc => loc.value === selectedLocation);

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold text-gray-800">Ubicación</h2>
        </div>
        
        <div className="flex-1 max-w-md">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full bg-white/80">
              <SelectValue placeholder="Selecciona una ubicación" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location.value} value={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentLocation && (
          <div className="text-sm text-gray-600">
            Zona horaria: {currentLocation.timezone}
          </div>
        )}
      </div>
    </Card>
  );
};

export default LocationSelector;
