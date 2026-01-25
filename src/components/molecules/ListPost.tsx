import { useState } from "react";
import type { Post as PostType } from "../../types/ResponsePost";
import Post from "../molecules/Post";
import EditPostModal from "../modals/EditPostModal";
import ConfirmDelete from "../modals/ComfirmDeleteModal";
import SharePostModal from "../modals/SharePostModal";
import PostDetailModal from "../modals/PostDetailModal";
import SuccessToast from "../toasts/SuccessToast";
import ErrorToast from "../toasts/ErrorToast";
import type { SubmitData } from "../../types/Post";
import ReportModal from "../modals/ReportModal";
import { useCreateReport } from "../../hooks/report/useCreateReport";


interface PostListProps {
  posts: PostType[];
  onUpdate: (postId: string, data: SubmitData) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
  onShare: (data: SubmitData) => Promise<void>;
  onCommentAdded?: (postId: string) => void;
  lastPostRef?: (node: HTMLDivElement | null) => void;
  isLoading?: boolean;
}

export const ListPost = ({
  posts,
  onUpdate,
  onDelete,
  onShare,
  onCommentAdded,
  lastPostRef,
  isLoading
}: PostListProps) => {
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const {create} = useCreateReport();
  const [updatingPostId, setUpdatingPostId] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<{
    open: boolean;
    text: string;
  }>({ open: false, text: "" });
  const [errorToast, setErrorToast] = useState<{ open: boolean; text: string }>(
    { open: false, text: "" }
  );

  const handleUpdate = async (postId: string, data: SubmitData) => {
    try {
      setEditModalOpen(false);
      setUpdatingPostId(postId); //bật overlay
      await onUpdate(postId, data);
      setSuccessToast({ open: true, text: "Cập nhật bài viết thành công!" });
    } catch(err) {
      console.error("Update Error:", err); // THÊM DÒNG NÀY ĐỂ DEBUG
      setErrorToast({ open: true, text: "Cập nhật thất bại!" });
    } finally {
      setUpdatingPostId(null); //tắt overlay
      setSelectedPost(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      await onDelete(selectedPost.post_id);
      setSuccessToast({ open: true, text: "Xóa bài viết thành công!" });
    } catch {
      setErrorToast({ open: true, text: "Xóa thất bại!" });
    } finally {
      setDeleteModalOpen(false);
      setSelectedPost(null);
    }
  };

  const handleShare = async (data: SubmitData) => {
    if (!selectedPost) return;
    try {
      await onShare(data);
      setSuccessToast({ open: true, text: "Chia sẻ bài viết thành công!" });
    } catch {
      setErrorToast({ open: true, text: "Chia sẻ thất bại!" });
    } finally {
      setShareModalOpen(false);
      setSelectedPost(null);
    }
  };
 
  const handleSubmitReport = async (data: any) => {
    if (!selectedPost) return;
    try {
      await create(data);
      setSuccessToast({ open: true, text: "Báo cáo bài viết thành công!" });
    } catch {
      setErrorToast({ open: true, text: "Báo cáo bài viết thất bại" });
    } finally {
      setReportModalOpen(false);
      setSelectedPost(null);
    }
  };

  return (
    <div className="space-y-4">
      {(!isLoading && posts.length === 0 )? (
        <div className="p-4 text-center text-gray-500">Không có bài viết phù hợp</div>
      ) : (
        posts.map((post, index) => {
          const triggerIndex = Math.max(0, posts.length - 5);
          const isTrigger = index === triggerIndex;
          return (
            <div
              key={post.post_id}
              className="relative"
              ref={isTrigger ? lastPostRef : undefined} 
            >
              <Post
                post={post}
                onEditPost={() => {
                  setSelectedPost(post);
                  setEditModalOpen(true);
                }}
                onDeletePost={() => {
                  setSelectedPost(post);
                  setDeleteModalOpen(true);
                }}
                onDetailPost={() => {
                  setSelectedPost(post);
                  setDetailModalOpen(true);
                }}
                onSharePost={() => {
                  setSelectedPost(post);
                  setShareModalOpen(true);
                }}
                onReport={()=>{
                  setSelectedPost(post);
                  setReportModalOpen(true);
                }}
                onError={(msg) => setErrorToast({ open: true, text: msg })}
              />

              {/*Overlay khi đang update post */}
              {updatingPostId === post.post_id && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-40">
                  <div className="w-8 h-8 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
                </div>
              )}
            </div>
          );
        })
      )}

      {editModalOpen && selectedPost && (
        <EditPostModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSubmit={handleUpdate}
          postToEdit={selectedPost}
          isShare={!!selectedPost.shared_post}
        />
      )}
      {shareModalOpen && selectedPost && (
        <SharePostModal
          open={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          onSubmit={handleShare}
          post={selectedPost}
        />
      )}
      {deleteModalOpen && (
        <ConfirmDelete
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
      {detailModalOpen && selectedPost && (
        <PostDetailModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          post={selectedPost}
          onCommentAdded={onCommentAdded}
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

      <ReportModal 
        isOpen={reportModalOpen}
        onClose={()=>{setReportModalOpen(false)}}
        targetId={selectedPost?.post_id || ""}
        targetType="post"
        onSubmit={handleSubmitReport}
      />
    </div>
  );
};
