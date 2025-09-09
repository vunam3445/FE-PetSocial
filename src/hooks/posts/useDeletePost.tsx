import { useState } from "react";
import api from "../../lib/axios";

export const useDeletePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (postId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.delete(`/posts/${postId}`);
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

  return { deletePost, loading, error };
};
