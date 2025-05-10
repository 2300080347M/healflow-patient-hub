
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockPatients, mockProviders, mockAppointments, mockMedicalRecords, mockPrescriptions, mockMessages } from '@/lib/mockData';
import { Appointment, MedicalRecord, Message, Patient, Prescription, User } from '@/types';
import { formatDate } from '@/lib/utils';
import MedicalRecordCard from '@/components/MedicalRecordCard';
import PrescriptionCard from '@/components/PrescriptionCard';
import AppointmentCard from '@/components/AppointmentCard';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [recentRecords, setRecentRecords] = useState<MedicalRecord[]>([]);
  const [activePrescriptions, setActivePrescriptions] = useState<Prescription[]>([]);
  const [unreadMessages, setUnreadMessages] = useState<Message[]>([]);
  
  useEffect(() => {
    // Simulate fetching user data
    const userRole = localStorage.getItem('userRole') || 'patient';
    
    // For demo purposes, use mock data
    if (userRole === 'patient') {
      setUser(mockPatients[0]);
      
      // Get patient-specific data
      setRecentAppointments(
        mockAppointments.filter(a => a.patientId === mockPatients[0].id)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3)
      );
      
      setRecentRecords(
        mockMedicalRecords.filter(r => r.patientId === mockPatients[0].id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
      );
      
      setActivePrescriptions(
        mockPrescriptions.filter(p => p.patientId === mockPatients[0].id && p.status === 'active')
      );
      
      setUnreadMessages(
        mockMessages.filter(m => m.recipientId === mockPatients[0].id && !m.read)
      );
    } else {
      setUser(mockProviders[0]);
      
      // Get provider-specific data
      setRecentAppointments(
        mockAppointments.filter(a => a.providerId === mockProviders[0].id)
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .slice(0, 3)
      );
      
      setRecentRecords(
        mockMedicalRecords.filter(r => r.providerId === mockProviders[0].id)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
      );
    }
  }, []);
  
  const isProvider = user?.role === 'provider';

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
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="text-sm text-muted-foreground">
          {formatDate(new Date().toISOString())}
        </div>
      </div>
      
      {/* Welcome Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Welcome, {user.name}</CardTitle>
          <CardDescription>
            {isProvider 
              ? "Manage your patients and appointments efficiently"
              : "Track your health information and stay connected with your healthcare providers"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stats Cards */}
            <DashboardStat 
              title="Upcoming Appointments" 
              value={recentAppointments.filter(a => a.status === 'scheduled').length.toString()} 
              description="Scheduled sessions" 
              linkTo="/appointments"
            />
            
            {isProvider ? (
              <DashboardStat 
                title="Active Patients" 
                value="24" 
                description="Under your care" 
                linkTo="/patients"
              />
            ) : (
              <DashboardStat 
                title="Active Prescriptions" 
                value={activePrescriptions.length.toString()} 
                description="Current medications" 
                linkTo="/prescriptions"
              />
            )}
            
            <DashboardStat 
              title="Messages" 
              value={unreadMessages.length.toString()} 
              description="Unread messages" 
              linkTo="/messages"
            />
            
            <DashboardStat 
              title="Medical Records" 
              value={recentRecords.length.toString()} 
              description="Recent updates" 
              linkTo="/medical-history"
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/appointments">View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recentAppointments.length > 0 ? (
                recentAppointments.map(appointment => (
                  <AppointmentCard 
                    key={appointment.id} 
                    appointment={appointment} 
                    isProvider={isProvider}
                  />
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No upcoming appointments.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to={isProvider ? "/appointments" : "/appointments"}>
                {isProvider ? "Manage Appointments" : "Schedule Appointment"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Medical Records or Active Prescriptions */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl">
              {isProvider ? "Recent Patient Records" : "Active Prescriptions"}
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to={isProvider ? "/recent-records" : "/prescriptions"}>View all</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {isProvider ? (
                recentRecords.length > 0 ? (
                  recentRecords.map(record => (
                    <MedicalRecordCard key={record.id} record={record} />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-6">No recent records.</p>
                )
              ) : (
                activePrescriptions.length > 0 ? (
                  activePrescriptions.map(prescription => (
                    <PrescriptionCard key={prescription.id} prescription={prescription} />
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-6">No active prescriptions.</p>
                )
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link to={isProvider ? "/recent-records" : "/prescriptions"}>
                {isProvider ? "Create New Record" : "Manage Prescriptions"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

interface DashboardStatProps {
  title: string;
  value: string;
  description: string;
  linkTo: string;
}

const DashboardStat: React.FC<DashboardStatProps> = ({
  title, value, description, linkTo
}) => (
  <Card className="bg-muted/50">
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" size="sm" className="w-full" asChild>
        <Link to={linkTo}>View details</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default Dashboard;
