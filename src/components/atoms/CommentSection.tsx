import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import type { CommentRes, ReplyRes } from "../../types/Comment";
import CommentItem from "./CommentItem";
import CommentSkeleton from "../skeleton/CommentSkeleton";
import { useCreateComment } from "../../hooks/posts/useCreateComment";
import { useDeleteComment } from "../../hooks/posts/useDeleteComment";
import ErrorToast from "../toasts/ErrorToast";
import ConfirmationDialog from "./ConfirmationDialog";

export default function CommentSection({
  comments,
  onAddComment,
  loading = false,
}: {
  comments: CommentRes[];
  onAddComment: (text: string) => void;
  loading?: boolean;
}) {
  const [newComment, setNewComment] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [commentList, setCommentList] = useState<CommentRes[]>(comments);

  // state cho dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );

  const { deleteComment } = useDeleteComment();
  const { createComment } = useCreateComment();

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  // Mở dialog xác nhận
  const handleOpenDeleteDialog = (commentId: string) => {
    setSelectedCommentId(commentId);
    setConfirmOpen(true);
  };

  // Xác nhận xoá comment
  const handleConfirmDelete = async () => {
    if (!selectedCommentId) return;
    try {
      const success = await deleteComment(selectedCommentId);
      if (success) {
        setCommentList((prev) =>
          prev.filter((c) => c.comment_id !== selectedCommentId)
        );
      } else {
        setToastText("Xoá bình luận thất bại!");
        setToastOpen(true);
      }
    } catch (err) {
      setToastText("Xoá bình luận thất bại!");
      setToastOpen(true);
      console.error("Failed to delete comment:", err);
    } finally {
      setConfirmOpen(false);
      setSelectedCommentId(null);
    }
  };

  // Reply cho comment
  const handleReply = async (
    parentId: string,
    text: string,
    onSuccess?: (reply: ReplyRes) => void
  ) => {
    try {
      const newReply = await createComment(comments[0].post_id, {
        content: text,
        parent_id: parentId,
      });
      if (newReply) {
        onSuccess?.(newReply);
      }
    } catch (err) {
      console.error("Failed to reply:", err);
    }
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        ({commentList.length}) Bình luận
      </Typography>

      {/* Danh sách comment hoặc skeleton */}
      <Box sx={{ flex: 1, overflowY: "auto", mb: 2, pr: 1 }}>
        {loading ? (
          <>
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </>
        ) : (
          commentList.map((comment) => (
            <CommentItem
              key={comment.comment_id}
              comment={comment}
              onReply={handleReply}
              onDeleteComment={(id) => handleOpenDeleteDialog(id)} // 👈 đúng prop
            />
          ))
        )}
      </Box>

      {/* Form thêm comment mới */}
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          borderRadius: 3,
          position: "sticky",
          bottom: 0,
          zIndex: 1,
        }}
      >
        {/* <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "primary.main" }}>
          U
        </Avatar> */}
        <TextField
          fullWidth
          variant="standard"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          InputProps={{ disableUnderline: true }}
        />
        <IconButton type="submit" disabled={!newComment.trim()} sx={{ ml: 1 }}>
           <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </IconButton>
      </Paper>

      <ErrorToast
        open={toastOpen}
        text={toastText}
        onClose={() => setToastOpen(false)}
      />

      {/* Dialog xác nhận */}
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
