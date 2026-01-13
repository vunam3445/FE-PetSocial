import { getPostsOfGroup } from "../../services/PostService";
import { useEffect, useState } from "react";
import type { Post } from "../../types/ResponsePost";

export const useGetPostsOfGroup = (page: number, groupId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);



  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await getPostsOfGroup(groupId, page);
        // page ===1 → replace
        if (page === 1) {
          setPosts(res.data.data);
        } else {
          // page > 1 → append
          setPosts((prev) => [...prev, ...res.data]);
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

  return { loading, error, setError, hasMore, posts , setPosts};
};
