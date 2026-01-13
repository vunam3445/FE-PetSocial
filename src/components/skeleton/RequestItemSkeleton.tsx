import React from "react";

// 1. Skeleton cho từng yêu cầu tham gia (RequestItem)
const RequestItemSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 animate-pulse">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Avatar Skeleton */}
        <div className="shrink-0">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>

        {/* Content Skeleton */}
        <div className="flex-1 space-y-3">
          {/* Name & Time */}
          <div className="space-y-2">
            <div className="w-40 h-5 bg-gray-200 rounded"></div>
            <div className="w-24 h-3 bg-gray-200 rounded"></div>
          </div>

          {/* Answer lines (Giả lập câu trả lời) */}
          <div className="py-2 space-y-2">
            <div className="w-full h-3 bg-gray-100 rounded"></div>
            <div className="w-3/4 h-3 bg-gray-100 rounded"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            {/* Button Duyệt */}
            <div className="w-24 bg-gray-300 rounded-lg h-9"></div>
            {/* Button Từ chối */}
            <div className="w-24 bg-gray-200 rounded-lg h-9"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Skeleton cho toàn bộ khung MemberRequests
export const MemberRequestsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center justify-between gap-4 p-4 border-b border-gray-100 sm:flex-row animate-pulse">
        {/* Title & Count */}
        <div className="w-48 h-8 bg-gray-200 rounded"></div>
        
        {/* Search Bar */}
        <div className="w-full h-10 bg-gray-200 rounded-lg sm:w-64"></div>
      </div>

      {/* List Requests Skeleton */}
      <div className="divide-y divide-gray-100">
        {/* Render 4-5 items để lấp đầy không gian */}
        {Array.from({ length: 5 }).map((_, index) => (
          <RequestItemSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};