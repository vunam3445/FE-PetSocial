interface ChatHeaderProps {
  onClose: () => void;
  onNewGroup?: () => void;
}

export const ChatHeader = ({ onClose, onNewGroup }: ChatHeaderProps) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900">Tin nhắn</h3>

    <div className="flex items-center gap-3">
      {/* Nút Tạo Nhóm với Tooltip */}
      <div className="relative flex flex-col items-center group">
        <button
          onClick={onNewGroup}
          className="p-2 text-gray-500 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50"
        >
          {/* Icon User Plus (Rõ ràng hơn cho việc tạo nhóm) */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </button>

        {/* Tooltip: Hiện lên khi hover vào group */}
        <span className="absolute hidden px-2 py-1 mb-2 text-xs text-white bg-gray-800 rounded-md shadow-lg bottom-full group-hover:flex whitespace-nowrap">
          Tạo nhóm chat
          {/* Mũi tên nhỏ phía dưới tooltip */}
          <span className="absolute -translate-x-1/2 border-4 border-transparent top-full left-1/2 border-t-gray-800"></span>
        </span>
      </div>

      {/* Nút Đóng */}
      <button
        onClick={onClose}
        className="p-2 text-gray-400 transition-colors rounded-full hover:text-red-500 hover:bg-red-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);