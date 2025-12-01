// src/components/skeleton/HealthCardSkeleton.tsx
import React from "react";

export const HealthCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <div className="w-32 h-5 bg-gray-200 rounded"></div>
        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
      </div>

      {/* Body */}
      <div className="flex-grow p-5 space-y-4">
        <div className="w-full h-40 bg-gray-200 rounded"></div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <div className="w-48 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};
