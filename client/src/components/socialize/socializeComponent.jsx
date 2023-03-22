import useSocketSetup from "../home/useSocketSetup";
import {
  Grid,
  GridItem,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  Text,
  VStack,
  HStack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../account-context";
import { ChatIcon, AtSignIcon } from "@chakra-ui/icons";
import FriendsChatComponent from "../friends-chat/friends-chat-component";
import AddFriendModal from "../add-friend-modal/add-friend-modal";
import RequestCard from "./requestCard";
import FriendRequests from "./friendRequests";
export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const SocializeCompoenent = () => {
  const [friendList, setFriendList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);
  useSocketSetup(setFriendList, setMessages, socket);
  return (
    <FriendContext.Provider value={{ friendList, setFriendList }}>
      <SocketContext.Provider value={{ socket }}>
        <Grid as={Tabs} templateColumns={"2fr 9fr"}>
          <GridItem borderRight="1px solid gray">
            <VStack as={TabList}>
              <Tab>
                <HStack>
                  <Text>Chat</Text>
                  <ChatIcon />
                </HStack>
              </Tab>
              <Tab>
                <HStack>
                  <Text>Friend Requests</Text>
                  <ChatIcon />
                </HStack>
              </Tab>
              <HStack onClick={onOpen}>
                <Text>Add Friend</Text>
                <AtSignIcon />
              </HStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
          </GridItem>
          <GridItem>
            <TabPanels>
              <TabPanel>
                <MessagesContext.Provider value={{ messages, setMessages }}>
                  <FriendsChatComponent />
                </MessagesContext.Provider>
              </TabPanel>
              <TabPanel>
                <HStack height="100%">
                  <FriendRequests></FriendRequests>
                </HStack>
              </TabPanel>
            </TabPanels>
          </GridItem>
        </Grid>
      </SocketContext.Provider>
    </FriendContext.Provider>
  );
};

export default SocializeCompoenent;
