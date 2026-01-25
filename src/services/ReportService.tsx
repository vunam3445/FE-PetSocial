import api from "../lib/axios";

export const createReport = async(data: any)=>{
    const url = `/reports`;
    const res = api.post(url, data);
    return res;
}

export const updateReportStatus = async (reportIds: string[], status: string) => {
    const url = `/reports/update-status`; // Tạo route mới để xử lý hàng loạt
    return await api.put(url, { 
        report_ids: reportIds, 
        status: status 
    });
}

export const deleteReportsBulk = async (reportIds: string[]) => {
    const url = `/reports/bulk-delete`;
    
    return await api.delete(url, { 
        data: { 
            report_ids: reportIds 
        } 
    } as any); // Ép kiểu để TypeScript không bắt bẻ trường 'data'
}

export const getReportOfGroup= async(groupId: string,page: number)=>{
    const url = `/reports/groups/${groupId}?page=${page}`;
    const res = api.get(url);
    return res;
}