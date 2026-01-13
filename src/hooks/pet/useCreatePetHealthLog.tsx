import { createPetHealthLog } from "../../services/PetProfileService";
import { useState } from "react";
export const useCreatePetHealthLog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const createPetLog = async (data:any) =>{
        try{
            setLoading(true);
            setError(null);
            const response = await createPetHealthLog(data);
            return response;
        }catch(err){
            setError(err as Error);
            throw err;
        }finally{
            setLoading(false);
        }
    }
    return { createPetLog, loading, error };

}