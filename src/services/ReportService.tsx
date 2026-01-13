import api from "../lib/axios";

export const createReport = async(data: any)=>{
    const url = `/reports`;
    const res = api.post(url, data);
    return res;
}

export const updateReport = async(reportId: string,data: any)=>{
    const url = `/reports/${reportId}`;
    const res = api.put(url, data);
    return res;
}   

export const deleteReport = async(reportId: string) =>{
    const url = `/reports/${reportId}`;
    const res = api.delete(url);
    return res;
}

export const getReportOfGroup= async(groupId: string,page: number)=>{
    const url = `/reports/groups/${groupId}?page=${page}`;
    const res = api.get(url);
    return res;
}