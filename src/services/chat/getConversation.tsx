import api from "../../lib/axios";
export const getConversation = async (userId: string, status: string) => {
  const url = `/conversations?status=${status}`;
  const response = await api.get(url);
  return response.data;
};