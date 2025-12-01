import { SidebarHeader } from "../groups/SidebarHeader";
import { GroupSection } from "../groups/GroupSection";
import { useGetGroupByUser } from "../../hooks/group/useGetGroupByUser";
import { useGetGroupOfUserAttended } from "../../hooks/group/useGetGroupOfUserAttended";
import  ErrorToast  from "../toasts/ErrorToast";

const JOINED_GROUPS = [
  {
    id: 3,
    name: "Học Lập Trình Web",
    meta: "12 bài viết mới",
    image:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    name: "Hội Yêu Mèo 🐈",
    meta: "Thảo luận sôi nổi",
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=100&h=100&fit=crop",
  },
  {
    id: 5,
    name: "Digital Marketing Pro",
    meta: "5 bài viết mới",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop",
  },
  {
    id: 6,
    name: "Du lịch bụi - Phượt",
    meta: "Hơn 20+ bài viết hôm nay",
    image:
      "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=100&h=100&fit=crop",
  },
];

export const Sidebar = () => {
  const userId = localStorage.getItem("userId");
  const { groups, loading, error } = useGetGroupByUser();
  const { groups: joinedGroups, loading: joinedLoading, error: joinedError } = useGetGroupOfUserAttended(userId || ""); // Replace with actual user ID
  console.log("Groups joined by user:", groups);
  return (
    <>
      <aside className="w-[30%] bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-10">
        <SidebarHeader />
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <GroupSection
            title="Nhóm do bạn quản lý"
            groups={groups}
            loading={loading}
          />
          <hr className="mx-2 mb-6 border-gray-100" />
          <GroupSection
            title="Danh sách tham gia"
            groups={joinedGroups}
            loading={joinedLoading}
          />
        </div>
      </aside>
      {error || joinedError ? <ErrorToast message={error || joinedError} /> : null}
    </>
  );
};
