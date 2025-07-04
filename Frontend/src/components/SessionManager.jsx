import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SessionManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname==="/register") {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
    }
  }, [location.pathname]);
  return null;
}
