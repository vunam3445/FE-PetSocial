import { getConversation } from "../../services/chat/getConversation";
import { useState, useCallback } from "react";
export const useGetConversation = (userId: string,status:string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [conversation, setConversation] = useState<any>(null);
    const fetchConversation = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{
            const data = await getConversation(userId, status);
            if (data) {
                setConversation(data);
            }
        } catch (error) {
            setError("Failed to fetch conversation");
            throw error;
        } finally {
            setLoading(false);
        }
    }, [userId, status]);

    return { loading, error, fetchConversation, conversation };
};