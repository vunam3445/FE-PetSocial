import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CardHeader,
  Box,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import type { Post } from "../../types/ResponsePost";
import dayjs from "../../lib/dayjs";

interface PostHeaderProps {
  post: Post;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
}

export const PostHeader = ({
  post,
  onEdit,
  onDelete,
  onReport,
}: PostHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const isInGroupPage = location.pathname.includes("/groups/");
  const isHomePage = location.pathname === "/";
  return (
    <CardHeader
      avatar={
        <Avatar
          src={
            post.pet?.avatar_url ? post.pet.avatar_url : post.author?.avatar_url
          }
          onClick={(e) => {
            e.stopPropagation();
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
          {!isHomePage && (post.is_owner || (isInGroupPage && onReport)) && (
            <>
            {onDelete && onEdit &&(
              <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setAnchorEl(e.currentTarget);
              }}
            >
              <MoreVert />
            </IconButton>
            )}
            </>
          )}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            onClick={(e) => e.stopPropagation()}
            disableScrollLock={true}
          >
            {post.is_owner && [
              <MenuItem
                key="edit" // Thêm key khi dùng mảng
                onClick={() => {
                  onEdit();
                  setAnchorEl(null);
                }}
              >
                Sửa bài viết
              </MenuItem>,
              <MenuItem
                key="delete" // Thêm key khi dùng mảng
                onClick={() => {
                  onDelete();
                  setAnchorEl(null);
                }}
              >
                Xóa bài viết
              </MenuItem>,
            ]}

            {isInGroupPage && (
              <MenuItem
              onClick={() => {
                onReport?.(); // Thêm dấu ? để an toàn nếu onReport undefined
                setAnchorEl(null);
              }}
            >
              Báo cáo bài viết
            </MenuItem>
            )}
          </Menu>
        </>
      }
      title={
        <Box>
          {post.group ? (
            // TRƯỜNG HỢP CÓ GROUP: Tên Group làm Title chính
            <>
              <Typography
                variant="h6" // Font lớn như tiêu đề cũ
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  cursor: "pointer",
                  lineHeight: 1.2,
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/groups/${post.group_id}`);
                }}
              >
                {post.group.name}
              </Typography>

              {/* Tên tác giả hiển thị nhỏ hơn ở dưới */}
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "text.secondary",
                  cursor: "pointer",
                  "&:hover": { color: "primary.main" },
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (post.pet) {
                    navigate(`/pet-health/${post.pet.pet_id}`);
                  } else {
                    navigate(`/profile/${post.author_id}`);
                  }
                }}
              >
                {post.pet ? `Thú cưng: ${post.pet.name}`: post.author?.name}
              </Typography>
            </>
          ) : (
            // TRƯỜNG HỢP KHÔNG CÓ GROUP: Hiển thị tên Tác giả/Pet như cũ
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (post.pet) {
                  navigate(`/pet-health/${post.pet.pet_id}`);
                } else {
                  navigate(`/profile/${post.author_id}`);
                }
              }}
            >
              {post.pet ? `Thú cưng: ${post.pet.name}`: post.author?.name}
            </Typography>
          )}
        </Box>
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
