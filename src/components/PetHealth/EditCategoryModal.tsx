// src/components/modals/EditCategoryModal.tsx
import React, { useState, useEffect } from "react";
import type { HealthCategory } from "../../types/Pet";
// Định nghĩa kiểu dữ liệu cho Category được truyền vào để sửa

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateCategory: (category_id: string, data: any) => void; // Hàm gọi API update
  initialData: HealthCategory | null; // Dữ liệu ban đầu của category cần sửa
}

export const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  onUpdateCategory,
  initialData,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [intervalDays, setIntervalDays] = useState<number | string>("");
  const [unit, setUnit] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Reset form và điền dữ liệu cũ khi mở modal hoặc khi initialData thay đổi
  useEffect(() => {
    if (isOpen && initialData) {
      setCategoryName(initialData.name || "");
      setUnit(initialData.unit || "");
      setIntervalDays(initialData.interval_days || "");
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateUpdateCategory = () => {
    if (!initialData) return;

    const newErrors: { [key: string]: string } = {};

    // Validate tên
    if (!categoryName.trim()) {
      newErrors.name = "Tên danh mục không được để trống.";
    }

    // Validate ngày lặp lại cho loại schedule
    if (initialData.category_type === "schedule") {
      if (!intervalDays) {
        newErrors.interval = "Vui lòng nhập số ngày lặp lại.";
      } else if (Number(intervalDays) <= 0) {
        newErrors.interval = "Số ngày phải lớn hơn 0.";
      }
    }
    if (initialData.category_type === "metric" && !unit.trim()) {
      newErrors.unit = "Vui lòng nhập đơn vị tính (kg, cm, lần...).";
    }
    // Nếu có lỗi thì cập nhật state và dừng lại
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Chuẩn bị payload để gửi đi update
    const data: any = {
      name: categoryName,
    };

    // Chỉ thêm các trường đặc thù tùy theo loại category
    if (initialData.category_type === "metric") {
      data.unit = unit;
    }

    if (initialData.category_type === "schedule") {
      data.interval_days = Number(intervalDays);
    }

    onUpdateCategory(initialData.category_id, data);
    onClose();
  };

  if (!isOpen || !initialData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-2xl font-bold text-gray-900">
            Chỉnh sửa Danh mục
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
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
        <div className="p-6 space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validateUpdateCategory();
            }}
            className="space-y-4"
          >
            {/* 1. Tên danh mục (Luôn hiển thị) */}
            <div>
              <label
                htmlFor="edit-cat-name"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Tên Danh mục
              </label>
              <input
                type="text"
                id="edit-cat-name"
                value={categoryName}
                onChange={(e) => {
                  setCategoryName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                }}
                placeholder="Nhập tên danh mục..."
                className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                  errors.name
                    ? "border-red-500 focus:ring-red-100"
                    : "border-gray-300 focus:ring-amber-500"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs font-medium text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* 2. Ngày lặp lại (Chỉ hiện nếu là schedule) */}
            {initialData.category_type === "schedule" && (
              <div>
                <label
                  htmlFor="edit-interval"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Ngày lặp lại (số ngày)
                </label>
                <input
                  type="number"
                  id="edit-interval"
                  value={intervalDays}
                  onChange={(e) => {
                    setIntervalDays(e.target.value);
                    if (errors.interval)
                      setErrors((prev) => ({ ...prev, interval: "" }));
                  }}
                  placeholder="Ví dụ: 30"
                  className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.interval
                      ? "border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:ring-amber-500"
                  }`}
                />
                {errors.interval && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.interval}
                  </p>
                )}
              </div>
            )}

            {/* 3. Đơn vị (Chỉ hiện nếu là metric) */}
            {initialData.category_type === "metric" && (
              <div>
                <label
                  htmlFor="edit-unit"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Đơn vị tính
                </label>
                <input
                  type="text"
                  id="edit-unit"
                  value={unit}
                  onChange={(e) => {
                    setUnit(e.target.value);
                    // Xóa lỗi ngay khi người dùng bắt đầu nhập
                    if (errors.unit)
                      setErrors((prev) => ({ ...prev, unit: "" }));
                  }}
                  placeholder="Ví dụ: kg, cm..."
                  className={`w-full px-4 py-2.5 border rounded-xl shadow-sm focus:outline-none focus:ring-2 transition-all ${
                    errors.unit
                      ? "border-red-500 focus:ring-red-100"
                      : "border-gray-300 focus:ring-amber-500"
                  }`}
                />
                {errors.unit && (
                  <p className="mt-1 text-xs font-medium text-red-500">
                    {errors.unit}
                  </p>
                )}
              </div>
            )}

            {/* Hiển thị loại (Read-only để user biết đang sửa cái gì) */}
            <div className="pt-2 text-xs text-gray-500">
              Loại danh mục:{" "}
              <span className="font-semibold uppercase">
                {initialData.category_type}
              </span>{" "}
              (Không thể thay đổi)
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t bg-gray-50 rounded-b-2xl">
          <button
            className="w-full px-6 py-3 font-semibold text-white transition duration-300 rounded-lg shadow-md bg-amber-500 hover:bg-amber-600"
            onClick={validateUpdateCategory}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
