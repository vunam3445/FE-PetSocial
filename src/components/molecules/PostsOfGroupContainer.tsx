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
  isInGroupPage = false,
}: {
  groupId: string;
  newPost: Post;
  isInGroupPage?: boolean;
}) => {
  const [page, setPage] = useState(1);
  const { loading, error, setError, hasMore, posts, setPosts } =
    useGetPostsOfGroup(page, groupId);
  const { handleUpdate, handleDelete, handleShare } = usePostActions(
    setPosts,
    isInGroupPage,
  );
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
    [loading, hasMore],
  );

  useEffect(() => {
    if (!newPost) return;

    // Nếu là bài viết được chia sẻ (có shared_post_id)
    // VÀ đang ở trang Group Detail thì KHÔNG thêm vào đầu danh sách.
    const isSharedPost = !!newPost.shared_post_id;
    if (isInGroupPage && isSharedPost) {
      return;
    }

    // Nếu là bài viết bình thường hoặc ở ngữ cảnh khác thì vẫn thêm vào đầu
    setPosts((prev) => {
      if (prev.find((p) => p.post_id === newPost.post_id)) return prev;
      return [newPost, ...prev];
    });
  }, [newPost, isInGroupPage]);
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
      {posts.length > 0 && (
        <ListPost
          onDelete={handleDelete}
          onShare={handleShare}
          onUpdate={handleUpdate}
          posts={posts}
          lastPostRef={lastPostRef}
          onCommentAdded={(postId) => {
            setPosts((prevPosts) =>
              prevPosts.map((p) =>
                p.post_id === postId
                  ? { ...p, comments_count: (p.comments_count || 0) + 1 }
                  : p,
              ),
            );
          }}
        />
      )}

      <ErrorToast
        open={error}
        text={"Có lỗi xảy ra khi tải bài viết, vui lognf thử lại sau"}
        onClose={() => {
          setError(false);
        }}
      />
    </>
  );
};
