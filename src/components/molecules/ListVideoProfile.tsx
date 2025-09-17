import { VideoProfile } from "../atoms/VideoProfile";
import { useUserMedia } from "../../hooks/profile/useUserMedia";
import { useParams } from "react-router-dom";
import { useState, useRef, useCallback } from "react";

export const ListVideoProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);
  const { media, loading, error, hasMore } = useUserMedia(id!, "video", page);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div id="tab-videos">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Video đã đăng</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {media.map((item, index) => {
            if (index === media.length - 1) {
              return (
                <div ref={lastVideoRef} key={item.id}>
                  <VideoProfile data={item} />
                </div>
              );
            } else {
              return <VideoProfile key={item.id} data={item} />;
            }
          })}
        </div>
        {loading && <p className="mt-4 text-gray-500">Đang tải...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};
