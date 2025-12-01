import { GetGroupsByUser } from "../../services/GroupService";

import { useState, useEffect } from "react";

export const useGetGroupByUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [groups, setGroups] = useState<any[]>([]);
    const userId = localStorage.getItem("user_id");
    const fetchGroups = async () => {
        setLoading(true);
        setError(null);
        try {
            if (userId) {
                const data = await GetGroupsByUser(userId);
                setGroups(data);
            } else {
                setError("User ID not found");
            }
        } catch (err) {
            setError("Failed to fetch groups");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    return { groups, loading, error };
};  