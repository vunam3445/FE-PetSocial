import { useState, useEffect } from "react";
import api from "../../lib/axios";


export function useSearch<T>(type: string, keyword: string, limit: number = 10) {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

// useSearch.ts
useEffect(() => {
  const controller = new AbortController(); // Khởi tạo bộ hủy request

  if (!keyword.trim()) {
    setResults([]);
    setLoading(false);
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    // Quan trọng: Xóa dữ liệu cũ ngay lập tức để UI không render nhầm
    setResults([]); 

    try {
      const response = await api.get("/search", {
        params: { type, keyword, limit },
        signal: controller.signal // Gắn signal vào request
      });
      setResults(response.data.data || []);
    } catch (error: any) {
      if (error.name !== 'CanceledError') {
        console.error("Search error:", error);
        setResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  return () => controller.abort(); // Hủy request nếu user đổi tab liên tục
}, [type, keyword, limit]);

  return { results, loading };
}