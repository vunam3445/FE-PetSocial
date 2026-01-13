interface ChatTabsProps {
  activeTab: "read" | "unread";
  onTabChange: (tab: "read" | "unread") => void;
}

export const ChatTabs = ({ activeTab, onTabChange }: ChatTabsProps) => (
  <div className="flex border-b border-gray-200">
    <button
      onClick={() => onTabChange("read")}
      className={`flex-1 px-4 py-3 text-sm font-medium 
                 ${activeTab === "read" 
                   ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" 
                   : "text-gray-500 hover:text-gray-700"}`}
    >
      Tin nhắn
    </button>
    <button
      onClick={() => onTabChange("unread")}
      className={`flex-1 px-4 py-3 text-sm font-medium 
                 ${activeTab === "unread" 
                   ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50" 
                   : "text-gray-500 hover:text-gray-700"}`}
    >
      Tin nhắn chờ
    </button>
  </div>
);
