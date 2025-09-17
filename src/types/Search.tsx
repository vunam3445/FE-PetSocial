// Kết quả 1 user trong search
export interface UserSearchResult {
  user_id: string;
  name: string;
  email: string;
  avatar_url: string;
  cover_url: string;
  bio: string | null;
  date_of_birth: string; // ISO date string, ví dụ "2025-09-01"
  gender: string;
  created_at: string;
  updated_at: string;
  followers_count: number;
  is_followed: boolean;
}

// Kiểu phân trang chung từ Laravel
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

// Response cho search users
export type SearchUsersResponse = PaginatedResponse<UserSearchResult>;


// PetSearchResult.ts
export interface PetSearchResult {
  pet_id: string;
  name: string;
  avatar_url: string | null;
  owner_id: string;
  breed: string;
  type: string;
  is_following: boolean;
}
