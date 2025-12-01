import { getHealthCategories } from "../../services/PetProfileService";
import { useEffect, useState } from "react";
import type { PetHealthCategoryList } from "../../types/Pet";
export const usePetHealthCategories = (species: string) => {
  const [categories, setCategories] = useState<PetHealthCategoryList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthCategories = async () => {
      try {
        const data = await getHealthCategories(species);
        setCategories(data);
      } catch (error) {
        setError("Failed to fetch health categories");
        console.error("❌ Fetch health categories failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthCategories();
  }, [species]);

  return { categories, loading, error };
};

   