import { Box, IconButton } from "@mui/material";
import type { Media } from "../../types/ResponsePost";

export default function PostMediaDetail({
  media,
  selectedIndex,
  onPrev,
  onNext,
}: {
  media: Media[];
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const current = media[selectedIndex];

  return (
    <Box
      sx={{
        flex: 3,
        bgcolor: "#000",
        display: "flex",
        alignItems: "flex-start", // 👈 cho media bám sát trên
        justifyContent: "center",
        position: "relative",
        overflow: "hidden", // 👈 tránh bị tràn
      }}
    >
      {media.length > 1 && (
        <>
          <IconButton
            onClick={onPrev}
            sx={{
              position: "absolute",
              top: "50%",
              left: 20,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "white" },
              zIndex: 10, // 👈 luôn nằm trên video
            }}
          >
            ◀
          </IconButton>
          <IconButton
            onClick={onNext}
            sx={{
              position: "absolute",
              top: "50%",
              right: 20,
              transform: "translateY(-50%)",
              bgcolor: "rgba(255,255,255,0.7)",
              "&:hover": { bgcolor: "white" },
              zIndex: 10, // 👈 luôn nằm trên video
            }}
          >
            ▶
          </IconButton>
        </>
      )}

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start", // 👈 bám sát top
          justifyContent: "center",
        }}
      >
        {current.media_type === "image" ? (
          <img
            src={current.media_url}
            alt="Post media"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <video
            src={current.media_url}
            controls
            autoPlay
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      {media.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            top: 24,
            right: 24,
            bgcolor: "rgba(0,0,0,0.6)",
            color: "white",
            px: 2,
            py: 0.5,
            borderRadius: 2,
            fontSize: "14px",
            fontWeight: 500,
            zIndex: 10,
          }}
        >
          {selectedIndex + 1} / {media.length}
        </Box>
      )}
    </Box>
  );
}
