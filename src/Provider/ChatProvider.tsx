import React, { useState, useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import {
  ChatContext,
  type ChatContextType,
  type Message,
} from "../contexts/ChatContext";
import { getConversation } from "../services/chat/getConversation";
import type { ConversationItem } from "../types/Chat";
import { getMessageByUser } from "../services/chat/getMessageByUser";

interface Conversation {
  id: string;
  title: string;
  avatarUrl: string;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openConversations, setOpenConversations] = useState<Conversation[]>(
    []
  );
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [messages, setMessages] = useState<{ [id: string]: Message[] }>({});
  const userId = localStorage.getItem("user_id") || "";
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  // ✅ giữ socket toàn cục
  const socketRef = useRef<Socket | null>(null);

  // 👉 kết nối socket.io 1 lần khi app load
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_WS_URL); // WebSocket server Node.js
    socketRef.current = socket;

    // socket.on("connect", () => {
    // });
    socket.on("connect", () => {
      const uid = localStorage.getItem("user_id");
      if (uid) {
        // 👉 báo cho server rằng user này online
        socket.emit("user_online", uid);
      }
    });

    // lắng nghe danh sách online
    socket.on("online_users", (users: string[]) => {
      setOnlineUsers(users);
    });

    // lắng nghe tin nhắn realtime
    socket.on("receive_message", (msg: any) => {
      if (msg.sender_id === userId) return; // bỏ qua tin nhắn do chính mình gửi
      addMessage(msg.conversationId, {
        message_id: msg.message_id,
        text: msg.content,
        senderId: msg.sender_id,
        time: msg.created_at,
        name: msg.sender?.name || "Unknown",
        avatarUrl: msg.sender.avatar_url || undefined,
        type: "other",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // 👉 khi mở 1 conversation thì join room đó
  const openConversation: ChatContextType["openConversation"] = (conv) => {
    setOpenConversations((prev) => {
      if (prev.find((c) => c.id === conv.id)) return prev;
      // join room
      socketRef.current?.emit("join_room", conv.id);
      return [...prev, conv];
    });
  };

  const closeConversation: ChatContextType["closeConversation"] = (id) => {
    setOpenConversations((prev) => prev.filter((c) => c.id !== id));
  };

  // ✅ thêm message
  const addMessage = (conversationId: string, message: Message) => {
    setMessages((prev) => {
      const msgs = prev[conversationId] || [];
      const updated = msgs.some((m) => m.message_id === message.message_id)
        ? msgs.map((m) =>
            m.message_id === message.message_id ? { ...m, ...message } : m
          )
        : [...msgs, message];
      return { ...prev, [conversationId]: updated };
    });
  };

  // ✅ update pending message
  const updateMessage = (
    conversationId: string,
    tempId: string,
    newData: Message
  ) => {
    setMessages((prev) => {
      const msgs = prev[conversationId] || [];
      const updated = msgs.map((m) =>
        m.message_id === tempId ? { ...m, ...newData } : m
      );
      return { ...prev, [conversationId]: updated };
    });
  };

  // ✅ fetch messages từ API
  const fetchMessages = useCallback(
    async (conversationId: string, page: number = 1) => {
      try {
        const response = await getMessageByUser(conversationId, page);
        const rawMessages = response.data.data;

        const mapped: Message[] = rawMessages.map((msg: any) => ({
          message_id: msg.message_id,
          text: msg.content,
          senderId: msg.sender_id,
          time: msg.created_at,
          name: msg.sender?.name || "Unknown",
          avatarUrl: msg.sender?.avatar_url,
          type: msg.sender_id === userId ? "me" : "other",
        }));

        setMessages((prev) => {
          if (page === 1) {
            // reset khi mở lại conversation
            return {
              ...prev,
              [conversationId]: mapped.reverse(),
            };
          } else {
            // load thêm tin nhắn cũ khi scroll
            return {
              ...prev,
              [conversationId]: [
                ...mapped.reverse(),
                ...(prev[conversationId] || []),
              ],
            };
          }
        });

        return mapped;
      } catch (err) {
        console.error("Fetch messages error:", err);
        return [];
      }
    },
    [userId]
  );

  const fetchConversations = useCallback(
    async (status: "read" | "unread") => {
      try {
        const data = await getConversation(userId, status);
        setConversations(data);
      } catch (err) {
        console.error("Fetch conversations error:", err);
      }
    },
    [userId]
  );
  // Kết nối socket 1 lần
  // useEffect(() => {
  //   const socket = io(import.meta.env.VITE_API_WS_URL);
  //   socketRef.current = socket;

  //   socket.on("connect", () => {
  //     const uid = localStorage.getItem("user_id");
  //     if (uid) {
  //       // 👉 báo cho server rằng user này online
  //       socket.emit("user_online", uid);
  //     }
  //   });

  //   // lắng nghe danh sách online
  //   socket.on("online_users", (users: string[]) => {
  //     setOnlineUsers(users);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <ChatContext.Provider
      value={{
        openConversations,
        onlineUsers,
        openConversation,
        closeConversation,
        conversations,
        fetchConversations,
        fetchMessages,
        messages,
        addMessage,
        updateMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
