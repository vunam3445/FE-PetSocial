import { unfollowPet } from "../../services/PetProfileService";
import { useState } from "react";

export const useUnFollowPet = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const unfollow = async (petId: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await unfollowPet(petId);
            return response;
        } catch (err: unknown) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { unfollow, loading, error };
}