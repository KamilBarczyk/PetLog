import { AppProvider } from './context/AppContext';

const App = () => {
  return (
    <AppProvider>
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>PetLog</h1>
      </div>
    </AppProvider>
  );
};

export default App;
