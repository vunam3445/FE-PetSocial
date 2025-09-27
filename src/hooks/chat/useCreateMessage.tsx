import { createMessageApi } from "../../services/chat/createMessage";
import { useState, useCallback } from "react";

export function useCreateMessage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createMessage = useCallback(
    async (conversationId: string, content: string, media_url?: string, reply_to_id?: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await createMessageApi(conversationId, content, media_url, reply_to_id);
        if (response.status == 201) {
          setLoading(false);
          return response;
        }
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
