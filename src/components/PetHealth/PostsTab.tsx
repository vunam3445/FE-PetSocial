import React from "react";
import { ListPost } from "../molecules/ListPost";
import { PostSkeleton } from "../skeleton/PostSkeleton";
import { useRef, useCallback, useState } from "react";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { useAllPostOfPet } from "../../hooks/pet/useAllPostOfPet";
import { useParams } from "react-router-dom";


export const PostsTab = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { posts, setPosts, loading, error, hasMore } = useAllPostOfPet(
    id,
    page
  );
  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);

  console.log("Posts in PostsTab:", posts);
  
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

  if (loading && page === 1) { // Chỉ hiện skeleton khi load trang đầu
    return (
      <div className="w-full px-2 space-y-6"> {/* Đã sửa width full */}
        {[...Array(3)].map((_, i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    // ĐÃ SỬA Ở ĐÂY:
    // 1. Xóa lg:w-1/2 (nguyên nhân gây co nhỏ)
    // 2. Thêm w-full (để chiếm hết khung cha)
    // 3. Dùng px-2 hoặc px-4 để padding nhẹ 2 bên trái phải
    <main className="flex-1 w-full px-2 md:px-4">
      <ListPost
        posts={posts}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onShare={handleShare}
        lastPostRef={lastPostRef}
      />
      {/* Hiển thị loading nhỏ ở dưới cùng khi đang load thêm trang mới */}
      {loading && page > 1 && (
         <div className="py-4 text-center">
            <span className="loading loading-spinner loading-md"></span>
         </div>
      )}
    </main>
  );
};