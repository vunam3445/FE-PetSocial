import { useChat } from "../../contexts/ChatContext";
import { MessageItem } from "./MessageItem";
import { useEffect, useRef, useState, UIEvent } from "react";

export const ConversationMessages = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { messages, fetchMessages } = useChat();
  const conversationMessages = messages[conversationId] || [];
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  // Scroll xuống dưới khi vừa mở hoặc có tin nhắn mới
  useEffect(() => {
    if (shouldScrollToBottom) {
      // Vừa mở thì scroll instant, có tin nhắn mới thì scroll smooth
      const behavior = isInitialLoad ? "instant" : "smooth";
      bottomRef.current?.scrollIntoView({ behavior });
    }
  }, [conversationMessages, shouldScrollToBottom, isInitialLoad]);

  // Reset state khi đổi conversation
  useEffect(() => {
    setPage(1);
    setIsLoading(false);
    setHasMore(true);
    setIsInitialLoad(true);
    setShouldScrollToBottom(true);
  }, [conversationId]);

  // Đánh dấu hết initial load sau khi đã scroll lần đầu
  useEffect(() => {
    if (isInitialLoad && conversationMessages.length > 0) {
      // Delay một chút để đảm bảo scroll đã hoàn thành
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [conversationMessages, isInitialLoad]);

  const handleScroll = async (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    // Kiểm tra nếu user đang ở gần bottom (trong vòng 100px)
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    // Chỉ auto-scroll khi user ở gần bottom
    setShouldScrollToBottom(isNearBottom);

    // Đánh dấu không còn là lần load đầu tiên sau khi user scroll
    if (isInitialLoad && scrollTop > 0) {
      setIsInitialLoad(false);
    }

    // Load thêm tin nhắn cũ khi scroll đến gần đầu trang
    if (scrollTop < 200 && !isLoading && hasMore) {
      setIsLoading(true);

      // Lưu vị trí scroll hiện tại để maintain scroll position
      const previousScrollHeight = scrollHeight;

      try {
        const nextPage = page + 1;
        const response = await fetchMessages(conversationId, nextPage);
        console.log(response);
        if (!response || response.length === 0) {
          setHasMore(false);
          return; // ❌ stop ở đây, không load nữa
        }

        // Nếu số lượng tin nhắn < pageSize thì cũng hết luôn
        const PAGE_SIZE = 15; // ví dụ 20 tin / trang
        if (response.length < PAGE_SIZE) {
          setHasMore(false);
        }

        setPage(nextPage);

        // giữ nguyên phần maintain scroll
        setTimeout(() => {
          const newScrollHeight = target.scrollHeight;
          const heightDifference = newScrollHeight - previousScrollHeight;
          target.scrollTop = scrollTop + heightDifference;
        }, 0);
      } catch (error) {
        console.error("Error loading more messages:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50"
    >
      {isLoading && (
        <div className="py-2 text-center text-gray-400">
          Đang tải tin nhắn cũ...
        </div>
      )}

      {conversationMessages.map((msg, index) => (
        <MessageItem
          key={msg.message_id}
          type={msg.type}
          name={msg.name || "Unknown"}
          text={msg.text}
          time={msg.time || ""}
          avatarUrl={msg.avatarUrl}
          pending={msg.pending}
          // Thêm data attribute để có thể query trong alternative approach
          data-message={index}
        />
      ))}

      {/* Scroll target */}
      <div ref={bottomRef} />
    </div>
  );
};
