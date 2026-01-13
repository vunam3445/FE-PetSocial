import { useState, useRef, useEffect } from "react";
import useDeleteMemberOfConversation from "../../hooks/chat/useDeleteMemberOfConversation";
import ConfirmDelete from "../modals/ComfirmDeleteModal";
import { useChat } from "../../contexts/ChatContext";
interface ConversationHeaderProps {
  conversationId: string;
  title: string;
  avatarUrl?: string;
  onClose?: () => void;
  is_group: boolean;
  created_by: string;
  onOpenModal: () => void;
  onAddMember: () => void;
  onEditConversation:()=>void;
}

export const ConversationHeader = ({
  conversationId,
  title,
  avatarUrl,
  onClose,
  is_group,
  onOpenModal,
  created_by,
  onAddMember,
  onEditConversation
}: ConversationHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Thêm state để quản lý Modal rời nhóm
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("user_id");
  // Sử dụng hook delete member
  const { deleteMember, isLoading } = useDeleteMemberOfConversation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hàm xử lý khi nhấn "Có" trong Modal
  const handleConfirmLeave = async () => {
    if (!userId || !conversationId) return;

    const result = await deleteMember(conversationId, userId);

    if (result.success) {
      setIsLeaveModalOpen(false);
      if (onClose) onClose(); // Đóng cửa sổ chat sau khi rời nhóm thành công
    } else {
      alert(result.error || "Có lỗi xảy ra khi rời nhóm");
    }
  };

  
  const handleOptionClick = (option: string) => {
    if (option === "GroupMember") {
      onOpenModal();
    } else if (option === "AddMember") {
      onAddMember();
    } else if (option === "Leave") {
      setIsLeaveModalOpen(true);
    } else if (option === "EditConversation") {
      onEditConversation();
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative z-10 flex items-center justify-between px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
      <div className="flex items-center space-x-3">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={title}
            className="object-cover w-8 h-8 border-2 border-white rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <span className="text-sm font-medium">👤</span>
          </div>
        )}
        <h3 className="font-semibold">{title}</h3>
      </div>

      <div className="flex items-center space-x-2">
        {is_group && (
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-1 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/10"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              )}
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-20 w-48 py-1 mt-2 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
                <button
                  onClick={() => handleOptionClick("GroupMember")}
                  className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Xem thành viên
                </button>
                
                {userId === created_by && (
                  <>
                  <button
                    onClick={() => handleOptionClick("AddMember")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Thêm thành viên
                  </button>
                                    <button
                    onClick={() => handleOptionClick("EditConversation")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Chỉnh sửa thông tin nhóm
                  </button>
                  </>
                )}

                <button
                  onClick={() => handleOptionClick("Leave")}
                  className="block w-full px-4 py-2 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                >
                  Rời nhóm
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="p-1 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/10"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Modal xác nhận rời nhóm */}
      <ConfirmDelete
        open={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleConfirmLeave}
        text="Bạn có chắc chắn muốn rời khỏi nhóm trò chuyện này không?"
      />
    </div>
  );
};