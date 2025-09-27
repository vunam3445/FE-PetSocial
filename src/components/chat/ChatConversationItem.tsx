interface ChatConversationItemProps {
  name: string;
  initials: string;
  message: string;
  avatarUrl?: string; // thêm avatarUrl
  isUnread?: boolean;
  colorClass?: string;
  onClick?: () => void; // thêm onClick prop
}

export const ChatConversationItem = ({
  name,
  initials,
  message,
  avatarUrl,
  isUnread = false,
  colorClass = "bg-gradient-to-r from-blue-500 to-purple-500",
  onClick,
}: ChatConversationItemProps) => {
  return (
    <div
      className={`p-4 transition-colors cursor-pointer conversation-item 
                  ${isUnread ? "unread" : "read"} hover:bg-gray-50`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="object-cover w-10 h-10 rounded-full"
          />
        ) : (
          <div
            className={`flex items-center justify-center w-10 h-10 
                      text-sm font-semibold text-white rounded-full ${colorClass}`}
          >
            {initials}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-900">{name}</p>
            {isUnread && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>
          <p
            className={`text-xs truncate ${
              isUnread ? "font-medium text-gray-700" : "text-gray-500"
            }`}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};
