import  { useState, useEffect, useRef , useCallback} from "react";
import { useGetJoinRequests } from "../../../../../hooks/group/useGetJoinRequests";
import type { Group } from "../../../../../types/Group";
import { RequestHeader } from "./RequestHeader";
import { RequestItem } from "./RequestItem";
import type { JoinRequest } from "../../../../../types/QuestionAndAnswer";
import { updateRequest } from "../../../../../services/QuestionAnswer";
import { MemberRequestsSkeleton } from "../../../../skeleton/RequestItemSkeleton";
import { useSearchRequestJoinGroup } from "../../../../../hooks/search/useSearchRequestJoinGroup";

interface MemberRequestProp {
  groupInfo: Group;
}

export const MemberRequests = ({ groupInfo }: MemberRequestProp) => {
  // Chỉ sử dụng hook Search vì nó bao quát cả lấy dữ liệu ban đầu (keyword = "")
  const {
    data,
    setData,
    loading,
    keyword,
    setKeyword,
    page,
    setPage,
    pagination,
  } = useSearchRequestJoinGroup(groupInfo.group_id);

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [totalRequest, setTotalRequest] = useState<number>(pagination?.total || 0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Xử lý Search: Chỉ thực thi khi ấn Enter
  const handleSearchSubmit = () => {
    setPage(1);
    setKeyword(searchTerm);
  };

  // Tự động quay về danh sách cũ khi xóa sạch ô search
  useEffect(() => {
    if (searchTerm === "" && keyword !== "") {
      setPage(1);
      setKeyword("");
    }
  }, [searchTerm]);

  // Infinite Scroll logic: Trigger khi gặp item chia hết cho 14
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting && 
          pagination && 
          page < pagination.last_page
        ) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, pagination, page]
  );

  const handleApprove = async (r: JoinRequest) => {
    await updateRequest(r.request_id, {
      group_id: groupInfo.group_id,
      user_id: r.user_id,
      status: "approved",
    });
    setData((prev) => prev.filter((p) => p.request_id !== r.request_id));
  };

  const handleDecline = async (r: JoinRequest) => {
    await updateRequest(r.request_id, {
      group_id: groupInfo.group_id,
      user_id: r.user_id,
      status: "rejected",
    });
    setData((prev) => prev.filter((p) => p.request_id !== r.request_id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[500px]">
      <RequestHeader
        totalCount={totalRequest}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="divide-y divide-gray-100">
        {data.length === 0 && !loading ? (
          <div className="p-8 text-center text-gray-500">
            <i className="mb-3 text-4xl text-gray-300 fas fa-user-slash"></i>
            <p>Không tìm thấy yêu cầu nào.</p>
          </div>
        ) : (
          data.map((req, index) => {
            // Kiểm tra nếu là item thứ 14, 28, 42... (index 13, 27, 41...)
            const isTriggerItem = (index + 1) % 14 === 0;
            
            return (
              <div 
                key={`${req.request_id}-${index}`} 
                ref={isTriggerItem ? lastElementRef : null}
              >
                <RequestItem
                  request={req}
                  isExpanded={expandedRequestId === req.request_id}
                  onToggleExpand={(id) => setExpandedRequestId(prev => prev === id ? null : id)}
                  onApprove={handleApprove}
                  onDecline={handleDecline}
                />
              </div>
            );
          })
        )}
        {loading && <MemberRequestsSkeleton />}
      </div>
    </div>
  );
};
