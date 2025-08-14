import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../molecules/Post";
import { useUserPosts } from "../../hooks/posts/useUserPosts";
import type { Post as PostType } from "../../types/ResponsePost";
import { Create } from "@mui/icons-material";

export const ListPost = ({ newPost }: { newPost?: PostType }) => {
  const { id: userId } = useParams();
  const [page, setPage] = useState(1);
  const { posts, loading, error, hasMore } = useUserPosts(userId || "", page);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  // Khi posts từ API thay đổi thì cập nhật vào allPosts
  useEffect(() => {
    setAllPosts((prev) => {
      // tránh duplicate khi fetch trang mới
      const existingIds = new Set(prev.map((p) => p.post_id));
      const merged = [...prev, ...posts.filter((p) => !existingIds.has(p.post_id))];
      return merged;
    });
  }, [posts]);

  // Khi có newPost thì thêm vào đầu mảng
  useEffect(() => {
    if (newPost) {
      setAllPosts((prev) => {
        // tránh thêm trùng
        if (prev.some((p) => p.post_id === newPost.post_id)) return prev;
        return [newPost, ...prev];
      });
    }
  }, [newPost]);

  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (loading && page === 1 && allPosts.length === 0) {
    return <div className="p-4 text-center">Đang tải bài viết...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {allPosts.length > 0 ? (
        allPosts.map((post, index) => {
          if (index === 6) {
            return (
              <div ref={lastPostRef} key={post.post_id} >
                <Post post={post} onEditPost={()=>{setEditingPost(post)}}/>
              </div>
            );
          }
          return <Post key={post.post_id} post={post} onEditPost={()=>{setEditingPost(post)}} />;
        })
      ) : (
        <div className="p-4 text-center text-gray-500">
          Chưa có bài viết nào.
        </div>
      )}

      {loading && page > 1 && (
        <div className="text-center">Đang tải thêm...</div>
      )}
      {
        editingPost && (
          <div></div>
        )
      }
    </div>
  );
};
