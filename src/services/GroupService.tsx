import api from "../lib/axios";
import type { Group } from "../types/Group";
export const CreateGroup = async (name: string, visibility: string, created_by: string) => {
  const url = `/groups`;
  const data = { name, visibility, created_by };
    const response = await api.post(url, data);
    return response.data;
};

export const GetGroupsByUser = async (userId: string,page:number) => {
  const url = `/users/${userId}/groups?page=${page}`;
    const response = await api.get(url);
    return response.data;
}

export const GetGroupOfUserAttend = async (userId: string,page:number) => {
  const url = `/users/${userId}/groups-attended?page=${page}`;
    const response = await api.get(url);
    return response.data;
}

export const GetGroupById = async (groupId: string) => {
  const url = `/groups/${groupId}`;
    const response = await api.get(url);
    return response.data;
}

export const UpdateGroupInfo = async (group_id: string, updateData: FormData): Promise<Group> => {
  // 1. Thêm method spoofing vào body thay vì URL
  updateData.append("_method", "PUT");
  // 2. Gửi request bằng POST, URL sạch, thêm header (dù axios thường tự nhận diện)
  const response = await api.post<Group>(
      `/groups/${group_id}`, // Bỏ ?_method=PUT ở đây
      updateData,
      {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      }
  );
  return response.data;
};

export const DeleteGroup = async (group_id: string)=>{
  const url = `/groups/${group_id}`;
  const response = api.delete(url);
  return response;
}

export const GetMembers = async (group_id: string, page=1 ) => {
  const url = `groups/${group_id}/members?page=${page}`;
  const response= api.get(url);
  return response;
}

export const GetJoinRequests = async (groupId: string, page: number = 1) => {
  return await api.get(`/groups/${groupId}/joinRequests?page=${page}`);
};
