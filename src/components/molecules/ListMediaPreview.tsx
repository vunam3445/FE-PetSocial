import type { MediaItem } from "../../types/Post";
import { Box, Typography } from "@mui/material";
import { MediaPreview } from "../atoms/MediaPreview";

interface MediaGalleryProps {
  onRemove: (id: string) => void;
  mediaList: MediaItem[];
}

export const ListMediaPreview: React.FC<MediaGalleryProps> = ({
  mediaList,
  onRemove,
}) => {
  return (
    <Box
      sx={{
        mx: 3,
        mb: 2,
        p: 2,
        backgroundColor: "#f8f9fa",
        borderRadius: 3,
        border: "1px solid #e4e6ea",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: "#65676b",
          fontWeight: 600,
          fontSize: "0.85rem",
        }}
      >
        {mediaList.length} {mediaList.length === 1 ? "item" : "items"} selected
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent:
            mediaList.length === 3 ? "space-between" : "flex-start",
        }}
      >
        {mediaList.slice(0, 4).map((media, index) => (
          <MediaPreview
            key={`${media.media_type}-${index}`}
            media={media}
            index={index}
            totalCount={mediaList.length}
            onClick={() => onRemove(media.id)}
            readonly={!onRemove}
          />
        ))}
      </Box>
    </Box>
  );
};
