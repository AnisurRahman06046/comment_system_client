interface LoadMoreButtonProps {
  onLoadMore: () => void;
  loading: boolean;
  hasMore: boolean;
}

const LoadMoreButton = ({ onLoadMore, loading, hasMore }: LoadMoreButtonProps) => {
  if (!hasMore) {
    return null;
  }

  return (
    <div className="flex justify-center pt-4">
      <button
        onClick={onLoadMore}
        disabled={loading}
        className="px-6 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-600 rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <svg
              className="w-4 h-4"
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
            <span>Load More Comments</span>
          </>
        )}
      </button>
    </div>
  );
};

export default LoadMoreButton;
