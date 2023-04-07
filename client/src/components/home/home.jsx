import { Button, GridItem, Grid, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CourtList from "../court-list/court-list";
import ProfileCard from "../profile/profile-card";
import { Outlet } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Grid templateColumns={"4fr 6fr"}>
        <GridItem>
          <ProfileCard></ProfileCard>
        </GridItem>
        <GridItem>
          <CourtList></CourtList>
        </GridItem>
      </Grid>
    </>
  );
};

export default Home;
