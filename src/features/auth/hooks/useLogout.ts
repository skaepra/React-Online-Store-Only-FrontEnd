// hooks/useLogout.ts
import { useState } from "react";
import { logout } from "../services/logoutApi";
import { useNavigate } from "react-router-dom";

export function useLogout() {
        const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const performLogout = async () => {
    setLoading(true);
    setIsError(false);

    try {
      await logout();
    } catch (error) {
      console.error("⚠️ لم يتمكن السيرفر من معالجة تسجيل الخروج أو التوكن منتهي الصلاحية:", error);
      setIsError(true);
    } finally {

      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login")
    }
  };

  return {
    performLogout,
    loading,
    isError,
  };
}