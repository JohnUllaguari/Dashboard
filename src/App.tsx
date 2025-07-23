
import Index from './pages/Index';
import { LocationProvider } from './contexts/LocationContext';
import './index.css';

function App() {
  return (
    <LocationProvider>
      <Index />
    </LocationProvider>
  );
}

export default App;
