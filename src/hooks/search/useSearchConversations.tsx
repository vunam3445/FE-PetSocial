import { useState, useCallback } from "react";
import { searchConversations } from "../../services/Conversation";

export default function useSearchConversations() {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const search = useCallback(async (keyword: string, page: number = 1, isLoadMore: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await searchConversations(keyword, page);
      
      // Giả sử Laravel trả về cấu trúc phân trang chuẩn: response.data.data (mảng) và response.data.next_page_url
      const newItems = response.data.data || [];
      const nextPage = response.data.next_page_url;

      if (isLoadMore) {
        setResults((prev) => [...prev, ...newItems]);
      } else {
        setResults(newItems);
      }

      setCurrentPage(page);
      setHasMore(!!nextPage);
    } catch (err: any) {
      setError(err.response?.data?.message || "Có lỗi xảy ra khi tìm kiếm");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetSearch = () => {
    setResults([]);
    setCurrentPage(1);
    setHasMore(true);
  };

  return {
    results,
    isLoading,
    error,
    currentPage,
    hasMore,
    search,
    resetSearch
  };
}