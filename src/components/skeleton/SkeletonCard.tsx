// components/atoms/SkeletonCard.tsx
import React from "react";

export const SkeletonCard: React.FC = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
      <div className="flex items-center space-x-4">
        {/* Avatar */}
        <div className="w-12 h-12 bg-gray-300 rounded-full" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <div className="w-3/5 h-4 bg-gray-300 rounded" />
          <div className="w-2/5 h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};
