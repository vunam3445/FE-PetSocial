import { SidebarHeader } from "../groups/SidebarHeader";
import { GroupSection } from "../groups/GroupSection";
import { useGetGroupByUser } from "../../hooks/group/useGetGroupByUser";
import { useGetGroupOfUserAttended } from "../../hooks/group/useGetGroupOfUserAttended";
import  ErrorToast  from "../toasts/ErrorToast";



export const Sidebar = () => {
  const userId = localStorage.getItem("user_id");
  const { groups, loading, error } = useGetGroupByUser();
  const { groups: joinedGroups, loading: joinedLoading, error: joinedError } = useGetGroupOfUserAttended(userId || ""); 
  console.log("joined ", joinedGroups);
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
