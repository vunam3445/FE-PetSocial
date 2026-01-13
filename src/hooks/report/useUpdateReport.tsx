import { updateReport } from "../../services/ReportService";
import { useState } from "react";

export const useUpdateReport = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState(false);

    const changeStatus = async (reportId: string,status: string)=>{
        setLoading(true);
        setError(false);
        try{
            const data = {status: status};
            const res = await updateReport(reportId,data);
            if(res.status ===200){
                return res.data;
            }
        }catch(e: unknown){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    return {loading, error, setError, changeStatus};
}