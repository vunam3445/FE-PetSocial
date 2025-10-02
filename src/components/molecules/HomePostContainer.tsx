// components/posts/HomePostContainer.tsx
import { useState, useRef, useCallback, useEffect } from "react";
import { useAllPosts } from "../../hooks/posts/useAllPost";
import { ListPost } from "./ListPost";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { PostSkeleton } from "../skeleton/PostSkeleton";
import type { Post } from "../../types/ResponsePost";
interface HomePostContainerProps {
  newPost?: Post;
}
const HomePostContainer = ({ newPost }: HomePostContainerProps) => {
  const [page, setPage] = useState(1);
  const { posts, setPosts, loading, error, hasMore } = useAllPosts(page);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);
  useEffect(() => {
    if (newPost) {
      setPosts((prev) => {
        // tránh thêm trùng
        if (prev.some((p) => p.post_id === newPost.post_id)) return prev;
        return [newPost, ...prev];
      });
    }
  }, [newPost, setPosts]);
  // IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1); // load page tiếp theo
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  if (error) return <p>{error}</p>;

  return (
    <>
      <ListPost
        posts={posts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onShare={handleShare}
        lastPostRef={lastPostRef}
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

export default HomePostContainer;
