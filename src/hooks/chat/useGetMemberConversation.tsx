import { useState, useCallback } from "react";
import { getMemberConversation } from "../../services/Conversation";
import { type Member } from "../../types/Conversation";

export default function useGetMemberConversation() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async (conversationId: string) => {
    if (!conversationId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await getMemberConversation(conversationId);
      // Giả sử API trả về data nằm trong response.data hoặc trực tiếp response
      const data = response.data || response; 
      setMembers(data);
    } catch (err: any) {
      setError(err.message || "Không thể tải danh sách thành viên");
      console.error("Fetch members error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    members,
    isLoading,
    error,
    fetchMembers,
    setMembers // Trả về để có thể cập nhật UI ngay lập tức khi xóa thành viên
  };
}