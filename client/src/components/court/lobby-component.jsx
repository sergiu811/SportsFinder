import Lobby from "./lobby";
import LobbySelection from "./lobby-selection";
import {
  Grid,
  GridItem,
  Tabs,
  Heading,
  Divider,
  VStack,
} from "@chakra-ui/react";

const LobbyComponent = ({ court }) => {
  return (
    <Grid templateColumns="repeat(10, 1fr)" as={Tabs} h="80vh">
      <GridItem borderRight="1px solid grey" colSpan="2" minWidth="210px">
        <LobbySelection />
      </GridItem>
      <GridItem maxH="82vh" colSpan="8">
        <Lobby court={court} />
      </GridItem>
    </Grid>
  );
};
export default LobbyComponent;
