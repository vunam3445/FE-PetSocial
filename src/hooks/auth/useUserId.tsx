import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

interface TokenPayload {
  sub: string; // hoặc number tùy API trả về
  // có thể thêm các trường khác nếu cần
}

export default function useUserId(profileUserId?: string) {
  const [isMyProfile, setIsMyProfile] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // hoặc lấy từ cookie
    if (!token || !profileUserId) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setIsMyProfile(decoded.sub === profileUserId);
    } catch (error) {
      console.error("Invalid token", error);
      setIsMyProfile(false);
    }
  }, [profileUserId]);

  return isMyProfile;
}
