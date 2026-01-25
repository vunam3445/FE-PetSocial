import { useState } from "react";
import { verifyOtp } from "../../services/authService";

export default function useVerifyOtp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyOtp = async (email: string, otp: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await verifyOtp(email, otp);
      return { success: true, data: res.data };
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Mã OTP không chính xác";
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  return { handleVerifyOtp, loading, error };
}