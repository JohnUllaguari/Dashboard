
import React from 'react';
import { Cloud, Sun } from 'lucide-react';

const HeaderUI = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Cloud className="w-8 h-8" />
          <Sun className="w-6 h-6 text-yellow-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard Meteorológico</h1>
          <p className="text-blue-100 mt-1">Monitoreo en tiempo real del clima</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderUI;
