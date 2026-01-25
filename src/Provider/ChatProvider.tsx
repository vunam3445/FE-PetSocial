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
import { useReadConversation } from "../hooks/chat/useReadConversation";
import type { EditingConversation } from "../types/Conversation";
interface Conversation {
  id: string;
  title: string;
  avatarUrl: string;
}

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openConversations, setOpenConversations] = useState<Conversation[]>(
    [],
  );
  const { markAsRead } = useReadConversation(); // 1. Khai báo hook
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [messages, setMessages] = useState<{ [id: string]: Message[] }>({});
  const userId = localStorage.getItem("user_id") || "";
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [conversationsPage, setConversationsPage] = useState(1);
  const [hasMoreConversations, setHasMoreConversations] = useState(true);
  const [openEditConversation, setOpenEditConversation] = useState(false);
  const [editingConversation, setEditingConversation] =
    useState<EditingConversation | null>(null);
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

    // --- THÊM LOGIC THÔNG BÁO VÀO ĐÂY ---
    socket.on("new_notification", (noti: any) => {
      console.log("🔥 Nhận thông báo mới:", noti);

      // 1. Thêm vào danh sách thông báo (đưa lên đầu)
      setNotifications((prev) => {
        // 1. Tìm xem thông báo này đã có trong danh sách chưa (dựa vào UUID của Laravel)
        const existingIndex = prev.findIndex((item) => item.id === noti.id);

        if (existingIndex !== -1) {
          // 2. Nếu đã tồn tại (Trường hợp gộp/Aggregated):
          // Cập nhật dữ liệu mới (count mới, message mới) vào đúng vị trí cũ
          const updatedNotifications = [...prev];
          updatedNotifications[existingIndex] = noti;

          // Không tăng số lượng unread tổng nếu chỉ là cập nhật trên thông báo cũ chưa đọc
          return updatedNotifications;
        }

        // 3. Nếu chưa có: Thêm mới vào đầu danh sách
        return [noti, ...prev];
      });

      // 2. Tăng số lượng chưa đọc
      setUnreadNotificationsCount((prev) => prev + 1);

      // 3. (Tùy chọn) Hiện Toast thông báo nhanh
      // toast.info(noti.message);
    });
    // ------------------------------------
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // 👉 khi mở 1 conversation thì join room đó
  const openConversation: ChatContextType["openConversation"] = async (
    conv,
  ) => {
    setOpenConversations((prev) => {
      if (prev.find((c) => c.id === conv.id)) return prev;
      // join room
      socketRef.current?.emit("join_room", conv.id);
      return [...prev, conv];
    });
    try {
      await markAsRead(conv.id);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đã đọc:", error);
    }
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
            m.message_id === message.message_id ? { ...m, ...message } : m,
          )
        : [...msgs, message];
      return { ...prev, [conversationId]: updated };
    });
  };

  // ✅ update pending message
  const updateMessage = (
    conversationId: string,
    tempId: string,
    newData: Message,
  ) => {
    setMessages((prev) => {
      const msgs = prev[conversationId] || [];
      const updated = msgs.map((m) =>
        m.message_id === tempId ? { ...m, ...newData } : m,
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
    [userId],
  );

  const fetchConversations = useCallback(
    async (status: "read" | "unread", page: number = 1) => {
      try {
        setIsFetching(true);
        const response = await getConversation(userId, status, page);
        // Chúng ta lấy mảng hội thoại từ response.data
        const newItems = response.data || [];

        setConversations((prev) => {
          // Nếu là trang 1 thì thay thế hoàn toàn, trang > 1 thì nối thêm
          return page === 1 ? newItems : [...prev, ...newItems];
        });

        // Cập nhật các trạng thái phân trang khác
        setConversationsPage(response.current_page);
        setHasMoreConversations(response.current_page < response.last_page);
      } catch (err) {
        console.error("Fetch error:", err);
        // Nếu lỗi, đảm bảo conversations vẫn là mảng rỗng để không crash filter
        if (page === 1) setConversations([]);
      } finally {
        setIsFetching(false);
      }
    },
    [userId],
  );

  return (
    <ChatContext.Provider
      value={{
        openConversations,
        onlineUsers,
        openConversation,
        closeConversation,
        conversations,
        isFetching,
        setConversations,
        fetchConversations,
        conversationsPage,
        hasMoreConversations,
        fetchMessages,
        messages,
        addMessage,
        updateMessage,
        notifications,
        unreadNotificationsCount,
        setUnreadNotificationsCount,
        editingConversation,
        setEditingConversation,
        openEditConversation,
        setOpenEditConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
