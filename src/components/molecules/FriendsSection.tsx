
export const FriendsSection = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Bạn bè</h3>
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Xem tất cả</button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-1 text-xl bg-pink-200 rounded-lg">👨</div>
                            <p className="text-xs font-medium">Tuấn</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-1 text-xl bg-purple-200 rounded-lg">👩</div>
                            <p className="text-xs font-medium">Linh</p>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-1 text-xl bg-yellow-200 rounded-lg">👨</div>
                            <p className="text-xs font-medium">Nam</p>
                        </div>
                    </div>
                </div>
  )
}
