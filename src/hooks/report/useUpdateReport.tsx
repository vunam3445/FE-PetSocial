import { updateReportStatus } from "../../services/ReportService";
import { useState } from "react";

export const useUpdateReport = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    /**
     * @param reportIds: Mảng các ID báo cáo cần cập nhật status (VD: ['id1', 'id2'])
     * @param status: Trạng thái mới ('resolved' | 'dismissed')
     */
    const changeStatus = async (reportIds: string[], status: string) => {
        setLoading(true);
        setError(false);
        try {
            // Gọi hàm service mới nhận vào mảng IDs
            const res = await updateReportStatus(reportIds, status);
            
            // Thông thường Axios trả về 200 hoặc 204 cho cập nhật thành công
            if (res.status === 200 || res.status === 204) {
                return res.data;
            }
        } catch (e: unknown) {
            console.error("Update status error:", e);
            setError(true);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, setError, changeStatus };
}