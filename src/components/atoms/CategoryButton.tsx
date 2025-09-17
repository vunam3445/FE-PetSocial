import React from "react";

interface CategoryButtonProps {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({
  icon,
  label,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 space-x-3 text-left transition-colors duration-200 rounded-xl category-btn
        ${active ? "bg-purple-50 text-purple-700 hover:bg-purple-100" : "text-gray-600 hover:bg-gray-50"}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};
