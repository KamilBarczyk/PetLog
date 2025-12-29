import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Search, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const HealthRecordsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, getHealthRecordsByAnimalId, deleteHealthRecord } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);

  const animal = animals.find(a => a.id === id);

  const healthRecords = useMemo(() => {
    if (!id) return [];
    const records = getHealthRecordsByAnimalId(id);
    // Sort by date (newest first)
    return records.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }, [id, getHealthRecordsByAnimalId]);

  // Filter health records by title or notes
  const filteredHealthRecords = useMemo(() => {
    if (!searchQuery.trim()) {
      return healthRecords;
    }
    const query = searchQuery.toLowerCase().trim();
    return healthRecords.filter(record => 
      record.title.toLowerCase().includes(query) ||
      (record.notes && record.notes.toLowerCase().includes(query))
    );
  }, [healthRecords, searchQuery]);

  const handleDeleteClick = (recordId: string) => {
    setRecordToDelete(recordId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (recordToDelete) {
      deleteHealthRecord(recordToDelete);
      toast.success('Health record deleted successfully!');
      setDeleteDialogOpen(false);
      setRecordToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRecordToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/animal/${id}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-2xl font-bold text-orange-800 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Health Records
            </CardTitle>
            <Link to={`/animal/${id}/add-health-record`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Health Record
              </Button>
            </Link>
          </CardHeader>
        </Card>

        {healthRecords.length > 0 && (
          <Card className="mb-4">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="search">Search Health Records</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by title or notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {healthRecords.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Health Records</h2>
              <p className="text-gray-500">No health records found for this animal.</p>
            </CardContent>
          </Card>
        ) : filteredHealthRecords.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Results</h2>
              <p className="text-gray-500">No health records found matching "{searchQuery}"</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredHealthRecords.map((record) => (
              <Link key={record.id} to={`/animal/${id}/edit-health-record/${record.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{record.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{formatDate(record.date)}</p>
                        {record.notes && (
                          <p className="text-sm text-gray-500 mt-2">{record.notes}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Health Record</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this health record? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={handleDeleteCancel}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HealthRecordsScreen;
