import { useState } from "react";
import api from "../../lib/axios";
import type { SubmitData } from "../../types/Post";

export const useUpdatePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updatePost = async (postId: string, formData: SubmitData) => {
    try {
      setLoading(true);
      setError(null);
      const apiForm = new FormData();

      // Thông tin bài viết
      apiForm.append("caption", formData.caption || "");
      apiForm.append("visibility", formData.visibility || "public");
      // Thêm media (mảng)

      if (formData.media?.length) {
        // gửi metadata dưới dạng JSON
        apiForm.append(
          "media",
          JSON.stringify(
            formData.media.map((item, index) => ({
              media_url: item.media_url ?? "",
              media_type: item.media_type,
              order: item.order ?? index,
            }))
          )
        );

        // gửi file riêng theo index
        formData.media.forEach((item, index) => {
          if (item.file) {
            apiForm.append(`files[${index}]`, item.file);
          }
        });
      }

      apiForm.append("_method", "PATCH");
      const res = await api.post(`/posts/${postId}`, apiForm, {
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

  return { updatePost, loading, error };
};
