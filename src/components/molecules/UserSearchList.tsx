// components/UserSearchList.tsx
import React from "react";
import { UserSearchItem } from "../atoms/UserSearchItem";
import type { UserSearchResult } from "../../types/Search";


export const UserSearchList: React.FC<{ users: UserSearchResult[] }> = ({ users }) => {
  return (
    <div className="divide-y divide-gray-100">
      {users.map((user) => (
        <UserSearchItem
            user={user}
        />
      ))}
    </div>
  );
};
