import { useState, useEffect, useRef } from "react";
import { useAllPosts } from "../../hooks/posts/useAllPost";
import type { Post } from "../../types/ResponsePost";
import { ListPost } from "./ListPost";
import { usePostActions } from "../../hooks/posts/usePostActions"; // ✅ dùng hook đã tạo
import { PostSkeleton } from "../skeleton/PostSkeleton"; // nhớ import


const HomePostContainer = () => {
  const [page, setPage] = useState(1);
  const { posts: fetchedPosts, loading, error, hasMore } = useAllPosts(page);

  const [posts, setPosts] = useState<Post[]>([]);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);


  const observerRef = useRef<HTMLDivElement | null>(null);

  // Khi fetchedPosts thay đổi, cập nhật vào state posts
  useEffect(() => {
    if (fetchedPosts.length > 0) {
      if (page === 1) {
        setPosts(fetchedPosts);
      } else {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      }
    }
  }, [fetchedPosts, page]);

 

  // Intersection Observer để load thêm khi cuộn tới cuối
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 } // chỉ khi scroll tới hẳn phần tử
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading]);

  if (error) return <p>{error}</p>;

  return (
    <>
      <ListPost
        posts={posts}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onShare={handleShare}
      />

      {/* Loader hiển thị khi đang tải thêm */}
      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
      {/* sentinel element cho IntersectionObserver */}
      <div ref={observerRef} style={{ height: "1px" }} />
    </>
  );
};

export default HomePostContainer;
