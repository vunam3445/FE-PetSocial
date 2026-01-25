import React, { useState, useEffect } from 'react';

// Danh sách các lý do báo cáo
const REPORT_REASONS = [
  { id: 'spam', label: 'Spam hoặc lừa đảo' },
  { id: 'harassment', label: 'Quấy rối hoặc bắt nạt' },
  { id: 'hate_speech', label: 'Ngôn từ gây thù ghét' },
  { id: 'violence', label: 'Bạo lực hoặc nguy hiểm' },
  { id: 'nudity', label: 'Ảnh khỏa thân hoặc tình dục' },
  { id: 'other', label: 'Vấn đề khác' },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Thay thế postId bằng cấu trúc đa hình
  targetId: string | number; 
  targetType: 'post' | 'user' | 'group' | 'comment'; 
  onSubmit: (data: {
    reportable_id: string | number;
    reportable_type: string;
    reason: string;
    description: string;
  }) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({ 
  isOpen, 
  onClose, 
  targetId, 
  targetType, 
  onSubmit 
}) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy tiêu đề động dựa trên loại đối tượng
  const getTitle = () => {
    switch (targetType) {
      case 'user': return 'Báo cáo người dùng';
      case 'group': return 'Báo cáo nhóm';
      case 'comment': return 'Báo cáo bình luận';
      default: return 'Báo cáo bài viết';
    }
  };

  // Reset state khi đóng/mở modal
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
    
    if (selectedReason === 'other' && !description.trim()) {
      alert("Vui lòng nhập chi tiết vấn đề.");
      return;
    }

    setIsSubmitting(true);

    // Gửi dữ liệu theo cấu trúc đa hình cho Backend
    onSubmit({
      reportable_id: targetId,
      reportable_type: targetType, // Backend sẽ map giá trị này sang Model Class tương ứng
      reason: selectedReason,
      description: description
    });

    // Các logic sau khi submit thành công thường được xử lý ở component cha 
    // nhưng ở đây ta đóng modal để tối ưu UX
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-900">{getTitle()}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 transition-all rounded-full hover:bg-gray-100 hover:text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-sm font-medium text-gray-500">
            Tại sao bạn muốn báo cáo nội dung này?
          </p>

          <div className="space-y-2">
            {REPORT_REASONS.map((reason) => (
              <label 
                key={reason.id} 
                className={`group flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedReason === reason.id 
                    ? 'border-red-500 bg-red-50/50' 
                    : 'border-gray-50 hover:border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="report_reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => {
                    setSelectedReason(e.target.value);
                    if (e.target.value !== 'other') setDescription('');
                  }}
                  className="w-5 h-5 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className={`ml-3 text-base font-semibold ${
                  selectedReason === reason.id ? 'text-red-700' : 'text-gray-700'
                }`}>
                  {reason.label}
                </span>
              </label>
            ))}
          </div>

          {/* Textarea khi chọn lý do khác hoặc bổ sung chi tiết */}
          {(selectedReason === 'other' || selectedReason !== '') && (
            <div className="mt-4 space-y-2">
              <label className="ml-1 text-sm font-bold text-gray-700">
                {selectedReason === 'other' ? 'Mô tả chi tiết *' : 'Ghi chú thêm (không bắt buộc)'}
              </label>
              <textarea
                className="w-full p-4 text-sm bg-gray-50 border-2 border-gray-100 rounded-xl outline-none resize-none focus:border-red-500 focus:bg-white transition-all min-h-[100px]"
                placeholder="Vui lòng cung cấp thêm thông tin để chúng tôi xử lý nhanh hơn..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-bold text-gray-600 transition-all bg-white border border-gray-200 rounded-xl hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === 'other' && !description.trim()) || isSubmitting}
            className={`flex-[2] px-4 py-3 text-sm font-bold text-white rounded-xl shadow-lg shadow-red-200 transition-all ${
              !selectedReason || (selectedReason === 'other' && !description.trim()) || isSubmitting
                ? 'bg-red-300 cursor-not-allowed shadow-none'
                : 'bg-red-600 hover:bg-red-700 active:scale-95'
            }`}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Gửi yêu cầu'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;