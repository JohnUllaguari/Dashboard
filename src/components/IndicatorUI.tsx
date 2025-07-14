
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface IndicatorUIProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  trend?: 'up' | 'down' | 'stable';
}

export default function IndicatorUI({ 
  title, 
  description, 
  icon, 
  color = 'blue',
  trend 
}: IndicatorUIProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'red':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'yellow':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  return (
    <Card className={`p-4 transition-all duration-300 hover:shadow-lg ${getColorClasses(color)}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && <div className="text-2xl">{icon}</div>}
          <div>
            <h3 className="font-semibold text-sm text-gray-600">{title}</h3>
            <p className="text-xl font-bold text-gray-800">{description}</p>
          </div>
        </div>
        {trend && (
          <Badge variant="outline" className="text-xs">
            {getTrendIcon(trend)}
          </Badge>
        )}
      </div>
    </Card>
  );
}
