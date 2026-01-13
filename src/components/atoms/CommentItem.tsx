import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import type { CommentRes, ReplyRes } from "../../types/Comment";
import { useCommentReply } from "../../hooks/posts/useCommentReply";
import { useDeleteComment } from "../../hooks/posts/useDeleteComment";
import ErrorToast from "../toasts/ErrorToast";
import ConfirmationDialog from "./ConfirmationDialog";

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 604800)}w`;
}

interface CommentItemProps {
  comment: CommentRes;
  onReply: (
    parentId: string,
    text: string,
    callback?: (newReply: ReplyRes) => void
  ) => void;
  onDeleteComment?: (commentId: string) => void; // 👈 tách riêng
  onEdit?: (commentId: string, newText: string) => void;
}

export default function CommentItem({
  comment,
  onReply,
  onDeleteComment,
  onEdit,
}: CommentItemProps) {
  const [deletedReplies, setDeletedReplies] = useState<string[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastText, setToastText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const [localReplies, setLocalReplies] = useState<ReplyRes[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [replyMenu, setReplyMenu] = useState<{
    id: string;
    el: HTMLElement | null;
  }>({ id: "", el: null });

  // dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    type: "comment" | "reply";
  } | null>(null);

  const { deleteComment } = useDeleteComment();
  const { replies, hasMore, loadReplies, loading } = useCommentReply(
    comment.comment_id
  );

  // Thêm reply mới
  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.comment_id, replyText, (newReply: ReplyRes) => {
        setLocalReplies((prev) => [newReply, ...prev]);
      });
      setReplyText("");
      setShowReplyInput(false);
      setShowReplies(true);
    }
  };

  // Mở dialog trước khi xoá
  const openDeleteConfirm = (id: string, type: "comment" | "reply") => {
    setDeleteTarget({ id, type });
    setConfirmOpen(true);
  };

  // Xác nhận xoá
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const success = await deleteComment(deleteTarget.id);
      if (success) {
        if (deleteTarget.type === "reply") {
          // nhớ lại reply đã xoá
          setDeletedReplies((prev) => [...prev, deleteTarget.id]);

          // xoá trong localReplies
          setLocalReplies((prev) =>
            prev.filter((r) => r.comment_id !== deleteTarget.id)
          );
        }
      } else {
        setToastText("Xoá thất bại!");
        setToastOpen(true);
      }
    } catch (err) {
      setToastText("Xoá thất bại!");
      setToastOpen(true);
      console.error("Error deleting:", err);
    } finally {
      setConfirmOpen(false);
      setDeleteTarget(null);
    }
  };

  return (
    <Box
      sx={{ mb: 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Comment chính */}
      <Box
        sx={{ display: "flex", gap: 1.5, mb: 0.5, alignItems: "flex-start" }}
      >
        <Avatar src={comment.user.avatar_url} sx={{ width: 32, height: 32 }}>
          {comment.user.name.charAt(0)}
        </Avatar>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "#f0f2f5",
            padding: "8px 12px",
            borderRadius: "16px",
            opacity: comment.isPending ? 0.6 : 1,
            position: "relative",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {comment.user.name}
          </Typography>
          <Typography variant="body2">{comment.content}</Typography>

          {/* Nút 3 chấm cho comment cha */}
          {hovered && (
            <IconButton
              size="small"
              sx={{ position: "absolute", top: 0, right: 0 }}
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* Menu cho comment cha */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {/* <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onEdit?.(comment.comment_id, comment.content);
            }}
          >
            Sửa bình luận
          </MenuItem> */}
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              onDeleteComment?.(comment.comment_id); // báo ngược lên CommentSection
            }}
          >
            Xóa bình luận
          </MenuItem>
        </Menu>
      </Box>

      {/* Hành động */}
      <Box
        sx={{ ml: 5.5, mb: 1, display: "flex", gap: 2, alignItems: "center" }}
      >
        <Typography variant="caption" color="text.secondary">
          {formatTimeAgo(comment.created_at)}
        </Typography>
        <Button
          size="small"
          onClick={() => setShowReplyInput(!showReplyInput)}
          sx={{
            minWidth: "auto",
            p: 0,
            fontSize: "12px",
            fontWeight: 600,
            color: "text.secondary",
            textTransform: "none",
          }}
        >
          Reply
        </Button>
      </Box>

      {/* Input reply */}
      {showReplyInput && (
        <Box sx={{ ml: 5, mb: 1, display: "flex", gap: 1 }}>
          <TextField
            size="small"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleReplySubmit()}
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#f0f2f5",
                "& fieldset": { border: "none" },
              },
            }}
          />
          <IconButton onClick={handleReplySubmit} disabled={!replyText.trim()}>
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
            </svg>{" "}
          </IconButton>
        </Box>
      )}

      {/* Hiện nút xem reply */}
      {!showReplies && comment.replies_count > 0 && (
        <Box sx={{ ml: 7, mt: 0.5 }}>
          <Button
            size="small"
            onClick={() => {
              setShowReplies(true);
              loadReplies(1);
            }}
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "primary.main",
              textTransform: "none",
              p: 0,
            }}
          >
            View {comment.replies_count}{" "}
            {comment.replies_count > 1 ? "replies" : "reply"}
          </Button>
        </Box>
      )}

      {/* Danh sách reply */}
      {showReplies &&
        [...localReplies, ...replies]
          .filter((r) => !deletedReplies.includes(r.comment_id)) // 👈 lọc bỏ reply đã xoá
          .map((reply) => (
            <Box key={reply.comment_id} sx={{ ml: 7, mb: 1 }}>
              <Box sx={{ display: "flex", gap: 1, position: "relative" }}>
                <Avatar
                  src={reply.user.avatar_url}
                  sx={{ width: 24, height: 24 }}
                >
                  {reply.user.name.charAt(0)}
                </Avatar>
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: "#f0f2f5",
                    padding: "6px 10px",
                    borderRadius: "12px",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: "12px" }}
                  >
                    {reply.user.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "13px" }}>
                    {reply.content}
                  </Typography>

                  {/* Nút 3 chấm cho reply */}
                  <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 0, right: 0 }}
                    onClick={(e) =>
                      setReplyMenu({
                        id: reply.comment_id,
                        el: e.currentTarget,
                      })
                    }
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>

              <Box
                sx={{
                  ml: 7.5,
                  mt: 0.3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(reply.created_at)}
                </Typography>
                <Button
                  size="small"
                  sx={{
                    minWidth: "auto",
                    p: 0,
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "text.secondary",
                    textTransform: "none",
                  }}
                >
                  Reply
                </Button>
              </Box>
            </Box>
          ))}

      {/* Menu cho reply */}
      <Menu
        anchorEl={replyMenu.el}
        open={Boolean(replyMenu.el)}
        onClose={() => setReplyMenu({ id: "", el: null })}
      >
        <MenuItem
          onClick={() => {
            setReplyMenu({ id: "", el: null });
            openDeleteConfirm(replyMenu.id, "reply");
          }}
        >
          Xoá phản hồi
        </MenuItem>
      </Menu>

      {/* Nút xem thêm reply */}
      {showReplies && hasMore && (
        <Box sx={{ ml: 7, mt: 0.5 }}>
          <Button
            size="small"
            onClick={() => loadReplies()}
            disabled={loading}
            sx={{
              fontSize: "12px",
              fontWeight: 600,
              color: "primary.main",
              textTransform: "none",
              p: 0,
            }}
          >
            {loading ? "Loading..." : "View more replies"}
          </Button>
        </Box>
      )}

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
