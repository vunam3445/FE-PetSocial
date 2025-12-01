import { useEffect, useState } from "react";
// Giả sử Members là kiểu mảng Member[], PaginatedMembersResponse là kiểu trả về của API
import type {  Member } from "../../types/Group";
import { GetMembers } from "../../services/GroupService";

export const useGetMembersOfGroup = (page: number = 1, group_id: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [members, setMembers] = useState<Member>([]);

    useEffect(() => {
        const fetchDataMembers = async () => {
            setLoading(true);
            setError(null);
            
            try {
                // LƯU Ý: Hàm GetMembers cần nhận tham số page
                const response = await GetMembers(group_id, page); 

                if (response.status === 200 && response.data) {
                    // Giả sử response.data là object phân trang chứa { data: [], current_page, ... }
                    const result = response.data; 
                    const newMembers = result.data || []; // Mảng thành viên mới

                    if (newMembers.length === 0 && page === 1) {
                        setError('Không có thành viên nào!');
                    }

                    setMembers((prev) => {
                        // Nếu là trang 1, reset lại mảng. Nếu trang > 1, nối thêm vào.
                        if (page === 1) return newMembers;
                        
                        // Lọc trùng lặp (tuỳ chọn nhưng nên có để tránh React.StrictMode render 2 lần gây trùng)
                        // Giả sử member có id
                        const existingIds = new Set(prev.map(m => m.id));
                        const uniqueNewMembers = newMembers.filter(m => !existingIds.has(m.id));
                        
                        return [...prev, ...uniqueNewMembers];
                    });

                    // Logic check hasMore
                    setHasMore(result.current_page < result.last_page);
                }
            } catch (e: any) {
                // Xử lý lỗi
                console.error(e);
                setError("Có lỗi xảy ra vui lòng thử lại sau");
            } finally {
                setLoading(false);
            }
        };

        // Chỉ gọi API nếu có group_id
        if (group_id) {
            fetchDataMembers();
        }

    }, [page, group_id]); // Effect chạy lại khi page hoặc group_id thay đổi

    return { loading, error, hasMore, members};
};