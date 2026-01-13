import { useState, useCallback, useRef } from "react";
import { getMembersOfAdd } from "../../services/Conversation";

export default function useGetMemberOfAdd() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Sử dụng Ref để lưu trữ giá trị mà không gây re-render hoặc lặp loop
  const pageRef = useRef(1);
  const hasMoreRef = useRef(true);

  const fetchAvailableUsers = useCallback(async (conversationId: string, isNextPage = false) => {
    // Chặn nếu đang loading hoặc hết dữ liệu khi gọi trang kế tiếp
    if (isLoading || (isNextPage && !hasMoreRef.current)) return;

    setIsLoading(true);
    setError(null);

    try {
      const pageToFetch = isNextPage ? pageRef.current + 1 : 1;
      const response = await getMembersOfAdd(conversationId, pageToFetch);
      
      const result = response.data;
      const newUsers = result.data || [];

      setUsers(prev => isNextPage ? [...prev, ...newUsers] : newUsers);
      
      // Cập nhật Ref
      pageRef.current = pageToFetch;
      hasMoreRef.current = pageToFetch < result.last_page;
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể tải danh sách.");
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // Chỉ phụ thuộc vào isLoading để chặn click nhanh liên tục

  return { 
    users, 
    isLoading, 
    error, 
    hasMore: hasMoreRef.current, 
    fetchAvailableUsers 
  };
}