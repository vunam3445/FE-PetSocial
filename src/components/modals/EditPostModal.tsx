// EditPostModal.tsx

import React, { useState, useMemo, useEffect } from "react";
import { Modal, Box, Typography, IconButton, Paper } from "@mui/material";
import { Close } from "@mui/icons-material";
import { PostHeaderModal } from "../atoms/PostHeaderModal";
import { ListMediaPreview } from "../molecules/ListMediaPreview";
import { PostModalActions } from "../atoms/PostModalActions";
import { MediaUploadButtons } from "../atoms/MediaUploadButtons";
import type { SubmitData, MediaItem } from "../../types/Post";
import type { Post as PostType, Media } from "../../types/ResponsePost";

interface EditPostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (postId: string, formData: SubmitData) => void;
  postToEdit: PostType; // Dữ liệu bài viết để sửa
  isShare?: boolean; // 👈 thêm
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  onClose,
  onSubmit,
  postToEdit,
  isShare,
}) => {
  // State cho dữ liệu bài viết
  const [caption, setCaption] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("public");

  // State để quản lý media
  const [oldMedia, setOldMedia] = useState<Media[]>([]);
  const [newMedia, setNewMedia] = useState<MediaItem[]>([]);
  // useEffect để điền dữ liệu khi modal mở với một bài viết
  useEffect(() => {
    if (postToEdit) {
      const sourceMedia = postToEdit.shared_post
        ? postToEdit.shared_post.media
        : postToEdit.media;

      const mapped = (sourceMedia || []).map((m) => ({
        ...m,
        id: crypto.randomUUID(),
      }));
      setVisibility(postToEdit.visibility || "public");
      setCaption(postToEdit.caption || "");
      setOldMedia(mapped);
      setNewMedia([]);
    }
  }, [postToEdit]);

  // Danh sách media tổng hợp để hiển thị preview

  const medias = useMemo(() => {
    return [...oldMedia, ...newMedia];
  }, [oldMedia, newMedia]);

  const handleUploadImages = (files: File[]) => {
    const newItem: MediaItem[] = files.map((file, index) => ({
      id: crypto.randomUUID(),
      media_id: undefined,
      post_id: undefined,
      file,
      media_url: undefined,
      media_type: "image",
      order: medias.length + index,
      created_at: undefined,
      updated_at: undefined,
    }));
    setNewMedia((prev) => [...prev, ...newItem]);
  };

  const handleUploadVideos = (files: File[]) => {
    const newItem: MediaItem[] = files.map((file, index) => ({
      id: crypto.randomUUID(),
      media_id: undefined,
      post_id: undefined,
      file,
      media_url: undefined,
      media_type: "video",
      order: medias.length + index,
      created_at: undefined,
      updated_at: undefined,
    }));
    setNewMedia((prev) => [...prev, ...newItem]);
  };
  // Logic xóa media đã được nâng cấp
  const removeMedia = (id: string) => {
    // Nếu media nằm trong oldMedia thì xóa ở oldMedia
    setOldMedia((prev) => prev.filter((m) => m.id !== id));
    // Nếu media nằm trong newMedia thì xóa ở newMedia
    setNewMedia((prev) => prev.filter((m) => m.id !== id));
  };
  const handleVisibilityChange = (newVisibility: string) => {
    setVisibility(newVisibility);
  };
  const handleSubmit = () => {
    if (!postToEdit) return;

    // Dữ liệu media chỉ chứa các file MỚI được thêm vào

    const submitData: SubmitData = {
      caption: caption?.trim(),
      visibility,
      media: postToEdit.shared_post ? [] : medias,
    };
    onSubmit(postToEdit.post_id, submitData);
  };
  const onCaptionChange = (newCaption: string) => {
    setCaption(newCaption);
  };
  const handleClose = () => {
    // Không cần reset state ở đây vì useEffect sẽ làm việc đó khi `postToEdit` thay đổi
    onClose();
  };

  // const isSubmitDisabled = !caption?.trim() && mediaListForPreview.length === 0;

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
            Sủa bài viết
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
          avatarURL={postToEdit.author.avatar_url}
          userName={postToEdit.author.name}
          visibility={visibility}
          onVisibilityChange={handleVisibilityChange}
          caption={caption}
          onCaptionChange={onCaptionChange}
        />

        {/* Media preview */}
        {medias.length > 0 && (
          <ListMediaPreview
            mediaList={medias}
            onRemove={postToEdit.shared_post ? undefined : removeMedia}
          />
        )}
        {postToEdit.shared_post_id && (
          <Box sx={{ mb: 1, pl: 2 }}>
            {" "}
            {/* 👈 thêm pl để cách lề trái */}
            {/* Avatar + name */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <img
                src={postToEdit.author.avatar_url}
                alt={postToEdit.author.name}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  marginRight: 8,
                  objectFit: "cover",
                }}
              />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {postToEdit.author.name}
              </Typography>
            </Box>
            {/* Caption */}
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {postToEdit.caption}
            </Typography>
          </Box>
        )}

        {/* Upload buttons */}
        {!isShare && (
          <MediaUploadButtons
            onImageUpload={handleUploadImages}
            onVideoUpload={handleUploadVideos}
          />
        )}

        {/* Submit */}
        <PostModalActions
          // disabled={isSubmitDisabled}
          buttonText="Sửa bài"
          onSubmit={handleSubmit}
        />
      </Paper>
    </Modal>
  );
};

export default EditPostModal;
