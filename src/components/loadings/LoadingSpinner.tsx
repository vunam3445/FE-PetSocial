import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingSpinner = ({ text = "Đang tải..." }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="200px"
    >
      <CircularProgress color="primary" />
      <Typography mt={2} color="textSecondary">
        {text}
      </Typography>
    </Box>
  );
};
