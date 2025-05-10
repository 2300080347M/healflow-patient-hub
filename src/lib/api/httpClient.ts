
import { API_BASE_URL } from '@/config/api.config';
import { toast } from 'sonner';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: any;
}

class HttpClient {
  private getAuthHeaders(): Record<string, string> {
    // Get the auth token from localStorage or wherever you store it
    const token = localStorage.getItem('authToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(
    method: HttpMethod,
    path: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = new URL(`${API_BASE_URL}${path}`);
    
    // Add query params if provided
    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeaders(),
      ...options.headers,
    };

    try {
      const response = await fetch(url.toString(), {
        method,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
      });

      // Parse the JSON response
      const data = await response.json();

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      return data as T;
    } catch (error) {
      console.error(`API ${method} request failed:`, error);
      toast.error(`Request failed: ${(error as Error).message}`);
      throw error;
    }
  }

  public get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', path, options);
  }

  public post<T>(path: string, body: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', path, { ...options, body });
  }

  public put<T>(path: string, body: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', path, { ...options, body });
  }

  public delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', path, options);
  }

  public patch<T>(path: string, body: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', path, { ...options, body });
  }
}

export default new HttpClient();
