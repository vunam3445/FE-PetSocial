import { CreateGroup } from "../../services/GroupService";

import { useState } from "react";

export const useCreateGroup = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const userId = localStorage.getItem("user_id");
    const createGroup = async (name: string, visibility: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await CreateGroup(name, visibility, userId);
            return response;   
        } catch (err: unknown) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { createGroup, loading, error };
};