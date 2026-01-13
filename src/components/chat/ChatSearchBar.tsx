interface ChatSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void; // Thêm hàm kích hoạt search
  isLoading?: boolean;
}
export const ChatSearchBar = ({ value, onChange, onSearch, isLoading }: ChatSearchBarProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };
  return (
  <div className="p-4 border-b border-gray-200">
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown} // Bắt sự kiện nhấn phím
        placeholder="Tìm kiếm người dùng hoặc nhóm..."
        className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="w-4 h-4 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  </div>
)};