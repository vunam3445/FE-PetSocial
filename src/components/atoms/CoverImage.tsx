import { useRef, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import api from "../../lib/axios"; // Đường dẫn đúng theo project của bạn
import useUserId from "../../hooks/auth/useUserId";

export const CoverImage = ({ 
  imageURL, 
  onChange 
}: { 
  imageURL: string, 
  onChange?: (url: string) => void 
}) => {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [coverURL, setCoverURL] = useState<string>(imageURL);
  const isOwner = useUserId(id);

  useEffect(() => {
    setCoverURL(imageURL); // khi prop thay đổi thì update lại
  }, [imageURL]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("cover_url", file);
    try {
      const res = await api.post(`/users/${id}/updateProfile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newUrl = res.data.user.cover_url;
      setCoverURL(newUrl);
      onChange?.(newUrl); // báo cho ProfilePage biết cover mới
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  return (
    <div className="relative h-64 overflow-hidden rounded-b-lg md:h-80">
      <img
        src={coverURL}
        alt="Cover"
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      {isOwner && (
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            onClick={handleButtonClick}
            className="flex items-center px-4 py-2 space-x-2 text-sm font-medium bg-white rounded-lg bg-opacity-90 hover:bg-opacity-100"
          >
            <i className="fas fa-camera"></i>
            <span>Chỉnh sửa ảnh bìa</span>
          </button>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      )}
    </div>
  );
};
