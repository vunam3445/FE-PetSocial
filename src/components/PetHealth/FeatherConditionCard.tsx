// src/components/dashboard/FeatherConditionCard.tsx
import React from "react";
import { HealthCard } from "./HealthCard";
import type { HealthCategory } from "../../types/Pet";

interface FeatherConditionCardProps {
  healthLogs?: HealthCategory;
  onOpenLogModal: (category: string) => void;
  onDeleteCategory: () => void; // Thêm prop xóa (tùy chọn) nếu cần
  onViewLogsList?: (category: HealthCategory) => void; // NEW: Mở danh sách log
  onEdit?: () => void; // NEW: Xử lý sửa category
}

export const FeatherConditionCard: React.FC<FeatherConditionCardProps> = ({
  healthLogs,
  onOpenLogModal,
  onDeleteCategory,
  onViewLogsList,
  onEdit,
}) => {
  // Sắp xếp logs: Gần nhất lên đầu để xem tình trạng hiện tại
  const sortedLogs = healthLogs?.health_logs.sort(
    (a, b) =>
      new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
  );

  const footer = (
    <p className="text-sm text-gray-600">
      Tình trạng gần nhất:{" "}
      <span className="font-medium text-green-600">
        {sortedLogs?.[0]?.title || "Chưa cập nhật"}
      </span>
    </p>
  );

  return (
    <HealthCard
      title={healthLogs?.name || "Tình trạng Lông & Da"}
      onAddLog={() => onOpenLogModal("Tình trạng Lông & Da")}
      onDeleteCategory={onDeleteCategory}
      footer={footer}
      onViewLogs={() =>
        healthLogs && onViewLogsList && onViewLogsList(healthLogs)
      } // NEW: Truyền action xem log
      onEdit={onEdit}
    >
      <div className="space-y-6">
        {/* Render danh sách Log */}
        {sortedLogs?.map((log, index) => {
          // Giới hạn chiều dài để tránh làm card quá dài khi description dài
          const isLongDescription = (log.description?.length || 0) > 150;

          return (
            <div key={index} className="pl-3 border-l-4 border-indigo-200">
              {/* Tiêu đề & Ngày: Title to hơn, ngày nhỏ hơn và màu xám nhạt */}
              <div className="flex items-start justify-between mb-1">
                <p className="pr-2 text-base font-semibold text-gray-800 break-words">
                  {/* Ngày tháng: Màu xanh nổi bật */}
                  <span className="pr-1 text-sm font-medium text-blue-500">
                    {log.recorded_at}
                  </span>
                  {/* Tiêu đề: Giữ nguyên màu đen đậm (text-gray-800) */}
                  {log.title}
                </p>
              </div>

              {/* Mô tả (Description) */}
              {log.description && (
                <div
                  className={`text-gray-600 bg-gray-50 p-2 rounded-md transition duration-300 ${
                    isLongDescription ? "max-h-24 overflow-y-auto" : "" // Áp dụng cuộn nếu quá dài
                  }`}
                  title={log.description} // Hiển thị toàn bộ khi hover (tooltip)
                >
                  <p className="text-sm">{log.description}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Xử lý trường hợp không có logs */}
        {sortedLogs?.length === 0 && (
          <p className="italic text-gray-500">Chưa có log.</p>
        )}
      </div>
    </HealthCard>
  );
};
