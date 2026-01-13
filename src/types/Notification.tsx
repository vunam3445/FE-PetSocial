// 1. Định nghĩa các interface riêng cho từng loại nội dung
export interface NewPostData {
    type: 'new_post';
    post_id: string;
    author_name: string;
    avatar_url: string;
    message: string;
    target_url: string;
}
export interface NewPostOfPetData {
    type: 'new_post_of_pet';
    post_id: string;
    pet_id: string;
    author_name: string;
    avatar_url: string;
    message: string;
    target_url: string;
}




// Interface cho dữ liệu bên trong của thông báo "Vào nhóm thành công"
export interface GroupJoined {
    group_id: string;
    group_name: string; // Tên của Group
    avatar_url: string;  // Avatar của Group
    message: string;     // "Bạn đã được chấp nhận vào nhóm..."
    target_url: string;  // "/groups/uuid-cua-nhom"
    type: 'group_accepted';
    created_at: string;
}

// Interface cho dữ liệu bên trong của thông báo "Bị xóa khỏi nhóm"
export interface GroupKicked {
    group_id: string;
    group_name: string; // Tên của Group
    avatar_url: string;  // Avatar của Group
    message: string;     // "Bạn đã bị xóa khỏi nhóm..."
    target_url: string;  // "/groups"
    type: 'group_kicked';
    created_at: string;
}
export interface GroupRejected {
    group_id: string;
    group_name: string; // Tên của Group
    avatar_url: string;  // Avatar của Group
    message: string;     // "Bạn đã bị xóa khỏi nhóm..."
    target_url: string;  // "/groups"
    type: 'group_rejected';
    created_at: string;
}
// 2. Gộp lại thành một Union Type để TypeScript có thể gợi ý (IntelliSense)
export type NotificationData = NewPostData | GroupRejected | PostDeletedViolation | NewPostOfPetData | GroupJoined | GroupKicked | ConversationInvitationData | ConversationKickedData
    | HealthReminderData
;

export interface NotificationItem {
    id: string; // Laravel UUID
    type: string; // Tên Class Backend (App\Notifications\...)
    notifiable_type: string;
    notifiable_id: string;
    data: NotificationData; // Dữ liệu đã định nghĩa ở trên
    read_at: string | null;
    created_at: string;
    updated_at: string;
}
export interface PostDeletedViolation {
    author_name: string;   // Tên của Group hoặc "Hệ thống"
    avatar_url: string | null; // Avatar của Group (để hiển thị icon nhóm)
    message: string;      // "Bài viết của bạn đã bị xóa do vi phạm quy chuẩn..."
    target_url: string;   // Dẫn về trang danh sách Group hoặc trang chủ
    type: 'post_deleted_violation';
    created_at: string;
}
export interface NotificationResponse {
    data: NotificationItem[];
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    unread_count: number;
}
// Interface cho dữ liệu mời vào cuộc trò chuyện/nhóm chat
export interface ConversationInvitationData {
    type: 'conversation_invitation';
    conversation_id: string;
    conversation_name: string;
    avatar_url: string | null; // Avatar của cuộc trò chuyện hoặc người mời
    inviter_id: string;
    inviter_name: string;
    message: string;
    target_url?: string; // Có thể có hoặc không tùy logic điều hướng
    created_at: string;
    status: string;
}

// Interface cho dữ liệu thông báo khi bị xóa khỏi cuộc trò chuyện/nhóm chat
export interface ConversationKickedData {
    type: 'conversation_kicked';
    conversation_id: string;
    conversation_name: string;
    avatar_url: string | null;  // Ảnh đại diện của cuộc trò chuyện
    admin_name: string;         // Tên Admin đã thực hiện xóa
    message: string;            // "Bạn đã bị quản trị viên... xóa khỏi nhóm..."
    target_url: string;         // Thường là chuỗi rỗng hoặc link về trang danh sách chat
    created_at: string;
}
// Interface cho dữ liệu nhắc nhở lịch sức khỏe thú cưng
export interface HealthReminderData {
    type: 'health_reminder';
    pet_id: string;
    pet_name: string;
    avatar_url: string | null;  // Hình ảnh của thú cưng
    category_id: string;
    category_name: string;      // Tên hạng mục (VD: Tiêm phòng, Tẩy giun)
    due_date: string;           // Ngày đến hạn (YYYY-MM-DD)
    message: string;            // Nội dung thông báo đầy đủ
    created_at: string;
    status: 'unread' | 'read';
}