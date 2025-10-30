// User Types
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Comment Types
export interface Comment {
  _id: string;
  content: string;
  author: User;
  likesCount: number;
  dislikesCount: number;
  userReaction?: ReactionType | null;
  parentComment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentData {
  content: string;
  parentCommentId?: string;
}

export interface UpdateCommentData {
  content: string;
}

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    data: Comment[];
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export interface CommentResponse {
  success: boolean;
  message: string;
  data: Comment;
}

// Reaction Types
export type ReactionType = 'like' | 'dislike';

export interface ToggleReactionData {
  type: ReactionType;
}

// Sort Types
export type SortType = 'newest' | 'mostLiked' | 'mostDisliked';

// API Error
export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// Generic API Response
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}
