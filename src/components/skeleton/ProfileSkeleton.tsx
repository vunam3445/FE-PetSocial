import { Skeleton } from "@mui/material";

export const ProfileSkeleton = () => {
  return (
    <div className="max-w-6xl px-4 py-6 mx-auto space-y-6">
      {/* Cover Image Skeleton */}
      <Skeleton variant="rectangular" height={200} />

      {/* Avatar + Info Skeleton */}
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={80} height={80} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="30%" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <Skeleton variant="rectangular" height={40} width="100%" />

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        {/* Left Sidebar */}
        <div className="space-y-4">
          <Skeleton variant="rectangular" height={150} />
          <Skeleton variant="rectangular" height={250} />
        </div>

        {/* Right Content */}
        <div className="space-y-4 lg:col-span-2">
          <Skeleton variant="rectangular" height={120} />
          <Skeleton variant="rectangular" height={180} />
          <Skeleton variant="rectangular" height={180} />
        </div>
      </div>
    </div>
  );
};
