import React, { useState, useRef } from "react";
import type { HealthCategory, HealthLog } from "../../types/Pet";

interface EditLogFormProps {
  log: HealthLog;
  category: HealthCategory;
  onSave: (updatedLog: HealthLog, selectedFile?: File) => void;
  onCancel: () => void;
}

const EditLogForm: React.FC<EditLogFormProps> = ({
  log,
  category,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<HealthLog>(log);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Ref để điều khiển input file ẩn
  const fileInputRef = useRef<HTMLInputElement>(null);
  // 1. Lấy thời điểm hiện tại làm giới hạn TỐI ĐA (Max)
  const now = new Date();

  // Xử lý lệch múi giờ để lấy đúng ngày giờ địa phương cho input HTML
  const tzOffset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - tzOffset).toISOString();

  const maxDate = localISOTime.substring(0, 10); // YYYY-MM-DD
  const maxDateTime = localISOTime.substring(0, 16); // YYYY-MM-DDTHH:mm
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Xử lý khi người dùng chọn file từ máy tính
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Lưu file thật để gửi đi
      const previewUrl = URL.createObjectURL(file); // Chỉ dùng để hiện preview
      setFormData((prev) => ({ ...prev, image_url: previewUrl }));
    }
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const selectedDate = new Date(formData.recorded_at);

    // 1. Kiểm tra thời gian
    if (selectedDate > now) {
      newErrors.recorded_at = "Thời gian không được vượt quá hiện tại";
    }

    // 2. Kiểm tra Metric (giá trị số)
    if (category.category_type === "metric") {
      if (
        formData.value === undefined ||
        formData.value === null ||
        formData.value === ""
      ) {
        newErrors.value = "Vui lòng nhập giá trị đo lường";
      } else if (isNaN(Number(formData.value))) {
        newErrors.value = "Giá trị phải là một con số";
      }
    }

    // 3. Kiểm tra Tiêu đề (cho event/schedule)
    if (
      category.category_type !== "metric" &&
      category.category_type !== "note"
    ) {
      if (!formData.title?.trim()) {
        newErrors.title = "Tiêu đề không được để trống";
      }
    }

    // 4. Kiểm tra Mô tả (cho loại note)
    if (category.category_type === "note") {
      if (!formData.description?.trim()) {
        newErrors.description = "Nội dung ghi chú không được để trống";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSave = () => {
    if (validate()) {
      onSave(formData, selectedFile);
    }
  };

  const inputClass =
    "w-full p-3 border border-gray-200 rounded-xl focus:border-blue-300 focus:ring focus:ring-blue-100/50 transition duration-150 bg-white";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const buttonBase =
    "px-6 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-md";
  const errorTextClass = "text-xs text-red-500 mt-1 font-medium";
  const ImageUploadSection = (
    <div className="flex flex-col items-center justify-center mb-6">
      <label className={labelClass}>Hình ảnh minh họa</label>

      {/* Input file bị ẩn */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="relative w-32 h-32 mt-2">
        {/* Khung hình vuông bo góc */}
        <div
          className="flex items-center justify-center w-full h-full overflow-hidden transition-colors border-2 border-gray-300 border-dashed cursor-pointer rounded-2xl bg-gray-50 hover:bg-gray-100"
          onClick={triggerFileInput}
        >
          {formData.image_url ? (
            <img
              src={formData.image_url}
              alt="Log"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="p-2 text-xs text-center text-gray-400">
              Nhấn để chọn ảnh
            </div>
          )}
        </div>

        {/* Nút hình cái bút */}
        <button
          type="button"
          onClick={triggerFileInput}
          className="absolute z-10 p-2 text-white transition-transform bg-blue-500 border-2 border-white rounded-full shadow-lg -bottom-2 -right-2 hover:bg-blue-600 active:scale-90"
          title="Sửa hình ảnh"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.232 5.232z"
            />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        {category.category_type === "event" && ImageUploadSection}

        <div className="mb-4">
          <label htmlFor="recorded_at" className={labelClass}>
            {category.category_type === "metric" ||
            category.category_type === "note"
              ? "Ngày ghi nhận"
              : "Ngày & Giờ sự kiện"}
          </label>
          <input
            type={
              category.category_type === "metric" ||
              category.category_type === "note"
                ? "date"
                : "datetime-local"
            }
            max={
              category.category_type === "metric" ||
              category.category_type === "note"
                ? maxDate
                : maxDateTime
            }
            id="recorded_at"
            name="recorded_at"
            value={
              category.category_type === "metric" ||
              category.category_type === "note"
                ? new Date(formData.recorded_at).toISOString().substring(0, 10)
                : new Date(formData.recorded_at).toISOString().substring(0, 16)
            }
            onChange={handleChange}
            className={inputClass}
          />
          {errors.recorded_at && (
            <p className={errorTextClass}>{errors.recorded_at}</p>
          )}
        </div>

        {category.category_type === "metric" && (
          <div className="mb-4">
            <label htmlFor="value" className={labelClass}>
              Giá trị ({category.unit || ""})
            </label>
            <input
              type="number"
              id="value"
              name="value"
              value={formData.value || ""}
              onChange={handleChange}
              className={inputClass}
              step="any"
            />
            {errors.value && <p className={errorTextClass}>{errors.value}</p>}
          </div>
        )}

        {category.category_type !== "metric" &&
          category.category_type !== "note" && (
            <div className="mb-4">
              <label htmlFor="title" className={labelClass}>
                Tiêu đề sự kiện
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.title && <p className={errorTextClass}>{errors.title}</p>}
            </div>
          )}

        <div className="mb-6">
          <label htmlFor="description" className={labelClass}>
            Mô tả chi tiết
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={3}
            className={`${inputClass} resize-none`}
          />
          {errors.description && (
            <p className={errorTextClass}>{errors.description}</p>
          )}
        </div>

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
