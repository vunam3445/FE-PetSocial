import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

export const LoginForm = ({ prefillEmail }: { prefillEmail: string }) => {
  const [form, setForm] = useState({ email: prefillEmail, password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await loginUser(form);
    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
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
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 text-lg font-medium text-white transition bg-blue-600 shadow-lg rounded-xl hover:bg-blue-700"
      >
        Đăng nhập
      </button>
    </form>
  );
};
