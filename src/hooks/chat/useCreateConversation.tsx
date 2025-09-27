import { createConversation as createConversationService } from '../../services/chat/createConversation';
import { useState, useCallback } from 'react';
import type { ConversationPayload } from '../../types/Chat';

export function useCreateConversation() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | string>(null);

    const createConversation = useCallback(async (payload: ConversationPayload) => {
        setLoading(true);
        setError(null);
        try {
            const response = await createConversationService(payload);
            if (response) {
                setLoading(false);
            return response;
            }
        } catch (err: any) {
            setError(err.message || 'Failed to create conversation');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { createConversation, loading, error };
}
