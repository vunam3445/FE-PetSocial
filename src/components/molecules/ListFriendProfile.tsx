import { FriendProfile } from "../atoms/FriendProfile";
export const ListFriendProfile = () => {
    return (
          <div id="tab-friends" >
                <div className="p-6 bg-white rounded-lg shadow-sm">
                    <h2 className="mb-4 text-xl font-semibold text-gray-900">Bạn bè (2.5k)</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <FriendProfile />
                        <FriendProfile />
                        <FriendProfile />
                        <FriendProfile />
                        <FriendProfile />
                        <FriendProfile />
                    </div>
                </div>
            </div>
    );
};