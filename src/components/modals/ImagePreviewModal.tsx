import React from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ImagePreviewModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ imageUrl, onClose }) => {
  return (
    <Modal
      open={!!imageUrl}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.9)", // Làm nền tối hơn một chút để nổi bật ảnh
        zIndex: 1400, // Đảm bảo nằm trên các menu khác
      }}
    >
      <Box 
        sx={{ 
          position: "relative", 
          outline: "none", 
          maxWidth: "95vw", 
          maxHeight: "95vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Nút đóng Modal - Tối ưu vị trí để không bị khuất trên màn hình nhỏ */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: { xs: -50, sm: -10 }, // Di động nằm trên ảnh, Desktop nằm góc ảnh
            right: { xs: 0, sm: -50 },
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" }
          }}
        >
          <CloseIcon />
        </IconButton>

        {/* Ảnh phóng to */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "4px",
              boxShadow: "0px 4px 20px rgba(0,0,0,0.5)",
            }}
          />
        )}
      </Box>
    </Modal>
  );
};

export default ImagePreviewModal;