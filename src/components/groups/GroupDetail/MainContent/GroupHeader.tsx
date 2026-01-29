// GroupHeader.jsx
import { GroupTabs } from "./GroupTabs";
// import type { GroupWithMemberRole } from "../../../../types/Group"; // Uncomment nếu cần
import { GroupHeaderSkeleton } from "../../../skeleton/GroupHeaderSkeleton";
import type { GroupWithMemberRole } from "../../../../types/Group";
import { JoinGroupModal } from "../../../modals/JoinGroupModal"; // Import component vừa tạo
import { useState } from "react";
import { useGetQuestion } from "../../../../hooks/questionJoinGroup/useGetQuestions";
import { useJoinGroup } from "../../../../hooks/group/useJoinGroup";
import ErrorToast from "../../../toasts/ErrorToast";
import type { JoinGroupRequest } from "../../../../types/QuestionAndAnswer";
import { useDeleteRequestJoinGroup } from "../../../../hooks/group/useDeleteRequestJoinGroup";
import { useDeleteGroupMember } from "../../../../hooks/groupMember/useDeleteGroupMember";
import { ConfirmModal } from "../../../atoms/ConfirmModal";
import { useNavigate } from "react-router-dom";
interface GroupHeaderProps {
  groupInfo?: GroupWithMemberRole; // Sửa lại type đúng của bạn
  loading?: boolean;
}

export const GroupHeader = ({ groupInfo, loading }: GroupHeaderProps) => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [group, setGroup] = useState<GroupWithMemberRole | undefined>(
    groupInfo
  );
  const {
    loading: deleteRequestLoading,
    error: deleteRequest,
    setError: setErrorDeleteRequest,
    deleteRequestJoinGroup,
  } = useDeleteRequestJoinGroup();
  const {
    loading: leaveLoading,
    error: leaveError,
    deleteGroupMember,
  } = useDeleteGroupMember();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    loading: questionLoading,
    error,
    questions,
  } = useGetQuestion(group?.group.group_id);
  const {
    loading: joinLoading,
    error: joinError,
    submitData,
    setError,
  } = useJoinGroup();
  // Giả lập danh sách câu hỏi từ API của nhóm private
  // Trong thực tế, dữ liệu này nằm trong `group.group.membership_questions`
  const [isOpenErrorToast, setIsOpenErrorToast] = useState(joinError);

  const handleJoinClick = async () => {
    // Nhóm PUBLIC → tạo join request ngay lập tức
    if (group?.group.visibility === "public") {
      setIsSubmitting(true);

      const payload: JoinGroupRequest = {
        groupId: group.group.group_id,
        answers: [], // Public → answers rỗng
      };

      await submitData(payload);
      setIsModalOpen(false);
      setIsSubmitting(false);
      setGroup((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          member_role: "member",
          join_request_status: null,
          has_join_request: true,
        };
      });
      return; // Không mở modal nữa
    }

    // Nhóm PRIVATE → mở modal
    setIsModalOpen(true);
  };
  const handleCancelJoinRequest = async () => {
    const res = await deleteRequestJoinGroup(group.group.group_id);

    if (res) {
      setGroup((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          join_request_status: null,
          has_join_request: false,
          member_role: null,
        };
      });
    }
  };
  const handleLeaveGroup = async () => {
    if (!group?.group.group_id) return;

    const res = await deleteGroupMember(group.group.group_id, userId);

    if (res) {
      // 3. Cập nhật state local (optional vì sẽ chuyển trang)
      setGroup((prev) =>
        prev
          ? {
              ...prev,
              member_role: null,
              join_request_status: null,
              has_join_request: false,
              total_members: Math.max(0, (prev.total_members || 0) - 1),
            }
          : prev
      );

      setIsLeaveModalOpen(false);

      // 4. Chuyển hướng về trang danh sách nhóm
      navigate("/groups");
    }
  };
  const handleSubmitAnswers = async (answers: JoinGroupRequest) => {
    setIsSubmitting(true);
    const res = await submitData(answers);
    if (res) {
      setGroup((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          join_request_status: "pending",
          has_join_request: true,
        };
      });
    }
    setIsSubmitting(joinLoading);
    setIsModalOpen(false);
  };
  if (loading) {
    return <GroupHeaderSkeleton />;
  }
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-7xl">
        {/* Cover Photo */}
        <div className="relative cover-photo lg:rounded-b-none">
          <img
            src={
              group?.group.cover_url ||
              "https://placehold.co/1000x250/fdc5a3/333333?text=Cover+Photo"
            }
            alt="Ảnh bìa nhóm"
            className="object-cover w-full h-48 lg:rounded-t-lg lg:h-80" // Tăng chiều cao lên 1 chút cho đẹp giống mẫu
          />
        </div>

        {/* Group Info */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-5">
            {/* --- PHẦN SỬA LỖI Ở ĐÂY --- */}
            <div className="flex justify-center -mt-16 sm:-mt-[70px] relative z-10">
              <img
                className="w-32 h-32 sm:w-[140px] sm:h-[140px] border-4 border-white rounded-full object-cover shadow-md"
                src={
                  group?.group.avatar_url ||
                  "https://placehold.co/168x168/fdc5a3/333333?text=🐾"
                }
                alt="Ảnh đại diện nhóm"
              />
            </div>
            {/* --------------------------- */}

            <div className="flex-1 min-w-0 mt-3 text-center sm:mt-0 sm:pb-5 sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {group?.group.name || "Hội Yêu Thú Cưng"}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {group?.group.visibility === "public" ? (
                  <i className="mr-1 fas fa-globe-americas"></i>
                ) : (
                  <i className="mr-1 fas fa-lock"></i>
                )}
                {group?.group.visibility === "public"
                  ? "Nhóm công khai"
                  : "Nhóm riêng tư"}
                &nbsp;&middot;&nbsp;
                <span className="font-bold">
                  {group?.total_members || 0}
                </span>{" "}
                thành viên
              </p>
            </div>
            <div className="flex justify-center py-4 space-x-2 sm:justify-end sm:pb-5">
              {/* Action Buttons */}
              {group?.member_role === null &&
                group.join_request_status === null && (
                  <button
                    onClick={handleJoinClick}
                    className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    <i className="mr-2 fas fa-plus"></i> Tham gia nhóm
                  </button>
                )}
              {group?.join_request_status === "pending" && (
                <button
                  onClick={handleCancelJoinRequest}
                  className="px-4 py-2 font-semibold text-gray-700 transition bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300"
                >
                  <i className="mr-2 fas fa-times"></i> Hủy yêu cầu
                </button>
              )}
              {group?.member_role === "member" && (
                <button
                  onClick={() => setIsLeaveModalOpen(true)}
                  className="flex items-center px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  <i className="mr-2 fas fa-check"></i> Rời nhóm
                </button>
              )}
              {group?.member_role === "admin" && (
                <button className="flex items-center px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
                  <i className="mr-2 fas fa-crown"></i> Quản trị viên
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GroupTabs */}
        {group?.member_role !== null && <GroupTabs />}
        {group?.group.visibility === "private" && (
          <JoinGroupModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleSubmitAnswers}
            groupName={group?.group.name || "Nhóm"}
            questions={questions}
            isSubmitting={isSubmitting}
            groupId={group.group.group_id}
          />
        )}
      </div>
      <ConfirmModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onConfirm={handleLeaveGroup}
        title="Rời khỏi nhóm?"
        message={`Bạn sẽ không còn là thành viên của "${group?.group.name}" và không thể xem các nội dung riêng tư.`}
        confirmText="Rời nhóm"
        isLoading={leaveLoading}
      />
      <ErrorToast
        open={isOpenErrorToast}
        onClose={() => {
          setError(null);
          setIsOpenErrorToast(false);
        }}
        text="Có lỗi xảy ra vui lòng thử lại sau"
      />
    </header>
  );
};
