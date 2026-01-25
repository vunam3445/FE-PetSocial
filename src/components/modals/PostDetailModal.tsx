import { Modal, Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ExpandableCaption from "../atoms/ExpandableCaption";
import PostHeader from "../atoms/PostDetailHeader";
import PostMediaDetail from "../atoms/PostMediaDetail";
import type { Post } from "../../types/ResponsePost";
import { useCreateComment } from "../../hooks/posts/useCreateComment";
import { useComments } from "../../hooks/posts/useComment";
import CommentSection from "../atoms/CommentSection";

interface Props {
  post: Post;
  open: boolean;
  onClose: () => void;
  onCommentAdded?: (postId: string) => void;
}
export default function PostDetailModal({
  post,
  open,
  onClose,
  onCommentAdded,
}: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const { createComment } = useCreateComment();
  const { comments, loading, hasMore, loadMore, setComments } = useComments(
    post.post_id,
  );
  const displayPost = post.shared_post ?? post;
  const sortedMedia = [...(displayPost.media || [])].sort(
    (a, b) => a.order - b.order,
  );

  const handleAddComment = async (text: string) => {
    try {
      const newComment = await createComment(post.post_id, { content: text });
      if (newComment) {
        // Thêm vào đầu danh sách ngay lập tức
        setComments((prev) => [newComment, ...prev]);
        onCommentAdded?.(post.post_id);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: sortedMedia.length === 0 ? "center" : "flex-start",
          alignItems: "flex-start",
          overflowY: "auto",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%", // ép thành hình tròn
            width: 40, // đặt chiều rộng
            height: 40, // đặt chiều cao = width
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          ✕
        </IconButton>

        {sortedMedia.length > 0 && (
          <PostMediaDetail
            media={sortedMedia}
            selectedIndex={selectedMediaIndex}
            onPrev={() =>
              setSelectedMediaIndex(
                selectedMediaIndex === 0
                  ? sortedMedia.length - 1
                  : selectedMediaIndex - 1,
              )
            }
            onNext={() =>
              setSelectedMediaIndex(
                selectedMediaIndex === sortedMedia.length - 1
                  ? 0
                  : selectedMediaIndex + 1,
              )
            }
          />
        )}

        <Box
          sx={{
            flex: isMobile ? 1 : sortedMedia.length > 0 ? "2" : "unset",
            borderLeft:
              isMobile || sortedMedia.length === 0
                ? "none"
                : "1px solid #e4e6ea",
            display: "flex",
            flexDirection: "column",
            width: sortedMedia.length === 0 ? "600px" : "auto",
            mt: sortedMedia.length === 0 ? 4 : 0,
          }}
        >
          <Box sx={{ p: 3, borderBottom: "1px solid #e4e6ea" }}>
            <PostHeader
              author={displayPost.author}
              createdAt={displayPost.updated_at}
            />
            {displayPost.caption && (
              <ExpandableCaption caption={displayPost.caption} />
            )}
          </Box>

          <Box sx={{ flex: 1, p: 3, minHeight: 0 }}>
            <CommentSection
              comments={comments} // Không cần localComments nữa vì setComments đã quản lý
              onAddComment={handleAddComment}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={() => loadMore()}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
