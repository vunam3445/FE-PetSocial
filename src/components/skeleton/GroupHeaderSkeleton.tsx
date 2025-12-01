export const GroupHeaderSkeleton = () => {
  return (
    <header className="bg-white shadow-sm animate-pulse">
      <div className="mx-auto max-w-7xl">

        {/* Cover Photo */}
        <div className="w-full h-48 bg-gray-300 rounded-t-lg lg:h-56"></div>

        {/* Group Info */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">

            {/* Avatar */}
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full sm:w-40 sm:h-40 mt-[-64px] border-4 border-white"></div>
            </div>

            {/* Name + subtitle */}
            <div className="flex-1 min-w-0 mt-3 text-center sm:mt-0 sm:pb-5 sm:text-left">
              <div className="w-48 h-6 mx-auto bg-gray-300 rounded sm:mx-0"></div>
              <div className="w-32 h-4 mx-auto mt-3 bg-gray-200 rounded sm:mx-0"></div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center py-4 space-x-2 sm:justify-end">
              <div className="h-10 bg-gray-300 rounded-lg w-28"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="px-4 border-t border-gray-100 sm:px-6 lg:px-8">
          <div className="flex mt-3 space-x-6">
            <div className="w-20 h-8 bg-gray-200 rounded"></div>
            <div className="w-24 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded w-28"></div>
          </div>
        </div>

      </div>
    </header>
  );
};
