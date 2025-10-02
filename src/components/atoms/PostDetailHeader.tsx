import { Avatar, Box, Typography } from "@mui/material";
import type { Author } from "../../types/ResponsePost";
import dayjs from "../../lib/dayjs"; // 👈 import file bạn đã config

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
          {dayjs(createdAt).fromNow()} {/* 👈 hiển thị dạng "3 phút trước" */}
        </Typography>
      </Box>
    </Box>
  );
}
