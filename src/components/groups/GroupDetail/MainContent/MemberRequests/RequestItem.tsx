import React from "react";
import { RequestAnswers } from "./RequestAnswers";
import type { JoinRequest } from "../../../../../types/QuestionAndAnswer"; // Adjust path

interface RequestItemProps {
  request: JoinRequest;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onApprove: (r: JoinRequest) => void;
  onDecline: (r: JoinRequest) => void;
}

export const RequestItem = ({ 
  request, 
  isExpanded, 
  onToggleExpand, 
  onApprove, 
  onDecline 
}: RequestItemProps) => {
  
  const handleApproveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApprove(request);
  };

  const handleDeclineClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDecline(request);
  };

  return (
    <div className={`group transition-colors duration-200 ${isExpanded ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}>
      {/* Phần thông tin chính */}
      <div className="p-4 cursor-pointer" onClick={() => onToggleExpand(request.id)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={request.avatar_url}
              alt={request.name}
              className="object-cover w-12 h-12 border border-gray-200 rounded-full"
            />
            <div>
              <h3 className="text-base font-semibold text-gray-900">{request.name}</h3>
              <div className="flex flex-wrap text-xs text-gray-500 gap-x-2">
                 {/* Các thông tin phụ như thời gian, bạn chung để ở đây */}
              </div>

              {/* Chỉ dẫn bấm để xem câu trả lời */}
              {request.questions.length > 0 && (
                <div className="mt-1 text-xs font-medium text-blue-600">
                  {isExpanded ? (
                    <span><i className="mr-1 fas fa-chevron-up"></i>Ẩn câu trả lời</span>
                  ) : (
                    <span><i className="mr-1 fas fa-chevron-down"></i>Xem câu trả lời ({request.questions.length})</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Buttons Action */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleApproveClick}
              className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
            >
              Phê duyệt
            </button>
            <button
              onClick={handleDeclineClick}
              className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Từ chối
            </button>
          </div>
        </div>
      </div>

      {/* Phần câu trả lời (Accordion) */}
      {isExpanded && <RequestAnswers questions={request.questions} />}
    </div>
  );
};