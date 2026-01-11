import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, X, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const EditHealthRecordScreen: React.FC = () => {
  const { id, recordId } = useParams<{ id: string; recordId: string }>();
  const navigate = useNavigate();
  const { animals, getHealthRecordsByAnimalId, updateHealthRecord, deleteHealthRecord } = useApp();

  const animal = animals.find(a => a.id === id);
  const healthRecords = id ? getHealthRecordsByAnimalId(id) : [];
  const healthRecord = healthRecords.find(r => r.id === recordId);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Load health record data into form
  useEffect(() => {
    if (healthRecord) {
      setTitle(healthRecord.title);
      setDate(healthRecord.date.split('T')[0]); // Format date for input
      setNotes(healthRecord.notes || '');
    }
  }, [healthRecord]);

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

  if (!healthRecord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Health Record Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => id ? navigate(`/animal/${id}/health-records`) : navigate('/')}>
                Back
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!date) {
      toast.error('Date is required');
      return;
    }

    if (recordId) {
      updateHealthRecord(recordId, {
        title: title.trim(),
        date: date,
        notes: notes.trim() || undefined,
      });
      toast.success('Health record updated successfully!');
      navigate(`/animal/${id}/health-records`);
    }
  };

  const handleDelete = () => {
    if (recordId) {
      deleteHealthRecord(recordId);
      toast.success('Health record deleted successfully!');
      navigate(`/animal/${id}/health-records`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <Button variant="outline" onClick={() => id ? navigate(`/animal/${id}/health-records`) : navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-orange-800">Edit Health Record - {animal.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter health record title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter additional notes"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => id ? navigate(`/animal/${id}/health-records`) : navigate('/')}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  type="button" 
                  variant="destructive" 
                  onClick={() => setIsDeleteDialogOpen(true)}
                  className="ml-auto"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete this health record.
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
    </div>
  );
};

export default EditHealthRecordScreen;
