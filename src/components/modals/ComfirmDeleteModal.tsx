import React from 'react';
import {
  Dialog,
  DialogTitle,
//   DialogContent,
  DialogActions,
  Button,
//   Typography
} from '@mui/material';

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ 
  open, 
  onClose, 
  onConfirm 
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          padding: 2,
          textAlign: 'center'
        }
      }}
    >
      {/* Top Question */}
      <DialogTitle sx={{ 
        fontSize: '1.25rem',
        fontWeight: 500,
        color: 'text.primary',
        pb: 2
      }}>
        Bạn có chắc chắn muốn xoá bài viết này không?
      </DialogTitle>
      
      {/* Middle Question */}
      {/* <DialogContent sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        py: 4
      }}>
        <Typography variant="h6" sx={{ 
          color: 'text.primary',
          fontWeight: 400
        }}>
          Bạn có chắc chắn muốn xoá bài viết này không?
        </Typography>
      </DialogContent> */}
      
      {/* Bottom Buttons */}
      <DialogActions sx={{ 
        justifyContent: 'center',
        gap: 2,
        pb: 2,
        pt: 2
      }}>
        <Button 
          onClick={onConfirm}
          variant="contained"
          color="error"
          size="large"
          sx={{ 
            minWidth: 80,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          Yes
        </Button>
        <Button 
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{ 
            minWidth: 80,
            textTransform: 'none',
            fontWeight: 500
          }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDelete;