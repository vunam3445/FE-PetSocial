import { getPetInfo } from "../../services/PetProfileService";

export const usePet = () => {

  const fetchPetInfo = async (petId: string) => {
    try {
      const petInfo = await getPetInfo(petId);
      return petInfo;
    } catch (error) {
      console.error("Failed to fetch pet info:", error);
      throw error;
    }
  };
  return { fetchPetInfo };
};