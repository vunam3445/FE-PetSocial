import { useCreatePost, type SubmitData } from "./useCreatePost";
import { useDeletePost } from "./useDeletePost";
import { useUpdatePost } from "./useUpdatePost";

export function usePostActions(setPosts: React.Dispatch<React.SetStateAction<Post[]>>) {
  const { updatePost } = useUpdatePost();
  const { deletePost } = useDeletePost();
  const { createPost } = useCreatePost();

  const handleUpdate = async (id: string, data: SubmitData) => {
    const updated = await updatePost(id, data);
    if (updated) setPosts(prev => prev.map(p => p.post_id === id ? updated : p));
  };

  const handleDelete = async (id: string) => {
    const ok = await deletePost(id);
    if (ok) setPosts(prev => prev.filter(p => p.post_id !== id));
  };

  const handleShare = async (data: SubmitData) => {
    const shared = await createPost(data);
    if (shared) setPosts(prev => [shared, ...prev]);
  };

  return { handleUpdate, handleDelete, handleShare };
}
