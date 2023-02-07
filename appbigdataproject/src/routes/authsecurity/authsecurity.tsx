import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../../libs/userContext";

export const AuthSecurity = () => {
  const { user_id } = useContext(AuthContext);
  if (user_id === "") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
