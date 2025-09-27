import { useState } from "react";
import { useCreateMessage } from "../../hooks/chat/useCreateMessage";
import { useChat } from "../../contexts/ChatContext";

export const ConversationFooter = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const [message, setMessage] = useState("");
  const { createMessage } = useCreateMessage();
  const { addMessage, updateMessage } = useChat(); // ✅ thêm cả updateMessage

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // 1. tạo tin nhắn pending
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
    addMessage(conversationId, pendingMessage);

    setMessage("");

    try {
      // 2. gọi API tạo tin nhắn thật
      const saved = await createMessage(conversationId, message);
      if (saved) {
        updateMessage(conversationId, tempId, {
          message_id: saved.message_id,
          text: saved.content,
          time: saved.created_at,
          pending: false,
          type: "me", // luôn là me vì người gửi là chính mình
        });
      }
      // 3. cập nhật lại pending → real message
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-200 rounded-b-xl">
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
          className="flex items-center justify-center p-2 text-white transition-colors duration-200 bg-blue-600 rounded-full hover:bg-blue-700"
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
