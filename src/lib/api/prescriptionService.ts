
import httpClient from './httpClient';
import { API_ENDPOINTS } from '@/config/api.config';
import { Prescription } from '@/types';

export const prescriptionService = {
  getAllPrescriptions: async (): Promise<Prescription[]> => {
    return await httpClient.get<Prescription[]>(API_ENDPOINTS.PRESCRIPTIONS.GET_ALL);
  },

  getPrescriptionById: async (id: string): Promise<Prescription> => {
    return await httpClient.get<Prescription>(API_ENDPOINTS.PRESCRIPTIONS.GET_BY_ID(id));
  },

  createPrescription: async (prescription: Omit<Prescription, 'id'>): Promise<Prescription> => {
    return await httpClient.post<Prescription>(
      API_ENDPOINTS.PRESCRIPTIONS.CREATE,
      prescription
    );
  },

  updatePrescription: async (id: string, prescription: Partial<Prescription>): Promise<Prescription> => {
    return await httpClient.put<Prescription>(
      API_ENDPOINTS.PRESCRIPTIONS.UPDATE(id),
      prescription
    );
  },

  renewPrescription: async (id: string): Promise<Prescription> => {
    return await httpClient.post<Prescription>(
      API_ENDPOINTS.PRESCRIPTIONS.RENEW(id),
      {}
    );
  }
};
