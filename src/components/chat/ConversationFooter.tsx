import { useState, useRef, useEffect } from "react";
import { useCreateMessage } from "../../hooks/chat/useCreateMessage";
import { useChat } from "../../contexts/ChatContext";
import ErrorToast from "../toasts/ErrorToast";

export const ConversationFooter = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const [message, setMessage] = useState("");
  const [errorToast, setErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  // --- State mới cho Ảnh ---
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { createMessage } = useCreateMessage();
  const { addMessage, updateMessage } = useChat();

  // Tạo và dọn dẹp URL preview để tránh rò rỉ bộ nhớ
  useEffect(() => {
    if (!selectedImage) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedImage);
    setPreviewUrl(url);

    // Cleanup function
    return () => URL.revokeObjectURL(url);
  }, [selectedImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
    // Reset value để có thể chọn lại cùng 1 file nếu xóa đi chọn lại
    e.target.value = "";
  };

  const removeImage = () => {
    setSelectedImage(null);
  };

const sendMessage = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!message.trim() && !selectedImage) return;

  const tempId = Date.now().toString();
  
  // 1. Tạo FormData
  const formData = new FormData();
  formData.append("content", message); // Tương ứng với $request->input('content') ở Laravel
  if (selectedImage) {
    formData.append("media", selectedImage); // Tương ứng với $request->file('media')
  }
  // Nếu có reply_to_id, bạn có thể append thêm vào đây
  // formData.append("reply_to_id", replyId);

  // 2. Optimistic UI (Hiển thị tạm thời)
  const pendingMessage = {
    message_id: tempId,
    type: "me" as const,
    name: localStorage.getItem("user_name") || "Me",
    text: message,
    // Thêm trường media_url để hiển thị preview ngay trong khung chat (nếu khung chat hỗ trợ)
    media_url: previewUrl || undefined, 
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    avatarUrl: localStorage.getItem("avatar_url") || undefined,
    pending: true,
    media_url: previewUrl || undefined, 
    message_type: selectedImage ? "image" : "text",
  };

  addMessage(conversationId, pendingMessage);
  
  // Lưu nháp để khôi phục khi lỗi
  const originalMessage = message;
  const originalImage = selectedImage;

  // Reset input
  setMessage("");
  setSelectedImage(null);

  try {
    // 3. Gọi API với FormData
    const saved = await createMessage(conversationId, formData);
    
    if (saved) {
      updateMessage(conversationId, tempId, {
        message_id: saved.message_id,
        text: saved.content,
         media_url: saved.media_url, // URL thật từ S3/Storage
        message_type: saved.message_type, // 'image' hoặc 'video'
        time: saved.created_at,
        pending: false,
        type: "me",
      });
    }
  } catch (err: any) {
    console.error("Send message failed", err);
    const msg = err.response?.data?.message || "Không thể gửi tin nhắn. Vui lòng thử lại.";
    setErrorMessage(msg);
    setErrorToast(true);
    
    // Khôi phục nội dung nếu lỗi
    setMessage(originalMessage);
    setSelectedImage(originalImage);
  }
};

  return (
    <div className="p-3 bg-white border-t border-gray-200 rounded-b-xl">
      <ErrorToast 
        open={errorToast} 
        text={errorMessage} 
        onClose={() => setErrorToast(false)} 
      />

      {/* --- PHẦN PREVIEW ẢNH --- */}
      {previewUrl && (
        <div className="relative inline-block mb-3 ml-2 group">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="object-cover w-20 h-20 border-2 border-blue-100 rounded-lg shadow-sm"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute flex items-center justify-center w-5 h-5 text-white transition-transform bg-red-500 rounded-full shadow-md -top-2 -right-2 hover:bg-red-600 group-hover:scale-110"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}

      <form className="flex items-center space-x-2" onSubmit={sendMessage}>
        {/* Input file ẩn */}
        <input 
          type="file"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <div className="relative flex items-center flex-1">
          <input
            type="text"
            placeholder={selectedImage ? "Thêm lời nhắn cho ảnh..." : "Type your message..."}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Nút kẹp file ảnh */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute right-2 p-1.5 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        <button
          type="submit"
          disabled={!message.trim() && !selectedImage}
          className="flex items-center justify-center p-2 text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};