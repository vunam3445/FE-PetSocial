import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/axios";
import useUserId from "../../hooks/auth/useUserId";

export const Avatar = ({ imageURL,onChange }: { imageURL: string, onChange:(avaterURL:string)=>void }) => {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avaterURL, setAvaterURL] = useState<string>(imageURL)
  const isOwner = useUserId(id);
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar_url", file);

    try {
    const res = await api.post(`/users/${id}/updateProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Cái này cần THÊM nếu không được tự động
        },
      });      console.log("Uploaded avatar:", res.data);

    const newAvatarUrl = res.data.user.avatar_url;
    setAvaterURL(newAvatarUrl);
    onChange(newAvatarUrl);

    } catch (err) {
      console.error("Avatar upload failed", err);
    }
  };

  return (
    <div className="absolute -bottom-16 left-6 md:left-8">
      <div className="relative">
        <img
          src={avaterURL}
          alt="Avatar"
          className="object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg"
        />
        {isOwner && <div>
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute p-2 bg-gray-100 rounded-full shadow bottom-2 right-2 hover:bg-gray-200"
        >
          <i className="text-sm text-gray-600 fas fa-camera"></i>
        </button>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        </div>}
        
      </div>
    </div>
  );
};
