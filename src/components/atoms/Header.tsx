import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ChatModal } from "../modals/ChatModal";
import { NotificationList } from "../Notifications/NotificationList";
import { useGetMyNotification } from "../../hooks/notification/useGetMyNotification";
import { useReadNotification } from "../../hooks/notification/useReadNotification";
import { useChat } from "../../contexts/ChatContext";
import type { NotificationItem } from "../../types/Notification";
import { ChangePasswordModal } from "../modals/ChangePasswordModal";
import useGetUnreadConversations from "../../hooks/chat/useGetUnreadConversations";
export const Header = () => {
  const { unreadCount: chatUnreadCount } =
    useGetUnreadConversations();
  const [params] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const avatarUrl = localStorage.getItem("avatar_url");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const user_id = localStorage.getItem("user_id") || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { unreadNotificationsCount: socketCount, notifications: socketNotis } =
    useChat();
  const {
    notifications: apiNotis,
    unreadCount,
    setUnreadCount,
    loadMore, // Lấy thêm hàm này
    hasMore, // Lấy thêm biến này
    loading: apiLoading, // Lấy thêm biến này
  } = useGetMyNotification(user_id);
  const [changePassword, setChangePassword] = useState(false);
  const [localNotifications, setLocalNotifications] = useState<
    NotificationItem[]
  >([]);
  const [openNotification, setOpenNotification] = useState(false);

  // 1. Theo dõi socketCount từ useChat và cập nhật unreadCount của API
  useEffect(() => {
    if (socketCount > 0) {
      // Mỗi khi socket nhận 1 thông báo mới, ta cộng thêm vào số lượng hiện tại
      setUnreadCount((prev) => prev + socketCount);
    }
  }, [socketCount, setUnreadCount]);

  // 2. Sửa lại logic gộp thông báo để tránh trùng lặp (Sử dụng Map)
  useEffect(() => {
    // Lọc trùng theo ID để tránh việc socket và api cùng trả về 1 tin khi reload
    const allNotis = [...socketNotis, ...apiNotis];
    const uniqueNotis = Array.from(
      new Map(allNotis.map((item) => [item.id, item])).values(),
    );

    // Sắp xếp theo thời gian mới nhất (nếu cần)
    const sorted = uniqueNotis.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    setLocalNotifications(sorted);
  }, [socketNotis, apiNotis]);
  const { markAsRead } = useReadNotification();
  const handleClick = async (noti: NotificationItem, solveStatus?: string) => {
    // 1. Cập nhật UI cục bộ ngay lập tức (Optimistic Update)
    setLocalNotifications((prev) =>
      prev.map((item) => {
        if (item.id !== noti.id) return item;

        // Khởi tạo object copy
        let updatedItem = { ...item };

        // Xử lý đánh dấu đã đọc
        if (updatedItem.read_at === null) {
          updatedItem.read_at = new Date().toISOString();
          setUnreadCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
        }

        // Xử lý cập nhật status cho lời mời vào nhóm
        if (
          updatedItem.data?.type === "conversation_invitation" &&
          solveStatus
        ) {
          // Đảm bảo cấu trúc data giống với API trả về
          updatedItem.data = { ...updatedItem.data, status: solveStatus };
        }

        return updatedItem;
      }),
    );

    // 2. Gọi API để đồng bộ với Server
    try {
      // Luôn gọi đánh dấu đã đọc nếu tin nhắn chưa đọc
      if (noti.read_at === null) {
        await markAsRead(noti.id);
      }

      // Nếu là lời mời và có status mới, hãy gọi API cập nhật status tại đây
      if (noti.data?.type === "conversation_invitation" && solveStatus) {
        // await updateInvitationStatus(noti.data.conversation_id, solveStatus);
        console.log(`Đã cập nhật ${noti.id} sang trạng thái: ${solveStatus}`);
      }
    } catch (error) {
      console.error("Lỗi đồng bộ dữ liệu:", error);
      // Tùy chọn: Có thể fetch lại danh sách nếu muốn đảm bảo data chính xác khi lỗi API
    }
  };
  const handleNotification = async () => {
    setOpenNotification(!openNotification);
  };

  const goToProfile = () => {
    if (user_id) {
      navigate(`/profile/${user_id}`);
    }
  };
  // đồng bộ keyword trong state với URL mỗi khi thay đổi
  useEffect(() => {
    const kw = params.get("keyword") || "";
    setKeyword(kw);
  }, [params]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    const currentType = params.get("type") || "post";

    navigate(
      `/search?type=${currentType}&keyword=${encodeURIComponent(keyword)}`,
    );
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <span className="text-lg font-bold text-white">🐾</span>
            </div>
            <span className="hidden text-xl font-bold text-gray-900 sm:block">
              PetConnect
            </span>
          </Link>

          <div className="flex-1 max-w-lg mx-4">
            <form
              onSubmit={handleSearch}
              className="relative flex-1 max-w-lg mx-4"
            >
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm bài viết, người dùng, thú cưng..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg md:hidden hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
              
            </button>

            {/* Bọc toàn bộ vùng icon thông báo vào 1 div relative */}
            <div className="relative">
              <button
                className="relative p-2 rounded-lg hover:bg-gray-100 sm:block"
                onClick={handleNotification}
              >
                {/* SVG Icon chuông */}
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {unreadCount > 0 && (
      <span className="absolute flex items-center justify-center w-4 h-4 text-[10px] text-white bg-red-500 rounded-full top-1 right-1">
        {unreadCount > 9 ? "9+" : unreadCount}
      </span>
    )}
              </button>

              {/* Định vị tuyệt đối */}
              {openNotification && (
                <div className="fixed right-4 top-16 z-[100] mt-2">
                  <NotificationList
                    notifications={localNotifications}
                    handleClick={handleClick}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    isLoading={apiLoading}
                  />
                </div>
              )}
            </div>
            <button
              className="relative hidden p-2 rounded-lg hover:bg-gray-100 sm:block"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              {chatUnreadCount > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-[10px] text-white bg-blue-500 rounded-full top-1 right-1 animate-bounce">
                  {chatUnreadCount > 9 ? "9+" : chatUnreadCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                className="flex items-center p-1 space-x-2 rounded-lg hover:bg-gray-100"
                onClick={goToProfile}
              >
                <img
                  src={avatarUrl || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <svg
                  onClick={(e) => {
                    e.stopPropagation(); // chặn click lan lên button cha
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="hidden w-4 h-4 text-gray-600 cursor-pointer sm:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Dropdown bọc trong relative */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                  <button
                    onClick={() => {
                      setChangePassword(true);
                    }}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isChatOpen && (
        <ChatModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
      <ChangePasswordModal
        open={changePassword}
        onClose={() => {
          setChangePassword(false);
        }}
      />
    </header>
  );
};
