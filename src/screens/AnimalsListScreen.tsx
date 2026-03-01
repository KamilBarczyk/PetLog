import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-800">My Animals</h1>
          {animals.length > 0 && (
            <Link to="/add-animal">
              <Button variant="orange">
                <PawPrint className="mr-2 h-4 w-4" />
                Add Animal
              </Button>
            </Link>
          )}
        </div>

        {animals.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Animals</h2>
              <p className="text-gray-500 mb-4">Add your first animal to get started!</p>
              <Link to="/add-animal">
                <Button variant="outline">
                  <PawPrint className="mr-2 h-4 w-4" />
                  Add First Animal
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => {
              const age = calculateAge(animal.birthDate);
              const ageText = age === 1 ? 'year' : 'years';
              return (
                <Link key={animal.id} to={`/animal/${animal.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer relative border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-xl font-bold text-orange-800">{animal.name}</CardTitle>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                        {age} {ageText}
                      </Badge>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Breed:</span>
                        <span className="text-sm font-medium">{animal.breed}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Weight:</span>
                        <span className="text-sm font-medium">{animal.weight} kg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Birth Date:</span>
                        <span className="text-sm font-medium">{formatDate(animal.birthDate)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalsListScreen;
