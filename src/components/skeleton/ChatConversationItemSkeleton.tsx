export const ChatConversationItemSkeleton = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-center space-x-3">
        {/* Avatar Skeleton */}
        <div className="flex-shrink-0 bg-gray-200 rounded-full w-11 h-11"></div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {/* Name Skeleton */}
            <div className="w-1/3 h-4 mb-2 bg-gray-200 rounded"></div>
            {/* Status dot skeleton (tùy chọn) */}
            <div className="w-2 h-2 bg-gray-100 rounded-full"></div>
          </div>
          
          {/* Message Skeleton (chỉ hiển thị 1 dòng ngắn) */}
          <div className="w-2/3 h-3 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Cách sử dụng khi loading:
export const ConversationListSkeleton = () => {
  return (
    <div className="divide-y divide-gray-100">
      {[...Array(5)].map((_, i) => (
        <ChatConversationItemSkeleton key={i} />
      ))}
    </div>
  );
};