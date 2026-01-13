import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../../services/authService";
import { LoadingOverlay } from "../loadings/LoadingOverlay";
import { OTPInput } from "../atoms/OtpInput";
import axios from "axios";
export const RegisterForm = ({
  onSuccess,
}: {
  onSuccess: (email: string) => void;
}) => {
  const [form, setForm] = useState({
    name: "",
    date_of_birth: "",
    gender: "unknown",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "otp">("form"); // bước hiện tại
  const [otp, setOtp] = useState("");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true);

    try {
      await registerUser(form);
      onSuccess(form.email);
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // setLoading(true);
    try {
      setStep("otp"); // chuyển sang bước nhập OTP

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/sendOtp`, {
        email: form.email, // hoặc phone nếu bạn dùng OTP qua SMS
      });
    } catch (error) {
      console.error("Lỗi gửi OTP:", error);
      alert("Không gửi được OTP, vui lòng thử lại.");
    } finally {
      // setLoading(false);
    }
  };
  // B2: gửi OTP + toàn bộ dữ liệu user
  const handleConfirmOtp = async () => {
    if (!otp) return alert("Vui lòng nhập OTP");

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/confirm-register`,
        {
          ...form, // gồm: name, email, password, password_confirmation, ...
          otp, // kèm OTP
        }
      );

      onSuccess(form.email);
    } catch (error: any) {
      console.error("Xác thực thất bại:", error);
      alert("OTP không đúng hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay text="Đang đăng ký..." />}
      {step === "form" && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ngày sinh
            </label>
            <input
              type="date"
              name="date_of_birth"
              required
              value={form.date_of_birth}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            >
              <option value="unknown">Không xác định</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              name="password_confirmation"
              required
              value={form.password_confirmation}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <button
            // onClick={handleSubmit}
            onClick={handleRequestOtp}
            type="submit"
            className="w-full px-4 py-3 text-lg font-medium text-white bg-blue-600 shadow-lg rounded-xl"
          >
            Đăng ký
          </button>
        </form>
      )}
      {step === "otp" && (
        <OTPInput
          email={form.email}
          value={otp}
          onChange={setOtp}
          onSubmit={handleConfirmOtp}
        />
      )}
    </>
  );
};
