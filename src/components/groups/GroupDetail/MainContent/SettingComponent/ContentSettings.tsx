import React from 'react';

interface ContentSettingsProps {
  approvalMode: boolean;
  onToggleApproval: (enabled: boolean) => void;
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({ 
  approvalMode, 
  onToggleApproval 
}) => {
  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Quản lý nội dung</h3>
      </div>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Phê duyệt bài viết</h4>
            <p className="max-w-lg mt-1 text-sm text-gray-500">
              Nếu bật, bài viết sẽ cần quản trị viên phê duyệt trước khi hiển thị.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={!approvalMode}
              onChange={() => onToggleApproval(!approvalMode)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
    </div>
  );
};