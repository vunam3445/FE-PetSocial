// src/components/dashboard/VaccinationCard.tsx
import { HealthCard } from "./HealthCard";
import type { HealthCategory, HealthLog } from "../../types/Pet";
import React, { useMemo } from "react";

interface VaccinationCardProps {
  isOwner: boolean;
  healthLogs: HealthCategory;
  onOpenLogModal: (category: string) => void;
  onDeleteCategory: () => void;
  onViewLogsList?: (category: HealthCategory) => void; // NEW: Mở danh sách log
  onEdit?: () => void; // <-- [NEW] Prop để sửa category/card
}

export const VaccinationCard: React.FC<VaccinationCardProps> = ({
  healthLogs,
  onOpenLogModal,
  onDeleteCategory,
  onViewLogsList,
  onEdit,
  isOwner
}) => {
  // Filter log đã hoàn thành
  const completedLogs = healthLogs.health_logs.filter(
    (log) => new Date(log.recorded_at) <= new Date()
  );

  const latestCompletedLog =
    completedLogs.length > 0
      ? completedLogs.reduce((a, b) =>
          new Date(a.recorded_at) > new Date(b.recorded_at) ? a : b
        )
      : null;

  // Tính ngày kế tiếp
  const nextDueDate = useMemo(() => {
    const intervalDays = healthLogs.interval_days;

    if (!latestCompletedLog || !intervalDays || intervalDays === 0) {
      return "N/A";
    }

    const lastDate = new Date(latestCompletedLog.recorded_at);

    const nextDate = new Date(
      lastDate.getTime() + intervalDays * 24 * 60 * 60 * 1000
    );

    const day = String(nextDate.getDate()).padStart(2, "0");
    const month = String(nextDate.getMonth() + 1).padStart(2, "0");
    const year = nextDate.getFullYear();

    return `${day}/${month}/${year}`;
  }, [healthLogs.health_logs, healthLogs.interval_days]);

  const footer = (
    <p className="text-sm text-gray-600">
      Lịch tiếp theo:{" "}
      <span className="font-medium text-red-600">{nextDueDate}</span>
    </p>
  );

  return (
    <HealthCard
      isOwner={isOwner}
      title={healthLogs.name}
      onAddLog={() => onOpenLogModal(healthLogs.name)}
      onDeleteCategory={onDeleteCategory}
      footer={footer}
      onViewLogs={() =>
        healthLogs && onViewLogsList && onViewLogsList(healthLogs)
      } // NEW: Truyền action xem log
      onEdit={onEdit}
    >
      <ul className="space-y-4">
        {healthLogs.health_logs.map((log: HealthLog, index: number) => {
          const isLongDescription = (log.description?.length || 0) > 150;

          return (
            <li key={index} className="pl-3 border-l-4 border-indigo-200">
              <div className="flex items-start justify-between mb-1">
                <p className="pr-2 text-base font-semibold text-gray-800 break-words">
                  <span className="pr-1 text-sm font-medium text-blue-500">
                    {log.recorded_at}
                  </span>
                  {log.title}
                </p>
              </div>

              {log.description && (
                <div
                  className={`text-gray-600 bg-gray-50 p-2 rounded-md transition duration-300 ${
                    isLongDescription ? "max-h-24 overflow-y-auto" : ""
                  }`}
                  title={log.description}
                >
                  <p className="text-sm">{log.description}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </HealthCard>
  );
};
