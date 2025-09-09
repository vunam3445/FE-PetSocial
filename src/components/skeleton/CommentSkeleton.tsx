import { Box, Skeleton, Avatar } from "@mui/material";

export default function CommentSkeleton() {
  return (
    <Box sx={{ display: "flex", mb: 2 }}>
      <Skeleton variant="circular" width={40} height={40}>
        <Avatar />
      </Skeleton>
      <Box sx={{ ml: 2, flex: 1 }}>
        <Skeleton variant="text" width="30%" height={16} />
        <Skeleton variant="text" width="80%" height={20} />
      </Box>
    </Box>
  );
}
