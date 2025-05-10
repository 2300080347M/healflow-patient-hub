
import httpClient from './httpClient';
import { API_ENDPOINTS } from '@/config/api.config';
import { MedicalRecord } from '@/types';

export const medicalRecordService = {
  getAllRecords: async (): Promise<MedicalRecord[]> => {
    return await httpClient.get<MedicalRecord[]>(API_ENDPOINTS.MEDICAL_RECORDS.GET_ALL);
  },

  getRecordById: async (id: string): Promise<MedicalRecord> => {
    return await httpClient.get<MedicalRecord>(API_ENDPOINTS.MEDICAL_RECORDS.GET_BY_ID(id));
  },

  getPatientRecords: async (patientId: string): Promise<MedicalRecord[]> => {
    return await httpClient.get<MedicalRecord[]>(
      API_ENDPOINTS.PATIENTS.MEDICAL_RECORDS(patientId)
    );
  },

  createRecord: async (record: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> => {
    return await httpClient.post<MedicalRecord>(
      API_ENDPOINTS.MEDICAL_RECORDS.CREATE,
      record
    );
  },

  updateRecord: async (id: string, record: Partial<MedicalRecord>): Promise<MedicalRecord> => {
    return await httpClient.put<MedicalRecord>(
      API_ENDPOINTS.MEDICAL_RECORDS.UPDATE(id),
      record
    );
  }
};
