import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnimalDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals } = useApp();

  const animal = animals.find(a => a.id === id);

  if (!animal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Animal Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/')}>Back to List</Button>
            </CardContent>
          </Card>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            ← Back
          </Button>
          <Link to={`/edit-animal/${animal.id}`}>
            <Button>Edit</Button>
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{animal.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Breed</p>
              <p className="text-lg font-semibold">{animal.breed}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Age</p>
              <p className="text-lg font-semibold">{calculateAge(animal.birthDate)} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Birth Date</p>
              <p className="text-lg font-semibold">{new Date(animal.birthDate).toLocaleDateString('en-US')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Weight</p>
              <p className="text-lg font-semibold">{animal.weight} kg</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimalDetailsScreen;
