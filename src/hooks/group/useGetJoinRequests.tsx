import { GetJoinRequests } from "../../services/GroupService";
import { useState, useCallback } from "react";
import type { JoinRequest } from "../../types/QuestionAndAnswer";

export const useGetJoinRequests = () => {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchJoinRequests = useCallback(async (groupId: string, page: number = 1) => {
    if (!groupId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await GetJoinRequests(groupId, page);
      const payload = res.data;

      if (page === 1) {
        setJoinRequests(payload.data);
      } else {
        setJoinRequests(prev => [...prev, ...payload.data]);
      }

      setHasMore(payload.current_page < payload.last_page);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load join requests");
    } finally {
      setLoading(false);
    }
  }, []);

  return { joinRequests, loading, error, hasMore, fetchJoinRequests, setJoinRequests };
};
