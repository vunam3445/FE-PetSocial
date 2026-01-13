import React, { useState, useEffect } from 'react';
import useGetMemberOfAdd from '../../hooks/chat/useGetMemberOfAdd';
import { AddMemberSkeleton } from '../skeleton/AddMemberSkeleton';
import { useAddMemberOfConversation } from '../../hooks/chat/userAddMemberConversation'; // Đảm bảo import đúng hook

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversationId: string;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ 
  isOpen, 
  onClose, 
  conversationId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  
  // Hook lấy danh sách người dùng khả dụng
  const { users, isLoading, error, fetchAvailableUsers } = useGetMemberOfAdd();
  
  // Hook thực hiện hành động thêm thành viên
  const { executeAddMembers, isAdding, addError } = useAddMemberOfConversation();

  // Gọi API lấy danh sách khi mở Modal
  useEffect(() => {
    if (isOpen && conversationId) {
      fetchAvailableUsers(conversationId);
    }
  }, [isOpen, conversationId]);

  // Reset khi đóng modal
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
      setSelectedUserIds([]);
    }
  }, [isOpen]);

  const toggleSelectUser = (userId: string) => {
    setSelectedUserIds(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  const handleAddMember = async () => {
    if (selectedUserIds.length === 0) return;
    const success = await executeAddMembers(conversationId, selectedUserIds);
    if (success) {
      // Nếu thành công, đóng modal
      onClose();
     
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-md bg-white shadow-2xl rounded-2xl max-h-[85vh] animate-in zoom-in duration-300 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">Thêm thành viên</h2>
          <button onClick={onClose} className="p-1 text-gray-400 transition-colors rounded-full hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm tên hoặc email..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-xl text-sm transition-all outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* User List Area */}
        <div className="flex-1 px-2 overflow-y-auto custom-scrollbar min-h-[300px]">
          {isLoading ? (
            <div className="space-y-1">
              {[...Array(6)].map((_, i) => <AddMemberSkeleton key={i} />)}
            </div>
          ) : error || addError ? (
            <div className="px-6 py-20 text-center">
              <p className="text-sm font-medium text-red-500">{error || addError}</p>
              <button 
                onClick={() => fetchAvailableUsers(conversationId)}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                Thử lại
              </button>
            </div>
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <label 
                key={user.id}
                className={`flex items-center justify-between px-4 py-3 transition-colors cursor-pointer rounded-xl group ${
                  selectedUserIds.includes(user.user_id) ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {user.avatar_url ? (
                    <img src={user.avatar_url} alt={user.name} className="object-cover border border-gray-100 rounded-full w-11 h-11" />
                  ) : (
                    <div className="flex items-center justify-center font-bold text-indigo-600 bg-indigo-100 rounded-full w-11 h-11">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold leading-tight text-gray-900">{user.name}</p>
                  </div>
                </div>
                
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.user_id)}
                    onChange={() => toggleSelectUser(user.user_id)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded cursor-pointer bg-gray-50 focus:ring-blue-500"
                  />
                </div>
              </label>
            ))
          ) : (
            <div className="py-20 italic text-center text-gray-400">
              {searchTerm ? "Không tìm thấy kết quả phù hợp" : "Không có người dùng nào để thêm"}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
          <span className="text-sm font-medium text-gray-500">
            Đã chọn: <span className="font-bold text-blue-600">{selectedUserIds.length}</span>
          </span>
          <div className="space-x-3">
            <button 
              onClick={onClose}
              disabled={isAdding}
              className="px-4 py-2 text-sm font-semibold text-gray-600 transition-colors hover:text-gray-800 disabled:opacity-50"
            >
              Hủy
            </button>
            <button 
              disabled={selectedUserIds.length === 0 || isLoading || isAdding}
              onClick={handleAddMember}
              className={`px-6 py-2 rounded-lg text-sm font-bold shadow-md transition-all flex items-center justify-center min-w-[120px] ${
                selectedUserIds.length > 0 && !isLoading && !isAdding
                ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : "Thêm vào nhóm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};