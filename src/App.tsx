import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AnimalsListScreen from './screens/AnimalsListScreen';
import AddAnimalScreen from './screens/AddAnimalScreen';
import AnimalDetailsScreen from './screens/AnimalDetailsScreen';
import EditAnimalScreen from './screens/EditAnimalScreen';
import HealthRecordsScreen from './screens/HealthRecordsScreen';

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
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
