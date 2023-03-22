import { FriendContext } from "../socialize/socializeComponent";
import Chat from "./chat";
import { useState, useContext } from "react";
import { Grid, GridItem, Tabs } from "@chakra-ui/react";
import FriendsChat from "./friends-chat";

const FriendsChatComponent = () => {
  const [friendIndex, setFriendIndex] = useState(0);
  const { friendList } = useContext(FriendContext);
  return (
    <Grid
      templateColumns="repeat(10, 1fr)"
      as={Tabs}
      onChange={(index) => setFriendIndex(index)}
    >
      <GridItem colSpan="2" borderRight="1px solid gray">
        <FriendsChat />
      </GridItem>
      <GridItem colSpan="8">
        <Chat userid={friendList[friendIndex]?.userid} />
      </GridItem>
    </Grid>
  );
};
export default FriendsChatComponent;
