import { post, get } from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants';
import type { LoginCredentials, RegisterData, User } from '../types';

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
}

/**
 * Login user
 */
export const login = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // Step 1: Login and get token
  const loginData = await post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, credentials);

  // Store token temporarily
  localStorage.setItem(STORAGE_KEYS.TOKEN, loginData.token);

  // Step 2: Fetch user data using the token
  const user = await get<User>(API_ENDPOINTS.AUTH.ME);

  // Store user in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return { user, token: loginData.token };
};

/**
 * Register new user
 */
export const register = async (userData: RegisterData): Promise<{ user: User; token: string }> => {
  // Step 1: Register user (returns user data, no token)
  const registerData = await post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, userData);

  // Step 2: Login to get token
  const loginData = await post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, {
    email: userData.email,
    password: userData.password,
  });

  // Store token
  localStorage.setItem(STORAGE_KEYS.TOKEN, loginData.token);

  // Step 3: Construct user object
  const user: User = {
    _id: registerData._id,
    email: registerData.email,
    firstName: registerData.firstName,
    lastName: registerData.lastName,
  };

  // Store user in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

  return { user, token: loginData.token };
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
