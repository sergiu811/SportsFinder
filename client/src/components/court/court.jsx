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
import CenteredSpinner from "../spinner";

const CourtPage = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        console.error("Error getting current position:", error);
      }
    );
  }, []);

  if (!court) {
    return <CenteredSpinner></CenteredSpinner>;
  }
  return (
    <Grid as={Tabs} templateColumns={"0.6fr 9fr"} w="100%">
      <GridItem
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
        <VStack as={TabList} h="80vh" border="none" pt="45px">
          <Tab>
            <Icon
              color={"white"}
              width="30px"
              height="30px"
              as={FaUserFriends}
            />
          </Tab>
          <Tab>
            <Icon
              color={"white"}
              width="30px"
              height="30px"
              as={FaMapMarkedAlt}
            />
          </Tab>
        </VStack>
      </GridItem>
      <GridItem
        color={"white"}
        bg={"rgba(25, 25, 25, 0.9)"}
        borderRadius="10px"
        m="10px"
        mt="1vh"
        shadow={"dark-lg"}
      >
        <TabPanels>
          <TabPanel>
            <LobbyComponent />
          </TabPanel>
          <TabPanel>
            {latitude && latitude != 0 ? (
              <MapComponent
                court={court}
                latitude={latitude}
                longitude={longitude}
              ></MapComponent>
            ) : (
              <CenteredSpinner />
            )}
          </TabPanel>
        </TabPanels>
      </GridItem>
    </Grid>
  );
};
export default CourtPage;
