export interface SubmitComment {
  content: string;
  parent_id?: string | null;
}
export interface Comment {
  comment_id: string;
  post_id: string;
  parent_id: string | null;
  user: {
    user_id: string;
    name: string;
    avatar_url: string;
  };
  content: string;
  created_at: string;
  updated_at: string;
}


export type UserRes = {
  user_id: string;
  name: string;
  avatar_url: string;
};

export type ReplyRes = {
  comment_id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  user: UserRes;
};

export type ReplyPagination = {
  current_page: number;
  data: ReplyRes[];
  last_page: number;
  per_page: number;
  total: number;
};

export type CommentRes = {
  comment_id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  created_at: string;
  updated_at: string;
  replies_count: number; // ✅ có trong API
  user: UserRes;
  isPending?: boolean; // 👈 thêm flag để UI biết comment đang trong trạng thái chờ
};

export type CommentResponse = {
  current_page: number;
  data: CommentRes[];
  last_page: number;
  per_page: number;
  total: number;
};
