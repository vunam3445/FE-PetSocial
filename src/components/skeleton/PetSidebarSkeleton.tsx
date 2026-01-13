export const PetSidebarSkeleton = () => {
  return (
    <div className="p-4 bg-white shadow rounded-2xl animate-pulse">
      <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full" />
      <div className="w-3/4 h-4 mx-auto mt-4 bg-gray-300 rounded" />
      <div className="w-1/2 h-3 mx-auto mt-2 bg-gray-200 rounded" />
      <div className="w-5/6 h-3 mx-auto mt-4 bg-gray-200 rounded" />
      <div className="w-4/6 h-3 mx-auto mt-2 bg-gray-200 rounded" />
    </div>
  );
};
