export interface MediaFile {
  file: File;
  type: "image" | "video";
  order?: number;
}

export interface SubmitData {
  caption?: string;
  visibility?: "public" | "private" | "friends";
  shared_post_id?: string;
  group_id?: string;
  media?: MediaFile[];
}
// types/Post.ts
export interface MediaItem {
  file?: File;         // khi upload mới
  url?: string;        // khi load từ server
  type: 'image' | 'video';
}
