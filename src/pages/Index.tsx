
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header section */}
        <div className="space-y-4 mb-6">
          <Header />
          <AlertsSection />
          <LocationSelector />
        </div>
        
        {/* Weather indicators - full width */}
        <div className="mb-6">
          <WeatherIndicators />
        </div>
        
        {/* Main content area - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left column - Chart (takes 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <WeatherChart />
            {/* Weather table goes under chart on large screens, full width on mobile */}
            <div className="lg:hidden">
              <WeatherTable />
            </div>
          </div>
          
          {/* Right column - Additional info */}
          <div className="lg:col-span-1">
            <AdditionalInfo />
          </div>
        </div>
        
        {/* Weather table - only shown on large screens */}
        <div className="hidden lg:block">
          <WeatherTable />
        </div>
      </div>
    </div>
  );
};

export default Index;
