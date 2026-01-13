export interface GroupJoinQuestion {
  id: number;
  group_id: string;
  question: string;
  created_at: string;
  updated_at: string;
}
export interface JoinGroupRequest {
  group_id: string;
  answers?: JoinGroupAnswer[];
}

export interface JoinGroupAnswer {
  question_id: string;
  answer: string;
}
export interface JoinRequestQuestion {
  question_id: number;
  question: string;
  answer: string | null; // phòng trường hợp không có trả lời
}

export interface JoinRequest {
  request_id: number;
  user_id: string;
  name: string;
  avatar_url: string;
  status: "pending" | "approved" | "declined";
  created_at: string; // có thể dùng Date nếu muốn parse
  questions: JoinRequestQuestion[];
}

export interface PaginatedJoinRequests {
  data: JoinRequest[];
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
