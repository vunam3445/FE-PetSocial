import React, { useState, useCallback, useRef } from "react";
import { useGetReportsOfGroup } from "../../../../../hooks/report/useGetReportsOfGroup";
import { PostReport } from "../../../../molecules/PortReport";
import { useDeleteReport } from "../../../../../hooks/report/useDeleteReport";
import { useUpdateReport } from "../../../../../hooks/report/useUpdateReport";
import ErrorToast from "../../../../toasts/ErrorToast";
import { LoadingOverlay } from "../../../../loadings/LoadingOverlay";
import { ReportedPostsSkeleton } from "../../../../skeleton/ReportedPostsSkeleton ";
import { useDeleteGroupMember } from "../../../../../hooks/groupMember/useDeleteGroupMember";

interface ReportedPostsProps {
  groupId?: string;
  onActionSuccess?: () => void;
}

export const ReportedPosts = ({ groupId,onActionSuccess }: ReportedPostsProps) => {
  const [page, setPage] = useState(1);
  // Dữ liệu API trả về giờ là danh sách các Posts (có lồng reports bên trong)
  const {
    reports: posts,
    setReports: setPosts,
    loading,
    hasMore,
  } = useGetReportsOfGroup(groupId, page);

  const {
    loading: updateLoading,
    error: updateError,
    setError: setUpdateError,
    changeStatus,
  } = useUpdateReport();
  const {
    loading: deleteLoading,
    error: deleteError,
    reject,
    setError: setDeleteError,
  } = useDeleteReport();
  const {
    loading: deleteGroupMemberLoading,
    error,
    deleteGroupMember,
    setError,
  } = useDeleteGroupMember();

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore],
  );

  const REPORT_REASONS = [
    { id: "spam", label: "Spam hoặc lừa đảo" },
    { id: "harassment", label: "Quấy rối hoặc bắt nạt" },
    { id: "hate_speech", label: "Ngôn từ gây thù ghét" },
    { id: "violence", label: "Bạo lực hoặc nguy hiểm" },
    { id: "nudity", label: "Ảnh khỏa thân hoặc tình dục" },
    { id: "other", label: "Vấn đề khác" },
  ];

  const getReportLabel = (reasonId: string) => {
    const reason = REPORT_REASONS.find((r) => r.id === reasonId);
    return reason ? reason.label : "Lý do khác";
  };

  // Xử lý giữ bài: Chuyển toàn bộ các báo cáo của bài viết này sang trạng thái 'resolved'
  const handleKeepPost = async (post: any) => {
    // Thu thập tất cả report_id có trong bài viết này
    const reportIds = post.reports.map((r: any) => r.report_id);

    // Gọi hook với mảng IDs
    const res = await changeStatus(reportIds, "resolved");
    if (res) {
      // Xóa bài viết khỏi danh sách hiển thị trên UI
      setPosts((prev) => prev.filter((p) => p.post_id !== post.post_id));
      onActionSuccess?.();
    }
  };

  // Xử lý xóa bài: Xóa bài viết và đồng thời xử lý các báo cáo liên quan
  const handleDeletePost = async (post: any) => {
    const reportIds = post.reports.map((r: any) => r.report_id);

    // Truyền mảng reportIds vào hàm reject (đã sửa ở Hook useDeleteReport)
    const res = await reject(reportIds);
    if (res) {
      setPosts((prev) => prev.filter((p) => p.post_id !== post.post_id));
      onActionSuccess?.();
    }
  };

  // Xử lý xóa bài và đuổi thành viên
  const handleDeletePostAndUser = async (post: any) => {
    const reportIds = post.reports.map((r: any) => r.report_id);

    // 1. Đuổi thành viên khỏi nhóm
    const deleteMemberRes = await deleteGroupMember(
      post.group_id,
      post.author_id,
    );

    // 2. Xóa các báo cáo và xử lý bài viết
    const res = await reject(reportIds);

    if (res && deleteMemberRes) {
      setPosts((prev) => prev.filter((p) => p.post_id !== post.post_id));
      onActionSuccess?.();
    }
  };

  if (loading && page === 1) return <ReportedPostsSkeleton />;

  if (!loading && posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm min-h-[400px]">
        <div className="p-4 bg-green-100 rounded-full">
          <i className="text-3xl text-green-600 fas fa-shield-alt"></i>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          An toàn tuyệt đối!
        </h3>
        <p className="text-gray-500">
          Không có bài viết nào bị báo cáo vào lúc này.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Nội dung bị báo cáo
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Xem xét và xử lý các bài viết bị báo cáo vi phạm.
          </p>
        </div>
        <div className="px-4 py-2 text-sm font-semibold text-red-700 bg-red-100 rounded-lg">
          Bài viết vi phạm: {posts.length}
        </div>
      </div>

      <div className="space-y-8">
        {posts.map((post, index) => {
          const isTargetItem = index === posts.length - 3;
          // Lấy các lý do duy nhất từ danh sách reports
          const uniqueReasons = Array.from(
            new Set(post.reports.map((r: any) => r.reason)),
          );

          return (
            <div
              key={post.post_id}
              ref={isTargetItem ? lastElementRef : null}
              className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
            >
              {/* Report Alert Section */}
              <div className="flex items-start px-4 py-3 border-b border-red-100 bg-red-50">
                <i className="mt-1 mr-3 text-red-500 fas fa-exclamation-circle"></i>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900">
                    Bài viết bị báo cáo {post.reports_count} lần
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {uniqueReasons.map((reasonId: any) => (
                      <span
                        key={reasonId}
                        className="px-2 py-0.5 bg-white border border-red-200 text-red-700 text-[10px] font-bold rounded uppercase"
                      >
                        {getReportLabel(reasonId)}
                      </span>
                    ))}
                  </div>
                  {post.reports[0]?.description && (
                    <p className="mt-2 text-xs italic text-gray-600">
                      " {post.reports[0].description} "
                    </p>
                  )}
                </div>
              </div>

              {/* Post Content */}
              <PostReport post={post} onDetailPost={() => {}} />

              {/* Action Footer */}
              <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={() => handleKeepPost(post)} // Truyền nguyên object post
                  className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Giữ bài viết
                </button>

                <button
                  onClick={() => handleDeletePost(post)} // Truyền nguyên object post
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg shadow-sm hover:bg-red-600"
                >
                  <i className="mr-2 fas fa-trash-alt"></i>
                  Xóa bài viết
                </button>

                <button
                  onClick={() => handleDeletePostAndUser(post)} // Truyền nguyên object post
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-gray-900 rounded-lg shadow-sm hover:bg-black"
                >
                  <i className="mr-2 fas fa-user-slash"></i>
                  Xóa & Đuổi
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ErrorToast
        open={updateError || deleteError || !!error}
        onClose={() => {
          setDeleteError(false);
          setUpdateError(false);
          setError(null);
        }}
        text={"Xử lý báo cáo thất bại, vui lòng thử lại sau."}
      />
      {(updateLoading || deleteLoading || deleteGroupMemberLoading) && (
        <LoadingOverlay text={"Đang xử lý..."} />
      )}
    </div>
  );
};
