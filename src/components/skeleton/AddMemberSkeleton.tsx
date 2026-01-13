export const AddMemberSkeleton = () => (
  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 animate-pulse">
    <div className="flex items-center space-x-3">
      {/* Avatar skeleton */}
      <div className="bg-gray-200 rounded-full w-11 h-11"></div>
      <div className="space-y-2">
        {/* Name skeleton */}
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        {/* Email skeleton */}
        <div className="h-3 bg-gray-100 rounded w-36"></div>
      </div>
    </div>
    {/* Checkbox skeleton */}
    <div className="w-5 h-5 bg-gray-100 rounded"></div>
  </div>
);