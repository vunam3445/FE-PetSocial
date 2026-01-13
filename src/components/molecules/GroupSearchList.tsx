// src/components/molecules/GroupSearchList.tsx
import React from "react";
import { GroupSearchItem } from "../atoms/GroupSearchItem";
import type { GroupSearchResult } from "../../types/Search";

interface GroupSearchListProps {
  groups:  GroupSearchResult[];
}

export const GroupSearchList: React.FC<GroupSearchListProps> = ({ groups }) => {
  if (!groups || groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-white border border-gray-300 border-dashed rounded-2xl">
        <div className="mb-3 text-4xl">🏘️</div>
        <h3 className="text-lg font-medium text-gray-900">Không tìm thấy nhóm nào</h3>
        <p className="text-gray-500">Thử tìm kiếm với từ khóa khác xem sao.</p>
      </div>
    );
  }

  // SỬA: Dùng space-y-4 thay vì grid để item trải dài 100%
  return (
    <div className="flex flex-col space-y-4"> 
      {groups.map((group) => (
        <GroupSearchItem key={group.id} group={group} />
      ))}
    </div>
  );
};