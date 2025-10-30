import { API_URL, STORAGE_KEYS } from '../utils/constants';
import type { ApiError, ApiResponse } from '../types';

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  status: number;
  errors?: Record<string, string[]>;

  constructor(
    status: number,
    message: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Get auth token from localStorage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Base fetch wrapper with error handling and auth token injection
 */
export const apiFetch = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  // Build full URL
  const url = `${API_URL}${endpoint}`;

  // Get auth token
  const token = getAuthToken();

  // Build headers object
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Merge options
  const config: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...(options.headers as Record<string, string>),
    },
  };

  try {
    // Make the request
    const response = await fetch(url, config);

    // Parse JSON response
    const data: ApiResponse<T> | ApiError = await response.json();

    // Check if request was successful
    if (!response.ok) {
      // Handle 401 Unauthorized - auto logout
      if (response.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = '/login';
      }

      // Throw API error
      throw new APIError(
        response.status,
        data.message || 'An error occurred',
        'errors' in data ? data.errors : undefined
      );
    }

    // Return the data
    return (data as ApiResponse<T>).data as T;
  } catch (error) {
    // Re-throw API errors
    if (error instanceof APIError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError) {
      throw new APIError(0, 'Network error. Please check your connection.');
    }

    // Handle other errors
    throw new APIError(500, 'An unexpected error occurred');
  }
};

/**
 * HTTP GET request
 */
export const get = <T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return apiFetch<T>(endpoint, { ...options, method: 'GET' });
};

/**
 * HTTP POST request
 */
export const post = <T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: RequestInit
): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
};

/**
 * HTTP PUT request
 */
export const put = <T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: RequestInit
): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
};

/**
 * HTTP PATCH request
 */
export const patch = <T = unknown>(
  endpoint: string,
  body?: unknown,
  options?: RequestInit
): Promise<T> => {
  return apiFetch<T>(endpoint, {
    ...options,
    method: 'PATCH',
    body: body ? JSON.stringify(body) : undefined,
  });
};

/**
 * HTTP DELETE request
 */
export const del = <T = unknown>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  return apiFetch<T>(endpoint, { ...options, method: 'DELETE' });
};
