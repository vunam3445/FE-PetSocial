import { useEffect, useState } from "react";
import type { Media } from "../../types/ResponsePost";
import api from "../../lib/axios";
export const useUserMedia = (userId: string, type: "image" | "video", page: number) => {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);

    api
      .get(`/users/${userId}/media/${type}?page=${page}`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setMedia((prev) => [...prev, ...res.data.data]);
          setHasMore(res.data.data.length === 10); // còn dữ liệu nữa hay không
        } else {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load media");
        setLoading(false);
      });
  }, [userId, type, page]);

  return { media, loading, error, hasMore };
};
