import { createReport } from "../../services/ReportService";
import { useState } from "react";

export const useCreateReport = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const create = async(data: any)=>{
        setLoading(true);
        setError(false);
        try{
            const res = await createReport(data);
            if(res.status===201){
                return res.data;
            }
        }catch(e: unknown){
            console.log(e);
            setError(true);
            throw e;
        }finally{
            setLoading(false);
        }
    }

    return {loading, error, setError, create};
}