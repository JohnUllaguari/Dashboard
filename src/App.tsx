
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { LocationProvider } from './contexts/LocationContext';
import './index.css';

function App() {
  return (
    <LocationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}

export default App;
