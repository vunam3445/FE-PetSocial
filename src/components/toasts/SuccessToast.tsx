import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SuccessToastProps {
  open: boolean;
  text: string;
  position?: 'top';
  duration?: number;
  onClose?: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({
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
    <Snackbar
      open={open}
      anchorOrigin={getAnchorOrigin()}
      onClose={onClose}
      sx={{
        zIndex: 9999,
        '& .MuiSnackbarContent-root': {
          maxWidth: '480px',
          width: 'auto',
        }
      }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        role="status"
        aria-live="polite"
        sx={{
          width: '100%',
          maxWidth: '480px',
          wordWrap: 'break-word',
          '& .MuiAlert-message': {
            wordBreak: 'break-word',
            hyphens: 'auto',
          }
        }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SuccessToast;