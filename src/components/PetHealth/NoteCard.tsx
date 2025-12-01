// src/components/dashboard/NoteCard.tsx
import React from "react";
import { HealthCard } from "./HealthCard";
import type { HealthCategory, HealthLog } from "../../types/Pet";

interface NoteCardProps {
  healthLogs?: HealthCategory;
  onOpenLogModal: (category: string, categoryType: string, categoryId: string) => void;
  onDeleteCategory?: () => void; // Thêm prop xóa (tùy chọn) vì Note thường là do người dùng tạo
  onViewLogsList?: (category: HealthCategory) => void; // NEW: Mở danh sách log
  onEdit?: () => void; // NEW: Xử lý sửa category
}

export const NoteCard: React.FC<NoteCardProps> = ({
  healthLogs,
  onOpenLogModal,
  onDeleteCategory,
  onViewLogsList,
  onEdit,
}) => {
  // Sắp xếp logs: Gần nhất lên đầu
  const sortedLogs = healthLogs?.health_logs.sort(
    (a, b) =>
      new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime()
  );

  const latestLog = sortedLogs?.[0];

  const footer = (
    <p className="text-sm text-gray-600">
      Ghi chú gần nhất:{" "}
      <span className="font-medium text-gray-900">
        {latestLog ? `Ngày ${latestLog.recorded_at}` : "Chưa có ghi chú"}
      </span>
    </p>
  );

  return (
    <HealthCard
      title={healthLogs?.name || "Ghi chú sức khỏe"}
      onAddLog={() => onOpenLogModal(healthLogs?.name || "Ghi chú", "note", healthLogs?.category_id || '')}
      onDeleteCategory={onDeleteCategory} // Truyền prop xóa vào HealthCard
      footer={footer}
      onViewLogs={() =>{onViewLogsList?.(healthLogs)}} // NEW: Truyền action xem log
      onEdit={onEdit} // NEW: Truyền action sửa category
    >
      <div className="space-y-4">
        {/* Render danh sách Log */}
        {sortedLogs?.map((log: HealthLog, index) => {
          // Ghi chú không cần title (vì title = categoryName), chỉ cần description
          // Giới hạn chiều dài và áp dụng nền cam nhạt
          const isLongDescription = (log.description?.length || 0) > 150;
          
          return (
            <div 
              key={index} 
              // 🧡 Nền cam nhạt đặc trưng của note
              className="p-3 border border-yellow-200 rounded-lg bg-yellow-50"
            >
              {/* Ngày tháng */}
              <p className="mb-1 text-xs font-medium text-yellow-700">
                {log.recorded_at}
              </p>
              
              {/* Nội dung Ghi chú (Description) */}
              {log.description && (
                <div
                  className={`text-gray-700 transition duration-300 ${
                    isLongDescription ? "max-h-32 overflow-y-auto" : "" // Chiều cao tối đa 32 đơn vị
                  }`}
                  title={log.description}
                >
                  <p className="text-sm italic">{log.description}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Xử lý trường hợp không có logs */}
        {sortedLogs?.length === 0 && (
          <p className="italic text-gray-500">
            Chưa có ghi chú nào được thêm vào category này.
          </p>
        )}
      </div>
    </HealthCard>
  );
};