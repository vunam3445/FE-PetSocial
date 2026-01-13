import React, { useState, useEffect } from "react";
import useGetMemberConversation from "../../hooks/chat/useGetMemberConversation";
import { MemberSkeleton } from "../skeleton/MemberSkeleton";
import useDeleteMemberOfConversation from "../../hooks/chat/useDeleteMemberOfConversation";
import { type Member } from "../../types/Conversation";
import ConfirmDelete from "./ComfirmDeleteModal";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
  created_by: string;
}

export const ConversationMemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  conversationId,
  created_by,
}) => {
  const {
    members,
    setMembers,
    fetchMembers,
    isLoading: isLoadingFetch,
    error: errorFetch,
  } = useGetMemberConversation();

  const { deleteMember, isLoading: isDeleting } =
    useDeleteMemberOfConversation();

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const userId = localStorage.getItem("user_id");
  // --- State cho Modal xác nhận xóa ---
  const [confirmModal, setConfirmModal] = useState<{
    show: boolean;
    userId: string;
    userName: string;
  }>({ show: false, userId: "", userName: "" });

  useEffect(() => {
    if (isOpen) {
      fetchMembers(conversationId);
    }
  }, [conversationId, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openDropdownId &&
        !(event.target as HTMLElement).closest(".member-action-menu")
      ) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdownId]);

  if (!isOpen) return null;

  // Mở modal xác nhận thay vì dùng window.confirm
  const handleOpenConfirm = (userId: string, userName: string) => {
    setConfirmModal({ show: true, userId, userName });
    setOpenDropdownId(null); // Đóng dropdown khi mở modal
  };

  // Hàm thực thi xóa khi nhấn "Có" trên Modal
  const handleConfirmDelete = async () => {
    const { userId } = confirmModal;

    setConfirmModal((prev) => ({ ...prev, show: false }));

    const result = await deleteMember(conversationId, userId);

    if (result.success) {
      // SỬA TẠI ĐÂY: Sử dụng functional update để chắc chắn UI render lại
      setMembers((prevMembers) => {
        const newMembers = prevMembers.filter((m) => m.user_id !== userId);
        return [...newMembers]; // Tạo mảng mới để trigger re-render
      });

      // Reset dropdown để tránh lỗi giao diện
      setOpenDropdownId(null);
    } else {
      console.error(result.error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="flex flex-col w-full max-w-xl overflow-hidden bg-white shadow-2xl rounded-2xl max-h-[90vh] min-h-[500px] animate-in zoom-in duration-300">
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-8 py-5 bg-white border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800">
              Danh sách thành viên
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-7 h-7"
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

          {/* Content Area */}
          <div className="flex-1 px-2 overflow-y-auto bg-white custom-scrollbar">
            {isLoadingFetch ? (
              <div className="p-6 space-y-2">
                {[...Array(8)].map((_, index) => (
                  <MemberSkeleton key={index} />
                ))}
              </div>
            ) : errorFetch ? (
              <div className="flex flex-col items-center justify-center h-full p-10 text-center">
                <p className="text-lg font-medium text-gray-800">
                  {errorFetch}
                </p>
                <button
                  onClick={() => fetchMembers(conversationId)}
                  className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg"
                >
                  Thử lại
                </button>
              </div>
            ) : (
              <div className="py-2">
                {members.map((member: Member) => (
                  <div
                    key={member.user_id}
                    className="flex items-center justify-between px-8 py-4 hover:bg-gray-50 group"
                  >
                    <div className="flex items-center space-x-4">
                      {member.avatar_url ? (
                        <img
                          src={member.avatar_url}
                          className="object-cover w-12 h-12 rounded-full"
                          alt=""
                        />
                      ) : (
                        <div className="flex items-center justify-center w-12 h-12 font-bold text-blue-600 bg-blue-100 rounded-full">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-lg font-semibold text-gray-900">
                          {member.name}
                        </p>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            member.pivot.role === "admin"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {member.pivot.role}
                        </span>
                      </div>
                    </div>

                    {/* Action Menu */}
                    <div className="relative member-action-menu">
                      <button
                        onClick={() =>
                          setOpenDropdownId(
                            openDropdownId === member.user_id
                              ? null
                              : member.user_id
                          )
                        }
                        className="p-2.5 text-gray-400 hover:bg-gray-100 rounded-full"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>

                      {openDropdownId === member.user_id && (
                        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-2xl z-[110] py-2">
                          <button className="flex items-center w-full px-4 py-3 text-sm hover:bg-gray-50">
                            👤 Xem hồ sơ
                          </button>
                          <div className="my-1 border-t border-gray-50"></div>
                          {userId === created_by &&
                            member.user_id !== created_by && (
                              <>
                                <div className="my-1 border-t border-gray-50"></div>
                                <button
                                  onClick={() =>
                                    handleOpenConfirm(
                                      member.user_id,
                                      member.name
                                    )
                                  }
                                  className="flex items-center w-full px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50"
                                >
                                  🗑️ Xóa khỏi nhóm
                                </button>
                              </>
                            )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 z-20 px-8 py-5 text-right border-t bg-gray-50">
            <button
              onClick={onClose}
              className="px-8 py-2.5 font-bold text-gray-600 bg-white border rounded-lg hover:bg-gray-100"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>

      {/* --- CONFIRM DELETE MODAL --- */}
      <ConfirmDelete
        open={confirmModal.show}
        onClose={() => setConfirmModal({ ...confirmModal, show: false })}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
