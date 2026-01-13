export interface Member {
  user_id: string; // Chú ý: JSON của bạn dùng user_id chứ không phải id
  name: string;
  avatar_url: string;
  pivot: {
    role: string;
    conversation_id: string;
  };
}

export interface EditingConversation {
  conversationId: string;
  conversationName: string;
  conversationAvatar: string;
}