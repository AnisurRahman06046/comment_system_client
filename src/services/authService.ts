import { post, get } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import type { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<AuthResponse['data']> => {
  const data = await post<AuthResponse['data']>(API_ENDPOINTS.AUTH.LOGIN, credentials);

  // Store token and user in localStorage
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

  return data;
};

/**
 * Register new user
 */
export const register = async (userData: RegisterData): Promise<AuthResponse['data']> => {
  const data = await post<AuthResponse['data']>(API_ENDPOINTS.AUTH.REGISTER, userData);

  // Store token and user in localStorage
  localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

  return data;
};

/**
 * Logout user
 */
export const logout = (): void => {
  // Remove token and user from localStorage
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);

  // Redirect to login page
  window.location.href = '/login';
};

/**
 * Get current user from localStorage
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);

  if (!userStr) {
    return null;
  }

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

/**
 * Get current user token
 */
export const getToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * Fetch current user profile from API
 */
export const fetchCurrentUser = async (): Promise<User> => {
  const user = await get<User>(API_ENDPOINTS.AUTH.ME);

  // Update user in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return user;
};
