import { useState } from "react";
import { updatePetHealthLogService } from "../../services/PetProfileService";

export const useUpdatePetHealthLog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLog = async (logId: string, allData: any) => {
    setLoading(true);
    setError(null);
    try {
      // Gọi service đã sửa ở trên
      const response = await updatePetHealthLogService(logId, allData);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Đã xảy ra lỗi khi cập nhật.";
      setError(message);
      throw err; // Throw để component có thể xử lý (ví dụ: không đóng modal nếu lỗi)
    } finally {
      setLoading(false);
    }
  };

  return { updateLog, loading, error };
};