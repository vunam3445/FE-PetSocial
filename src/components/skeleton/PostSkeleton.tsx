// components/atoms/PostSkeleton.tsx
import React from "react";

export const PostSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-xl animate-pulse">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="ml-3 space-y-2">
          <div className="w-24 h-3 bg-gray-300 rounded" />
          <div className="w-16 h-3 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Body Image */}
      <div className="w-full h-56 bg-gray-300 rounded-lg" />
    </div>
  );
};
