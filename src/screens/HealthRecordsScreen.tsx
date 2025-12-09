import React, { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const HealthRecordsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { animals, getHealthRecordsByAnimalId } = useApp();

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

        {healthRecords.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">No Health Records</h2>
              <p className="text-gray-500">No health records found for this animal.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {healthRecords.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <CardTitle>{record.title}</CardTitle>
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
