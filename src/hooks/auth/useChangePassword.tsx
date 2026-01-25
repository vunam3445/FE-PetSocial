import { useState } from "react";
import { changePassword } from "../../services/authService";

export const useChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangePassword = async (userId: string, data: any) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await changePassword(userId, data);
      setIsSuccess(true);
      return response;
    } catch (err: any) {
      // Lấy message lỗi từ backend (Laravel trả về)
      const errorMessage = err.response?.data?.message || "Đã có lỗi xảy ra khi đổi mật khẩu";
      setError(errorMessage);
      throw err; // Ném lỗi để component có thể catch nếu cần
    } finally {
      setIsLoading(false);
    }
  };

  // Reset trạng thái (dùng khi đóng modal)
  const resetStatus = () => {
    setError(null);
    setIsSuccess(false);
  };

  return { handleChangePassword, isLoading, error, isSuccess, resetStatus };
};