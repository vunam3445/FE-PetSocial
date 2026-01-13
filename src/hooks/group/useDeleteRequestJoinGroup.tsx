import { deleteRequest } from "../../services/QuestionAnswer";
import { useState } from "react";

export const useDeleteRequestJoinGroup = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const deleteRequestJoinGroup = async(groupId: string)=>{
        setLoading(true);
        setError(false);
        try{
            const res = await deleteRequest(groupId);
            if(res.status === 200){
                return res;
            }
        }catch(e: unknown){
            setError(true);
            console.log(e);

        }finally{
            setLoading(false);
        }
    }

    return {loading, error, setError, deleteRequestJoinGroup};
}