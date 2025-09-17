// components/UserSearchItem.tsx
import React from "react";
import type { UserSearchResult } from "../../types/Search";
import { Link } from "react-router-dom";
import { useFollow } from "../../hooks/follow/useFollow";
import { useUnfollow } from "../../hooks/follow/useUnfollow";

export const UserSearchItem: React.FC<{ user: UserSearchResult }> = ({
  user,
}) => {
  const { follow,  error } = useFollow();
  const { unfollow,  error: unfollowError } = useUnfollow();
  const [isFollowing, setIsFollowing] = React.useState(user.is_followed);
  const [followersCount, setFollowersCount] = React.useState(user.followers_count);
  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await follow(user.user_id);
    if (result) {
      setIsFollowing(true);
      setFollowersCount((prev) => prev + 1);
    }else{
      console.log(error);
    }
     
  };
  const handleUnfollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    const result = await unfollow(user.user_id);
    if (result) {
      setIsFollowing(false);
      setFollowersCount((prev) => prev - 1);
    } else{
      console.log(unfollowError);
    }
  };
  return (
    <Link to={`/profile/${user.user_id}`} className="block">
      <div className="flex items-center px-4 py-4 mb-3 transition-all bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:bg-gray-50">
        {/* Avatar */}
        <div className="flex-shrink-0 ml-2">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="object-cover w-12 h-12 rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
          ) : (
            <div className="flex items-center justify-center w-12 h-12 font-semibold text-white bg-gray-400 rounded-full">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 ml-4">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {user.name}
          </h3>
          {user.bio ? (
            <>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {user.bio}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {followersCount} người theo dõi
              </p>
            </>
          ) : (
            <p className="mt-1 text-sm text-gray-500">
              {followersCount} người theo dõi
            </p>
          )}
        </div>

        {/* Button */}
        <div className="flex-shrink-0 mr-2">
          {isFollowing ? (
            <button className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700" onClick={handleUnfollow}>
              Đang theo dõi
            </button>
          ) : (
            <button className="px-4 py-2 text-sm font-medium text-blue-600 transition-colors border border-blue-600 rounded-lg hover:bg-blue-50" onClick={handleFollow}>
              Theo dõi
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};
