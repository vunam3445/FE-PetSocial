
// 1. Skeleton cho từng bài viết (PreviewPost)
const PendingPostSkeletonItem = () => {
  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl animate-pulse">
      {/* Header: Avatar + Name */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 mr-3 bg-gray-200 rounded-full"></div>
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-200 rounded"></div>
          <div className="w-20 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Caption lines */}
      <div className="px-4 mb-4 space-y-2">
        <div className="w-full h-4 bg-gray-200 rounded"></div>
        <div className="w-5/6 h-4 bg-gray-200 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
      </div>

      {/* Media Placeholder (Giả lập ảnh/video) */}
      <div className="w-full h-64 bg-gray-200"></div>

      {/* Footer: Action Buttons (Phần quan trọng nhất của Pending Post) */}
      <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-100 bg-gray-50">
        {/* Button Từ chối */}
        <div className="w-24 bg-gray-300 rounded-lg h-9"></div>
        {/* Button Duyệt */}
        <div className="bg-gray-300 rounded-lg w-28 h-9"></div>
      </div>
    </div>
  );
};

// 2. Skeleton cho toàn trang
export const PendingPostsSkeleton = () => {
  return (
    <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      {/* Header Section Skeleton */}
      <div className="mb-6 animate-pulse">
        <div className="w-48 h-8 mb-2 bg-gray-300 rounded"></div>
        <div className="h-4 mb-4 bg-gray-200 rounded w-96"></div>
        
        {/* Filter Toolbar Skeleton */}
        <div className="flex items-center justify-between mt-4">
          <div className="w-24 h-5 bg-gray-200 rounded"></div>
          <div className="w-32 h-8 bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* List Posts Skeleton */}
      <div className="space-y-6">
        <PendingPostSkeletonItem />
        <PendingPostSkeletonItem />
      </div>
    </div>
  );
};