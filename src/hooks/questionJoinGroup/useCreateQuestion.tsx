import { createQuestion } from "../../services/QuestionAnswer";
import { useState } from "react";

export const useCreateQuestion =()=>{
    const [ loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const create = async (groupId: string, question: string)=>{
        setLoading(true);
        setError(null);
        try{
            const res= await createQuestion(groupId, question);
            if(res.data){
                return res.data;
            }
        }catch(e:unknown){
            setError('Có lỗi xảy ra vui lòng thử lại sau');
            console.log(e.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading, error, create};
}