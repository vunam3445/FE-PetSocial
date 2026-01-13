// CreatePostModal.jsx
export const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50">
        <div className="relative w-full max-w-lg p-5 bg-white border rounded-md shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b">
                <h3 className="text-xl font-bold text-gray-900">Tạo bài viết</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                    <i className="fas fa-times fa-lg"></i>
                </button>
            </div>
            {/* Nội dung form giữ nguyên */}
            <div className="mt-4">
                 {/* ... Avatar User ... */}
                <textarea rows="5" className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Bạn đang nghĩ gì?"></textarea>
                {/* ... Icons Action ... */}
                <button onClick={onSubmit} className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">Đăng</button>
            </div>
        </div>
    </div>
  );
};