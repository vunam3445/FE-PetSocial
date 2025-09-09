import { Box } from "@mui/material";
import type { MediaItem } from "../../types/Post";

interface MediaGridProps {
  media: MediaItem[];
  onMediaClick: (media: MediaItem) => void;
}

export const MediaGrid = ({ media, onMediaClick }: MediaGridProps) => {
  if (!media || media.length === 0) return null;

  return (
    <Box sx={{ px: 0, mt: 1.5 }}>
      <Box
        sx={{
          display: "grid",
          gap: "2px",
          borderRadius: "8px",
          overflow: "hidden",
          ...(media.length === 1 && { gridTemplateColumns: "1fr" }),
          ...(media.length === 2 && {
            gridTemplateColumns: "1fr 1fr",
          }),
          ...(media.length === 3 && {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }),
          ...(media.length >= 4 && {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }),
        }}
      >
        {(media.length > 4 ? media.slice(0, 4) : media).map((mediaItem, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onMediaClick(mediaItem);
            }}
            sx={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              aspectRatio: "1 / 1",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              },
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              ...(media.length === 3 &&
                index === 0 && {
                  gridRow: "1 / 3",
                  aspectRatio: "auto",
                }),
            }}
          >
            {mediaItem.media_type === "image" ? (
              <img
                src={mediaItem.media_url}
                alt="Post media"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            ) : (
              <video
                src={mediaItem.media_url}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                muted
                preload="auto"
              />
            )}
            {media.length > 4 && index === 3 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                +{media.length - 4}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};