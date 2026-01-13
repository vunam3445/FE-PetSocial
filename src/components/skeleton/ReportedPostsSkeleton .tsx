import React from "react";

export const ReportedPostsSkeleton = () => {
  // Tạo mảng giả để render 3 item loading
  const skeletons = [1, 2, 3];

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="w-48 h-8 mb-2 bg-gray-200 rounded"></div>
          <div className="w-64 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
      </div>

      {/* List Posts Skeleton */}
      <div className="space-y-8">
        {skeletons.map((i) => (
          <div
            key={i}
            className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            {/* 1. Report Alert Skeleton */}
            <div className="flex items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
              <div className="w-5 h-5 mr-3 bg-gray-200 rounded-full"></div>
              <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* 2. Post Content Skeleton (Mimics PostReport) */}
            <div className="p-4">
              {/* User Info */}
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 mr-3 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-32 h-4 mb-2 bg-gray-200 rounded"></div>
                  <div className="w-20 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>

              {/* Caption lines */}
              <div className="mb-4 space-y-2">
                <div className="w-full h-4 bg-gray-200 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
                <div className="w-4/6 h-4 bg-gray-200 rounded"></div>
              </div>

              {/* Media Placeholder */}
              <div className="w-full h-64 bg-gray-200 rounded-lg"></div>
            </div>

            {/* 3. Action Footer Skeleton */}
            <div className="flex items-center px-5 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex space-x-3">
                {/* Button 1 */}
                <div className="bg-gray-200 rounded-lg h-9 w-28"></div>
                {/* Button 2 */}
                <div className="bg-gray-200 rounded-lg h-9 w-36"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};