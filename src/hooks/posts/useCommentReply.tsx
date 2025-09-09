import { useState } from "react";
import type { ReplyRes, ReplyPagination } from "../../types/Comment";
import api from "../../lib/axios";

/**
 * Hook quản lý replies cho 1 comment với phân trang
 */
export const useCommentReply = (
  commentId: string,
  initialPagination?: ReplyPagination // có thể truyền vào từ comment.replies nếu backend trả về sẵn
) => {
  const [replies, setReplies] = useState<ReplyRes[]>(
    initialPagination?.data ?? []
  );
  const [currentPage, setCurrentPage] = useState(
    initialPagination?.current_page ?? 0
  );
  const [lastPage, setLastPage] = useState(initialPagination?.last_page ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 👉 còn trang nữa không
  const hasMore = currentPage < lastPage;

  const loadReplies = async (page?: number) => {
    if (loading) return;

    const targetPage = page ?? currentPage + 1;
    if (targetPage > lastPage && lastPage !== 0) return;

    setLoading(true);
    try {
      const res = await api.get<ReplyPagination>(
        `/comments/${commentId}/replies?page=${targetPage}`
      );

      const pagination = res.data;

      // cập nhật danh sách
      setReplies((prev) =>
        targetPage === 1 ? pagination.data : [...prev, ...pagination.data]
      );
      setCurrentPage(pagination.current_page);
      setLastPage(pagination.last_page);
    } catch (err: any) {
      setError(err.message || "Failed to load replies");
    } finally {
      setLoading(false);
    }
  };

  return {
    replies,
    hasMore,
    loadReplies,
    loading,
    error,
    currentPage,
    lastPage,
  };
};
