import React, { createContext, useContext, useState } from 'react';
import { Animal, HealthRecord } from '../types/types';

interface AppContextType {
  animals: Animal[];
  healthRecords: HealthRecord[];
  // Functions will be added later
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);

  return (
    <AppContext.Provider value={{ animals, healthRecords }}>
      {children}
    </AppContext.Provider>
  );
};

