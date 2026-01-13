import { ListPost } from "./ListPost";
import { useGetPostsOfGroup } from "../../hooks/posts/useGetPostsOfGroup";
import { usePostActions } from "../../hooks/posts/usePostActions";
import { useState, useCallback, useRef, useEffect } from "react";
import type { Post } from "../../types/ResponsePost";
import { PostSkeleton } from "../skeleton/PostSkeleton";
import ErrorToast from "../toasts/ErrorToast";
export const PostsOfGroupContainer = ({
  groupId,
  newPost,
}: {
  groupId: string;
  newPost: Post;
}) => {
  const [page, setPage] = useState(1);
  const { loading, error, setError, hasMore, posts, setPosts } =
    useGetPostsOfGroup(page, groupId);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(posts);
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

  useEffect(() => {
    if (!newPost) return;

    // Chỉ ghép bài mới vào khi page=1
    setPosts((prev) => [newPost, ...prev]);
  }, [newPost]);

  useEffect(() => {
    setPage(1);
  }, [groupId]);

  return (
    <>
      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      )}
      {posts.length>0 && (
        <ListPost
        onDelete={handleDelete}
        onShare={handleShare}
        onUpdate={handleUpdate}
        posts={posts}
        lastPostRef={lastPostRef}
        onCommentAdded={() => {}}
      />
      )}

      <ErrorToast open={error} text = {'Có lỗi xảy ra khi tải bài viết, vui lognf thử lại sau'} onClose={()=>{setError(false)}}/>
    </>
  );
};
