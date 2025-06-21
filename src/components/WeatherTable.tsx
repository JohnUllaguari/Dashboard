import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, Download, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const WeatherTable = () => {
  const [filter, setFilter] = useState('all');

  const weatherData = [
    {
      hora: '09:00',
      temperatura: '20°C',
      condicion: 'Parcialmente nublado',
      precipitacion: '10%',
      viento: '8 km/h',
      presion: '1015 hPa',
      uv: '3',
      estado: 'normal',
      tendencia: 'up'
    },
    {
      hora: '12:00',
      temperatura: '24°C',
      condicion: 'Soleado',
      precipitacion: '0%',
      viento: '12 km/h',
      presion: '1013 hPa',
      uv: '7',
      estado: 'bueno',
      tendencia: 'up'
    },
    {
      hora: '15:00',
      temperatura: '26°C',
      condicion: 'Soleado',
      precipitacion: '5%',
      viento: '15 km/h',
      presion: '1012 hPa',
      uv: '8',
      estado: 'bueno',
      tendencia: 'stable'
    },
    {
      hora: '18:00',
      temperatura: '25°C',
      condicion: 'Parcialmente nublado',
      precipitacion: '20%',
      viento: '10 km/h',
      presion: '1010 hPa',
      uv: '4',
      estado: 'normal',
      tendencia: 'down'
    },
    {
      hora: '21:00',
      temperatura: '22°C',
      condicion: 'Nublado',
      precipitacion: '35%',
      viento: '8 km/h',
      presion: '1009 hPa',
      uv: '1',
      estado: 'precaucion',
      tendencia: 'down'
    },
    {
      hora: '00:00',
      temperatura: '18°C',
      condicion: 'Nublado',
      precipitacion: '45%',
      viento: '5 km/h',
      presion: '1008 hPa',
      uv: '0',
      estado: 'precaucion',
      tendencia: 'down'
    }
  ];

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'bueno':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Óptimo</Badge>;
      case 'normal':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">Normal</Badge>;
      case 'precaucion':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200">Precaución</Badge>;
      default:
        return <Badge variant="secondary">-</Badge>;
    }
  };

  const getTendenciaIcon = (tendencia: string) => {
    switch (tendencia) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCondicionColor = (condicion: string) => {
    if (condicion.includes('Soleado')) return 'text-yellow-600 font-medium';
    if (condicion.includes('Nublado')) return 'text-gray-600 font-medium';
    if (condicion.includes('Parcialmente')) return 'text-blue-600 font-medium';
    return 'text-gray-700';
  };

  const filteredData = filter === 'all' ? weatherData : weatherData.filter(row => row.estado === filter);

  return (
    <Card className="p-6 bg-gradient-to-br from-white via-slate-50/30 to-white border-0 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg">
            <Calendar className="w-6 h-6 text-slate-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Condiciones Detalladas
            </h2>
            <p className="text-gray-600 text-sm">Pronóstico por horas • Próximas 24 horas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className="h-8 text-xs"
            >
              <Filter className="w-3 h-3 mr-1" />
              Todos
            </Button>
            <Button
              variant={filter === 'bueno' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('bueno')}
              className="h-8 text-xs"
            >
              Óptimo
            </Button>
            <Button
              variant={filter === 'precaucion' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('precaucion')}
              className="h-8 text-xs"
            >
              Precaución
            </Button>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            <Download className="w-4 h-4 mr-1" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="hover:bg-gray-50/80">
              <TableHead className="font-bold text-gray-700 h-12">Hora</TableHead>
              <TableHead className="font-bold text-gray-700">Temperatura</TableHead>
              <TableHead className="font-bold text-gray-700">Condición</TableHead>
              <TableHead className="font-bold text-gray-700">Precipitación</TableHead>
              <TableHead className="font-bold text-gray-700">Viento</TableHead>
              <TableHead className="font-bold text-gray-700">Presión</TableHead>
              <TableHead className="font-bold text-gray-700">Índice UV</TableHead>
              <TableHead className="font-bold text-gray-700">Estado</TableHead>
              <TableHead className="font-bold text-gray-700 text-center">Tendencia</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow 
                key={index} 
                className="hover:bg-blue-50/30 transition-colors border-b border-gray-100"
              >
                <TableCell className="font-bold text-gray-800 bg-gray-50/30">
                  {row.hora}
                </TableCell>
                <TableCell className="font-bold text-red-600">
                  {row.temperatura}
                </TableCell>
                <TableCell className={getCondicionColor(row.condicion)}>
                  {row.condicion}
                </TableCell>
                <TableCell className="font-medium text-blue-600">
                  {row.precipitacion}
                </TableCell>
                <TableCell className="font-medium text-green-600">
                  {row.viento}
                </TableCell>
                <TableCell className="font-medium text-gray-700">
                  {row.presion}
                </TableCell>
                <TableCell className="font-medium">
                  <Badge 
                    className={`${parseInt(row.uv) > 6 ? 'bg-orange-100 text-orange-800' : 
                      parseInt(row.uv) > 3 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-gray-100 text-gray-800'}`}
                  >
                    {row.uv}
                  </Badge>
                </TableCell>
                <TableCell>{getEstadoBadge(row.estado)}</TableCell>
                <TableCell className="text-center">
                  {getTendenciaIcon(row.tendencia)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg">
        <span>Mostrando {filteredData.length} de {weatherData.length} registros</span>
        <span>Última actualización: hace 5 minutos</span>
      </div>
    </Card>
  );
};

export default WeatherTable;
