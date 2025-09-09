import { Box, Button } from "@mui/material";


interface PostModalActionsProps {
  buttonText: string;
  onSubmit: () => void;
}

export const PostModalActions: React.FC<PostModalActionsProps> = ({
  buttonText,
  onSubmit
}) => {
  return (
    <Box sx={{ p: 3, pt: 0 }}>
      <Button
        fullWidth
        variant="contained"
        onClick={onSubmit}
        sx={{
              backgroundColor: '#1877f2',
              '&:hover': { 
                backgroundColor: '#166fe5',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)'
              },
              '&:disabled': { 
                backgroundColor: '#e4e6ea',
                color: '#bcc0c4'
              },
              textTransform: 'none',
              fontWeight: 600,
              py: 1.5,
              fontSize: '0.95rem',
              borderRadius: 2,
              transition: 'all 0.2s'
            }}
          >
            {buttonText}
          </Button>
        </Box>
  );
};
