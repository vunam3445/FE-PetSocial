interface MessageItemProps {
  id?: string;
  type: "me" | "other";
  name: string;
  text: string;
  time: string;
  avatarUrl?: string;
  pending?: boolean; // ✅ thêm trạng thái pending
}
const formatTime = (iso: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  // Chuyển sang UTC+7
  const hours = date.getUTCHours() + 7; 
  const adjustedHours = hours >= 24 ? hours - 24 : hours;
  const minutes = date.getUTCMinutes();
  return `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};
;

export const MessageItem = ({
  type,
  name,
  text,
  time,
  avatarUrl,
  pending = false,
}: MessageItemProps) => {
  const initials = name.charAt(0).toUpperCase();

  const Avatar = () =>
    avatarUrl ? (
      <img src={avatarUrl} alt={name} className="object-cover w-8 h-8 rounded-full" />
    ) : (
      <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-400 rounded-full">
        <span className="text-sm font-medium text-white">{initials}</span>
      </div>
    );

  if (type === "other") {
    return (
      <div className="flex items-start space-x-2">
        <Avatar />
        <div className="max-w-xs px-3 py-2 bg-white rounded-lg rounded-tl-none shadow-sm">
          <p className="text-sm text-gray-800">{text}</p>
          <span className="block mt-1 text-xs text-gray-500">  {formatTime(time)}
</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start justify-end space-x-2">
      <div
        className={`max-w-xs px-3 py-2 text-white rounded-lg rounded-tr-none shadow-sm ${
          pending ? "bg-blue-400 opacity-50" : "bg-blue-600"
        }`}
      >
        <p className="text-sm">{text}</p>
        <span className="block mt-1 text-xs text-blue-100">
          {pending ? "Đang gửi..." :  formatTime(time)}
        </span>
      </div>
      <Avatar />
    </div>
  );
};
