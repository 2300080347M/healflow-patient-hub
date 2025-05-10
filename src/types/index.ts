
// User types
export type UserRole = 'patient' | 'provider' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profileImage?: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: string;
  address: string;
  phone: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
}

export interface Provider extends User {
  role: 'provider';
  specialty: string;
  licenseNumber: string;
  department: string;
}

// Medical record types
export interface MedicalRecord {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  date: string;
  type: 'examination' | 'test' | 'procedure' | 'note';
  title: string;
  description: string;
  attachments?: string[];
  confidential: boolean;
}

// Prescription types
export interface Prescription {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  medication: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  refills: number;
  status: 'active' | 'completed' | 'cancelled';
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  patientName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'checkup' | 'follow-up' | 'consultation' | 'procedure' | 'test';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason: string;
  notes?: string;
}

// Message types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  timestamp: string;
  subject: string;
  content: string;
  read: boolean;
  urgent: boolean;
}
