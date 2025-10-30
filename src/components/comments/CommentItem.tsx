import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useComments } from '../../hooks/useComments';
import type { Comment } from '../../types';
import { formatDate, getInitials } from '../../utils/helpers';
import { REACTION_TYPES } from '../../utils/constants';
import ReplyForm from './ReplyForm';
import RepliesList from './RepliesList';

interface CommentItemProps {
  comment: Comment;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onReact: (id: string, type: 'like' | 'dislike') => void;
  isReply?: boolean;
}

const CommentItem = ({ comment, onEdit, onDelete, onReact, isReply = false }: CommentItemProps) => {
  const { user } = useAuth();
  const { addComment } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyRefreshTrigger, setReplyRefreshTrigger] = useState(0);

  const isAuthor = user?._id === comment.author._id;
  const initials = getInitials(comment.author.firstName, comment.author.lastName);

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      onEdit(comment._id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment._id);
    setShowDeleteConfirm(false);
  };

  const handleReplySubmit = async (content: string) => {
    const reply = await addComment(content, comment._id);
    if (reply) {
      setShowReplyForm(false);
      // Trigger refresh of replies list
      setReplyRefreshTrigger((prev) => prev + 1);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Author Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm">
              {initials}
            </div>
          </div>

          {/* Name and Time */}
          <div>
            <p className="text-sm font-medium text-gray-900">
              {comment.author.firstName} {comment.author.lastName}
            </p>
            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>

        {/* Action Buttons (Edit/Delete) */}
        {isAuthor && !isEditing && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Comment Content or Edit Form */}
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
            maxLength={1000}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {editContent.length}/1000 characters
            </span>
            <div className="flex space-x-2">
              <button
                onClick={handleCancelEdit}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={!editContent.trim()}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-800 mb-3 whitespace-pre-wrap">{comment.content}</p>
      )}

      {/* Reaction Buttons & Reply */}
      {!isEditing && (
        <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
          {/* Like Button */}
          <button
            onClick={() => onReact(comment._id, REACTION_TYPES.LIKE)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              comment.userReaction === REACTION_TYPES.LIKE
                ? 'text-blue-600 font-semibold'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={comment.userReaction === REACTION_TYPES.LIKE ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span className="font-medium">{comment.likesCount}</span>
          </button>

          {/* Dislike Button */}
          <button
            onClick={() => onReact(comment._id, REACTION_TYPES.DISLIKE)}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              comment.userReaction === REACTION_TYPES.DISLIKE
                ? 'text-red-600 font-semibold'
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={comment.userReaction === REACTION_TYPES.DISLIKE ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
              />
            </svg>
            <span className="font-medium">{comment.dislikesCount}</span>
          </button>

          {/* Reply Button - Only show for top-level comments */}
          {!isReply && (
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                />
              </svg>
              <span className="font-medium">Reply</span>
            </button>
          )}
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && !isReply && (
        <div className="ml-12 mt-3">
          <ReplyForm
            onSubmit={handleReplySubmit}
            onCancel={() => setShowReplyForm(false)}
            parentAuthorName={`${comment.author.firstName} ${comment.author.lastName}`}
          />
        </div>
      )}

      {/* Replies List - Only show for top-level comments */}
      {!isReply && <RepliesList parentCommentId={comment._id} refreshTrigger={replyRefreshTrigger} />}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Delete Comment?
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this comment? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
