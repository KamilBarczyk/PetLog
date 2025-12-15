import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HealthRecordsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, getHealthRecordsByAnimalId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

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
          <Link to={`/animal/${id}/add-health-record`}>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Health Record
            </Button>
          </Link>
        </div>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-2xl">Health Records - {animal.name}</CardTitle>
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
          <div className="space-y-4">
            {filteredHealthRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle>{record.title}</CardTitle>
                  <Link to={`/animal/${id}/edit-health-record/${record.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date</p>
                    <p className="text-lg font-semibold">
                      {new Date(record.date).toLocaleDateString('en-US')}
                    </p>
                  </div>
                  {record.notes && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Notes</p>
                      <p className="text-base">{record.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecordsScreen;
