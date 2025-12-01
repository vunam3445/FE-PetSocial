// GroupTabs.jsx
export const GroupTabs = () => {
  return (
    <nav className="mt-2 border-t border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start h-12 overflow-x-auto no-scrollbar">
                <div className="flex space-x-1">
                    <a href="#" className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">Thảo luận</a>
                    <a href="#" className="px-4 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 whitespace-nowrap">Đáng chú ý</a>
                    <a href="#" className="px-4 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 whitespace-nowrap">Mọi người</a>
                    {/* ... */}
                </div>
            </div>
        </div>
    </nav>
  );
};