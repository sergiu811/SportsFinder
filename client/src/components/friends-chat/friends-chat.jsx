import { Button } from "@chakra-ui/button";
import {
  Divider,
  GridItem,
  Heading,
  Text,
  VStack,
  Grid,
} from "@chakra-ui/layout";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "../socialize/socializeComponent";

const FriendsChat = () => {
  const { friendList } = useContext(FriendContext);
  return (
    <VStack pt="20px">
      <Heading size="md">Friends</Heading>
      <Divider />
      <VStack
        as={TabList}
        width="90%"
        h="78vh"
        overflowY="scroll"
        border="none"
      >
        {friendList.map((friend) => (
          <Grid
            templateColumns="25% 75%"
            width="90%"
            as={Tab}
            key={`friend:${friend.username}`}
          >
            <GridItem>
              <Avatar name={friend.username}>
                <AvatarBadge
                  boxSize="1.25em"
                  bg={friend.connected ? "green.400" : "red.500"}
                />
              </Avatar>
            </GridItem>
            <GridItem>
              <Text>{friend.username}</Text>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </VStack>
  );
};

export default FriendsChat;
