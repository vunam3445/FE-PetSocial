// PetSearchList.tsx
import React from "react";
import { PetSearchItem } from "../atoms/PetSearchItem";
import type { PetSearchResult } from "../../types/Search";


interface PetSearchListProps {
  pets: PetSearchResult[];
}

export const PetSearchList: React.FC<PetSearchListProps> = ({ pets }) => {
  return (
    <div className="space-y-3">
      {pets.map((pet) => (
        <PetSearchItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
};
