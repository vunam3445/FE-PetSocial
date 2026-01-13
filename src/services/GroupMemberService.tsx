import api from "../lib/axios";

export const deleteMember= async(group_id: string, user_id: string)=>{
    const url = `/groups/${group_id}/members/${user_id}`;
    const res = api.delete(url);
    return res;
}