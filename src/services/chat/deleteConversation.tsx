import api from '../../lib/axios';


export const deleteConversation = async(conversationId: string)=>{
    const url = `/conversations/${conversationId}`;
    const res = await api.delete(url);
    return res
}