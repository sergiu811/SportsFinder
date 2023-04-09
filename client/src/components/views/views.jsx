import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext, { AccountContext } from "../account-context";
import Login from "../login/login";
import PrivateRoutes from "../private-routes";
import SignUp from "../signup/signup";
import HomeComponent from "../home/home";
import SocializeCompoenent from "../socialize/socializeComponent";
import Toolbar from "../toolbar/toolbar";
import MapComponent from "../map/map";
import CourtPage from "../court/court";
import { AppContext, AppProvider, useGlobalContext } from "../../context";

const Views = () => {
  const { user } = useContext(AccountContext);

  return user.loggedIn === null ? (
    <h1>Loading...</h1>
  ) : (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/register" element={<SignUp></SignUp>}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="home" element={<HomeComponent></HomeComponent>}></Route>
          <Route path="courts/:id" element={<CourtPage />} />
          <Route
            path="friends"
            element={<SocializeCompoenent></SocializeCompoenent>}
          ></Route>
          <Route path="map" element={<MapComponent />}></Route>
        </Route>
        <Route path="*" element={<Login></Login>}></Route>
      </Routes>
    </AppProvider>
  );
};

export default Views;
