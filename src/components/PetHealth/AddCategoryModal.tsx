// src/components/modals/AddCategoryModal.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (data: any) => void;
}

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onCreateCategory,
}) => {
  const [customCategory, setCustomCategory] = useState<string>("metric");
  const [categoryName, setCategoryName] = useState<string>("");
  const [interval_days, setIntervalDays] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Reset form khi modal mở lại
  useEffect(() => {
    if (isOpen) {
      setCategoryName("");
      setCustomCategory("metric");
      setUnit("");
      setIntervalDays(null);
      setErrors({});
    }
  }, [isOpen]);

  const handleCategoryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const type = e.target.value;
    setCustomCategory(type);
    // Reset các trường đặc thù khi đổi loại
    if (type !== "metric") setUnit("");
    if (type !== "schedule") setIntervalDays(null);
  };

  const validateCreateCategory = () => {
    const newErrors: { [key: string]: string } = {};

    if (!categoryName.trim()) {
      newErrors.name = "Tên danh mục không được để trống";
    }

    if (customCategory === "metric" && !unit.trim()) {
      newErrors.unit = "Vui lòng nhập đơn vị đo (ví dụ: kg, cm)";
    }

    if (customCategory === "schedule") {
      if (!interval_days) {
        newErrors.interval = "Vui lòng nhập số ngày nhắc lại";
      } else if (interval_days <= 0) {
        newErrors.interval = "Số ngày phải lớn hơn 0";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const data: any = {
      pet_id: id,
      name: categoryName,
      category_type: customCategory,
    };

    if (customCategory === "metric") data.unit = unit;
    if (customCategory === "schedule") data.interval_days = interval_days;

    onCreateCategory(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b">
          <h3 className="text-xl font-bold text-gray-900">
            Tạo Danh mục Theo dõi
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Tên danh mục */}
          <div className="space-y-1">
            <label
              htmlFor="cat-name"
              className="block text-sm font-semibold text-gray-700"
            >
              Tên Danh mục
            </label>
            <input
              type="text"
              id="cat-name"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: "" })); // Clear lỗi khi đang gõ
              }}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 transition-all ${
                errors.name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-indigo-500"
              }`}
              placeholder="Ví dụ: Cân nặng, Tiêm phòng, Uống thuốc..."
            />
            {errors.name && (
              <p className="ml-1 text-xs font-medium text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* Loại dữ liệu */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Loại Dữ liệu cần theo dõi
            </label>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "metric", label: "Một con số (Vẽ Biểu đồ)", icon: "📊" },
                { id: "event", label: "Sự kiện (Dòng thời gian)", icon: "📅" },
                {
                  id: "schedule",
                  label: "Lịch nhắc lại (Định kỳ)",
                  icon: "🔔",
                },
                { id: "note", label: "Ghi chú nhanh", icon: "📝" },
              ].map((type) => (
                <label
                  key={type.id}
                  className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                    customCategory === type.id
                      ? "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    value={type.id}
                    name="data-type"
                    checked={customCategory === type.id}
                    onChange={handleCategoryTypeChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="flex items-center gap-2 ml-3">
                    <span className="text-lg">{type.icon}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {type.label}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Trường phụ trợ dựa trên loại được chọn */}
          {customCategory === "metric" && (
            <div className="space-y-1 duration-300 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-semibold text-gray-700">
                Đơn vị đo
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => {
                  setUnit(e.target.value);
                  if (errors.unit) setErrors((prev) => ({ ...prev, unit: "" }));
                }}
                placeholder="Ví dụ: kg, cm, lần, ml..."
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.unit
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              {errors.unit && (
                <p className="ml-1 text-xs font-medium text-red-500">
                  {errors.unit}
                </p>
              )}
            </div>
          )}

          {customCategory === "schedule" && (
            <div className="space-y-1 duration-300 animate-in fade-in slide-in-from-top-2">
              <label className="block text-sm font-semibold text-gray-700">
                Chu kỳ nhắc lại (số ngày)
              </label>
              <input
                type="number"
                value={interval_days || ""}
                onChange={(e) => {
                  setIntervalDays(Number(e.target.value));
                  if (errors.interval)
                    setErrors((prev) => ({ ...prev, interval: "" }));
                }}
                placeholder="Ví dụ: 30 (nhắc mỗi tháng)"
                className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 ${
                  errors.interval
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              />
              {errors.interval && (
                <p className="ml-1 text-xs font-medium text-red-500">
                  {errors.interval}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t bg-gray-50">
          <button
            className="w-full px-6 py-3 font-bold text-white transition duration-300 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98]"
            onClick={validateCreateCategory}
          >
            Tạo Danh mục
          </button>
        </div>
      </div>
    </div>
  );
};
