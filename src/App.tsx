import { AppProvider } from './context/AppContext';
import AnimalsListScreen from './screens/AnimalsListScreen';

const App = () => {
  return (
    <AppProvider>
      <AnimalsListScreen />
    </AppProvider>
  );
};

export default App;
