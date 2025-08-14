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
    localStorage.setItem("access_token", token);

    return { success: true, message: "Đăng nhập thành công", data: response.data };
  } catch (error: any) {
    // Nếu API trả về lỗi (ví dụ: 401), lấy thông báo hoặc dùng mặc định
    const message =
      error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra thông tin.";
    return { success: false, message };
  }
};