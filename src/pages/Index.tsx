
import React from 'react';
import Header from '../components/Header';
import AlertsSection from '../components/AlertsSection';
import LocationSelector from '../components/LocationSelector';
import WeatherIndicators from '../components/WeatherIndicators';
import WeatherChart from '../components/WeatherChart';
import WeatherTable from '../components/WeatherTable';
import AdditionalInfo from '../components/AdditionalInfo';
import PWAStatus from '../components/PWAStatus';

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
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/40 to-indigo-900/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-blue-500/20"></div>
      </div>

      {/* Enhanced Animated Weather Particles */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Floating Clouds */}
        <div className="absolute top-10 left-0 w-32 h-20 bg-white/15 rounded-full blur-xl animate-float-slow"></div>
        <div className="absolute top-32 right-20 w-40 h-24 bg-white/12 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-64 left-32 w-28 h-16 bg-white/18 rounded-full blur-lg animate-float-reverse"></div>
        
        {/* Enhanced Rain Drops Effect */}
        <div className="absolute top-0 left-1/4 w-1 h-20 bg-gradient-to-b from-transparent via-blue-300/40 to-transparent animate-rain-drop"></div>
        <div className="absolute top-0 left-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-blue-400/35 to-transparent animate-rain-drop-delayed"></div>
        <div className="absolute top-0 right-1/3 w-1 h-24 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent animate-rain-drop-slow"></div>
        
        {/* Enhanced Lightning Effects */}
        <div className="absolute top-20 right-10 w-0.5 h-32 bg-gradient-to-b from-yellow-200/80 via-white/60 to-transparent animate-lightning opacity-0"></div>
        
        {/* Enhanced Snow Flakes */}
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-white/50 rounded-full animate-snow-fall"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-snow-fall-delayed"></div>
        <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-white/35 rounded-full animate-snow-fall-slow"></div>
        
        {/* Enhanced Gradient Overlay Effects */}
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/8 via-transparent to-transparent animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-conic from-cyan-500/5 via-blue-500/3 to-indigo-500/5 animate-spin-very-slow"></div>
      </div>

      {/* Content with improved layout */}
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header section with enhanced styling */}
          <div className="space-y-6 mb-8 animate-fade-in">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
                <AlertsSection />
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
                <LocationSelector />
              </div>
            </div>
          </div>
          
          {/* Weather indicators with enhanced card design */}
          <div className="mb-8 animate-fade-in delay-100">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6">
              <WeatherIndicators />
            </div>
          </div>
          
          {/* Main chart section with improved styling */}
          <div className="mb-8 animate-fade-in delay-200">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6">
              <WeatherChart />
            </div>
          </div>

          {/* Enhanced grid layout for info cards */}
          <div className="mb-8 animate-fade-in delay-300">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6">
              <AdditionalInfo />
            </div>
          </div>
          
          {/* Weather table with enhanced styling */}
          <div className="animate-fade-in delay-400">
            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-6">
              <WeatherTable />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Interactive Weather Elements */}
      <div className="fixed inset-0 z-30 pointer-events-none">
        {/* Enhanced Sun Rays */}
        <div className="absolute top-16 right-16 w-32 h-32">
          <div className="absolute inset-0 bg-gradient-radial from-yellow-300/30 via-yellow-200/15 to-transparent rounded-full animate-sun-rays"></div>
          <div className="absolute inset-2 bg-gradient-radial from-yellow-400/25 via-yellow-300/12 to-transparent rounded-full animate-sun-rays-reverse"></div>
          <div className="absolute inset-4 bg-gradient-radial from-yellow-500/20 via-yellow-400/10 to-transparent rounded-full animate-sun-rays"></div>
        </div>

        {/* Enhanced Wind Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-wind-flow"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent animate-wind-flow-delayed"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-wind-flow-reverse"></div>
      </div>

      {/* PWA Status Component */}
      <PWAStatus />
    </div>
  );
};

export default Index;
