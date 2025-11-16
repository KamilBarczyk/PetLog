import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AnimalsListScreen: React.FC = () => {
  const { animals } = useApp();

  if (animals.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No Animals</h2>
        <p>Add your first animal to get started!</p>
        <Link to="/add-animal">Add Animal</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Animals ({animals.length})</h2>
      <Link to="/add-animal">Add Animal</Link>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <strong>{animal.name}</strong> - {animal.breed} ({animal.weight} kg)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimalsListScreen;
