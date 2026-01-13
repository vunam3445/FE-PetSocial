// src/components/dashboard/HealthCardGrid.tsx
import React from "react";
import { WeightCard } from "./WeightCard";
import { VaccinationCard } from "./VaccinationCard";
import { FeatherConditionCard } from "./FeatherConditionCard";
import { AddCategoryCard } from "./AddCategoryCard";
import { HealthCardSkeleton } from "../skeleton/HealthCardSkeleton";
import { NoteCard } from "./NoteCard";
import { useState } from "react";
import type {
  HealthCategory,
  HealthCategoryList,
  HealthLog,
} from "../../types/Pet";
import { LogHistoryModal } from "./LogHistoryModal";
import ComfirmDeleteModal from "../modals/ComfirmDeleteModal";
import { useDeletePetHealthLog } from "../../hooks/pet/useDeletePetHealthLog";
import { useUpdatePetHealthLog } from "../../hooks/pet/useUpdatePetHealthLog";
import { LoadingOverlay } from "../loadings/LoadingOverlay";
import ErrorToast from "../toasts/ErrorToast";
interface HealthCardGridProps {
  owner: string;
  onOpenLogModal: (
    category: string,
    categoryType: string,
    categoryId: string
  ) => void;
  onOpenCategoryModal: () => void;
  loading?: boolean;
  healthData?: HealthCategoryList;
  onDeleteCategory: (categoryId: string) => void;
  onOpenEditCategory?: (categoryId: string) => void;
}

export const HealthCardGrid: React.FC<HealthCardGridProps> = ({
  owner,
  onOpenLogModal,
  onOpenCategoryModal,
  healthData,
  loading = false,
  onDeleteCategory,
  onOpenEditCategory,
}) => {

  const userId = localStorage.getItem('user_id');
  const isOwner = userId === owner;
  console.log('kfja',isOwner)
  const [isLogHistoryModalOpen, setIsLogHistoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<HealthCategory | null>(null);
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const {
    deleteLog,
    loading: deletingLog,
    error: deleteError,
  } = useDeletePetHealthLog();
  const {
    updateLog,
    loading: updatingLog,
    error: updateError,
  } = useUpdatePetHealthLog();
  const [isOpenErrorToast, setIsOpenErrorToast] = useState(false);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <HealthCardSkeleton key={i} />
        ))}
      </div>
    );
  }
  const handleConfirmDelete = (logId: string) => {
    setSelectedLogId(logId);
    setIsConfirmDeleteModalOpen(true);
  };
  // 1. Quản lý trạng thái Modal Lịch sử Log

  // 2. Hàm xử lý mở Modal Lịch sử Log
  const handleViewLogs = (category: HealthCategory) => {
    setSelectedCategory(category);
    setIsLogHistoryModalOpen(true);
  };

  // 3. Hàm xử lý Sửa/Xóa log (Cần tích hợp API/Redux/Context)
  const handleEditLog = (log_id: string, log: HealthLog) => {
    updateLog(log_id, log).then(() => {
      setIsLogHistoryModalOpen(false);
      // TODO: Triển khai hàm onOpenLogModal để nhận logToEdit
      console.log("Mở form sửa log:", log);
    });
  };

  const handleDeleteLog = () => {
    setIsConfirmDeleteModalOpen(false);
    setIsLogHistoryModalOpen(false);
    if (selectedLogId) {
      deleteLog(selectedLogId).then(() => {
        setSelectedLogId(null);
      });
    }
  };

  //lọc dữ liệu healthData để hiển thị các thẻ tương ứng

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {healthData?.map((category) => {
        switch (category.category_type) {
          case "metric":
            return (
              <WeightCard
                isOwner={isOwner}
                key={category.category_id}
                healthLogs={category}
                onOpenLogModal={() =>
                  onOpenLogModal(
                    category.name,
                    category.category_type,
                    category.category_id
                  )
                }
                onDeleteCategory={() => onDeleteCategory(category.category_id)}
                onViewLogsList={handleViewLogs} // <-- Truyền hàm mới
                onEdit={() => onOpenEditCategory?.(category.category_id)}
              />
            );

          case "schedule":
            return (
              <VaccinationCard
                isOwner={isOwner}
                key={category.category_id}
                healthLogs={category}
                onOpenLogModal={() =>
                  onOpenLogModal(
                    category.name,
                    category.category_type,
                    category.category_id
                  )
                }
                onDeleteCategory={() => onDeleteCategory(category.category_id)}
                onViewLogsList={handleViewLogs} // <-- Truyền hàm mới
                onEdit={() => onOpenEditCategory?.(category.category_id)}
              />
            );

          case "event":
            return (
              <FeatherConditionCard
                isOwner={isOwner}
                healthLogs={category}
                key={category.category_id}
                onOpenLogModal={() =>
                  onOpenLogModal(
                    category.name,
                    category.category_type,
                    category.category_id
                  )
                }
                onDeleteCategory={() => onDeleteCategory(category.category_id)}
                onViewLogsList={handleViewLogs} // <-- Truyền hàm mới
                onEdit={() => onOpenEditCategory?.(category.category_id)}
              />
            );

          case "note":
            return (
              <NoteCard
                isOwner={isOwner}
                healthLogs={category}
                key={category.category_id}
                onOpenLogModal={() =>
                  onOpenLogModal(
                    category.name,
                    category.category_type,
                    category.category_id
                  )
                }
                onDeleteCategory={() => onDeleteCategory(category.category_id)}
                onViewLogsList={handleViewLogs} // <-- Truyền hàm mới
                onEdit={() => onOpenEditCategory?.(category.category_id)}
              />
            );

          default:
            return null;
        }
      })}

      {isOwner &&(
        <AddCategoryCard onOpenCategoryModal={onOpenCategoryModal} />
      )}
      <LogHistoryModal
        isOpen={isLogHistoryModalOpen}
        onClose={() => setIsLogHistoryModalOpen(false)}
        category={selectedCategory}
        onUpdateLog={handleEditLog}
        onDeleteLog={handleConfirmDelete}
      />

      <ComfirmDeleteModal
        open={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirm={handleDeleteLog}
      />
      {(updatingLog || deletingLog) && <LoadingOverlay text="Đang xóa" />}
      {(updateError || deleteError) && (
        <ErrorToast
          open={isOpenErrorToast}
          text={
            updateError?.message || deleteError?.message || "Đã có lỗi xảy ra"
          }
          onClose={() => {
            setIsOpenErrorToast(false);
          }}
        />
      )}
    </div>
  );
};
