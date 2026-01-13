import React, { useRef, ChangeEvent } from 'react';

interface ImageUploadRowProps {
  label: string;
  description: string;
  currentImage: string;
  onFileSelect: (file: File) => void;
  isAvatar?: boolean;
}

export const ImageUploadRow: React.FC<ImageUploadRowProps> = ({ 
  label, 
  description, 
  currentImage, 
  onFileSelect, 
  isAvatar = false 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className={`flex items-center w-full mr-4 space-x-4`}>
        {/* Input ẩn */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className={`overflow-hidden border border-gray-200 bg-gray-100 ${isAvatar ? 'w-16 h-16 rounded-full' : 'w-32 h-20 rounded-lg'}`}>
           <img 
             src={currentImage} 
             alt={label} 
             className="object-cover w-full h-full"
           />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-900">{label}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      <button 
        onClick={handleButtonClick}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 whitespace-nowrap"
      >
        Thay đổi
      </button>
    </div>
  );
};