import '../styles/dialog.css';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Ya, Hapus',
  cancelText = 'Batal',
  onConfirm,
  onCancel,
  type = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="confirm-overlay" onClick={onCancel}></div>
      <div className="confirm-dialog">
        <div className="confirm-header">
          <div className={`confirm-icon confirm-icon-${type}`}>
            {type === 'danger' ? '⚠' : type === 'warning' ? '!' : 'i'}
          </div>
          <h3 className="confirm-title">{title}</h3>
        </div>
        
        <div className="confirm-body">
          <p className="confirm-message">{message}</p>
        </div>
        
        <div className="confirm-footer">
          <button 
            className="confirm-btn confirm-btn-cancel" 
            onClick={onCancel}
          >
            {cancelText}
          </button>
          <button 
            className={`confirm-btn confirm-btn-confirm confirm-btn-${type}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
}