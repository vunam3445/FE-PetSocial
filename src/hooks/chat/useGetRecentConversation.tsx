import { recentConversations } from "../../services/chat/recentConversation";

export const useGetRecentConversation = () => {
  const fetchRecentConversations = async () => {
    try {
      const data = await recentConversations();
      return data;
    } catch (error) {
      console.error("Error fetching recent conversations:", error);
      throw error;
    }
  };

  return { fetchRecentConversations };
};
