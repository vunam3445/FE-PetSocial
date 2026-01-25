import { useState } from "react";
import { deleteConversation as deleteConversationApi } from "../../services/Conversation";

export const useDeleteConv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteConv = async (conversationId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await deleteConversationApi(conversationId);
      
      // Giả sử API trả về cấu trúc có status hoặc success
      if (res.status === 'success' || res.data?.status === 'success') {
        return { success: true, message: res.data?.message };
      }
      
      return { success: true };
    } catch (err: any) {
      // Lấy message lỗi từ Server (ví dụ lỗi 403 từ Policy bạn vừa viết)
      const errorMessage = err.response?.data?.message || "Có lỗi xảy ra khi xóa cuộc trò chuyện.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    deleteConv,
    isLoading,
    error,
    setError
  };
};