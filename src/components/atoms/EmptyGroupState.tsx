interface Props {
    onClilck:()=>void;
}
export const EmptyGroupState = (props:Props) => (
  <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
    {/* Phần hình ảnh minh họa */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="relative flex items-center justify-center w-32 h-32 bg-white border border-gray-100 shadow-xl rounded-3xl rotate-3">
         <i className="text-5xl text-blue-500 fas fa-users"></i>
      </div>
      <div className="absolute flex items-center justify-center w-12 h-12 bg-orange-400 border-4 border-white shadow-lg -bottom-2 -right-2 rounded-2xl -rotate-12">
         <i className="text-xl text-white fas fa-comments"></i>
      </div>
    </div>

    {/* Thông điệp */}
    <h2 className="mb-3 text-2xl font-bold text-gray-800">
      Khám phá không gian chung của bạn
    </h2>
    <p className="max-w-md mb-8 leading-relaxed text-gray-500">
      Tham gia các nhóm để cập nhật tin tức, chia sẻ khoảnh khắc và kết nối với những người cùng sở thích. Mọi câu chuyện thú vị đều bắt đầu từ đây.
    </p>

    {/* Gợi ý hành động */}
    <div className="flex flex-wrap justify-center gap-4">
      {/* <button className="flex items-center px-6 py-3 font-semibold text-white transition-all bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 hover:shadow-lg">
        <i className="mr-2 fas fa-search"></i>
        Tìm nhóm mới
      </button> */}
      <button className="flex items-center px-6 py-3 font-semibold text-gray-700 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50" onClick={props.onClilck}>
        <i className="mr-2 fas fa-plus"></i>
        Tạo nhóm
      </button>
    </div>

    {/* Thêm các gợi ý nhỏ ở dưới (Optional) */}
    <div className="grid grid-cols-1 gap-6 mt-12 text-left sm:grid-cols-3">
      <div className="flex items-start space-x-3">
        <div className="p-2 text-green-600 bg-green-100 rounded-lg">
          <i className="fas fa-shield-alt"></i>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Riêng tư</h4>
          <p className="text-xs text-gray-400">Kiểm soát nội dung chia sẻ</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <div className="p-2 text-purple-600 bg-purple-100 rounded-lg">
          <i className="fas fa-bolt"></i>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Nhanh chóng</h4>
          <p className="text-xs text-gray-400">Cập nhật tin tức tức thời</p>
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <div className="p-2 text-orange-600 bg-orange-100 rounded-lg">
          <i className="fas fa-heart"></i>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Gắn kết</h4>
          <p className="text-xs text-gray-400">Xây dựng cộng đồng bền vững</p>
        </div>
      </div>
    </div>
  </div>
);