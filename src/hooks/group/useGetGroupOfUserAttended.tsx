import { GetGroupOfUserAttend } from "../../services/GroupService";
import type { Group } from "../../types/Group";
import { useState, useEffect } from "react"; // Thêm useEffect

export const useGetGroupOfUserAttended = (userId: string) => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGroups = async () => {
    if (!userId) return; // Nếu không có userId thì không gọi
    setLoading(true);
    setError(null);
    try {
      const data = await GetGroupOfUserAttend(userId);
      setGroups(data);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tải nhóm.");
    } finally {
      setLoading(false);
    }
  };

  // QUAN TRỌNG: Thêm useEffect ở đây để tự động gọi API
  useEffect(() => {
    fetchGroups();
  }, [userId]); // Sẽ gọi lại nếu userId thay đổi

  return { groups, loading, error, fetchGroups };
};