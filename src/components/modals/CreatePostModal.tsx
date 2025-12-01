import React, { useState, useMemo } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Paper,
  SelectChangeEvent
} from "@mui/material";
import { Close } from "@mui/icons-material"; // Import thêm icon Pets
import { PostHeaderModal } from "../atoms/PostHeaderModal";
import { ListMediaPreview } from "../molecules/ListMediaPreview";
import { PostModalActions } from "../atoms/PostModalActions";
import { MediaUploadButtons } from "../atoms/MediaUploadButtons";

// Import types (đã định nghĩa ở trên)
import type { SubmitData, MediaItem, Pet } from "../../types/Post";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (formData: SubmitData) => void;
  avatarURL: string; // Avatar của User gốc
  userName: string;  // Tên của User gốc
  pets: Pet[];       // Danh sách thú cưng của user
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  open,
  onClose,
  onSubmit,
  avatarURL,
  userName,
  pets,
}) => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");
  const [medias, setMedias] = useState<MediaItem[]>([]);
  
  // State mới: 'user' là đăng dưới tên chủ, hoặc ID của thú cưng
  const [selectedProfileId, setSelectedProfileId] = useState<string>("user");

  // Tính toán thông tin hiển thị dựa trên profile đang chọn
  const currentProfile = useMemo(() => {
    if (selectedProfileId === "user") {
      return { name: userName, avatar: avatarURL };
    }
    const pet = pets.find((p) => p.pet_id === selectedProfileId);
    return pet 
      ? { name: pet.name, avatar: pet.avatar_url } 
      : { name: userName, avatar: avatarURL }; // Fallback về user
  }, [selectedProfileId, userName, avatarURL, pets]);

  const handleVisibilityChange = (value: string) => {
    setVisibility(value as "public" | "friends" | "private");
  };

  const handleProfileChange = (event: SelectChangeEvent) => {
    setSelectedProfileId(event.target.value);
  };

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
    setMedias((prev) => [...prev, ...newItem]);
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
    setMedias((prev) => [...prev, ...newItem]);
  };

  const removeMedia = (id: string) => {
    setMedias((prev) => prev.filter((m) => m.id !== id));
  };
  const author_id = localStorage.getItem("user_id") || "";
  const handleSubmit = () => {
    const submitData: SubmitData = {
      author_id,
      caption: caption.trim(),
      visibility,
      media: medias,
      pet_id: selectedProfileId === "user" ? null : selectedProfileId, // Gửi kèm thông tin người đăng (user hoặc pet_id)
    };
    onSubmit(submitData);
    handleClose();
  };

  const handleClose = () => {
    setCaption("");
    setVisibility("public");
    setMedias([]);
    setSelectedProfileId("user"); // Reset về user mặc định
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

        {/* Dropdown chọn Tư cách đăng (Chỉ hiện nếu user có thú cưng) */}


        {/* User info & Input */}
        {/* Ở đây ta truyền currentProfile.avatar và currentProfile.name 
           thay vì props gốc. Điều này giúp PostHeaderModal tự động
           cập nhật giao diện (avatar/tên) theo tư cách đã chọn ở dropdown trên.
        */}
        <PostHeaderModal
          avatarURL={currentProfile.avatar}
          userName={currentProfile.name}
          visibility={visibility}
          onVisibilityChange={handleVisibilityChange}
          caption={caption}
          onCaptionChange={setCaption}
          pets={pets}
          selectedProfileId={selectedProfileId}
          onProfileChange={handleProfileChange}
          originalUser={{ name: userName, avatar: avatarURL }} // Cần thông ti
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
        <PostModalActions buttonText="Đăng bài" onSubmit={handleSubmit} />
      </Paper>
    </Modal>
  );
};

export default CreatePostModal;