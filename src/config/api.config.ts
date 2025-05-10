
// API base URL - change this to your Spring Boot server URL
export const API_BASE_URL = 'http://localhost:8080/api';

// API endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  // User endpoints
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
  },
  // Patient endpoints
  PATIENTS: {
    GET_ALL: '/patients',
    GET_BY_ID: (id: string) => `/patients/${id}`,
    MEDICAL_RECORDS: (id: string) => `/patients/${id}/medical-records`,
  },
  // Provider endpoints
  PROVIDERS: {
    GET_ALL: '/providers',
    GET_BY_ID: (id: string) => `/providers/${id}`,
  },
  // Medical records endpoints
  MEDICAL_RECORDS: {
    GET_ALL: '/medical-records',
    GET_BY_ID: (id: string) => `/medical-records/${id}`,
    CREATE: '/medical-records',
    UPDATE: (id: string) => `/medical-records/${id}`,
  },
  // Appointment endpoints
  APPOINTMENTS: {
    GET_ALL: '/appointments',
    GET_BY_ID: (id: string) => `/appointments/${id}`,
    CREATE: '/appointments',
    UPDATE: (id: string) => `/appointments/${id}`,
    CANCEL: (id: string) => `/appointments/${id}/cancel`,
  },
  // Prescription endpoints
  PRESCRIPTIONS: {
    GET_ALL: '/prescriptions',
    GET_BY_ID: (id: string) => `/prescriptions/${id}`,
    CREATE: '/prescriptions',
    UPDATE: (id: string) => `/prescriptions/${id}`,
    RENEW: (id: string) => `/prescriptions/${id}/renew`,
  },
  // Message endpoints
  MESSAGES: {
    GET_ALL: '/messages',
    GET_BY_ID: (id: string) => `/messages/${id}`,
    SEND: '/messages',
    MARK_AS_READ: (id: string) => `/messages/${id}/read`,
  },
};
