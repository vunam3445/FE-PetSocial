// components/posts/MediaUploadButtons.tsx
import React from "react";
import { IconButton, Box, Typography } from "@mui/material";
import { PhotoCamera, Videocam } from "@mui/icons-material";
interface MediaUploadButtonsProps {
  onImageUpload: (files: File[]) => void;
  onVideoUpload: (files: File[]) => void;
}

export const MediaUploadButtons: React.FC<MediaUploadButtonsProps> = ({
  onImageUpload,
  onVideoUpload,
}) => (
  <Box
    sx={{
      mx: 3,
      mb: 3,
      p: 2.5,
      border: "1px solid #e4e6ea",
      borderRadius: 3,
      backgroundColor: "#fafbfc",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "#1c1e21",
          fontWeight: 600,
          fontSize: "0.95rem",
        }}
      >
        Add to your post
      </Typography>
      <Box sx={{ display: "flex", gap: 1 }}>
        {/* Image upload */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={(e) => {
            if (!e.target.files) return;
            onImageUpload(Array.from(e.target.files)); // ✅ chuyển FileList thành File[]
          }}
          multiple
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <IconButton
            component="span"
            sx={{
              backgroundColor: "#e7f3ff",
              width: 44,
              height: 44,
              "&:hover": {
                backgroundColor: "#d0e9ff",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s",
            }}
          >
            <PhotoCamera sx={{ color: "#1877f2", fontSize: 20 }} />
          </IconButton>
        </label>

        {/* Video upload */}
        <input
          type="file"
          accept=".mp4"
          onChange={(e) => {
            if (!e.target.files) return;
            onVideoUpload(Array.from(e.target.files));
          }}
          multiple
          style={{ display: "none" }}
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <IconButton
            component="span"
            sx={{
              backgroundColor: "#ffe7e7",
              width: 44,
              height: 44,
              "&:hover": {
                backgroundColor: "#ffd0d0",
                transform: "scale(1.05)",
              },
              transition: "all 0.2s",
            }}
          >
            <Videocam sx={{ color: "#f44336", fontSize: 20 }} />
          </IconButton>
        </label>
      </Box>
    </Box>
  </Box>
);
