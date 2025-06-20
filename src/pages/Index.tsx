
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
      <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
        <Header />
        <AlertsSection />
        <LocationSelector />
        <WeatherIndicators />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <WeatherChart />
          </div>
          <div>
            <AdditionalInfo />
          </div>
        </div>
        <WeatherTable />
      </div>
    </div>
  );
};

export default Index;
