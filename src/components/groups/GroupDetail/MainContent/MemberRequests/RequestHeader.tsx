interface RequestHeaderProps {
  totalCount: number;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void; // Thêm callback khi ấn Enter
}

export const RequestHeader = ({ totalCount, searchTerm, onSearchChange, onSearchSubmit }: RequestHeaderProps) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <div className="p-4 border-b border-gray-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-gray-800">
          Yêu cầu tham gia <span className="text-blue-600">({totalCount})</span>
        </h2>

        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên và nhấn Enter..."
            className="w-full py-2 pl-10 pr-4 text-sm transition-colors border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};