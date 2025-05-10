
import { 
  Patient, 
  Provider, 
  MedicalRecord, 
  Prescription, 
  Appointment, 
  Message 
} from '../types';

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: "p1",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "patient",
    dateOfBirth: "1985-04-12",
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    profileImage: "/placeholder.svg",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Spouse",
      phone: "(555) 987-6543"
    },
    insuranceInfo: {
      provider: "HealthPlus Insurance",
      policyNumber: "HP-12345678",
      groupNumber: "G-87654"
    }
  },
  {
    id: "p2",
    email: "sarah.smith@example.com",
    name: "Sarah Smith",
    role: "patient",
    dateOfBirth: "1990-08-23",
    gender: "Female",
    address: "456 Oak Ave, Somecity, USA",
    phone: "(555) 234-5678",
    emergencyContact: {
      name: "Michael Smith",
      relation: "Brother",
      phone: "(555) 876-5432"
    },
    insuranceInfo: {
      provider: "MediCare Plus",
      policyNumber: "MCP-23456789",
      groupNumber: "G-98765"
    }
  }
];

// Mock Providers
export const mockProviders: Provider[] = [
  {
    id: "dr1",
    email: "dr.johnson@healthsystem.com",
    name: "Dr. Emily Johnson",
    role: "provider",
    specialty: "Family Medicine",
    licenseNumber: "FM12345",
    department: "Family Practice",
    profileImage: "/placeholder.svg"
  },
  {
    id: "dr2",
    email: "dr.patel@healthsystem.com",
    name: "Dr. Raj Patel",
    role: "provider",
    specialty: "Cardiology",
    licenseNumber: "CR67890",
    department: "Cardiovascular Health",
    profileImage: "/placeholder.svg"
  }
];

// Mock Combined Users
export const mockUsers = [...mockPatients, ...mockProviders];

// Mock Medical Records
export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "mr1",
    patientId: "p1",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    date: "2023-06-15",
    type: "examination",
    title: "Annual Physical",
    description: "Patient is in good health. Blood pressure 120/80. Heart rate 72 BPM. Recommended continued exercise and healthy diet.",
    confidential: false
  },
  {
    id: "mr2",
    patientId: "p1",
    providerId: "dr2",
    providerName: "Dr. Raj Patel",
    date: "2023-08-22",
    type: "test",
    title: "EKG Test Results",
    description: "EKG shows normal sinus rhythm. No abnormalities detected.",
    confidential: false
  },
  {
    id: "mr3",
    patientId: "p2",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    date: "2023-07-10",
    type: "examination",
    title: "Follow-up Visit",
    description: "Patient reports allergies have improved with prescribed medication. Continuing current treatment plan.",
    confidential: false
  }
];

// Mock Prescriptions
export const mockPrescriptions: Prescription[] = [
  {
    id: "rx1",
    patientId: "p1",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2023-06-15",
    endDate: "2023-12-15",
    instructions: "Take in the morning with food",
    refills: 5,
    status: "active"
  },
  {
    id: "rx2",
    patientId: "p2",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    medication: "Cetirizine",
    dosage: "10mg",
    frequency: "Once daily",
    startDate: "2023-07-10",
    endDate: "2023-10-10",
    instructions: "Take as needed for allergies",
    refills: 2,
    status: "active"
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: "a1",
    patientId: "p1",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    patientName: "John Doe",
    date: "2023-09-30",
    time: "10:00",
    duration: 30,
    type: "checkup",
    status: "scheduled",
    reason: "Annual physical examination"
  },
  {
    id: "a2",
    patientId: "p2",
    providerId: "dr1",
    providerName: "Dr. Emily Johnson",
    patientName: "Sarah Smith",
    date: "2023-09-28",
    time: "14:30",
    duration: 30,
    type: "follow-up",
    status: "scheduled",
    reason: "Follow-up on allergy treatment"
  },
  {
    id: "a3",
    patientId: "p1",
    providerId: "dr2",
    providerName: "Dr. Raj Patel",
    patientName: "John Doe",
    date: "2023-10-05",
    time: "11:15",
    duration: 45,
    type: "consultation",
    status: "scheduled",
    reason: "Cardiovascular consultation"
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "m1",
    senderId: "dr1",
    senderName: "Dr. Emily Johnson",
    recipientId: "p1",
    recipientName: "John Doe",
    timestamp: "2023-09-20T14:30:00",
    subject: "Your recent test results",
    content: "Hi John, I've reviewed your recent blood work and everything looks normal. Keep up the good work with your diet and exercise regimen.",
    read: true,
    urgent: false
  },
  {
    id: "m2",
    senderId: "p1",
    senderName: "John Doe",
    recipientId: "dr1",
    recipientName: "Dr. Emily Johnson",
    timestamp: "2023-09-21T09:15:00",
    subject: "Question about medication",
    content: "Dr. Johnson, I've been experiencing some mild side effects from the new medication. Should I continue taking it or schedule an appointment?",
    read: true,
    urgent: false
  },
  {
    id: "m3",
    senderId: "dr2",
    senderName: "Dr. Raj Patel",
    recipientId: "p1",
    recipientName: "John Doe",
    timestamp: "2023-09-22T16:45:00",
    subject: "Upcoming cardiology appointment",
    content: "Hello John, Just a reminder about your upcoming appointment on October 5th. Please remember to bring your list of current medications.",
    read: false,
    urgent: false
  }
];
