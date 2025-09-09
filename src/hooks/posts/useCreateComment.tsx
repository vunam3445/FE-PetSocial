import { useState } from "react";
import api from "../../lib/axios";
import type { SubmitComment } from "../../types/Comment";


export const useCreateComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createComment = async (postId: string, data: SubmitComment) => {
    try {
      setLoading(true);
      setError(null);

      // Gọi API: POST /posts/{postId}/comments
      const res = await api.post(`/posts/${postId}/comments`, data);

      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createComment, loading, error };
};
