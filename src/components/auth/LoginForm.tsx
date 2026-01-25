import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, Link} from "react-router-dom";
import { loginUser } from "../../services/authService";
import { LoadingOverlay } from "../loadings/LoadingOverlay";
import ErrorToast from "../toasts/ErrorToast";
export const LoginForm = ({ prefillEmail }: { prefillEmail: string }) => {
  const [form, setForm] = useState({ email: prefillEmail, password: "" });
  const [loading, setLoading] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [errorText, setErrorText] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await loginUser(form);
    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setErrorText(result.message);
      setErrorToast(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {loading && <LoadingOverlay text="Đang đăng nhập..." />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email của bạn"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu</label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu"
          />
          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 text-lg font-medium text-white transition bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700 disabled:opacity-60"
        >
          Đăng nhập
        </button>
      </form>
      <ErrorToast
        open={errorToast}
        onClose={()=>{setErrorToast(false)}}
        text={errorText}
      />
    </>
  );
};
