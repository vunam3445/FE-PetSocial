import api from "../../lib/axios";
export const getConversation = async (userId: string, status: string, page: number) => {
  const url = `/conversations?status=${status}&page=${page}`;
  const response = await api.get(url);
  return response.data;
};