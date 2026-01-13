import { useState } from "react";
import { addMembers } from "../../services/Conversation";

export const useAddMemberOfConversation =()=> {
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const executeAddMembers = async (conversationId: string, userIds: string[]) => {
    if (userIds.length === 0) return;

    setIsAdding(true);
    setAddError(null);
    setIsSuccess(false);

    try {
      // Lưu ý: Backend Laravel thường nhận dữ liệu dạng { user_ids: [...] }
      // Nếu service của bạn nhận raw array, hãy sửa lại ở file service
      await addMembers(conversationId, userIds);
      
      setIsSuccess(true);
      return true; // Trả về true để Modal biết đã thành công
    } catch (err: any) {
      const msg = err.response?.data?.message || "Không thể thêm thành viên.";
      setAddError(msg);
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return { executeAddMembers, isAdding, addError, isSuccess };
};