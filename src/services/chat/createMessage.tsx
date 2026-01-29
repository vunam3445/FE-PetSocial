// services/chat/createMessage.ts
import api from "../../lib/axios";

export const createMessageApi = async (
  conversationId: string,
  formData: FormData
) => {
  const response = await api.post(`conversations/${conversationId}/messages`, formData, {
    headers: {
      // Quan trọng: Phải để trình duyệt tự set 'Content-Type' kèm 'boundary'
      // Nếu bạn gán cứng 'multipart/form-data' mà thiếu boundary, Laravel sẽ lỗi 422
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};