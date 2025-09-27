// contexts/ChatContext.tsx
import { createContext, useContext } from "react";

interface Conversation {
  id: string;
  title: string;
  avatarUrl: string;
}

export interface Message {
  message_id: string;   // ✅ đồng bộ với API
  text: string;
  senderId?: string;
  name?: string;
  avatarUrl?: string;
  time?: string;
  pending?: boolean; // tin nhắn local chờ confirm
  type?:string; // "me" | "other"
}

export interface ChatContextType {
  openConversations: Conversation[];
  openConversation: (conv: Conversation) => void;
  closeConversation: (id: string) => void;
  conversations: Conversation[];
  fetchMessages: (conversationId: string) => Promise<void>;
  fetchConversations: (status: "read" | "unread") => Promise<void>;
  messages: { [conversationId: string]: Message[] }; 
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, tempId: string, newData: Message) => void;
  onlineUsers: string[]; // ✅ danh sách userId đang online

}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
