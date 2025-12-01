import React, { useState, useEffect } from "react";
import type { GroupJoinQuestion } from "../../../../../types/QuestionAndAnswer";
// --- Types ---

// --- Component con: QuestionItem (Logic giống EditableTextRow) ---
interface QuestionItemProps {
  q: GroupJoinQuestion;
  onUpdate: (id: number, newContent: string) => void;
  onDelete: (id: number) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ q, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(q.question);

  // Reset value khi props thay đổi (đề phòng trường hợp danh sách cha render lại)
  useEffect(() => {
    setValue(q.question);
  }, [q.question]);

  const startEditing = () => {
    setValue(q.question); // Reset về giá trị gốc
    setIsEditing(true);
  };

  const handleCancel = () => {
    setValue(q.question);
    setIsEditing(false);
  };

  const handleSave = () => {
    if (value.trim()) {
      onUpdate(q.id, value);
      setIsEditing(false);
    }
  };

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      {!isEditing ? (
        // --- VIEW MODE ---
        <div className="flex items-start justify-between">
          <div className="flex-1 mr-4">
            <h5 className="mb-1 text-sm font-bold text-gray-700">Câu hỏi:</h5>
            <p className="text-gray-900 text-md">{q.question}</p>
          </div>
          <div className="flex flex-col space-y-2 shrink-0">
            <button
              onClick={startEditing}
              className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i className="mr-1 fas fa-pen"></i> Sửa
            </button>
            <button
              onClick={() => onDelete(q.id)}
              className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              <i className="mr-1 fas fa-trash"></i> Xóa
            </button>
          </div>
        </div>
      ) : (
        // --- EDIT MODE (Giống EditableTextRow) ---
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nội dung câu hỏi
          </label>
          <textarea
            className="w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <div className="flex items-center mt-3 space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Lưu thay đổi
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};