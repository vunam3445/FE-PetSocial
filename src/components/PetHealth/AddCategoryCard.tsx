// src/components/dashboard/AddCategoryCard.tsx
import React from 'react';

interface AddCategoryCardProps {
  onOpenCategoryModal: () => void;
}

export const AddCategoryCard: React.FC<AddCategoryCardProps> = ({ onOpenCategoryModal }) => {
  return (
    <button 
      onClick={onOpenCategoryModal}
      className="border-2 border-dashed border-gray-400 rounded-2xl text-gray-500 hover:border-indigo-500 hover:text-indigo-600 transition duration-300 flex items-center justify-center min-h-[300px]"
    >
      <div className="p-4 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto mb-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-lg font-semibold">Thêm mục theo dõi mới</span>
      </div>
    </button>
  );
};