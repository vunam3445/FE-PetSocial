export type PetInfo = {
  pet_id: string;          // UUID của thú cưng
  user_id: string;         // ID người dùng sở hữu
  name: string;            // Tên thú cưng
  type: string;            // Loài (Dog, Cat, Lizard, Bird, v.v.)
  breed: string;           // Giống (Leopard Gecko, Husky, Persian, ...)
  followers_count: number; // Số người theo dõi
  is_following: boolean;   // Người dùng hiện tại có theo dõi thú cưng này không
  gender: 'male' | 'female' | 'unknown'; // Giới tính
  birthday: string;        // Ngày sinh (ISO date string)
  avatar_url: string;      // URL ảnh đại diện của thú cưng
  created_at: string;      // Thời gian tạo bản ghi
  updated_at: string;      // Thời gian cập nhật bản ghi
};


export interface PetHealthCategory {
  category_id: string;
  user_id: string | null;
  name: string;
  description: string;
  applicable_species: string[];
  created_at: string | null;
  updated_at: string | null;
}

// Mảng chứa nhiều category
export type PetHealthCategoryList = PetHealthCategory[];


export interface HealthLog {
  log_id: string;
  pet_id: string;
  category_id: string;
  title: string;
  description: string | null;
  value: string | null;
  image_url: string | null;
  recorded_at: string; // YYYY-MM-DD
  created_at: string | null;
  updated_at: string | null;
}

export interface HealthCategory {
  category_id: string;
  user_id: string | null;
  name: string;
  description: string | null;
  applicable_species: string[]; // ["dog", "cat", ...]
  interval_days: number | null;
  unit: string | null;
  category_type: string;
  created_at: string | null;
  updated_at: string | null;
  health_logs: HealthLog[];
}
export type HealthCategoryList = HealthCategory[];

