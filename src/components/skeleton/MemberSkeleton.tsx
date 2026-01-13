export const MemberSkeleton = () => (
  <div className="flex items-center justify-between px-6 py-3 border-b border-gray-50 last:border-0 animate-pulse">
    <div className="flex items-center space-x-3">
      {/* Avatar skeleton */}
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="space-y-2">
        {/* Name skeleton */}
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        {/* Role skeleton */}
        <div className="w-16 h-3 bg-gray-100 rounded"></div>
      </div>
    </div>
    {/* Action button skeleton */}
    <div className="w-8 h-8 bg-gray-100 rounded-full"></div>
  </div>
);