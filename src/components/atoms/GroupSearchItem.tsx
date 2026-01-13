// src/components/molecules/GroupSearchItem.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

import type { GroupSearchResult } from "../../types/Search";

interface GroupSearchItemProps {
  group: GroupSearchResult;
}

export const GroupSearchItem: React.FC<GroupSearchItemProps> = ({ group }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${group.group_id}`);
  };
  return (
    <div className="w-full overflow-hidden transition-all duration-200 bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-md" onClick={handleClick}>
      {/* 1. Cover Image - Chiều cao cố định, trải rộng full */}
      <div className="relative w-full h-32 bg-gray-100">
        {group.cover_url ? (
          <img
            src={group.cover_url}
            alt="cover"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-100 to-blue-100" />
        )}
      </div>

      <div className="relative px-6 pb-6">
        <div className="flex flex-col mb-4 -mt-12 sm:flex-row sm:items-end sm:justify-between">
            
          {/* 2. Avatar & Info Wrapper */}
          <div className="flex items-end space-x-4">
             {/* Avatar: Bo tròn, viền trắng dày để tách khỏi nền */}
            <img
              src={group.avatar_url}
              alt={group.name}
              className="object-cover w-24 h-24 bg-white border-4 border-white shadow-sm rounded-2xl shrink-0"
            />
            
            {/* Tên nhóm & Metadata (Hiển thị khi màn hình lớn) */}
            <div className="hidden mb-2 sm:block">
               <h3 className="text-xl font-bold leading-tight text-gray-900">
                {group.name}
              </h3>
               <div className="mt-1 text-sm font-medium text-gray-500">
                  {(group.members_count / 1000).toFixed(1)}K thành viên • {group.visibility =='private' ? "Nhóm kín" : "Công khai"}
               </div>
            </div>
          </div>

          {/* 3. Button Action - Luôn nằm bên phải hoặc xuống dòng khi mobile */}
          {group.is_member&&(<div className="mt-4 sm:mt-0">
            <button
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2
                ${
                  group.is_member
                    ? "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent"
                    : "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-100"
                }`}
            >
     
                  <span>✓ Đã tham gia</span>
                
            </button>
          </div>)}
        </div>

        {/* 4. Mobile Title Fallback (Chỉ hiện tên khi màn hình nhỏ bị vỡ layout) */}
        <div className="block mb-3 sm:hidden">
             <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
             <div className="text-sm text-gray-500">{(group.members_count / 1000).toFixed(1)}K thành viên</div>
        </div>

        {/* 5. Description & Preview */}
        {group.description && (
            <div className="p-3 mt-2 bg-gray-50 rounded-xl">
                <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">
                {group.description}
                </p>
            </div>
        )}
        
        {/* Optional: Preview Members (Avatar stack) - Tăng độ uy tín */}
        {/* <div className="flex items-center gap-2 mt-4">
            <div className="flex -space-x-2 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="inline-block w-6 h-6 bg-gray-200 rounded-full ring-2 ring-white" />
                ))}
            </div>
            <span className="text-xs text-gray-400">và những người bạn khác cũng ở đây</span>
        </div> */}

      </div>
    </div>
  );
};