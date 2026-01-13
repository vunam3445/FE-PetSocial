import React from "react";
import NavigationItem from "../atoms/NavigationItem";
import { CreateGroupModal } from "../modals/CreateGroupModal";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";
import { LoadingOverlay } from "../loadings/LoadingOverlay";
import  ErrorToast  from "../toasts/ErrorToast";
import SuccessToast from "../toasts/SuccessToast";
import GroupsIcon from "@mui/icons-material/Groups";

const Sidebar: React.FC = () => {
  const userId = localStorage.getItem("user_id"); // lấy id từ localStorage
  const { createGroup, loading, error } = useCreateGroup();
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const navigationItems = [
    { icon: "👥", label: "Bài viết", href: "/" },
    { icon: "👤", label: "Trang cá nhân", href: `/profile/${userId}` }, // đổi thành route đúng
    { icon: "👪", label: 'Nhóm', href: '/groups' },
    // { icon: '🛒', label: 'Marketplace', href: '/marketplace' },
    // { icon: '📅', label: 'Events', href: '/events' },
    // { icon: '🐕', label: 'Pets', href: '/pets', isActive: true },
    // { icon: '📸', label: 'Memories', href: '/memories' },
    // { icon: '⚙️', label: 'Settings', href: '/settings' },
  ];
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] =
    React.useState(false);
  const handleOpenModal = () => {
    setIsCreateGroupModalOpen(true);
  };

  const submit = (name: string, visibility: string) => {
    createGroup(name, visibility).then(() => {
      setIsCreateGroupModalOpen(false);
      setOpenSuccessToast(true);
    });
  };

  return (
    <>
      <aside className="sticky hidden w-1/4 h-screen overflow-y-auto bg-white border-r border-gray-200 lg:block top-16">
        <nav className="p-6 space-y-3">
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={index}
              icon={item.icon}
              label={item.label}
              href={item.href}
            />
          ))}
          <NavigationItem
          icon="➕"
          label="Tạo nhóm mới"
          href="#"
          onClick={handleOpenModal}
        />
        </nav>
        
      </aside>
      <CreateGroupModal
        isOpen={isCreateGroupModalOpen}
        onClose={() => setIsCreateGroupModalOpen(false)}
        onSubmit={submit}
      />
      {loading && <LoadingOverlay text={"Đang tạo nhóm..."} />}
      <ErrorToast open={!!error} text={error} />
      <SuccessToast open={openSuccessToast} text={"Tạo nhóm thành công!"} />
    </>
  );
};

export default Sidebar;
