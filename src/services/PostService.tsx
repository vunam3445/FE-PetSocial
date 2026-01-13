import api from "../lib/axios";

export const getPostsOfGroup=(groupId: string, page: number)=>{
    const url = `/groups/${groupId}/posts?page=${page}`;
    const res = api.get(url);
    return res;
}

export const getPostsPendingOfGroup = (groupId: string, page: number)=>{
    const url = `/groups/${groupId}/postsPending?page=${page}`;
    const res = api.get(url);
    return res;
}

export const changeStatusPost=(postId: string, data: any)=>{
    const url = `/posts/${postId}/groups`;
    const res = api.put(url, data);
    return res;
}