import { Link } from "react-router-dom";
import type { Friend } from "../../types/Friend";

interface FriendProfileProps {
  friend: Friend;
}

export const FriendProfile = ({ friend }: FriendProfileProps) => {
  return (
    <Link to={`/profile/${friend.user_id}`}>
      <div className="p-4 transition-shadow bg-white border rounded-lg cursor-pointer hover:shadow-md">
        <div className="flex items-center space-x-3">
          <img
            src={friend.avatar_url}
            alt={friend.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{friend.name}</h3>
          </div>
        </div>
        <div className="flex mt-3 space-x-2">
          <button className="flex-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
            <i className="mr-1 fas fa-comment"></i>Nhắn tin
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};
