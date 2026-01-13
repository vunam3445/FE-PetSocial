import { useState, useCallback } from "react";
import { readConversation } from "../../services/Conversation";

export const useReadConversation = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  // Sử dụng useCallback để hàm không bị tạo lại mỗi lần render
  const markAsRead = useCallback(async (conversationId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await readConversation(conversationId);
      return response;
    } catch (err) {
      setError(err);
      throw err; // Quăng lỗi để component gọi có thể bắt được bằng try-catch
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    markAsRead,
    isLoading,
    error
  };
};