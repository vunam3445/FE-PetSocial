import { useMemo } from "react";
import { type ConversationItem } from "../../types/Chat";

interface ChatConversationItemProps {
  conversationItem: ConversationItem;
  isUnread?: boolean;
  colorClass?: string;
  onClick?: () => void;
  onDelete?: (id: string) => void; // Thêm prop xóa
}

export const ChatConversationItem = ({
  conversationItem,
  colorClass = "bg-gradient-to-r from-blue-500 to-purple-500",
  onClick,
  onDelete,
}: ChatConversationItemProps) => {
  const { conversation, latest_message } = conversationItem;
  
  // Logic so sánh thời gian để xác định Unread
  const isUnread = useMemo(() => {
    if (!latest_message) return false;
    if (!conversation.last_read_at) return true; // Chưa bao giờ đọc thì là unread

    const lastReadTime = new Date(conversation.last_read_at).getTime();
    const lastMsgTime = new Date(latest_message.created_at).getTime();

    return lastMsgTime > lastReadTime;
  }, [conversation.last_read_at, latest_message]);

  const isGroup = conversation.is_group;
  const displayName = isGroup
    ? conversation.name || "Nhóm không tên"
    : conversation.participants[0]?.name || "Người dùng";

  const displayAvatar = !isGroup 
    ? conversation.participants[0]?.avatar_url 
    : conversation.avatar_url;

  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div
      className={`p-4 transition-all cursor-pointer conversation-item group relative border-l-4 hover:bg-gray-50 border-transparent`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {/* AVATAR */}
        <div className="relative flex-shrink-0">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              className={`object-cover rounded-full shadow-sm w-11 h-11 border-2 
                        ${isUnread ? "border-blue-200" : "border-transparent"}`}
            />
          ) : (
            <div className={`flex items-center justify-center w-11 h-11 text-sm font-bold text-white rounded-full shadow-sm ${colorClass}`}>
              {initials}
            </div>
          )}
          
          {/* Dấu chấm xanh thông báo tin nhắn mới */}
          {isUnread && (
            <span className="absolute bottom-0 right-0 block w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm truncate pr-4 ${isUnread ? "font-bold text-blue-900" : "font-medium text-gray-900"}`}>
              {displayName}
            </p>
            {/* Hiển thị thời gian tin nhắn cuối (nếu cần) */}
            {latest_message && (
               <span className={`text-[10px] ${isUnread ? "font-bold text-blue-600" : "text-gray-400"}`}>
                  {new Date(latest_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
            )}
          </div>
          
          <p className={`text-xs truncate mt-1 ${isUnread ? "font-bold text-gray-800" : "text-gray-500"}`}>
            {latest_message?.content || "Chưa có tin nhắn"}
          </p>
        </div>
      </div>
    </div>
  );
};