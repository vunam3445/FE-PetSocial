import { useState } from "react";
import { Card } from "@mui/material";
import PostLightboxModal from "../modals/PostLightboxModal";
import { PostHeader } from "../atoms/PostHeader";
import { MediaGrid } from "../atoms/MediaGrid";
import { SharedPost } from "./PostShare";
import { PostCaption } from "../atoms/PostCaption";
import type { Media, Post } from "../../types/ResponsePost";

export interface PostProps {
  post: Post;
  onDetailPost: () => void;
}

export const PostReport = ({ post, onDetailPost }: PostProps) => {
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

  const closeLightbox = () => setLightboxOpen(false);
  const showPrev = () => setSelectedIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  const showNext = () => setSelectedIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: 0, // Phẳng hóa để khớp với container ReportedPosts
          boxShadow: "none",
          overflow: "visible",
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDetailPost?.();
        }}
      >
        <PostHeader
          post={post}
          onEdit={() => {}}
          onDelete={() => {}}
          showMenu={false} // Tắt menu 3 chấm vì đây là view admin xử lý report
        />

        {post.caption && (
          <PostCaption
            caption={post.caption}
            maxChars={280}
            onExpand={onDetailPost}
          />
        )}

        <MediaGrid media={post.media} onMediaClick={openLightbox} />
        
        {post.shared_post && (
          <SharedPost
            sharedPost={post.shared_post}
            onDetailPost={onDetailPost}
            onMediaClick={openLightbox}
          />
        )}
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