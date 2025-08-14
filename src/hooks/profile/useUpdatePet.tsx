// hooks/useUpdatePet.ts
import { useState } from "react";
import api from "../../lib/axios"; // hoặc đường dẫn đúng với project bạn

export const useUpdatePet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const updatePet = async (
    petId: string,
    formData: FormData,
    onSuccess?: () => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/pets/${petId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Pet updated successfully:", response.data);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error updating pet:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { updatePet, loading, error };
};
