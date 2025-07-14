
import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface AlertUIProps {
  description: string;
  type?: 'info' | 'warning';
}

const AlertUI = ({ description, type = 'info' }: AlertUIProps) => {
  const isWarning = type === 'warning';
  
  return (
    <Card className={`p-4 border-l-4 ${isWarning ? 'border-amber-400 bg-amber-50' : 'border-blue-400 bg-blue-50'}`}>
      <div className="flex items-center gap-3">
        {isWarning ? (
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        ) : (
          <Info className="w-5 h-5 text-blue-600" />
        )}
        <p className={`${isWarning ? 'text-amber-800' : 'text-blue-800'} font-medium`}>
          {description}
        </p>
      </div>
    </Card>
  );
};

export default AlertUI;
