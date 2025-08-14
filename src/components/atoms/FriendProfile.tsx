export const FriendProfile = () => {
  return (
    <div className="p-4 transition-shadow bg-white border rounded-lg hover:shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%23f3f4f6'/%3E%3Ctext x='24' y='30' text-anchor='middle' font-size='16' fill='%236b7280'%3E👨%3C/text%3E%3C/svg%3E"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Trung Nguyễn</h3>
          <p className="text-sm text-gray-500">15 bạn chung</p>
        </div>
      </div>
      <div className="flex mt-3 space-x-2">
        <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
          <i className="mr-1 fas fa-comment"></i>Nhắn tin
        </button>
        <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
          <i className="fas fa-user"></i>
        </button>
      </div>
    </div>
  );
};
