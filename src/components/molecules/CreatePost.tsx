import { useEffect, useState } from "react";

import CreatePostModal from "../modals/CreatePostModal";
import { useCreatePost } from "../../hooks/posts/useCreatePost";
import type { SubmitData, MediaItem } from "../../types/Post";
import ErrorToast from "../toasts/ErrorToast";
import { usePets } from "../../hooks/profile/usePets";
export const CreatePost = ({
  onPostCreated,
  group_id,
}: {
  onPostCreated: (post: unknown) => void;
  group_id?: string;
}) => {
  const [openModel, setOpenModal] = useState(false);
  const { createPost, loading, error } = useCreatePost();
  const [pets, setPets] = useState([]);

  const userId = localStorage.getItem("user_id") || "";
  const { getPets, loading: petsLoading, error: petsError } = usePets(userId);
  useEffect(() => {
    const fetchPets = async () => {
      const petsData = await getPets();
      setPets(petsData);
    };
    fetchPets();
  }, []);


  // 🆕 Lấy thông tin user từ localStorage
  const avatarUrl = localStorage.getItem("avatar_url") || "";
  const userName = localStorage.getItem("user_name") || "Bạn";
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleSubmit = async (formDataFromModal: {
    author_id: string;
    caption?: string;
    visibility?: string;
    shared_post_id?: string;
    group_id?: string;
    media?: MediaItem[];
    pet_id?: string;
  }) => {
// nếu cả caption rỗng VÀ media trống thì mới báo lỗi
if ((!formDataFromModal.caption || formDataFromModal.caption.trim() === "") 
    && (!formDataFromModal.media || formDataFromModal.media.length === 0)) {
  setToastMessage("Vui lòng nhập nội dung hoặc chọn ảnh/video để đăng bài.");
  setOpenToast(true);
  return;
}
    try {
      const submitData: SubmitData = {

        author_id: userId,
        caption: formDataFromModal.caption,
        visibility: formDataFromModal.visibility,
        shared_post_id: formDataFromModal.shared_post_id,
        group_id: group_id || null,
        media: formDataFromModal.media,
        pet_id: formDataFromModal.pet_id,
      };
      console.log("Submit data prepared:", submitData);
      const res = await createPost(submitData);
      if (res) {
        onPostCreated(res);
      }
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div
        className="flex items-center mb-4 space-x-3 cursor-pointer"
        onClick={handleOpenModal}
      >
        <img
          src={avatarUrl}
          alt="Avatar"
          className="object-cover w-10 h-10 rounded-full"
        />
        <input
          type="text"
          placeholder={`${userName} ơi, bạn đang nghĩ gì về thú cưng?`}
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <i className="text-green-500 fas fa-image"></i>
            <span className="text-sm font-medium">Ảnh/Video</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
            <i className="text-yellow-500 fas fa-smile"></i>
            <span className="text-sm font-medium">Cảm xúc</span>
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-blue-500">Đang đăng bài...</div>
      )}
      {error && <div className="text-sm text-red-500">Lỗi: {error}</div>}

      {openModel && (
        <CreatePostModal
          open={openModel}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
          avatarURL={avatarUrl}
          userName={userName}
          pets={pets}
        />
      )}
      <ErrorToast
        open={openToast}
        text={toastMessage}
        onClose={() => setOpenToast(false)}
      />
    </div>
  );
};
