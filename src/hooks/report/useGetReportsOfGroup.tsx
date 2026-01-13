import { useEffect, useState } from "react";
import type { Post } from "../../types/ResponsePost";
import { getReportOfGroup } from "../../services/ReportService";
import type { ReportItem } from "../../types/Report";
export const useGetReportsOfGroup = (groupId: string,page: number) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [reports, setReports] = useState<ReportItem[]>([]);



  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await getReportOfGroup(groupId, page);
        // page ===1 → replace
        if (page === 1) {
          setReports(res.data.data);
        } else {
          // page > 1 → append
          setReports((prev) => [...prev, ...res.data]);
        }

        setHasMore(res.current_page < res.last_page);
      } catch (e) {
        console.log(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, groupId]);

  return { loading, error, setError, hasMore, reports , setReports};
};
