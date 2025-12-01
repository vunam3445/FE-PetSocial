// src/components/dashboard/HealthDashboardTab.tsx
import React from 'react';
import { SmartSuggestions } from './SmartSuggestions';
import { HealthCardGrid } from './HealthCardGrid';
import { usePetHealthCategories } from '../../hooks/pet/usePetHealthCategories';
import type { HealthCategoryList } from '../../types/Pet';
interface HealthDashboardTabProps {
  species: string;
  onOpenLogModal: (category: string, categoryType: string, categoryId: string) => void;
  onOpenCategoryModal: () => void;
  healthData?: HealthCategoryList;
  loading?: boolean;
  onDeleteCategory: (categoryId: string) => void;
  onOpenEditCategory?: (categoryId: string) => void;
}

export const HealthDashboardTab: React.FC<HealthDashboardTabProps> = ({
  species,
  onOpenLogModal,
  onOpenCategoryModal,
  healthData,
  loading,
  onDeleteCategory,
  onOpenEditCategory,
}) => {
  const { categories } = usePetHealthCategories(species);
  return (
    <div className="space-y-8">
      <SmartSuggestions categories={categories} />
      <HealthCardGrid 
        onOpenLogModal={onOpenLogModal}
        onOpenCategoryModal={onOpenCategoryModal}
        loading={loading}
        healthData ={healthData}
        onDeleteCategory={onDeleteCategory}
        onOpenEditCategory={onOpenEditCategory}
      />
    </div>
  );
};