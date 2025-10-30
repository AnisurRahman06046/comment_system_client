import toast from 'react-hot-toast';

/**
 * Toast notification utilities
 */

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message);
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

export const showInfoToast = (message: string) => {
  toast(message, {
    icon: 'ℹ️',
  });
};

// Convenience exports
export { toast };
