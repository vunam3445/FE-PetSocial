import { CardActions, Box, Button } from "@mui/material";
import { Favorite, FavoriteBorder, Comment, Share } from "@mui/icons-material";

interface PostActionsProps {
  liked: boolean;
  likesCount: number;
  commentsCount: number;
  onLike: (e: React.MouseEvent) => void;
  onComment: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

export const PostActions = ({
  liked,
  likesCount,
  commentsCount,
  onLike,
  onComment,
  onShare,
}: PostActionsProps) => {
  return (
    <CardActions sx={{ px: 2, py: 1.5, justifyContent: "space-between" }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button
          startIcon={liked ? <Favorite /> : <FavoriteBorder />}
          onClick={onLike}
          sx={{
            textTransform: "none",
            color: liked ? "#e91e63" : "text.secondary",
            fontWeight: 500,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: liked
                ? "rgba(233, 30, 99, 0.08)"
                : "rgba(25, 118, 210, 0.08)",
            },
          }}
        >
          {likesCount} Thích
        </Button>

        <Button
          startIcon={<Comment />}
          onClick={onComment}
          sx={{
            textTransform: "none",
            color: "text.secondary",
            fontWeight: 500,
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.08)",
            },
          }}
        >
          {commentsCount} Bình luận
        </Button>
      </Box>
      
      <Button
        startIcon={<Share />}
        onClick={onShare}
        sx={{
          textTransform: "none",
          color: "text.secondary",
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
          },
        }}
      >
        Chia sẻ
      </Button>
    </CardActions>
  );
};