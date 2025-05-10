
import httpClient from './httpClient';
import { API_ENDPOINTS } from '@/config/api.config';
import { User } from '@/types';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  role: 'patient' | 'provider';
}

interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Store the token for future requests
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', response.user.role);
    
    return response;
  },

  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    // Store the token for future requests
    localStorage.setItem('authToken', response.token);
    localStorage.setItem('userRole', response.user.role);
    
    return response;
  },

  logout: async (): Promise<void> => {
    // Call logout endpoint if your backend requires it
    try {
      await httpClient.post<void>(API_ENDPOINTS.AUTH.LOGOUT, {});
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      return await httpClient.get<User>(API_ENDPOINTS.USERS.PROFILE);
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }
};
