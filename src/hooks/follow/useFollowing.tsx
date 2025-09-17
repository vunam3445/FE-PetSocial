import { useState, useEffect } from "react";
import api from "../../lib/axios";
import type { Friend } from "../../types/Friend";

interface PaginationMeta {
  current_page: number;
  last_page: number;
}

export const useFollowing = (userId: string | undefined, enabled: boolean = true) => {
  const [following, setFollowing] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const fetchFollowing = async (pageNum = 1) => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/users/${userId}/following?page=${pageNum}`);
      const { data, meta } = res.data;

      if (pageNum === 1) {
        setFollowing(data);
      } else {
        setFollowing((prev) => [...prev, ...data]);
      }

      setMeta(meta);
      setPage(pageNum);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // chỉ fetch khi enabled (tab Following đang mở)
  useEffect(() => {
    if (enabled && userId) {
      fetchFollowing(1);
    }
  }, [userId, enabled]);

  const loadMore = () => {
    if (meta && page < meta.last_page) {
      fetchFollowing(page + 1);
    }
  };

  return { following, loading, error, loadMore, meta };
};
