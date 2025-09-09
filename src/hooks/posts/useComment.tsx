// hooks/useComments.tsx
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import type { CommentResponse } from "../../types/Comment";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<CommentResponse["data"]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API: GET /posts/{postId}/comments
      const res = await api.get(`/posts/${postId}/comments`);
      setComments(res.data.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Tự động gọi khi postId thay đổi
  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return { comments, loading, error, refresh: fetchComments };
};
