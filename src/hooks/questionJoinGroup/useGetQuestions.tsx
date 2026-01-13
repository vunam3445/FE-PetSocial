import { getQuestions } from "../../services/QuestionAnswer";
import { useEffect, useState } from "react";
import type { GroupJoinQuestion } from "../../types/QuestionAndAnswer";

export const useGetQuestion = (group_id: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<GroupJoinQuestion[]>([]);

  useEffect(() => {
    if (!group_id) return;

    let isMounted = true; // ngăn lỗi setState khi component unmount

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getQuestions(group_id);

        if (isMounted && response.status === 200 && response.data) {
          setQuestions(response.data.data);
        }
      } catch (e: any) {
        if (isMounted) {
          setError("Có lỗi xảy ra vui lòng thử lại sau");
        }
        console.log(e.message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [group_id]);
  const resetError = ()=>{setError(null)};
  return { loading, error, questions, resetError, setQuestions};
};
