import { useState, useEffect } from "react";
import type { Post, PaginatedPostsResponse } from "../../types/ResponsePost";
import api from "../../lib/axios";

export function useAllPosts(page: number = 1) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get<PaginatedPostsResponse>(`/posts?page=${page}`)
      .then((res) => {
        const postData = res.data.posts;
        if (page === 1) {
          // ✅ Nếu là page đầu tiên → thay mới mảng
          setPosts(postData.data || []);
        } else {
          // ✅ Nếu là page sau → nối thêm vào mảng cũ
          setPosts((prev) => [...prev, ...(postData.data || [])]);
        }

        // ✅ Kiểm tra còn trang nữa không
        setHasMore(postData.current_page < postData.last_page);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  return { posts, loading, error, hasMore };
}
