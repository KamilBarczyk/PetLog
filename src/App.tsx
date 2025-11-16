import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AnimalsListScreen from './screens/AnimalsListScreen';
import AddAnimalScreen from './screens/AddAnimalScreen';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimalsListScreen />} />
          <Route path="/add-animal" element={<AddAnimalScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
