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
import { useGlobalContext } from "../../context";

const FriendsChat = () => {
  const { friendList } = useGlobalContext();
  return (
    <VStack pt="20px">
      <Heading fontSize={"24px"} color="rgba(240,240,240,0.9)">
        Friends
      </Heading>
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
              <Text fontWeight={"bold"}>{friend.username}</Text>
            </GridItem>
          </Grid>
        ))}
      </VStack>
    </VStack>
  );
};

export default FriendsChat;
