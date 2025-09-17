import { Avatar, Box, Typography } from "@mui/material";
import type { Author } from "../../types/ResponsePost";

 function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
}
export default function PostDetailHeader({
  author,
  createdAt,
}: {
  author: Author;
  createdAt: string;
}) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar src={author.avatar_url} sx={{ width: 48, height: 48, mr: 2 }}>
        {author.name.charAt(0)}
      </Avatar>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
          {author.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatTimeAgo(createdAt)}
        </Typography>
      </Box>
    </Box>
  );
}
