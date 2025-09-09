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
  avatarURL: string;
  userName: string;
  post: Post; // 👈 post gốc để share
}

const SharePostModal: React.FC<SharePostModalProps> = ({
  open,
  onClose,
  onSubmit,
  avatarURL,
  userName,
  post,
}) => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<
    "public" | "friends" | "private"
  >("public");

  const handleSubmit = () => {
    const submitData: SubmitData = {
      caption: caption.trim(),
      visibility,
      shared_post_id: post.post_id, // 👈 tham chiếu đến post gốc
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
          avatarURL={avatarURL}
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

  {/* caption gốc hiển thị bên dưới */}
  <Typography variant="body1" sx={{ mt: 1, whiteSpace: "pre-line" }}>
    {post.caption}
  </Typography>
</Box>


        {/* Submit */}
        <PostModalActions buttonText="Chia sẻ" onSubmit={handleSubmit} />
      </Paper>
    </Modal>
  );
};

export default SharePostModal;
