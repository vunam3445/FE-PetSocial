import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import { PostHeaderModal } from "../atoms/PostHeaderModal";
import { ListMediaPreview } from "../molecules/ListMediaPreview";
import { PostModalActions } from "../atoms/PostModalActions";
import type { SubmitData } from "../../types/Post";
import type { Post } from "../../types/ResponsePost"; // 👈 kiểu dữ liệu post gốc

interface SharePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: SubmitData) => void;
  post: Post; // 👈 post gốc để share
}

const SharePostModal: React.FC<SharePostModalProps> = ({
  open,
  onClose,
  onSubmit,
  post,
}) => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<
    "public" | "friends" | "private"
  >("public");
  const avatarUrl = localStorage.getItem("avatar_url") || "";
  const userName = localStorage.getItem("user_name") || "Bạn";
  const handleSubmit = () => {
    const submitData: SubmitData = {
      caption: caption.trim(),
      visibility,
      shared_post_id:  post.shared_post ? post.shared_post_id : post.post_id, // nếu share bài share thì lấy id bài share

    };
    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    setCaption("");
    setVisibility("public");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          width: 548,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          borderRadius: 3,
          outline: "none",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            pb: 2,
            borderBottom: "1px solid #e4e6ea",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#1c1e21", fontSize: "1.25rem" }}
          >
            Chia sẻ bài viết
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              backgroundColor: "#f0f2f5",
              width: 36,
              height: 36,
              "&:hover": { backgroundColor: "#e4e6ea" },
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        {/* User nhập caption */}
        <PostHeaderModal
          avatarURL={avatarUrl}
          userName={userName}
          visibility={visibility}
          onVisibilityChange={(v) =>
            setVisibility(v as "public" | "friends" | "private")
          }
          caption={caption}
          onCaptionChange={setCaption}
        />

        {/* Post gốc */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            border: "1px solid #e4e6ea",
            borderRadius: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          {post.media && post.media.length > 0 && (
            <ListMediaPreview
              mediaList={post.media}
              onRemove={undefined} // 👈 share thì không xoá media gốc
            />
          )}
          {post.shared_post && post.shared_post.media && post.shared_post.media.length > 0 && (
            <ListMediaPreview
              mediaList={post.shared_post.media}
              onRemove={undefined} // 👈 share thì không xoá media gốc
            />
          )}

          {/* caption gốc hiển thị bên dưới */}
          <Box sx={{ mb: 1 }}>
            {/* Avatar + name */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <img
                src={post.author.avatar_url}
                alt={post.author.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  marginRight: 8,
                  objectFit: "cover",
                }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {post.author.name}
              </Typography>
            </Box>

            {/* Caption */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {post.caption}
            </Typography>
          </Box>
        </Box>

        {/* Submit */}
        <PostModalActions buttonText="Chia sẻ" onSubmit={handleSubmit} />
      </Paper>
    </Modal>
  );
};

export default SharePostModal;
