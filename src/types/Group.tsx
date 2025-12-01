export interface Group {
  group_id: string;
  name: string;
  description: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  visibility: "public" | "private"; // hoặc string nếu bạn muốn mở rộng
  require_post_approval?: boolean;
  created_by: string;
  created_at: string;   // hoặc Date
  updated_at: string;   // hoặc Date
}

export interface GroupWithMemberRole {
  group: Group;
  member_role: string;   // hoặc union type nếu bạn muốn strict
  member_status: string; // như trên
  total_members: number;
}

export interface UpdateGroupData {
  name?: string;
  description?: string;
  avatar?: File;
  cover?: File;
  visibility?: "public" | "private";
  require_post_approval?: boolean;
}

export type Member = {
  user_id: string;
  name: string;
  avatar_url: string;
  role: string; // Enum role
  status?: string; // Enum status
  joined_at: string; // ISO date string
};

export interface PaginatedMembersResponse {
      current_page: number;
      data: Member[];
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
}