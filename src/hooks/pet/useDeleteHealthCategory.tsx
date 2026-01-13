import { deleteHealthCategory } from "../../services/PetProfileService";
import { useState } from "react";
export const useDeleteHealthCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const deleteCategory = async (categoryId:string) =>{
        setLoading(true);
        setError(null);
        try {
           const response = await deleteHealthCategory(categoryId);
            return response;
        } catch (error: any) {
            setError(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    }

    return { deleteCategory, loading, error };
}