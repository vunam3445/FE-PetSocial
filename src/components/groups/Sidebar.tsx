import { useEffect, useState} from "react";
import { SidebarHeader } from "../groups/SidebarHeader";
import { GroupSection } from "../groups/GroupSection";
import { useGetGroupByUser } from "../../hooks/group/useGetGroupByUser";
import { useGetGroupOfUserAttended } from "../../hooks/group/useGetGroupOfUserAttended";
import ErrorToast from "../toasts/ErrorToast";
import type { Group } from "../../types/Group";
interface SidebarProps {
  newGroup?: Group | null; // Nhận nhóm mới từ component cha
}

export const Sidebar = ({ newGroup }: SidebarProps) => {
  const userId = localStorage.getItem("user_id");

  // State quản lý trang cho từng phần
  const [myGroupsPage, setMyGroupsPage] = useState(1);
  const [joinedGroupsPage, setJoinedGroupsPage] = useState(1);

  // Gọi Hook với page tương ứng
  const { 
    groups, 
    loading, 
    error, 
    hasMore: myHasMore 
  } = useGetGroupByUser(myGroupsPage);

  const {
    groups: joinedGroups,
    loading: joinedLoading,
    error: joinedError,
    hasMore: joinedHasMore
  } = useGetGroupOfUserAttended(userId || "", joinedGroupsPage);

  const [myGroups, setMyGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (groups) {
      setMyGroups(groups);
    }
  }, [groups]);

  useEffect(() => {
    if (newGroup) {
      setMyGroups((prev) => [newGroup, ...prev]);
    }
  }, [newGroup]);

  return (
    <>
      <aside className="w-[30%] bg-white border-r border-gray-200 flex flex-col h-full shadow-sm z-10">
        <SidebarHeader />
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          <GroupSection
            title="Nhóm do bạn quản lý"
            groups={myGroups}
            loading={loading}
            hasMore={myHasMore}
            onLoadMore={() => setMyGroupsPage(prev => prev + 1)}
          />
          <hr className="mx-2 mb-6 border-gray-100" />
          <GroupSection
            title="Danh sách tham gia"
            groups={joinedGroups}
            loading={joinedLoading}
            hasMore={joinedHasMore}
            onLoadMore={() => setJoinedGroupsPage(prev => prev + 1)}
          />
        </div>
      </aside>
      {error || joinedError ? (
        <ErrorToast message={error || joinedError} />
      ) : null}
    </>
  );
};