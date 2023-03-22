import { Button } from "@chakra-ui/button";
import {
  Circle,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Tab, TabList } from "@chakra-ui/tabs";
import { useContext } from "react";
import { FriendContext } from "../socialize/socializeComponent";

const FriendsChat = () => {
  const { friendList } = useContext(FriendContext);
  return (
    <>
      <VStack>
        <HStack justify="space-evenly">
          <Heading size="md">Chats</Heading>
        </HStack>
        <Divider />
        <VStack as={TabList}>
          {friendList.map((friend) => (
            <HStack as={Tab} key={`friend:${friend}`}>
              <Avatar name={friend.username}>
                <AvatarBadge
                  boxSize="1.25em"
                  bg={friend.connected ? "green.700" : "red.500"}
                />
              </Avatar>
              <Text>{friend.username}</Text>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </>
  );
};

export default FriendsChat;
