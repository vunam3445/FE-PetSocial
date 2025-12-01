export const GroupItemSkeleton = () => (
  <div className="flex items-center p-2 rounded-lg cursor-wait animate-pulse">
    
    {/* Avatar skeleton */}
    <div className="w-12 h-12 mr-3 bg-gray-300 rounded-lg" />

    {/* Text skeleton */}
    <div className="flex-1 space-y-2">
      <div className="w-3/4 h-4 bg-gray-300 rounded" />
      {/* <div className="w-1/2 h-3 bg-gray-200 rounded" />  // nếu bạn muốn meta */}
    </div>

  </div>
);
