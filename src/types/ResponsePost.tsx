export type Media = {
  id: string | null; // nếu BE không trả thì có thể để optional: id?: string
  media_id: string;
  post_id: string;
  media_url: string;
  media_type: "image" | "video";
  order: number;
  created_at: string;
  updated_at: string;
};

export type Author = {
  user_id: string;
  name: string;
  avatar_url: string;
};

export type Tag = {
  tag_id: string;
  name: string;
  created_at: string;
  updated_at: string;
  pivot: {
    post_id: string;
    tag_id: string;
    created_at: string;
    updated_at: string;
  };
};

export type Post = {
  post_id: string;
  author_id: string;
  caption: string | null;
  visibility: "public" | "friends" | "private";
  shared_post_id: string | null;
  group_id: string | null;
  created_at: string;
  updated_at: string;

  media: Media[];
  author: Author;
  tags: Tag[];

  likes_count: number;
  is_liked: number;
  comments_count: number;

  // 👇 thêm post gốc khi share
  shared_post?: Post | null;
};

export type PaginationMeta = {
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  per_page: number;
  to: number;
  total: number;
};

export type PaginatedPostsResponse = {
  posts: {
    current_page: number;
    data: Post[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: { url: string | null; label: string; active: boolean }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
};
