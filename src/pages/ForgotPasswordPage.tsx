import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoadingOverlay } from "../components/loadings/LoadingOverlay";
import ErrorToast from "../components/toasts/ErrorToast";
import useSendOtp from "../hooks/auth/useSendOtp";
import useResetPassword from "../hooks/auth/useResetPassword";
import useVerifyOtp from "../hooks/auth/useVerifyOtp";

export const ForgotPasswordPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [errorToast, setErrorToast] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [passwordForm, setPasswordForm] = useState({ newPassword: "", confirmPassword: "" });

  const navigate = useNavigate();

  // Khai báo các Hook
  const { handleSendOtp: sendOtpLogic, loading: sendOtpLoading, error, success } = useSendOtp();
  const { handleVerifyOtp: verifyOtpLogic, loading: verifyLoading } = useVerifyOtp();
  const { handleResetPassword: resetPassLogic, loading: resetLoading } = useResetPassword();

  // Bước 1: Gửi OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await sendOtpLogic(email);
    // Lưu ý: useSendOtp trả về success/error tùy theo cách bạn viết, 
    // Giả sử logic hook trả về object { success: boolean, message?: string }
    if (success) {
      setStep(2);
    } else {
      setErrorText(error || "Không thể gửi mã OTP");
      setErrorToast(true);
    }
  };

  // Bước 2: Xác thực OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    // Chuyển otp sang kiểu number nếu API yêu cầu
    const result = await verifyOtpLogic(email, Number(otp));
    
    if (result.success) {
      setStep(3);
    } else {
      setErrorText(result.error || "Mã OTP không hợp lệ");
      setErrorToast(true);
    }
  };

  // Bước 3: Đặt lại mật khẩu
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setErrorText("Mật khẩu xác nhận không khớp!");
      setErrorToast(true);
      return;
    }

    const result = await resetPassLogic(
      email, 
      passwordForm.newPassword, 
      passwordForm.confirmPassword
    );

    if (result.success) {
      navigate("/login");
    } else {
      setErrorText(result.error || "Lỗi khi đặt lại mật khẩu");
      setErrorToast(true);
    }
  };

  // Tổng hợp trạng thái loading từ tất cả các hook
  const isGlobalLoading = sendOtpLoading || verifyLoading || resetLoading;

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-50">
      {isGlobalLoading && <LoadingOverlay text="Đang xử lý..." />}
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {step === 1 && "Quên mật khẩu?"}
            {step === 2 && "Xác thực OTP"}
            {step === 3 && "Đặt lại mật khẩu"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {step === 1 && "Nhập email của bạn để nhận mã khôi phục."}
            {step === 2 && `Mã đã được gửi đến ${email}`}
            {step === 3 && "Thiết lập mật khẩu mới cho tài khoản của bạn."}
          </p>
        </div>

        {/* STEP 1: INPUT EMAIL */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <input
              type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Email của bạn"
            />
            <button type="submit" className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700">
              Tiếp tục
            </button>
          </form>
        )}

        {/* STEP 2: INPUT OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input
              type="text" required value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 text-2xl tracking-widest text-center border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="000000"
            />
            <button type="submit" className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700">
              Xác nhận mã
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500 hover:underline">
              Quay lại nhập email
            </button>
          </form>
        )}

        {/* STEP 3: NEW PASSWORD */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <input
              type="password" required placeholder="Mật khẩu mới"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password" required placeholder="Xác nhận mật khẩu mới"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700">
              Đổi mật khẩu
            </button>
          </form>
        )}

        <div className="text-center">
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>

      <ErrorToast open={errorToast} onClose={() => setErrorToast(false)} text={errorText} />
    </div>
  );
};