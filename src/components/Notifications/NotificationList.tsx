import React, { useRef, useCallback } from "react";
import NotificationItem from "./NotificationItem";
import type { NotificationItem as nt } from "../../types/Notification";

interface NotificationProps {
  notifications: nt[];
  handleClick: (noti: nt, solveStatus?: string) => void;
  // Thêm 2 props mới để xử lý load more
  loadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

export const NotificationList: React.FC<NotificationProps> = ({
  notifications,
  handleClick,
  loadMore,
  hasMore,
  isLoading,
}) => {
  // 1. Khởi tạo Observer
  const observer = useRef<IntersectionObserver | null>(null);

  // 2. Callback để gán vào phần tử "trigger"
  const lastNotificationElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        // Nếu phần tử xuất hiện trong tầm mắt và vẫn còn dữ liệu để tải
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, loadMore]
  );

  return (
    <div className="flex flex-col w-[380px] overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900">Thông báo</h3>
        <button className="px-2 py-1 text-xs font-medium text-blue-600 transition-colors rounded-md hover:bg-blue-50">
          {/* Đánh dấu tất cả là đã đọc */}
        </button>
      </div>

      <div className="max-h-[480px] overflow-y-auto overflow-x-hidden custom-scrollbar">
        {notifications && notifications.length > 0 ? (
          notifications.map((noti, index) => {
            // Kiểm tra nếu đây là item thứ length - 3 
            const isTriggerItem = index === notifications.length - 3;

            return (
              <div
                key={noti.id}
                ref={isTriggerItem ? lastNotificationElementRef : null}
              >
                <NotificationItem noti={noti} handleClick={handleClick} />
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center py-12 opacity-40">
            <p className="text-sm italic">Hộp thư thông báo trống</p>
          </div>
        )}
        
        {/* Hiển thị loader nhỏ ở cuối khi đang tải trang mới */}
        {isLoading && (
          <div className="py-2 text-center">
            <span className="text-xs text-gray-400">Đang tải thêm...</span>
          </div>
        )}
      </div>

      <div className="p-3 text-center border-t border-gray-100 bg-gray-50/80">
        <button className="text-sm font-semibold text-gray-600 transition-colors hover:text-blue-600">
          {/* Xem tất cả trong lịch sử */}
        </button>
      </div>
    </div>
  );
};