
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WifiOff, RefreshCw, CloudOff } from 'lucide-react';

const OfflineFallback = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 p-4">
      <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-2xl">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-red-100 rounded-full">
              <WifiOff className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800">
            Sin conexión a internet
          </h1>
          
          <p className="text-gray-600 leading-relaxed">
            No se puede conectar a internet en este momento. 
            Algunas funcionalidades pueden estar limitadas.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <CloudOff className="w-4 h-4" />
            <span>Datos meteorológicos no disponibles</span>
          </div>
          
          <Button 
            onClick={handleRetry} 
            className="w-full"
            size="lg"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar conexión
          </Button>
        </div>

        <div className="text-xs text-gray-400 border-t pt-4">
          Esta aplicación funciona mejor con conexión a internet
        </div>
      </Card>
    </div>
  );
};

export default OfflineFallback;
