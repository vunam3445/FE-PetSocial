import api from "../lib/axios";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  date_of_birth: string;
  gender: string;
}) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post("/auth/login", data);

    const token = response.data.access_token;
    const user = response.data.user;
    

    // Lưu token + user info vào localStorage
    localStorage.setItem("access_token", token);
    localStorage.setItem("user_name", user?.name || "");
    localStorage.setItem("avatar_url", user?.avatar_url || "");
    localStorage.setItem("user_id", user?.user_id || "");
    return { success: true, message: "Đăng nhập thành công", data: response.data };
  } catch (error: any) {
    const message =
      error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin.";
    return { success: false, message };
  }
};
