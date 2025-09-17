import { useState } from "react";
import { FriendProfile } from "../atoms/FriendProfile";
import { useFollowers } from "../../hooks/follow/useFollowers";
import { useFollowing } from "../../hooks/follow/useFollowing";
import { useParams } from "react-router-dom";

export const ListFriendProfile = () => {
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");
  const { id } = useParams();

  const {
    followers,
    loading: loadingFollowers,
    error: errorFollowers,
    loadMore: loadMoreFollowers,
  } = useFollowers(id || "");

  const {
    following,
    loading: loadingFollowing,
    error: errorFollowing,
    loadMore: loadMoreFollowing,
  } = useFollowing(id, activeTab === "following");

  return (
    <div id="tab-friends">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Bạn bè</h2>

        {/* Tabs */}
        <div className="flex mb-4 space-x-4 border-b">
          <button
            onClick={() => setActiveTab("followers")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "followers"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Followers
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`pb-2 text-sm font-medium ${
              activeTab === "following"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Following
          </button>
        </div>

        {/* Nội dung tab */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeTab === "followers" && (
            <>
              {followers.length === 0 && !loadingFollowers && !errorFollowers && (
                <p className="text-gray-500">Chưa có follower nào</p>
              )}

              {followers.map((friend, idx) => (
                <FriendProfile
                  key={friend.user_id}
                  friend={friend}
                  // 👇 nếu đến item thứ 7, gọi loadMore
                  ref={idx === 6 ? loadMoreFollowers : undefined}
                />
              ))}

              {loadingFollowers && <p>Loading...</p>}
              {errorFollowers && <p className="text-red-500">{errorFollowers}</p>}
            </>
          )}

          {activeTab === "following" && (
            <>
              {following.length === 0 && !loadingFollowing && !errorFollowing && (
                <p className="text-gray-500">Chưa có following nào</p>
              )}

              {following.map((friend, idx) => (
                <FriendProfile
                  key={friend.user_id}
                  friend={friend}
                  ref={idx === 6 ? loadMoreFollowing : undefined}
                />
              ))}

              {loadingFollowing && <p>Loading...</p>}
              {errorFollowing && <p className="text-red-500">{errorFollowing}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
