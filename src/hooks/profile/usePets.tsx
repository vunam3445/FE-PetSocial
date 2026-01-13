import { getAllPetsOfUser } from "../../services/profileService";
import { useState } from "react";

export const usePets = (userId?: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPets = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!userId) return [];
      const data = await getAllPetsOfUser(userId);
        return data;
    } catch (err: any) {
      setError(err.message || "Lỗi tải danh sách thú cưng");
      return [];
    } finally {
      setLoading(false);
    }
  };


  return {  loading, error, getPets };
};
