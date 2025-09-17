import { useEffect, useState } from "react";
import { getUser } from "../../services/profileService";
import type { typeUser } from "../../types/User";

export const useUserProfile = (userId?: string) => {
  const [userInfo, setUserInfo] = useState<typeUser | null>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return; // không có id thì bỏ qua

    let isMounted = true; // tránh set state sau khi unmount

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getUser(userId);

        if (isMounted) {
          setUserInfo(data.user);
          setPets(data.pets ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError("Không thể tải thông tin người dùng.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return { user: userInfo, pets, loading, error };
};
