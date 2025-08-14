import React from "react";
import { Modal, Backdrop, Fade, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

interface Media {
  media_id: string;
  post_id: string;
  media_url: string;
  media_type: "image" | "video";
  order: number;
  created_at: string;
  updated_at: string;
}

interface PostLightboxModalProps {
  open: boolean;
  mediaList: Media[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const PostLightboxModal: React.FC<PostLightboxModalProps> = ({
  open,
  mediaList,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { backgroundColor: "rgba(0, 0, 0, 0.9)" },
      }}
    >
      <Fade in={open}>
        <div>
          {/* Prev Button */}
          {mediaList.length > 1 && (
            <IconButton
              onClick={onPrev}
              sx={{
                position: "fixed",
                top: "50%",
                left: 20,
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 2000,
                "&:hover": { backgroundColor: "white" },
              }}
            >
              ◀
            </IconButton>
          )}

          {/* Next Button */}
          {mediaList.length > 1 && (
            <IconButton
              onClick={onNext}
              sx={{
                position: "fixed",
                top: "50%",
                right: 20,
                transform: "translateY(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 2000,
                "&:hover": { backgroundColor: "white" },
              }}
            >
              ▶
            </IconButton>
          )}

          {/* Media Container */}
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90vw",
              maxHeight: "90vh",
              outline: "none",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={onClose}
              sx={{
                position: "absolute",
                top: 20,
                right: 20,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                zIndex: 1000,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 1)",
                },
              }}
            >
              <Close />
            </IconButton>

            {/* Media Display */}
            {mediaList[selectedIndex] &&
              (mediaList[selectedIndex].media_type === "image" ? (
                <img
                  src={mediaList[selectedIndex].media_url}
                  alt="Enlarged media"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <video
                  src={mediaList[selectedIndex].media_url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  controls
                  autoPlay
                />
              ))}
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default PostLightboxModal;
