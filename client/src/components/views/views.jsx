import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AccountContext } from "../account-context";
import Login from "../login/login";
import PrivateRoutes from "../private-routes";
import SignUp from "../signup/signup";
import HomeComponent from "../home/home";
import SocializeCompoenent from "../socialize/socializeComponent";
import MapComponent from "../map/map";
import CourtPage from "../court/court";
import { AppProvider } from "../../context";
import ProfileModal from "../profile/profile-modal";
import ProfilePage from "../profile/profile-page";

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
          <Route path="profile" element={<ProfilePage></ProfilePage>} />
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
