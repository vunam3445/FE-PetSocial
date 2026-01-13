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
  const response = await api.post(url, data);
  return response.data;
}

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

export const updatePetHealthLog = async (logId: string, data: any) => {
  const url = `/pet-health-logs/${logId}`;
  const response = await api.put(url, data);
  return response.data;
}

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