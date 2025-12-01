// src/components/sidebar/ProfileInfoCard.tsx
import React, { useState } from "react";
import type { PetInfo } from "../../types/Pet";
import { jwtDecode } from "jwt-decode";
import { useFollowPet } from "../../hooks/pet/useFollowPet";
import { useUnFollowPet } from "../../hooks/pet/useUnFollowPet";
import ErrorToast from "../toasts/ErrorToast";
interface TokenPayload {
  sub: string; // hoặc number tùy API trả về
  // có thể thêm các trường khác nếu cần
}

export const ProfileInfoCard: React.FC<{ pet: PetInfo }> = ({ pet }) => {
  const token = localStorage.getItem("access_token"); // hoặc lấy từ cookie
  const decoded = jwtDecode<TokenPayload>(token);
  const isMyPet = decoded.sub === pet.user_id;
  const [isFollowing, setIsFollowing] = useState<boolean>(pet.is_following);
  const [followCount, setFollowCount] = useState<number>(pet.followers_count);
  const { follow, loading: followLoading, error: followError } = useFollowPet();
  const {
    unfollow,
    loading: unfollowLoading,
    error: unfollowError,
  } = useUnFollowPet();
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
      </div>

      {!isMyPet && (
        <div className="flex justify-center gap-3 mt-5">
          <button className="px-5 py-2 font-semibold text-gray-800 transition duration-300 bg-white rounded-lg shadow-md hover:bg-gray-100">
            Nhắn tin
          </button>
          {isFollowing ? (
            <button
              className={`px-5 py-2 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700  ${
                unfollowLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleFollowClick}
              disabled={unfollowLoading}
            >
              Hủy theo dõi
            </button>
          ) : (
            <button
              className={`px-5 py-2 font-semibold text-white transition duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700  ${
                followLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleFollowClick}
              disabled={followLoading}
            >
              Theo dõi
            </button>
          )}
        </div>
      )}

      {/* <p className="mt-6 text-base text-center text-gray-700">{pet.bio}</p> */}

      <div className="flex justify-around py-4 mt-6 text-center border-t border-b">
        <div>
          <span className="text-lg font-bold text-gray-800">{followCount}</span>
          <span className="block text-sm text-gray-500">Người theo dõi</span>
        </div>
      </div>
      {(followError || unfollowError) && (
        <ErrorToast
          message={followError || unfollowError || "Đã có lỗi xảy ra"}
        />
      )}
    </div>
  );
};
