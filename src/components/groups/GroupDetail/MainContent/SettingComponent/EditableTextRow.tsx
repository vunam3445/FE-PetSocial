import React, { useState, useEffect } from 'react';

interface EditableTextRowProps {
  label: string;
  initialValue?: string;
  type?: 'text' | 'textarea';
  onSave: (value: string) => void;
}

// EditableTextRow.tsx
export const EditableTextRow: React.FC<EditableTextRowProps> = ({ 
  label, 
  initialValue = '', 
  type = 'text', 
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>(initialValue);

  // useEffect này vẫn cần để cập nhật khi API thành công (prop thực sự thay đổi từ A -> B)
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(initialValue);
    setIsEditing(false);
  };

  const startEditing = () => {
    setValue(initialValue); // <--- FIX 2: Luôn reset về giá trị gốc từ cha khi bắt đầu sửa
    setIsEditing(true);
  };

  return (
    <div className="py-4 border-b border-gray-100 last:border-0">
      <div className="flex items-start justify-between">
        <div className="flex-1 mr-4">
          <h4 className="text-sm font-medium text-gray-900">{label}</h4>
          
          {!isEditing ? (
            // <--- FIX 1: Hiển thị initialValue thay vì value
            // Nếu API lỗi, initialValue vẫn là cái cũ -> UI hiện cái cũ (đúng logic)
            // Nếu API thành công, initialValue cập nhật -> UI hiện cái mới
            <p className="mt-1 text-sm text-gray-500">{initialValue || "Chưa có thông tin"}</p>
          ) : (
            <div className="mt-2">
              {/* Phần input giữ nguyên dùng biến value để user gõ */}
              {type === 'textarea' ? (
                <textarea
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" // giữ nguyên class của bạn
                  rows={4}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  className="w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" // giữ nguyên class của bạn
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}
              
              <div className="flex items-center mt-2 space-x-2">
                <button 
                  onClick={handleSave}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Lưu
                </button>
                <button 
                  onClick={handleCancel}
                  className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <button 
            onClick={startEditing} // <--- Gọi hàm startEditing thay vì setIsEditing(true) trực tiếp
            className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors shrink-0"
          >
            Chỉnh sửa
          </button>
        )}
      </div>
    </div>
  );
};