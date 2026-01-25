
export interface ReportedPost {
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
  
  // Các trường computed từ Repository
  reports_count: number;
  comments_count: number;
  likes_count: number;
  is_liked: number; // Backend trả về 0 hoặc 1
  is_owner: boolean;

  // Quan hệ
  media: Media[];
  author: User;
  shared_post: ReportedPost | null;
  reports: ReportDetail[]; // Mảng các báo cáo chi tiết cho bài viết này
}
export interface ReportedPostsResponse {
  data: ReportedPost[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
export interface User {
  user_id: string;
  name: string;
  avatar_url: string;
}

export interface Media {
  media_id: string;
  post_id: string;
  media_url: string;
  media_type: "image" | "video"; // API trả về media_type
  order: number;
  created_at: string;
  updated_at: string;
}
export interface ReportDetail {
  report_id: string;
  reportable_id: string;
  reportable_type: string; // "App\\Models\\Post"
  reason: string;
  description: string | null;
  created_at: string;
}