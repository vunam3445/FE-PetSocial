import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardHeader,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import type { Post } from "../../types/ResponsePost";
import dayjs from "../../lib/dayjs";

interface PostHeaderProps {
  post: Post;
  isOwner: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport?: () => void;
}

export const PostHeader = ({
  post,
  isOwner,
  onEdit,
  onDelete,
  onReport,
}: PostHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // 👈 hook điều hướng

  return (
    <CardHeader
      avatar={
        <Avatar
          src={
            post.pet?.avatar_url ? post.pet.avatar_url : post.author?.avatar_url
          }
          onClick={(e) => {
            e.stopPropagation();
            // navigate(`/profile/${post.author_id}`);
            if (post.pet) {
              navigate(`/pet-health/${post.pet.pet_id}`);
            } else {
              navigate(`/profile/${post.author_id}`);
            }
          }}
        >
          {post.pet ? post.pet?.name.charAt(0) : post.author?.name.charAt(0)}
        </Avatar>
      }
      action={
        <>
          {(onReport || isOwner) && (<IconButton
            onClick={(e) => {
              e.stopPropagation(); // ✅ chặn click lan ra ngoài
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreVert />
          </IconButton>)}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            onClick={(e) => e.stopPropagation()}
          >
            {isOwner && (
              <>
                <MenuItem
                  onClick={() => {
                    onEdit();
                    setAnchorEl(null); // ✅ đóng menu
                  }}
                >
                  Sửa bài viết
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDelete();
                    setAnchorEl(null); // ✅ đóng menu
                  }}
                >
                  Xóa bài viết
                </MenuItem>
              </>
            )}

            <MenuItem
              onClick={() => {
                onReport();
                setAnchorEl(null); // ✅ đóng menu
              }}
            >
              Báo cáo bài viết
            </MenuItem>
          </Menu>
        </>
      }
      title={
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
          onClick={(e) => {
            e.stopPropagation();
            // navigate(`/profile/${post.author_id}`);
            if (post.pet) {
              navigate(`/pet-health/${post.pet.pet_id}`);
            } else {
              navigate(`/profile/${post.author_id}`);
            }
          }}
        >
          {post.pet ? post.pet?.name : post.author?.name}
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
