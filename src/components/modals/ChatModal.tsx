import { useState, useEffect, useRef, useCallback } from "react";
import { ChatHeader } from "../chat/ChatHeader";
import { ChatSearchBar } from "../chat/ChatSearchBar";
import { ChatTabs } from "../chat/ChatTabs";
import { ChatConversationItem } from "../chat/ChatConversationItem";
import { useChat } from "../../contexts/ChatContext";
import { CreateGroupChatModal } from "./CreateGroupChatModal";
import { useCreateConversation } from "../../hooks/chat/useCreateConversation";
import { ConversationListSkeleton } from "../skeleton/ChatConversationItemSkeleton";
import { type ConversationItem } from "../../types/Chat";
import { useDeleteConversation } from "../../hooks/chat/useDeleteConversation";
import useSearchConversations from "../../hooks/search/useSearchConversations";

export const ChatModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"read" | "unread">("read");
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Trạng thái đã nhấn Enter

  const {
    conversations,
    fetchConversations,
    openConversation,
    isFetching,
    setConversations,
    hasMoreConversations,
    conversationsPage,
  } = useChat();

  const { createConversation } = useCreateConversation();
  const { removeConversation } = useDeleteConversation();
  const [isOpenCreateGroupChat, setOpenCreateGroupChat] = useState(false);

  // Hook search
  const {
    results,
    search,
    isLoading: isSearching,
    resetSearch,
  } = useSearchConversations();

  // 1. Fetch danh sách mặc định khi mở modal hoặc đổi tab
  useEffect(() => {
    if (open && !hasSearched) {
      fetchConversations(activeTab, 1);
    }
  }, [activeTab, open, fetchConversations, hasSearched]);

  // 2. Xử lý khi nhấn Enter để tìm kiếm
  const handleExecuteSearch = () => {
    const term = searchQuery.trim();
    if (term) {
      setHasSearched(true);
      search(term, 1, false);
    } else {
      handleClearSearch();
    }
  };

  // 3. Xử lý khi thay đổi ô input
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    if (val.trim() === "") {
      handleClearSearch();
    }
  };

  // 4. Hàm reset trạng thái search
  const handleClearSearch = () => {
    setSearchQuery("");
    setHasSearched(false);
    resetSearch();
  };

  // 5. Reset toàn bộ khi đóng modal
  useEffect(() => {
    if (!open) {
      handleClearSearch();
    }
  }, [open]);

  // 6. Xử lý xóa (chuyển vào tin nhắn chờ)
  const handleDelete = async (conversationId: string) => {
    await removeConversation(conversationId, () => {
      setConversations((prev) =>
        prev.map((item) =>
          item.conversation.conversation_id === conversationId
            ? { ...item, status: "unread" as const }
            : item
        )
      );
    });
  };

  // 7. Xử lý tạo nhóm
  const handleSubmitGroup = async (name: string) => {
    try {
      const res = await createConversation({
        participant_ids: [],
        is_group: true,
        name: name,
      });

      if (res?.data) {
        const newRaw = res.data;
        const newConv: ConversationItem = {
          conversation: {
            conversation_id: newRaw.conversation_id,
            name: newRaw.name,
            is_group: newRaw.is_group,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            my_role: newRaw.my_role,
            participants: [],
            avatar_url: newRaw.avatar_url,
          },
          latest_message: null,
          status: "read",
        };
        setConversations((prev) => [newConv, ...prev]);
        setOpenCreateGroupChat(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;

      // Nếu đã có observer đang theo dõi node cũ, ngắt kết nối nó
      if (observer.current) observer.current.disconnect();

      // Tạo observer mới
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreConversations) {
          console.log(
            "Đã chạm tới item thứ n-3, đang tải trang:",
            conversationsPage + 1
          );
          fetchConversations(activeTab, conversationsPage + 1);
        }
      });

      // Theo dõi node mới (item thứ length - 3)
      if (node) observer.current.observe(node);
    },
    [
      isFetching,
      hasMoreConversations,
      conversationsPage,
      activeTab,
      fetchConversations,
    ]
  );
  // 8. Quyết định danh sách hiển thị
  // Nếu đã search thì dùng results, nếu không dùng danh sách gốc theo tab
  const displayList = hasSearched ? results : conversations;

  return (
    <div
      id="chatModal"
      className={`fixed top-6 right-6 z-40 h-[90%] w-96 bg-white border border-gray-200 shadow-2xl rounded-2xl modal-slide-in mt-12 ${
        open ? "block" : "hidden"
      }`}
    >
      <div className="flex flex-col h-full">
        <ChatHeader
          onClose={onClose}
          onNewGroup={() => setOpenCreateGroupChat(true)}
        />

        <ChatSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleExecuteSearch}
          isLoading={isSearching}
        />

        {/* Ẩn Tabs khi đang hiển thị kết quả tìm kiếm */}
        {!hasSearched && (
          <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="divide-y divide-gray-100">
            {/* 1. HIỂN THỊ SKELETON: Chỉ khi đang tải trang đầu tiên hoặc đang tìm kiếm mới */}
            {(isFetching || isSearching) && conversationsPage === 1 && conversations.length === 0 ? (
              <ConversationListSkeleton />
            ) : (
              <>
                {/* 2. KIỂM TRA DANH SÁCH RỖNG */}
                {displayList.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-10 text-center">
                    <span className="mb-2 text-2xl text-gray-300">
                      {hasSearched ? "😕" : "💬"}
                    </span>
                    <p className="text-sm text-gray-500">
                      {hasSearched
                        ? `Không tìm thấy kết quả cho "${searchQuery}"`
                        : searchQuery.trim() !== ""
                        ? "Nhấn Enter để tìm kiếm..."
                        : "Chưa có cuộc trò chuyện nào."}
                    </p>
                  </div>
                ) : (
                  /* 3. HIỂN THỊ DANH SÁCH CUỘC HỘI THOẠI */
                  <>
                    {displayList.map((item, index) => {
                      // Xác định vị trí mục tiêu: item thứ length - 3 để trigger load more
                      const isTarget = index === displayList.length - 3;
                      const conv = item.conversation;
                      const currentUserId = localStorage.getItem("user_id");

                      // Logic lấy Avatar và Title
                      const otherParticipant = conv.participants.find(
                        (p: any) => p.user_id !== currentUserId
                      );

                      return (
                        <div
                          key={conv.conversation_id}
                          ref={isTarget ? lastItemRef : null}
                        >
                          <ChatConversationItem
                            conversationItem={item}
                            onClick={() => {
                              onClose();
                              openConversation({
                                id: conv.conversation_id,
                                avatarUrl: conv.is_group
                                  ? conv.avatar_url
                                  : otherParticipant?.avatar_url ||
                                    conv.avatar_url,
                                title: conv.is_group
                                  ? conv.name
                                  : otherParticipant?.name || "Unknown",
                                is_group: conv.is_group,
                                my_role: conv.my_role,
                              });
                            }}
                            onDelete={handleDelete}
                          />
                        </div>
                      );
                    })}

                    {/* 4. LOADING BỔ SUNG: Hiện ở cuối danh sách khi load trang 2, 3... */}
                    {isFetching && conversationsPage > 1 && (
                      <div className="flex justify-center p-4">
                        <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <CreateGroupChatModal
        isOpen={isOpenCreateGroupChat}
        onClose={() => setOpenCreateGroupChat(false)}
        onCreate={handleSubmitGroup}
      />
    </div>
  );
};
