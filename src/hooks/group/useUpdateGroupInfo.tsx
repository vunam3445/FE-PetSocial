import { useState } from "react";
import { UpdateGroupInfo } from "../../services/GroupService";
import type { Group, UpdateGroupData } from "../../types/Group";

export const useUpdateGroupInfo = (initialGroup: Group) => {
  const [group, setGroup] = useState<Group>(initialGroup);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateGroup = async (updateData: UpdateGroupData) => {
    const previous = { ...group }; // snapshot
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      if (updateData.name) formData.append("name", updateData.name);
      if (updateData.description)
        formData.append("description", updateData.description);
      if (updateData.visibility)
        formData.append("visibility", updateData.visibility);
      if (updateData.require_post_approval !== undefined) {
        formData.append(
          "require_post_approval",
          updateData.require_post_approval ? "1" : "0"
        );
      }
      if (updateData.avatar)
        formData.append("avatar", updateData.avatar);
      if (updateData.cover)
        formData.append("cover", updateData.cover);
      const updatedGroup = await UpdateGroupInfo(group.group_id, formData); // call API
      setGroup(updatedGroup); // ✅ thành công → cập nhật UI
      return updatedGroup;
    } catch (err) {
      setGroup(previous); // ❌ rollback về state cũ
      setError("Failed to update group information."); // show error
      throw err; // giữ để component biết lỗi
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { group, loading, error, updateGroup, resetError };
};
