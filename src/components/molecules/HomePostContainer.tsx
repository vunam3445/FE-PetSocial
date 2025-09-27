// components/posts/HomePostContainer.tsx
import { useState, useRef, useCallback } from "react";
import { useAllPosts } from "../../hooks/posts/useAllPost";
import { ListPost } from "./ListPost";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { PostSkeleton } from "../skeleton/PostSkeleton";

const HomePostContainer = () => {
  const [page, setPage] = useState(1);
  const { posts, setPosts, loading, error, hasMore } = useAllPosts(page);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);

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
