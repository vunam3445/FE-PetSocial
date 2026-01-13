// PetSearchList.tsx
import React from "react";
import { PetSearchItem } from "../atoms/PetSearchItem";
import type { PetSearchResult } from "../../types/Search";

interface PetSearchListProps {
  pets: PetSearchResult[];
}

export const PetSearchList: React.FC<PetSearchListProps> = ({ pets }) => {
  // Trường hợp mảng rỗng
  if (pets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white shadow-sm rounded-xl">
        <span className="mb-3 text-4xl">🐾</span>
        <p className="font-medium text-gray-500">
          Không tìm thấy thú cưng nào phù hợp.
        </p>
      </div>
    );
  }

  // Trường hợp có dữ liệu
  return (
    <div className="space-y-3">
      {pets.map((pet) => (
        <PetSearchItem key={pet.id} pet={pet} />
      ))}
    </div>
  );
};