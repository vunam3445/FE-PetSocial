import { deleteReportsBulk } from "../../services/ReportService";
import { useState } from "react";

export const useDeleteReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * @param reportIds: Mảng các ID báo cáo cần xóa (VD: ['uuid-1', 'uuid-2'])
   */
  const reject = async (reportIds: string[]) => {
    setLoading(true);
    setError(false);
    try {
      // Gọi hàm service đã sửa để sử dụng api.request({ method: 'DELETE', data: ... })
      const res = await deleteReportsBulk(reportIds);
      
      if (res) {
        return res.data;
      }
    } catch (e: unknown) {
      console.error("Bulk delete reports error:", e);
      setError(true);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, reject };
};