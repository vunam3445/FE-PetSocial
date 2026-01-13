import { useState } from "react";
import { deleteConversation } from "../../services/chat/deleteConversation";

export const useDeleteConversation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeConversation = async (
    conversationId: string, 
    onSuccess?: () => void
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deleteConversation(conversationId);
      
      if (onSuccess) {
        onSuccess();
      }
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Không thể xóa cuộc hội thoại";
      setError(errorMessage);
      console.error("Delete conversation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { removeConversation, loading, error };
};