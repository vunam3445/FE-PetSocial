import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditNameModal from "../modals/EditNameModal";
import { useFollow } from "../../hooks/follow/useFollow";
import { useUnfollow } from "../../hooks/follow/useUnfollow";
import ErrorToast from "../toasts/ErrorToast";
import useUserId from "../../hooks/auth/useUserId";

export const Profileheader = ({
  name,
  followers,
  following,
  isFollowing,
}: {
  name: string;
  followers: number;
  following: number;
  isFollowing: boolean;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [nameUser, setNameUser] = useState<string>(name);
  const [toastOpen, setToastOpen] = useState(false);
  const [isFollowingState, setIsFollowingState] =
    useState<boolean>(isFollowing);
  const { id } = useParams();
  const isOwner = useUserId(id);

  const { follow, loading, error } = useFollow();
  const {
    unfollow,
    loading: unfollowLoading,
    error: unfollowError,
  } = useUnfollow();
  const hanleEdit = () => {
    setOpenModal(true);
  };
  useEffect(() => {
    if (error) {
      setToastOpen(true);
    }
    if (unfollowError) {
      setToastOpen(true);
    }
  }, [error, unfollowError]);

  // khi có lỗi unfollow

  const handleFollow = async () => {
    const result = await follow(id);
    if (result) {
      // Follow successful
      setIsFollowingState(true);
    }
  };
  const handleUnfollow = async () => {
    const result = await unfollow(id);
    if (result) {
      // Unfollow successful
      setIsFollowingState(false);
    }
  };
  return (
    <div className="px-6 pt-20 pb-4 bg-white rounded-b-lg shadow-sm md:px-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-900">{nameUser}</h1>
            {isOwner &&(<button
              onClick={hanleEdit}
              className="p-1 text-gray-500 rounded-full hover:bg-gray-200"
              title="Edit name"
            >
              <i className="fas fa-edit"></i>
            </button>)}
          </div>
          <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
            <span>
              <i className="mr-1 fas fa-user-friends"></i>
              {followers} followers
            </span>
            <span>
              <i className="mr-1 fas fa-user-check"></i>
              {following} following
            </span>
          </div>
        </div>
        {!isOwner && (
          <div className="flex space-x-3">
            {isFollowingState ? (
              <button
                className="px-6 py-2 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                onClick={handleUnfollow}
                disabled={unfollowLoading}
              >
                <i className="mr-2 fas fa-user-minus"></i>Bỏ theo dõi
              </button>
            ) : (
              <button
                className="px-6 py-2 font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                onClick={handleFollow}
                disabled={loading}
              >
                <i className="mr-2 fas fa-user-plus"></i>Theo dõi
              </button>
            )}

            <button className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              <i className="mr-2 fas fa-comment"></i>Nhắn tin
            </button>
          </div>
        )}
      </div>
      {openModal && (
        <EditNameModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          currentName={nameUser}
          onChange={(newName) => setNameUser(newName)}
        />
      )}
      {(error || unfollowError) && (
        <ErrorToast
          open={toastOpen}
          text="Bạn đã thao tác quá nhiều, vui lòng thử lại sau."
          onClose={() => {
            setToastOpen(false);
          }}
        />
      )}
    </div>
  );
};
