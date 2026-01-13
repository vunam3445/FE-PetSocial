import { createHealthLog } from "../../services/PetProfileService";
import { useState } from "react";
export const useCreateHealthLog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const createHealthCategory = async (data: any) => {
        try {
            setLoading(true);
            const response = await createHealthLog(data);
            return response;
        } catch (error) {
            setError(error as Error);
            console.error("Error creating health log:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { createHealthCategory, loading, error };
}