import { useEffect } from 'react';
import '../styles/snackbar.css';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Snackbar({ 
  message, 
  type, 
  isOpen, 
  onClose, 
  duration = 3000 
}: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`snackbar snackbar-${type} ${isOpen ? 'snackbar-show' : ''}`}>
      <div className="snackbar-content">
        <span className="snackbar-icon">
          {type === 'success' ? '✓' : '✕'}
        </span>
        <span className="snackbar-message">{message}</span>
        <button className="snackbar-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}