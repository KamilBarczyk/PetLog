import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from '@/components/ui/sonner';
import AnimalsListScreen from './screens/AnimalsListScreen';
import AddAnimalScreen from './screens/AddAnimalScreen';
import AnimalDetailsScreen from './screens/AnimalDetailsScreen';
import EditAnimalScreen from './screens/EditAnimalScreen';
import HealthRecordsScreen from './screens/HealthRecordsScreen';
import AddHealthRecordScreen from './screens/AddHealthRecordScreen';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimalsListScreen />} />
          <Route path="/add-animal" element={<AddAnimalScreen />} />
          <Route path="/animal/:id" element={<AnimalDetailsScreen />} />
          <Route path="/edit-animal/:id" element={<EditAnimalScreen />} />
          <Route path="/animal/:id/health-records" element={<HealthRecordsScreen />} />
          <Route path="/animal/:id/add-health-record" element={<AddHealthRecordScreen />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
