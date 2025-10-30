import { useEffect } from 'react';
import { useComments } from '../hooks/useComments';
import AddCommentForm from '../components/comments/AddCommentForm';
import CommentList from '../components/comments/CommentList';
import SortDropdown from '../components/comments/SortDropdown';
import LoadMoreButton from '../components/comments/LoadMoreButton';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const CommentsPage = () => {
  const {
    comments,
    loading,
    error,
    hasMore,
    sortBy,
    fetchComments,
    addComment,
    editComment,
    removeComment,
    reactToComment,
    setSortBy,
    loadMore,
  } = useComments();

  // Fetch comments on mount and when sort changes
  useEffect(() => {
    fetchComments(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  const handleAddComment = async (content: string) => {
    const result = await addComment(content);
    if (result) {
      showSuccessToast('Comment posted successfully!');
    } else {
      showErrorToast('Failed to post comment');
    }
  };

  const handleEditComment = async (id: string, content: string) => {
    const result = await editComment(id, content);
    if (result) {
      showSuccessToast('Comment updated successfully!');
    } else {
      showErrorToast('Failed to update comment');
    }
  };

  const handleDeleteComment = async (id: string) => {
    const success = await removeComment(id);
    if (success) {
      showSuccessToast('Comment deleted successfully!');
    } else {
      showErrorToast('Failed to delete comment');
    }
  };

  const handleReaction = async (id: string, type: 'like' | 'dislike') => {
    await reactToComment(id, type);
  };

  const handleSortChange = (newSort: typeof sortBy) => {
    setSortBy(newSort);
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Discussion
          </h2>
          <p className="text-gray-600">
            Share your thoughts and engage with the community
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Add Comment Form */}
        <div className="mb-6">
          <AddCommentForm onSubmit={handleAddComment} />
        </div>

        {/* Sort Dropdown */}
        <div className="mb-4">
          <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} />
        </div>

        {/* Comments Count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </p>
        </div>

        {/* Comments List */}
        <CommentList
          comments={comments}
          loading={loading}
          onEdit={handleEditComment}
          onDelete={handleDeleteComment}
          onReact={handleReaction}
        />

        {/* Load More Button */}
        {comments.length > 0 && (
          <LoadMoreButton
            onLoadMore={loadMore}
            loading={loading}
            hasMore={hasMore}
          />
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
