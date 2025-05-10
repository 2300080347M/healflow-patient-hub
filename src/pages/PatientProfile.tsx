
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockPatients } from '@/lib/mockData';
import { Patient } from '@/types';
import { calculateAge, formatDate, getInitials } from '@/lib/utils';

const PatientProfile = () => {
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // In a real app, we would fetch the patient data from an API
    // For demo purposes, we're using the first mock patient
    setPatient(mockPatients[0]);
  }, []);

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
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button>Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Summary Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={patient.profileImage} alt={patient.name} />
              <AvatarFallback className="text-xl">{getInitials(patient.name)}</AvatarFallback>
            </Avatar>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>
              {calculateAge(patient.dateOfBirth)} years old • {patient.gender}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
              <div className="font-medium">Email:</div>
              <div>{patient.email}</div>
              
              <div className="font-medium">Phone:</div>
              <div>{patient.phone}</div>
              
              <div className="font-medium">Address:</div>
              <div>{patient.address}</div>
              
              <div className="font-medium">Date of Birth:</div>
              <div>{formatDate(patient.dateOfBirth)}</div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Update Contact Info</Button>
          </CardFooter>
        </Card>

        {/* Patient Detail Tabs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Health Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="insurance">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="insurance">Insurance</TabsTrigger>
                <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="insurance">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                    <div className="font-medium">Insurance Provider:</div>
                    <div>{patient.insuranceInfo.provider}</div>
                    
                    <div className="font-medium">Policy Number:</div>
                    <div>{patient.insuranceInfo.policyNumber}</div>
                    
                    <div className="font-medium">Group Number:</div>
                    <div>{patient.insuranceInfo.groupNumber}</div>
                  </div>
                  <Button variant="outline">Update Insurance Information</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="emergency">
                <div className="grid gap-4">
                  <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
                    <div className="font-medium">Name:</div>
                    <div>{patient.emergencyContact.name}</div>
                    
                    <div className="font-medium">Relation:</div>
                    <div>{patient.emergencyContact.relation}</div>
                    
                    <div className="font-medium">Phone:</div>
                    <div>{patient.emergencyContact.phone}</div>
                  </div>
                  <Button variant="outline">Update Emergency Contact</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="preferences">
                <div className="grid gap-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive emails about appointments, results, and messages</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Enabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive text messages for appointment reminders</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Disabled</Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Data Sharing</p>
                        <p className="text-sm text-muted-foreground">Allow sharing of medical data with research institutions</p>
                      </div>
                      <div>
                        <Button variant="outline" size="sm">Disabled</Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Update Preferences</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Access Controls */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>
              Manage who has access to your medical records and secure your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Provider Access</h3>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Dr. Emily Johnson</p>
                    <p className="text-sm text-muted-foreground">Family Medicine</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Granted</Button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">Dr. Raj Patel</p>
                    <p className="text-sm text-muted-foreground">Cardiology</p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Granted</Button>
                  </div>
                </div>
                <Button variant="outline">Manage Provider Access</Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Account Security</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Password</p>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Two-Factor Authentication</p>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Login History</p>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
                <Button variant="destructive">Download My Data</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;
