import { createPetHealthLog } from "../../services/PetProfileService";
import { useState } from "react";
export const useCreatePetHealthLog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPetLog = async (data: any) => {
        try {
            setLoading(true);
            setError(null);
            const response = await createPetHealthLog(data);
            return response;
        } catch (err: any) {
            // 1. Lấy thông báo lỗi từ backend trả về
            const serverMessage = err.response?.data?.message;
            const validationErrors = err.response?.data?.errors;

            let finalMessage = "Đã có lỗi xảy ra vui lòng thử lại.";

            if (validationErrors) {
                // Nếu có lỗi validation chi tiết, lấy lỗi đầu tiên của trường đầu tiên
                const firstErrorField = Object.keys(validationErrors)[0];
                finalMessage = validationErrors[firstErrorField][0];
            } else if (serverMessage) {
                // Nếu chỉ có message chung
                finalMessage = serverMessage;
            }

            setError(finalMessage);
            console.error('Chi tiết lỗi:', err.response?.data);
            
            throw err; // Tiếp tục throw để component gọi hook có thể xử lý nếu cần
        } finally {
            setLoading(false);
        }
    }

    return { createPetLog, loading, error };
}