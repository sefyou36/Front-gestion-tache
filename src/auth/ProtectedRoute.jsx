import {  Navigate, Outlet } from "react-router-dom";
import { AuthContext} from "./AuthProvider";
import { useContext } from "react";

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet/>
};

export default ProtectedRoute;
