import { getMyNotification } from "../../services/NotificationService";
import { useState, useEffect, useCallback } from "react";

export const useGetMyNotification = (userId: string) => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchNotifications = useCallback(async (isLoadMore = false) => {
        if (!userId || loading) return;

        setLoading(true);
        try {
            const currentPage = isLoadMore ? page + 1 : 1;
            const res = await getMyNotification(userId, currentPage);
            
            const newData = res.data.data;
            const lastPage = res.data.last_page;
            setUnreadCount(res.data.unread_count);
            setNotifications(prev => isLoadMore ? [...prev, ...newData] : newData);
            setPage(currentPage);
            setHasMore(currentPage < lastPage);
        } catch (error) {
            console.error("Lỗi lấy thông báo:", error);
        } finally {
            setLoading(false);
        }
    }, [userId, page, loading]);

    useEffect(() => {
        fetchNotifications();
    }, [userId]);

    return { 
        notifications, 
        setNotifications, // Xuất hàm này để Hook khác có thể cập nhật UI
        loading, 
        hasMore, 
        loadMore: () => fetchNotifications(true) ,
        unreadCount,
        setUnreadCount
    };
};