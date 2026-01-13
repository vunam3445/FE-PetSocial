import React, { useState } from "react";
import { useGetReportsOfGroup } from "../../../../../hooks/report/useGetReportsOfGroup";
import { PostReport } from "../../../../molecules/PortReport";
import { useDeleteReport } from "../../../../../hooks/report/useDeleteReport";
import { useUpdateReport } from "../../../../../hooks/report/useUpdateReport";
import ErrorToast from "../../../../toasts/ErrorToast";
import { LoadingOverlay } from "../../../../loadings/LoadingOverlay";
import { ReportedPostsSkeleton } from "../../../../skeleton/ReportedPostsSkeleton ";
interface ReportedPostsProps {
  groupId?: string; // Để sau này call API
}

export const ReportedPosts = ({ groupId }: ReportedPostsProps) => {
  const [page, setPage] = useState(1);
  const { reports, setReports, loading } = useGetReportsOfGroup(groupId, page);
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
  // Hành động: Giữ lại bài viết (Bỏ qua báo cáo)
  const handleKeepPost = async (reportId: string) => {
    const res = await changeStatus(reportId, "resolved");
    if (res) {
      setReports((prev) => prev.filter((p) => p.report_id !== reportId));
    }
  };

  // Hành động: Xóa bài viết
  const handleDeletePost = async (reportId: string) => {
    const res = await reject(reportId);
    if (res) {
      setReports((prev) => prev.filter((p) => p.report_id !== reportId));
    }
  };

  if (loading) {
    return <ReportedPostsSkeleton />;
  }
  if (loading === false && reports.length === 0) {
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
  const REPORT_REASONS = [
    { id: "spam", label: "Spam hoặc lừa đảo" },
    { id: "harassment", label: "Quấy rối hoặc bắt nạt" },
    { id: "hate_speech", label: "Ngôn từ gây thù ghét" },
    { id: "violence", label: "Bạo lực hoặc nguy hiểm" },
    { id: "nudity", label: "Ảnh khỏa thân hoặc tình dục" },
    { id: "other", label: "Vấn đề khác" }, // ID này sẽ kích hoạt ô nhập text
  ];

  const getReportLabel = (reasonId: string) => {
    const reason = REPORT_REASONS.find((r) => r.id === reasonId);
    return reason ? reason.label : "Lý do khác";
  };
  return (
    <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Nội dung bị báo cáo
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Xem xét và xử lý các bài viết bị thành viên gắn cờ vi phạm.
          </p>
        </div>
        <div className="px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-100 rounded-lg">
          Cần xử lý: {reports.length}
        </div>
      </div>

      {/* List Posts */}
      <div className="space-y-8">
        {reports.map((report) => (
          <div
            key={report.report_id}
            className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            {/* 1. Report Alert Section (Phần cảnh báo nổi bật) */}
            <div className="flex items-start px-4 py-3 border-b border-orange-100 bg-orange-50">
              <i className="mt-1 mr-3 text-orange-500 fas fa-exclamation-triangle"></i>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">
                  Bài viết này bị báo cáo {report.reports_count} lần
                </p>
                <div className="flex flex-col mt-1">
                  <p className="text-xs text-orange-700">
                    <span className="italic font-semibold">Lý do chính:</span>{" "}
                    {getReportLabel(report.reason)}
                  </p>

                  {/* Hiển thị thêm description nếu lý do là "other" hoặc có nội dung mô tả */}
                  {report.description && (
                    <p className="mt-1 text-xs italic text-gray-600">
                      " {report.description} "
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. The Post Content (Preview context) */}
            <PostReport post={report.post} onDetailPost={() => {}} />

            {/* 3. Action Footer */}
            <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
              <div className="flex space-x-3">
                <button
                  onClick={() => handleKeepPost(report.report_id)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
                >
                  Giữ bài viết
                </button>
                <button
                  onClick={() => handleDeletePost(report.report_id)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-red-500 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none"
                >
                  <i className="mr-2 fas fa-trash-alt"></i>
                  Xóa bài & Cảnh cáo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ErrorToast
        open={updateError || deleteError}
        onClose={() => {
          setDeleteError(false);
          setUpdateError(false);
        }}
        text={"Duyệt bài viết bị báo cáo thất bại vui lòng thử lại sau"}
      />
      {(updateLoading || deleteLoading) && (
        <LoadingOverlay text={"Đang xử lý..."} />
      )}
    </div>
  );
};
