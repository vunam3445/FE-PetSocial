import { useState } from "react";
import api from "../../lib/axios";

export const useLike = () => {
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async (postId: string) => {
    try {
      setError(null);

      // Gửi request toggle like
      const res = await api.post(`/posts/${postId}/likes`, null, {
        headers: { "Content-Type": "application/json" },
      });

      return res.data; // { liked: "true" | "false" }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      throw err;
    } 
  };

  return { toggleLike, error };
};
