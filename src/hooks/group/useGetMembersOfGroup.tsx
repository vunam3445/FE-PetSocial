import { useEffect, useState, useCallback } from "react";
import type { Member } from "../../types/Group";
import { GetMembers } from "../../services/GroupService";

interface UseGetMembersOfGroupResult {
  loading: boolean;
  error: string | null;
  members: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
  hasMore: boolean;
  refetch: () => void;
  reset: () => void;
}

export const useGetMembersOfGroup = (
  groupId: string,
  page: number = 1,
): UseGetMembersOfGroupResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [hasMore, setHasMore] = useState(false);

  const fetchMembers = useCallback(async () => {
    if (!groupId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await GetMembers(groupId, page);

      if (response.status === 200 && response.data) {
        const result = response.data;
        const newMembers: Member[] = result.data ?? [];

        setMembers((prev) => {
          if (page === 1) return newMembers;

          // tránh trùng khi React StrictMode
          const existingIds = new Set(prev.map((m) => m.user_id));
          const unique = newMembers.filter((m) => !existingIds.has(m.user_id));

          return [...prev, ...unique];
        });

        setHasMore(result.current_page < result.last_page);
      }
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  }, [groupId, page]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const reset = () => {
    setMembers([]);
    setHasMore(false);
    setError(null);
  };

  return {
    loading,
    error,
    members,
    setMembers,
    hasMore,
    refetch: fetchMembers,
    reset,
  };
};
