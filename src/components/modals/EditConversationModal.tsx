import React, { useState, useRef, type ChangeEvent } from 'react';
import { type EditingConversation } from '../../types/Conversation';
import { useUpdateConversation } from '../../hooks/chat/useUpdateConversation';

interface EditConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: EditingConversation;
  // onSave có thể giữ lại để cập nhật UI cục bộ hoặc bỏ qua nếu bạn dùng Global State/Socket
  onSave?: (newName: string, newAvatarUrl: string) => void; 
}

const EditConversationModal: React.FC<EditConversationModalProps> = ({
  isOpen,
  onClose,
  conversation,
  onSave,
}) => {
  const [groupName, setGroupName] = useState<string>(conversation.conversationName);
  const [previewAvatar, setPreviewAvatar] = useState<string>(conversation.conversationAvatar);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Sử dụng hook cập nhật
  const { updateInfo, loading, error } = useUpdateConversation();

  if (!isOpen) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 2. Hàm xử lý lưu thông tin
  const handleSave = async () => {
    if (!groupName.trim()) return;

    try {
      // Gọi service thông qua hook
      const updatedData = await updateInfo(conversation.conversationId, groupName, selectedFile);
      
      // Nếu có callback onSave để cập nhật UI cha thì gọi ở đây
      if (onSave) {
        onSave(updatedData.name, updatedData.avatar_url);
      }
      
      onClose();
    } catch (err) {
      console.error("Cập nhật thất bại:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden duration-200 bg-white shadow-2xl rounded-3xl animate-in fade-in zoom-in">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-xl font-bold text-gray-900">Thông tin nhóm</h3>
          <button 
            onClick={onClose}
            className="p-2 transition-colors rounded-full hover:bg-gray-100"
            disabled={loading} // Không cho đóng khi đang upload
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pb-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div 
              className={`relative cursor-pointer group ${loading ? 'opacity-50 pointer-events-none' : ''}`} 
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 overflow-hidden border-4 border-white rounded-full shadow-lg ring-1 ring-gray-100">
                <img 
                  src={previewAvatar} 
                  alt="Avatar" 
                  className="object-cover w-full h-full shadow-inner"
                />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center transition-opacity rounded-full opacity-0 bg-black/40 group-hover:opacity-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </div>

              <div className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full border-2 border-white text-white shadow-sm">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
          </div>

          {/* Name Input Section */}
          <div className="space-y-1.5">
            <label className="ml-1 text-xs font-bold tracking-wider text-gray-400 uppercase">
              Tên nhóm của bạn
            </label>
            <div className="relative">
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                maxLength={40}
                disabled={loading}
                className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-gray-800 font-medium disabled:opacity-50"
                placeholder="Ví dụ: Team Marketing"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-mono text-gray-400">
                {groupName.length}/40
              </div>
            </div>
            {error && <p className="mt-2 text-xs text-center text-red-500">{error.message || 'Lỗi cập nhật'}</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 bg-gray-50/80">
          <button 
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-3 text-sm font-bold text-gray-500 transition hover:text-gray-700 disabled:opacity-50"
          >
            Hủy bỏ
          </button>
          <button 
            onClick={handleSave}
            disabled={!groupName.trim() || loading}
            className="flex-[2] py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 disabled:bg-gray-300 disabled:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin" />
                Đang xử lý...
              </>
            ) : 'Cập nhật ngay'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditConversationModal;