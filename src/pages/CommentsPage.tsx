import { useEffect } from 'react';
import { useComments } from '../hooks/useComments';

const CommentsPage = () => {
  const {
    comments,
    loading,
    error,
    hasMore,
    sortBy,
    fetchComments
  } = useComments();

  // Fetch comments on mount and when sort changes
  useEffect(() => {
    fetchComments(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Comments!
          </h2>
          <p className="text-gray-600 mb-4">
            You are now logged in and viewing the protected comments page.
          </p>

          {/* Success Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              ✅ Authentication is working correctly!
              <br />
              ✅ Protected route is working!
              <br />
              ✅ Layout with header is working!
              <br />
              ✅ CommentContext is initialized!
            </p>
          </div>

          {/* Comment Context Status */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Comment Context Status:
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Loading:</span>{' '}
                <span className={loading ? 'text-yellow-600' : 'text-green-600'}>
                  {loading ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <span className="font-medium">Comments Count:</span>{' '}
                <span className="text-blue-600">{comments.length}</span>
              </p>
              <p>
                <span className="font-medium">Has More:</span>{' '}
                <span className={hasMore ? 'text-green-600' : 'text-gray-600'}>
                  {hasMore ? 'Yes' : 'No'}
                </span>
              </p>
              <p>
                <span className="font-medium">Sort By:</span>{' '}
                <span className="text-purple-600">{sortBy}</span>
              </p>
              {error && (
                <p className="text-red-600">
                  <span className="font-medium">Error:</span> {error}
                </p>
              )}
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Comment UI components coming in the next phases...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
