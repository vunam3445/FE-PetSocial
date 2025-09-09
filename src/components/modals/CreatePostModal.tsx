import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import { PostHeaderModal } from "../atoms/PostHeaderModal";
import { ListMediaPreview } from "../molecules/ListMediaPreview";
import { PostModalActions } from "../atoms/PostModalActions";
import { MediaUploadButtons } from "../atoms/MediaUploadButtons";
import type { SubmitData, MediaItem } from "../../types/Post";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: SubmitData) => void;
  avatarURL: string;
  userName: string;
}



const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  onSubmit,
  avatarURL,
  userName,
}) => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");

  const [medias, setMedias] = useState<MediaItem[]>([]);
  const handleVisibilityChange = (value: string) => {
    setVisibility(value as "public" | "friends" | "private");
  };

  const handleUploadImages = (files: File[]) => {
    const newItem :MediaItem[] = files.map((file, index)=>({
      id:crypto.randomUUID(),
      media_id: undefined,
      post_id: undefined,
      file,
      media_url: undefined,
      media_type: "image",
      order: medias.length + index,
      created_at: undefined,
      updated_at: undefined
    }))
    setMedias((prev) => [
      ...prev,
      ...newItem
    ]);
  }; 

  const handleUploadVideos = (files: File[]) => {
    const newItem: MediaItem[] = files.map((file, index) => ({
      id:crypto.randomUUID(),
      media_id: undefined,
      post_id: undefined,
      file,
      media_url: undefined,
      media_type: "video",
      order: medias.length + index,
      created_at: undefined,
      updated_at: undefined
    }));
    setMedias((prev) => [
      ...prev,
      ...newItem
    ]);
  };

const removeMedia = (id:string) => {
  setMedias((prev) => prev.filter((m) => m.id !== id));
};



const handleSubmit = () => {
  const submitData: SubmitData = {
    caption: caption.trim(),
    visibility,
    media: medias
  };
  onSubmit(submitData);
  handleClose();
};



  const handleClose = () => {
    setCaption("");
    setVisibility("public");
    // setImages([]);
    // setVideos([]);
    setMedias([]);
    onClose();
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 2 }}
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
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#1c1e21", fontSize: "1.25rem" }}>
            Tạo bài viết mới
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

        {/* User info */}
        <PostHeaderModal
          avatarURL={avatarURL}
          userName={userName}
          visibility={visibility}
          onVisibilityChange={handleVisibilityChange}
          caption={caption}
          onCaptionChange={setCaption}
        />

        {/* Media preview */}
        {medias.length > 0 && (
          <ListMediaPreview mediaList={medias} onRemove={removeMedia} />
        )}

        {/* Upload buttons */}
        <MediaUploadButtons
          onImageUpload={handleUploadImages}
          onVideoUpload={handleUploadVideos}
        />

        {/* Submit */}
        <PostModalActions
          buttonText="Đăng bài"
          onSubmit={handleSubmit}
        />
      </Paper>
    </Modal>
  );
};

export default CreatePostModal;
