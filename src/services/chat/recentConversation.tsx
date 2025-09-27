import api from "../../lib/axios";
export const recentConversations = async () => {
  const url = `/conversations/recent`;
  const response = await api.get(url);
  return response.data;
};