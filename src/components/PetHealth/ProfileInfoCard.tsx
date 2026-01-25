// src/components/sidebar/ProfileInfoCard.tsx
import React, { useState } from "react";
import type { PetInfo } from "../../types/Pet";
import { jwtDecode } from "jwt-decode";
import { useFollowPet } from "../../hooks/pet/useFollowPet";
import { useUnFollowPet } from "../../hooks/pet/useUnFollowPet";
import ErrorToast from "../toasts/ErrorToast";

interface TokenPayload {
  sub: string;
}

export const ProfileInfoCard: React.FC<{ pet: PetInfo }> = ({ pet }) => {
  const token = localStorage.getItem("access_token");
  const decoded = jwtDecode<TokenPayload>(token || "");
  const isMyPet = decoded.sub === pet.user_id;

  const [isFollowing, setIsFollowing] = useState<boolean>(pet.is_following);
  const [followCount, setFollowCount] = useState<number>(pet.followers_count);

  const { follow, loading: followLoading, error: followError } = useFollowPet();
  const {
    unfollow,
    loading: unfollowLoading,
    error: unfollowError,
  } = useUnFollowPet();

  // Hàm định dạng ngày tháng: 2025-11-30 -> 30/11/2025
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Chưa cập nhật";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleFollowClick = async () => {
    if (isFollowing) {
      await unfollow(pet.pet_id);
      setIsFollowing(false);
      setFollowCount(followCount - 1);
    } else {
      await follow(pet.pet_id);
      setIsFollowing(true);
      setFollowCount(followCount + 1);
    }
  };

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl">
      <img
        className="object-cover mx-auto border-4 border-white rounded-full shadow-lg w-36 h-36"
        src={pet.avatar_url}
        alt={`Avatar của ${pet.name}`}
      />
      <div className="mt-5 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{pet.name}</h1>
        <p className="mt-1 text-lg text-gray-600">
          Giống loài: {pet.breed ? pet.breed : pet.type}
        </p>

        {/* Dòng hiển thị ngày sinh mới thêm vào */}
        <p className="mt-1 text-sm italic text-gray-500">
          Ngày sinh: {formatDate(pet.birthday)}
        </p>
      </div>

      {!isMyPet && (
        <div className="flex justify-center gap-3 mt-5">
          <button className="px-5 py-2 font-semibold text-gray-800 transition duration-300 bg-white border rounded-lg shadow-md hover:bg-gray-100">
            Nhắn tin
          </button>
          <button
            className={`px-5 py-2 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 ${
              followLoading || unfollowLoading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleFollowClick}
            disabled={followLoading || unfollowLoading}
          >
            {isFollowing ? "Hủy theo dõi" : "Theo dõi"}
          </button>
        </div>
      )}

      <div className="flex justify-around py-4 mt-6 text-center border-t border-b">
        <div>
          <span className="text-lg font-bold text-gray-800">{followCount}</span>
          <span className="block text-sm text-gray-500">Người theo dõi</span>
        </div>
        {/* Bạn có thể thêm giới tính ở đây nếu muốn */}
        <div>
          <span className="block text-sm text-gray-500">Giới tính</span>
          <span className="text-lg font-bold text-gray-800">
            <span className="text-lg font-bold text-gray-800">
              {pet.gender === "male"
                ? "Đực"
                : pet.gender === "female"
                  ? "Cái"
                  : "Chưa rõ"}
            </span>
          </span>
        </div>
      </div>

      {(followError || unfollowError) && (
        <ErrorToast text={followError || unfollowError || "Đã có lỗi xảy ra"} />
      )}
    </div>
  );
};
