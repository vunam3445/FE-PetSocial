import { useState, useRef, useEffect } from "react";
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
  isUnread = false,
  colorClass = "bg-gradient-to-r from-blue-500 to-purple-500",
  onClick,
  onDelete,
}: ChatConversationItemProps) => {
  const { conversation, latest_message } = conversationItem;
  const isGroup = conversation.is_group;
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = isGroup
    ? conversation.name || "Nhóm không tên"
    : conversation.participants[0]?.name || "Người dùng";

  const displayAvatar = !isGroup 
    ? conversation.participants[0]?.avatar_url 
    : conversation.avatar_url;

  const initials = displayName.charAt(0).toUpperCase();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện onClick của cả item
    if (onDelete) onDelete(conversation.conversation_id);
    setShowMenu(false);
  };

  return (
    <div
      className={`p-4 transition-colors cursor-pointer conversation-item group relative
                  ${isUnread ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {/* AVATAR */}
        <div className="flex-shrink-0">
          {displayAvatar ? (
            <img
              src={displayAvatar}
              alt={displayName}
              className="object-cover rounded-full shadow-sm w-11 h-11"
            />
          ) : (
            <div
              className={`flex items-center justify-center w-11 h-11 
                        text-sm font-bold text-white rounded-full shadow-sm ${colorClass}`}
            >
              {initials}
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className={`text-sm truncate pr-4 ${isUnread ? "font-bold text-gray-900" : "font-medium text-gray-900"}`}>
              {displayName}
            </p>
            
            <div className="flex items-center">
              {/* Nút 3 chấm - Hiển thị khi hover vào item HOẶC khi menu đang mở */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMenu(!showMenu);
                  }}
                  className={`p-1 rounded-full hover:bg-gray-200 transition-opacity 
                    ${showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                >
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="absolute right-0 z-50 w-32 mt-2 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl">
                    <button
                      onClick={handleDelete}
                      className="flex items-center w-full px-4 py-2 space-x-2 text-sm text-left text-red-600 transition-colors hover:bg-red-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Xóa</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Chấm xanh thông báo - Ẩn khi nút 3 chấm hiện (tùy chọn UI) */}
              {isUnread && !showMenu && (
                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white ml-2 group-hover:hidden"></div>
              )}
            </div>
          </div>

          {!isGroup && (
            <p className={`text-xs truncate mt-1 ${isUnread ? "font-semibold text-gray-700" : "text-gray-500"}`}>
              {latest_message?.content || "Chưa có tin nhắn"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};