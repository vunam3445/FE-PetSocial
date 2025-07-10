import { useState, type FormEvent, type ChangeEvent } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function LoginRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Đăng nhập thành công! (Demo)");
  };

  const handleRegisterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đăng ký thành công! (Demo)");
  };

  return (
    <div className="min-h-screen bg-gray-50 main-bg">
      <div className="flex min-h-screen">
        {/* Left Side */}
        <div className="hidden lg:flex lg:w-1/2 pet-bg items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-6 flex items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold text-blue-900">PetMatch</span>
          </div>

          <div className="text-center max-w-md px-6">
            <div className="w-80 h-80 mx-auto rounded-full bg-gray-300 mb-8 shadow-2xl"></div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Chào mừng bạn đến với PetMatch</h1>
            <p className="text-lg text-blue-700">Chia sẻ khoảnh khắc & tìm sản phẩm cho thú cưng của bạn.</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            {/* Tabs */}
            <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "login"
                    ? "text-white bg-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("login")}
              >
                Đăng nhập
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === "register"
                    ? "text-white bg-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("register")}
              >
                Đăng ký
              </button>
            </div>

            {/* Login Form */}
            {activeTab === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
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
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Nhập email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Nhập lại mật khẩu"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-medium text-lg shadow-lg"
                >
                  Đăng ký
                </button>
              </form>
            )}
             <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Hoặc</span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200">
                                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="ml-2">Google</span>
                            </button>
                            <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-200">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="ml-2">Facebook</span>
                            </button>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
}
