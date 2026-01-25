// src/components/modals/LogHistoryModal.tsx
import React, { useState, useEffect } from 'react';
import type { HealthCategory, HealthLog } from '../../types/Pet';
// Giả định EditLogForm đã được import
import EditLogForm from './EditLogForm'; 

interface LogHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: HealthCategory | null; 
  onDeleteLog: (logId: string) => void; 
  onUpdateLog: (log_id: string, log: HealthLog, selectedFile?: File) => void; // Hàm mới để lưu log đã sửa
}

export const LogHistoryModal: React.FC<LogHistoryModalProps> = ({ 
  isOpen, 
  onClose, 
  category, 
  onDeleteLog,
  onUpdateLog // Sử dụng hàm này cho việc lưu form
}) => {
  // 1. State quản lý log đang chỉnh sửa (null = List View, HealthLog = Edit View)
  const [editingLog, setEditingLog] = useState<HealthLog | null>(null);
  
  // 2. Hàm kích hoạt chế độ chỉnh sửa
  const handleEditClick = (log: HealthLog) => {
    // onEditLog(log); // Có thể gọi hàm gốc nếu cần
    setEditingLog(log);
  };
  
  // 3. Hàm hủy/đóng form chỉnh sửa
  const handleCancelEdit = () => {
    setEditingLog(null);
  };
  
  // 4. Hàm lưu log đã sửa
  const handleSaveEdit = (updatedLog: HealthLog,selectedFile?: File) => {
    onUpdateLog(updatedLog.log_id, updatedLog,selectedFile); // Gọi hàm update từ prop
    setEditingLog(null); // Quay lại danh sách
  };

  // 5. Reset trạng thái khi đóng/mở modal
  useEffect(() => {
    if (!isOpen) {
      // Đảm bảo trạng thái edit được reset khi modal đóng
      setEditingLog(null); 
    }
  }, [isOpen]);


  if (!isOpen || !category) return null;

  const sortedLogs = category.health_logs
    .slice()
    .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime());

  // Class cho animation trượt: Thay đổi transform của container
  const containerTransform = editingLog ? 'translate-x-[-100%]' : 'translate-x-0';
  const transitionClass = 'transition-transform duration-[350ms] ease-in-out'; // Animation 350ms
  
  // Class cho List View (Fade-out & Push nhẹ)
  const listViewClasses = editingLog 
    ? 'opacity-0 scale-95 transition-all duration-[350ms]' // Khi Edit View hiện, List View mờ và thu nhỏ nhẹ
    : 'opacity-100 transition-all duration-300';
    
  const modalWidth = 'w-full max-w-lg'; // Chiều rộng cơ bản của modal
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50" onClick={editingLog ? undefined : onClose}>
      <div 
        className={`relative ${modalWidth} p-4 mx-auto my-10 bg-white rounded-xl shadow-2xl`} 
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header - Thay đổi tiêu đề khi ở chế độ Edit */}
        <div className="flex items-center justify-between pb-3 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            {editingLog ? `Sửa Log: ${category.name}` : `Lịch sử ${category.name} (${category.unit || ''})`}
          </h3>
          <button onClick={editingLog ? handleCancelEdit : onClose} className="p-1 text-gray-400 rounded-full hover:bg-gray-100">
            {/* Icon Close hoặc Back (khi đang Edit) */}
            {editingLog ? (
                // Icon Back Arrow khi ở chế độ chỉnh sửa
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            ) : (
                // Icon Close khi ở danh sách
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            )}
          </button>
        </div>

        {/* 6. Vùng chứa nội dung chính với hiệu ứng trượt */}
        <div className={`pt-4 pb-2 overflow-hidden`}>
          <div className={`flex ${transitionClass} ${containerTransform}`}>
          
          {/* A. List View (Vùng hiển thị danh sách log) */}
          <div className={`${modalWidth} flex-shrink-0 pt-4 pb-2 ${listViewClasses}`}> 
            <div className="space-y-3 overflow-y-auto max-h-96">
              {sortedLogs.length === 0 ? (
                <p className="py-4 text-center text-gray-500">Không có log nào được ghi nhận.</p>
              ) : (
                sortedLogs.map((log) => (
                 <div key={log.log_id} className="flex items-center justify-between p-3 transition duration-150 border border-blue-100 rounded-xl bg-blue-50/70 hover:bg-blue-100/70">
                  <div className="flex items-center min-w-0 pr-2 space-x-3">
                      {log.image_url && (
                      <div className="flex-shrink-0 w-12 h-12 overflow-hidden bg-gray-200 border border-blue-200 rounded-lg">
                        <img src={log.image_url} alt="" className="object-cover w-full h-full" />
                      </div>
                    )}
                      <p className="font-medium text-gray-800">
                        {log.value} {category.unit || ''} 
                        <span className="ml-2 text-sm font-normal text-gray-500">({new Date(log.recorded_at).toLocaleDateString()})</span>
                      </p>
                      {log.description && (
                        <p className="mt-1 text-xs text-gray-600 truncate">Ghi chú: {log.description}</p>
                      )}
                    </div>
                    {/* Nút Hành động */}
                    <div className="flex items-center flex-shrink-0 space-x-2">
                      {/* Nút Sửa (Gọi hàm mới) */}
                      <button 
                        onClick={() => handleEditClick(log)} 
                        className="p-2 text-blue-600 transition duration-150 bg-white rounded-full shadow-sm hover:bg-blue-200"
                        title="Sửa log"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.232 5.232z"></path></svg>
                      </button>
                      {/* Nút Xóa (Giữ nguyên) */}
                      <button 
                        onClick={() => onDeleteLog(log.log_id)} 
                        className="p-2 text-red-600 transition duration-150 bg-white rounded-full shadow-sm hover:bg-red-200"
                        title="Xóa log"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clipRule="evenodd"></path></svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Modal Footer (List) */}
            <div className="flex justify-end pt-3 mt-4 border-t">
              <button 
                onClick={onClose} 
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* B. Edit View (Vùng hiển thị form chỉnh sửa) */}
          <div className={`${modalWidth} flex-shrink-0 pt-4 pb-2`}>
            {editingLog && (
              <EditLogForm 
                log={editingLog}
                category={category}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
              />
            )}
          </div>

          </div>
        </div>
      </div>
    </div>
  );
};