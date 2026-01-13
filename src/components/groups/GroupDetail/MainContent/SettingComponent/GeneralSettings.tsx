import React, { useState } from 'react';
import { EditableTextRow } from './EditableTextRow';

interface GeneralSettingsProps {
  groupName?: string;
  description?: string;
  visibility?: string; // 'public' | 'private'
  onUpdate: (field: string, value: string) => void;
}

export const GeneralSettings: React.FC<GeneralSettingsProps> = ({ 
  groupName, 
  description, 
  visibility, 
  onUpdate 
}) => {
  // Logic: Nếu privacy khác 'public' thì coi là private
  const isPrivate = visibility !== 'public'; // controlled từ prop

  const handlePrivacyChange = () => {
    onUpdate('visibility', isPrivate ? 'public' : 'private');
  };

  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Thiết lập nhóm</h3>
      </div>
      <div className="px-6">
        <EditableTextRow 
          label="Tên nhóm" 
          initialValue={groupName} 
          type="text"
          onSave={(val) => onUpdate('name', val)}
        />
        <EditableTextRow 
          label="Giới thiệu" 
          initialValue={description} 
          type="textarea"
          onSave={(val) => onUpdate('description', val)}
        />
        
        {/* Quyền riêng tư */}
        <div className="py-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center justify-between">
              <div>
                  <h4 className="text-sm font-medium text-gray-900">Quyền riêng tư</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    {isPrivate ? 'Nhóm Riêng tư (Chỉ thành viên mới thấy nội dung)' : 'Nhóm Công khai (Ai cũng có thể tìm và xem)'}
                  </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isPrivate}
                  onChange={handlePrivacyChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
        </div>
      </div>
    </div>
  );
};