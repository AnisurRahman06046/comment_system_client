import { useState, useEffect } from 'react';
import { useComments } from '../../hooks/useComments';
import * as commentService from '../../services/commentService';
import type { Comment } from '../../types';
import CommentItem from './CommentItem';

interface RepliesListProps {
  parentCommentId: string;
  replyCount?: number;
}

const RepliesList = ({ parentCommentId }: RepliesListProps) => {
  const { editComment, removeComment, reactToComment } = useComments();
  const [replies, setReplies] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [cursor, setCursor] = useState<string | null>(null);
  const [showReplies, setShowReplies] = useState(false);

  const fetchReplies = async (reset: boolean = false) => {
    setLoading(true);
    try {
      const result = await commentService.getReplies(
        parentCommentId,
        reset ? undefined : cursor || undefined,
        10
      );

      if (reset) {
        setReplies(result.data);
      } else {
        setReplies((prev) => [...prev, ...result.data]);
      }

      setCursor(result.nextCursor);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Failed to fetch replies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showReplies && replies.length === 0) {
      fetchReplies(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showReplies]);

  const handleToggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleLoadMoreReplies = () => {
    fetchReplies(false);
  };

  const handleEditReply = async (id: string, content: string) => {
    const updated = await editComment(id, content);
    if (updated) {
      setReplies((prev) =>
        prev.map((reply) => (reply._id === id ? updated : reply))
      );
    }
  };

  const handleDeleteReply = async (id: string) => {
    const success = await removeComment(id);
    if (success) {
      setReplies((prev) => prev.filter((reply) => reply._id !== id));
    }
  };

  const handleReactToReply = async (id: string, type: 'like' | 'dislike') => {
    const updated = await reactToComment(id, type);
    if (updated) {
      setReplies((prev) =>
        prev.map((reply) => (reply._id === id ? updated : reply))
      );
    }
  };

  return (
    <div className="ml-12 mt-3 border-l-2 border-blue-100 pl-4">
      {/* Toggle Replies Button */}
      <button
        onClick={handleToggleReplies}
        className="text-sm text-blue-600 hover:text-blue-700 font-medium mb-3 flex items-center space-x-1"
      >
        <svg
          className={`w-4 h-4 transition-transform ${showReplies ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span>
          {showReplies ? 'Hide' : 'Show'} Replies
          {replies.length > 0 && ` (${replies.length})`}
        </span>
      </button>

      {/* Replies */}
      {showReplies && (
        <div className="space-y-3 bg-gray-50 rounded-lg p-3">
          {loading && replies.length === 0 ? (
            <div className="text-sm text-gray-500">Loading replies...</div>
          ) : (
            <>
              {replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  onEdit={handleEditReply}
                  onDelete={handleDeleteReply}
                  onReact={handleReactToReply}
                  isReply={true}
                />
              ))}

              {/* Load More Replies */}
              {hasMore && (
                <button
                  onClick={handleLoadMoreReplies}
                  disabled={loading}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load more replies'}
                </button>
              )}

              {replies.length === 0 && !loading && (
                <p className="text-sm text-gray-500">No replies yet</p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default RepliesList;
