import { updateQuestion } from "../../services/QuestionAnswer";
import { useState } from "react";
export const useUpdateQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatedata = async(id: number, newQuestion: string) => {
    try {
      setLoading(true);
      const response = await updateQuestion(id, newQuestion);
      return response.data;
    }catch(e){
        setError("Có lỗi xảy ra vui lòng thử lại sau");
        throw e;
    }
     finally {
      setLoading(false);
    }
  }

  return { loading, error, updatedata };
};
