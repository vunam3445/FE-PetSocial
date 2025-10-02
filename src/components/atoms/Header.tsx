import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ChatModal } from "../modals/ChatModal";

export const Header = () => {
  const [params] = useSearchParams();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const avatarUrl = localStorage.getItem("avatar_url");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const user_id = localStorage.getItem("user_id") || "";
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const goToProfile = () => {
    if (user_id) {
      navigate(`/profile/${user_id}`);
    }
  };
  // đồng bộ keyword trong state với URL mỗi khi thay đổi
  useEffect(() => {
    const kw = params.get("keyword") || "";
    setKeyword(kw);
  }, [params]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    const currentType = params.get("type") || "post";

    navigate(
      `/search?type=${currentType}&keyword=${encodeURIComponent(keyword)}`
    );
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <span className="text-lg font-bold text-white">🐾</span>
            </div>
            <span className="hidden text-xl font-bold text-gray-900 sm:block">
              PetConnect
            </span>
          </Link>

          <div className="flex-1 max-w-lg mx-4">
            <form
              onSubmit={handleSearch}
              className="relative flex-1 max-w-lg mx-4"
            >
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Tìm kiếm bài viết, người dùng, thú cưng..."
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-50"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg md:hidden hover:bg-gray-100">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            {/* <button className="relative hidden p-2 rounded-lg hover:bg-gray-100 sm:block">
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-5 5v-5zM10.07 2.82l3.93 3.93-3.93 3.93-3.93-3.93z"
                ></path>
              </svg>
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </button> */}

            <button
              className="relative hidden p-2 rounded-lg hover:bg-gray-100 sm:block"
              onClick={() => setIsChatOpen(!isChatOpen)}
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              {/* <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-green-500 rounded-full -top-1 -right-1">
                2
              </span> */}
            </button>

            <div className="relative">
              <button
                className="flex items-center p-1 space-x-2 rounded-lg hover:bg-gray-100"
                onClick={goToProfile}
              >
                <img
                  src={avatarUrl || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <svg
                  onClick={(e) => {
                    e.stopPropagation(); // chặn click lan lên button cha
                    setIsDropdownOpen(!isDropdownOpen);
                  }}
                  className="hidden w-4 h-4 text-gray-600 cursor-pointer sm:block"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {/* Dropdown bọc trong relative */}
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                >
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* {isDropdownOpen && (
        <div className="absolute right-0 w-40 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
          >
            Đăng xuất
          </button>
        </div>
      )} */}
      {isChatOpen && (
        <ChatModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </header>
  );
};
