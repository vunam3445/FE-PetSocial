
import { useState } from "react";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import useUserId from "../../hooks/auth/useUserId";
import PostLightboxModal from "../modals/PostLightboxModal";
import { PostHeader } from "../atoms/PostHeader";
import { MediaGrid } from "../atoms/MediaGrid";
import { SharedPost } from "./PostShare";
import { PostCaption } from "../atoms/PostCaption";
import type { Media , Post} from "../../types/ResponsePost";
export interface PostProps {
  post: Post;
  onDetailPost: () => void;
}

export const PostReport = ({
  post,
  onDetailPost,
  
}: PostProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { id } = useParams();
  const isOwner = useUserId(id);

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
        onClick={() => onDetailPost?.()}
      >
        <PostHeader
          post={post}
          isOwner={isOwner}
          onEdit={()=>{}}
          onDelete={()=>{}}
        />

        {post.caption && (
          <PostCaption
            caption={post.caption || ""}
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

