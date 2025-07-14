
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LocationData {
  value: string;
  label: string;
  country: string;
  timezone: string;
  coordinates: string;
  latitude: number;
  longitude: number;
  status: 'online' | 'maintenance';
}

interface LocationContextType {
  selectedLocation: LocationData;
  setSelectedLocation: (location: LocationData) => void;
  locations: LocationData[];
}

const locations: LocationData[] = [
  { 
    value: 'madrid', 
    label: 'Madrid', 
    country: 'España',
    timezone: 'UTC+1',
    coordinates: '40.4168°N, 3.7038°W',
    latitude: 40.4168,
    longitude: -3.7038,
    status: 'online'
  },
  { 
    value: 'barcelona', 
    label: 'Barcelona', 
    country: 'España',
    timezone: 'UTC+1',
    coordinates: '41.3851°N, 2.1734°E',
    latitude: 41.3851,
    longitude: 2.1734,
    status: 'online'
  },
  { 
    value: 'valencia', 
    label: 'Valencia', 
    country: 'España',
    timezone: 'UTC+1',
    coordinates: '39.4699°N, 0.3763°W',
    latitude: 39.4699,
    longitude: -0.3763,
    status: 'online'
  },
  { 
    value: 'sevilla', 
    label: 'Sevilla', 
    country: 'España',
    timezone: 'UTC+1',
    coordinates: '37.3886°N, 5.9823°W',
    latitude: 37.3886,
    longitude: -5.9823,
    status: 'online'
  },
  { 
    value: 'bilbao', 
    label: 'Bilbao', 
    country: 'España',
    timezone: 'UTC+1',
    coordinates: '43.2627°N, 2.9253°W',
    latitude: 43.2627,
    longitude: -2.9253,
    status: 'maintenance'
  },
];

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationData>(locations[0]);

  return (
    <LocationContext.Provider value={{
      selectedLocation,
      setSelectedLocation,
      locations
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
