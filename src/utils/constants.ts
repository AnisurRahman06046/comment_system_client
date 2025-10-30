// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/users/me',
  },
  COMMENTS: {
    GET_ALL: '/comments',
    CREATE: '/comments',
    GET_BY_ID: (id: string) => `/comments/${id}`,
    UPDATE: (id: string) => `/comments/${id}`,
    DELETE: (id: string) => `/comments/${id}`,
    GET_REPLIES: (id: string) => `/comments/${id}/replies`,
    TOGGLE_REACTION: (id: string) => `/comments/${id}/reaction`,
  },
};

// Sort Types
export const SORT_TYPES = {
  NEWEST: 'newest',
  MOST_LIKED: 'mostLiked',
  MOST_DISLIKED: 'mostDisliked',
} as const;

// Reaction Types
export const REACTION_TYPES = {
  LIKE: 'like',
  DISLIKE: 'dislike',
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  COMMENT_NEW: 'comment:new',
  COMMENT_UPDATE: 'comment:update',
  COMMENT_DELETE: 'comment:delete',
  COMMENT_REACTION: 'comment:reaction',
  COMMENT_REPLY: 'comment:reply',
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
};
