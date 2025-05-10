
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
import { mockPrescriptions, mockPatients } from '@/lib/mockData';
import { Patient, Prescription } from '@/types';
import PrescriptionCard from '@/components/PrescriptionCard';
import { Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Prescriptions = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<Prescription[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch the patient data and prescriptions from an API
    // For demo purposes, we're using the first mock patient
    setPatient(mockPatients[0]);
    
    // Filter prescriptions for this patient
    const patientPrescriptions = mockPrescriptions.filter(prescription => 
      prescription.patientId === mockPatients[0].id
    );
    
    setPrescriptions(patientPrescriptions);
    setFilteredPrescriptions(patientPrescriptions);
  }, []);

  // Filter prescriptions based on search and status
  useEffect(() => {
    let filtered = prescriptions;
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(prescription => prescription.status === status);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(prescription => 
        prescription.medication.toLowerCase().includes(term) || 
        prescription.providerName.toLowerCase().includes(term)
      );
    }
    
    setFilteredPrescriptions(filtered);
  }, [prescriptions, searchTerm, status]);

  const handleRenewPrescription = (prescription: Prescription) => {
    toast({
      title: "Renewal Request Sent",
      description: `Your renewal request for ${prescription.medication} has been sent to Dr. ${prescription.providerName}.`,
    });
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
        <h2 className="text-3xl font-bold tracking-tight">Prescriptions</h2>
        <Button>Medication History</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Prescriptions</CardTitle>
          <CardDescription>Search through your prescriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search prescriptions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select 
              value={status} 
              onValueChange={setStatus}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date-desc">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="medication">Medication (A-Z)</SelectItem>
                <SelectItem value="provider">Provider (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map(prescription => (
            <PrescriptionCard 
              key={prescription.id} 
              prescription={prescription} 
              onRenew={handleRenewPrescription}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No prescriptions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prescriptions;
