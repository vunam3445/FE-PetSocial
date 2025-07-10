import React, { useState, type ChangeEvent, type FormEvent } from "react";

export const LoginForm = () => {
  // State cho dữ liệu form
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Xử lý khi thay đổi input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Xử lý khi submit
  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Đăng nhập với:", form);

    // TODO: Gửi API hoặc xử lý đăng nhập ở đây
    alert(`Đăng nhập: ${form.email}`);
  };

  return (
    <div>
      <form onSubmit={handleLoginSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Nhập email của bạn"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Nhập mật khẩu"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium text-lg shadow-lg"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
};
