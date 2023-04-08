import { GridItem, Grid } from "@chakra-ui/react";
import CourtList from "../court-list/court-list";
import ProfileCard from "../profile/profile-card";

const Home = () => {
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
