export const QuestionItemSkeleton: React.FC = () => {
  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          {/* Title skeleton */}
          <div className="w-24 h-4 mb-2 bg-gray-200 rounded"></div>

          {/* Content skeleton */}
          <div className="w-full h-5 mb-1 bg-gray-200 rounded"></div>
          <div className="w-5/6 h-5 bg-gray-200 rounded"></div>
        </div>

        <div className="flex flex-col space-y-2 shrink-0">
          {/* Button skeletons */}
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
          <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};
