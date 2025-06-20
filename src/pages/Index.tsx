
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Header />
        <AlertsSection />
        <LocationSelector />
        <WeatherIndicators />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
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
