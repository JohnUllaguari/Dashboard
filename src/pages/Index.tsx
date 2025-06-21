
import React from 'react';
import Header from '../components/Header';
import AlertsSection from '../components/AlertsSection';
import LocationSelector from '../components/LocationSelector';
import WeatherIndicators from '../components/WeatherIndicators';
import WeatherChart from '../components/WeatherChart';
import WeatherTable from '../components/WeatherTable';
import AdditionalInfo from '../components/AdditionalInfo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
        <Header />
        <AlertsSection />
        <LocationSelector />
        <WeatherIndicators />
        
        {/* Main content grid - better distribution on laptop screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Chart takes more space on larger screens */}
          <div className="lg:col-span-1 xl:col-span-2">
            <WeatherChart />
          </div>
          
          {/* Additional info in sidebar on larger screens */}
          <div className="lg:col-span-1 xl:col-span-1">
            <AdditionalInfo />
          </div>
        </div>
        
        {/* Weather table gets its own full-width section */}
        <div className="w-full">
          <WeatherTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
