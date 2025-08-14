import React from "react";
import type { Media } from "../../types/ResponsePost";

export const VideoProfile = ({ data }: { data: Media }) => {
  return (
    <div className="overflow-hidden transition-shadow bg-white rounded-lg shadow-sm hover:shadow-md">
      <div className="relative bg-black aspect-video">
        <video
          src={data.media_url}
          className="object-cover w-full h-full"
          controls
          preload="metadata"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-1 font-medium text-gray-900">Video</h3>
        <p className="text-sm text-gray-500">
          {new Date(data.created_at).toLocaleString("vi-VN")}
        </p>
      </div>
    </div>
  );
};
