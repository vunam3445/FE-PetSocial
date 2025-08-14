import { useEffect, useState } from "react";
import { getUser } from "../../services/profileService";

interface typeUser  {
 user_id: string;
  name: string;
  email: string;
  avatar_url: string;
  cover_url: string;
  bio: string;
  follower_count: number;
  following_count: number;
}
export const useUserProfile = (userId: string) => {
  const [userInfo, setUserInfo] = useState<typeUser>();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUser(userId);
        setUserInfo(data.user);
        setPets(data.pets);
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { user: userInfo, pets, loading, error };
};
