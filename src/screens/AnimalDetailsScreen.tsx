import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Heart, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const AnimalDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, deleteAnimal } = useApp();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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

  const handleDelete = () => {
    if (id) {
      deleteAnimal(id);
      setIsDeleteDialogOpen(false);
      toast.success(`${animal.name} has been deleted successfully`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex gap-2">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Link to={`/edit-animal/${animal.id}`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Link to={`/animal/${animal.id}/health-records`}>
            <Button variant="secondary">
              <Heart className="mr-2 h-4 w-4" />
              Health Records
            </Button>
          </Link>
          <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete {animal.name} and all associated health records.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-3xl">{animal.name}</CardTitle>
            <Badge variant="secondary" className="text-base px-3 py-1">
              {calculateAge(animal.birthDate)} years
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Breed</p>
              <p className="text-lg font-semibold">{animal.breed}</p>
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
