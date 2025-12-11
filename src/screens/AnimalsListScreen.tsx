import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnimalsListScreen: React.FC = () => {
  const { animals } = useApp();

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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-800">My Animals</h1>
          <Link to="/add-animal">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Animal
            </Button>
          </Link>
        </div>

        {animals.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Animals</h2>
              <p className="text-gray-500 mb-4">Add your first animal to get started!</p>
              <Link to="/add-animal">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Animal
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <Link key={animal.id} to={`/animal/${animal.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle>{animal.name}</CardTitle>
                    <Badge variant="secondary">{calculateAge(animal.birthDate)} years</Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-600">Breed: {animal.breed}</p>
                    <p className="text-sm text-gray-600">Weight: {animal.weight} kg</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsListScreen;
