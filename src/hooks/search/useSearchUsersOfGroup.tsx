import { useEffect, useState } from "react";
import { searchUsersOfGroup } from "../../services/SearchService";

export interface GroupUser {
  user_id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joined_at: string;
}

interface Pagination {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export const useSearchUsersOfGroup = (groupId: string) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);

  const [users, setUsers] = useState<GroupUser[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!groupId || loading) return;

    try {
      setLoading(true);
      setError(null);

      const res = await searchUsersOfGroup(groupId, keyword, page);

      const response = res.data;

      setUsers(prev =>
        page === 1 ? response.data : [...prev, ...response.data]
      );

      setPagination({
        current_page: response.current_page,
        last_page: response.last_page,
        per_page: response.per_page,
        total: response.total,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  /* 🔹 Reset khi keyword hoặc groupId thay đổi */
  useEffect(() => {
    setPage(1);
    setUsers([]);
  }, [keyword, groupId]);

  /* 🔹 Fetch khi page / keyword / groupId đổi */
  useEffect(() => {
    fetchUsers();
  }, [page, keyword, groupId]);

  /* 🔹 Helper cho infinite scroll */
  const loadMore = () => {
    if (!pagination) return;
    if (loading) return;
    if (page >= pagination.last_page) return;

    setPage(prev => prev + 1);
  };

  return {
    users,
    setUsers,

    keyword,
    setKeyword,

    page,
    setPage,

    pagination,
    loading,
    error,

    loadMore,
    hasMore: pagination ? page < pagination.last_page : false,
  };
};
