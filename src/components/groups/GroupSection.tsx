import { GroupItem } from "./GroupItem";
import type { Group } from "../../types/Group";
import { GroupItemSkeleton } from "../skeleton/GroupItemSkeleton";
interface GroupSectionProps {
  title: string;
  groups: Group[];
  loading?: boolean;
  hasMore?: boolean;       
  onLoadMore?: () => void;   
}


export const GroupSection = ({
  title,
  groups,
  loading,
  hasMore,
  onLoadMore,
}: GroupSectionProps) => {
  return (
    <div className="mb-6 last:mb-0">
      <h2 className="px-2 mb-3 text-base font-semibold text-gray-900">{title}</h2>

      <div className="space-y-1">
        {/* ✅ Sử dụng Array.isArray để đảm bảo groups là mảng trước khi map */}
        {Array.isArray(groups) && groups.map((group) => (
          <GroupItem
            key={group.group_id}
            href={`/groups/${group.group_id}`}
            name={group.name}
            image={group.avatar_url || ""}
          />
        ))}

        {loading && (
          Array.from({ length: 2 }).map((_, index) => (
            <GroupItemSkeleton key={`loading-${index}`} />
          ))
        )}

        {!loading && hasMore && (
          <button onClick={onLoadMore} className="w-full py-2 text-sm text-blue-600">
            Xem thêm...
          </button>
        )}
      </div>
    </div>
  );
};