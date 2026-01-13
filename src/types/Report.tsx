export interface ReportData {
  reason: string;
  description: string;
}

export interface ReportItem {
  report_id: string;
  post_id: string;
  reported_by: string;
  reason: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  handled_by: string | null;
  handled_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  reports_count: number;
  comments_count: number;
  likes_count: number;
  is_liked: number;
  is_owner: boolean;
  post: Post;
}
export interface Post {
  post_id: string;
  author_id: string;
  pet_id: string | null;
  caption: string;
  visibility: "public" | "friends" | "private";
  shared_post_id: string | null;
  group_id: string | null;
  status: "approved" | "pending" | "rejected";
  created_at: string;
  updated_at: string;
  media: Media[];
  author: User;
  shared_post: Post | null;
}
export interface Media {
  media_id: string;
  post_id: string;
  url: string;
  type: "image" | "video";
}
export interface User {
  user_id: string;
  name: string;
  avatar_url: string;
}
