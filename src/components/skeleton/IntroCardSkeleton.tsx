import React from 'react';

export const IntroCardSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow animate-pulse">
      {/* Skeleton cho Tiêu đề "Giới thiệu" */}
      <div className="w-32 h-6 mb-4 bg-gray-200 rounded"></div>

      {/* Skeleton cho nội dung mô tả (3 dòng độ dài khác nhau cho tự nhiên) */}
      <div className="mb-4 space-y-2">
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-11/12 h-4 bg-gray-200 rounded"></div>
        <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Skeleton cho List items (Icon + Text) */}
      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center">
            {/* Giả lập Icon */}
            <div className="w-6 h-6 mr-2 bg-gray-200 rounded-full"></div>
            {/* Giả lập Text */}
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};