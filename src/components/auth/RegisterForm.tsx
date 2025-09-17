import { useState, type ChangeEvent, type FormEvent } from "react";
import { registerUser } from "../../services/authService";

export const RegisterForm = ({ onSuccess }: { onSuccess: (email: string) => void }) => {
  const [form, setForm] = useState({
    name: "",
    date_of_birth: "",
    gender: "unknown",
    email: "",
    password: "",
    password_confirmation: "",
  });

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
    try {
      await registerUser(form);
      onSuccess(form.email);
    } catch (error) {
      console.error("Đăng ký thất bại:", error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };
  return (
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
        onClick={handleSubmit}
        type="submit"
        className="w-full px-4 py-3 text-lg font-medium text-white bg-blue-600 shadow-lg rounded-xl"
      >
        Đăng ký
      </button>
    </form>
  );
};
