// GroupPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreatePost } from "../components/molecules/CreatePost";
import { Sidebar } from "../components/groups/GroupDetail/Sidebar";
import { GroupHeader } from "../components/groups/GroupDetail/MainContent/GroupHeader";
import { IntroCard } from "../components/groups/GroupDetail/MainContent/ContentGrid/LeftColumn/IntroCard";
import { GroupSettings } from "../components/groups/GroupDetail/MainContent/SettingComponent/GroupSettings";
import { GroupMembers } from "../components/groups/GroupDetail/MainContent/GroupMemberComponent/GroupMembers"; // Import component mới
import { useGetGroupInfo } from "../hooks/group/useGetGroupInfo";
import type { Group, GroupWithMemberRole } from "../types/Group";
import { MemberRequests } from "../components/groups/GroupDetail/MainContent/MemberRequests/MemberRequests";
import { MembershipQuestions } from "../components/groups/GroupDetail/MainContent/GroupQuestion/MembershipQuestions";
import { Header } from "../components/atoms/Header";
import { PostsOfGroupContainer } from "../components/molecules/PostsOfGroupContainer";
import type { Post } from "../types/ResponsePost";
import { PendingPosts } from "../components/groups/GroupDetail/MainContent/PendingPosts/PendingPosts";
import { ReportedPosts } from "../components/groups/GroupDetail/MainContent/Report/ReportedPosts";

export const GroupDetail = () => {
  const { group_id } = useParams();

  const { groupInfo, loading, error } = useGetGroupInfo(group_id);
  // State

  const [activeTab, setActiveTab] = useState<string>("feed"); // Có thể dùng <TabType> nếu muốn chặt chẽ
  const [localGroupInfo, setLocalGroupInfo] =
    useState<GroupWithMemberRole | null>(null);

  const [newPost, setNewPost] = useState<Post>();

  useEffect(() => {
    if (groupInfo) {
      setLocalGroupInfo(groupInfo);
    }
  }, [groupInfo]);

  const changeUpdate = (updatedGroup: Group) => {
    setLocalGroupInfo((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        group: updatedGroup,
      };
    });
  };
  const handleCreate = (newPost: Post) => {
    if (groupInfo?.group.require_post_approval === false) {
      setNewPost(newPost);
    }
  };

  // 3. Nếu fetch xong mà vẫn null (hoặc chưa sync xong localGroupInfo) -> Chặn render nội dung chính
  // Logic này giúp tránh lỗi crash khi truy cập "localGroupInfo.group"
  if (!localGroupInfo) return null;
  // Hàm render nội du  ng chính
  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <>
            <GroupHeader groupInfo={localGroupInfo} loading={loading} />
            <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                
               {groupInfo?.member_role !== null && (
                 <div className="space-y-6 lg:col-span-2">
                  <CreatePost
                    onPostCreated={handleCreate}
                    group_id={groupInfo?.group.group_id}
                  />
                  {/* Post List components here */}
                  <PostsOfGroupContainer
                    groupId={groupInfo?.group.group_id}
                    newPost={newPost}
                  />
                </div>
               )}
                <div className="space-y-6 lg:col-span-1">
                  <IntroCard
                    description={groupInfo?.group.description}
                    loading={loading}
                  />
                </div>
              </div>
            </main>
          </>
        );

      case "members":
        return (
          <>
            {/* Giữ header để user biết mình vẫn đang ở trong Group */}
            <GroupMembers groupInfo={localGroupInfo} />
          </>
        );

      case "membership_questions":
        return <MembershipQuestions groupInfo={localGroupInfo} />;
      case "settings":
        return (
          <GroupSettings
            groupInfo={localGroupInfo?.group}
            onChangeImage={changeUpdate}
          />
        );
      case "member_requests":
        return (
          <main className="max-w-5xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
            <MemberRequests groupInfo={localGroupInfo?.group} />
          </main>
        );

      case "pending_posts": // <-- THÊM CASE MỚI
        return (
          <main className="h-full bg-[#f0f2f5]">
            <PendingPosts groupId={groupInfo?.group.group_id} />
            {/* Sau này có thể truyền props: groupId={localGroupInfo.group.group_id} */}
          </main>
        );
      case "reported_posts": // <-- THÊM CASE MỚI
        return (
          <main className="h-full bg-[#f0f2f5]">
            <ReportedPosts groupId={groupInfo?.group.group_id} />
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid h-screen grid-cols-1 pt-16 lg:grid-cols-10 bg-[#f0f2f5]">
      <Header />
      <Sidebar
        groupInfo={localGroupInfo}
        loading={loading}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <div className="h-full overflow-y-auto lg:col-span-7" id="main-scroll">
        {renderContent()}
      </div>
    </div>
  );
};
