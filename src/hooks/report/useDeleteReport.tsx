import { deleteReport } from "../../services/ReportService";
import { useState } from "react";

export const useDeleteReport = ()=>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const reject = async(reportId: string)=>{
        setLoading(true);
        setError(false);
        try{
            const res = await deleteReport(reportId);
            if(res){
                return res.data;
            }
        }catch(e: unknown){
            console.log(e);
            setError(true);
        }finally{
            setLoading(false);
        }
    }
    return { loading, error, setError, reject};
}