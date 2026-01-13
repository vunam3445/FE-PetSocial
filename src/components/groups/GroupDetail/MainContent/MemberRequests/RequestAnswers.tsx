import React from "react";
import type { JoinRequest } from "../../../../../types/QuestionAndAnswer"; // Adjust path

interface RequestAnswersProps {
  questions: JoinRequest["questions"];
}

export const RequestAnswers = ({ questions }: RequestAnswersProps) => {
  return (
    <div className="px-4 pb-4 pl-[4.5rem]">
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        {questions.length > 0 ? (
          <ul className="space-y-3">
            {questions.map((ans, idx) => (
              <li key={idx}>
                <p className="mb-1 text-sm font-semibold text-gray-700">
                  Câu hỏi {idx + 1}: {ans.question}
                </p>
                <div className="p-2 text-sm text-gray-600 border border-gray-100 rounded bg-gray-50">
                  {ans.answer || <em className="text-gray-400">Không trả lời</em>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm italic text-gray-500">
            Người dùng này không có câu trả lời nào (hoặc nhóm không đặt câu hỏi).
          </p>
        )}
      </div>
    </div>
  );
};