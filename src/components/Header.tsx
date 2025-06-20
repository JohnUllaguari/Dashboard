
import React from 'react';
import { Card } from '@/components/ui/card';
import { CloudSun, Thermometer } from 'lucide-react';

const Header = () => {
  return (
    <Card className="p-8 bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 border-0 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      <div className="relative z-10 text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
            <CloudSun className="w-8 h-8 text-white" />
          </div>
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm animate-pulse">
            <Thermometer className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white drop-shadow-lg">
          Dashboard Meteorológico
        </h1>
        <div className="h-1 w-32 bg-white/30 mx-auto rounded-full"></div>
        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
          Monitorea las condiciones climáticas en tiempo real con precisión profesional. 
          Obtén datos actualizados, pronósticos detallados y alertas importantes para mantenerte siempre informado.
        </p>
        <div className="flex items-center justify-center gap-6 mt-6 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">En vivo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-sm font-medium">Actualizado cada 5 min</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Header;
