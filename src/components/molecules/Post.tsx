
import { useState } from "react";
import { Card } from "@mui/material";
import { useParams } from "react-router-dom";
import useUserId from "../../hooks/auth/useUserId";
import { useLike } from "../../hooks/posts/useLike";
import PostLightboxModal from "../modals/PostLightboxModal";
import { PostHeader } from "../atoms/PostHeader";
import { MediaGrid } from "../atoms/MediaGrid";
import { SharedPost } from "./PostShare";
import { PostActions } from "../atoms/PostActions";
import { PostCaption } from "../atoms/PostCaption";
import type { Media , Post} from "../../types/ResponsePost";
export interface PostProps {
  post: Post;
  onEditPost: () => void;
  onDeletePost: () => void;
  onDetailPost: () => void;
  onError?: (msg: string) => void;
  onSharePost: () => void;
}

const Post = ({
  post,
  onEditPost,
  onDeletePost,
  onDetailPost,
  onError,
  onSharePost,
}: PostProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [liked, setLiked] = useState(post.is_liked === 1);
  const [likesCount, setLikesCount] = useState(post.likes_count ?? 0);

  const { id } = useParams();
  const isOwner = useUserId(id);
  const { toggleLike, error } = useLike();

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await toggleLike(post.post_id);

      if (res === true || res === 1) {
        setLiked(true);
        setLikesCount((prev) => prev + 1);
      } else {
        setLiked(false);
        setLikesCount((prev) => Math.max(prev - 1, 0));
      }
    } catch (err: any) {
      if (err.response?.status === 429) {
        onError?.("Bạn đã thực hiện quá nhiều lần, vui lòng thử lại sau!");
      } else {
        onError?.("Có lỗi xảy ra, vui lòng thử lại.");
        console.error(error);
      }
    }
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDetailPost?.();
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSharePost?.();
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
          onEdit={onEditPost}
          onDelete={onDeletePost}
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

        <PostActions
          liked={liked}
          likesCount={likesCount}
          commentsCount={post.comments_count}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
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

export default Post;