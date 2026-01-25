import React, { useEffect, useRef, useState } from "react";
import type { GroupWithMemberRole } from "../../../../../types/Group";
import { Link } from "react-router-dom";
import { useGetMembersOfGroup } from "../../../../../hooks/group/useGetMembersOfGroup";
import { useSearchUsersOfGroup } from "../../../../../hooks/search/useSearchUsersOfGroup";
import { useDeleteGroupMember } from "../../../../../hooks/groupMember/useDeleteGroupMember";

import { GroupMembersSkeleton } from "../../../../skeleton/MemberSkeletonItem";
import { LoadingSpinner } from "../../../../loadings/LoadingSpinner";
import ErrorToast from "../../../../toasts/ErrorToast";

type MemberRole = "admin" | "moderator" | "member";

interface GroupMembersProps {
  groupInfo: GroupWithMemberRole | null;
}

export const GroupMembers: React.FC<GroupMembersProps> = ({ groupInfo }) => {
  const groupId = groupInfo?.group.group_id;


  const [inputValue, setInputValue] = useState("");

  const {
    users: searchUsers,
    setUsers: setSearchUsers,
    keyword,
    setKeyword,
    loadMore: loadMoreSearch,
    hasMore: searchHasMore,
    loading: searchLoading,
    error: searchError,
  } = useSearchUsersOfGroup(groupId);


  const [page, setPage] = useState(1);

  const {
    members,
    setMembers,
    hasMore,
    loading,
    error,
    refetch,
  } = useGetMembersOfGroup(groupId, page);


  const { deleteGroupMember } = useDeleteGroupMember();


  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);


  const isSearching = keyword.trim() !== "";

  const listData = isSearching ? searchUsers : members;
  const isLoading = isSearching ? searchLoading : loading;
  const canLoadMore = isSearching ? searchHasMore : hasMore;

  const loadMore = isSearching
    ? loadMoreSearch
    : () => setPage((prev) => prev + 1);


  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;
    if (isLoading || !canLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [isLoading, canLoadMore, isSearching]);


  useEffect(() => {
    if (!groupId || isSearching) return;
    refetch();
  }, [page, groupId, isSearching]);


  useEffect(() => {
    if (inputValue.trim() === "") {
      setKeyword("");
    }
  }, [inputValue]);


  useEffect(() => {
    if (error || searchError) {
      setShowError(true);
    }
  }, [error, searchError]);


  useEffect(() => {
    const close = () => setActiveMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);


  const handleDeleteMember = async (userId: string) => {
    if (!groupId) return;

    await deleteGroupMember(groupId, userId);

    if (isSearching) {
      setSearchUsers((prev) => prev.filter((u) => u.user_id !== userId));
    } else {
      setMembers((prev) => prev.filter((m) => m.user_id !== userId));
    }

    setActiveMenuId(null);
  };

  const getRoleBadge = (role: MemberRole) =>
    role === "admin" ? (
      <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">
        Quản trị viên
      </span>
    ) : (
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
        Thành viên
      </span>
    );


  if (isLoading && listData.length === 0) {
    return <GroupMembersSkeleton />;
  }


  return (
    <div className="w-full max-w-5xl px-4 py-6 mx-auto">
      <div className="overflow-visible bg-white border rounded-lg shadow-sm">
        {/* HEADER */}
        <div className="p-6 border-b">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold">
              Thành viên{" "}
              <span className="text-sm font-normal text-gray-500">
                ({listData.length})
              </span>
            </h2>

            <input
              type="text"
              placeholder="Tìm kiếm thành viên..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setKeyword(inputValue.trim());
                }
              }}
              className="w-full px-4 py-2 border rounded-lg sm:w-72"
            />
          </div>
        </div>

        {/* LIST */}
        <div className="divide-y">
          {listData.length > 0 ? (
            listData.map((member, index) => (
              <div
                key={member.user_id}
                ref={index === 14 ? observerRef : null}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Link to={`/profile/${member.user_id}`} className="flex items-center gap-3 group">
                      <img
                        src={member.avatar_url}
                        className="object-cover w-12 h-12 transition-opacity border rounded-full group-hover:opacity-80"
                        alt={member.name}
                      />
                      <div>
                        <h3 className="font-semibold transition-colors group-hover:text-blue-600">
                          {member.name}
                        </h3>
                        {getRoleBadge(member.role as MemberRole)}
                      </div>
                    </Link>
                </div>

                {member.role !== "admin" && (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenuId(member.user_id);
                      }}
                      className="p-2 rounded-full hover:bg-gray-200"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </button>

                    {activeMenuId === member.user_id && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow">
                        <button
                          onClick={() => handleDeleteMember(member.user_id)}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                        >
                          Xóa thành viên
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              Không tìm thấy thành viên nào
            </div>
          )}

          {isLoading && <LoadingSpinner />}
        </div>
      </div>

      <ErrorToast
        open={showError}
        text="Có lỗi xảy ra, vui lòng thử lại"
        onClose={() => setShowError(false)}
      />
    </div>
  );
};
