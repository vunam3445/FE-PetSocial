import api from "../../lib/axios";

export const getMessageByUser = async (conversationId: string, page: number = 1) => {
  const url = `/conversations/${conversationId}/messages?page=${page}`;
  return api.get(url);
};
