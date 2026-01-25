// hooks/posts/useComments.tsx
import { useState, useEffect, useCallback } from "react";
import api from "../../lib/axios";
import type { CommentRes } from "../../types/Comment";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<CommentRes[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchComments = useCallback(async (isRefresh = false) => {
    if (!postId) return;
    
    try {
      setLoading(true);
      const currentPage = isRefresh ? 1 : page;
      const res = await api.get(`/posts/${postId}/comments?page=${currentPage}`);
      
      const newComments = res.data.data;
      
      setComments(prev => isRefresh ? newComments : [...prev, ...newComments]);
      setHasMore(res.data.current_page < res.data.last_page);
      if (!isRefresh) setPage(prev => prev + 1);
    } catch (err) {
      console.error("Fetch comments error:", err);
    } finally {
      setLoading(false);
    }
  }, [postId, page]);

  // Reset khi đổi post
  useEffect(() => {
    setComments([]);
    setPage(1);
    setHasMore(true);
    fetchComments(true);
  }, [postId]);

  return { comments, loading, hasMore, loadMore: fetchComments, setComments };
};