// src/components/dashboard/SmartSuggestions.tsx
import React from 'react';
import type { PetHealthCategoryList } from '../../types/Pet';

export const SmartSuggestions: React.FC<{  categories: PetHealthCategoryList }> = ({ categories }) => {
  const suggestions = categories.map(category => `[+ ${category.name}]`);

  return (
    <div>
      <div className="flex gap-3 pb-2 overflow-x-auto no-scrollbar">
        {suggestions.map((text, index) => (
          <button 
            key={index}
            className="px-4 py-2 font-semibold text-indigo-700 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-indigo-50 whitespace-nowrap"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};