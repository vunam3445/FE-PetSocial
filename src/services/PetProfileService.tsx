import api from "../lib/axios";

export const getPetInfo = async (petId: string) => {
  const url = `/pets/${petId}`;
  const response = await api.get(url);
  return response.data;
};

export const getPetHealthCategories = async (petId: string) => {
  const url = `/health-categories/${petId}`;
  const response = await api.get(url);
  return response.data;
}

export const getHealthCategories = async (species: string) => {
  const url = `/health-categories/species/${species}`;
  const response = await api.get(url);
  return response.data;
}

export const getPetHealthLog = async (petId: string) =>{
  const url = `/pet-health-logs/pet/${petId}`;
  const response = await api.get(url);
  return response.data;
}

export const createHealthLog = async (data: any) => {
  const url = `/health-categories`;
  const response = await api.post(url, data);
  return response.data;
}

export const createPetHealthLog = async (data: any) => {
  const url = `/pet-health-logs`;
  
  // Kiểm tra nếu có file thì dùng FormData
  if (data.image_file) {
    const formData = new FormData();
    // Duyệt qua tất cả các key để append vào FormData
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    const response = await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  // Nếu không có file, gửi JSON như bình thường
  const response = await api.post(url, data);
  return response.data;
};

export const deleteHealthCategory = async (categoryId: string) => {
  const url = `/health-categories/${categoryId}`;
  const response = await api.delete(url);
  return response.data;
}

export const updateHealthCategory = async (categoryId: string, data: any) => {
  const url = `/health-categories/${categoryId}`;
  const response = await api.put(url, data);
  return response.data;
}

export const deletePetHealthLog = async (logId: string) => {
  const url = `/pet-health-logs/${logId}`;
  const response = await api.delete(url);
  return response.data;
}

// services/PetProfileService.ts

export const updatePetHealthLogService = async (logId: string, allData: any) => {
  const formData = new FormData();

  Object.keys(allData).forEach((key) => {
    // 1. Nếu có file 'image' mới, ta bỏ qua trường 'image_url' (đang là link blob)
    if (key === "image_url" && allData["image"]) return;
    
    // 2. Không gửi lại các trường hệ thống không cần thiết (tùy chọn)
    if (key === "created_at" || key === "updated_at") return;

    // 3. Append dữ liệu
    if (allData[key] !== null && allData[key] !== undefined) {
        // Nếu allData['image'] là File, FormData sẽ tự động xử lý binary
        formData.append(key, allData[key]);
    }
  });

  formData.append("_method", "PUT");

  const response = await api.post(`/pet-health-logs/${logId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};

export const getAllPostsOfPet = async (petId: string, limit?:number, page?: number) => {
  const url = `/pets/${petId}/posts`+ (page ? `${limit ? '&' : '?'}page=${page}` : '');
  const response = await api.get(url);
  return response.data;
}
export const followPet = async (petId: string) => {
  const url = `/pets/${petId}/follow`;
  const response = await api.post(url);
  return response.data;
}
export const unfollowPet = async (petId: string) => {
  const url = `/pets/${petId}/follow`;
  const response = await api.delete(url);
  return response.data;
}