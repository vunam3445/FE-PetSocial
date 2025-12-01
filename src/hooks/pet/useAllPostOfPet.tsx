import { getAllPostsOfPet } from "../../services/PetProfileService";
import { useState, useEffect } from "react";
import type { Post, PaginatedPostsResponse } from "../../types/ResponsePost";

// 1. Thêm petId vào tham số
export const useAllPostOfPet = (petId: string, page: number = 1, limit?: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // 2. Không thực hiện fetch nếu không có petId
    if (!petId) {
        setPosts([]); // Reset posts nếu không có id
        setHasMore(false); // Không còn dữ liệu để tải
        return;
    }

    // Biến cờ để kiểm soát race condition (component unmount trước khi fetch xong)
    let isMounted = true;

    // 3. Tạo hàm async nội bộ
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await getAllPostsOfPet(petId, limit, page);
        // Chỉ update state nếu component còn mounted
        if (isMounted) {
          if (page === 1) {
            setPosts(data.data || []);
          } else {
            setPosts((prev) => [...prev, ...(data.data || [])]);
          }
          setHasMore(data.current_page < data.last_page);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Lỗi tải danh sách bài viết của thú cưng");
          // Không return [] ở đây, chỉ set state error
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    // 4. Cleanup function
    return () => {
      isMounted = false;
    };

  // 5. Thêm petId vào dependency array
  }, [petId, page, limit]);

  return { loading, error, posts, setPosts, hasMore };
};