import { useState, useRef, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Post from "../molecules/Post";
import { useUserPosts } from "../../hooks/posts/useUserPosts";
import { useUpdatePost } from "../../hooks/posts/useUpdatePost";
import type { Post as PostType } from "../../types/ResponsePost";
import EditPostModal from "../modals/EditPostModal";
import ConfirmDelete from "../modals/ComfirmDeleteModal";
import { useDeletePost } from "../../hooks/posts/useDeletePost";
import SuccessToast from "../toasts/SuccessToast";
import ErrorToast from "../toasts/ErrorToast";
import type { SubmitData } from "../../types/Post";
import PostDetailModal from "../modals/PostDetailModal";
import SharePostModal from "../modals/SharePostModal";
import { useCreatePost } from "../../hooks/posts/useCreatePost";

function getOriginalPost(post: Post): Post {
  let current = post;
  while (current.shared_post) {
    current = current.shared_post;
  }
  return current;
}

export const ListPost = ({ newPost }: { newPost?: PostType }) => {
  const { id: userId } = useParams();
  const [page, setPage] = useState(1);
  const [postToShare, setPostToShare] = useState<PostType | null>(null);

  const [updatingPostId, setUpdatingPostId] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<{ open: boolean; text: string }>(
    { open: false, text: "" }
  );
  const [successToast, setSuccessToast] = useState<{
    open: boolean;
    text: string;
  }>({ open: false, text: "" });
  const { updatePost, loading: updating, error: updateError } = useUpdatePost();
  const { deletePost, loading: deleting, error: deleteError } = useDeletePost();
  const { createPost, loading: creating, error: createError } = useCreatePost();

  const { posts, loading, error, hasMore } = useUserPosts(userId || "", page);
  const [allPosts, setAllPosts] = useState<PostType[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDelete, setDelete] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [sharePostModal, setSharePostModal] = useState(false);
  // State để lưu thông tin bài viết đang được chọn để sửa
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  // Hàm này được gọi khi người dùng nhấn nút "Sửa" trên một bài viết
  const handleEditClick = (post: PostType) => {
    setSelectedPost(post);
    setEditModalOpen(true);
  };
  const handleShareClick = (post: PostType) => {
    const originalPost = getOriginalPost(post); // post gốc cuối cùng
    setSelectedPost(post); // vẫn lưu post hiện tại nếu cần
    setPostToShare(originalPost); // post gốc để modal nhận
    setSharePostModal(true);
  };
  const handleCommentAdded = (postId: string) => {
    setAllPosts((prev) =>
      prev.map((p) =>
        p.post_id === postId
          ? { ...p, comments_count: (p.comments_count ?? 0) + 1 }
          : p
      )
    );
  };
  const handleSharePost = async (data: SubmitData) => {
    if (!selectedPost) return;

    const originalPost = getOriginalPost(selectedPost); // ✅ lấy post gốc cuối cùng

    try {
      const res = await createPost({
        caption: data.caption,
        visibility: data.visibility,
        shared_post_id: originalPost.post_id, // share post gốc cuối cùng
      });

      if (res) {
        setSuccessToast({ open: true, text: "Chia sẻ bài viết thành công!" });
        setAllPosts((prev) => [res, ...prev]);
        setSharePostModal(false);
      }
    } catch (err) {
      console.error("❌ Share failed:", err);
      setErrorToast({ open: true, text: "Chia sẻ bài viết thất bại!" });
    }
  };

  const handleDetailClick = (post: PostType) => {
    setSelectedPost(post);
    setOpenDetailModal(true);
  };

  const handleDeleteClick = (postId: string) => {
    setSelectedPostId(postId);
    setDelete(true);
  };
  const handleColoseEditModal = () => {
    setEditModalOpen(false);
    setSelectedPost(null);
  };
  const handleColoseDetailModal = () => {
    setOpenDetailModal(false);
    setSelectedPost(null);
  };
  const handleDeletePost = async () => {
    // ✅ đóng modal ngay lập tức
    setDelete(false);
    const postId = selectedPostId;
    setDeletingPostId(postId);
    try {
      const res = await deletePost(postId);
      if (res) {
        setSuccessToast({ open: true, text: "Xóa bài viết thành công!" });
        // ✅ xoá post trong state
        setAllPosts((prev) => prev.filter((p) => p.post_id !== postId));
      }
    } catch (err) {
      console.error("❌ Delete failed:", err);
      setErrorToast({ open: true, text: "Xóa bài viết thất bại!" });
    }
  };

  // Khi posts từ API thay đổi thì cập nhật vào allPosts
  useEffect(() => {
    setAllPosts((prev) => {
      // tránh duplicate khi fetch trang mới
      const existingIds = new Set(prev.map((p) => p.post_id));
      const merged = [
        ...prev,
        ...posts.filter((p) => !existingIds.has(p.post_id)),
      ];
      return merged;
    });
  }, [posts]);

  const handleUpdatePost = async (postId: string, formData: SubmitData) => {
    try {
      setUpdatingPostId(postId);
      setEditModalOpen(false);
      // const fd = new FormData();
      // fd.append("caption", formData.caption || "");
      // fd.append("visibility", formData.visibility || "public");

      // // Nếu có media mới/cũ thì append
      // if (formData.media && formData.media.length > 0) {
      //   formData.media.forEach((m, i) => {
      //     if (m.file) {
      //       fd.append(`media[${i}][file]`, m.file);
      //       fd.append(`media[${i}][media_type]`, m.media_type);
      //       fd.append(`media[${i}][order]`, String(m.order ?? i));
      //     } else if (m.media_id) {
      //       fd.append(`media[${i}][media_id]`, m.media_id);
      //       fd.append(`media[${i}][media_type]`, m.media_type);
      //       fd.append(`media[${i}][order]`, String(m.order ?? i));
      //     }
      //   });
      // }

      // ✅ Gọi API luôn, không phụ thuộc có media hay không
      const res = await updatePost(postId, formData);

      if (res) {
        setSuccessToast({
          open: true,
          text: "Cập nhật bài viết thành công!",
        });
        setAllPosts((prev) =>
          prev.map((post) =>
            post.post_id === postId ? { ...post, ...res } : post
          )
        );
      }
    } catch (err) {
      console.error(err);
      setErrorToast({ open: true, text: "Cập nhật bài viết thất bại!" });
    } finally {
      setUpdatingPostId(null);
    }
  };

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

  const observer = useRef<IntersectionObserver | null>(null);

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
              <div className="relative" ref={lastPostRef} key={post.post_id}>
                <Post
                  key={post.post_id}
                  post={post}
                  onEditPost={() => handleEditClick(post)}
                  onDeletePost={() => handleDeleteClick(post.post_id)}
                  onDetailPost={() => handleDetailClick(post)}
                  onError={(msg: string) =>
                    setErrorToast({ open: true, text: msg })
                  }
                  onSharePost={() => handleShareClick(post)}
                />

                {updatingPostId ||
                  (deletingPostId === post.post_id && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
                      <div className="w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  ))}
              </div>
            );
          }
          return (
            <div className="relative">
              <Post
                key={post.post_id}
                post={post}
                onEditPost={() => handleEditClick(post)}
                onDeletePost={() => handleDeleteClick(post.post_id)}
                onDetailPost={() => handleDetailClick(post)}
                onError={(msg: string) =>
                  setErrorToast({ open: true, text: msg })
                }
                onSharePost={() => handleShareClick(post)}
              />

              {updatingPostId === post.post_id && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="p-4 text-center text-gray-500">
          Chưa có bài viết nào.
        </div>
      )}

      {loading && page > 1 && (
        <div className="text-center">Đang tải thêm...</div>
      )}
      {isEditModalOpen && (
        <EditPostModal
          open={isEditModalOpen}
          onClose={handleColoseEditModal}
          onSubmit={handleUpdatePost}
          postToEdit={selectedPost}
          isShare={!!selectedPost?.shared_post} // 👈 thêm flag
        />
      )}
      {sharePostModal && selectedPost && (
        <SharePostModal
          open={sharePostModal}
          onClose={() => setSharePostModal(false)}
          onSubmit={handleSharePost} // ✅ gọi hàm đã tách
          avatarURL="/avatar.png" // TODO: lấy avatar từ user hiện tại
          userName="Bạn"
          post={postToShare}
        />
      )}

      {isDelete && (
        <ConfirmDelete
          open={isDelete}
          onClose={() => setDelete(false)}
          onConfirm={handleDeletePost}
        />
      )}
      <SuccessToast
        open={successToast.open}
        text={successToast.text}
        onClose={() => setSuccessToast({ open: false, text: "" })}
      />
      <ErrorToast
        open={errorToast.open}
        text={errorToast.text}
        onClose={() => setErrorToast({ open: false, text: "" })}
      />
      {openDetailModal && selectedPost && (
        <PostDetailModal
          open={openDetailModal}
          onClose={handleColoseDetailModal}
          post={selectedPost}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </div>
  );
};
