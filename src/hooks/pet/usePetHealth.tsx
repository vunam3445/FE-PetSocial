import { getPetHealthCategories } from "../../services/PetProfileService";
import { useEffect, useState } from "react";

export const usePetHealth = (petId: string, enabled: boolean = true) => {
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthCategories = async () => {
    if (!petId) return;
    setLoading(true);
    try {
      const data = await getPetHealthCategories(petId);
      setHealthData(data);
    } catch (err: any) {
      setError(err.message || "Lỗi tải dữ liệu sức khỏe");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) return; // chỉ fetch khi enabled = true
    fetchHealthCategories();
  }, [petId, enabled]);

  return { healthData, loading, error, refetch: fetchHealthCategories };
};
