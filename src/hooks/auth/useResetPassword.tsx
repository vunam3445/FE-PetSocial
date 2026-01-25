import { useState } from "react";
import { resetPassword } from "../../services/authService";

export default function useResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResetPassword = async (email: string, pass: string, confirmPass: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await resetPassword(email, pass, confirmPass);
      setIsSuccess(true);
      return { success: true };
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Không thể đặt lại mật khẩu";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { handleResetPassword, loading, error, isSuccess };
}