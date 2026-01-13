import { deletePetHealthLog } from "../../services/PetProfileService";
import { useState } from "react";

export const useDeletePetHealthLog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const deleteLog = async (logId: string ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await deletePetHealthLog(logId);
      return response;
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi xóa log sức khỏe.");
    } finally {
      setLoading(false);
    }
  }

  return { deleteLog, loading, error };
}