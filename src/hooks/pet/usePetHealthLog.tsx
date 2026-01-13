import { getPetHealthLog } from "../../services/PetProfileService";
import { useState } from "react";
import type { HealthCategoryList } from "../../types/Pet";
export const usePetHealthLog = (petId: string) => {
  const [healthLog, setHealthLog] = useState<HealthCategoryList | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fetchPetHealthLog = async () => {
    if (!petId) return;
    setLoading(true);
    try {
      const data = await getPetHealthLog(petId);
      if (data) {
        setHealthLog(data);
      }
    } catch (err: any) {
      setError(err.message || "Lỗi tải dữ liệu lịch sử sức khỏe");
    } finally {
      setLoading(false);
    }
  };
  return { healthLog, loading, error, fetchPetHealthLog };
};
