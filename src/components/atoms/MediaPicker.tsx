import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";

type MediaItem = File | string;

interface MediaPickerProps {
  media: MediaItem[];
  setMedia: React.Dispatch<React.SetStateAction<MediaItem[]>>;
  multiple?: boolean;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ media, setMedia, multiple = true }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý chọn file mới
  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      setMedia((prev) => [...prev, ...files]);
    }
  };

  // Xóa media
  const handleRemove = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  // Mở hộp chọn file
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      {/* Danh sách media preview */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {media.map((item, index) => {
          const isFile = item instanceof File;
          const url = isFile ? URL.createObjectURL(item) : item;
          const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

          return (
            <div
              key={index}
              style={{
                position: "relative",
                width: "100px",
                height: "100px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {isVideo ? (
                <video
                  src={url}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  controls
                />
              ) : (
                <img
                  src={url}
                  alt={`media-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "rgba(0,0,0,0.5)",
                  color: "white",
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </div>
          );
        })}
      </div>

      {/* Nút chọn media */}
      <IconButton
        color="primary"
        onClick={openFilePicker}
        style={{ marginTop: "8px" }}
      >
        <PhotoCamera />
      </IconButton>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple={multiple}
        style={{ display: "none" }}
        onChange={handleSelectFiles}
      />
    </div>
  );
};

export default MediaPicker;
