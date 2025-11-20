import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface NotificationToastProps {
  type: ToastType;
  title: string;
  message?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  className?: string;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  type,
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
  className
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };

  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  const iconStyles = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  };

  const Icon = icons[type];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 max-w-sm w-full',
        'animate-slide-in-right',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className={cn(
        'rounded-lg border p-4 shadow-lg backdrop-blur-sm',
        styles[type]
      )}>
        <div className="flex items-start">
          <Icon className={cn('w-5 h-5 mr-3 mt-0.5 flex-shrink-0', iconStyles[type])} />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm">{title}</h4>
            {message && (
              <p className="mt-1 text-sm opacity-90">{message}</p>
            )}
          </div>
          {onClose && (
            <button
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="ml-2 inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary rounded"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = React.useState<Array<{
    id: string;
    type: ToastType;
    title: string;
    message?: string;
  }>>([]);

  const addToast = React.useCallback((
    type: ToastType, 
    title: string, 
    message?: string
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
  }, []);

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = React.useCallback((title: string, message?: string) => {
    addToast('success', title, message);
  }, [addToast]);

  const error = React.useCallback((title: string, message?: string) => {
    addToast('error', title, message);
  }, [addToast]);

  const warning = React.useCallback((title: string, message?: string) => {
    addToast('warning', title, message);
  }, [addToast]);

  const info = React.useCallback((title: string, message?: string) => {
    addToast('info', title, message);
  }, [addToast]);

  const ToastContainer = React.useCallback(() => (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(toast => (
        <NotificationToast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  ), [toasts, removeToast]);

  return {
    success,
    error,
    warning,
    info,
    ToastContainer
  };
};

export default NotificationToast;