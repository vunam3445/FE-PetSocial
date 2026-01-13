import { useState } from "react";
import { deleteMemberOfConversation } from "../../services/Conversation";

export default function useDeleteMemberOfConversation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteMember = async (conversationId: string, targetId: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await deleteMemberOfConversation(conversationId, targetId);

            if (response.status === 'success') {
                return { success: true, data: response };
            }
            
            return { success: false };
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Có lỗi xảy ra khi xóa thành viên";
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsLoading(false);
        }
    };

    return {
        deleteMember,
        isLoading,
        error
    };
}