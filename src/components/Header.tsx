
import React from 'react';
import { Card } from '@/components/ui/card';

const Header = () => {
  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Dashboard Meteorológico
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Monitorea las condiciones climáticas en tiempo real y mantente informado sobre los cambios meteorológicos en tu región
        </p>
      </div>
    </Card>
  );
};

export default Header;
