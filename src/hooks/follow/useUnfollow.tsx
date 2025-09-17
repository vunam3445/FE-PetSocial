// hooks/useUnfollow.tsx
import { useState } from "react";
import api from "../../lib/axios";

export const useUnfollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unfollow = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.delete(`/users/${userId}/follow`);
      if (res.status === 200) return true;
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 429) {
          setError("Bạn thao tác quá nhanh, vui lòng thử lại sau.");
        } else {
          setError(err.response.data?.message || "Có lỗi xảy ra.");
        }
      } else {
        setError("Không thể kết nối server.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { unfollow, loading, error };
};
