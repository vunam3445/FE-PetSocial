import React, { useState, useEffect } from "react";
import type { GroupJoinQuestion , JoinGroupAnswer, JoinGroupRequest} from "../../types/QuestionAndAnswer";

// Định nghĩa kiểu dữ liệu cho câu hỏi
export interface GroupQuestion {
  id: string;
  question_text: string;
}

// Định nghĩa props cho Modal
interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (answers: JoinGroupRequest) => void;
  groupName: string;
  questions: GroupJoinQuestion[];
  groupId:string;
  isSubmitting?: boolean;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  groupName,
  questions,
  groupId,
  isSubmitting = false,
}) => {
  // State lưu trữ câu trả lời: { [questionId]: "nội dung trả lời" }
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Reset state khi mở modal
  useEffect(() => {
    if (isOpen) {
      setAnswers({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Xử lý khi nhập liệu
  const handleInputChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Xử lý khi bấm Gửi
  const handleSubmit = () => {

  const formattedAnswers = questions.map((q) => ({
    question_id: q.id,
    answer: answers[q.id] || "",
  }));

  const payload: JoinGroupRequest = {
    groupId,
    answers: formattedAnswers,
  };

  onSubmit(payload);
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-full max-h-full p-4 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 md:inset-0">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-xl animate-fade-in">
          
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200 rounded-t">
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Trả lời câu hỏi tham gia
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Nhóm <strong>{groupName}</strong> yêu cầu bạn trả lời các câu hỏi sau để xét duyệt.
              </p>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900"
            >
              <i className="text-lg fas fa-times"></i>
            </button>
          </div>

          {/* Body: Danh sách câu hỏi */}
          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {questions.length > 0 ? (
              questions.map((q, index) => (
                <div key={q.id} className="space-y-2">
                  <label
                    htmlFor={`question-${q.id}`}
                    className="block text-base font-semibold text-gray-800"
                  >
                    Câu hỏi {index + 1}: <span className="font-normal">{q.question}</span>
                  </label>
                  <textarea
                    id={`question-${q.id}`}
                    rows={3}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    placeholder="Nhập câu trả lời của bạn..."
                    value={answers[q.id] || ""}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  ></textarea>
                </div>
              ))
            ) : (
              <p className="italic text-center text-gray-500">
                Nhóm này chưa thiết lập câu hỏi, bạn có thể gửi yêu cầu ngay.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b bg-gray-50">
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2.5 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:text-gray-900"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              type="button"
              className={`px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <i className="mr-2 fas fa-spinner fa-spin"></i> Đang gửi...
                </>
              ) : (
                "Gửi yêu cầu"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};