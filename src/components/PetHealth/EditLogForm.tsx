// src/components/modals/EditLogForm.tsx
import React, { useState } from 'react';
import type { HealthCategory, HealthLog } from '../../types/Pet';

interface EditLogFormProps {
  log: HealthLog;
  category: HealthCategory;
  onSave: (updatedLog: HealthLog) => void;
  onCancel: () => void;
}

const EditLogForm: React.FC<EditLogFormProps> = ({ log, category, onSave, onCancel }) => {
  const [formData, setFormData] = useState<HealthLog>(log);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const isMetric = ['metric', 'note'].includes(category.category_type);
  
  // Thiết kế pastel và bo tròn
  const inputClass = "w-full p-3 border border-gray-200 rounded-xl focus:border-blue-300 focus:ring focus:ring-blue-100/50 transition duration-150 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const buttonBase = "px-6 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-md";

  // Logic hiển thị trường form dựa trên category.type
  let formFields;
  
  if (category.category_type === 'metric') {
    formFields = (
      <>
        <div className="mb-4">
          <label htmlFor="recorded_at" className={labelClass}>Ngày ghi nhận</label>
          <input 
            type="date" 
            id="recorded_at" 
            name="recorded_at" 
            value={new Date(formData.recorded_at).toISOString().substring(0, 10)} 
            onChange={handleChange} 
            className={inputClass} 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="value" className={labelClass}>Giá trị ({category.unit || ''})</label>
          <input 
            type="number" 
            id="value" 
            name="value" 
            value={formData.value} 
            onChange={handleChange} 
            className={inputClass} 
            step="any"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className={labelClass}>Mô tả / Ghi chú</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description || ''} 
            onChange={handleChange} 
            rows={3} 
            className={`${inputClass} resize-none`}
            placeholder="Chi tiết về log này..."
          ></textarea>
        </div>
      </>
    );
  } else if (category.category_type === 'note') {
    formFields = (
      <>
        <div className="mb-4">
          <label htmlFor="recorded_at" className={labelClass}>Ngày ghi nhận</label>
          <input 
            type="date" 
            id="recorded_at" 
            name="recorded_at" 
            value={new Date(formData.recorded_at).toISOString().substring(0, 10)} 
            onChange={handleChange} 
            className={inputClass} 
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className={labelClass}>Ghi chú chi tiết</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description || ''} 
            onChange={handleChange} 
            rows={5} 
            className={`${inputClass} resize-none`}
            placeholder="Nội dung ghi chú..."
          ></textarea>
        </div>
      </>
    );
  } else {
    // Kiểu schedule/timeline hoặc kiểu khác
     formFields = (
      <>
        <div className="mb-4">
          <label htmlFor="recorded_at" className={labelClass}>Ngày / Thời gian</label>
          <input 
            type="datetime-local" 
            id="recorded_at" 
            name="recorded_at" 
            value={new Date(formData.recorded_at).toISOString().substring(0, 16)} 
            onChange={handleChange} 
            className={inputClass} 
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className={labelClass}>Tiêu đề (sự kiện)</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title || ''} 
            onChange={handleChange} 
            className={inputClass} 
            placeholder="Ví dụ: Lịch tiêm phòng"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="description" className={labelClass}>Mô tả / Chi tiết</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description || ''} 
            onChange={handleChange} 
            rows={3} 
            className={`${inputClass} resize-none`}
            placeholder="Chi tiết sự kiện..."
          ></textarea>
        </div>
      </>
    );
  }
  

  return (
    <div className="p-6 bg-white rounded-xl"> {/* Background nhẹ nhàng */}
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        {formFields}
        
        {/* Nút hành động */}
        <div className="flex justify-end pt-2 space-x-3">
          <button 
            type="button" 
            onClick={onCancel}
            className={`${buttonBase} text-gray-700 bg-gray-200 hover:bg-gray-300`}
          >
            Hủy
          </button>
          <button 
            type="submit" 
            className={`${buttonBase} text-white bg-blue-500 hover:bg-blue-600`}
          >
            Lưu Thay Đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditLogForm;