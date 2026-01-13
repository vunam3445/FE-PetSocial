import { updateRequest } from "../../services/QuestionAnswer";
import { useState } from "react";

export const useUpdateStatusRequestJoinGroup = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>();
    const updateStatus = async(id:number, data:any)=>{
        setLoading(true);
        setError('');
        try{
            const res = await updateRequest(id, data);
            return res.data;
        }catch(e:unknown){
            setError("Có lỗi xảy ra khi duyệt thành viên");
            console.log(e);
            throw e;
        }finally{
            setLoading(false);
        }
    }
    return { loading, error, updateStatus};
}