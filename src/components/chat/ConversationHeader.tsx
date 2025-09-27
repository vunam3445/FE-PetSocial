interface ConversationHeaderProps {
  title: string;
  avatarUrl?: string; // ✅ thêm avatar
  onClose?: () => void;
}

export const ConversationHeader = ({ title, avatarUrl, onClose }: ConversationHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
      <div className="flex items-center space-x-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className="object-cover w-8 h-8 border-2 border-white rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <span className="text-sm font-medium">👤</span>
          </div>
        )}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <button
        onClick={onClose}
        className="transition-colors text-white/80 hover:text-white"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
