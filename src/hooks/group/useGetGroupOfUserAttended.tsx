import { GetGroupOfUserAttend } from "../../services/GroupService";
import type { Group } from "../../types/Group";
import { useState } from "react";

export const useGetGroupOfUserAttended = (userId: string) => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
    const fetchGroups = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await GetGroupOfUserAttend(userId);
            setGroups(data);
        } catch (err: unknown) {
            setError(err.message || "Đã xảy ra lỗi khi tải nhóm.");
        } finally {
            setLoading(false);
        }
    };

    return { groups, loading, error, fetchGroups };
};