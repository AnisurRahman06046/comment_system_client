import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import * as commentService from '../services/commentService';
import type { Comment, SortType, ReactionType } from '../types';
import { SORT_TYPES, DEFAULT_PAGE_SIZE, SOCKET_EVENTS } from '../utils/constants';
import { APIError } from '../services/api';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';

interface CommentContextType {
  // State
  comments: Comment[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  nextCursor: string | null;
  sortBy: SortType;

  // Actions
  fetchComments: (reset?: boolean) => Promise<void>;
  addComment: (content: string, parentCommentId?: string) => Promise<Comment | null>;
  editComment: (id: string, content: string) => Promise<Comment | null>;
  removeComment: (id: string) => Promise<boolean>;
  reactToComment: (id: string, type: ReactionType) => Promise<Comment | null>;
  setSortBy: (sortType: SortType) => void;
  loadMore: () => Promise<void>;
  reset: () => void;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

interface CommentProviderProps {
  children: ReactNode;
}

export const CommentProvider = ({ children }: CommentProviderProps) => {
  const { socket } = useSocket();
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [sortBy, setSortByState] = useState<SortType>(SORT_TYPES.NEWEST as SortType);

  // Socket event listeners for real-time updates
  useEffect(() => {
    if (!socket) return;

    // Named handler functions to prevent removal by other components
    const handleNewComment = ({ comment }: { comment: Comment }) => {
      // Don't add if it's from current user (already added optimistically)
      if (comment.author._id !== user?._id) {
        setComments((prev) => [comment, ...prev]);
      }
    };

    const handleUpdateComment = ({ comment }: { comment: Comment }) => {
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? comment : c))
      );
    };

    const handleDeleteComment = ({ commentId }: { commentId: string }) => {
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    };

    const handleReactionComment = ({ comment }: { comment: Comment }) => {
      setComments((prev) =>
        prev.map((c) => (c._id === comment._id ? comment : c))
      );
    };

    // Register listeners with named functions
    socket.on(SOCKET_EVENTS.COMMENT_NEW, handleNewComment);
    socket.on(SOCKET_EVENTS.COMMENT_UPDATE, handleUpdateComment);
    socket.on(SOCKET_EVENTS.COMMENT_DELETE, handleDeleteComment);
    socket.on(SOCKET_EVENTS.COMMENT_REACTION, handleReactionComment);

    // Cleanup - remove ONLY our specific handlers
    return () => {
      socket.off(SOCKET_EVENTS.COMMENT_NEW, handleNewComment);
      socket.off(SOCKET_EVENTS.COMMENT_UPDATE, handleUpdateComment);
      socket.off(SOCKET_EVENTS.COMMENT_DELETE, handleDeleteComment);
      socket.off(SOCKET_EVENTS.COMMENT_REACTION, handleReactionComment);
    };
  }, [socket, user]);

  /**
   * Fetch comments with pagination and sorting
   */
  const fetchComments = async (reset: boolean = false) => {
    setLoading(true);
    setError(null);

    try {
      const cursor = reset ? undefined : nextCursor || undefined;
      const result = await commentService.getComments(cursor, DEFAULT_PAGE_SIZE, sortBy);

      if (reset) {
        setComments(result.data);
      } else {
        setComments((prev) => [...prev, ...result.data]);
      }

      setNextCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to fetch comments';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a new comment
   */
  const addComment = async (content: string, parentCommentId?: string): Promise<Comment | null> => {
    setError(null);

    try {
      const newComment = await commentService.createComment({
        content,
        parentCommentId,
      });

      // Add to the beginning of comments list if it's a top-level comment
      if (!parentCommentId) {
        setComments((prev) => [newComment, ...prev]);
      }

      return newComment;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to create comment';
      setError(errorMessage);
      return null;
    }
  };

  /**
   * Update a comment
   */
  const editComment = async (id: string, content: string): Promise<Comment | null> => {
    setError(null);

    try {
      const updatedComment = await commentService.updateComment(id, { content });

      // Update comment in the list
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      );

      return updatedComment;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to update comment';
      setError(errorMessage);
      return null;
    }
  };

  /**
   * Delete a comment
   */
  const removeComment = async (id: string): Promise<boolean> => {
    setError(null);

    try {
      await commentService.deleteComment(id);

      // Remove comment from the list
      setComments((prev) => prev.filter((comment) => comment._id !== id));

      return true;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to delete comment';
      setError(errorMessage);
      return false;
    }
  };

  /**
   * Toggle reaction (like/dislike) on a comment
   */
  const reactToComment = async (id: string, type: ReactionType): Promise<Comment | null> => {
    setError(null);

    try {
      const updatedComment = await commentService.toggleReaction(id, type);

      // Update comment in the list
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? updatedComment : comment
        )
      );

      return updatedComment;
    } catch (err) {
      const errorMessage = err instanceof APIError ? err.message : 'Failed to toggle reaction';
      setError(errorMessage);
      return null;
    }
  };

  /**
   * Change sort type and refetch comments
   */
  const setSortBy = (sortType: SortType) => {
    setSortByState(sortType);
    setComments([]);
    setNextCursor(null);
    setHasMore(true);

    // Fetch comments with new sort type
    // We'll call fetchComments manually after changing sort
  };

  /**
   * Load more comments (pagination)
   */
  const loadMore = async () => {
    if (!hasMore || loading) return;
    await fetchComments(false);
  };

  /**
   * Reset state
   */
  const reset = () => {
    setComments([]);
    setLoading(false);
    setError(null);
    setHasMore(true);
    setNextCursor(null);
    setSortByState(SORT_TYPES.NEWEST as SortType);
  };

  const value: CommentContextType = {
    comments,
    loading,
    error,
    hasMore,
    nextCursor,
    sortBy,
    fetchComments,
    addComment,
    editComment,
    removeComment,
    reactToComment,
    setSortBy,
    loadMore,
    reset,
  };

  return (
    <CommentContext.Provider value={value}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
