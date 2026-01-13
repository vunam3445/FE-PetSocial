// hooks/group/useGetGroupInfo.tsx
import { GetGroupById } from "../../services/GroupService";
import { useEffect, useState } from "react";
import type { GroupWithMemberRole } from "../../types/Group";

export const useGetGroupInfo = (groupId: string | undefined) => { // Chấp nhận undefined
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [groupInfo, setGroupInfo] = useState<GroupWithMemberRole | null>(null);

  useEffect(() => {
    // Nếu không có groupId thì không gọi API
    if (!groupId) return;

    const fetchGroupInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await GetGroupById(groupId);
        setGroupInfo(response);
      } catch (err: any) {
        setError(err.message || "Đã xảy ra lỗi khi tải thông tin nhóm.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupInfo();
  }, [groupId]);

  return { groupInfo, loading, error };
};