
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter, Download } from 'lucide-react';

interface WeatherTableFiltersProps {
  filter: string;
  setFilter: (filter: string) => void;
  totalRows: number;
  filteredRows: number;
}

const WeatherTableFilters = ({ filter, setFilter, totalRows, filteredRows }: WeatherTableFiltersProps) => {
  return (
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
          variant={filter === 'morning' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setFilter('morning')}
          className="h-8 text-xs"
        >
          Mañana
        </Button>
        <Button
          variant={filter === 'afternoon' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setFilter('afternoon')}
          className="h-8 text-xs"
        >
          Tarde
        </Button>
        <Button
          variant={filter === 'night' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setFilter('night')}
          className="h-8 text-xs"
        >
          Noche
        </Button>
      </div>
      <Button variant="outline" size="sm" className="h-8">
        <Download className="w-4 h-4 mr-1" />
        Exportar
      </Button>
    </div>
  );
};

export default WeatherTableFilters;
