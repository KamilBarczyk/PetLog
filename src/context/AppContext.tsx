import React, { createContext, useContext, useState, useEffect } from 'react';
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

  // Load data from localStorage on mount
  useEffect(() => {
    const savedAnimals = localStorage.getItem('animals');
    const savedHealthRecords = localStorage.getItem('healthRecords');
    
    if (savedAnimals) {
      try {
        setAnimals(JSON.parse(savedAnimals));
      } catch (error) {
        console.error('Error loading animals:', error);
      }
    }
    
    if (savedHealthRecords) {
      try {
        setHealthRecords(JSON.parse(savedHealthRecords));
      } catch (error) {
        console.error('Error loading health records:', error);
      }
    }
  }, []);

  return (
    <AppContext.Provider value={{ animals, healthRecords }}>
      {children}
    </AppContext.Provider>
  );
};

