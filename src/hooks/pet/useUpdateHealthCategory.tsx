import { updateHealthCategory } from "../../services/PetProfileService";
import { useState } from "react";
export const useUpdateHealthCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const updateCategory = async (categoryId:string, data:any) =>{
        setLoading(true);
        setError(null);
        try {
            const response = await updateHealthCategory(categoryId, data);
            return response;
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };
    return { updateCategory, loading, error };
};