import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export type Media = {
  media_id: string;
  post_id: string;
  media_url: string;
  media_type: "image" | "video";
  order: number;
  created_at: string;
  updated_at: string;
};

export type Author = {
  user_id: string;
  name: string;
  avatar_url: string;
};

export type Post = {
  post_id: string;
  author_id: string;
  caption: string | null;
  visibility: "public" | "friends" | "private";
  shared_post_id: string | null;
  group_id: string | null;
  created_at: string;
  updated_at: string;
  media: Media[];
  author: Author;
};

interface Comment {
  id: string;
  author: {
    user_id: string;
    name: string;
    avatar_url: string;
  };
  text: string;
  created_at: string;
}

interface PostDetailModalProps {
  post: Post;
  open: boolean;
  onClose: () => void;
}

// Mock comments data
const generateMockComments = (postId: string): Comment[] => [
  {
    id: `${postId}_comment_1`,
    author: {
      user_id: "user_123",
      name: "Mike Chen",
      avatar_url: "https://i.pravatar.cc/150?u=mike",
    },
    text: "Wow, this looks absolutely stunning! The composition is perfect.",
    created_at: "2024-01-15T10:30:00Z",
  },
  {
    id: `${postId}_comment_2`,
    author: {
      user_id: "user_456",
      name: "Emma Davis",
      avatar_url: "https://i.pravatar.cc/150?u=emma",
    },
    text: "Your photos are always so inspiring! I need to visit this place soon 📸",
    created_at: "2024-01-15T11:15:00Z",
  },
  {
    id: `${postId}_comment_3`,
    author: {
      user_id: "user_789",
      name: "Alex Rivera",
      avatar_url: "https://i.pravatar.cc/150?u=alex",
    },
    text: "The lighting in this shot is incredible. What camera settings did you use?",
    created_at: "2024-01-15T12:00:00Z",
  },
  {
    id: `${postId}_comment_4`,
    author: {
      user_id: "user_101",
      name: "Lisa Park",
      avatar_url: "https://i.pravatar.cc/150?u=lisa",
    },
    text: "This makes me miss traveling so much! Beautiful capture 🌟",
    created_at: "2024-01-15T12:45:00Z",
  },
  {
    id: `${postId}_comment_5`,
    author: {
      user_id: "user_202",
      name: "John Smith",
      avatar_url: "https://i.pravatar.cc/150?u=john",
    },
    text: "Amazing work! The colors are so vibrant and natural.",
    created_at: "2024-01-15T13:20:00Z",
  },
  {
    id: `${postId}_comment_6`,
    author: {
      user_id: "user_303",
      name: "Maria Garcia",
      avatar_url: "https://i.pravatar.cc/150?u=maria",
    },
    text: "Adding this location to my bucket list! Thanks for sharing 🗺️",
    created_at: "2024-01-15T14:10:00Z",
  },
];

function ExpandableCaption({
  caption,
  maxLength = 200,
}: {
  caption: string;
  maxLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = caption.length > maxLength;

  if (!shouldTruncate) {
    return (
      <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
        {caption}
      </Typography>
    );
  }

  return (
    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
      {isExpanded ? caption : `${caption.substring(0, maxLength)}...`}
      <Typography
        component="span"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          fontWeight: 500,
          ml: 0.5,
          "&:hover": { textDecoration: "underline" },
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? " See less" : " See more"}
      </Typography>
    </Typography>
  );
}

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
  return `${Math.floor(diffInSeconds / 604800)}w`;
}

function CommentSection({
  comments,
  onAddComment,
}: {
  comments: Comment[];
  onAddComment: (text: string) => void;
}) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Comments ({comments.length})
      </Typography>

      <Box sx={{ flex: 1, overflowY: "auto", mb: 2, pr: 1 }}>
        {comments.map((comment) => (
          <div key={comment.id}>
            <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
              <Avatar
                src={comment.author.avatar_url}
                sx={{
                  width: 32,
                  height: 32,
                  flexShrink: 0,
                }}
              >
                {comment.author.name.charAt(0)}
              </Avatar>
              <Box
                sx={{
                  flex: 1,
                  backgroundColor: "#f0f2f5",
                  padding: "8px 12px",
                  borderRadius: "16px",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: "13px", mb: 0.25 }}
                >
                  {comment.author.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", lineHeight: 1.4 }}
                >
                  {comment.text}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ ml: 5.5, display: "block", mb: 1 }}
            >
              {formatTimeAgo(comment.created_at)}
            </Typography>
          </div>
        ))}
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "primary.main" }}>
          You
        </Avatar>
        <TextField
          fullWidth
          variant="standard"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{ disableUnderline: true }}
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "14px",
              py: 1,
            },
          }}
        />
        <IconButton type="submit" disabled={!newComment.trim()} sx={{ ml: 1 }}>
          <span style={{ fontSize: "18px" }}>📤</span>
        </IconButton>
      </Paper>
    </Box>
  );
}

export default function PostDetailModal({
  post,
  open,
  onClose,
}: PostDetailModalProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [comments, setComments] = useState<Comment[]>(() =>
    generateMockComments(post.post_id)
  );
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  // Sort media by order and check if media exists
  const sortedMedia = [...post.media].sort((a, b) => a.order - b.order);
  const hasMedia = sortedMedia.length > 0;

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: `${post.post_id}_comment_${Date.now()}`,
      author: {
        user_id: "current_user",
        name: "You",
        avatar_url: "",
      },
      text: text,
      created_at: new Date().toISOString(),
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handlePrevMedia = () => {
    setSelectedMediaIndex((prev) =>
      prev === 0 ? sortedMedia.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setSelectedMediaIndex((prev) =>
      prev === sortedMedia.length - 1 ? 0 : prev + 1
    );
  };

  const modalStyle = {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    bgcolor: "background.paper",
    overflow: "hidden",
    display: "flex",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    justifyContent: hasMedia ? "flex-start" : "center",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 1000,
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          ✕
        </IconButton>

        {/* Media Section - Only render if media exists */}
        {hasMedia && (
          <Box
            sx={{
              flex: isMobile ? "0 0 40%" : "3",
              bgcolor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Prev Button */}
            {sortedMedia.length > 1 && (
              <IconButton
                onClick={handlePrevMedia}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 20,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 100,
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                ◀
              </IconButton>
            )}

            {/* Next Button */}
            {sortedMedia.length > 1 && (
              <IconButton
                onClick={handleNextMedia}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 20,
                  transform: "translateY(-50%)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  zIndex: 100,
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                ▶
              </IconButton>
            )}

            {/* Current Media Display */}
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {sortedMedia[selectedMediaIndex] &&
                (sortedMedia[selectedMediaIndex].media_type === "image" ? (
                  <img
                    src={sortedMedia[selectedMediaIndex].media_url}
                    alt="Post media"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <video
                    src={sortedMedia[selectedMediaIndex].media_url}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    controls
                    autoPlay
                  />
                ))}

              {/* Media Counter */}
              {sortedMedia.length > 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    px: 2,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {selectedMediaIndex + 1} / {sortedMedia.length}
                </Box>
              )}
            </Box>
          </Box>
        )}

        {/* Content Section - Adaptive width based on media presence */}
        <Box
          sx={{
            flex: isMobile ? 1 : hasMedia ? "2" : "none",
            width: hasMedia ? "auto" : isMobile ? "100%" : "70vw",
            maxWidth: hasMedia ? "none" : "900px",
            display: "flex",
            flexDirection: "column",
            borderLeft: isMobile || !hasMedia ? "none" : "1px solid #e4e6ea",
          }}
        >
          {/* Post Header */}
          <Box sx={{ p: 3, borderBottom: "1px solid #e4e6ea" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar
                src={post.author.avatar_url}
                sx={{ width: 48, height: 48, mr: 2 }}
              >
                {post.author.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, lineHeight: 1.2 }}
                >
                  {post.author.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatTimeAgo(post.created_at)}
                </Typography>
              </Box>
            </Box>

            {post.caption && (
              <ExpandableCaption
                caption={post.caption}
                maxLength={post.caption.length}
              />
            )}
          </Box>

          {/* Comments Section - Takes up remaining space */}
          <Box sx={{ flex: 1, p: 3, minHeight: 0 }}>
            <CommentSection
              comments={comments}
              onAddComment={handleAddComment}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
