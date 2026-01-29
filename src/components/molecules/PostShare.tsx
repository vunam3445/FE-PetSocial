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
  const displayAvatar = sharedPost.pet ? sharedPost.pet.avatar_url : sharedPost.author.avatar_url;
  const displayName = sharedPost.pet ? sharedPost.pet.name : sharedPost.author.name;
  
  // URL điều hướng: Nếu có pet thì về profile pet, nếu không thì về profile user
  const profilePath = sharedPost.pet 
    ? `/pet-health/${sharedPost.pet_id}` 
    : `/profile/${sharedPost.author_id}`;
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
            src={displayAvatar}
            sx={{
              width: 48,
              height: 48,
              border: "2px solid #e3f2fd",
            }}
            onClick={(e) => {
            e.stopPropagation();
            navigate(profilePath); //  chuyển đến profile
          }}
          >
            {displayName}
          </Avatar>
        }
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(profilePath); // 👈 chuyển đến profile
          }}>
            {displayName}
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