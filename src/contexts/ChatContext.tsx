import React, { createContext, useContext } from "react";
import { type ConversationItem } from "../types/Chat";
import { type EditingConversation } from "../types/Conversation";

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
  openConversations: ConversationItem[];
  openConversation: (conv: ConversationItem) => void;
  closeConversation: (id: string) => void;
  conversations: ConversationItem[];
  isFetching: boolean;
  setConversations: React.Dispatch<React.SetStateAction<ConversationItem[]>>; // Kiểu chuẩn ở đây  fetchMessages: (conversationId: string) => Promise<void>;
  fetchConversations: (status: "read" | "unread",page: number) => Promise<void>;
  hasMoreConversations: boolean,
  conversationsPage: number,
  fetchMessages:(conversationId: string,page?: number)=>Promise<Message[]>;
  messages: { [conversationId: string]: Message[] }; 
  addMessage: (conversationId: string, message: Message) => void;
  updateMessage: (conversationId: string, tempId: string, newData: Message) => void;
  onlineUsers: string[]; // ✅ danh sách userId đang online

  editingConversation: EditingConversation | null;
  setEditingConversation: React.Dispatch<React.SetStateAction<EditingConversation | null>>;
  openEditConversation: boolean;
  setOpenEditConversation: React.Dispatch<React.SetStateAction<boolean>>;


  notifications: any[]; // Bạn có thể dùng Interface NotificationItem đã định nghĩa trước đó
  unreadNotificationsCount: number;
  setUnreadNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
