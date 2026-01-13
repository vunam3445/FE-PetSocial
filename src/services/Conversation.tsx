import api from '../lib/axios';

export const getMemberConversation = async(conversationId: string)=>{
    const url = `/conversations/${conversationId}/members`;
    const res = await api.get(url);
    return res;
}

export const getMembersOfAdd = async(conversationId: string, page: number)=>{
    const url = `/conversations/${conversationId}/add-members?page=${page}`;
    const res = await api.get(url);
    return res;
}

export const addMembers = async (conversationId: string, userIds: string[]) => {
    const url = `/conversations/${conversationId}/add-members`;
    const res = await api.post(url, { 
        userIds: userIds 
    });
    return res;
}

export const deleteMemberOfConversation = async(conversationId: string, targetId: string)=>{
    const url = `/conversations/${conversationId}/members/${targetId}`;
    const res = await api.delete(url);
    return res.data;
}

export const readConversation = async(conversationId: string)=>{
    const url = `/conversations/${conversationId}/read`;
    const res = await api.put(url);
    return res;
}


export const searchConversations = async (keyWord: string) => {
    const url = `/search/conversations`;
    const res = await api.get(url, { 
        params: { keyword: keyWord } 
    });
    return res; 
}

export const updateConversation = async (conversationId: string, conversationName: string, avatarFile: File|null) => {
    try {
        // 1. Sử dụng FormData để gửi file
        const formData = new FormData();
        
        if (conversationName) {
            formData.append('name', conversationName);
        }
        
        if (avatarFile) {
            formData.append('avatar', avatarFile);
        }

        // Vì Laravel đôi khi gặp vấn đề khi nhận file qua PUT thuần túy,
        // chúng ta dùng POST và giả lập PUT bằng _method.
        formData.append('_method', 'PUT');

        const response = await api.post(`/conversations/${conversationId}/updateInfo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        return response.data;
    } catch (error) {
        console.error("Lỗi cập nhật conversation:", error.response?.data || error.message);
        throw error.response?.data;
    }
}