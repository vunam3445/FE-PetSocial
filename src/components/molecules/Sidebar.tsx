import React from "react";
import NavigationItem from "../atoms/NavigationItem";
import { CreateGroupModal } from "../modals/CreateGroupModal";
import { useCreateGroup } from "../../hooks/group/useCreateGroup";
import { LoadingOverlay } from "../loadings/LoadingOverlay";
import  ErrorToast  from "../toasts/ErrorToast";
import SuccessToast from "../toasts/SuccessToast";
import useResetSeed from "../../hooks/posts/useResetSeed"; // Import hook của bạn
const Sidebar: React.FC = () => {
  const userId = localStorage.getItem("user_id"); // lấy id từ localStorage
  const { createGroup, loading, error } = useCreateGroup();
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);
  const { handleReset, isLoading: isResetting } = useResetSeed(); // Sử dụng hook reset
  // Hàm xử lý khi nhấn vào "Bài viết"
  const handlePostsClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Chặn chuyển hướng mặc định để reset seed trước
    console.log('kdjs')
    await handleReset(() => {
        window.location.href = "/"; 
    });
  };
  const navigationItems = [
    { icon: "👥", label: "Bài viết", href: "/",onClick: handlePostsClick },
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
  const handleOpenModal = (e?: React.MouseEvent) => {
    if (e) e.preventDefault(); // Chặn việc nhảy lên đầu trang
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
              onClick={item.onClick}
            />
          ))}
          <NavigationItem
          icon="➕"
          label="Tạo nhóm mới"
          href="#"
          onClick={(e) => handleOpenModal(e)}
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
