import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnimalsListScreen: React.FC = () => {
  const { animals } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-orange-800">My Animals</h1>
          <Link to="/add-animal">
            <Button>Add Animal</Button>
          </Link>
        </div>

        {animals.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Animals</h2>
              <p className="text-gray-500 mb-4">Add your first animal to get started!</p>
              <Link to="/add-animal">
                <Button>Add Animal</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {animals.map((animal) => (
              <Link key={animal.id} to={`/animal/${animal.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{animal.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
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
