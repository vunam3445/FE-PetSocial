// PostContainer.tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useUserPosts } from "../../hooks/posts/useUserPosts";
import type { Post } from "../../types/ResponsePost";
import { ListPost } from "./ListPost";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { PostSkeleton } from "../skeleton/PostSkeleton";

export const PostContainer = ({ userId, newPost }: { userId?: string; newPost?: Post }) => {
  const [page, setPage] = useState(1);
  const { posts, loading, hasMore, setPosts } = useUserPosts(userId || "", page);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);

  // thêm post mới vào đầu danh sách
  useEffect(() => {
    if (newPost && !posts.find((p) => p.post_id === newPost.post_id)) {
      setPosts((prev) => [newPost, ...prev]);
    }
  }, [newPost]);

  // IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1); // 👉 load page tiếp theo
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (loading && page === 1) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <ListPost
        posts={posts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onShare={handleShare}
        lastPostRef={lastPostRef} // 👈 truyền xuống
      />

      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
    </>
  );
};
