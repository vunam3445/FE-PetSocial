import { useState } from "react";
import { Sidebar } from "../components/groups/Sidebar";
import { Header } from "../components/atoms/Header";
import { EmptyGroupState } from "../components/atoms/EmptyGroupState";
import { CreateGroupModal } from "../components/modals/CreateGroupModal";
import { useCreateGroup } from "../hooks/group/useCreateGroup";
import type { Group } from "../types/Group";
export const Groups = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdGroup, setCreatedGroup] = useState<Group | null>(null);
  const { createGroup, loading, error } = useCreateGroup();
  const handleCreateGroupSubmit = async (
    name: string,
    visibility: "public" | "private",
  ) => {
    try {
      // Giả sử service trả về dữ liệu như bạn đã mô tả ở trên
      const response = await createGroup(name, visibility);
      if (response) {
        // Lưu nhóm mới vào state để Sidebar cập nhật
        setCreatedGroup(response);
        // Thông báo thành công...
      }
    } catch (error) {
      console.error("Lỗi tạo nhóm", error);
    }
  };
  return (
    <div className="flex w-full h-screen overflow-hidden font-sans text-gray-800 bg-gray-100">
      <Header />
      {/* Inject FontAwesome & Custom Scrollbar Styles */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #a8a8a8; }
      `}</style>

      {/* PHẦN 1: SIDEBAR (Component hóa) */}
      <Sidebar newGroup={createdGroup} />
      {/* PHẦN 2: MAIN FEED */}
      <main className="w-[70%] bg-gray-100 h-full overflow-y-auto scroll-smooth">
        <div className="max-w-4xl px-4 py-8 mx-auto">
          <EmptyGroupState onClilck={() => setIsModalOpen(true)} />
        </div>
      </main>
      <CreateGroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateGroupSubmit}
      />
    </div>
  );
};
