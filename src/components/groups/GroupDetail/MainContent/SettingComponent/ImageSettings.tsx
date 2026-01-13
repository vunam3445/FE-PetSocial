import React from 'react';
import { ImageUploadRow } from './ImageUploadRow';

interface ImageSettingsProps {
  avatarUrl: string;
  coverUrl: string;
  onUpdateImage: (type: 'avatar' | 'cover', file: File) => void;
}

export const ImageSettings: React.FC<ImageSettingsProps> = ({ 
  avatarUrl, 
  coverUrl, 
  onUpdateImage 
}) => {
  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Hình ảnh & Giao diện</h3>
      </div>
      <div className="px-6 py-6 space-y-6">
        <ImageUploadRow 
          label="Ảnh đại diện"
          description="Hiển thị nhỏ bên cạnh tên nhóm"
          currentImage={avatarUrl}
          isAvatar={true}
          onFileSelect={(file) => onUpdateImage('avatar', file)}
        />
        <hr className="border-gray-100"/>
        <ImageUploadRow 
          label="Ảnh bìa"
          description="Ảnh lớn hiển thị đầu trang nhóm"
          currentImage={coverUrl}
          isAvatar={false}
          onFileSelect={(file) => onUpdateImage('cover', file)}
        />
      </div>
    </div>
  );
};