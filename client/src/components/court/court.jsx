import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  GridItem,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  VStack,
  Icon,
  Divider,
} from "@chakra-ui/react";

import { FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import MapComponent from "../map/map";
import LobbyComponent from "./lobby-component";

const CourtPage = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);

  useEffect(() => {
    async function fetchCourt() {
      const response = await fetch(
        `http://localhost:5001/basketball_courts/${id}`
      );
      const data = await response.json();
      setCourt(data);
    }
    fetchCourt();
  }, [id]);

  if (!court) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {/* <h1>{court.court_name}</h1>
      <p>
        Location: {court.court_longitude}, {court.court_latitude}
      </p> */}

      <Grid as={Tabs} templateColumns={"0.6fr 9fr"} w="100%">
        <GridItem borderRadius="10px" m="10px" mt="1vh" shadow={"dark-lg"}>
          <VStack as={TabList} h="80vh" border="none" pt="45px">
            <Tab>
              <Icon width="30px" height="30px" as={FaUserFriends} />
            </Tab>
            <Tab>
              <Icon width="30px" height="30px" as={FaMapMarkedAlt} />
            </Tab>
          </VStack>
        </GridItem>
        <GridItem borderRadius="10px" m="10px" mt="1vh" shadow={"dark-lg"}>
          <TabPanels>
            <TabPanel>
              <LobbyComponent />
            </TabPanel>
            <TabPanel>
              <MapComponent court={court}></MapComponent>
            </TabPanel>
          </TabPanels>
        </GridItem>
      </Grid>
    </div>
  );
};
export default CourtPage;
