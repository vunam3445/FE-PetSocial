// src/components/dashboard/WeightCard.tsx
import React from 'react';
import { HealthCard } from './HealthCard';
import { WeightChart } from './WeightChart';
import type { HealthCategory } from '../../types/Pet';

interface WeightCardProps {
  isOwner: boolean;
  healthLogs?: HealthCategory;
  onOpenLogModal: (category: string) => void;
  onDeleteCategory: () => void;
  onViewLogsList?: (category: HealthCategory) => void; // NEW: Mở danh sách log
  onDeleteLog?: (logId: string) => void; // NEW: Xử lý xóa log
  onEdit?: () => void; // NEW: Xử lý sửa category
}

export const WeightCard: React.FC<WeightCardProps> = ({ healthLogs, onOpenLogModal, onDeleteCategory , onViewLogsList, onDeleteLog , onEdit, isOwner}) => {
  const footer = (
    <p className="text-sm text-gray-600">
      Cập nhật gần nhất: <span className="font-medium text-gray-900">{healthLogs?.health_logs[0]?.recorded_at} - {healthLogs?.health_logs[0]?.value}</span>
    </p>
  );

  return (
    <HealthCard
      isOwner={isOwner}
      title={healthLogs?.name || ''}
      onAddLog={() => onOpenLogModal('Cân nặng')}
      onDeleteCategory={onDeleteCategory}
      onViewLogs={() => healthLogs && onViewLogsList && onViewLogsList(healthLogs)} // NEW: Truyền action xem log
      footer={footer}
      onEdit={onEdit} // NEW: Truyền action sửa category
    >
      <WeightChart logs={healthLogs?.health_logs} unit={healthLogs?.unit} />
    </HealthCard>
  );
};