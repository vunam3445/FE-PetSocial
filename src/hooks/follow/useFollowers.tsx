// hooks/follow/useFollowers.tsx
import { useState, useEffect } from "react";
import api from "../../lib/axios";
import type { Friend } from "../../types/Friend";

interface PaginationMeta {
  current_page: number;
  last_page: number;
}

export const useFollowers = (userId: string | undefined) => {
  const [followers, setFollowers] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const fetchFollowers = async (pageNum = 1) => {
    if (!userId) return;
    try {
      setLoading(true);
      setError(null);

      const res = await api.get(`/users/${userId}/followers?page=${pageNum}`);
      const { data, meta } = res.data;

      if (pageNum === 1) {
        setFollowers(data);
      } else {
        setFollowers((prev) => [...prev, ...data]);
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

  // lần đầu load trang 1
  useEffect(() => {
    if (userId) fetchFollowers(1);
  }, [userId]);

  const loadMore = () => {
    if (meta && page < meta.last_page) {
      fetchFollowers(page + 1);
    }
  };

  return { followers, loading, error, loadMore, meta };
};
