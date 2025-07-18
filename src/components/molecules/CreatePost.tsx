import React from "react";
import { Avatar } from "../atoms/Avatar";
export const CreatePost = () => {
  return (
    <div className="create-post">
      <div className="create-post-header">
        <Avatar />
        <div className="create-post-input">Bạn đang nghĩ gì vậy Vũ?</div>
      </div>
    </div>
  );
};
