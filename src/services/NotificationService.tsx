import api from '../lib/axios';

export const getMyNotification = async(userId: string, page: number)=>{
    const url = `/notifications/${userId}?page=${page}`;
    const res = await api.get(url);
    return res;
}

export const readNotification = async (notificationId: string)=>{
    const url = `/notifications/${notificationId}/read`;
    const res = await api.put(url);
    return res;
}

export const handleInviteAction = async(notificationId: string, status: string)=>{
    const url = `/notifications/handleInvitation`;
    const res = await api.post(url, {
        notificationId: notificationId,
        status: status
    });
    return res;
}