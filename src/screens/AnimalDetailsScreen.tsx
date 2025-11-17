import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AnimalDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals } = useApp();

  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Animal Not Found</h2>
        <button onClick={() => navigate('/')}>Back to List</button>
      </div>
    );
  }

  const calculateAge = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    return monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate()) 
      ? age - 1 
      : age;
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate('/')}>← Back</button>
      <h2>{animal.name}</h2>
      <p><strong>Breed:</strong> {animal.breed}</p>
      <p><strong>Age:</strong> {calculateAge(animal.birthDate)} years</p>
      <p><strong>Birth Date:</strong> {new Date(animal.birthDate).toLocaleDateString('en-US')}</p>
      <p><strong>Weight:</strong> {animal.weight} kg</p>
    </div>
  );
};

export default AnimalDetailsScreen;

