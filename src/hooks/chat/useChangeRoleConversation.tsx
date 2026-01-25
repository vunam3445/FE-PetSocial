import { useState } from "react";
import { changeRole as changeRoleService } from "../../services/Conversation";

export default function useChangeRoleConversation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Hàm thực hiện đổi quyền quản trị viên
   * @param conversationId ID cuộc trò chuyện
   * @param targetId ID người nhận quyền Admin mới
   */
  const changeRole = async (conversationId: string, targetId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await changeRoleService(conversationId, targetId);
      
      // Bạn có thể xử lý thêm logic ở đây (ví dụ: cập nhật lại context hoặc state toàn cục)
      
      return { success: true, data: response.data };
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Không thể chuyển quyền Admin.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    changeRole,
    loading,
    error,
    setError // Cho phép component reset lỗi nếu cần
  };
}