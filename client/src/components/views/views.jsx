import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AccountContext } from "../account-context";
import Login from "../login/login";
import PrivateRoutes from "../private-routes";
import SignUp from "../signup/signup";
import HomeComponent from "../home/home";
const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <h1>Loading...</h1>
  ) : (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/register" element={<SignUp></SignUp>}></Route>
      <Route element={<PrivateRoutes></PrivateRoutes>}>
        <Route path="/home" element={<HomeComponent></HomeComponent>}></Route>
      </Route>
      <Route path="*" element={<Login></Login>}></Route>
    </Routes>
  );
};
export default Views;
