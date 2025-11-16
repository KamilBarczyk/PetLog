import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const AddAnimalScreen: React.FC = () => {
  const navigate = useNavigate();
  const { addAnimal } = useApp();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name.trim()) {
      alert('Name is required');
      return;
    }
    if (!breed.trim()) {
      alert('Breed is required');
      return;
    }
    if (!birthDate) {
      alert('Birth date is required');
      return;
    }
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      alert('Weight must be a positive number');
      return;
    }

    addAnimal({
      name: name.trim(),
      breed: breed.trim(),
      birthDate: birthDate,
      weight: weightNum,
    });
    navigate('/');
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Animal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Breed:
            <input
              type="text"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Birth Date:
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>
            Weight (kg):
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </label>
        </div>
        <button type="submit" style={{ marginTop: "10px", padding: "5px 10px" }}>
          Add
        </button>
      </form>
      <button onClick={() => navigate('/')} style={{ marginTop: "10px" }}>
        Cancel
      </button>
    </div>
  );
};

export default AddAnimalScreen;
