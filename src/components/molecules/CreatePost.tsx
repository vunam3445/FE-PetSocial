import React, { useState } from "react";

import CreatePostModal from "../modals/CreatePostModal";
import { useCreatePost, type MediaFile } from "../../hooks/posts/useCreatePost";
import type { SubmitData } from "../../types/Post";
import type { Post } from "../../types/ResponsePost";




export const CreatePost = ({ avatarUrl,userName, onPostCreated}: { avatarUrl: string , userName:string, onPostCreated: (post:unknown) => void }) => {
  const [openModel, setOpenModal] = useState(false);
  const { createPost, loading, error } = useCreatePost();
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleSubmit = async (formDataFromModal: {
    caption?: string;
    visibility?: "public" | "private" | "friends";
    images?: File[];
    videos?: File[];
  }) => {
    try {
      // map images/videos sang media
      const media: MediaFile[] = [
        ...(formDataFromModal.images?.map((file, index) => ({
          file,
          type: "image" as const,
          order: index,
        })) || []),
        ...(formDataFromModal.videos?.map((file, index) => ({
          file,
          type: "video" as const,
          order: formDataFromModal.images?.length
            ? formDataFromModal.images.length + index
            : index,
        })) || []),
      ];

      const submitData: SubmitData = {
        caption: formDataFromModal.caption,
        visibility: formDataFromModal.visibility,
        media,
      };


      const res= await createPost(submitData);
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
        className="flex items-center mb-4 space-x-3"
        onClick={handleOpenModal}
      >
        <img src={avatarUrl} alt="Avatar" className="w-10 h-10 rounded-full" />
        <input
          type="text"
          placeholder="Mai ơi, bạn đang nghĩ gì về thú cưng?"
          className="flex-1 px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            {loading && <div className="text-sm text-blue-500">Đang đăng bài...</div>} {/* 🆕 */}

      {openModel && (
        <CreatePostModal
          open={openModel}
          onClose={() => setOpenModal(false)}
          onSubmit={handleSubmit}
          avatarURL={avatarUrl}
          userName= {userName}
        />
      )}
    </div>
  );
};
