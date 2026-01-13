import { changeStatusPost } from "../../services/PostService";
import { useState } from "react";

export const useChangeStatusPost = ()=>{
    const [ loading, setLoading] = useState(false);
    const [ error, setError] = useState(false);
    const changeStatus = async (postId: string , status: string)=>{
        setLoading(true);
        setError(false);
        try{
            const data = {status: status}
            const res = await changeStatusPost(postId,data);
            return res;
        }catch(e: unknown){
            setError(true);
            console.log(e);
            throw e;
        }finally{
            setLoading(false);
        }
    }
    return {loading, error, changeStatus, setError};
}