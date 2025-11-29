import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AnimalsListScreen from './screens/AnimalsListScreen';
import AddAnimalScreen from './screens/AddAnimalScreen';
import AnimalDetailsScreen from './screens/AnimalDetailsScreen';
import EditAnimalScreen from './screens/EditAnimalScreen';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimalsListScreen />} />
          <Route path="/add-animal" element={<AddAnimalScreen />} />
          <Route path="/animal/:id" element={<AnimalDetailsScreen />} />
          <Route path="/edit-animal/:id" element={<EditAnimalScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
