import { useState } from "react";
import api from "../../lib/axios";

export function useDeleteComment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteComment = async (commentId: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);

      await api.delete(`/comments/${commentId}`);

      return true; // xoá thành công
    } catch (err: any) {
      setError(err.response?.data?.message || "Delete failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteComment, loading, error };
}
