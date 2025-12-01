import { useState } from "react";
import { QuestionItem } from "./QuestionItem";
import { useCreateQuestion } from "../../../../../hooks/questionJoinGroup/useCreateQuestion";
import { useGetQuestion } from "../../../../../hooks/questionJoinGroup/useGetQuestions";
import { useUpdateQuestion } from "../../../../../hooks/questionJoinGroup/useUpdateQuestion";
import { useDeleteQuestion } from "../../../../../hooks/questionJoinGroup/useDeleteQuestion";
import ErrorToast from "../../../../toasts/ErrorToast";
import { LoadingOverlay } from "../../../../loadings/LoadingOverlay";
import { QuestionItemSkeleton } from "../../../../skeleton/QuestionItemSkeleton";
import type { GroupWithMemberRole } from "../../../../../types/Group";
import ConfirmDelete from "../../../../modals/ComfirmDeleteModal";
interface GroupQuestionProps {
  groupInfo: GroupWithMemberRole;
}
export const MembershipQuestions = ({ groupInfo }: GroupQuestionProps) => {
  const [openComfirm, setOepComfirm] = useState(false);
  const [current, setCurrent] = useState<number>();
  const handleDelete = (id:number)=>{
    setOepComfirm(true);
    setCurrent(id)
  }
  const { loading, error, create } = useCreateQuestion();
  const {
    loading: updateLoading,
    error: updateError,
    updatedata: updateQuestion,
  } = useUpdateQuestion();
  const {
    loading: dataLoading,
    error: dataError,
    questions,
    resetError: resetErrorGetData,
    setQuestions,
  } = useGetQuestion(groupInfo.group.group_id);
  const {loading:deleteLoading, error: deleteError, deleteQuest} = useDeleteQuestion();

  const [isCreating, setIsCreating] = useState(false);
  const [newQuestionContent, setNewQuestionContent] = useState("");

  // Xử lý cập nhật câu hỏi
  const handleUpdateQuestion = async (id: number, newQuestion: string) => {
    const res = await updateQuestion(id, newQuestion);
    if (res) {
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === res.id ? { ...q, question: res.question } : q
        )
      );
    }
  };

  // Xử lý xóa câu hỏi
  const handleDeleteQuestion = async () => {
  setOepComfirm(false);

  if (!current) return;

  const res = await deleteQuest(current);

  if (res) {
    setQuestions((pre) => pre.filter((q) => q.id !== current));
  }
  setCurrent(undefined);
};


  // Xử lý tạo mới
const handleCreateQuestion = async () => {
  if (!newQuestionContent.trim()) return;

  const res = await create(groupInfo.group.group_id, newQuestionContent);

  if (res) {
    setQuestions((pre) => [...pre, res]);
  }

  setNewQuestionContent("");
  setIsCreating(false);
};


  return (
    <div className="max-w-4xl px-4 py-6 mx-auto">
      {/* Header & Button Tạo */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Câu hỏi thành viên
          </h2>
          <p className="text-sm text-gray-500">
            Đặt câu hỏi cho những người muốn tham gia nhóm của bạn.
          </p>
        </div>

        {!isCreating && (
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-4 py-2 text-white transition-all bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700"
          >
            <i className="mr-2 fas fa-plus"></i>
            Tạo câu hỏi
          </button>
        )}
      </div>

      {/* Form Tạo Mới (Chỉ hiện khi bấm nút Tạo) */}
      {isCreating && (
        <div className="p-4 mb-6 border-2 border-blue-100 rounded-lg bg-blue-50/50">
          <h4 className="mb-2 text-sm font-bold text-blue-800">
            Thêm câu hỏi mới
          </h4>
          <textarea
            className="w-full p-3 mb-3 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={3}
            placeholder="Nhập nội dung câu hỏi..."
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              onClick={handleCreateQuestion}
              disabled={!newQuestionContent.trim()}
              className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Thêm câu hỏi
            </button>
            <button
              onClick={() => {
                setIsCreating(false);
                setNewQuestionContent("");
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* Danh sách câu hỏi */}
      <div className="space-y-4">
        {dataLoading ? (
          // --- LOADING: Hiển thị Skeleton ---
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <QuestionItemSkeleton key={i} />
            ))}
          </>
        ) : questions.length === 0 ? (
          // --- KHÔNG CÓ DỮ LIỆU ---
          <div className="py-10 text-center text-gray-500 bg-white border border-gray-300 border-dashed rounded-lg">
            Chưa có câu hỏi nào. Hãy tạo câu hỏi đầu tiên!
          </div>
        ) : (
          // --- DANH SÁCH CÂU HỎI ---
          questions.map((q) => (
            <QuestionItem
              key={q.id}
              q={q}
              onUpdate={handleUpdateQuestion}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {loading && <LoadingOverlay />}

      <ErrorToast
        open={!!dataError}
        text={"Có lỗi xảy ra vui lòng thử lại sau"}
        onClose={resetErrorGetData}
      />
      <ConfirmDelete open={openComfirm} onClose={()=>setOepComfirm(false)} onConfirm={handleDeleteQuestion}/>
    </div>
  );
};
