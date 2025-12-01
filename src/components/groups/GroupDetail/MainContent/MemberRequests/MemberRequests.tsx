import React, { useState } from "react";

// Định nghĩa kiểu dữ liệu (Thông thường bạn nên để trong file types)
interface RequestAnswer {
  question: string;
  answer: string;
}

interface MemberRequest {
  id: string;
  user: {
    id: string;
    name: string;
    avatar_url: string;
    mutual_friends?: number; // Số bạn chung (nếu có)
  };
  request_time: string; // VD: "2 giờ trước"
  answers: RequestAnswer[];
}

// Dữ liệu giả lập (Mock Data) - Sau này bạn sẽ thay bằng data từ API
const MOCK_REQUESTS: MemberRequest[] = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Nguyễn Văn A",
      avatar_url: "https://placehold.co/100x100?text=A",
      mutual_friends: 5,
    },
    request_time: "2 giờ trước",
    answers: [
      {
        question: "Tại sao bạn muốn tham gia nhóm?",
        answer: "Tôi rất yêu thích chó mèo và muốn giao lưu với mọi người.",
      },
      {
        question: "Bạn có cam kết không spam quảng cáo không?",
        answer: "Có, tôi cam kết tuân thủ nội quy.",
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "Trần Thị B",
      avatar_url: "https://placehold.co/100x100?text=B",
    },
    request_time: "5 giờ trước",
    answers: [], // Người này không trả lời hoặc nhóm không có câu hỏi
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Lê Văn C",
      avatar_url: "https://placehold.co/100x100?text=C",
      mutual_friends: 12,
    },
    request_time: "1 ngày trước",
    answers: [
      {
        question: "Tại sao bạn muốn tham gia nhóm?",
        answer: "Mình muốn tìm vợ cho mèo nhà mình :D",
      },
    ],
  },
];

export const MemberRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState<MemberRequest[]>(MOCK_REQUESTS);
  
  // State để lưu id của request đang được mở rộng (xem câu trả lời)
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);

  // Xử lý tìm kiếm
  const filteredRequests = requests.filter((req) =>
    req.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle xem câu trả lời
  const toggleExpand = (id: string) => {
    if (expandedRequestId === id) {
      setExpandedRequestId(null); // Đóng nếu đang mở
    } else {
      setExpandedRequestId(id); // Mở cái mới
    }
  };

  // Xử lý phê duyệt
  const handleApprove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra thẻ cha (toggleExpand)
    // Gọi API approve tại đây...
    alert(`Đã duyệt thành viên có ID: ${id}`);
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  // Xử lý từ chối
  const handleDecline = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Gọi API reject tại đây...
    if (window.confirm("Bạn có chắc chắn muốn từ chối yêu cầu này?")) {
      setRequests((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
      {/* --- HEADER: Tiêu đề & Tìm kiếm --- */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Yêu cầu tham gia <span className="text-blue-600">({requests.length})</span>
          </h2>
          
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên..."
              className="w-full py-2 pl-10 pr-4 text-sm transition-colors border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- BODY: Danh sách Requests --- */}
      <div className="divide-y divide-gray-100">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <i className="mb-3 text-4xl text-gray-300 fas fa-user-slash"></i>
            <p>Không tìm thấy yêu cầu nào.</p>
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div 
              key={req.id} 
              className={`group transition-colors duration-200 ${expandedRequestId === req.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
            >
              {/* Phần thông tin chính (Luôn hiển thị) */}
              <div 
                className="p-4 cursor-pointer"
                onClick={() => toggleExpand(req.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={req.user.avatar_url}
                      alt={req.user.name}
                      className="object-cover w-12 h-12 border border-gray-200 rounded-full"
                    />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {req.user.name}
                      </h3>
                      <div className="flex flex-wrap text-xs text-gray-500 gap-x-2">
                        <span><i className="mr-1 far fa-clock"></i>{req.request_time}</span>
                        {req.user.mutual_friends && (
                          <>
                            <span>•</span>
                            <span>{req.user.mutual_friends} bạn chung</span>
                          </>
                        )}
                      </div>
                      
                      {/* Chỉ dẫn bấm để xem câu trả lời */}
                      {req.answers.length > 0 && (
                        <div className="mt-1 text-xs font-medium text-blue-600">
                          {expandedRequestId === req.id ? (
                            <span><i className="mr-1 fas fa-chevron-up"></i>Ẩn câu trả lời</span>
                          ) : (
                            <span><i className="mr-1 fas fa-chevron-down"></i>Xem câu trả lời ({req.answers.length})</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Buttons Action */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleApprove(req.id, e)}
                      className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
                    >
                      Phê duyệt
                    </button>
                    <button
                      onClick={(e) => handleDecline(req.id, e)}
                      className="px-4 py-2 text-sm font-semibold text-gray-700 transition-colors bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>

              {/* Phần câu trả lời (Accordion) */}
              {expandedRequestId === req.id && (
                <div className="px-4 pb-4 pl-[4.5rem]">
                  <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    {req.answers.length > 0 ? (
                      <ul className="space-y-3">
                        {req.answers.map((ans, idx) => (
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
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};