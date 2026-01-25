import { GetGroupsByUser } from "../../services/GroupService";
import { useState, useEffect } from "react";

// Định nghĩa Interface để code sạch hơn
interface PaginationResponse {
  data: any[];
  current_page: number;
  last_page: number;
}

export const useGetGroupByUser = (page: number = 1) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groups, setGroups] = useState<any[]>([]); // Sử dụng tên state đồng nhất
  const [hasMore, setHasMore] = useState(false);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    // useGetGroupByUser.ts
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const res = await GetGroupsByUser(userId, page);
        // res là object phân trang, res.data mới là mảng các group
        const groupArray = res.data;

        if (page === 1) {
          setGroups(groupArray);
        } else {
          setGroups((prev) => [...prev, ...groupArray]);
        }

        // Cập nhật hasMore dựa trên logic phân trang
        setHasMore(res.current_page < res.last_page);
      } catch (err) {
        setError("Failed to fetch groups");
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, [page, userId]); // Hook sẽ chạy lại khi page hoặc userId thay đổi

  return { groups, loading, error, hasMore, setGroups };
};
