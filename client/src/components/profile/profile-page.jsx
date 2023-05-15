import { AbsoluteCenter, Grid, GridItem } from "@chakra-ui/react";
import LobbyHistory from "../court/lobby-history";
import ProfileCard from "./profile-card";

const ProfilePage = () => {
  return (
    <Grid
      width={"100vw"}
      margin="auto"
      p={"10px"}
      gap="10px"
      gridTemplateColumns={"2fr 6fr"}
    >
      <GridItem
        color={"white"}
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
        <ProfileCard></ProfileCard>
      </GridItem>
      <GridItem
        color={"white"}
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
        <LobbyHistory></LobbyHistory>
      </GridItem>
    </Grid>
  );
};

export default ProfilePage;
