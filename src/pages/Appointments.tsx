
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { mockAppointments, mockPatients, mockProviders } from '@/lib/mockData';
import { Appointment, Patient, User } from '@/types';
import AppointmentCard from '@/components/AppointmentCard';
import { Calendar, CalendarIcon, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Appointments = () => {
  const [user, setUser] = useState<User | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const { toast } = useToast();
  
  const isProvider = user?.role === 'provider';

  useEffect(() => {
    // Simulate fetching user data
    const userRole = localStorage.getItem('userRole') || 'patient';
    
    // For demo purposes, use mock data
    if (userRole === 'patient') {
      setUser(mockPatients[0]);
      
      // Filter appointments for this patient
      const patientAppointments = mockAppointments.filter(appointment => 
        appointment.patientId === mockPatients[0].id
      );
      
      setAppointments(patientAppointments);
      setFilteredAppointments(patientAppointments);
    } else {
      setUser(mockProviders[0]);
      
      // Filter appointments for this provider
      const providerAppointments = mockAppointments.filter(appointment => 
        appointment.providerId === mockProviders[0].id
      );
      
      setAppointments(providerAppointments);
      setFilteredAppointments(providerAppointments);
    }
  }, []);

  // Filter appointments based on search and status
  useEffect(() => {
    let filtered = appointments;
    
    // Filter by status
    if (status !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === status);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(appointment => {
        const searchText = isProvider 
          ? appointment.patientName.toLowerCase()
          : appointment.providerName.toLowerCase();
        
        return searchText.includes(term) || 
               appointment.type.toLowerCase().includes(term) ||
               appointment.reason.toLowerCase().includes(term);
      });
    }
    
    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, status, isProvider]);

  const handleCancelAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setCancelDialogOpen(true);
  };
  
  const confirmCancelAppointment = () => {
    if (selectedAppointment) {
      // In a real app, this would make an API call to cancel the appointment
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, status: 'cancelled' }
          : appointment
      );
      
      setAppointments(updatedAppointments);
      setCancelDialogOpen(false);
      
      toast({
        title: "Appointment Cancelled",
        description: `Your appointment on ${selectedAppointment.date} has been cancelled.`,
      });
    }
  };
  
  const handleRescheduleAppointment = (appointment: Appointment) => {
    toast({
      title: "Reschedule Request Initiated",
      description: "Please select a new date and time for your appointment.",
    });
  };

  if (!user) {
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
        <h2 className="text-3xl font-bold tracking-tight">Appointments</h2>
        <Button>
          {isProvider ? "Create Appointment" : "Schedule New Appointment"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Appointments</CardTitle>
          <CardDescription>Search and filter your appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={isProvider ? "Search patients..." : "Search providers..."}
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="no-show">No Show</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="date-asc">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-asc">Upcoming First</SelectItem>
                <SelectItem value="date-desc">Past First</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map(appointment => (
            <AppointmentCard 
              key={appointment.id} 
              appointment={appointment} 
              isProvider={isProvider}
              onCancel={handleCancelAppointment}
              onReschedule={handleRescheduleAppointment}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">No appointments found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Cancel Appointment Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Appointment</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="py-4">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{selectedAppointment.date} at {selectedAppointment.time}</span>
              </div>
              <div>
                <p><span className="font-medium">Type:</span> {selectedAppointment.type}</p>
                <p><span className="font-medium">With:</span> {isProvider ? selectedAppointment.patientName : selectedAppointment.providerName}</p>
                <p><span className="font-medium">Reason:</span> {selectedAppointment.reason}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Appointment
            </Button>
            <Button variant="destructive" onClick={confirmCancelAppointment}>
              Yes, Cancel Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;
