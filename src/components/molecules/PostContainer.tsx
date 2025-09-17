import { useState, useEffect } from "react";
import { useUserPosts } from "../../hooks/posts/useUserPosts";

import type { Post } from "../../types/ResponsePost";
import { ListPost } from "./ListPost";
import { usePostActions } from "../../hooks/posts/usePostActions"; // ✅ dùng hook đã tạo
import { PostSkeleton } from "../skeleton/PostSkeleton"; // nhớ import

export const PostContainer = ({ userId, newPost }: { userId?: string; newPost?: Post }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { posts: fetchedPosts, loading } = useUserPosts(userId || "", 1);


  useEffect(() => {
    if (fetchedPosts.length > 0) setPosts(fetchedPosts);
  }, [fetchedPosts]);

  useEffect(() => {
    if (newPost && !posts.find((p) => p.post_id === newPost.post_id)) {
      setPosts((prev) => [newPost, ...prev]);
    }
  }, [newPost]);


  const { handleUpdate, handleDelete, handleShare } = usePostActions(setPosts);

  if (loading) return <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>;

  return <ListPost posts={posts} onUpdate={handleUpdate} onDelete={handleDelete} onShare={handleShare} />;
};
