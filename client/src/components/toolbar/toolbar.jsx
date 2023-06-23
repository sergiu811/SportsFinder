import {
  AbsoluteCenter,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import classes from "./toolbar.module.css";
import logoLight from "../../assets/logo-light.png";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";

const Toolbar = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate.to("/login");
  };

  const getUserDetails = async () => {
    const decodedToken = jwt_decode(localStorage.getItem("token"));
    const response = await fetch(
      `http://localhost:5001/player/${decodedToken.username}`
    );

    const data = await response.json();
    setUser(data[0]);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Box p="10px">
      <Grid
        shadow={"dark-lg"}
        height="10vh"
        templateColumns="1fr 1fr 1fr "
        borderRadius="10px"
        bg={"rgba(25, 25, 25, 0.9)"}
        p="3px"
      >
        <GridItem textAlign="center" position="relative">
          <AbsoluteCenter>
            <Tooltip label="Home" hasArrow>
              <NavLink
                to="home"
                className={({ isActive }) =>
                  isActive ? classes.imageActive : classes.default
                }
              >
                <Image
                  boxSize="9vh"
                  borderRadius="full"
                  objectFit="contain"
                  src={logoLight}
                ></Image>
              </NavLink>
            </Tooltip>
          </AbsoluteCenter>
        </GridItem>

        <GridItem position="relative" h="10vh"></GridItem>
        <GridItem position="relative" h="10vh">
          {user && (
            <AbsoluteCenter>
              <AbsoluteCenter>
                <HStack gap={"50px"}>
                  <Tooltip label="Socialize" hasArrow>
                    <NavLink
                      to="/friends"
                      className={({ isActive }) =>
                        isActive ? classes.active : classes.default
                      }
                    >
                      <FaUserFriends size={30} />
                    </NavLink>
                  </Tooltip>
                  <Tooltip label="Profile" hasArrow>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        isActive ? classes.active : classes.default
                      }
                    >
                      <HStack>
                        <CgProfile size={30}></CgProfile>
                      </HStack>
                    </NavLink>
                  </Tooltip>
                  <Tooltip label="Logout" hasArrow>
                    <NavLink className={classes.default} onClick={handleLogout}>
                      <FiLogOut size={30}></FiLogOut>
                    </NavLink>
                  </Tooltip>
                </HStack>
              </AbsoluteCenter>
            </AbsoluteCenter>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Toolbar;
