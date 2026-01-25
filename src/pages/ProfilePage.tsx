import { useParams } from "react-router-dom";
import { CoverImage } from "../components/atoms/CoverImage";
import { Profileheader } from "../components/molecules/Profileheader";
import { NavTabs } from "../components/molecules/NavTabs";
import { CreatePost } from "../components/molecules/CreatePost";
import { ListPost } from "../components/molecules/ListPost";
import { Header } from "../components/atoms/Header";
import { useUserProfile } from "../hooks/profile/useUserProfile";
import { Avatar } from "../components/atoms/Avatar";
import { ProfileLeftSidebar } from "../components/molecules/ProfileLeftSidebar";
import { useEffect, useState } from "react";
import { ListFriendProfile } from "../components/molecules/ListFriendProfile";
import { ListVideoProfile } from "../components/molecules/ListVideoProfile";
import { ListImageProfile } from "../components/molecules/ListImageProfile";
import { ListPetProfile } from "../components/molecules/ListPetProfile";
import { ProfileSkeleton } from "../components/skeleton/ProfileSkeleton";
import type { Post } from "../types/ResponsePost";
import useUserId from "../hooks/auth/useUserId";

import "../assets/css/profile.css";
import { PostContainer } from "../components/molecules/PostContainer";
export const ProfilePage = () => {
  const { id } = useParams(); // nếu id null => chính mình
  const isOwner = useUserId(id);
  const { user, pets, loading, error } = useUserProfile(id);
  const [activeTab, setActiveTab] = useState("Bài viết");
  const [avatarUpdate, setAvatarUpdate] = useState<string>("");
  const [newPost, setNewPost] = useState<Post>();
  const [coverUpdate, setCoverUpdate] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  useEffect(() => {
    if (user?.bio) {
      setBio(user.bio);
    }
  }, [user?.bio]);
  useEffect(() => {
    if (user) {
      setCoverUpdate(user.cover_url); // đồng bộ khi load user
    }
  }, [user?.cover_url]);
  useEffect(() => {
    setActiveTab("Bài viết");
  }, [id]);
  if (loading) return <ProfileSkeleton />;
  if (error || !user) return <div>{error ?? "Không tìm thấy người dùng."}</div>;
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto mt-16">
        <div className="relative">
          <CoverImage
            imageURL={coverUpdate || user.cover_url}
            onChange={(newCoverUrl) => setCoverUpdate(newCoverUrl)}
          />
          <Avatar
            imageURL={avatarUpdate || user.avatar_url}
            onChange={(avatarUrl) => setAvatarUpdate(avatarUrl)}
          />
        </div>
        <Profileheader
          name={user.name}
          followers={user.follower_count}
          following={user.following_count}
          isFollowing={user.is_following}
          date_of_birth={user.date_of_birth}
        />
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "Bài viết" && (
          <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-3">
            <ProfileLeftSidebar
              bio={bio}
              setBio={setBio}
              pets={pets}
              onViewAllPet={() => setActiveTab("Thú cưng")}
            />
            <div className="space-y-6 lg:col-span-2">
              {isOwner && (
                <CreatePost onPostCreated={(post) => setNewPost(post)} />
              )}
              <PostContainer newPost={newPost} userId={id} />
            </div>
          </div>
        )}
        {activeTab === "Bạn bè" && (
          <div className="mt-4">
            <ListFriendProfile />
          </div>
        )}
        {activeTab === "Video" && (
          <div className="mt-4">
            <ListVideoProfile />
          </div>
        )}
        {activeTab === "Ảnh" && (
          <div className="mt-4">
            <ListImageProfile />
          </div>
        )}
        {activeTab === "Thú cưng" && (
          <div className="mt-4">
            <ListPetProfile />
          </div>
        )}
      </div>
    </div>
  );
};
