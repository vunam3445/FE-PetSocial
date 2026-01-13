import React from 'react';

interface DangerZoneProps {
  onDelete: () => void;
}

export const DangerZone: React.FC<DangerZoneProps> = ({ onDelete }) => {


  return (
    <div className="overflow-hidden bg-white border border-red-200 shadow-sm rounded-xl">
      <div className="px-6 py-4 border-b border-red-100 bg-red-50">
        <h3 className="text-lg font-semibold text-red-700">Khu vực nguy hiểm</h3>
      </div>
      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="mr-4">
            <h4 className="text-sm font-medium text-gray-900">Xóa nhóm này</h4>
            <p className="mt-1 text-sm text-gray-500">
              Khi xóa nhóm, tất cả bài viết, thành viên và dữ liệu liên quan sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
            </p>
          </div>
          <button 
            onClick={onDelete}
            className="px-4 py-2 text-sm font-bold text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Xóa nhóm
          </button>
        </div>
      </div>
    </div>
  );
};