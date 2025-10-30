import type { Comment } from '../../types';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: Comment[];
  loading: boolean;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onReact: (id: string, type: 'like' | 'dislike') => void;
}

const CommentList = ({ comments, loading, onEdit, onDelete, onReact }: CommentListProps) => {
  // Loading State
  if (loading && comments.length === 0) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty State
  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No comments yet</h3>
        <p className="mt-1 text-sm text-gray-500">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  // Comments List
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onEdit={onEdit}
          onDelete={onDelete}
          onReact={onReact}
        />
      ))}
    </div>
  );
};

export default CommentList;
