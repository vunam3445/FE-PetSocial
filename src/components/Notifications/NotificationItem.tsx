import React, { useState } from "react";
import type { NotificationItem as NotificationType } from "../../types/Notification";
import { useHandleInvitation } from "../../hooks/notification/usehandleInvitationConversation";
import { useNavigate } from "react-router-dom";
interface ItemProps {
  noti: NotificationType;
  handleClick: (nt: NotificationType, solveStatus?: string) => void;
}

const NotificationItem: React.FC<ItemProps> = ({
  noti,
  handleClick: hdClick,
}) => {
  const navigate = useNavigate();
  const { data, read_at, created_at } = noti;
  const [isUnread, setIsUnread] = useState(read_at === null);
  const { executeHandleInvitation, isProcessing } = useHandleInvitation();
  const [currentStatus, setCurrentStatus] = useState(
    data.type === "conversation_invitation" ? data.status : null,
  );
  const handleclick = () => {
    if (data.target_url) {
      navigate(data.target_url);
    }
    setIsUnread(false);
    hdClick(noti);
  };

  // Hàm xử lý khi nhấn Chấp nhận/Từ chối
  const onInviteAction = async (
    e: React.MouseEvent,
    status: "accepted" | "rejected",
  ) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra thẻ div cha (tránh navigate nhầm)

    const success = await executeHandleInvitation(noti.id, status);
    if (success) {
      setCurrentStatus(status);
      setIsUnread(false);
      if (status === "accepted" && data.type === "conversation_invitation") {
        hdClick(noti, status);
      }
    }
  };
  const renderContent = () => {
    // Laravel gửi type qua data.type (ví dụ: 'new_post')
    switch (data.type) {
      case "new_post":
        return (
          <p className="text-sm leading-snug text-gray-700">
            <span className="font-bold text-gray-900">{data.author_name}</span>{" "}
            {data.message}
          </p>
        );
      case "new_post_of_pet":
        return (
          <p className="text-sm leading-snug text-gray-700">
            <span className="font-bold text-gray-900">{data.author_name}</span>{" "}
            {data.message}
          </p>
        );
      case "group_kicked":
        return (
          <p className="text-sm leading-snug text-gray-700">
            ⚠️ {data.message}
          </p>
        );

      case "group_rejected":
        return (
          <p className="text-sm leading-snug text-gray-700">
            ⚠️ {data.message}
          </p>
        );

      case "group_accepted":
        return (
          <p className="text-sm leading-snug text-gray-700">
            🎉 {data.message}
          </p>
        );
      // Thêm vào bên trong switch (data.type) của hàm renderContent
      case "conversation_deleted":
        return (
          <div className="space-y-1">
            <p className="text-sm leading-snug text-gray-700">
              <span className="inline-flex items-center justify-center w-5 h-5 mr-1 text-xs bg-red-100 rounded-full">
                🗑️
              </span>
              Quản trị viên {data.message}
            </p>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase tracking-wider">
              Hệ thống
            </span>
          </div>
        );
      case "conversation_invitation":
        return (
          <div className="space-y-3">
            <p className="text-sm leading-snug text-gray-700">
              <span className="font-bold text-gray-900">
                {data.inviter_name}
              </span>{" "}
              {data.message}
            </p>

            {/* Căn cứ vào status để hiển thị nút hoặc trạng thái xử lý */}
            {currentStatus === "pending" ? (
              <div className="flex gap-2">
                <button
                  disabled={isProcessing === noti.id}
                  onClick={(e) => onInviteAction(e, "accepted")}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isProcessing === noti.id ? (
                    <span className="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                  ) : (
                    "Chấp nhận"
                  )}
                </button>
                <button
                  disabled={isProcessing === noti.id}
                  onClick={(e) => onInviteAction(e, "rejected")}
                  className="px-4 py-1.5 text-xs font-bold text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
                >
                  Từ chối
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs font-medium py-1">
                {currentStatus === "accepted" ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Đã chấp nhận lời mời
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-gray-500">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" />
                    </svg>
                    Đã từ chối lời mời
                  </span>
                )}
              </div>
            )}
          </div>
        );

      case "health_reminder":
        return (
          <div className="space-y-1">
            <p className="text-sm leading-snug text-gray-700">
              🩺{" "}
              <span className="font-bold text-gray-900">{data.pet_name}</span>{" "}
              {data.message}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase tracking-wider">
                Lịch nhắc hẹn
              </span>
              <span className="text-[11px] text-gray-500 italic">
                Hạng mục: {data.category_name}
              </span>
            </div>
          </div>
        );
      case "GROUP_JOIN_REQUEST":
        return (
          <div className="space-y-2">
            <p className="text-sm leading-snug text-gray-700">
              <span className="font-bold text-gray-900">{data.data.name}</span>{" "}
              {data.message} vào nhóm{" "}
              <span className="font-semibold text-blue-600">
                {data.group_name}
              </span>
            </p>
          </div>
        );
      case "POST_PENDING_AGGREGATED":
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm leading-snug text-gray-700">
                  <span className="font-bold text-amber-800">
                    Thông báo phê duyệt:
                  </span>{" "}
                  {data.message}
                </p>
              </div>
            </div>
          </div>
        );
      case "POST_REPORTED_AGGREGATED":
        return (
          <div className="space-y-2">
            <div className="flex items-start gap-3">
        
              <div className="flex-1">
                <p className="text-sm leading-snug text-gray-700">
                  <span className="font-bold text-red-600">
                    Báo cáo vi phạm:
                  </span>{" "}
                  {data.message}
                </p>
                <p className="text-[11px] text-gray-500 mt-1 italic">
                  Nhóm: {data.group_name}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <p className="text-sm text-gray-700">{data.message}</p>;
    }
  };

  // Hàm định dạng thời gian đơn giản (Bạn có thể dùng thư viện date-fns hoặc moment)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) +
      " " +
      date.toLocaleDateString("vi-VN")
    );
  };

  return (
    <div
      onClick={handleclick}
      className={`flex items-start gap-4 px-5 py-4 transition-all hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 ${
        isUnread ? "bg-blue-50/40" : ""
      }`}
    >
      <div className="relative flex-shrink-0">
        <img
          src={data.avatar_url || "https://via.placeholder.com/150"}
          alt="avatar"
          className="object-cover w-12 h-12 rounded-full shadow-sm"
        />
        {isUnread && (
          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
        )}
      </div>

      <div className="flex-1">
        {renderContent()}
        <span
          className={`text-[11px] mt-1.5 block ${
            isUnread ? "text-blue-600 font-semibold" : "text-gray-400"
          }`}
        >
          {formatTime(created_at)}
        </span>
      </div>
    </div>
  );
};

export default NotificationItem;
