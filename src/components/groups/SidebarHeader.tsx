

export const SidebarHeader = () => (
  <div className="sticky top-0 z-20 p-4 bg-white border-b border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <h1 className="text-2xl font-bold text-gray-900">Nhóm</h1>
      <button className="flex items-center justify-center transition bg-gray-100 rounded-full w-9 h-9 hover:bg-gray-200">
        <i className="text-gray-600 fas fa-cog"></i>
      </button>
    </div>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <i className="text-gray-400 fas fa-search"></i>
      </span>
      <input 
        type="text" 
        placeholder="Tìm kiếm nhóm..." 
        className="w-full py-2 pl-10 pr-4 text-gray-700 placeholder-gray-500 transition-all bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </div>
);