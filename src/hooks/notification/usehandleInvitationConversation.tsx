import { useState } from "react";
import { handleInviteAction } from "../../services/NotificationService";
export const useHandleInvitation = () => {
    const [isProcessing, setIsProcessing] = useState<string | null>(null); // Lưu ID của thông báo đang xử lý
    const [actionError, setActionError] = useState<string | null>(null);

    const executeHandleInvitation = async (
        notificationId: string, 
        status: 'accepted' | 'rejected',
        onSuccess?: (status: 'accepted' | 'rejected') => void
    ) => {
        setIsProcessing(notificationId);
        setActionError(null);

        try {
            const response = await handleInviteAction(notificationId, status);
            
            if (response.data.status === 'success') {
                if (onSuccess) onSuccess(status);
                return true;
            }
            return false;
        } catch (err: any) {
            const msg = err.response?.data?.message || "Không thể thực hiện thao tác.";
            setActionError(msg);
            return false;
        } finally {
            setIsProcessing(null);
        }
    };

    return { executeHandleInvitation, isProcessing, actionError };
};