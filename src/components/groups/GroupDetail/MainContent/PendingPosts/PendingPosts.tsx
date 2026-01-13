import{ useState, useEffect , useCallback} from "react";
import { useGetPostsPendingOfGroup } from "../../../../../hooks/posts/useGetPostsPendingOfGroup"; 
import { PreviewPost } from "./PreviewPost";
import { useChangeStatusPost } from "../../../../../hooks/posts/useChangeStatusPost";
import ErrorToast from "../../../../toasts/ErrorToast";
import { PendingPostsSkeleton } from "../../../../skeleton/PendingPostsSkeleton";
interface PendingPostsProps {
    groupId: string
}
export const PendingPosts = (group:PendingPostsProps) => {
  const [page, setPage] = useState(1);
    const { loading, error, setError, hasMore, posts, setPosts } =
      useGetPostsPendingOfGroup(page, group.groupId);
  const {loading: changeStatusLoading, error: changeStatusError, changeStatus, setError: setErrorChangePost}= useChangeStatusPost();
    // const observer = useRef<IntersectionObserver | null>(null);
    // const lastPostRef = useCallback(
    //   (node: HTMLDivElement | null) => {
    //     if (loading) return;
    //     if (observer.current) observer.current.disconnect();
  
    //     observer.current = new IntersectionObserver((entries) => {
    //       if (entries[0].isIntersecting && hasMore) {
    //         setPage((prev) => prev + 1); // load page tiếp theo
    //       }
    //     });
  
    //     if (node) observer.current.observe(node);
    //   },
    //   [loading, hasMore]
    // );
  
   
  
    useEffect(() => {
      setPage(1);
    }, [group.groupId]);
  
  // Xử lý Duyệt bài
  const handleApprove = async(postId: string) => {
    const res = await changeStatus(postId, 'approved');
    if(res){
    setPosts((prev) => prev.filter((p) => p.post_id !== postId));

    }
  };

  // Xử lý Từ chối bài
  const handleReject = async(postId: string) => {
    const res = await changeStatus(postId, 'rejected');
    if(res){
    setPosts((prev) => prev.filter((p) => p.post_id !== postId));
    }
  };
  if(loading){
    return <PendingPostsSkeleton/>
  }
  if (loading === false &&posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-sm min-h-[300px]">
        <div className="p-4 bg-green-100 rounded-full">
          <i className="text-3xl text-green-600 fas fa-check-circle"></i>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Tất cả đã xong!</h3>
        <p className="text-gray-500">Hiện không có bài viết nào chờ duyệt.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Bài viết chờ duyệt</h2>
        <p className="mt-1 text-sm text-gray-500">
          Các bài viết này sẽ không hiển thị trên News Feed cho đến khi bạn phê duyệt.
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-semibold text-gray-700">{posts.length} bài viết</span>
          <div className="flex space-x-2">
             {/* Nút giả lập sort */}
             <select className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option>Mới nhất trước</option>
                <option>Cũ nhất trước</option>
             </select>
          </div>
        </div>
      </div>

      {/* List Posts */}

      <div className="space-y-6">
        {posts.map((post)=>(
            <PreviewPost post={post}
            handleApprove={handleApprove}
            handleReject= {handleReject}
            />
        ))}
      </div>

      <ErrorToast open={changeStatusError} onClose={()=>setErrorChangePost(false)} text={'Có lỗi xảy ra khi thay đổi bài viết, vui lòng thử lại sau'}/>
    </div>
  );
};