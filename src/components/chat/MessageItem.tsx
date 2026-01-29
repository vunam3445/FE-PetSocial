import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface MessageItemProps {
  type: "me" | "other";
  name: string;
  text?: string;
  time: string;
  avatarUrl?: string;
  pending?: boolean;
  is_group: boolean;
  media_url?: string;
  message_type?: "text" | "image";
}

export const MessageItem = ({
  type,
  name,
  text,
  time,
  avatarUrl,
  pending = false,
  is_group,
  media_url,
  message_type = "text",
}: MessageItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMe = type === "me";

  const RenderContent = () => (
    <div className="flex flex-col">
      {/* Chỉ hiển thị ảnh nếu type là image */}
      {message_type === "image" && media_url && (
        <div className={`overflow-hidden rounded-lg ${text ? "mb-2" : ""}`}>
          <img
            src={media_url}
            alt="Sent content"
            className="object-cover w-40 h-40 transition-all shadow-inner md:w-52 md:h-52 cursor-zoom-in hover:brightness-90"
            onClick={() => setIsOpen(true)}
          />
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={[{ src: media_url }]}
            render={{ buttonPrev: () => null, buttonNext: () => null }}
            carousel={{ finite: true }}
          />
        </div>
      )}
      {/* Hiển thị văn bản kèm theo */}
      {text && (
        <p className="px-1 text-sm leading-relaxed whitespace-pre-wrap">
          {text}
        </p>
      )}
    </div>
  );

  return (
    <div className={`flex items-start space-x-2 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && <Avatar src={avatarUrl} name={name} />}
      
      <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
        {is_group && !isMe && (
          <span className="mb-1 ml-1 text-[10px] font-bold text-gray-500 uppercase tracking-tight">
            {name}
          </span>
        )}
        
        <div
          className={`p-1.5 rounded-2xl shadow-sm transition-all max-w-fit ${
            isMe 
              ? `${pending ? "bg-blue-400 animate-pulse" : "bg-blue-600"} text-white rounded-tr-none` 
              : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
          }`}
        >
          <RenderContent />
          <div className="px-1">
            <span className={`block mt-1 text-[9px] ${isMe ? "text-blue-100 text-right" : "text-gray-400"}`}>
              {pending ? "Đang gửi..." : formatTime(time)}
            </span>
          </div>
        </div>
      </div>

      {isMe && <Avatar src={avatarUrl} name={name} />}
    </div>
  );
};

const Avatar = ({ src, name }: { src?: string; name: string }) => (
  <div className="flex-shrink-0">
    {src ? (
      <img src={src} className="object-cover w-8 h-8 border border-gray-100 rounded-full" />
    ) : (
      <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-gray-400 rounded-full">
        {name.charAt(0).toUpperCase()}
      </div>
    )}
  </div>
);

const formatTime = (iso: string) => {
  if (!iso) return "";
  const date = new Date(iso);
  const hours = (date.getUTCHours() + 7) % 24;
  const minutes = date.getUTCMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};