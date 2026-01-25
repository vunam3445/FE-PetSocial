import { useState, useRef, useEffect } from "react";
import useDeleteMemberOfConversation from "../../hooks/chat/useDeleteMemberOfConversation";
import { useDeleteConv } from "../../hooks/chat/useDeleteConv"; // Import hook xóa hội thoại
import ConfirmDelete from "../modals/ComfirmDeleteModal";
import ErrorToast from "../toasts/ErrorToast";

interface ConversationHeaderProps {
  conversationId: string;
  title: string;
  avatarUrl?: string;
  onClose?: () => void;
  is_group: boolean;
  my_role: string;
  onOpenModal: () => void;
  onAddMember: () => void;
  onEditConversation: () => void;
}

export const ConversationHeader = ({
  conversationId,
  title,
  avatarUrl,
  onClose,
  is_group,
  onOpenModal,
  my_role,
  onAddMember,
  onEditConversation,
}: ConversationHeaderProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // States cho Modals
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State cho modal xóa
  const [errorToast, setOpenErrorToast] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userId = localStorage.getItem("user_id");

  // Hooks
  const { deleteMember, isLoading: isLeaving } =
    useDeleteMemberOfConversation();
  const { deleteConv, isLoading: isDeleting } = useDeleteConv(); // Sử dụng hook xóa

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý Rời nhóm
  const handleConfirmLeave = async () => {
    if (!userId || !conversationId) return;
    const result = await deleteMember(conversationId, userId);
    if (result.success) {
      setIsLeaveModalOpen(false);
      if (onClose) onClose();
    } else {
      setIsLeaveModalOpen(false);
      setOpenErrorToast(true);
    }
  };

  // Xử lý Xóa nhóm (Chỉ Admin)
  const handleConfirmDelete = async () => {
    const result = await deleteConv(conversationId);
    if (result.success) {
      setIsDeleteModalOpen(false);
      if (onClose) onClose(); // Đóng cửa sổ sau khi xóa thành công
    } else {
      setIsDeleteModalOpen(false);
      setLocalError(result.error || "Không thể xóa cuộc trò chuyện.");
      setOpenErrorToast(true);
    }
  };

  const handleOptionClick = (option: string) => {
    if (option === "GroupMember") onOpenModal();
    else if (option === "AddMember") onAddMember();
    else if (option === "Leave") setIsLeaveModalOpen(true);
    else if (option === "EditConversation") onEditConversation();
    else if (option === "DeleteConversation") setIsDeleteModalOpen(true); // Mở modal xóa

    setIsDropdownOpen(false);
  };

  const isSystemBusy = isLeaving || isDeleting;

  return (
    <div className="relative flex items-center justify-between px-4 py-3 text-white z-100 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-xl">
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
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-1 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/10"
            disabled={isSystemBusy}
          >
            {isSystemBusy ? (
              <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-20 w-48 py-1 mt-2 overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
              {/* Nếu là GROUP CHAT */}
              {is_group ? (
                <>
                  <button
                    onClick={() => handleOptionClick("GroupMember")}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    Xem thành viên
                  </button>

                  {my_role === "admin" && (
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
                      <button
                        onClick={() => handleOptionClick("DeleteConversation")}
                        className="block w-full px-4 py-2 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                      >
                        Xóa nhóm
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleOptionClick("Leave")}
                    className="block w-full px-4 py-2 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                  >
                    Rời nhóm
                  </button>
                </>
              ) : (
                /* Nếu là PRIVATE CHAT */
                <button
                  onClick={() => handleOptionClick("DeleteConversation")}
                  className="block w-full px-4 py-2 text-sm font-medium text-left text-red-600 hover:bg-red-50"
                >
                  Xóa hội thoại
                </button>
              )}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-1 transition-colors rounded-full text-white/80 hover:text-white hover:bg-white/10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Modal Rời nhóm */}
      <ConfirmDelete
        open={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleConfirmLeave}
        text="Bạn có chắc chắn muốn rời khỏi nhóm trò chuyện này không?"
      />

      {/* Modal Xóa nhóm (Mới) */}
      <ConfirmDelete
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        text="CẢNH BÁO: Bạn có chắc chắn muốn XÓA TOÀN BỘ nhóm này? Tất cả tin nhắn sẽ bị mất và không thể khôi phục."
      />

      <ErrorToast
        onClose={() => {
          setOpenErrorToast(false);
          setLocalError(null);
        }}
        open={errorToast}
        text={localError || "Có lỗi xảy ra!"}
      />
    </div>
  );
};
