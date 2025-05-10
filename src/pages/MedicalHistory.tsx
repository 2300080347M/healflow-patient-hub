
import React, { useEffect, useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockMedicalRecords, mockPatients } from '@/lib/mockData';
import { MedicalRecord, Patient } from '@/types';
import MedicalRecordCard from '@/components/MedicalRecordCard';
import { Search } from 'lucide-react';

const MedicalHistory = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [recordType, setRecordType] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the patient data and records from an API
    // For demo purposes, we're using the first mock patient
    setPatient(mockPatients[0]);
    
    // Filter records for this patient
    const patientRecords = mockMedicalRecords.filter(record => 
      record.patientId === mockPatients[0].id
    );
    
    setRecords(patientRecords);
    setFilteredRecords(patientRecords);
  }, []);

  // Filter records based on search and type
  useEffect(() => {
    let filtered = records;
    
    // Filter by type
    if (recordType !== 'all') {
      filtered = filtered.filter(record => record.type === recordType);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(record => 
        record.title.toLowerCase().includes(term) || 
        record.description.toLowerCase().includes(term) ||
        record.providerName.toLowerCase().includes(term)
      );
    }
    
    setFilteredRecords(filtered);
  }, [records, searchTerm, recordType]);

  const handleViewRecord = (record: MedicalRecord) => {
    setSelectedRecord(record);
  };

  const handleCloseDetails = () => {
    setSelectedRecord(null);
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-6rem)]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Medical History</h2>
        <Button>Export Records</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Records</CardTitle>
          <CardDescription>Search through your medical records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search records..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={recordType} 
              onValueChange={setRecordType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="examination">Examinations</SelectItem>
                <SelectItem value="test">Tests</SelectItem>
                <SelectItem value="procedure">Procedures</SelectItem>
                <SelectItem value="note">Notes</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date-desc">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
                <SelectItem value="provider">Provider (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedRecord ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>{selectedRecord.title}</CardTitle>
              <CardDescription>
                {selectedRecord.date} | {selectedRecord.providerName} | {selectedRecord.type}
              </CardDescription>
            </div>
            <Button variant="ghost" onClick={handleCloseDetails}>Close</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Description</h3>
              <p>{selectedRecord.description}</p>
            </div>
            
            {selectedRecord.attachments && selectedRecord.attachments.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-medium">Attachments</h3>
                <ul className="list-disc list-inside">
                  {selectedRecord.attachments.map((attachment, index) => (
                    <li key={index}>{attachment}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex justify-between pt-4">
              <Button variant="outline">Download Record</Button>
              <Button variant="outline">Request Correction</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <MedicalRecordCard 
                  key={record.id} 
                  record={record} 
                  onView={handleViewRecord}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No medical records found matching your criteria.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MedicalHistory;
