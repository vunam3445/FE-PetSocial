export interface ConversationPayload {
    participant_ids: string[];
}

export interface ParticipantPivot {
  conversation_id: string;
  user_id: string;
}

export interface Participant {
  user_id: string;
  name: string;
  avatar_url: string;
  pivot: ParticipantPivot;
}

export interface Conversation {
  conversation_id: string;
  name: string | null;
  is_group: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  participants: Participant[];
  messages: Message[]; // định nghĩa thêm bên dưới
}

export interface Message {
  message_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationItem {
  conversation: Conversation;
  latest_message: Message | null;
  status: "read" | "unread";
}
