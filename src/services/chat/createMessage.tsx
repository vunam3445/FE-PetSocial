import api from "../../lib/axios";

export const createMessageApi = async (
  conversationId: string,
  content: string,
  media_url?: string,
  reply_to_id?: string
) => {
  const response = await api.post(`conversations/${conversationId}/messages`, {
    content,
    media_url,
    reply_to_id
  });
  return response.data;
};
