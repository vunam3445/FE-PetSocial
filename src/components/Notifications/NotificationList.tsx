import React from "react";
import NotificationItem from "./NotificationItem";
import type {  NotificationItem as nt} from "../../types/Notification";
interface NotificationProps {
  notifications: nt[];
  handleClick:(noti: nt,solveStatus?:string)=>void;
}
export const NotificationList: React.FC<NotificationProps> = ({notifications, handleClick}) => {


  return (
    <div className="flex flex-col w-[380px] overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-2xl">
      
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-50">
        <h3 className="text-lg font-bold text-gray-900">Thông báo</h3>
        <button className="px-2 py-1 text-xs font-medium text-blue-600 transition-colors rounded-md hover:bg-blue-50">
          Đánh dấu tất cả là đã đọc
        </button>
      </div>

      <div className="max-h-[480px] overflow-y-auto overflow-x-hidden custom-scrollbar">
        {notifications && notifications.length > 0 ? (
          notifications.map((noti) => (
            <NotificationItem key={noti.id} noti={noti} handleClick={handleClick}/>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 opacity-40">
            <p className="text-sm italic">Hộp thư thông báo trống</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-3 text-center border-t border-gray-100 bg-gray-50/80">
        <button className="text-sm font-semibold text-gray-600 transition-colors hover:text-blue-600">
          Xem tất cả trong lịch sử
        </button>
      </div>
    </div>
  );
};
