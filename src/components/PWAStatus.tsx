
import React from 'react';
import { usePWA } from '../hooks/usePWA';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Wifi, WifiOff, RefreshCw } from 'lucide-react';

const PWAStatus = () => {
  const { isInstallable, installPWA, isOnline, updateAvailable, updatePWA } = usePWA();

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {/* Estado de conexión */}
      <Card className={`p-3 transition-all duration-300 ${isOnline ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-600" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-600" />
          )}
          <Badge variant={isOnline ? 'default' : 'destructive'} className="text-xs">
            {isOnline ? 'En línea' : 'Sin conexión'}
          </Badge>
        </div>
      </Card>

      {/* Botón de instalación */}
      {isInstallable && (
        <Card className="p-3 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" />
            <Button
              onClick={installPWA}
              size="sm"
              className="h-8 text-xs"
              variant="default"
            >
              Instalar App
            </Button>
          </div>
        </Card>
      )}

      {/* Actualización disponible */}
      {updateAvailable && (
        <Card className="p-3 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-yellow-600" />
            <Button
              onClick={updatePWA}
              size="sm"
              className="h-8 text-xs"
              variant="default"
            >
              Actualizar
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PWAStatus;
