// Sidebar.jsx
import type { GroupWithMemberRole } from "../../../types/Group";
import { GroupSidebarSkeleton } from "../../skeleton/GroupSidebarSkeleton";
interface SidebarProps {
  groupInfo?: GroupWithMemberRole | null;
  loading?: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}
export const Sidebar = ({
  groupInfo,
  loading,
  activeTab,
  onTabChange,
}: SidebarProps) => {
  if (loading) {
    return <GroupSidebarSkeleton />;
  }
  // Hàm helper để tạo class active
  const getLinkClass = (tabName) => {
    const baseClass =
      "flex items-center px-3 py-2.5 rounded-lg group transition-colors cursor-pointer w-full text-left";
    if (activeTab === tabName) {
      return `${baseClass} bg-blue-50 text-blue-600 font-medium`;
    }
    return `${baseClass} text-gray-600 hover:bg-gray-100`;
  };
  return (
    <aside className="flex-col hidden h-full overflow-y-auto bg-white border-r border-gray-200 lg:block lg:col-span-3 custom-scrollbar">
      {/* 1. Header Sidebar: Thông tin tóm tắt nhóm */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center p-3 mt-4 rounded-lg bg-blue-50">
          <img
            className="object-cover w-10 h-10 mr-3 rounded-md"
            src={
              groupInfo?.group.avatar_url ||
              "https://placehold.co/168x168/fdc5a3/333333?text=🐾"
            }
            alt="Group Icon"
          />
          <div>
            <p className="text-sm font-bold text-gray-900">
              {groupInfo?.group.name || "Hội Yêu Thú Cưng"}
            </p>
            <p className="text-xs text-gray-500">
              {groupInfo?.group.visibility === "public"
                ? "Nhóm công khai"
                : "Nhóm riêng tư"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Links */}
      {groupInfo?.member_role == "admin" && (
        <nav className="flex-1 p-4 space-y-1">
          {/* --- Phần: TỔNG QUAN --- */}
          <p className="px-3 mt-2 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Tổng quan
          </p>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 bg-blue-50 rounded-lg font-medium"
          >
            <i className="w-6 mr-2 text-center fas fa-home"></i>
            Trang chủ quản trị
          </a>
          <button // Đổi từ <a> thành <button>
            onClick={() => onTabChange("feed")} // Thêm sự kiện này
            className={getLinkClass("feed")} // Sử dụng hàm helper để active class
          >
            <div className="flex items-center">
              <i className="w-6 mr-2 text-center fas fa-user-clock group-hover:text-gray-800"></i>
              Bài viết
            </div>
          </button>

          <div className="my-4 border-t border-gray-100"></div>

          {/* --- Phần: THÀNH VIÊN & KIỂM DUYỆT --- */}
          <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Thành viên & Kiểm duyệt
          </p>

          {/* Mục có badge thông báo (Red) */}
          <button // Đổi từ <a> thành <button>
            onClick={() => onTabChange("member_requests")} // Thêm sự kiện này
            className={getLinkClass("member_requests")} // Sử dụng hàm helper để active class
          >
            <div className="flex items-center">
              <i className="w-6 mr-2 text-center fas fa-user-clock group-hover:text-gray-800"></i>
              Yêu cầu tham gia
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {groupInfo.pending_join_requests_count}
            </span>
          </button>
          {/* Mục có badge thông báo (Blue) */}
          <button // ĐỔI TỪ <a> THÀNH <button>
            onClick={() => onTabChange("pending_posts")} // THÊM DÒNG NÀY
            className={getLinkClass("pending_posts")} // THÊM DÒNG NÀY (Để highlight khi active)
          >
            <div className="flex items-center">
              <i className="w-6 mr-2 text-center fas fa-clipboard-check group-hover:text-gray-800"></i>
              Bài viết chờ duyệt
            </div>
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {groupInfo.pending_posts_count}
            </span>
          </button>

          <button
            onClick={() => onTabChange("members")}
            className={getLinkClass("members")}
          >
            <i className="w-6 mr-2 text-center fas fa-users group-hover:text-gray-800"></i>
            Tất cả thành viên
          </button>
          <button // ĐỔI TỪ <a> SANG <button>
            onClick={() => onTabChange("reported_posts")} // THÊM DÒNG NÀY
            className={getLinkClass("reported_posts")} // THÊM DÒNG NÀY để active class
          >
            <div className="flex items-center">
              <i className="w-6 mr-2 text-center fas fa-exclamation-triangle group-hover:text-gray-800"></i>
              Bài viết bị báo cáo
            </div>
            {/* Badge màu cam cho Spam/Report */}
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {groupInfo.reported_posts_count}
            </span>
          </button>
          <button
            onClick={() => onTabChange("membership_questions")}
            className={getLinkClass("membership_questions")}
          >
            <div className="flex items-center">
              {/* Đổi icon thành clipboard-list cho hợp ngữ cảnh câu hỏi */}
              <i className="w-6 mr-2 text-center fas fa-clipboard-list group-hover:text-gray-800"></i>
              Câu hỏi chọn thành viên
            </div>
          </button>
          <div className="my-4 border-t border-gray-100"></div>

          {/* --- Phần: CÔNG CỤ & CÀI ĐẶT --- */}
          <p className="px-3 mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">
            Công cụ & Cài đặt
          </p>
          {/* <a
          href="#"
          className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group transition-colors"
        >
          <i className="w-6 mr-2 text-center fas fa-gavel group-hover:text-gray-800"></i>
          Quy tắc nhóm
        </a>
        <a
          href="#"
          className="flex items-center px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg group transition-colors"
        >
          <i className="w-6 mr-2 text-center fas fa-shield-alt group-hover:text-gray-800"></i>
          Chất lượng nhóm
        </a> */}
          <button
            onClick={() => onTabChange("settings")}
            className={getLinkClass("settings")}
          >
            <i className="w-6 mr-2 text-center fas fa-cog group-hover:text-gray-800"></i>
            Cài đặt nhóm
          </button>
        </nav>
      )}
    </aside>
  );
};
