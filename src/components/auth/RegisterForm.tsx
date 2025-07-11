import { useState, type ChangeEvent, type FormEvent } from "react";

export const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đăng ký thành công! (Demo)");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Họ và tên</label>
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
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
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
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
        <input
          type="password"
          name="confirmPassword"
          required
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          placeholder="Nhập lại mật khẩu"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 text-lg font-medium text-white bg-blue-600 shadow-lg rounded-xl"
      >
        Đăng ký
      </button>
    </form>
  );
};
