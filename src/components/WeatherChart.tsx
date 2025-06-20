
import React from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeatherChart = () => {
  const data = [
    { time: '00:00', temperatura: 18, humedad: 85 },
    { time: '03:00', temperatura: 16, humedad: 88 },
    { time: '06:00', temperatura: 15, humedad: 90 },
    { time: '09:00', temperatura: 20, humedad: 75 },
    { time: '12:00', temperatura: 24, humedad: 60 },
    { time: '15:00', temperatura: 26, humedad: 55 },
    { time: '18:00', temperatura: 25, humedad: 58 },
    { time: '21:00', temperatura: 22, humedad: 65 },
  ];

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Evolución del Clima (24 horas)
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
            <XAxis 
              dataKey="time" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="temperatura" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              name="Temperatura (°C)"
            />
            <Line 
              type="monotone" 
              dataKey="humedad" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              name="Humedad (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WeatherChart;
