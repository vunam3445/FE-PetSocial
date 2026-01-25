import React, { useEffect } from 'react';
import { Snackbar, Alert, Portal} from '@mui/material';

interface ErrorToastProps {
  open: boolean;
  text: string;
  position?: 'top';
  duration?: number;
  onClose?: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  open,
  text,
  position = 'top',
  duration = 3000,
  onClose
}) => {
  useEffect(() => {
    if (open && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  const getAnchorOrigin = () => {
    switch (position) {
      case 'top':
      default:
        return { vertical: 'top' as const, horizontal: 'center' as const };
    }
  };

  return (
    <Portal>
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          // Header chính của bạn là z-50, nên đặt cái này cao hơn hẳn
          zIndex: 99999, 
          // h-16 của Header là 64px, thêm khoảng cách an toàn là 80px
          top: '80px !important', 
          position: 'fixed'
        }}
      >
        <Alert
          onClose={onClose}
          severity="error"
          variant="filled"
          sx={{ 
            width: '100%', 
            maxWidth: '400px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)' 
          }}
        >
          {text}
        </Alert>
      </Snackbar>
    </Portal>
  );
};

export default ErrorToast;