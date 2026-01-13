import { Box, CardHeader, Avatar, Typography } from "@mui/material";
import { PostCaption } from "../atoms/PostCaption";
import { MediaGrid } from "../atoms/MediaGrid";
import type { Media, Post } from "../../types/ResponsePost";
import { useNavigate } from "react-router-dom";
interface SharedPostProps {
  sharedPost: Post;
  onDetailPost: () => void;
  onMediaClick: (media: Media) => void;
}

export const SharedPost = ({ sharedPost, onDetailPost, onMediaClick }: SharedPostProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        borderRadius: 2,
        p: 1,
        mt: 1,
        backgroundColor: "#f9f9f9",
      }}
      onClick={(e) => {
        e.stopPropagation();
        onDetailPost();
      }}
    >
      <MediaGrid media={sharedPost.media} onMediaClick={onMediaClick} />
      <CardHeader
        avatar={
          <Avatar
            src={sharedPost.author.avatar_url}
            sx={{
              width: 48,
              height: 48,
              border: "2px solid #e3f2fd",
            }}
            onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${sharedPost.author_id}`); // 👈 chuyển đến profile
          }}
          >
            {sharedPost.author.name}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${sharedPost.author_id}`); // 👈 chuyển đến profile
          }}>
            {sharedPost.author.name}
          </Typography>
        }
        sx={{ pb: 1 }}
      />
      
      {sharedPost.caption && (
        <PostCaption
          caption={sharedPost.caption}
          maxChars={280}
          onExpand={onDetailPost}
        />
      )}
    </Box>
  );
};