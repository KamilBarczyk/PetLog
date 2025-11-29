import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditAnimalScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, updateAnimal } = useApp();

  const animal = animals.find(a => a.id === id);

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [weight, setWeight] = useState('');

  // Load animal data into form
  useEffect(() => {
    if (animal) {
      setName(animal.name);
      setBreed(animal.breed);
      setBirthDate(animal.birthDate.split('T')[0]); // Format date for input
      setWeight(animal.weight.toString());
    }
  }, [animal]);

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

    if (id) {
      updateAnimal(id, {
        name: name.trim(),
        breed: breed.trim(),
        birthDate: birthDate,
        weight: weightNum,
      });
      navigate(`/animal/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Animal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter animal name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Enter breed"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Birth Date</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">Save</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => id ? navigate(`/animal/${id}`) : navigate('/')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditAnimalScreen;
