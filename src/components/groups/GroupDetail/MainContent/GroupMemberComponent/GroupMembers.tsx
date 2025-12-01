// components/groups/GroupDetail/MainContent/GroupMembers.tsx
import React, { useState, useEffect, useRef } from "react";
import type { GroupWithMemberRole } from "../../../../../types/Group";
import { useGetMembersOfGroup } from "../../../../../hooks/group/useGetMembersOfGroup";
import { LoadingSpinner } from "../../../../loadings/LoadingSpinner";
import ErrorToast from "../../../../toasts/ErrorToast";

type MemberRole = 'admin' | 'moderator' | 'member';

interface GroupMembersProps {
  groupInfo: GroupWithMemberRole | null;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupInfo }) => {
  const [page, setPage] = useState(1);
  const { loading, error, hasMore, members, fetchDataMembers } = useGetMembersOfGroup(page, groupInfo?.group.group_id);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);

  // Hiển thị toast nếu có lỗi
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  // Scroll listener cho infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!listRef.current || loading || !hasMore) return;

      const children = listRef.current.children;
      if (children.length >= 15) {
        const fifteenthItem = children[14] as HTMLElement;
        if (!fifteenthItem) return;

        const rect = fifteenthItem.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [members, loading, hasMore]);

  // Fetch khi page thay đổi
  useEffect(() => {
    if (groupInfo && hasMore) {
      fetchDataMembers(groupInfo.group.group_id);
    }
  }, [page, groupInfo]);

  // Filter members theo search
  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: MemberRole) => {
    switch (role) {
      case 'admin':
        return <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">Quản trị viên</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">Thành viên</span>;
    }
  };

  return (
    <div className="w-full max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header & Search Bar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Thành viên <span className="text-sm font-normal text-gray-500">({members.length})</span>
            </h2>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Tìm kiếm thành viên..."
                className="w-full py-2 pl-10 pr-4 text-sm transition-all border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-2.5 text-gray-400"></i>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="divide-y divide-gray-100" ref={listRef}>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div key={member.user_id} className="flex items-center justify-between p-4 transition-colors hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <img
                    src={member.avatar_url}
                    alt={member.name}
                    className="object-cover w-12 h-12 border border-gray-200 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{member.name}</h3>
                    {getRoleBadge(member.role)}
                  </div>
                </div>

                <button className="p-2 text-gray-400 transition-colors rounded-full hover:text-gray-600 hover:bg-gray-200">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              <i className="mb-3 text-4xl text-gray-300 fas fa-user-slash"></i>
              <p>Không tìm thấy thành viên nào phù hợp.</p>
            </div>
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>

      <ErrorToast
        open={showError}
        text="Có lỗi xảy ra vui lòng thử lại sau"
        onClose={() => setShowError(false)}
      />
    </div>
  );
};
