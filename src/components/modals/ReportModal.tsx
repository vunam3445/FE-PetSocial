import React, { useState, useEffect } from 'react';
import type { ReportData } from '../../types/Report';
// Định nghĩa các lý do report
const REPORT_REASONS = [
  { id: 'spam', label: 'Spam hoặc lừa đảo' },
  { id: 'harassment', label: 'Quấy rối hoặc bắt nạt' },
  { id: 'hate_speech', label: 'Ngôn từ gây thù ghét' },
  { id: 'violence', label: 'Bạo lực hoặc nguy hiểm' },
  { id: 'nudity', label: 'Ảnh khỏa thân hoặc tình dục' },
  { id: 'other', label: 'Vấn đề khác' }, // ID này sẽ kích hoạt ô nhập text
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId?: string | number;
  onSubmit: (data: ReportData) => void;
}



const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, postId, onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset state khi mở modal
  useEffect(() => {
    if (isOpen) {
      setSelectedReason('');
      setDescription('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedReason) return;
    
    // Nếu chọn 'other' mà chưa nhập lý do thì có thể chặn lại (tùy logic của bạn)
    if (selectedReason === 'other' && !description.trim()) {
      alert("Vui lòng nhập chi tiết vấn đề.");
      return;
    }

    setIsSubmitting(true);
    const data = {reason: selectedReason,description:description}
    onSubmit(data);
      onClose();
      setIsSubmitting(false);
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="text-lg font-bold text-gray-800">Báo cáo bài viết</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body - Có thể cuộn nếu nội dung dài */}
        <div className="p-6 overflow-y-auto">
          <p className="mb-4 text-sm font-medium text-gray-600">
            Hãy chọn vấn đề bạn đang gặp phải:
          </p>

          <div className="space-y-3">
            {REPORT_REASONS.map((reason) => (
              <label 
                key={reason.id} 
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedReason === reason.id 
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="report_reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => {
                    setSelectedReason(e.target.value);
                    // Reset description nếu chuyển sang lý do khác 'other' (tuỳ chọn)
                    if (e.target.value !== 'other') setDescription('');
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">{reason.label}</span>
              </label>
            ))}
          </div>

          {/* Chỉ hiển thị textarea khi chọn 'other' */}
          {selectedReason === 'other' && (
            <div className="mt-4 animate-fade-in-down">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Mô tả chi tiết <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full p-3 text-sm transition-all border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                placeholder="Vui lòng cho chúng tôi biết cụ thể vấn đề là gì..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoFocus
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            // Disable nếu chưa chọn lý do HOẶC (chọn 'other' mà chưa nhập description)
            disabled={!selectedReason || (selectedReason === 'other' && !description.trim()) || isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg focus:outline-none transition-colors ${
              !selectedReason || (selectedReason === 'other' && !description.trim()) || isSubmitting
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi báo cáo'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;