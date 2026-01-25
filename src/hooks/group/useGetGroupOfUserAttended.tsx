import { GetGroupOfUserAttend } from "../../services/GroupService";
import type { Group } from "../../types/Group";
import { useState, useEffect } from "react";

// Giả định cấu trúc trả về của Laravel Paginate hoặc API tương đương
interface PaginationResponse {
  data: Group[];
  current_page: number;
  last_page: number;
}

export const useGetGroupOfUserAttended = (userId: string, page: number = 1) => {
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const fetchGroups = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      // ✅ Truyền page vào Service
      const res: PaginationResponse = await GetGroupOfUserAttend(userId, page);
      
      if (page === 1) {
        // Trang đầu tiên: Thay thế toàn bộ danh sách
        setGroups(res.data);
      } else {
        // Trang tiếp theo: Cộng dồn vào danh sách cũ
        setGroups((prev) => [...prev, ...res.data]);
      }

      // Kiểm tra xem còn dữ liệu để tải tiếp không
      setHasMore(res.current_page < res.last_page);
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi tải nhóm.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, [userId, page]); // ✅ Chạy lại khi đổi User hoặc đổi trang

  return { groups, loading, error, hasMore, setGroups };
};