import React from "react";
import { CategoryButton } from "../atoms/CategoryButton";
import { useSearchParams } from "react-router-dom";

export const CategorySidebar: React.FC<{ onTypeChange: (type: string) => void }> = ({ onTypeChange }) => {
  const [params] = useSearchParams();
  const currentType = params.get("type") || "post";

  return (
    <div className="w-2/5 pr-8 mt-16">
      <div className="sticky p-6 bg-white border border-gray-100 shadow-sm rounded-2xl top-8">
        <nav className="space-y-2">
          <CategoryButton
            icon="📝"
            label="Bài viết"
            active={currentType === "post"}
            onClick={() => onTypeChange("post")}
          />
          <CategoryButton
            icon="👥"
            label="Người dùng"
            active={currentType === "user"}
            onClick={() => onTypeChange("user")}
          />
          <CategoryButton
            icon="🐕"
            label="Thú cưng"
            active={currentType === "pet"}
            onClick={() => onTypeChange("pet")}
          />
          <CategoryButton
            icon="🏘️" 
            label="Nhóm"
            active={currentType === "group"}
            onClick={() => onTypeChange("group")}
          />
        </nav>
      </div>
    </div>
  );
};
