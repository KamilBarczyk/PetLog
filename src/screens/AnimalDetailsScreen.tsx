import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, FileText, Plus } from 'lucide-react';
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
  const { animals, deleteAnimal, getHealthRecordsByAnimalId } = useApp();
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const handleDelete = () => {
    if (id) {
      deleteAnimal(id);
      setIsDeleteDialogOpen(false);
      toast.success(`${animal.name} has been deleted successfully`);
      navigate('/');
    }
  };

  // Get last 3 health records sorted by date (newest first)
  const recentHealthRecords = useMemo(() => {
    if (!id) return [];
    const records = getHealthRecordsByAnimalId(id);
    return records
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      })
      .slice(0, 3);
  }, [id, getHealthRecordsByAnimalId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex gap-2">
            <Link to={`/edit-animal/${animal.id}`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
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
                <Button variant="orange" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-3xl font-bold text-orange-800">{animal.name}</CardTitle>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 text-base px-3 py-1">
              {calculateAge(animal.birthDate)} years
            </Badge>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Breed:</span>
              <span className="text-sm font-medium">{animal.breed}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Weight:</span>
              <span className="text-sm font-medium">{animal.weight} kg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Birth Date:</span>
              <span className="text-sm font-medium">{formatDate(animal.birthDate)}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-2xl font-bold text-orange-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Health Records
            </CardTitle>
            {recentHealthRecords.length > 0 && (
              <Link to={`/animal/${animal.id}/add-health-record`}>
                <Button variant="orange">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Health Record
                </Button>
              </Link>
            )}
          </CardHeader>
          <CardContent>
            {recentHealthRecords.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No health records found for this animal.</p>
                <Link to={`/animal/${animal.id}/add-health-record`}>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Health Record
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentHealthRecords.map((record) => (
                  <Link key={record.id} to={`/animal/${animal.id}/edit-health-record/${record.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer mb-2">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{record.title}</h4>
                            <p className="text-sm text-gray-600 mt-2">{formatDate(record.date)}</p>
                            {record.notes && (
                              <p className="text-sm text-gray-500 mt-2">{record.notes}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                <div className="pt-2">
                  <Link to={`/animal/${animal.id}/health-records`}>
                    <Button variant="outline" className="w-full">
                      View All Health Records
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnimalDetailsScreen;
