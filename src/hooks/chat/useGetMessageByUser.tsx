import { getMessageByUser } from "../../services/chat/getMessageByUser";
import { useState, useCallback } from "react";

export type UIMessage = {
  type: "me" | "other";
  name: string;
  text: string;
  time: string;
  avatarUrl?: string; // đổi từ avatarBg sang avatarUrl
};

export const useGetMessageByUser = (conversationId: string) => {
  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getMessageByUser(conversationId);

      const currentUserId = localStorage.getItem("user_id"); // id user hiện tại
      const rawMessages = response.data.data; // mảng message trong field "data"

      const mapped: UIMessage[] = rawMessages.map((msg: any) => {
        const isMe = msg.sender_id === currentUserId;
        return {
          type: isMe ? "me" : "other",
          name: msg.sender?.name || "Unknown",
          text: msg.content,
          time: new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatarUrl: msg.sender?.avatar_url || undefined,
        };
      }).reverse();

      setMessages(mapped);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  }, [conversationId]);

  return { messages, loading, fetchMessages };
};
