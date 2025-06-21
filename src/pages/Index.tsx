
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-bounce delay-1000"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-cyan-200/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-sky-300/25 rounded-full blur-md animate-bounce delay-700"></div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 relative z-10">
        {/* Header section */}
        <div className="space-y-4 mb-6 animate-fade-in">
          <Header />
          <AlertsSection />
          <LocationSelector />
        </div>
        
        {/* Weather indicators */}
        <div className="mb-6 animate-fade-in delay-100">
          <WeatherIndicators />
        </div>
        
        {/* Main chart section */}
        <div className="mb-8 animate-fade-in delay-200">
          <WeatherChart />
        </div>

        {/* Three info cards horizontally below the chart */}
        <div className="mb-8 animate-fade-in delay-300">
          <AdditionalInfo />
        </div>
        
        {/* Weather table - full width at bottom */}
        <div className="animate-fade-in delay-400">
          <WeatherTable />
        </div>
      </div>

      {/* Floating weather particles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-cyan-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-indigo-400/50 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-1/2 w-2.5 h-2.5 bg-sky-400/25 rounded-full animate-bounce delay-1000"></div>
      </div>
    </div>
  );
};

export default Index;
