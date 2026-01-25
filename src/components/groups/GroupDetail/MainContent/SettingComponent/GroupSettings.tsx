import React, { useEffect, useState } from "react";
import { GeneralSettings } from "./GeneralSettings";
import { ImageSettings } from "./ImageSettings";
import { ContentSettings } from "./ContentSettings";
import { DangerZone } from "./DangerZone";
import type { Group, UpdateGroupData } from "../../../../../types/Group";
import { useUpdateGroupInfo } from "../../../../../hooks/group/useUpdateGroupInfo";
import { LoadingOverlay } from "../../../../loadings/LoadingOverlay";
import ErrorToast from "../../../../toasts/ErrorToast";
import ConfirmDelete from "../../../../modals/ComfirmDeleteModal";
import { useDeleteGroup } from "../../../../../hooks/group/useDeleteGroup";
import { useNavigate } from "react-router-dom";

interface GroupSettingsProps {
  groupInfo: Group;
  onChangeImage: (res: Group) => void;
}

export const GroupSettings: React.FC<GroupSettingsProps> = ({
  groupInfo,
  onChangeImage,
}) => {
  const navigator = useNavigate();
  const [openComfirmDelete, setOpenComfirmDelete] = useState<boolean>(false);
  const { group, updateGroup, loading, error, resetError } =
    useUpdateGroupInfo(groupInfo);
  const {
    deleteGroup,
    loading: deleteLoading,
    error: deleteError,
    resetError: resetErrorDeletel,
  } = useDeleteGroup();
  const [openErrorToast, setOpenErrorToast] = useState(false);
  useEffect(() => {
    if (error || deleteError) {
      setOpenErrorToast(true);
    }
  }, [error, deleteError]);
const [approvalMode, setApprovalMode] = useState<boolean>(groupInfo.require_post_approval);
  // Helper để lấy đúng key ảnh (xử lý trường hợp API trả về snake_case hoặc camelCase)
  const avatarUrl =
    group?.avatar_url || group?.avatar_url || "https://placehold.co/100x100";
  const coverUrl =
    group?.cover_url || group?.cover_url || "https://placehold.co/300x150";

  // --- Handlers ---
  const handleUpdateInfo = async (field: string, newValue: string) => {
    const updateData: UpdateGroupData = { [field]: newValue };
    const res = await updateGroup(updateData);
    if (res) {
      onChangeImage(res); // Cập nhật lại localGroupInfo ở Component cha
    }
  };

  const handleUpdateImage = async (type: "avatar" | "cover", file: File) => {
    const updateData: UpdateGroupData = { [type]: file };
    const res = await updateGroup(updateData);
    onChangeImage(res);
  };

  const handleToggleApproval = async (newValue: boolean) => {
  // 1. Cập nhật UI ngay lập tức
  setApprovalMode(newValue);
  
  // 2. Gọi API update
  const updateData = { 'require_post_approval': newValue };
  const res = await updateGroup(updateData);
  
  // 3. Đồng bộ lại dữ liệu với trang cha
  if (res) {
    onChangeImage(res);
  }
};

  const handleDeleteGroup = async () => {
    setOpenComfirmDelete(false); // đóng modal trước cũng được
    try {
      await deleteGroup(group.group_id); // đợi API trả về
      // Nếu thành công, điều hướng về /groups
      navigator("/groups");
    } catch (err) {
      console.log("Xóa group thất bại:", err);
      // lỗi sẽ được set trong deleteError, ErrorToast sẽ hiển thị
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Cài đặt nhóm</h1>

      {/* 1. General Info */}
      <GeneralSettings
        groupName={group?.name}
        description={group?.description || ""}
        visibility={group?.visibility}
        onUpdate={handleUpdateInfo}
      />

      {/* 2. Images */}
      <ImageSettings
        avatarUrl={avatarUrl}
        coverUrl={coverUrl}
        onUpdateImage={handleUpdateImage}
      />

      {/* 3. Content Management */}
      <ContentSettings
        approvalMode={approvalMode}
        onToggleApproval={handleToggleApproval}
      />

      {/* 4. Danger Zone */}
      <DangerZone
        onDelete={() => {
          setOpenComfirmDelete(true);
        }}
      />
      {(loading || deleteLoading) && <LoadingOverlay />}
      <ErrorToast
        open={openErrorToast}
        text={error || "Có lỗi xảy ra vui lòng thử lại sau"}
        onClose={() => {
          setOpenErrorToast(false);
          resetError();
          resetErrorDeletel();
        }}
      />

      <ConfirmDelete
        open={openComfirmDelete}
        onClose={() => {
          setOpenComfirmDelete(false);
        }}
        onConfirm={handleDeleteGroup}
      />
    </div>
  );
};
