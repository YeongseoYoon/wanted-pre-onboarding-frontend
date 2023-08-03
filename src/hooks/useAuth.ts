import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (
      token &&
      (location.pathname === "/signin" || location.pathname === "/signup")
    ) {
      navigate("/todo");
    } else if (!token && location.pathname === "/todo") {
      navigate("/signin");
    }
  }, [navigate, token, location]);
};

export default useAuth;
