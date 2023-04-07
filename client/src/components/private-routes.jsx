import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "./account-context";
import Toolbar from "./toolbar/toolbar";
import Home from "./home/home";

const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? (
    <>
      <Toolbar></Toolbar>
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
