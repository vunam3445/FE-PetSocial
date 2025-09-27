import api from "../../lib/axios";
import type { ConversationPayload } from "../../types/Chat";
export const createConversation = async (payload: ConversationPayload) => {
  const url = `/conversations`;
  const response = await api.post(url, payload);
  return response.data;
}