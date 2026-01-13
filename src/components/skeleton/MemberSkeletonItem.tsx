import React from "react";

const MemberSkeletonItem = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-50 last:border-none">
      <div className="flex items-center gap-3">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        
        {/* Name & Role Skeleton */}
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* 3-dots Button Skeleton */}
      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export const GroupMembersSkeleton = () => {
  return (
    <div className="w-full max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8 animate-pulse">
      <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* Header & Search Bar Skeleton */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Title Skeleton */}
            <div className="w-48 h-8 bg-gray-200 rounded"></div>

            {/* Search Input Skeleton */}
            <div className="w-full h-10 bg-gray-200 rounded-lg sm:w-72"></div>
          </div>
        </div>

        {/* List Members Skeleton */}
        <div className="divide-y divide-gray-100">
          {/* Render 6 items giả lập để lấp đầy màn hình */}
          {Array.from({ length: 6 }).map((_, index) => (
            <MemberSkeletonItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};