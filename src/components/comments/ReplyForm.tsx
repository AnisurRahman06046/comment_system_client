import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema, type CommentFormData } from '../../utils/validators';

interface ReplyFormProps {
  onSubmit: (content: string) => Promise<void>;
  onCancel: () => void;
  parentAuthorName: string;
}

const ReplyForm = ({ onSubmit, onCancel, parentAuthorName }: ReplyFormProps) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-gray-50 rounded-lg border border-gray-200 p-3 ml-12 mt-2"
    >
      <div className="space-y-2">
        <p className="text-xs text-gray-600">
          Replying to <span className="font-medium">{parentAuthorName}</span>
        </p>

        {/* Textarea */}
        <div>
          <textarea
            {...register('content')}
            placeholder="Write your reply..."
            className={`w-full px-3 py-2 border ${
              errors.content ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm`}
            rows={2}
            maxLength={1000}
            disabled={submitting}
          />
          {errors.content && (
            <p className="mt-1 text-xs text-red-600">{errors.content.message}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {content?.length || 0}/1000
          </span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={submitting}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !content?.trim()}
              className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Posting...' : 'Reply'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ReplyForm;
