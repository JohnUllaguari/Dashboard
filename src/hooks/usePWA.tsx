
import { useState, useEffect } from 'react';
import { Workbox } from 'workbox-window';

export interface PWAInstallPrompt extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export const usePWA = () => {
  const [installPrompt, setInstallPrompt] = useState<PWAInstallPrompt | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [wb, setWb] = useState<Workbox | null>(null);

  useEffect(() => {
    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
      const workbox = new Workbox('/sw.js');
      setWb(workbox);

      workbox.addEventListener('controlling', () => {
        window.location.reload();
      });

      workbox.addEventListener('waiting', () => {
        setUpdateAvailable(true);
      });

      workbox.register();
    }

    // Detectar si la app es instalable
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as PWAInstallPrompt);
    };

    // Detectar cambios en la conexión
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installPWA = async () => {
    if (!installPrompt) {
      // Si no hay soporte, mostrar instrucciones
      alert('Para instalar la app:\n\n' +
            'Chrome/Edge: Menú (⋮) → "Instalar App"\n' +
            'Firefox: Menú (☰) → "Instalar como App"\n' +
            'Safari: Compartir → "Agregar a pantalla de inicio"');
      return;
    }

    try {
      await installPrompt.prompt();
      const result = await installPrompt.userChoice;
      
      if (result.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error('Error installing PWA:', error);
      alert('No se pudo instalar automáticamente. Use el menú del navegador.');
    }
  };

  const updatePWA = () => {
    if (!wb) return;
    
    wb.messageSkipWaiting();
  };

  return {
    installPWA,
    isOnline,
    updateAvailable,
    updatePWA
  };
};
