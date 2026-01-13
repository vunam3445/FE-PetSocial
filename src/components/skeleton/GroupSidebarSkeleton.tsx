import React from "react";

export const GroupSidebarSkeleton = () => {
  return (
    <aside className="flex-col hidden h-full overflow-y-auto bg-white border-r border-gray-200 lg:block lg:col-span-3 animate-pulse">

      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="w-40 h-6 bg-gray-200 rounded"></div>

        <div className="flex items-center p-3 mt-4 bg-gray-100 rounded-lg">
          <div className="w-10 h-10 mr-3 bg-gray-300 rounded-md"></div>
          <div>
            <div className="h-3 mb-2 bg-gray-300 rounded w-28"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Body */}
      <nav className="flex-1 p-4 space-y-1">

        {/* Label */}
        <div className="w-24 h-3 mb-4 bg-gray-200 rounded"></div>

        {/* Items */}
        {[1, 2].map((i) => (
          <div key={i} className="w-full bg-gray-100 rounded-lg h-9"></div>
        ))}

        <div className="my-4 border-t border-gray-100"></div>

        <div className="w-32 h-3 mb-4 bg-gray-200 rounded"></div>

        {/* Items with badge */}
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg h-9"></div>
        <div className="flex items-center justify-between w-full bg-gray-100 rounded-lg h-9"></div>

        <div className="w-full bg-gray-100 rounded-lg h-9"></div>

        <div className="my-4 border-t border-gray-100"></div>

        <div className="w-40 h-3 mb-4 bg-gray-200 rounded"></div>

        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full bg-gray-100 rounded-lg h-9"></div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </aside>
  );
};
