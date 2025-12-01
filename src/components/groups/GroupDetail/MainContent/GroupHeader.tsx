// GroupHeader.jsx
import { GroupTabs } from "./GroupTabs";
// import type { GroupWithMemberRole } from "../../../../types/Group"; // Uncomment nếu cần
import { GroupHeaderSkeleton } from "../../../skeleton/GroupHeaderSkeleton";
import type { GroupWithMemberRole } from "../../../../types/Group";
import { JoinGroupModal } from "../../../modals/JoinGroupModal"; // Import component vừa tạo
import { useState } from "react";
import { useGetQuestion } from "../../../../hooks/questionJoinGroup/useGetQuestions";
interface GroupHeaderProps {
  groupInfo?: GroupWithMemberRole; // Sửa lại type đúng của bạn
  loading?: boolean;
}

export const GroupHeader = ({ groupInfo, loading }: GroupHeaderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {loading:questionLoading, error, questions} = useGetQuestion(groupInfo?.group.group_id);
  // Giả lập danh sách câu hỏi từ API của nhóm private
  // Trong thực tế, dữ liệu này nằm trong `groupInfo.group.membership_questions`


  const handleJoinClick =async () => {
    setIsModalOpen(true);
  };

  const handleSubmitAnswers = async (answers: any) => {
    setIsSubmitting(true);
    console.log("Câu trả lời của user:", answers);

    // Gọi API request to join group kèm theo answers
    // await api.joinGroup(groupId, answers);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      alert("Đã gửi yêu cầu tham gia thành công!");
    }, 1000);
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
              groupInfo?.group.cover_url ||
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
                  groupInfo?.group.avatar_url ||
                  "https://placehold.co/168x168/fdc5a3/333333?text=🐾"
                }
                alt="Ảnh đại diện nhóm"
              />
            </div>
            {/* --------------------------- */}

            <div className="flex-1 min-w-0 mt-3 text-center sm:mt-0 sm:pb-5 sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                {groupInfo?.group.name || "Hội Yêu Thú Cưng"}
              </h1>
              <p className="text-sm font-medium text-gray-500">
                {groupInfo?.group.visibility === "public" ? (
                  <i className="mr-1 fas fa-globe-americas"></i>
                ) : (
                  <i className="mr-1 fas fa-lock"></i>
                )}
                {groupInfo?.group.visibility === "public"
                  ? "Nhóm công khai"
                  : "Nhóm riêng tư"}
                &nbsp;&middot;&nbsp;
                <span className="font-bold">
                  {groupInfo?.total_members || 0}
                </span>{" "}
                thành viên
              </p>
            </div>
            <div className="flex justify-center py-4 space-x-2 sm:justify-end sm:pb-5">
              {/* Action Buttons */}
              {groupInfo?.member_role === null && (
                <button
                  onClick={handleJoinClick}
                  className="px-4 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <i className="mr-2 fas fa-plus"></i> Tham gia nhóm
                </button>
              )}
              {groupInfo?.member_status === "pending" && (
                <button className="flex items-center px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  <i className="mr-2 fas fa-user-plus"></i> Đã gửi yêu cầu
                </button>
              )}
              {groupInfo?.member_role === "member" && (
                <button className="flex items-center px-4 py-2 font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
                  <i className="mr-2 fas fa-check"></i> Đã tham gia
                </button>
              )}
              {groupInfo?.member_role === "admin" && (
                <button className="flex items-center px-4 py-2 font-bold text-white bg-green-500 rounded-lg hover:bg-green-600">
                  <i className="mr-2 fas fa-crown"></i> Quản trị viên
                </button>
              )}
            </div>
          </div>
        </div>

        {/* GroupTabs */}
        <GroupTabs />
        {groupInfo?.group.visibility==='private' && (
          <JoinGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmitAnswers}
          groupName={groupInfo?.group.name || "Nhóm"}
          questions={questions}
          isSubmitting={isSubmitting}
        />
        )}
      </div>
    </header>
  );
};
