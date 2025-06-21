
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Video Background */}
      <div className="fixed inset-0 z-0">
        <video
          className="w-full h-full object-cover opacity-20"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://cdn.pixabay.com/vimeo/639030159/clouds-96671.mp4?width=1280&hash=b91fb91135b3c63264f3b76b8e3d0e18a8b74d79" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-indigo-900/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-blue-500/10"></div>
      </div>

      {/* Animated Weather Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Floating Clouds */}
        <div className="absolute top-10 left-0 w-32 h-20 bg-white/10 rounded-full blur-lg animate-float-slow"></div>
        <div className="absolute top-32 right-20 w-40 h-24 bg-white/8 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute top-64 left-32 w-28 h-16 bg-white/12 rounded-full blur-lg animate-float-reverse"></div>
        
        {/* Rain Drops Effect */}
        <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-rain-drop"></div>
        <div className="absolute top-0 left-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-blue-400/25 to-transparent animate-rain-drop-delayed"></div>
        <div className="absolute top-0 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent animate-rain-drop-slow"></div>
        
        {/* Lightning Effects */}
        <div className="absolute top-20 right-10 w-0.5 h-32 bg-gradient-to-b from-yellow-200/60 via-white/40 to-transparent animate-lightning opacity-0"></div>
        
        {/* Snow Flakes */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-white/40 rounded-full animate-snow-fall"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-snow-fall-delayed"></div>
        <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-white/25 rounded-full animate-snow-fall-slow"></div>
        
        {/* Gradient Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-conic from-cyan-500/3 via-blue-500/2 to-indigo-500/3 animate-spin-very-slow"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
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
          <div className="mb-6 animate-fade-in delay-200">
            <WeatherChart />
          </div>

          {/* Three info cards horizontally */}
          <div className="mb-6 animate-fade-in delay-300">
            <AdditionalInfo />
          </div>
          
          {/* Weather table */}
          <div className="animate-fade-in delay-400">
            <WeatherTable />
          </div>
        </div>
      </div>

      {/* Interactive Weather Elements */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {/* Sun Rays */}
        <div className="absolute top-16 right-16 w-24 h-24">
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300/20 via-yellow-200/10 to-transparent rounded-full animate-sun-rays"></div>
          <div className="absolute inset-2 bg-gradient-radial from-yellow-400/15 via-yellow-300/8 to-transparent rounded-full animate-sun-rays-reverse"></div>
        </div>

        {/* Wind Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wind-flow"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent animate-wind-flow-delayed"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/10 to-transparent animate-wind-flow-reverse"></div>
      </div>
    </div>
  );
};

export default Index;
