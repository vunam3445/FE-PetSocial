// src/components/sidebar/HealthSummaryCard.tsx
import React from 'react';

interface HealthSummary {
  isVaccinated: boolean;
  isNeutered: boolean;
}

export const HealthSummaryCard: React.FC<{ healthSummary: HealthSummary }> = ({ healthSummary }) => {
  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl">
      <h3 className="mb-4 text-xl font-bold text-gray-800">Hồ sơ Sức khỏe</h3>
      <div className="space-y-3">
        {healthSummary.isVaccinated && (
          <span className="flex items-center px-4 py-3 text-sm font-semibold rounded-lg bg-emerald-100 text-emerald-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            Đã tiêm phòng đầy đủ
          </span>
        )}
        {healthSummary.isNeutered && (
          <span className="flex items-center px-4 py-3 text-sm font-semibold rounded-lg bg-sky-100 text-sky-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2">
              <path d="M10 1a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 1zM5.05 3.05a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM3.05 5.05a.75.75 0 000 1.06l1.06 1.06a.75.75 0 001.06-1.06L3.05 5.05zm0 8.9a.75.75 0 001.06 0l1.06-1.06a.75.75 0 00-1.06-1.06l-1.06 1.06a.75.75 0 000 1.06zM10 15a.75.75 0 01-.75.75v1.5a.75.75 0 011.5 0v-1.5a.75.75 0 01-.75-.75zM14.95 16.95a.75.75 0 01-1.06 0l-1.06-1.06a.75.75 0 011.06-1.06l1.06 1.06a.75.75 0 010 1.06zM16.95 14.95a.75.75 0 000-1.06l-1.06-1.06a.75.75 0 00-1.06 1.06l1.06 1.06a.75.75 0 001.06 0zM10 5a5 5 0 100 10 5 5 0 000-10zM8.5 10a1.5 1.S 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
            Đã triệt sản
          </span>
        )}
      </div>
    </div>
  );
};