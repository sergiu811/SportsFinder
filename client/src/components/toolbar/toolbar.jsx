import {
  AbsoluteCenter,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  Image,
  useColorMode,
} from "@chakra-ui/react";
import classes from "./toolbar.module.css";
import logoDark from "../../assets/logo-dark.png";
import logoLight from "../../assets/logo-light.png";
import ToggleColorMode from "../toggle";
import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Toolbar = () => {
  const { colorMode } = useColorMode();
  const [logo, setlogo] = useState(logoLight);

  useEffect(() => {
    if (colorMode === "dark") setlogo(logoLight);
    else setlogo(logoDark);
  }, [colorMode]);

  return (
    <Box p="10px">
      <Grid
        height="10vh"
        templateColumns="1fr 1fr 1fr "
        boxShadow="1px 1px 10px 0px"
        borderRadius="10px"
        bg={"rgba(0, 0, 0, 0.5)"}
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
          <ToggleColorMode />
        </GridItem>
      </Grid>
    </Box>
  );
};
export default Toolbar;
