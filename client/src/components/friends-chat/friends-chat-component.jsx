import { FriendContext } from "../socialize/socializeComponent";
import Chat from "./chat";
import { useState, useContext } from "react";
import {
  Grid,
  GridItem,
  Tabs,
  Heading,
  Divider,
  VStack,
} from "@chakra-ui/react";
import FriendsChat from "./friends-chat";

const FriendsChatComponent = () => {
  const [friendIndex, setFriendIndex] = useState(0);
  const { friendList } = useContext(FriendContext);
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      as={Tabs}
      onChange={(index) => setFriendIndex(index)}
      h="97vh"
    >
      <GridItem borderRight="1px solid grey" colSpan="2" minWidth="210px">
        <FriendsChat />
      </GridItem>
      <GridItem maxH="95vh" colSpan="8">
        <VStack pt="20px" borderRadius="10px">
          <Heading size="md">Chat </Heading>
          <Divider />
        </VStack>
        <Chat userid={friendList[friendIndex]?.userid} />
      </GridItem>
    </Grid>
  );
};
export default FriendsChatComponent;
