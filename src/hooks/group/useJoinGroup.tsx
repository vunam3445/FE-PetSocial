import { submitAnwer } from "../../services/QuestionAnswer";
import { useState } from "react";
import type { JoinGroupRequest } from "../../types/QuestionAndAnswer";

export const useJoinGroup = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const submitData = async(data:JoinGroupRequest)=>{
        setLoading(true);
        setError(false);
        try{
            const response = await submitAnwer(data);
            if(response.data){
                return response.data;
            }
        }catch(e){
            console.log(e);
            setError(true);
            throw e;
        }finally{
            setLoading(false);
        }
    }
    return { loading, error, submitData, setError};
}