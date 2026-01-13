import { deleteMember } from "../../services/GroupMemberService";
import { useState } from "react";

export const useDeleteGroupMember = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const deleteGroupMember = async (group_id: string, user_id : string)=>{
        setLoading(true);
        setError(null);
        try{
            const res = await deleteMember(group_id, user_id);
            return res;
        }catch(e: unknown){
            setError("Xóa thành viên khỏi nhóm thất bại, vui lòng thử lại sau");
            throw e;
        
        }finally{
            setLoading(false);
        }
    }
    return { loading, error, deleteGroupMember};
};
