import { useState, useEffect } from "react";
import type { Post, PaginatedPostsResponse } from "../../types/ResponsePost";
import api from "../../lib/axios";

export function useUserPosts(userId: string, page: number = 1) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    api
      .get<PaginatedPostsResponse>(`/users/${userId}/posts?page=${page}`)
      .then((res) => {
        const postData = res.data.posts;
        if (page === 1) {
          // Nếu là page đầu tiên thì thay mảng
          setPosts(postData.data || []);
        } else {
          // Nếu là page tiếp theo thì nối mảng
          setPosts((prev) => [...prev, ...(postData.data || [])]);
        }

        // Xác định còn page nữa không
        setHasMore(postData.current_page < postData.last_page);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId, page]);

  return { posts, loading, error, hasMore };
}
