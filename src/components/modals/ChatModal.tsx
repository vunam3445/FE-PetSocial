import { useState } from "react";
import { ChatHeader } from "../chat/ChatHeader";
import { ChatSearchBar } from "../chat/ChatSearchBar";
import { ChatTabs } from "../chat/ChatTabs";
import { ChatConversationItem } from "../chat/ChatConversationItem";
import { useChat } from "../../contexts/ChatContext";
import { useEffect } from "react";

export const ChatModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"read" | "unread">("read");
  const { conversations, fetchConversations, openConversation } = useChat();
useEffect(() => {
  if (open) {
    fetchConversations(activeTab); // truyền status
  }
}, [activeTab, open, fetchConversations]);

  return (
    <div
      id="chatModal"
      className={`fixed top-6 right-6 z-40 h-[90%] w-96 bg-white border 
                 border-gray-200 shadow-2xl rounded-2xl modal-slide-in mt-12 
                 ${open ? "block" : "hidden"}`}
    >
      <div className="flex flex-col h-full">
        <ChatHeader onClose={onClose} />
        <ChatSearchBar />
        <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {activeTab === "read" ? (
              conversations && conversations.length > 0 ? (
                conversations
                  .filter((c) => c.status === "read") // lọc theo tab
                  .map((item) => (
                    <ChatConversationItem
                      key={item.conversation.conversation_id}
                      name={
                        item.conversation.participants[0]?.name || "Unknown"
                      }
                      initials={
                        item.conversation.participants[0]?.name?.[0] || "U"
                      }
                      message={item.latest_message?.content || "No messages"}
                      avatarUrl={item.conversation.participants[0]?.avatar_url} // thêm avatar
                      isUnread={item.status === "unread"}
                      onClick={() => {
                        onClose();
                        openConversation({
                          id: item.conversation.conversation_id,
                          avatarUrl: item.conversation.participants[0]?.avatar_url,
                          title:
                            item.conversation.participants[0]?.name ||
                            "Unknown",
                        });
                      }}
                    />
                  ))
              ) : (
                <p className="p-4 text-sm text-gray-500">
                  No read conversations
                </p>
              )
            ) : conversations && conversations.length > 0 ? (
              conversations
                .filter((c) => c.status === "unread")
                .map((item) => (
                  <ChatConversationItem
                    key={item.conversation.conversation_id}
                    name={item.conversation.participants[0]?.name || "Unknown"}
                    initials={
                      item.conversation.participants[0]?.name?.[0] || "U"
                    }
                    message={item.latest_message?.content || "No messages"}
                    avatarUrl={item.conversation.participants[0]?.avatar_url} // thêm avatar
                    isUnread={item.status === "unread"}
                    onClick={() => {
                      onClose();
                      openConversation({
                        id: item.conversation.conversation_id,
                        avatarUrl: item.conversation.participants[0]?.avatar_url,
                        title:
                          item.conversation.participants[0]?.name || "Unknown",
                      });
                      
                    }}
                  />
                ))
            ) : (
              <p className="p-4 text-sm text-gray-500">
                No unread conversations
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
