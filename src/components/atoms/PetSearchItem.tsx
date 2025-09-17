// components/PetSearchItem.tsx
import React from "react";
import { useFollow } from "../../hooks/follow/useFollow";
import { useUnfollow } from "../../hooks/follow/useUnfollow";

import type { PetSearchResult } from "../../types/Search";
interface PetSearchItemProps {
  pet: PetSearchResult;
}
export const PetSearchItem: React.FC<PetSearchItemProps> = ({ pet }) => {
  const { follow, error } = useFollow();
  const { unfollow, error: unfollowError } = useUnfollow();
  const [isFollowing, setIsFollowing] = React.useState(pet.is_following);
  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await follow(pet.owner_id);
    if (result) {
      setIsFollowing(true);
    } else {
      console.log(error);
    }
  };
  const handleUnfollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await unfollow(pet.owner_id);
    if (result) {
      setIsFollowing(false);
    } else {
      console.log(unfollowError);
    }
  };
  return (
    <div className="max-w-md p-4 mx-auto transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md" onClick={() => window.location.href = `/profile/${pet.owner_id}`}>
      <div className="flex items-center justify-between">
        {/* Pet Profile Picture */}
        <div className="flex-shrink-0">
          <img
            src={pet.avatar_url}
            alt={pet.name}
            className="object-cover w-16 h-16 rounded-lg"
          />
        </div>

        {/* Pet Information */}
        <div className="flex-1 min-w-0 ml-4">
          <h3 className="text-lg font-semibold leading-tight text-gray-900 truncate">
            {pet.name}
          </h3>
          <p className="mt-1 text-sm text-gray-600 truncate">
            {pet.breed} • {pet.type}
          </p>
        </div>

        {/* Follow Button */}
        <div className="flex-shrink-0 ml-4">
          {isFollowing ? (
            <button
              onClick={handleUnfollow}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Đang theo dõi
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              Theo dõi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
