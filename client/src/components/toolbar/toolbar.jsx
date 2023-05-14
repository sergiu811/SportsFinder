import {
  AbsoluteCenter,
  Avatar,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import classes from "./toolbar.module.css";
import logoDark from "../../assets/logo-dark.png";
import logoLight from "../../assets/logo-light.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { CgProfile } from "react-icons/cg";
import { Button } from "bootstrap";

const Toolbar = () => {
  const [logo, setlogo] = useState(logoLight);

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
                src={logo}
              ></Image>
            </NavLink>
          </AbsoluteCenter>
        </GridItem>

        <GridItem position="relative" h="10vh">
          <AbsoluteCenter>
            <NavLink
              to="/friends"
              className={({ isActive }) =>
                isActive ? classes.active : classes.default
              }
            >
              Socialize
            </NavLink>
          </AbsoluteCenter>
        </GridItem>
        <GridItem position="relative" h="10vh">
          {user && (
            <AbsoluteCenter>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? classes.active : classes.default
                }
              >
                <HStack>
                  <Heading size={"sm"}>{user.username}</Heading>
                  <CgProfile size={25}></CgProfile>
                </HStack>
              </NavLink>
            </AbsoluteCenter>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Toolbar;
