import { deleteQuestion } from "../../services/QuestionAnswer";
import { useState } from "react";

export const useDeleteQuestion = () =>{ 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteQuest = async (question_id:number ) =>{

        try {
            setLoading(true);
            setError(null);
            const response = await deleteQuestion(question_id);
            if(response.status===200){
                return true;
            }
            
        }catch(e:unknown){
            setError("Có lỗi xảy ra vui lòng thử lại sau");
            console.log("fail delete ",e);
            throw e;

        }finally{
            setLoading(false);
        }
    }
    const resetError = ()=>{setError(null)};
    return {loading, error, deleteQuest, resetError};

}