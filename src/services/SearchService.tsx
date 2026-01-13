import api from "../lib/axios";

export const searchRequestJoinGroup = async (
  groupId: string,
  keyword: string,
  page: number
) => {
  const url = `/search/join-group-requests/${groupId}?page=${page}`;
  return api.get(url, {
    params: { keyword },
  });
};

export const searchUsersOfGroup = async (
  groupId: string,
  keyword: string
) => {
  const url = `/search/groups/${groupId}/users`;
  return api.get(url, {
    params: { keyword },
  });
};
