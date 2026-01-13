import { useState } from "react";
import api from "../../lib/axios";
import type { SubmitData } from "../../types/Post";
export interface MediaFile {
  file: File;
  type: "image" | "video";
  order?: number;
}



export const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = localStorage.getItem("user_id") || "";
  const createPost = async (formData: SubmitData) => {
    try {
      setLoading(true);
      setError(null);
      const apiForm = new FormData();

      // Thông tin bài viết
      apiForm.append("author_id", id);
      apiForm.append("caption", formData.caption || "");
      apiForm.append("visibility", formData.visibility || "public");
      apiForm.append("pet_id", formData.pet_id || ""); // Thêm pet_id nếu có

      if (formData.shared_post_id) {
        apiForm.append("shared_post_id", formData.shared_post_id);
      }
      if (formData.group_id) {
        apiForm.append("group_id", formData.group_id);
      }


      // Thêm media (mảng)
      if (formData.media?.length) {
        formData.media.forEach((item, index) => {
          apiForm.append(`media[${index}][file]`, item.file);
          apiForm.append(`media[${index}][media_type]`, item.media_type);
          apiForm.append(`media[${index}][order]`, String(item.order ?? index));
        });
      }
      const res = await api.post("/posts", apiForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPost, loading, error };
};
