import { Box, CircularProgress, Typography } from "@mui/material";

export const LoadingOverlay = ({ text = "Đang tải..." }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="rgba(255,255,255,0.7)"
      zIndex={9999}
    >
      <CircularProgress color="primary" size={60} />
      <Typography mt={2} color="textSecondary" fontSize={18}>
        {text}
      </Typography>
    </Box>
  );
};
