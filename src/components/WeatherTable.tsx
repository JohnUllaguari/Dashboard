
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const WeatherTable = () => {
  const weatherData = [
    {
      hora: '09:00',
      temperatura: '20°C',
      condicion: 'Parcialmente nublado',
      precipitacion: '10%',
      viento: '8 km/h',
      presion: '1015 hPa',
      estado: 'normal'
    },
    {
      hora: '12:00',
      temperatura: '24°C',
      condicion: 'Soleado',
      precipitacion: '0%',
      viento: '12 km/h',
      presion: '1013 hPa',
      estado: 'bueno'
    },
    {
      hora: '15:00',
      temperatura: '26°C',
      condicion: 'Soleado',
      precipitacion: '5%',
      viento: '15 km/h',
      presion: '1012 hPa',
      estado: 'bueno'
    },
    {
      hora: '18:00',
      temperatura: '25°C',
      condicion: 'Parcialmente nublado',
      precipitacion: '20%',
      viento: '10 km/h',
      presion: '1010 hPa',
      estado: 'normal'
    },
    {
      hora: '21:00',
      temperatura: '22°C',
      condicion: 'Nublado',
      precipitacion: '35%',
      viento: '8 km/h',
      presion: '1009 hPa',
      estado: 'precaucion'
    }
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'bueno':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Óptimo</Badge>;
      case 'normal':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Normal</Badge>;
      case 'precaucion':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Precaución</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Condiciones Detalladas por Horas
      </h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-gray-700">Hora</TableHead>
              <TableHead className="font-semibold text-gray-700">Temperatura</TableHead>
              <TableHead className="font-semibold text-gray-700">Condición</TableHead>
              <TableHead className="font-semibold text-gray-700">Precipitación</TableHead>
              <TableHead className="font-semibold text-gray-700">Viento</TableHead>
              <TableHead className="font-semibold text-gray-700">Presión</TableHead>
              <TableHead className="font-semibold text-gray-700">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {weatherData.map((row, index) => (
              <TableRow key={index} className="hover:bg-white/50 transition-colors">
                <TableCell className="font-medium">{row.hora}</TableCell>
                <TableCell className="font-semibold text-red-600">{row.temperatura}</TableCell>
                <TableCell>{row.condicion}</TableCell>
                <TableCell className="text-blue-600">{row.precipitacion}</TableCell>
                <TableCell className="text-green-600">{row.viento}</TableCell>
                <TableCell>{row.presion}</TableCell>
                <TableCell>{getEstadoBadge(row.estado)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default WeatherTable;
