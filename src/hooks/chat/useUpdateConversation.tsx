import { useState } from 'react';
import { updateConversation } from '../../services/Conversation';

interface UseUpdateConversationReturn {
    updateInfo: (conversationId: string, name: string, file: File | null) => Promise<void>;
    loading: boolean;
    error: any;
}

export const useUpdateConversation = (): UseUpdateConversationReturn => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    // Thay đổi: Trả về dữ liệu từ updateConversation
    const updateInfo = async (conversationId: string, name: string, file: File | null) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateConversation(conversationId, name, file);
            return response.data; // Trả về object chứa name và avatar_url mới
        } catch (err: any) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateInfo, loading, error };
};