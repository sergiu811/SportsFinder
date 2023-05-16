import Chat from "./chat";
import { useState } from "react";
import {
  Grid,
  GridItem,
  Tabs,
  Heading,
  Divider,
  Box,
  VStack,
  AbsoluteCenter,
} from "@chakra-ui/react";
import FriendsChat from "./friends-chat";
import { Empty } from "antd";
import { useGlobalContext } from "../../context";

const FriendsChatComponent = () => {
  const [friendIndex, setFriendIndex] = useState(0);
  const { friendList } = useGlobalContext();
  return friendList.length > 0 ? (
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
            Chat
          </Heading>
          <Divider />
        </VStack>
        <Chat userid={friendList[friendIndex]?.userid} />
      </GridItem>
    </Grid>
  ) : (
    <Box w="100%" margin="auto" maxHeight="82vh" height={"82vh"}>
      <Box position={"relative"} p="10px">
        <AbsoluteCenter>
          <Heading
            paddingTop={"10px"}
            color="rgba(240,240,240,0.9)"
            fontSize={"24px"}
          >
            Friends
          </Heading>
        </AbsoluteCenter>
      </Box>
      <Divider mb="5" mt="5"></Divider>
      <Box position={"relative"}>
        <Empty
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "60px",
          }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span
              style={{
                color: "white",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              No friends
            </span>
          }
        ></Empty>
      </Box>
    </Box>
  );
};
export default FriendsChatComponent;
