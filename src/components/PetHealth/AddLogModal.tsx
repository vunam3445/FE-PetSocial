// src/components/modals/AddLogModal.tsx
import React, { useState } from "react";

// [NEW TYPE] Kiểu dữ liệu cho log gửi đi, dùng để truyền qua onSaveLog
export interface LogFormData {
  // pet_id và category_id sẽ được thêm ở component cha
  title: string;
  description: string | null;
  value: string | null; // Lưu ý: DB schema là string (2.5kg), nên giữ là string
  recorded_at: string; // YYYY-MM-DD
  // image_url: File | null; // Để đơn giản, ta tạm bỏ qua logic upload file
}

interface AddLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  categoryType?: "metric" | "note" | "event" | "schedule";
  // [NEW PROP] Hàm xử lý gửi dữ liệu log ra component cha
  onSaveLog: (data: LogFormData) => void; 
  isSaving: boolean; // [NEW PROP] Trạng thái đang lưu (từ hook useMutation)
}

export const AddLogModal: React.FC<AddLogModalProps> = ({
  isOpen,
  onClose,
  categoryName,
  categoryType,
  onSaveLog, // Destructuring prop mới
  isSaving, // Destructuring prop mới
}) => {
  if (!isOpen) return null;
  const today = new Date().toISOString().split("T")[0];
  // [UPDATED STATE]
  const [recordedAt, setRecordedAt] = useState(today); // Map với recorded_at
  const [value, setValue] = useState(""); // Map với value
  const [title, setTitle] = useState(""); // Map với title
  const [description, setDescription] = useState(""); // Map với description

  // [NEW FUNCTION] Xử lý logic gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Gán giá trị mặc định cho title/description/value nếu trường đó không có
    let finalTitle = title;
    let finalDescription = description;
    let finalValue = value;

    // 2. Tinh chỉnh dữ liệu dựa trên Type
    switch (categoryType) {
        case "metric":
            // Metric: title (tên category), value (giá trị), description (ghi chú)
            finalTitle = categoryName; 
            finalDescription = description;
            finalValue = value; 
            break;
        case "event":
        case "schedule":
            // Event/Schedule: title (tên sự kiện/lịch hẹn), description (ghi chú), value (null)
            finalTitle = title; 
            finalDescription = description;
            finalValue = null;
            break;
        case "note":
            // Note: title (tên category), description (nội dung), value (null)
            finalTitle = categoryName; 
            finalDescription = description;
            finalValue = null;
            break;
        default:
            // Xử lý trường hợp mặc định
            finalTitle = title || categoryName;
            finalDescription = description;
            finalValue = value;
            break;
    }
    
    // 3. Chuẩn bị dữ liệu cuối cùng để gửi đi
    const logData: LogFormData = {
        title: finalTitle,
        description: finalDescription || null,
        value: finalValue || null,
        recorded_at: recordedAt,
    };

    onSaveLog(logData);
    onClose(); // Đóng modal ngay sau khi gọi onSaveLog (hoặc trong onSuccess của component cha)
  };

  /**
   * Render các trường form dựa trên categoryType
   */
  const renderFormFields = () => {
    // Để đơn giản hóa, tôi chỉ tập trung vào việc hiển thị các trường cần thiết
    // và liên kết với state: title, description, value.
    switch (categoryType) {
      case "metric":
        return (
          <>
            <div>
              <label htmlFor="log-value" className="block mb-1 text-sm font-medium text-gray-700">
                Giá trị (số/chuỗi)
              </label>
              <input
                type="text" // Đổi sang text vì DB lưu string (VD: "7.9kg")
                id="log-value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ví dụ: 7.9 kg hoặc 38.5 °C"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="log-notes" className="block mb-1 text-sm font-medium text-gray-700">
                Ghi chú (Tùy chọn)
              </label>
              <textarea
                id="log-notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Cân vào buổi sáng..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </>
        );
      case "event":
      case "schedule":
        return (
          <>
            <div>
              <label htmlFor="log-title" className="block mb-1 text-sm font-medium text-gray-700">
                Tiêu đề Sự kiện/Lịch hẹn
              </label>
              <input
                type="text"
                id="log-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: Vaccine Dại (Event) hoặc Tái khám định kỳ (Schedule)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="log-notes" className="block mb-1 text-sm font-medium text-gray-700">
                Ghi chú / Chi tiết
              </label>
              <textarea
                id="log-notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Ví dụ: Mũi tiêm nhắc lại, mang theo sổ khám bệnh..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </>
        );
      case "note":
        return (
          <>
            {/* Note chỉ cần description (nội dung ghi chú) */}
            <div>
              <label htmlFor="log-notes" className="block mb-1 text-sm font-medium text-gray-700">
                Nội dung ghi chú
              </label>
              <textarea
                id="log-notes"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Nhập nội dung ghi chú của bạn..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
          </>
        );
      default:
        // Trường hợp mặc định
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl">
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-2xl font-bold text-gray-900">
            Thêm Log cho: **{categoryName}**
          </h3>
          {/* ... (Nút đóng) ... */}
        </div>
        
        {/* Modal Body (Form) */}
        <form className="p-6 space-y-4" onSubmit={handleSubmit}> 
          {/* Trường nhập ngày chung cho tất cả các loại */}
          <div>
            <label htmlFor="log-date" className="block mb-1 text-sm font-medium text-gray-700">Ngày</label>
            <input
              type="date"
              id="log-date"
              defaultValue={today}
              onChange={(e) => setRecordedAt(e.target.value)} // Bind state
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          {/* Render các trường riêng biệt dựa trên type */}
          {renderFormFields()}
          
          {/* ... (Trường đính kèm ảnh chung - nếu cần) ... */}

          {/* Modal Footer (Đặt trong form để nút submit hoạt động) */}
          <div className="flex gap-3 px-6 pt-4 -mx-6 -mb-6 border-t bg-gray-50 rounded-b-2xl">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="w-1/2 px-6 py-3 font-semibold text-gray-700 transition duration-300 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              Hủy
            </button>
            
            <button
              type="submit"
              disabled={isSaving} // Vô hiệu hóa khi đang lưu
              className="w-1/2 px-6 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 disabled:bg-indigo-400"
            >
              {isSaving ? "Đang Lưu..." : "Lưu Log"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};