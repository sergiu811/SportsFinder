import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "./account-context";
import Toolbar from "./toolbar/toolbar";
import { Box } from "@chakra-ui/react";
import background from "../assets/background2.jpeg";
const useAuth = () => {
  const { user } = useContext(AccountContext);
  return user && user.loggedIn;
};

const PrivateRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? (
    <Box position="relative" height="100vh">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundImage={background}
        backgroundSize="cover"
        backgroundPosition="center"
        filter="blur(8px)"
        zIndex="-1"
      />
      {/* Your site content goes here */}
      <Toolbar></Toolbar>
      <Outlet />
    </Box>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoutes;
