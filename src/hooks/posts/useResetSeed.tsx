import { useState, useCallback } from "react";
import { resetSeed } from "../../services/PostService";

export default function useResetSeed() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReset = useCallback(async (callback) => {
    setIsLoading(true);
    setError(null);

    try {
      // Gọi API reset seed ở phía backend
      await resetSeed();
      
      // Nếu có callback (thường là hàm fetch lại bài viết trang 1), thì thực thi
      if (callback && typeof callback === 'function') {
        await callback();
      }
      
      return true;
    } catch (err) {
      console.error("Failed to reset seed:", err);
      setError(err.message || "Không thể làm mới bảng tin");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    handleReset,
    isLoading,
    error
  };
}