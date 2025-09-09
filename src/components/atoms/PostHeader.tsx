import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardHeader,
  Box,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import type { Post } from "../../types/ResponsePost";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
interface PostHeaderProps {
  post: Post;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const PostHeader = ({
  post,
  isOwner,
  onEdit,
  onDelete,
}: PostHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <CardHeader
      avatar={<Avatar src={post.author.avatar_url}>{post.author.name}</Avatar>}
      action={
        <>
          <IconButton  onClick={(e) => {
          e.stopPropagation(); // ✅ chỉ chặn khi bấm menu
          setAnchorEl(e.currentTarget);
        }}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            onClick={(e) => e.stopPropagation()}

          >
            {isOwner && [
              <MenuItem
                key="edit"
                onClick={() => {
                  onEdit();
                  setAnchorEl(null); // ✅ đóng menu
                }}
              >
                Sửa bài viết
              </MenuItem>,
              <MenuItem
                key="delete"
                onClick={() => {
                  onDelete();
                  setAnchorEl(null); // ✅ đóng menu
                }}
              >
                Xóa bài viết
              </MenuItem>,
            ]}
          </Menu>
        </>
      }
      title={
        <Typography variant="h6" sx={{ fontWeight: 600 }}
        onClick={(e) => {
        e.stopPropagation(); 
        // 👉 gọi mở chi tiết post ở đây nếu bạn muốn
        // ví dụ: onDetailPost?.()
      }}>
          {post.author.name}
        </Typography>
      }
      subheader={
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            {dayjs().diff(dayjs(post.updated_at), "day") < 1
              ? dayjs(post.updated_at).fromNow()
              : dayjs(post.updated_at).format("DD/MM/YYYY")}
          </Typography>
          •{" "}
          <Typography variant="body2" color="text.secondary">
            {post.visibility === "public"
              ? "Công khai"
              : post.visibility === "friends"
              ? "Bạn bè"
              : "Chỉ mình tôi"}
          </Typography>
        </Box>
      }
    />
  );
};
