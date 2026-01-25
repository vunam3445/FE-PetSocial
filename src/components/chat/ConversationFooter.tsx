import { useState } from "react";
import { useCreateMessage } from "../../hooks/chat/useCreateMessage";
import { useChat } from "../../contexts/ChatContext";
import ErrorToast from "../toasts/ErrorToast";

export const ConversationFooter = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const [message, setMessage] = useState("");
  const [errorToast, setErrorToast] = useState(false); // ✅ Quản lý đóng/mở toast
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Quản lý nội dung lỗi
  
  const { createMessage } = useCreateMessage();
  const { addMessage, updateMessage } = useChat(); // ✅ thêm removeMessage để xóa tin nhắn lỗi nếu cần

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const tempId = Date.now().toString();
    const pendingMessage = {
      message_id: tempId,
      type: "me" as const,
      name: localStorage.getItem("user_name") || "Me",
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatarUrl: localStorage.getItem("avatar_url") || undefined,
      pending: true,
    };

    // 1. Hiển thị tin nhắn tạm thời (Optimistic UI)
    addMessage(conversationId, pendingMessage);
    const originalMessage = message; // Lưu lại nội dung để dùng nếu lỗi
    setMessage("");

    try {
      // 2. Gọi API gửi tin nhắn
      const saved = await createMessage(conversationId, originalMessage);
      
      if (saved) {
        updateMessage(conversationId, tempId, {
          message_id: saved.message_id,
          text: saved.content,
          time: saved.created_at,
          pending: false,
          type: "me",
        });
      }
    } catch (err: any) {
      console.error("Send message failed", err);
      
      // 3. Xử lý hiển thị lỗi qua Toast
      // Lấy message từ Policy (403) hoặc validate (422) trả về từ Laravel
      const msg = err.response?.data?.message || "Không thể gửi tin nhắn. Vui lòng thử lại.";
      setErrorMessage(msg);
      setErrorToast(true);
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-200 rounded-b-xl">
      {/* Component Toast hiển thị lỗi */}
      <ErrorToast 
        open={errorToast} 
        text={errorMessage} 
        onClose={() => setErrorToast(false)} 
      />

      <form className="flex items-center space-x-2" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2 text-white transition-colors duration-200 bg-blue-600 rounded-full hover:bg-blue-700 active:scale-95"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};