import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Like } from "../atoms/Like";
import { Comment } from "../atoms/Comment";
import { Share } from "../atoms/Share";
export const Post = () => {
  return (
    <div className="post">
      <div className="post-header">
        <Avatar />
        <div className="post-info">
          <h4>Nguyễn Văn An</h4>
          <div className="post-time">2 hours ago</div>
        </div>
      </div>
      <div className="post-content">
        Max vừa học được trick mới! Cậu bé thông minh quá, chỉ cần 1 tuần đã
        biết ngồi và nằm khi có hiệu lệnh. Ai có tips gì cho việc training thêm
        không? 🐕✨
      </div>
      <img
        src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
        alt="Post Image"
        className="post-image"
      />
      <div className="post-actions">
        <Like />
        <Comment />
        <Share />
      </div>
    </div>
  );
};
