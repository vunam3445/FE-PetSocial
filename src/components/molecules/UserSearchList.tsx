// components/UserSearchList.tsx
import React from "react";
import { UserSearchItem } from "../atoms/UserSearchItem";
import type { UserSearchResult } from "../../types/Search";

export const UserSearchList: React.FC<{ users: UserSearchResult[] }> = ({ users }) => {
  // 1. Kiểm tra nếu mảng users rỗng hoặc không tồn tại
  if (!users || users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white shadow-sm rounded-xl">
        <p className="font-medium text-gray-500">
          Không tìm thấy người dùng nào phù hợp.
        </p>
      </div>
    );
  }

  // 2. Nếu có dữ liệu thì render danh sách như bình thường
  return (
    <div className="divide-y divide-gray-100">
      {users.map((user) => (
        <UserSearchItem 
          key={user.user_id} // Đừng quên thêm key để tối ưu render nhé!
          user={user} 
        />
      ))}
    </div>
  );
};