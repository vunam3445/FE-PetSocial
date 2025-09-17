// hooks/useFollow.tsx
import { useState } from "react";
import api from "../../lib/axios";

export const useFollow = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const follow = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post(`/users/${userId}/follow`);
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
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { follow, loading, error };
};
