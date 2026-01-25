import { useState } from "react";
import { sendOtp } from "../../services/authService";

export default function useSendOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendOtp(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Đã có lỗi xảy ra khi gửi OTP");
    } finally {
      setLoading(false);
    }
  };

  return { handleSendOtp, loading, error, success };
}