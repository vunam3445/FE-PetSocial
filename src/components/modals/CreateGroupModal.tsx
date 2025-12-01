import React, { useState, useEffect } from "react";

// Định nghĩa kiểu dữ liệu cho Props
interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, visibility: "public" | "private" ) => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [groupName, setGroupName] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const avatar_url = localStorage.getItem("avatar_url");
  // Reset form khi mở modal
  useEffect(() => {
    if (isOpen) {
      setGroupName("");
      setVisibility("public");
      setIsPrivacyDropdownOpen(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    onSubmit(groupName, visibility);
    onClose();
  };

  // Hàm chọn quyền riêng tư
  const handleSelectPrivacy = (value: "public" | "private") => {
    setVisibility(value);
    setIsPrivacyDropdownOpen(false);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto z-[9999]">
      {/* Overlay làm mờ nền */}
      <div
        className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50"
        onClick={onClose}
      ></div>

      <div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
        <div className="relative overflow-visible text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
          {/* Header */}
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-gray-200 sm:px-6">
            <h3 className="mx-auto text-xl font-bold leading-6 text-gray-900">
              Tạo nhóm
            </h3>
            <button
              onClick={onClose}
              className="absolute flex items-center justify-center w-8 h-8 p-2 text-gray-400 bg-gray-100 rounded-full right-4 top-3 hover:bg-gray-100 hover:text-gray-500"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="px-4 py-5 space-y-5 sm:p-6">
            {/* User Info (Optional - tạo cảm giác cá nhân hóa) */}
            <div className="flex items-center space-x-3">
              <img
                className="object-cover w-10 h-10 rounded-full"
                src={avatar_url || "https://placehold.co/100x100/png?text=Me"}
                alt="Avatar"
              />
              <div>
                <span className="text-sm font-semibold text-gray-900">
                  Admin
                </span>
                <p className="text-xs text-gray-500">Quản trị viên nhóm</p>
              </div>
            </div>

            {/* Input Tên nhóm */}
            <div>
              <input
                type="text"
                className="block w-full px-3 py-3 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Đặt tên nhóm..."
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                autoFocus
              />
            </div>

            {/* Select Quyền riêng tư (Custom UI) */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium leading-6 text-gray-900">
                Chọn quyền riêng tư
              </label>

              <button
                type="button"
                className="relative w-full cursor-default rounded-md bg-white py-2.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
              >
                <span className="flex items-center">
                  <i
                    className={`fas ${
                      visibility === "public" ? "fa-globe-americas" : "fa-lock"
                    } w-5 text-gray-500`}
                  ></i>
                  <span className="block ml-3 font-medium truncate">
                    {visibility === "public" ? "Công khai" : "Riêng tư"}
                  </span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <i className="text-xs text-gray-400 fas fa-chevron-down"></i>
                </span>
              </button>

              {/* Dropdown Options */}
              {isPrivacyDropdownOpen && (
                <div className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {/* Option: Public */}
                  <div
                    className="relative py-2 pl-3 cursor-pointer select-none pr-9 hover:bg-gray-100 group"
                    onClick={() => handleSelectPrivacy("public")}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <i className="text-gray-500 fas fa-globe-americas group-hover:text-gray-900"></i>
                      </div>
                      <div className="ml-3">
                        <span className="block font-semibold text-gray-900 truncate">
                          Công khai
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm
                          và những gì họ đăng.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Option: Private */}
                  <div
                    className="relative py-2 pl-3 mt-1 cursor-pointer select-none pr-9 hover:bg-gray-100 group"
                    onClick={() => handleSelectPrivacy("private")}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <i className="text-gray-500 fas fa-lock group-hover:text-gray-900"></i>
                      </div>
                      <div className="ml-3">
                        <span className="block font-semibold text-gray-900 truncate">
                          Riêng tư
                        </span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          Chỉ thành viên mới nhìn thấy mọi người trong nhóm và
                          những gì họ đăng.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                groupName.trim()
                  ? "bg-blue-600 hover:bg-blue-500"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              onClick={handleSubmit}
              disabled={!groupName.trim()}
            >
              Tạo nhóm
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={onClose}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
