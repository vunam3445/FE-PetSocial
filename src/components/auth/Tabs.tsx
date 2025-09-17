type TabsProps = {
  activeTab: "login" | "register";
  onChange: (tab: "login" | "register") => void;
};

export const Tabs = ({ activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex p-1 mb-8 bg-gray-100 rounded-xl">
      <button
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
          activeTab === "login"
            ? "text-white bg-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => onChange("login")}
      >
        Đăng nhập
      </button>
      <button
        className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
          activeTab === "register"
            ? "text-white bg-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        onClick={() => onChange("register")}
      >
        Đăng ký
      </button>
    </div>
  );
};
