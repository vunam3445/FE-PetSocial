import api from '../lib/axios';
import type { JoinGroupRequest } from '../types/QuestionAndAnswer';

export const createQuestion = async(group_id: string,question: string)=>{
    const url = `/groups/questions`;
    const data = {group_id, question};
    const response = api.post(url, data);
    return response;
}
export const getQuestions = async(group_id: string)=>{
    const url = `/groups/${group_id}/questions`;
    const response = api.get(url);
    return response;
}

export const updateQuestion = async(id:number, question:string)=>{
    const data = {id,question};
    const url = `/groups/questions/${id}`;
    const response = api.put(url, data);
    return response;
}

export const deleteQuestion = async(id:number)=>{
    const url = `/groups/questions/${id}`;
    const response = api.delete(url);
    return response;
}

export const submitAnwer = async(data: JoinGroupRequest) =>{
    const url = `/groups/${data.group_id}/joinGroup`;
    const response = api.post(url, data);
    return response;
}

export const updateRequest= async(id:number, data:any)=>{
    const url = `/requests/${id}`;
    const response = api.put(url, data);
    return response;
}
export const deleteRequest = async(groupId: string)=>{
    const url =`/requests/${groupId}`;
    const res = api.delete(url);
    return res;
}
