export interface MediaFile {
  file: File;
  type: "image" | "video";
  order?: number;
}

export interface SubmitData {
  caption?: string;
  visibility?:string;
  shared_post_id?: string;
  group_id?: string;
  media?: MediaItem[];
}
// types/Post.ts
export interface MediaItem {
  id:string;
  media_id?:string;
  post_id?:string;

  file?: File;         // khi upload mới
  media_url?: string;        // khi load từ server

  media_type: 'image' | 'video';
  order?: number;     // thứ tự hiển thị
  created_at?: string;
  updated_at?: string;
}
