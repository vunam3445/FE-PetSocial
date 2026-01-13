import { useState } from "react";
import { readNotification as readNotificationService } from "../../services/NotificationService";

export const useReadNotification = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const markAsRead = async (notificationId: string, onSuccess?: () => void) => {
        setIsUpdating(true);
        setError(null);
        try {
            await readNotificationService(notificationId);
            if (onSuccess) {
                onSuccess(); // Callback để cập nhật UI ở component cha
            }
        } catch (err: any) {
            setError(err.message || "Không thể cập nhật trạng thái");
            console.error("Read Notification Error:", err);
        } finally {
            setIsUpdating(false);
        }
    };

    return { markAsRead, isUpdating, error };
};