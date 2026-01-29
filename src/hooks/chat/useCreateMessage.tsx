import { createMessageApi } from "../../services/chat/createMessage";
import { useState, useCallback } from "react";

export function useCreateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createMessage = useCallback(
    async (conversationId: string, formData: FormData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await createMessageApi(conversationId, formData);
        // Kiểm tra logic response dựa trên cấu trúc API của bạn
        setLoading(false);
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to create message");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createMessage, loading, error };
}