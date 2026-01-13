import { useEffect, useState } from "react";
import { searchRequestJoinGroup } from "../../services/SearchService";
import type { JoinRequest } from "../../types/QuestionAndAnswer";

export const useSearchRequestJoinGroup = (groupId: string) => {
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<JoinRequest[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await searchRequestJoinGroup(groupId, keyword, page);
      // Nếu page là 1 thì thay thế data mới, nếu > 1 thì cộng dồn
      setData((prev) => (page === 1 ? res.data.data : [...prev, ...res.data.data]));
      setPagination({
        current_page: res.data.current_page,
        last_page: res.data.last_page,
        total: res.data.total,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // QUAN TRỌNG: Phải có keyword ở đây để khi setKeyword(searchTerm) nó sẽ chạy lại
  useEffect(() => {
    fetchData();
  }, [keyword, page, groupId]); 

  // Reset page về 1 khi keyword thay đổi
  useEffect(() => {
    setPage(1);
  }, [keyword]);

  return {
    data, setData, loading, keyword, setKeyword,
    page, setPage, pagination, refetch: fetchData
  };
};