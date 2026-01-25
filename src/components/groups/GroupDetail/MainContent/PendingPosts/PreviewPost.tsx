import { useState } from "react";
import { Card } from "@mui/material";
import PostLightboxModal from "../../../../modals/PostLightboxModal";
import { PostHeader } from "../../../../atoms/PostHeader";
import { MediaGrid } from "../../../../atoms/MediaGrid";
import { PostCaption } from "../../../../atoms/PostCaption";
import type { Media, Post } from "../../../../../types/ResponsePost";
export interface PostProps {
  post: Post;
  handleApprove: (post_id: string)=> void;
  handleReject: (post_id: string)=> void;
  
}

export const PreviewPost = ({ post, handleApprove, handleReject }: PostProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const openLightbox = (media: Media) => {
    const mediaSource = post.shared_post?.media ?? post.media;
    const index = mediaSource.findIndex((m) => m.media_url === media.media_url);
    setMediaList(mediaSource);
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const showPrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };

  const showNext = () => {
    setSelectedIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          margin: "0 auto 24px auto",
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          overflow: "visible",
        }}
      >
        <PostHeader
          post={post}
        
        />

        {post.caption && (
          <PostCaption
            caption={post.caption || ""}
            maxChars={280}
            onExpand={() => {}}
          />
        )}

        <MediaGrid media={post.media} onMediaClick={openLightbox} />

        {/* {post.shared_post && (
          <SharedPost
            sharedPost={post.shared_post}
            onDetailPost={onDetailPost}
            onMediaClick={openLightbox}
          />
        )} */}

        <div className="flex items-center justify-end p-4 space-x-3 border-t border-gray-100 bg-gray-50">
          <button
            onClick={() => handleReject(post.post_id)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <i className="mr-2 fas fa-times"></i>
            Từ chối
          </button>
          <button
            onClick={() => handleApprove(post.post_id)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="mr-2 fas fa-check"></i>
            Duyệt bài
          </button>
        </div>
      </Card>

      <PostLightboxModal
        open={lightboxOpen}
        mediaList={mediaList}
        selectedIndex={selectedIndex}
        onClose={closeLightbox}
        onPrev={showPrev}
        onNext={showNext}
      />
    </>
  );
};
