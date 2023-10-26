import { Navigate, Outlet, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const token = localStorage.getItem("access_token");

  if (!token && location.pathname === "/todo") {
    return (
      <>
        <Navigate to="/signin" />
      </>
    );
  } else if (token && ["/", "/signin", "/signup"].includes(location.pathname)) {
    return (
      <>
        <Navigate to="/todo" />
      </>
    );
  } else {
    return <Outlet />;
  }
};

export default Header;
