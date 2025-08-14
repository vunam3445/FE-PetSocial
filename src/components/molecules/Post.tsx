import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Comment,
  Share,
  MoreVert,
} from "@mui/icons-material";
import PostLightboxModal from "../modals/PostLightboxModal"; // đổi path nếu cần
import PostDetailModal from "../modals/PostDetailModal";
import type { Author } from "../../types/ResponsePost";
import { PostCaption } from "../atoms/PostCaption";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Media {
  media_id: string;
  post_id: string;
  media_url: string;
  media_type: "image" | "video"; // giới hạn kiểu để dễ kiểm tra
  order: number;
  created_at: string;
  updated_at: string;
}

interface Post {
  post_id: string;
  author_id: string;
  caption: string | null;
  visibility: "public" | "private" | "friends";
  shared_post_id: string | null;
  group_id: string | null;
  created_at: string;
  updated_at: string;
  media: Media[];
  author: Author;
}

const Post = ({ post, onEditPost}: { post: Post, onEditPost: () => void  }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Math.floor(Math.random() * 100) + 10
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Khi đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openLightbox = (media: Media) => {
    const index = post.media.findIndex((m) => m.media_url === media.media_url);
    setMediaList(post.media);
    setSelectedIndex(index);
    setLightboxOpen(true);
  };
  const closeLightbox = () => {
    setLightboxOpen(false);
  };
  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const handleClickDetail = () => {
    setOpenModalDetail(true);
  };
  return (
    <>
      <Card
        sx={{
          width: "100%",
          margin: "0 auto 24px auto",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          overflow: "visible",
        }}
        onClick={handleClickDetail}
      >
        <CardHeader
          avatar={
            <Avatar
              src={post.author.avatar_url}
              sx={{
                width: 48,
                height: 48,
                border: "2px solid #e3f2fd",
              }}
            >
              {post.author.name}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="settings"
              onClick={(e)=>{
                e.stopPropagation();
                handleClick(e);
              }}
              >
                <MoreVert />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={(e) => e.stopPropagation()}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={(e)=>{
                  e.stopPropagation();
                  onEditPost?.();
                }}>Sửa bài viết</MenuItem>
              </Menu>
            </>
          }
          title={
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {post.author.name}
            </Typography>
          }
          subheader={
            <Typography variant="body2" color="text.secondary">
              {dayjs().diff(dayjs(post.updated_at), "day") < 1
                ? dayjs(post.updated_at).fromNow()
                : dayjs(post.updated_at).format("DD/MM/YYYY")}
            </Typography>
          }
          sx={{ pb: 1 }}
        />

        {post.caption && (
          <PostCaption
            caption={post.caption || ""}
            maxChars={280}
            onExpand={handleClickDetail}
          />
        )}

        {post.media && post.media.length > 0 && (
          <Box sx={{ px: 0, mt: 1.5 }}>
            <Box
              sx={{
                display: "grid",
                gap: "2px",
                borderRadius: "8px",
                overflow: "hidden",
                ...(post.media.length === 1 && { gridTemplateColumns: "1fr" }),
                ...(post.media.length === 2 && {
                  gridTemplateColumns: "1fr 1fr",
                }),
                ...(post.media.length === 3 && {
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                }),
                ...(post.media.length >= 4 && {
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                }),
              }}
            >
              {(post.media.length > 4
                ? post.media.slice(0, 4)
                : post.media
              ).map((media, index) => (
                <Box
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(media);
                  }}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    aspectRatio: "1 / 1",
                    "&:hover": {
                      transform: "scale(1.02)",
                      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                    },
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    ...(post.media.length === 3 &&
                      index === 0 && {
                        gridRow: "1 / 3",
                        aspectRatio: "auto",
                      }),
                  }}
                >
                  {media.media_type === "image" ? (
                    <img
                      src={media.media_url}
                      alt="Post media"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  ) : (
                    <video
                      src={media.media_url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      muted
                      preload="metadata"
                    />
                  )}
                  {post.media.length > 4 && index === 3 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      +{post.media.length - 4}
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <CardActions sx={{ px: 2, py: 1.5, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              startIcon={liked ? <Favorite /> : <FavoriteBorder />}
              onClick={handleLike}
              sx={{
                textTransform: "none",
                color: liked ? "#1976d2" : "text.secondary",
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
            >
              {likeCount} Likes
            </Button>
            <Button
              startIcon={<Comment />}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 500,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleClickDetail();
              }}
            >
              Comment
            </Button>
          </Box>
          <Button
            startIcon={<Share />}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              fontWeight: 500,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
            }}
          >
            Share
          </Button>
        </CardActions>
      </Card>

      <PostLightboxModal
        open={lightboxOpen}
        mediaList={mediaList}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />

      <PostDetailModal
        open={openModalDetail}
        post={post}
        onClose={() => setOpenModalDetail(false)}
      />
    </>
  );
};

export default Post;
