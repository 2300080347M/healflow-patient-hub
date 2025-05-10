
import httpClient from './httpClient';
import { API_ENDPOINTS } from '@/config/api.config';
import { Appointment } from '@/types';

export const appointmentService = {
  getAllAppointments: async (): Promise<Appointment[]> => {
    return await httpClient.get<Appointment[]>(API_ENDPOINTS.APPOINTMENTS.GET_ALL);
  },

  getAppointmentById: async (id: string): Promise<Appointment> => {
    return await httpClient.get<Appointment>(API_ENDPOINTS.APPOINTMENTS.GET_BY_ID(id));
  },

  createAppointment: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    return await httpClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENTS.CREATE,
      appointment
    );
  },

  updateAppointment: async (id: string, appointment: Partial<Appointment>): Promise<Appointment> => {
    return await httpClient.put<Appointment>(
      API_ENDPOINTS.APPOINTMENTS.UPDATE(id),
      appointment
    );
  },

  cancelAppointment: async (id: string): Promise<Appointment> => {
    return await httpClient.post<Appointment>(
      API_ENDPOINTS.APPOINTMENTS.CANCEL(id),
      {}
    );
  }
};
