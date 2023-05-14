import Chat from "./chat";
import { useState } from "react";
import {
  Grid,
  GridItem,
  Tabs,
  Heading,
  Divider,
  VStack,
} from "@chakra-ui/react";
import FriendsChat from "./friends-chat";
import { useGlobalContext } from "../../context";

const FriendsChatComponent = () => {
  const [friendIndex, setFriendIndex] = useState(0);
  const { friendList } = useGlobalContext();
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      as={Tabs}
      onChange={(index) => setFriendIndex(index)}
      h="85vh"
    >
      <GridItem borderRight="1px solid grey" colSpan="2" minWidth="210px">
        <FriendsChat />
      </GridItem>
      <GridItem maxH="82vh" colSpan="8">
        <VStack pt="20px" borderRadius="10px">
          <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
            Chat{" "}
          </Heading>
          <Divider />
        </VStack>
        <Chat userid={friendList[friendIndex]?.userid} />
      </GridItem>
    </Grid>
  );
};
export default FriendsChatComponent;
