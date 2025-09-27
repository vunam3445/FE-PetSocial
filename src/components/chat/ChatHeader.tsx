interface ChatHeaderProps {
  onClose: () => void;
}

export const ChatHeader = ({ onClose }: ChatHeaderProps) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900">Chats</h3>
    <button
      onClick={onClose}
      className="text-gray-400 transition-colors hover:text-gray-600"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </div>
);
