import { updatePetHealthLog } from "../../services/PetProfileService";
import { useState } from "react";
export const useUpdatePetHealthLog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const updateLog = async (logId: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updatePetHealthLog(logId, data);
      return response;
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi khi cập nhật log sức khỏe.");
    } finally {
      setLoading(false);
    }
  };

  return { updateLog, loading, error };
};