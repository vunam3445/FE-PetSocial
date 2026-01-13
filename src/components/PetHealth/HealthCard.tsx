// src/components/common/HealthCard.tsx
import React from "react";

interface HealthCardProps {
  isOwner: boolean;
  title: string;
  onAddLog: () => void;
  onEdit?: () => void; // <-- [NEW] Prop để sửa category/card
  onDeleteCategory?: () => void;
  children: React.ReactNode;
  footer: React.ReactNode;
  onViewLogs?: () => void;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  isOwner,
  title,
  onAddLog,
  onEdit, // <-- [NEW]
  onDeleteCategory,
  children,
  footer,
  onViewLogs,
}) => {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-lg rounded-2xl max-h-96">
      {/* Card Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200">
        <h4 className="text-xl font-bold text-gray-800">{title}</h4>

        {/* Button Group */}
        {isOwner &&(
                  <div className="flex items-center gap-2">
          {/* 1. Add Log Button */}
          <button
            onClick={onAddLog}
            className="p-2 text-gray-500 rounded-full openAddLogModalBtn hover:bg-gray-100 hover:text-indigo-600"
            title="Thêm log mới"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
          </button>

          {/* 2. [NEW] Edit Button (Nút Sửa) */}
          {onEdit && (
            <button
              onClick={onEdit}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-amber-600"
              title="Chỉnh sửa"
            >
              {/* Icon Cây bút (Pencil) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
              </svg>
            </button>
          )}

          {/* 3. View Logs Button */}
          <button
            onClick={onViewLogs}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-blue-600"
            title="Xem danh sách log"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.5.5h13a.5.5 0 00.5-.5v-13a.5.5 0 00-.5-.5h-13zM4 4h12v12H4V4zm4 4H5v1h3V8zm0 3H5v1h3v-1zm4-3h-3v1h3V8zm0 3h-3v1h3v-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* 4. Delete Button (Conditional) */}
          {onDeleteCategory && (
            <button
              onClick={onDeleteCategory}
              className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600"
              title="Xóa category"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}
        </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-grow p-5 overflow-y-auto">{children}</div>

      {/* Card Footer */}
      <div className="p-5 border-t border-gray-200 bg-gray-50">{footer}</div>
    </div>
  );
};