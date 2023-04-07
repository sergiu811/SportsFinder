import {
  AbsoluteCenter,
  Button,
  Grid,
  GridItem,
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
    <Grid
      height="10vh"
      templateColumns="1fr 1fr 1fr 1fr 1fr "
      boxShadow="1px 3px 7px 1px"
      borderRadius="10px"
      m="10px"
      p="3px"
    >
      <GridItem></GridItem>
      <GridItem position="relative" h="10vh">
        <AbsoluteCenter>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              isActive ? classes.active : classes.default
            }
          >
            Map
          </NavLink>
        </AbsoluteCenter>
      </GridItem>
      <GridItem textAlign="center" position="relative">
        <AbsoluteCenter axis="both">
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
  );
};
export default Toolbar;
