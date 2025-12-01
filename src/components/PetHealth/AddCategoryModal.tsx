// src/components/modals/AddCategoryModal.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCategory: (data: any) => void;
}

type ModalTab = "suggest" | "custom";

export const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  isOpen,
  onClose,
  onCreateCategory,
}) => {
  const [activeTab, setActiveTab] = useState<ModalTab>("suggest");
  const [customCategory, setCustomCategory] = useState<string>("metric");
  const [categoryName, setCategoryName] = useState<string>("");
  const [interval_days, setIntervalDays] = useState<number | null>(null);
  const [unit, setUnit] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const handleCategoryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomCategory(e.target.value);
  };

  const validateCreateCategory = () => {
    if (!categoryName.trim()) {
      alert("Vui lòng nhập tên danh mục.");
      return;
    }
    if (customCategory === "schedule" && !interval_days) {
      alert("Vui lòng nhập số ngày cho lịch.");
      return;
    }
    const data: any = {
      pet_id: id,
      name: categoryName,
      category_type: customCategory,
      interval_days,
      unit:unit,
    };
     onCreateCategory(data);
  };

  if (!isOpen) return null;

  const getTabClasses = (tabName: ModalTab): string => {
    return `py-2 px-1 text-lg font-semibold border-b-2 ${
      activeTab === tabName
        ? "tab-btn-active" // 'border-indigo-600 text-indigo-600'
        : "tab-btn-inactive" // 'border-transparent text-gray-500 hover:text-gray-700'
    }`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b">
          <h3 className="text-2xl font-bold text-gray-900">
            Thêm Mục Theo dõi Mới
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

        {/* Tab Buttons */}
        <nav className="flex gap-4 p-5 border-b">
          <button
            className={getTabClasses("suggest")}
            onClick={() => setActiveTab("suggest")}
          >
            Theo Đề xuất
          </button>
          <button
            className={getTabClasses("custom")}
            onClick={() => setActiveTab("custom")}
          >
            Tạo Tùy chỉnh
          </button>
        </nav>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Tab 1: Đề xuất */}
          {activeTab === "suggest" && (
            <div className="space-y-3">
              <p className="text-gray-600">
                Chọn từ các mục được đề xuất cho loài Chó:
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 font-semibold text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100">
                  [+ Tẩy giun]
                </button>
                <button className="px-4 py-2 font-semibold text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100">
                  [+ Răng miệng]
                </button>
                <button className="px-4 py-2 font-semibold text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100">
                  [+ Hoạt động]
                </button>
                <button className="px-4 py-2 font-semibold text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100">
                  [+ Lịch tắm]
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Tùy chỉnh */}
          {activeTab === "custom" && (
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="cat-name"
                  className="block mb-1 text-sm font-medium text-gray-700"
                >
                  Tên Danh mục
                </label>
                <input
                  type="text"
                  id="cat-name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Ví dụ: Phản ứng Dị ứng, Năng lượng..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {customCategory === "schedule" && (
                  <div>
                    <label
                      htmlFor="cat-name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Ngày lặp lại (số ngày)
                    </label>
                    <input
                      type="number"
                      value={interval_days || ""}
                      onChange={(e) => setIntervalDays(Number(e.target.value))}
                      placeholder="Ví dụ: 30 ngày, 60 ngày..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
                {customCategory === "metric" && (
                  <div>
                    <label
                      htmlFor="cat-name"
                      className="block mb-1 text-sm font-medium text-gray-700"
                    >
                      Đơn vị
                    </label>
                    <input
                      type="text"
                      value={unit || ""}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="Ví dụ: kg, cm, lần..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Loại Dữ liệu cần theo dõi
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                    <input
                      type="radio"
                      value="metric"
                      name="data-type"
                      checked={customCategory === "metric"}
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={handleCategoryTypeChange}
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      Một con số (Vẽ Biểu đồ)
                    </span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                    <input
                      type="radio"
                      value="event"
                      name="data-type"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={handleCategoryTypeChange}
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      Sự kiện (Tạo Dòng thời gian)
                    </span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                    <input
                      type="radio"
                      value="schedule"
                      name="data-type"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={handleCategoryTypeChange}
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      Lịch nhắc lại
                    </span>
                  </label>
                  <label className="flex items-center p-3 border rounded-lg has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400">
                    <input
                      type="radio"
                      value="note"
                      name="data-type"
                      className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      onChange={handleCategoryTypeChange}
                    />
                    <span className="ml-3 text-sm font-medium text-gray-800">
                      Ghi chú
                    </span>
                  </label>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t bg-gray-50 rounded-b-2xl">
          <button
            className="w-full px-6 py-3 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700"
            onClick={validateCreateCategory}
          >
            Tạo Danh mục
          </button>
        </div>
      </div>
    </div>
  );
};
