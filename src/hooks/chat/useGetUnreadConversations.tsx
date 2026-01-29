import { useEffect, useCallback } from "react";
import { unreadCount as getUnreadCountApi } from "../../services/Conversation"; 
import { useChat } from "../../contexts/ChatContext";

export default function useGetUnreadConversations() {
  const { unreadMessagesCount, setUnreadMessagesCount } = useChat();

  const fetchInitialCount = useCallback(async () => {
    try {
      const response = await getUnreadCountApi();
      // Backend trả về số lượng conversation chưa đọc (ví dụ: 3)
      const count = response.data ?? 0;
      setUnreadMessagesCount(count);
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  }, [setUnreadMessagesCount]);

  useEffect(() => {
    fetchInitialCount();
  }, [fetchInitialCount]);

  return { unreadCount: unreadMessagesCount };
}