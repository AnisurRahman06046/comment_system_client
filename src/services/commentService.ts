import { get, post, patch, del } from './api';
import { API_ENDPOINTS } from '../utils/constants';
import type {
  Comment,
  CommentsResponse,
  CreateCommentData,
  UpdateCommentData,
  ToggleReactionData,
  SortType,
} from '../types';

/**
 * Fetch comments with pagination and sorting
 */
export const getComments = async (
  cursor?: string,
  limit: number = 10,
  sortBy?: SortType
): Promise<CommentsResponse['data']> => {
  // Build query string
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  params.append('limit', limit.toString());
  if (sortBy) params.append('sortBy', sortBy);

  const queryString = params.toString();
  const endpoint = `${API_ENDPOINTS.COMMENTS.GET_ALL}${queryString ? `?${queryString}` : ''}`;

  return await get<CommentsResponse['data']>(endpoint);
};

/**
 * Get a single comment by ID
 */
export const getCommentById = async (id: string): Promise<Comment> => {
  return await get<Comment>(API_ENDPOINTS.COMMENTS.GET_BY_ID(id));
};

/**
 * Create a new comment
 */
export const createComment = async (data: CreateCommentData): Promise<Comment> => {
  return await post<Comment>(API_ENDPOINTS.COMMENTS.CREATE, data);
};

/**
 * Update a comment
 */
export const updateComment = async (
  id: string,
  data: UpdateCommentData
): Promise<Comment> => {
  return await patch<Comment>(API_ENDPOINTS.COMMENTS.UPDATE(id), data);
};

/**
 * Delete a comment
 */
export const deleteComment = async (id: string): Promise<void> => {
  await del<void>(API_ENDPOINTS.COMMENTS.DELETE(id));
};

/**
 * Get replies for a comment
 */
export const getReplies = async (
  commentId: string,
  cursor?: string,
  limit: number = 10
): Promise<CommentsResponse['data']> => {
  // Build query string
  const params = new URLSearchParams();
  if (cursor) params.append('cursor', cursor);
  params.append('limit', limit.toString());

  const queryString = params.toString();
  const endpoint = `${API_ENDPOINTS.COMMENTS.GET_REPLIES(commentId)}${queryString ? `?${queryString}` : ''}`;

  return await get<CommentsResponse['data']>(endpoint);
};

/**
 * Toggle reaction (like/dislike) on a comment
 */
export const toggleReaction = async (
  commentId: string,
  type: ToggleReactionData['type']
): Promise<Comment> => {
  return await post<Comment>(
    API_ENDPOINTS.COMMENTS.TOGGLE_REACTION(commentId),
    { type }
  );
};
