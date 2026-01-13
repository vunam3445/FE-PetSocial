import React, { useState } from 'react';


interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (groupName: string) => void;
}

export const CreateGroupChatModal = ({ isOpen, onClose, onCreate }: CreateGroupModalProps) => {
  const [groupName, setGroupName] = useState('');

  if (!isOpen) return null;



  const handleCreate = () => {
    if (groupName.trim()) {
      onCreate(groupName);
      setGroupName('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Tạo nhóm mới</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Tên nhóm */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Tên nhóm</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nhập tên nhóm..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

         
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName.trim()}
            className="px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tạo nhóm
          </button>
        </div>
      </div>
    </div>
  );
};