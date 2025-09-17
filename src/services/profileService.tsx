import api from "../lib/axios";

export const getUser = async (userId: string) => {
  const url = `/profile/${userId}`;
  const response = await api.get(url);
  return response.data;
};

