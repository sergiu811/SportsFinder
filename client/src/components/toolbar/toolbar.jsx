import {
  AbsoluteCenter,
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
} from "@chakra-ui/react";
import classes from "./toolbar.module.css";
import logoLight from "../../assets/logo-light.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { Button } from "bootstrap";

const Toolbar = () => {
  const [user, setUser] = useState();

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
          </AbsoluteCenter>
        </GridItem>

        <GridItem position="relative" h="10vh"></GridItem>
        <GridItem position="relative" h="10vh">
          {user && (
            <AbsoluteCenter>
              <AbsoluteCenter>
                <HStack gap={"50px"}>
                  <NavLink
                    to="/friends"
                    className={({ isActive }) =>
                      isActive ? classes.active : classes.default
                    }
                  >
                    <FaUserFriends />
                  </NavLink>
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
