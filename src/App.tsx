import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AnimalsListScreen from './screens/AnimalsListScreen';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AnimalsListScreen />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

export default App;
