import { DeleteGroup } from "../../services/GroupService";
import { useState } from "react";

export const useDeleteGroup = () =>{ 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const deleteGroup = async (group_id:string ) =>{

        try {
            setLoading(true);
            setError(null);
            const response = await DeleteGroup(group_id);
            if(response.status==='200'){
                return response;
            }
            
        }catch(e:unknown){
            setError(e || "Có lỗi xảy ra vui lòng thử lại sau");
            console.log("fail delete ",e);

        }finally{
            setLoading(false);
        }
    }
    const resetError = ()=>{setError(null)};
    return {loading, error, deleteGroup, resetError};

}