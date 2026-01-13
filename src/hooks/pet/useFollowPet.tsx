import { followPet } from "../../services/PetProfileService";
import { useState } from "react";
export const useFollowPet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const follow = async (petId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await followPet(petId);
            return response;
        } catch (err: unknown) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { follow, loading, error };
}