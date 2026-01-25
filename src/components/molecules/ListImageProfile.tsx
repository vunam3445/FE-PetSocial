import { useParams } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { ImageProfile } from "../atoms/ImageProfile";
import { useUserMedia } from "../../hooks/profile/useUserMedia";
import ImagePreviewModal from "../modals/ImagePreviewModal";
export const ListImageProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<number>(1);
  const { media, loading, error, hasMore } = useUserMedia(id!, "image", page);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastImageRef = useCallback(
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
    [loading, hasMore],
  );
  const handleImage = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div id="tab-photos">
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Ảnh đã đăng
        </h2>

       {!loading && media.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-gray-500">Người dùng này chưa có ảnh nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {media.map((item, index) => {
              if (index === media.length - 1) {
                return (
                  <div ref={lastImageRef} key={item.media_id}>
                    <ImageProfile
                      url={item.media_url}
                      handleImage={handleImage}
                    />
                  </div>
                );
              }
              return (
                <ImageProfile
                  key={item.media_id}
                  url={item.media_url}
                  handleImage={handleImage}
                />
              );
            })}
          </div>
        )}

        {loading && <p className="mt-4 text-center">Đang tải...</p>}
        {error && <p className="mt-4 text-center">Có lỗi xảy ra.</p>}
        <ImagePreviewModal
          onClose={() => setImageUrl(null)}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
};
