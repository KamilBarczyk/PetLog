import React, { createContext, useContext, useState, useEffect } from 'react';
import { Animal, HealthRecord } from '../types/types';

interface AppContextType {
  animals: Animal[];
  healthRecords: HealthRecord[];
  addAnimal: (animal: Omit<Animal, 'id' | 'createdAt'>) => void;
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

  const addAnimal = (animalData: Omit<Animal, 'id' | 'createdAt'>) => {
    const newAnimal: Animal = {
      ...animalData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setAnimals(prev => [...prev, newAnimal]);
  };

  return (
    <AppContext.Provider value={{ animals, healthRecords, addAnimal }}>
      {children}
    </AppContext.Provider>
  );
};
