// src/components/dashboard/HealthDashboardTab.tsx
import React from 'react';
import { SmartSuggestions } from './SmartSuggestions';
import { HealthCardGrid } from './HealthCardGrid';
import { usePetHealthCategories } from '../../hooks/pet/usePetHealthCategories';
import type { HealthCategoryList } from '../../types/Pet';
interface HealthDashboardTabProps {
  species: string;
  owner: string;
  onOpenLogModal: (category: string, categoryType: string, categoryId: string) => void;
  onOpenCategoryModal: () => void;
  healthData?: HealthCategoryList;
  loading?: boolean;
  onDeleteCategory: (categoryId: string) => void;
  onOpenEditCategory?: (categoryId: string) => void;
  onRefresh:()=>void;
}

export const HealthDashboardTab: React.FC<HealthDashboardTabProps> = ({
  species,
  owner,
  onOpenLogModal,
  onOpenCategoryModal,
  healthData,
  loading,
  onDeleteCategory,
  onOpenEditCategory,
  onRefresh
}) => {
  const { categories } = usePetHealthCategories(species);
  return (
    <div className="space-y-8">
      {/* <SmartSuggestions categories={categories} /> */}
      <HealthCardGrid 
        owner={owner}
        onOpenLogModal={onOpenLogModal}
        onOpenCategoryModal={onOpenCategoryModal}
        loading={loading}
        healthData ={healthData}
        onDeleteCategory={onDeleteCategory}
        onOpenEditCategory={onOpenEditCategory}
        onRefresh={onRefresh}
      />
    </div>
  );
};