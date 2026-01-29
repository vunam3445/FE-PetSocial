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
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const openConversationsRef = useRef(openConversations);
  const [editingConversation, setEditingConversation] =
    useState<EditingConversation | null>(null);
  //  giữ socket toàn cục
  const socketRef = useRef<Socket | null>(null);
useEffect(() => {
  openConversationsRef.current = openConversations;
}, [openConversations]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_WS_URL);
    socketRef.current = socket;
    socket.on("connect", () => {
      const uid = localStorage.getItem("user_id");
      if (uid) {
        //  báo cho server rằng user này online
        socket.emit("user_online", uid);
      }
    });

    // lắng nghe danh sách online
    socket.on("online_users", (users: string[]) => {
      setOnlineUsers(users);
    });

    // lắng nghe tin nhắn realtime
    socket.on("receive_message", (msg: any) => {
      console.log("Nhận tin nhắn từ socket:", msg);
      if (msg.sender_id === userId) return;
     // Kiểm tra xem hội thoại này có đang được mở (trong các tab chat) không
    const isWindowOpen = openConversationsRef.current.some(
      (c) => c.id === msg.conversationId,
    );
    console.log(isWindowOpen)
    if (!isWindowOpen) {
      // CHỈ KHI KHÔNG MỞ MỚI TĂNG COUNT VÀ ĐỔI STATUS
      setConversations((prevConvs) => {
        const existingConv = prevConvs.find(
          (c) => c.conversation.conversation_id === msg.conversationId,
        );

        // Nếu hội thoại này chưa có hoặc đang ở trạng thái 'read' thì mới tăng count tổng
        if (!existingConv || existingConv.status === "read") {
          setUnreadMessagesCount((prevCount) => prevCount + 1);
        }

        // Cập nhật status thành unread cho hội thoại đó
        return prevConvs.map((c) =>
          c.conversation.conversation_id === msg.conversationId
            ? { ...c, status: "unread" as const }
            : c
        );
      });
    }
      addMessage(msg.conversationId, {
        message_id: msg.message_id,
        text: msg.content,
        media_url: msg.media_url,
        senderId: msg.sender_id,
        time: msg.created_at,
        name: msg.sender?.name || "Unknown",
        avatarUrl: msg.sender.avatar_url || undefined,
        type: "other",
        message_type: msg.message_type,
      });
    });
    // --- THÊM LOGIC THÔNG BÁO VÀO ĐÂY ---
    socket.on("new_notification", (noti: any) => {
      console.log(" Nhận thông báo mới:", noti);

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
    });
    // ------------------------------------
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  //  khi mở 1 conversation thì join room đó
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
      // 1. Tìm thông tin hội thoại hiện tại trong danh sách state
      const currentConvItem = conversations.find(
        (c) => c.conversation.conversation_id === conv.id,
      );

      if (currentConvItem) {
        const { conversation, latest_message } = currentConvItem;

        // 2. Kiểm tra xem hội thoại này thực sự có tin nhắn chưa đọc không
        const lastReadTime = conversation.last_read_at
          ? new Date(conversation.last_read_at).getTime()
          : 0;
        const lastMsgTime = latest_message
          ? new Date(latest_message.created_at).getTime()
          : 0;

        const isActuallyUnread = lastMsgTime > lastReadTime;

        // 3. Nếu thực sự chưa đọc, giảm count ở Header
        if (isActuallyUnread) {
          setUnreadMessagesCount((prevCount) => Math.max(0, prevCount - 1));
        }

        // 4. Cập nhật lại thời gian đọc cuối cùng trong danh sách local
        // để giao diện Sidebar mất dấu chấm xanh ngay lập tức
        setConversations((prev) =>
          prev.map((item) =>
            item.conversation.conversation_id === conv.id
              ? {
                  ...item,
                  conversation: {
                    ...item.conversation,
                    last_read_at: new Date().toISOString(), // Giả lập thời gian vừa đọc
                  },
                }
              : item,
          ),
        );
      }

      // 5. Gọi API để Backend lưu lại trạng thái đã đọc
      await markAsRead(conv.id);
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đã đọc:", error);
    }
  };

  const closeConversation: ChatContextType["closeConversation"] = (id) => {
    setOpenConversations((prev) => prev.filter((c) => c.id !== id));
  };

  //  thêm message
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

  //  update pending message
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

  //  fetch messages từ API
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
          media_url: msg.media_url,
          message_type: msg.message_type,
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
        unreadMessagesCount,
        setUnreadMessagesCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
