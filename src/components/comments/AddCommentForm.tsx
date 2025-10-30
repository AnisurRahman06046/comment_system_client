import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema, type CommentFormData } from '../../utils/validators';

interface AddCommentFormProps {
  onSubmit: (content: string) => Promise<void>;
  placeholder?: string;
}

const AddCommentForm = ({ onSubmit, placeholder = 'Share your thoughts...' }: AddCommentFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  const content = watch('content');

  const handleFormSubmit = async (data: CommentFormData) => {
    setSubmitting(true);
    try {
      await onSubmit(data.content);
      reset();
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-3">
        {/* Textarea */}
        <div>
          <textarea
            {...register('content')}
            placeholder={placeholder}
            className={`w-full px-3 py-2 border ${
              errors.content ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
            rows={3}
            maxLength={1000}
            disabled={submitting}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {content?.length || 0}/1000 characters
          </span>
          <button
            type="submit"
            disabled={submitting || !content?.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                <span>Posting...</span>
              </>
            ) : (
              <span>Post Comment</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCommentForm;
