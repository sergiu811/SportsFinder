import useSocketSetup from "../home/useSocketSetup";
import {
  Grid,
  GridItem,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  VStack,
  HStack,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { createContext, useContext, useEffect, useState } from "react";
import socketConn from "../../socket";
import { AccountContext } from "../account-context";
import FriendsChatComponent from "../friends-chat/friends-chat-component";
import AddFriendModal from "../add-friend-modal/add-friend-modal";
import FriendRequests from "./friendRequests";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export const FriendContext = createContext();
export const MessagesContext = createContext();
export const SocketContext = createContext();

const SocializeCompoenent = () => {
  const [friendList, setFriendList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const [messages, setMessages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useContext(AccountContext);
  const [socket, setSocket] = useState(() => socketConn(user));
  useEffect(() => {
    setSocket(() => socketConn(user));
  }, [user]);
  useSocketSetup(
    setFriendList,
    setFriendRequestList,
    friendList,
    friendRequestList,
    setMessages,
    socket
  );

  return (
    <FriendContext.Provider
      value={{
        friendList,
        setFriendList,
        friendRequestList,
        setFriendRequestList,
      }}
    >
      <SocketContext.Provider value={{ socket }}>
        <Grid as={Tabs} templateColumns={"0.6fr 9fr"} w="100%">
          <GridItem
            borderRadius="10px"
            m="10px"
            mt="1vh"
            boxShadow="1px 3px 7px 1px"
          >
            <VStack as={TabList} h="80vh" border="none" pt="45px">
              <Tab>
                <Icon width="30px" height="30px" as={HiChatBubbleLeftRight} />
              </Tab>
              <Tab>
                <Icon width="30px" height="30px" as={FaUserFriends} />
              </Tab>
              <HStack onClick={onOpen}>
                <Icon width="30px" height="30px" as={FaUserPlus} />
              </HStack>
            </VStack>
            <AddFriendModal isOpen={isOpen} onClose={onClose} />
          </GridItem>
          <GridItem
            borderRadius="10px"
            m="10px"
            mt="1vh"
            boxShadow="1px 3px 7px 1px"
          >
            <TabPanels>
              <TabPanel padding="0">
                <MessagesContext.Provider value={{ messages, setMessages }}>
                  <FriendsChatComponent />
                </MessagesContext.Provider>
              </TabPanel>
              <TabPanel>
                <HStack>
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
