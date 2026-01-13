import { GroupItem } from "./GroupItem";
import type { Group } from "../../types/Group";
import { GroupItemSkeleton } from "../skeleton/GroupItemSkeleton";
interface GroupSectionProps {
  title: string;
  groups: Group[];
  showViewAll?: boolean;
  loading?: boolean;
}
export const GroupSection = ({
  title,
  groups,
  showViewAll = false,
  loading = false,
}: GroupSectionProps) => {
    if (loading) {
        Array.from({ length: 3 }).map((_, index) => (
            <GroupItemSkeleton key={index} />
        ));
    }
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between px-2 mb-3">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        {showViewAll && (
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Xem tất cả
          </a>
        )}
      </div>
      <div className="space-y-1">
        {groups.map((group) => (
          <GroupItem
            key={group.group_id}
            href={`/groups/${group.group_id}`}
            name={group.name}
            image={group.avatar_url || ""}
          />
        ))}
      </div>
    </div>
  );
};
