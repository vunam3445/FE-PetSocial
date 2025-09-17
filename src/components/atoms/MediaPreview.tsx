import React, { useState, useEffect } from "react";

import { Box, IconButton } from "@mui/material";
import { Close, PlayArrow } from "@mui/icons-material";
import type { MediaItem } from "../../types/Post";
interface MediaPreviewProps {
  media: MediaItem;
  index: number;
  totalCount: number;
  onClick?: () => void; // thêm dòng này
  readonly?: boolean; // 👈 thêm prop này

}


export const MediaPreview: React.FC<MediaPreviewProps> = ({
  media,
  index,
  totalCount,
  onClick,
  readonly,
}) => {
  const [preview, setPreview] = useState<string>();
  useEffect(() => {
    if (media.file) {
      const url = URL.createObjectURL(media.file);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [media.file]);

  useEffect(()=>{
    if (media.media_url) {
      setPreview(media.media_url);
    }
  },[media.media_url])


  const getGridStyle = (): React.CSSProperties => {
    if (totalCount === 1) {
      return { width: "100%", height: "300px" };
    } else if (totalCount === 2) {
      return { width: "49%", height: "200px" };
    } else if (totalCount === 3) {
      if (index === 0) {
        return { width: "58%", height: "250px" };
      } else {
        return { width: "40%", height: "122px" };
      }
    } else {
      return { width: "49%", height: "150px" };
    }
  };

  const showMoreOverlay: boolean = totalCount > 4 && index === 3;
  return (
    <Box
      sx={{
        position: "relative",
        ...getGridStyle(),
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#f0f2f5",
        cursor: "pointer",
        "&:hover .remove-btn": {
          opacity: 1,
        },
      }}
    >
      {media.media_type === "image" ? (
        <img
          src={preview}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <video
            src={preview}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <PlayArrow
            sx={{
              position: "absolute",
              fontSize: 48,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.6)",
              borderRadius: "50%",
              p: 1,
            }}
          />
        </Box>
      )}

      {showMoreOverlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "1.5rem",
            fontWeight: 600,
          }}
        >
          +{totalCount - 4} more
        </Box>
      )}

{!readonly && (
  <IconButton
    className="remove-btn"
    onClick={onClick}
    sx={{
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "rgba(0,0,0,0.7)",
      color: "white",
      opacity: 0,
      transition: "opacity 0.2s",
      "&:hover": {
        backgroundColor: "rgba(0,0,0,0.8)",
      },
    }}
  >
    <Close fontSize="small" />
  </IconButton>
)}

    </Box>
  );
};
