import { useCreatePost, type SubmitData } from "./useCreatePost";
import { useDeletePost } from "./useDeletePost";
import { useUpdatePost } from "./useUpdatePost";
import { type Post } from "../../types/ResponsePost";
export function usePostActions(
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>,
  isInGroupPage: boolean = false,
) {
  const { updatePost } = useUpdatePost();
  const { deletePost } = useDeletePost();
  const { createPost } = useCreatePost();

  const handleUpdate = async (id: string, data: SubmitData) => {
    const updated = await updatePost(id, data);
    if (updated) {
      setPosts((prev) => prev.map((p) => (p.post_id === id ? updated : p)));
      return updated; // Trả về dữ liệu để báo hiệu thành công
    }
    throw new Error("Update failed"); // Nếu không có dữ liệu trả về thì chủ động báo lỗi
  };

  const handleDelete = async (id: string) => {
    const ok = await deletePost(id);
    if (ok) setPosts((prev) => prev.filter((p) => p.post_id !== id));
  };

  const handleShare = async (data: SubmitData) => {
    const shared = await createPost(data);
    // ✅ Kiểm tra: Nếu không phải trong trang Group Detail thì mới thêm vào đầu list
    if (shared && !isInGroupPage) {
      setPosts((prev) => [shared, ...prev]);
    }
    return shared;
  };

  return { handleUpdate, handleDelete, handleShare };
}
