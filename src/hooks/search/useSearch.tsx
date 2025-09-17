import { useState, useEffect } from "react";
import api from "../../lib/axios";


export function useSearch<T>(type: "post" | "user" | "pet", keyword: string, limit: number = 10) {
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get("/search", {
          params: { type, keyword, limit },
        });
        setResults(response.data.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, keyword, limit]);

  return { results, loading };
}
